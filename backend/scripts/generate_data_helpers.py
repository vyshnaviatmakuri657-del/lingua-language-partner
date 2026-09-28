# scripts/generate_data_helpers.py
# -*- coding: utf-8 -*-
"""
Curriculum & Placement Test Data Helpers for Lingua.
Assembles 15 real-life situational lessons per target language into full 5-module courses
and maps instructions, meanings, and explanations to the user's native language (te, hi, en).
"""

from target_ko import KO_LESSONS
from target_es import ES_LESSONS
from target_fr import FR_LESSONS
from target_ta import TA_LESSONS
from target_hi import HI_LESSONS
from target_te import TE_LESSONS
from target_en import EN_LESSONS

TARGET_MAP = {
    "ko": KO_LESSONS,
    "es": ES_LESSONS,
    "fr": FR_LESSONS,
    "ta": TA_LESSONS,
    "hi": HI_LESSONS,
    "te": TE_LESSONS,
    "en": EN_LESSONS,
}

MODULE_SPECS = [
    {
        "category": "greetings",
        "icon": "👋",
        "title": {
            "en": "Everyday Survival & Greetings",
            "te": "నిజ జీవిత శుభాకాంక్షలు & పరిచయాలు",
            "hi": "दैनिक अभिवादन और शिष्टाचार"
        },
        "description": {
            "en": "Essential polite greetings, handshakes/bows, and introducing yourself to locals.",
            "te": "రోజువారీ శుభాకాంక్షలు, పలకరింపులు మరియు స్థానికులతో పరిచయం చేసుకోవడం.",
            "hi": "दैनिक अभिवादन, हाथ मिलाना/झुकना और स्थानीय लोगों से परिचय।"
        }
    },
    {
        "category": "shopping",
        "icon": "💳",
        "title": {
            "en": "Real-World Shopping & Numbers",
            "te": "షాపింగ్, సంఖ్యలు & కొనుగోళ్లు",
            "hi": "खरीदारी, संख्याएँ और लेन-देन"
        },
        "description": {
            "en": "Asking prices, counting money, paying by card/cash, and store conversations.",
            "te": "ధరలు అడగడం, నంబర్లు, కార్డు లేదా నగదు చెల్లింపు మరియు మార్కెట్ కొనుగోళ్లు.",
            "hi": "दाम पूछना, पैसे गिनना, कार्ड व नकद भुगतान और बाज़ार में बातचीत।"
        }
    },
    {
        "category": "food_dining",
        "icon": "🍜",
        "title": {
            "en": "Cafés, Street Food & Restaurants",
            "te": "కేఫ్‌లు, స్ట్రీట్ ఫుడ్ & రెస్టారెంట్లు",
            "hi": "कैफ़े, स्ट्रीट फ़ूड और रेस्तरां"
        },
        "description": {
            "en": "Ordering coffee, restaurant dining, requesting less spice, and getting the check.",
            "te": "కాఫీ ఆర్డర్ చేయడం, రెస్టారెంట్ భోజనం, కారం తగ్గించమనడం మరియు బిల్లు చెల్లించడం.",
            "hi": "कॉफ़ी मंगाना, रेस्तरां में खाना, कम तीखा मांगना और बिल चुकाना।"
        }
    },
    {
        "category": "travel_transit",
        "icon": "🚇",
        "title": {
            "en": "Real-Life Transit & Navigation",
            "te": "ప్రయాణం, దిశలు & మెట్రో రైళ్లు",
            "hi": "दिशाएँ, मेट्रो और यात्रा"
        },
        "description": {
            "en": "Finding restrooms, navigating subways/taxis, and checking into hotels.",
            "te": "బాత్‌రూమ్ వెతకడం, సబ్‌వే లేదా టాక్సీ ప్రయాణం మరియు హోటల్ చెక్-ఇన్.",
            "hi": "शौचालय खोजना, मेट्रो व टैक्सी की सवारी और होटल चेक-इन।"
        }
    },
    {
        "category": "social_emergency",
        "icon": "🚨",
        "title": {
            "en": "Social Fluency & Urgent Help",
            "te": "స్నేహం, సంభాషణ & అత్యవసర పరిస్థితులు",
            "hi": "मित्रता, बातचीत और आपातकालीन सहायता"
        },
        "description": {
            "en": "Making friends, phone chats, medical needs, and reporting lost items.",
            "te": "స్నేహం చేయడం, ఫోన్ సంభాషణలు, డాక్టర్ సహాయం మరియు పోయిన వస్తువులు.",
            "hi": "दोस्त बनाना, फोन पर बात, चिकित्सा सहायता और खोया सामान खोजना।"
        }
    }
]

def get_loc(field_dict, lang, default_lang="en"):
    """Safely extracts localized string for lang or fallback."""
    if isinstance(field_dict, dict):
        return field_dict.get(lang, field_dict.get(default_lang, str(field_dict)))
    return str(field_dict)

