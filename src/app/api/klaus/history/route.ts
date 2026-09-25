import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ history: [] });
    }

    const history = await prisma.aIInteraction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ history });
  } catch (error) {
    console.error("GET /api/klaus/history error:", error);
    return NextResponse.json({ error: "Failed to fetch AI history." }, { status: 500 });
  }
}
