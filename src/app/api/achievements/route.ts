import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);

    const [allAchievements, userAchievements] = await Promise.all([
      prisma.achievement.findMany(),
      user ? prisma.userAchievement.findMany({ where: { userId: user.id } }) : [],
    ]);

    const unlockedMap = new Map(userAchievements.map((ua) => [ua.achievementId, ua.unlockedAt]));

    const result = allAchievements.map((ach) => ({
      id: ach.id,
      code: ach.code,
      title: ach.titleKey,
      description: ach.descriptionKey,
      icon: ach.icon,
      xpReward: ach.xpReward,
      category: ach.category,
      isUnlocked: unlockedMap.has(ach.id),
      unlockedAt: unlockedMap.get(ach.id) || null,
    }));

    return NextResponse.json({ achievements: result });
  } catch (error) {
    console.error("GET /api/achievements error:", error);
    return NextResponse.json(
      { error: "Failed to load achievements." },
      { status: 500 }
    );
  }
}