def get_target_curriculum_data(target_code, native_code):
    """
    Constructs 5 CurriculumModules with 3 CurriculumLessons each (15 lessons total),
    tailored with instructions and meanings in native_code.
    """
    raw_modules = TARGET_MAP[target_code]
    result_modules = []

    for mod_idx, raw_lessons in enumerate(raw_modules):
        mod_spec = MODULE_SPECS[mod_idx]
        curriculum_lessons = []

        for lesson_idx, raw_l in enumerate(raw_lessons):
            # 1. Vocabulary
            vocab_list = []
            for v in raw_l.get("vocab", []):
                vocab_list.append({
                    "targetWord": v["word"],
                    "nativeMeaning": get_loc(v.get("meanings", {}), native_code),
                    "pronunciation": v.get("pron", v.get("translit", v["word"])),
                    "transliteration": v.get("translit", ""),
                    "partOfSpeech": v.get("pos", "noun"),
                    "exampleTarget": v.get("exTarget", ""),
                    "exampleTransliteration": v.get("exTranslit", ""),
                    "exampleNative": get_loc(v.get("exNative", {}), native_code),
                    "notes": ""
                })

            # 2. Grammar
            grammar_obj = None
            if "grammar" in raw_l:
                g = raw_l["grammar"]
                ex_list = []
                for ex in g.get("examples", []):
                    ex_list.append({
                        "target": ex["target"],
                        "transliteration": ex.get("transliteration", ""),
                        "native": get_loc(ex.get("native", {}), native_code)
                    })
                mistakes_list = []
                for cm in g.get("commonMistakes", []):
                    mistakes_list.append({
                        "incorrect": cm["incorrect"],
                        "correct": cm["correct"],
                        "explanation": get_loc(cm.get("explanation", {}), native_code)
                    })
                grammar_obj = {
                    "title": get_loc(g["title"], native_code),
                    "explanation": get_loc(g["explanation"], native_code),
                    "ruleSummary": get_loc(g["ruleSummary"], native_code),
                    "examples": ex_list,
                    "commonMistakes": mistakes_list
                }

            # 3. Exercises
            exercise_list = []
            for ex in raw_l.get("exercises", []):
                correct = ex["correct"]
                # Formulate 3 progressive hints
                hint1_prefix = correct[:2] if len(correct) >= 2 else correct
                hint1 = {
                    "en": f"Hint: Look closely at option starting with '{hint1_prefix}'",
                    "te": f"సూచన: '{hint1_prefix}' తో మొదలయ్యే పదాన్ని గమనించండి",
                    "hi": f"संकेत: '{hint1_prefix}' से शुरू होने वाले शब्द पर ध्यान दें"
                }.get(native_code, f"Hint: begins with '{hint1_prefix}'")

                hint2 = {
                    "en": f"Almost there! The correct answer relates directly to: {get_loc(ex['prompt'], native_code)}",
                    "te": f"సరైన జవాబు '{get_loc(ex['prompt'], native_code)}' కి సంబంధించినది.",
                    "hi": f"सही उत्तर सीधे '{get_loc(ex['prompt'], native_code)}' से जुड़ा है।"
                }.get(native_code, f"Relates to {get_loc(ex['prompt'], native_code)}")

                hint3 = {
                    "en": f"The answer is: {correct}",
                    "te": f"సరైన జవాబు: {correct}",
                    "hi": f"सही उत्तर है: {correct}"
                }.get(native_code, f"Answer: {correct}")

                exercise_list.append({
                    "type": ex.get("type", "multiple_choice"),
                    "instruction": get_loc(ex.get("instruction", {}), native_code),
                    "prompt": get_loc(ex.get("prompt", {}), native_code),
                    "promptTransliteration": ex.get("promptTranslit", ""),
                    "correctAnswer": correct,
                    "acceptableAnswers": [correct],
                    "options": ex.get("options", [correct]),
                    "explanation": get_loc(ex.get("expl", {}), native_code),
                    "hintLevel1": hint1,
                    "hintLevel2": hint2,
                    "hintLevel3": hint3
                })

            curriculum_lessons.append({
                "title": get_loc(raw_l["title"], native_code),
                "objective": get_loc(raw_l["objective"], native_code),
                "culturalTip": get_loc(raw_l["culturalTip"], native_code),
                "vocabulary": vocab_list,
                "grammar": grammar_obj,
                "exercises": exercise_list
            })

        result_modules.append({
            "category": mod_spec["category"],
            "title": get_loc(mod_spec["title"], native_code),
            "description": get_loc(mod_spec["description"], native_code),
            "icon": mod_spec["icon"],
            "lessons": curriculum_lessons
        })

    return result_modules


