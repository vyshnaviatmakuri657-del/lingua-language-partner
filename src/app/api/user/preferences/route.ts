import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateLanguagePair } from "@/lib/i18n";

export async function PATCH(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nativeLanguageCode, targetLanguageCode } = await req.json();

    if (!nativeLanguageCode || !targetLanguageCode) {
      return NextResponse.json(
        { error: "Both nativeLanguageCode and targetLanguageCode are required." },
        { status: 400 }
      );
    }

    // Critical Native != Target Validation
    const validation = validateLanguagePair(nativeLanguageCode, targetLanguageCode);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Ensure the LanguagePair exists or create it
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

    // Update UserLanguagePreference
    const preferences = await prisma.userLanguagePreference.upsert({
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

    // Set other learning paths for this user to inactive, and activate or create this one
    await prisma.learningPath.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    });

    const learningPath = await prisma.learningPath.upsert({
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
        level: "A1",
      },
      update: {
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      preferences,
      learningPath,
    });
  } catch (error) {
    console.error("Preferences API error:", error);
    return NextResponse.json(
      { error: "Failed to update language preferences." },
      { status: 500 }
    );
  }
}
