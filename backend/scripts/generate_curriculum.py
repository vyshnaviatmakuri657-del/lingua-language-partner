# scripts/generate_curriculum.py
# -*- coding: utf-8 -*-
"""
Lingua Real-Life Practical Situational Curriculum Generator
Generates full 5-module x 3-lesson = 15-lesson curriculum for all 18 valid language pairs.
Strict rule: nativeLanguage != targetLanguage.
Outputs:
  - src/lib/curriculum/pairsData.ts
  - src/lib/curriculum/pairsData.mjs
"""

import json
import os
import sys

# Language dictionary
LANGUAGES = {
    "te": {"name": "Telugu", "nativeName": "తెలుగు", "flag": "🇮🇳"},
    "hi": {"name": "Hindi", "nativeName": "हिन्दी", "flag": "🇮🇳"},
    "en": {"name": "English", "nativeName": "English", "flag": "🇬🇧"},
    "ta": {"name": "Tamil", "nativeName": "தமிழ்", "flag": "🇮🇳"},
    "fr": {"name": "French", "nativeName": "Français", "flag": "🇫🇷"},
    "ko": {"name": "Korean", "nativeName": "한국어", "flag": "🇰🇷"},
    "es": {"name": "Spanish", "nativeName": "Español", "flag": "🇪🇸"},
}

NATIVES = ["te", "hi", "en"]
TARGETS = ["ko", "es", "fr", "ta", "hi", "te", "en"]

# Detailed 15 Situational Lesson Templates per Target Language
from generate_data_helpers import get_target_curriculum_data, get_pair_placement_questions

def build_all_pairs():
    pairs_data = []

    for native_code in NATIVES:
        for target_code in TARGETS:
            if native_code == target_code:
                continue

            target_info = LANGUAGES[target_code]
            native_info = LANGUAGES[native_code]

            # Descriptions
            desc = {
                "te": f"{native_info['nativeName']} ద్వారా {target_info['name']} భాషను నిజ జీవితంలో సులభంగా మాట్లాడటం నేర్చుకోండి.",
                "hi": f"{native_info['nativeName']} के माध्यम से {target_info['name']} भाषा में दैनिक व्यावहारिक बातचीत सीखें।",
                "en": f"Learn practical real-life {target_info['name']} fluency instructed in {native_info['name']}."
            }.get(native_code, f"Learn {target_info['name']} via {native_info['name']}.")

            cultural_notes = {
                "te": f"{target_info['name']} సంస్కృతిలో మర్యాద, గౌరవ సంబోధనలు మరియు దైనందిన వ్యవహారాలు చాలా కీలకం. తెలుగు మాట్లాడేవారికి సులభంగా అర్థమయ్యే వివరణలు అందించబడ్డాయి.",
                "hi": f"{target_info['name']} संस्कृति में शिष्टाचार और व्यावहारिक बातचीत अत्यंत महत्वपूर्ण हैं। हिंदी भाषियों के लिए विशेष व्याख्याएं।",
                "en": f"Cultural etiquette, conversational politeness, and real-life situational fluency in {target_info['name']}."
            }.get(native_code, f"Cultural etiquette for {target_info['name']}.")

            placement_qs = get_pair_placement_questions(native_code, target_code)
            modules = get_target_curriculum_data(target_code, native_code)

            pairs_data.append({
                "nativeCode": native_code,
                "targetCode": target_code,
                "description": desc,
                "culturalNotes": cultural_notes,
                "placementQuestions": placement_qs,
                "modules": modules
            })

    return pairs_data

def main():
    print(f"Generating full real-life curriculum for all 18 pairs...")
    all_pairs = build_all_pairs()
    print(f"Generated {len(all_pairs)} language pairs.")

    total_lessons = sum(len(m["lessons"]) for p in all_pairs for m in p["modules"])
    print(f"Total modules: {len(all_pairs) * 5}")
    print(f"Total lessons: {total_lessons} (Target: {len(all_pairs) * 15} = 270)")

    # Output JSON string
    json_str = json.dumps(all_pairs, ensure_ascii=False, indent=2)

    # 1. Write src/lib/curriculum/pairsData.ts
    ts_content = f"""// Comprehensive Real-Life 5-Module Curriculum Dataset for All 18 Valid Language Pairs
// Strict Rule: Native != Target (5 modules x 3 lessons = 15 lessons per pair)
import {{ PairCurriculumData }} from "./types";

export const allLanguagePairsData: PairCurriculumData[] = {json_str};
"""
    ts_path = os.path.join("src", "lib", "curriculum", "pairsData.ts")
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written: {ts_path} ({len(ts_content)} bytes)")

    # 2. Write src/lib/curriculum/pairsData.mjs
    mjs_content = f"""// Comprehensive Real-Life 5-Module Curriculum Dataset for All 18 Valid Language Pairs
// Strict Rule: Native != Target (5 modules x 3 lessons = 15 lessons per pair)
export const allLanguagePairsData = {json_str};
"""
    mjs_path = os.path.join("src", "lib", "curriculum", "pairsData.mjs")
    with open(mjs_path, "w", encoding="utf-8") as f:
        f.write(mjs_content)
    print(f"Written: {mjs_path} ({len(mjs_content)} bytes)")

if __name__ == "__main__":
    main()
