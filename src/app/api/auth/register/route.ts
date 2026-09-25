import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, email, password, nativeLanguageCode = "en", targetLanguageCode = "es" } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Critical Native != Target validation
    if (nativeLanguageCode.toLowerCase() === targetLanguageCode.toLowerCase()) {
      return NextResponse.json(
        { error: "Native instructional language cannot be identical to target learning language." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
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
      },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      },
    });

    // Create session token
    const token = signToken({ userId: user.id, email: user.email });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      { success: true, user: safeUser, token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}
