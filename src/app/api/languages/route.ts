import { NextResponse } from "next/server";
import { SUPPORTED_NATIVE_LANGUAGES, SUPPORTED_TARGET_LANGUAGES } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dbLanguages = await prisma.language.findMany();
    return NextResponse.json({
      nativeLanguages: SUPPORTED_NATIVE_LANGUAGES,
      targetLanguages: SUPPORTED_TARGET_LANGUAGES,
      allLanguages: dbLanguages,
    });
  } catch (error) {
    console.error("GET /api/languages error:", error);
    return NextResponse.json({
      nativeLanguages: SUPPORTED_NATIVE_LANGUAGES,
      targetLanguages: SUPPORTED_TARGET_LANGUAGES,
    });
  }
}
