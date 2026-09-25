import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, avatar, bio, motivation, dailyGoalMinutes, soundEnabled, transliterationEnabled, theme } = body;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name !== undefined ? name : undefined,
        avatar: avatar !== undefined ? avatar : undefined,
        profile: {
          upsert: {
            create: {
              bio,
              motivation,
              dailyGoalMinutes: dailyGoalMinutes || 15,
              soundEnabled: soundEnabled ?? true,
              transliterationEnabled: transliterationEnabled ?? true,
              theme: theme || "system",
            },
            update: {
              bio: bio !== undefined ? bio : undefined,
              motivation: motivation !== undefined ? motivation : undefined,
              dailyGoalMinutes: dailyGoalMinutes !== undefined ? dailyGoalMinutes : undefined,
              soundEnabled: soundEnabled !== undefined ? soundEnabled : undefined,
              transliterationEnabled: transliterationEnabled !== undefined ? transliterationEnabled : undefined,
              theme: theme !== undefined ? theme : undefined,
            },
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = updated;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (error) {
    console.error("PATCH /api/user error:", error);
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
  }
}
