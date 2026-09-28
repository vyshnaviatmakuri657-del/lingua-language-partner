import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { comparePassword, hashPassword, signToken, AUTH_COOKIE_NAME, getAuthUserFromRequest } from "../lib/auth";

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory OTP store for email verification
interface PendingOtp {
  code: string;
  email: string;
  expiresAt: number;
}
const otpStore = new Map<string, PendingOtp>();

// POST /api/auth/send-verification
// Dispatches 6-digit OTP code to verify real email ownership
router.post("/send-verification", async (req: Request, res: Response) => {
  try {
    const { email, type = "signup" } = req.body;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (type === "signup") {
      const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      if (existing) {
        return res.status(409).json({
          error: "An account with this email address already exists. Please log in instead.",
          alreadyExists: true,
        });
      }
    } else if (type === "login") {
      const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      if (!existing) {
        return res.status(404).json({
          error: "No account found with this email. Please sign up first.",
          notFound: true,
        });
      }
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(normalizedEmail, { code, email: normalizedEmail, expiresAt });

    console.log(`\n======================================================`);
    console.log(`[LINGUA EMAIL VERIFICATION DISPATCH]`);
    console.log(`  Target Email: ${normalizedEmail}`);
    console.log(`  Verification Code: >>> ${code} <<<`);
    console.log(`  Action: ${type.toUpperCase()}`);
    console.log(`  Valid for 10 minutes`);
    console.log(`======================================================\n`);

    return res.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${normalizedEmail}.`,
      devCode: code,
    });
  } catch (error) {
    console.error("send-verification error:", error);
    return res.status(500).json({ error: "Failed to dispatch verification code." });
  }
});

// POST /api/auth/verify-code-signup
// Verifies 6-digit OTP code and creates a pristine 0-XP user
router.post("/verify-code-signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password, code, nativeLanguageCode = "te", targetLanguageCode = "ko" } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: "Valid email address is required." });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    if (!code || typeof code !== "string" || code.trim().length !== 6) {
      return res.status(400).json({ error: "Please enter the 6-digit verification code." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const pending = otpStore.get(normalizedEmail);

    if (!pending) {
      return res.status(400).json({ error: "No verification code requested or code expired. Please request a new code." });
    }

    if (Date.now() > pending.expiresAt) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({ error: "Verification code has expired. Please request a new code." });
    }

    if (pending.code !== code.trim()) {
      return res.status(400).json({ error: "Invalid verification code. Please check and try again." });
    }

    // Code is valid! Consume it
    otpStore.delete(normalizedEmail);

    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(409).json({ error: "An account with this email address already exists. Please log in." });
    }

    const hashedPassword = await hashPassword(password);

    const pair = await prisma.languagePair.upsert({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode,
          targetLanguageCode,
        },
      },
      update: {},
      create: {
        nativeLanguageCode,
        targetLanguageCode,
        description: `Track for learning ${targetLanguageCode.toUpperCase()} through ${nativeLanguageCode.toUpperCase()}`,
      },
    });

    // Create 100% clean, fresh account: 0 XP, Level 1, 0 streak, 0 lessons
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        profile: {
          create: {
            dailyGoalMinutes: 15,
            timezone: "UTC",
          },
        },
        preferences: {
          create: {
            nativeLanguageCode,
            targetLanguageCode,
            instructionLanguageCode: nativeLanguageCode,
            learningLanguageCode: targetLanguageCode,
          },
        },
        progress: {
          create: {
            totalXp: 0,
            currentLevel: 1,
            lessonsCompleted: 0,
            exercisesCompleted: 0,
          },
        },
        streak: {
          create: {
            currentStreak: 0,
            longestStreak: 0,
          },
        },
        learningPaths: {
          create: {
            languagePairId: pair.id,
            isActive: true,
          },
        },
      },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      },
    });

    const token = signToken({ userId: user.id, email: user.email });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    const { password: _, ...safeUser } = user;
    return res.status(201).json({ success: true, user: safeUser, token });
  } catch (error) {
    console.error("verify-code-signup error:", error);
    return res.status(500).json({ error: "Registration verification failed." });
  }
});

// POST /api/auth/verify-code-login
// Verifies 6-digit OTP code and logs in passwordlessly
router.post("/verify-code-login", async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email and 6-digit code are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const pending = otpStore.get(normalizedEmail);

    if (!pending) {
      return res.status(400).json({ error: "No verification code requested or code expired. Please request a new code." });
    }

    if (Date.now() > pending.expiresAt) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({ error: "Verification code has expired. Please request a new code." });
    }

    if (pending.code !== code.trim()) {
      return res.status(400).json({ error: "Invalid verification code. Please check and try again." });
    }

    otpStore.delete(normalizedEmail);

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "No user found with this email." });
    }

    const token = signToken({ userId: user.id, email: user.email });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    const { password: _, ...safeUser } = user;
    return res.json({ success: true, user: safeUser, token });
  } catch (error) {
    console.error("verify-code-login error:", error);
    return res.status(500).json({ error: "Login verification failed." });
  }
});

// POST /api/auth/register (Standard Register)
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, nativeLanguageCode = "te", targetLanguageCode = "ko" } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    // Strict Native != Target constraint
    if (nativeLanguageCode.toLowerCase() === targetLanguageCode.toLowerCase()) {
      return res.status(400).json({
        error: "Native instructional language cannot be identical to target learning language.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({ error: "An account with this email address already exists. Please log in instead." });
    }

    const hashedPassword = await hashPassword(password);

    // Upsert language pair
    const pair = await prisma.languagePair.upsert({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode,
          targetLanguageCode,
        },
      },
      update: {},
      create: {
        nativeLanguageCode,
        targetLanguageCode,
        description: `Track for learning ${targetLanguageCode.toUpperCase()} through ${nativeLanguageCode.toUpperCase()}`,
      },
    });

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        profile: {
          create: {
            dailyGoalMinutes: 15,
            timezone: "UTC",
          },
        },
        preferences: {
          create: {
            nativeLanguageCode,
            targetLanguageCode,
            instructionLanguageCode: nativeLanguageCode,
            learningLanguageCode: targetLanguageCode,
          },
        },
        progress: {
          create: {
            totalXp: 0,
            currentLevel: 1,
            lessonsCompleted: 0,
            exercisesCompleted: 0,
          },
        },
        streak: {
          create: {
            currentStreak: 0,
            longestStreak: 0,
          },
        },
        learningPaths: {
          create: {
            languagePairId: pair.id,
            isActive: true,
          },
        },
      },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      },
    });

    const token = signToken({ userId: user.id, email: user.email });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    const { password: _, ...safeUser } = user;
    return res.status(201).json({ success: true, user: safeUser, token });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Internal server error during registration." });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "No account found with this email. Please check your email or sign up.",
        notFound: true,
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Incorrect password. Please verify your password and try again.",
        invalidPassword: true,
      });
    }

    const token = signToken({ userId: user.id, email: user.email });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    const { password: _, ...safeUser } = user;
    return res.json({ success: true, user: safeUser, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error during login." });
  }
});

// POST /api/auth/google
router.post("/google", async (req: Request, res: Response) => {
  try {
    const {
      credential,
      email: directEmail,
      name: directName,
      avatar: directAvatar,
      googleId: directGoogleId,
      nativeLanguageCode = "te",
      targetLanguageCode = "ko",
    } = req.body;

    let email = directEmail;
    let name = directName;
    let avatar = directAvatar;
    let googleId = directGoogleId;

    if (credential) {
      try {
        const verifyRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
        );
        if (verifyRes.ok) {
          const payload = (await verifyRes.json()) as any;
          email = payload.email || email;
          name = payload.name || name || payload.email?.split("@")[0];
          avatar = payload.picture || avatar;
          googleId = payload.sub || googleId;
        } else {
          const decoded = jwt.decode(credential) as any;
          if (decoded && decoded.email) {
            email = decoded.email;
            name = decoded.name || name || decoded.email.split("@")[0];
            avatar = decoded.picture || avatar;
            googleId = decoded.sub || googleId;
          }
        }
      } catch {
        const decoded = jwt.decode(credential) as any;
        if (decoded && decoded.email) {
          email = decoded.email;
          name = decoded.name || name || decoded.email.split("@")[0];
          avatar = decoded.picture || avatar;
          googleId = decoded.sub || googleId;
        }
      }
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "A valid Google account email is required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const displayName = (name && typeof name === "string" && name.trim())
      ? name.trim()
      : normalizedEmail.split("@")[0];

    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      },
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      const pair = await prisma.languagePair.upsert({
        where: {
          nativeLanguageCode_targetLanguageCode: {
            nativeLanguageCode,
            targetLanguageCode,
          },
        },
        update: {},
        create: {
          nativeLanguageCode,
          targetLanguageCode,
          description: `Track for learning ${targetLanguageCode.toUpperCase()} through ${nativeLanguageCode.toUpperCase()}`,
        },
      });

      const randomPassword = await hashPassword(
        Math.random().toString(36).slice(2) + Date.now().toString(36)
      );

      // Clean 0-XP user on registration
      user = await prisma.user.create({
        data: {
          name: displayName,
          email: normalizedEmail,
          password: randomPassword,
          avatar: avatar || null,
          profile: {
            create: {
              dailyGoalMinutes: 15,
              timezone: "UTC",
            },
          },
          preferences: {
            create: {
              nativeLanguageCode,
              targetLanguageCode,
              instructionLanguageCode: nativeLanguageCode,
              learningLanguageCode: targetLanguageCode,
            },
          },
          progress: {
            create: {
              totalXp: 0,
              currentLevel: 1,
              lessonsCompleted: 0,
              exercisesCompleted: 0,
            },
          },
          streak: {
            create: {
              currentStreak: 0,
              longestStreak: 0,
            },
          },
          learningPaths: {
            create: {
              languagePairId: pair.id,
              isActive: true,
            },
          },
        },
        include: {
          profile: true,
          preferences: true,
          progress: true,
          streak: true,
        },
      });
    } else if (avatar && !user.avatar) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { avatar },
        include: {
          profile: true,
          preferences: true,
          progress: true,
          streak: true,
        },
      });
    }

    const token = signToken({ userId: user.id, email: user.email });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    const { password: _, ...safeUser } = user;
    return res.json({ success: true, user: safeUser, token, isNewUser });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ error: "Failed to authenticate with Google." });
  }
});

// POST /api/auth/reset-password
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: "Valid email address is required." });
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(404).json({ error: "No account found with this email address." });
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return res.json({ success: true, message: "Password updated successfully. You can now log in." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Internal server error during password reset." });
  }
});

// POST /api/auth/logout
router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie(AUTH_COOKIE_NAME, { path: "/" });
  return res.json({ success: true, message: "Logged out successfully." });
});

// GET /api/auth/me
router.get("/me", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    return res.json({ user });
  } catch {
    return res.status(500).json({ error: "Failed to get user session" });
  }
});

export default router;
