import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { updateVocabularyReviewProgress, awardUserXpAndRecordActivity } from "@/lib/gamification/engine";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { id } = await params;
    const { remembered } = await req.json();

    if (user) {
      const updatedProgress = await updateVocabularyReviewProgress({
        userId: user.id,
        vocabularyId: id,
        remembered: Boolean(remembered),
      });

      // Award XP for vocabulary review (+5 XP)
      const progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "VOCABULARY_REVIEW",
        minutes: 1,
      });

      return NextResponse.json({
        success: true,
        updatedProgress,
        progressUpdate,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Guest review recorded.",
    });
  } catch (error) {
    console.error("POST /api/review/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to record card review." },
      { status: 500 }
    );
  }
}
