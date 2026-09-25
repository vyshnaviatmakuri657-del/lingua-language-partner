import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateLanguagePair } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = await req.json();
    const {
      nativeLanguageCode,
      targetLanguageCode,
      motivation,
      dailyGoalMinutes = 15,
      experienceLevel = "beginner",
    } = body;

    // Strict validation
    const validation = validateLanguagePair(nativeLanguageCode, targetLanguageCode);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!user) {
      // Return validated configuration for client to hold until registration
      return NextResponse.json({
        success: true,
        validatedConfig: {
          nativeLanguageCode,
          targetLanguageCode,
          instructionLanguageCode: nativeLanguageCode,
          learningLanguageCode: targetLanguageCode,
          motivation,
          dailyGoalMinutes,
          experienceLevel,
        },
      });
    }

    // Authenticated user: Save everything to database
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

    await prisma.userProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        motivation,
        dailyGoalMinutes: Number(dailyGoalMinutes) || 15,
        experienceLevel,
      },
      update: {
        motivation,
        dailyGoalMinutes: Number(dailyGoalMinutes) || 15,
        experienceLevel,
      },
    });

    await prisma.userLanguagePreference.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        nativeLanguageCode,
        targetLanguageCode,
        instructionLanguageCode: nativeLanguageCode,
        learningLanguageCode: targetLanguageCode,
      },
      update: {
        nativeLanguageCode,
        targetLanguageCode,
        instructionLanguageCode: nativeLanguageCode,
        learningLanguageCode: targetLanguageCode,
      },
    });

    // Deactivate previous learning paths and set this one active
    await prisma.learningPath.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    });

    const path = await prisma.learningPath.upsert({
      where: {
        userId_languagePairId: {
          userId: user.id,
          languagePairId: pair.id,
        },
      },
      create: {
        userId: user.id,
        languagePairId: pair.id,
        isActive: true,
        level: experienceLevel === "intermediate" ? "A2" : experienceLevel === "advanced" ? "B1" : "A1",
      },
      update: {
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      learningPath: path,
    });
  } catch (error) {
    console.error("POST /api/onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding." },
      { status: 500 }
    );
  }
}
