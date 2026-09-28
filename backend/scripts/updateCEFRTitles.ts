import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cefrMeta: Record<number, { category: string; tePrefix: string; hiPrefix: string; enPrefix: string }> = {
  1: {
    category: "CEFR_A1",
    tePrefix: "స్టేజ్ 1 (CEFR A1 - Breakthrough): ",
    hiPrefix: "स्टेज 1 (CEFR A1 - Breakthrough): ",
    enPrefix: "Stage 1 (CEFR A1 - Breakthrough): ",
  },
  2: {
    category: "CEFR_A2_ESSENTIALS",
    tePrefix: "స్టేజ్ 2 (CEFR A2 - Waystage): ",
    hiPrefix: "स्टेज 2 (CEFR A2 - Waystage): ",
    enPrefix: "Stage 2 (CEFR A2 - Waystage): ",
  },
  3: {
    category: "CEFR_A2_DINING",
    tePrefix: "స్టేజ్ 3 (CEFR A2 - Practical): ",
    hiPrefix: "स्टेज 3 (CEFR A2 - Practical): ",
    enPrefix: "Stage 3 (CEFR A2 - Practical): ",
  },
  4: {
    category: "CEFR_B1",
    tePrefix: "స్టేజ్ 4 (CEFR B1 - Threshold): ",
    hiPrefix: "స్టేజ్ 4 (CEFR B1 - Threshold): ",
    enPrefix: "Stage 4 (CEFR B1 - Threshold): ",
  },
  5: {
    category: "CEFR_B2",
    tePrefix: "స్టేజ్ 5 (CEFR B2 - Vantage): ",
    hiPrefix: "స్టేజ్ 5 (CEFR B2 - Vantage): ",
    enPrefix: "Stage 5 (CEFR B2 - Vantage): ",
  },
};

async function updateModules() {
  console.log("Updating all modules in database with clean CEFR stage titles...");

  const modules = await prisma.module.findMany({
    include: { languagePair: true },
  });

  let count = 0;
  for (const mod of modules) {
    const meta = cefrMeta[mod.orderIndex];
    if (!meta) continue;

    const nativeCode = mod.languagePair.nativeLanguageCode;
    const prefix = nativeCode === "te" ? meta.tePrefix : nativeCode === "hi" ? meta.hiPrefix : meta.enPrefix;

    // Clean existing title if already has prefix
    let cleanTitle = mod.title;
    cleanTitle = cleanTitle.replace(/^.*\(CEFR [^)]+\):\s*/i, "");
    cleanTitle = cleanTitle.replace(/^Module \d+:\s*/i, "");
    cleanTitle = cleanTitle.replace(/^స్టేజ్ \d+[^:]*:\s*/i, "");
    cleanTitle = cleanTitle.replace(/^स्टेज \d+[^:]*:\s*/i, "");

    const newTitle = prefix + cleanTitle;

    await prisma.module.update({
      where: { id: mod.id },
      data: {
        category: meta.category,
        title: newTitle,
      },
    });
    count++;
  }

  console.log(`✓ Updated ${count} modules across all language pairs with explicit CEFR titles & categories!`);
}

updateModules()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
