import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.AUTH_SECRET || "lingua_production_secret_key_default_2026";
export const AUTH_COOKIE_NAME = "lingua_session_token";

export interface TokenPayload {
  userId: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      },
    });

    if (!user) return null;

    // Do not return password hash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    console.error("getSessionUser error:", error);
    return null;
  }
}

export function extractBearerToken(authHeader?: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1];
}

export async function getAuthUserFromRequest(request: Request) {
  // Check Authorization header first
  const authHeader = request.headers.get("authorization");
  const bearerToken = extractBearerToken(authHeader);

  let token = bearerToken;

  // Fallback to cookie
  if (!token) {
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const parsedCookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => c.split("="))
      );
      token = parsedCookies[AUTH_COOKIE_NAME];
    }
  }

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: {
      profile: true,
      preferences: true,
      progress: true,
      streak: true,
    },
  });

  if (!user) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = user;
  return safeUser;
}