# PLACEMENT TESTS: 5 questions per target language
RAW_PLACEMENT_DATA = {
    "ko": [
        {
            "difficulty": "beginner",
            "instruction": {"en": "Select the polite Korean greeting for 'Hello'.", "te": "నమస్కారానికి సరైన కొరియన్ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही कोरियाई शब्द चुनें।"},
            "question": "Which phrase is the standard polite greeting 'Hello' in Korean?",
            "options": ["안녕하세요", "감사합니다", "죄송합니다", "안녕히 계세요"],
            "correctAnswer": "안녕하세요",
            "explanation": {"en": "'안녕하세요' (Annyeonghaseyo) is the universal polite greeting.", "te": "'안녕하세요' ప్రామాణిక కొరియన్ నమస్కారం.", "hi": "'안녕하세요' मानक कोरियाई अभिवादन है।"}
        },
        {
            "difficulty": "beginner",
            "instruction": {"en": "Identify the Korean phrase for 'Thank you'.", "te": "'ధన్యవాదాలు' కి సరైనది ఏది?", "hi": "'धन्यवाद' के लिए सही शब्द कौन सा है?"},
            "question": "What is the formal expression for 'Thank you' in Korean?",
            "options": ["감사합니다", "실례합니다", "괜찮아요", "네"],
            "correctAnswer": "감사합니다",
            "explanation": {"en": "'감사합니다' (Gamsahamnida) means thank you.", "te": "కృతజ్ఞత తెలపడానికి 감사합니다 అంటారు.", "hi": "감사합니다 का अर्थ धन्यवाद है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "How do you ask 'How much is this?' in a Korean shop?", "te": "దుకాణంలో 'దీని ధర ఎంత?' అని ఎలా అడుగుతారు?", "hi": "दुकान में 'यह कितने का है?' कैसे पूछेंगे?"},
            "question": "Choose the correct phrase to ask for the price of an item:",
            "options": ["이거 얼마예요?", "어디 가요?", "뭐 먹어요?", "몇 시예요?"],
            "correctAnswer": "이거 얼마예요?",
            "explanation": {"en": "'이거 얼마예요?' (Igeo eolmayeyo?) means 'How much is this?'.", "te": "'이거 얼마예요?' అంటే దీని ధర ఎంత అని అర్థం.", "hi": "'이거 얼마예요?' का अर्थ है यह कितने का है?"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "Select the phrase for ordering water in a Korean restaurant.", "te": "రెస్టారెంట్‌లో నీళ్లు కావాలని ఎలా అడుగుతారు?", "hi": "रेस्तरां में पानी मंगाने के लिए क्या कहेंगे?"},
            "question": "How do you politely ask for water in a Korean café or restaurant?",
            "options": ["물 좀 주세요", "밥 없어요", "계산서 주세요", "안 가요"],
            "correctAnswer": "물 좀 주세요",
            "explanation": {"en": "'물 좀 주세요' (Mul jom juseyo) means 'Please give me some water'.", "te": "'물 좀 주세요' అంటే దయచేసి నీళ్లు ఇవ్వండి అని అర్థం.", "hi": "'물 좀 주세요' का अर्थ है कृपया पानी दीजिए।"}
        },
        {
            "difficulty": "advanced",
            "instruction": {"en": "Choose the phrase for asking directions to the subway station.", "te": "సబ్‌వే స్టేషన్ ఎక్కడ ఉందో అడగడానికి సరైనది ఏది?", "hi": "मेट्रो स्टेशन का रास्ता पूछने के लिए सही वाक्य कौन सा है?"},
            "question": "Which sentence means 'Where is the subway station?'",
            "options": ["지하철역이 어디에 있어요?", "공항버스가 왔어요", "호텔을 예약했어요", "택시를 타지 마세요"],
            "correctAnswer": "지하철역이 어디에 있어요?",
            "explanation": {"en": "'지하철역이 어디에 있어요?' asks where the subway station is located.", "te": "'지하철역이 어디에 있어요?' అంటే సబ్‌వే స్టేషన్ ఎక్కడ ఉంది అని.", "hi": "'지하철역이 어디에 있어요?' का अर्थ है मेट्रो स्टेशन कहाँ है?"}
        }
    ],

    "es": [
        {
            "difficulty": "beginner",
            "instruction": {"en": "Select the Spanish word for 'Hello'.", "te": "హలో కు సరైన స్పానిష్ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही स्पैनिश शब्द चुनें।"},
            "question": "Which word is used to greet someone 'Hello' in Spanish?",
            "options": ["¡Hola!", "Gracias", "Adiós", "Por favor"],
            "correctAnswer": "¡Hola!",
            "explanation": {"en": "'¡Hola!' is the standard Spanish greeting.", "te": "'¡Hola!' అంటే హలో.", "hi": "'¡Hola!' का अर्थ है नमस्ते।"}
        },
        {
            "difficulty": "beginner",
            "instruction": {"en": "Choose the expression for 'Thank you very much'.", "te": "'చాలా ధన్యవాదాలు' కి సరైనది ఏది?", "hi": "'बहुत धन्यवाद' के लिए सही शब्द कौन सा है?"},
            "question": "How do you express gratitude in Spanish?",
            "options": ["Muchas gracias", "De nada", "Buenas noches", "Disculpe"],
            "correctAnswer": "Muchas gracias",
            "explanation": {"en": "'Muchas gracias' means thank you very much.", "te": "'Muchas gracias' అంటే చాలా ధన్యవాదాలు.", "hi": "'Muchas gracias' का अर्थ बहुत धन्यवाद है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "How do you ask 'How much does this cost?' in Spanish?", "te": "స్పానిష్‌లో 'దీని ఖరీదు ఎంత?' అని ఎలా అడుగుతారు?", "hi": "स्पैनिश में 'यह कितने का है?' कैसे पूछेंगे?"},
            "question": "Which phrase asks for the price of an item in a market?",
            "options": ["¿Cuánto cuesta esto?", "¿Qué hora es?", "¿Dónde vives?", "¿Cómo te llamas?"],
            "correctAnswer": "¿Cuánto cuesta esto?",
            "explanation": {"en": "'¿Cuánto cuesta esto?' asks how much something costs.", "te": "'¿Cuánto cuesta esto?' అంటే దీని ఖరీదు ఎంత అని.", "hi": "'¿Cuánto cuesta esto?' का अर्थ है यह कितने का है?"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "Select the phrase for ordering a coffee with milk in a café.", "te": "పాల కాఫీ ఆర్డర్ చేయడానికి సరైనది ఏది?", "hi": "दूध वाली कॉफ़ी मंगाने के लिए क्या कहेंगे?"},
            "question": "How do you order 'A coffee with milk, please' in a Spanish café?",
            "options": ["Un café con leche, por favor", "Una cerveza fría", "La cuenta, por favor", "No tengo hambre"],
            "correctAnswer": "Un café con leche, por favor",
            "explanation": {"en": "'Un café con leche, por favor' orders coffee with milk.", "te": "'Un café con leche, por favor' అంటే ఒక కాఫీ ఇవ్వండి దయచేసి అని.", "hi": "'Un café con leche, por favor' का अर्थ है दूध वाली कॉफ़ी दीजिए।"}
        },
        {
            "difficulty": "advanced",
            "instruction": {"en": "Choose the sentence asking for directions to the metro station.", "te": "మెట్రో స్టేషన్ ఎక్కడ ఉందో అడగడానికి సరైన వాక్యం ఏది?", "hi": "मेट्रो स्टेशन का पता पूछने के लिए कौन सा वाक्य सही है?"},
            "question": "Which sentence means 'Excuse me, where is the nearest metro station?'",
            "options": ["Disculpe, ¿dónde está la estación de metro más cercana?", "¿A qué hora llega el tren?", "El billete es muy caro", "Quiero ir a la playa"],
            "correctAnswer": "Disculpe, ¿dónde está la estación de metro más cercana?",
            "explanation": {"en": "'Disculpe, ¿dónde está...?' is the polite way to ask for directions.", "te": "మర్యాదగా దారి అడగడానికి 'Disculpe, ¿dónde está...?' వాడతారు.", "hi": "'Disculpe, ¿dónde está...?' विनम्रता से रास्ता पूछने का वाक्य है।"}
        }
    ],

    "fr": [
        {
            "difficulty": "beginner",
            "instruction": {"en": "Select the French greeting for 'Good day / Hello'.", "te": "హలో / నమస్కారానికి ఫ్రెంచ్ పదాన్ని ఎంచుకోండి.", "hi": "हैलो / नमस्ते के लिए सही फ़्रेंच शब्द चुनें।"},
            "question": "Which word is the standard daytime greeting in French?",
            "options": ["Bonjour", "Merci", "Au revoir", "S'il vous plaît"],
            "correctAnswer": "Bonjour",
            "explanation": {"en": "'Bonjour' is the universal polite greeting during the day.", "te": "'Bonjour' పగటిపూట చెప్పే గౌరవప్రదమైన నమస్కారం.", "hi": "'Bonjour' दिन के समय का मानक शिष्ट अभिवादन है।"}
        },
        {
            "difficulty": "beginner",
            "instruction": {"en": "Choose the polite phrase for 'Please' in French.", "te": "'దయచేసి' కి ఫ్రెంచ్ పదం ఏది?", "hi": "'कृपया' के लिए फ़्रेंच शब्द कौन सा है?"},
            "question": "What is the polite expression for 'Please' when speaking to strangers?",
            "options": ["S'il vous plaît", "De rien", "Bonne nuit", "Pardon"],
            "correctAnswer": "S'il vous plaît",
            "explanation": {"en": "'S'il vous plaît' is the formal and respectful 'Please'.", "te": "'S'il vous plaît' అంటే దయచేసి అని అర్థం.", "hi": "'S'il vous plaît' का अर्थ कृपया है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "How do you ask for the price of something in a French shop?", "te": "దుకాణంలో వస్తువు ధరను ఎలా అడుగుతారు?", "hi": "दुकान में दाम कैसे पूछेंगे?"},
            "question": "Which question asks 'How much is it?' in French?",
            "options": ["Combien ça coûte ?", "Quel est votre nom ?", "Quelle heure est-il ?", "Où est la sortie ?"],
            "correctAnswer": "Combien ça coûte ?",
            "explanation": {"en": "'Combien ça coûte ?' means 'How much does it cost?'.", "te": "'Combien ça coûte ?' అంటే దీని ఖరీదు ఎంత అని.", "hi": "'Combien ça coûte ?' का अर्थ है इसका दाम क्या है?"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "Select the phrase for asking for the bill in a French restaurant.", "te": "రెస్టారెంట్‌లో బిల్లు అడగడానికి సరైనది ఏది?", "hi": "रेस्तरां में बिल मांगने के लिए क्या कहेंगे?"},
            "question": "How do you say 'The check, please' in a French restaurant?",
            "options": ["L'addition, s'il vous plaît", "Une table pour deux", "Je suis végétarien", "Le menu du jour"],
            "correctAnswer": "L'addition, s'il vous plaît",
            "explanation": {"en": "'L'addition, s'il vous plaît' means 'The check, please'.", "te": "'L'addition, s'il vous plaît' అంటే దయచేసి బిల్లు ఇవ్వండి.", "hi": "'L'addition, s'il vous plaît' का अर्थ बिल मांगना है।"}
        },
        {
            "difficulty": "advanced",
            "instruction": {"en": "Choose the sentence asking for directions to the train station.", "te": "రైల్వే స్టేషన్ ఎక్కడ ఉందో అడగడానికి సరైనది ఏది?", "hi": "रेलवे स्टेशन का रास्ता पूछने के लिए कौन सा वाक्य सही है?"},
            "question": "Which sentence means 'Excuse me, where is the train station?'",
            "options": ["Pardon, où se trouve la gare ?", "Le train est complet", "Je voudrais un billet", "À quelle heure part le bus ?"],
            "correctAnswer": "Pardon, où se trouve la gare ?",
            "explanation": {"en": "'Pardon, où se trouve la gare ?' asks for the train station.", "te": "'Pardon, où se trouve la gare ?' రైల్వే స్టేషన్ ఎక్కడ ఉందో అడుగుతుంది.", "hi": "'Pardon, où se trouve la gare ?' रेलवे स्टेशन का रास्ता पूछता है।"}
        }
    ],

    "ta": [
        {
            "difficulty": "beginner",
            "instruction": {"en": "Select the traditional Tamil greeting for 'Hello'.", "te": "నమస్కారానికి సాంప్రదాయక తమిళ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए पारंपरिक तमिल शब्द चुनें।"},
            "question": "Which word is the traditional, respectful greeting in Tamil?",
            "options": ["வணக்கம்", "நன்றி", "போய் வருகிறேன்", "ஆம்"],
            "correctAnswer": "வணக்கம்",
            "explanation": {"en": "'வணக்கம்' (Vanakkam) is the classic Tamil greeting.", "te": "'வணக்கம்' (వణక్కం) తమిళ నమస్కారం.", "hi": "'வணக்கம்' (वणक्कम) तमिल अभिवादन है।"}
        },
        {
            "difficulty": "beginner",
            "instruction": {"en": "Identify the word for 'Thank you' in Tamil.", "te": "'ధన్యవాదాలు' కి తమిళ పదం ఏది?", "hi": "'धन्यवाद' के लिए तमिल शब्द कौन सा है?"},
            "question": "How do you express gratitude in Tamil?",
            "options": ["நன்றி", "வணக்கம்", "மன்னிக்கவும்", "இல்லை"],
            "correctAnswer": "நன்றி",
            "explanation": {"en": "'நன்றி' (Nandri) means thank you.", "te": "'நன்றி' అంటే ధన్యవాదాలు.", "hi": "'நன்றி' का अर्थ धन्यवाद है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "How do you ask 'How much is this?' in Tamil?", "te": "'దీని ఖరీదు ఎంత?' అని తమిళంలో ఎలా అడుగుతారు?", "hi": "तमिल में 'यह कितने का है?' कैसे पूछेंगे?"},
            "question": "Which question asks for the price of an item in Tamil?",
            "options": ["இது என்ன விலை?", "உங்கள் பெயர் என்ன?", "எங்கே போகிறீர்கள்?", "மணி என்ன?"],
            "correctAnswer": "இது என்ன விலை?",
            "explanation": {"en": "'இது என்ன விலை?' (Idhu enna vilai?) asks what the price is.", "te": "'இது என்ன விலை?' అంటే దీని ధర ఎంత అని.", "hi": "'இது என்ன விலை?' का अर्थ इसका दाम क्या है?"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "Select the phrase for asking for water in a restaurant.", "te": "హోటల్‌లో నీళ్లు కావాలని ఎలా అడుగుతారు?", "hi": "होटल में पानी मांगने के लिए क्या कहेंगे?"},
            "question": "How do you ask for drinking water in Tamil?",
            "options": ["தண்ணீர் கொடுங்கள்", "சாப்பாடு வேண்டாம்", "காபி இல்லை", "பில் கொடுங்கள்"],
            "correctAnswer": "தண்ணீர் கொடுங்கள்",
            "explanation": {"en": "'தண்ணீர் கொடுங்கள்' (Thanneer kodungal) means 'Please give water'.", "te": "'தண்ணீர் கொடுங்கள்' అంటే నీళ్లు ఇవ్వండి అని అర్థం.", "hi": "'தண்ணீர் கொடுங்கள்' का अर्थ पानी दीजिए है।"}
        },
        {
            "difficulty": "advanced",
            "instruction": {"en": "Choose the sentence asking where the bus stand is in Tamil.", "te": "బస్ స్టాండ్ ఎక్కడ ఉందో అడగడానికి సరైనది ఏది?", "hi": "बस स्टैंड कहाँ है पूछने के लिए सही वाक्य कौन सा है?"},
            "question": "Which sentence means 'Excuse me, where is the bus stand?'",
            "options": ["மன்னிக்கவும், பேருந்து நிலையம் எங்கே இருக்கிறது?", "பேருந்து வந்துவிட்டது", "டிக்கெட் கொடுங்கள்", "சென்னைக்கு போக வேண்டும்"],
            "correctAnswer": "மன்னிக்கவும், பேருந்து நிலையம் எங்கே இருக்கிறது?",
            "explanation": {"en": "'பேருந்து நிலையம் எங்கே இருக்கிறது?' asks where the bus stand is.", "te": "'பேరుந்து நிலையம் ఎங்கே இருக்கிறது?' అంటే బస్ స్టాండ్ ఎక్కడ ఉంది అని.", "hi": "'பேருந்து நிலையம் எங்கே இருக்கிறது?' बस स्टैंड का पता पूछता है।"}
        }
    ],

    "hi": [
        {
            "difficulty": "beginner",
            "instruction": {"en": "Select the standard Hindi greeting for 'Hello'.", "te": "నమస్కారానికి ప్రామాణిక హిందీ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए मानक शब्द चुनें।"},
            "question": "Which word is the universal respectful greeting in Hindi?",
            "options": ["नमस्ते", "धन्यवाद", "अलविदा", "हाँ"],
            "correctAnswer": "नमस्ते",
            "explanation": {"en": "'नमस्ते' (Namaste) is the universal greeting in Hindi.", "te": "'नमस्ते' హిందీలో ప్రామాణిక నమస్కారం.", "hi": "'नमस्ते' मानक अभिवादन है।"}
        },
        {
            "difficulty": "beginner",
            "instruction": {"en": "Choose the Hindi word for 'Thank you'.", "te": "'ధన్యవాదాలు' కి సరైన హిందీ పదం ఏది?", "hi": "'धन्यवाद' के लिए सही शब्द कौन सा है?"},
            "question": "What is the formal word for expressing gratitude in Hindi?",
            "options": ["धन्यवाद", "कृपया", "माफ़ कीजिए", "ठीक है"],
            "correctAnswer": "धन्यवाद",
            "explanation": {"en": "'धन्यवाद' (Dhanyavaad) means thank you.", "te": "'धन्यवाद' అంటే ధన్యవాదాలు.", "hi": "'धन्यवाद' का अर्थ शुक्रिया है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "How do you ask 'How much is this?' in a Hindi market?", "te": "'దీని ధర ఎంత?' అని హిందీలో ఎలా అడుగుతారు?", "hi": "दुकान में 'यह कितने का है?' कैसे पूछेंगे?"},
            "question": "Which question asks for the price of an item in Hindi?",
            "options": ["यह कितने का है?", "आप कहाँ जा रहे हैं?", "आपका नाम क्या है?", "कितने बजे हैं?"],
            "correctAnswer": "यह कितने का है?",
            "explanation": {"en": "'यह कितने का है?' (Yeh kitne ka hai?) means 'How much is this?'.", "te": "'यह कितने का है?' అంటే దీని ధర ఎంత అని.", "hi": "'यह कितने का है?' दाम पूछने का सही वाक्य है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "Select the sentence for ordering tea with less sugar.", "te": "చక్కెర తక్కువగా ఉన్న టీ అడగడానికి సరైన వాక్యం ఏది?", "hi": "कम चीनी वाली चाय मंगाने के लिए क्या कहेंगे?"},
            "question": "How do you order tea with less sugar in Hindi?",
            "options": ["कम चीनी वाली चाय दीजिए", "मुझे कॉफ़ी नहीं चाहिए", "बिल ले आइए", "खाना बहुत तीखा है"],
            "correctAnswer": "कम चीनी वाली चाय दीजिए",
            "explanation": {"en": "'कम चीनी वाली चाय दीजिए' specifies less sugar politely.", "te": "'कम चीनी वाली चाय दीजिए' అంటే చక్కెర తక్కువగా ఉన్న టీ ఇవ్వండి.", "hi": "'कम चीनी वाली चाय दीजिए' सही वाक्य है।"}
        },
        {
            "difficulty": "advanced",
            "instruction": {"en": "Choose the question asking for directions to the nearest hospital in Hindi.", "te": "సమీపంలోని ఆసుపత్రి ఎక్కడ ఉందో అడగడానికి సరైనది ఏది?", "hi": "नज़दीकी अस्पताल का रास्ता पूछने के लिए कौन सा वाक्य सही है?"},
            "question": "Which sentence means 'Excuse me, where is the nearest hospital?'",
            "options": ["सुनिए, सबसे नज़दीकी अस्पताल कहाँ है?", "दवा की दुकान बंद है", "डॉक्टर साहब चले गए", "मुझे बुखार नहीं है"],
            "correctAnswer": "सुनिए, सबसे नज़दीकी अस्पताल कहाँ है?",
            "explanation": {"en": "'सुनिए, सबसे नज़दीकी अस्पताल कहाँ है?' is the polite way to ask for the hospital.", "te": "'सुनिए, सबसे नज़दीकी अस्पताल कहाँ है?' ఆసుపత్రి దారి అడుగుతుంది.", "hi": "'सुनिए, सबसे नज़दीकी अस्पताल कहाँ है?' सही वाक्य है।"}
        }
    ],

    "te": [
        {
            "difficulty": "beginner",
            "instruction": {"en": "Select the standard Telugu greeting for 'Hello'.", "te": "నమస్కారానికి ప్రామాణిక పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही तेलुगु शब्द चुनें।"},
            "question": "Which word is the traditional polite greeting in Telugu?",
            "options": ["నమస్కారం", "ధన్యవాదాలు", "వెళ్లివస్తాను", "అవును"],
            "correctAnswer": "నమస్కారం",
            "explanation": {"en": "'నమస్కారం' (Namaskāram) is the traditional Telugu greeting.", "te": "'నమస్కారం' ప్రామాణిక తెలుగు పలకరింపు.", "hi": "'నమస్కారం' मानक तेलुगु अभिवादन है।"}
        },
        {
            "difficulty": "beginner",
            "instruction": {"en": "Choose the word for 'Thank you' in Telugu.", "te": "'ధన్యవాదాలు' కి సమానమైన పదం ఏది?", "hi": "'धन्यवाद' के लिए तेलुगु शब्द कौन सा है?"},
            "question": "How do you express gratitude in Telugu?",
            "options": ["ధన్యవాదాలు", "దయచేసి", "క్షమించండి", "పర్వాలేదు"],
            "correctAnswer": "ధన్యవాదాలు",
            "explanation": {"en": "'ధన్యవాదాలు' (Dhanyavādālu) means thank you.", "te": "'ధన్యవాదాలు' కృతజ్ఞతను తెలుపుతుంది.", "hi": "'ధన్యవాదాలు' का अर्थ धन्यवाद है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "How do you ask 'How much does this cost?' in Telugu?", "te": "'ఇది ఎంత?' అని ధరను ఎలా అడుగుతారు?", "hi": "तेलुगु में 'यह कितने का है?' कैसे पूछेंगे?"},
            "question": "Which question asks for the price of an item in Telugu?",
            "options": ["ఇది ఎంతండి?", "మీ ఊరు ఏది?", "ఎప్పుడు వస్తారు?", "ఎవరు మీరు?"],
            "correctAnswer": "ఇది ఎంతండి?",
            "explanation": {"en": "'ఇది ఎంతండి?' (Idi enthandi?) asks how much something costs politely.", "te": "'ఇది ఎంతండి?' అంటే దీని ఖరీదు ఎంత అని.", "hi": "'ఇది ఎంతండి?' दाम पूछने का शिष्ट तरीका है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "Select the phrase for asking for drinking water in a hotel.", "te": "హోటల్‌లో మంచినీళ్లు కావాలని ఎలా అడుగుతారు?", "hi": "होटल में पीने का पानी कैसे मांगेंगे?"},
            "question": "How do you ask for drinking water in Telugu?",
            "options": ["మంచినీళ్లు తీసుకురండి", "భోజనం వద్దు", "కాఫీ తాగను", "బిల్లు ఎంత?"],
            "correctAnswer": "మంచినీళ్లు తీసుకురండి",
            "explanation": {"en": "'మంచినీళ్లు తీసుకురండి' means 'Please bring drinking water'.", "te": "'మంచినీళ్లు తీసుకురండి' అంటే తాగే నీళ్లు తీసుకురండి అని.", "hi": "'మంచినీళ్లు తీసుకురండి' का अर्थ पीने का पानी लाइए है।"}
        },
        {
            "difficulty": "advanced",
            "instruction": {"en": "Choose the sentence asking for directions to the railway station.", "te": "రైల్వే స్టేషన్ ఎక్కడ ఉందో అడగడానికి సరైనది ఏది?", "hi": "रेलवे स्टेशन कहाँ है पूछने के लिए कौन सा वाक्य सही है?"},
            "question": "Which sentence means 'Excuse me, where is the railway station?' in Telugu?",
            "options": ["కొంచెం వినండి, రైల్వే స్టేషన్ ఎక్కడ ఉంది?", "రైలు వెళ్లిపోయింది", "టికెట్ కొన్నాను", "నేను స్టేషన్‌కి వెళ్లను"],
            "correctAnswer": "కొంచెం వినండి, రైల్వే స్టేషన్ ఎక్కడ ఉంది?",
            "explanation": {"en": "'రైల్వే స్టేషన్ ఎక్కడ ఉంది?' asks for the location of the railway station.", "te": "'రైల్వే స్టేషన్ ఎక్కడ ఉంది?' సరైన ప్రశ్న.", "hi": "'రైల్వే స్టేషన్ ఎక్కడ ఉంది?' सही वाक्य है।"}
        }
    ],

    "en": [
        {
            "difficulty": "beginner",
            "instruction": {"en": "Select the standard English greeting for 'Hello'.", "te": "హలో / నమస్కారానికి ఆంగ్ల పదాన్ని ఎంచుకోండి.", "hi": "हैलो / नमस्ते के लिए सही अंग्रेज़ी शब्द चुनें।"},
            "question": "Which phrase is the standard polite greeting in English?",
            "options": ["Hello! Good morning", "Goodbye friend", "No thanks", "Yesterday morning"],
            "correctAnswer": "Hello! Good morning",
            "explanation": {"en": "'Hello! Good morning' is the standard polite greeting.", "te": "'Hello! Good morning' ప్రామాణిక పలకరింపు.", "hi": "'Hello! Good morning' मानक शिष्ट अभिवादन है।"}
        },
        {
            "difficulty": "beginner",
            "instruction": {"en": "Choose the polite phrase for 'Please' in English.", "te": "'దయచేసి' కి ఆంగ్ల పదం ఏది?", "hi": "'कृपया' के लिए अंग्रेज़ी शब्द कौन सा है?"},
            "question": "What is the polite word used when making a request?",
            "options": ["Please", "Sorry", "Never", "Quickly"],
            "correctAnswer": "Please",
            "explanation": {"en": "'Please' is used to make requests polite.", "te": "'Please' అంటే దయచేసి.", "hi": "'Please' का अर्थ कृपया है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "How do you ask for the price of an item in English?", "te": "'దీని ఖరీదు ఎంత?' అని ఆంగ్లంలో ఎలా అడుగుతారు?", "hi": "अंग्रेज़ी में 'यह कितने का है?' कैसे पूछेंगे?"},
            "question": "Which question asks how much an item costs?",
            "options": ["How much does this cost?", "Where is the exit?", "Who is the manager?", "What is today's date?"],
            "correctAnswer": "How much does this cost?",
            "explanation": {"en": "'How much does this cost?' is the correct phrasing.", "te": "'How much does this cost?' అంటే దీని ఖరీదు ఎంత అని.", "hi": "'How much does this cost?' दाम पूछने का सही वाक्य है।"}
        },
        {
            "difficulty": "intermediate",
            "instruction": {"en": "Select the phrase for asking for the restaurant bill in English.", "te": "రెస్టారెంట్‌లో బిల్లు అడగడానికి సరైనది ఏది?", "hi": "रेस्तरां में बिल मांगने के लिए क्या कहेंगे?"},
            "question": "How do you politely ask for the check in a restaurant?",
            "options": ["Could we have the check, please?", "Give me free food", "I don't have money", "Throw the menu"],
            "correctAnswer": "Could we have the check, please?",
            "explanation": {"en": "'Could we have the check, please?' is standard polite speech.", "te": "'Could we have the check, please?' బిల్లు అడిగే సరైన పద్ధతి.", "hi": "'Could we have the check, please?' बिल मांगने का शिष्ट तरीका है।"}
        },
        {
            "difficulty": "advanced",
            "instruction": {"en": "Choose the sentence asking for directions to the nearest subway station.", "te": "సమీపంలోని సబ్‌వే స్టేషన్ ఎక్కడ ఉందో అడగడానికి సరైనది ఏది?", "hi": "सबसे नज़दीकी मेट्रो स्टेशन का रास्ता पूछने के लिए कौन सा वाक्य सही है?"},
            "question": "Which sentence means 'Excuse me, where is the nearest subway station?'",
            "options": ["Excuse me, where is the nearest subway station?", "The train has already left", "I need to buy a bicycle", "How fast is the subway?"],
            "correctAnswer": "Excuse me, where is the nearest subway station?",
            "explanation": {"en": "'Excuse me, where is the nearest subway station?' is correct.", "te": "'Excuse me, where is the nearest subway station?' సరైన ప్రశ్న.", "hi": "'Excuse me, where is the nearest subway station?' सही वाक्य है।"}
        }
    ]
}

def get_pair_placement_questions(native_code, target_code):
    """Generates 5 localized placement test questions for the pair."""
    raw_qs = RAW_PLACEMENT_DATA.get(target_code, RAW_PLACEMENT_DATA["en"])
    qs = []
    for q in raw_qs:
        qs.append({
            "difficulty": q["difficulty"],
            "instruction": get_loc(q["instruction"], native_code),
            "question": q["question"],
            "options": q["options"],
            "correctAnswer": q["correctAnswer"],
            "explanation": get_loc(q["explanation"], native_code)
        })
    return qs
