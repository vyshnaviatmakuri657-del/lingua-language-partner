# scripts/target_te.py
# -*- coding: utf-8 -*-
"""15 Real-Life Situational Telugu Lessons across 5 Modules."""

TE_LESSONS = [
    # MODULE 1: Everyday Survival & Greetings
    [
        {
            "title": {"en": "Daily Greetings & Hello", "te": "రోజువారీ శుభాకాంక్షలు (నమస్కారం)", "hi": "दैनिक अभिवादन (నమస్కారం)"},
            "objective": {"en": "Master నమస్కారం (Namaskāram), ధన్యవాదాలు (Dhanyavādālu), and daily Telugu greetings.", "te": "నమస్కారం, ధన్యవాదాలు మరియు సహజమైన తెలుగు పలకరింపులు నేర్చుకోండి.", "hi": "नमस्ते, धन्यवाद और तेलुगु में दैनिक शिष्टाचार सीखें।"},
            "culturalTip": {"en": "Saying 'నమస్కారం' (Namaskāram) with palms joined at chest level is the traditional, respectful Telugu greeting.", "te": "రెండు చేతులు జోడించి 'నమస్కారం' అనడం తెలుగు సంస్కృతిలో గౌరవప్రదమైన పలకరింపు.", "hi": "दोनों हाथ जोड़कर 'నమస్కారం' (नमस्कारम) कहना तेलुगु संस्कृति में आदरणीय अभिवादन है।"},
            "grammar": {
                "title": {"en": "Respectful Address (మీరు vs నువ్వు)", "te": "గౌరవ సంబోధన (మీరు vs నువ్వు)", "hi": "आदरणीय संबोधन (మీరు बनाम నువ్వు)"},
                "explanation": {"en": "Use 'మీరు' (Meeru) for elders, strangers, and polite situations; 'నువ్వు' (Nuvvu) for peers or children.", "te": "గౌరవంగా మాట్లాడేటప్పుడు 'మీరు', స్నేహితులతో 'నువ్వు' వాడతారు.", "hi": "बड़ों और अजनबियों के लिए 'మీరు' (आप) और छोटों के लिए 'నువ్వు' (तुम) का प्रयोग करें।"},
                "ruleSummary": {"en": "మీరు ఎలా ఉన్నారు? (Formal) vs నువ్వు ఎలా ఉన్నావు? (Informal).", "te": "మీరు ఎలా ఉన్నారు? (గౌరవ రూపం)", "hi": "మీరు ఎలా ఉన్నారు? (आप कैसे हैं?)"},
                "examples": [{"target": "నమస్కారం! మీరు ఎలా ఉన్నారు?", "transliteration": "Namaskāram! Meeru elā unnāru?", "native": {"en": "Hello! How are you?", "te": "నమస్కారం! మీరు ఎలా ఉన్నారు?", "hi": "नमस्ते! आप कैसे हैं?"}}],
                "commonMistakes": [{"incorrect": "నువ్వు ఎలా (to elders)", "correct": "మీరు ఎలా ఉన్నారు?", "explanation": {"en": "Always use 'మీరు' with adults.", "te": "పెద్దవారితో 'మీరు ఎలా ఉన్నారు?' అనాలి.", "hi": "बड़ों से हमेशा 'మీరు ఎలా ఉన్నారు?' कहें।"}}]
            },
            "vocab": [
                {"word": "నమస్కారం", "translit": "Namaskāram", "pron": "Namaskaaram", "pos": "greeting", "meanings": {"en": "Hello / Greetings", "te": "నమస్కారం", "hi": "नमस्ते / प्रणाम"}, "exTarget": "నమస్కారం! బాగున్నారా?", "exTranslit": "Namaskāram! Bāgunnārā?", "exNative": {"en": "Hello! Are you well?", "te": "నమస్కారం! బాగున్నారా?", "hi": "नमस्ते! क्या आप अच्छे हैं?"}},
                {"word": "ధన్యవాదాలు", "translit": "Dhanyavādālu", "pron": "Dhanyavaadaalu", "pos": "phrase", "meanings": {"en": "Thank you", "te": "ధన్యవాదాలు", "hi": "धन्यवाद"}, "exTarget": "మీ సహాయానికి చాలా ధన్యవాదాలు.", "exTranslit": "Mee sahāyāniki chālā dhanyavādālu.", "exNative": {"en": "Thank you very much for your help.", "te": "మీ సహాయానికి చాలా ధన్యవాదాలు.", "hi": "आपकी मदद के लिए बहुत धन्यवाद।"}},
                {"word": "వెళ్లివస్తాను", "translit": "Vellivastānu", "pron": "Velli-vastaanu", "pos": "phrase", "meanings": {"en": "Goodbye (I will go and return)", "te": "వెళ్లివస్తాను (వీడ్కోలు)", "hi": "अलविदा (जाकर आता हूँ)"}, "exTarget": "ఇక వెళ్లివస్తాను, రేపు కలుద్దాం.", "exTranslit": "Ika vellivastānu, rēpu kaluddām.", "exNative": {"en": "Goodbye for now, see you tomorrow.", "te": "ఇక వెళ్లివస్తాను, రేపు కలుద్దాం.", "hi": "अब मैं चलता हूँ, कल मिलते हैं।"}},
                {"word": "అవును", "translit": "Avunu", "pron": "Avunu", "pos": "interjection", "meanings": {"en": "Yes", "te": "అవును", "hi": "हाँ"}, "exTarget": "అవును, నాకు అర్థమైంది.", "exTranslit": "Avunu, nāku arthamaindi.", "exNative": {"en": "Yes, I understand.", "te": "అవును, నాకు అర్థమైంది.", "hi": "हाँ, मुझे समझ आ गया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the Telugu word for 'Hello'.", "te": "నమస్కారానికి సరైన తెలుగు పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही तेलुगु शब्द चुनें।"}, "prompt": {"en": "Hello", "te": "నమస్కారం", "hi": "नमस्ते"}, "correct": "నమస్కారం", "options": ["నమస్కారం", "ధన్యవాదాలు", "వెళ్లివస్తాను", "కాదు"], "expl": {"en": "'నమస్కారం' (Namaskāram) is the traditional greeting.", "te": "తెలుగులో ప్రామాణిక నమస్కారం 'నమస్కారం'.", "hi": "'నమస్కారం' मानक तेलुगु अभिवादन है।"}}
            ]
        },
        {
            "title": {"en": "Politeness, Excuse Me & Please", "te": "మర్యాదపూర్వక మాటలు & క్షమించండి", "hi": "माफ़ी और शिष्टाचार"},
            "objective": {"en": "Express 'దయచేసి' (Please) and 'క్షమించండి' (Excuse me / Sorry) politely.", "te": "దయచేసి మరియు క్షమించండి అని మర్యాదగా చెప్పడం నేర్చుకోండి.", "hi": "कृपया और माफ़ कीजिए का उपयोग सीखें।"},
            "culturalTip": {"en": "Adding 'అండి' (andi) at the end of sentences or names is the quintessential Telugu mark of respect.", "te": "మాటల చివర 'అండి' చేర్చడం తెలుగులో అత్యంత సహజమైన గౌరవ చిహ్నం.", "hi": "वाक्य या नाम के अंत में 'అండి' (अंडी) लगाना तेलुगु में आदर का प्रतीक है।"},
            "grammar": {
                "title": {"en": "Respectful Suffix (-అండి)", "te": "గౌరవ ప్రత్యయం (-అండి)", "hi": "आदरणीय प्रत्यय (-అండి)"},
                "explanation": {"en": "Add 'అండి' (andi) to words or verbs to instantly make them respectful: రండి (Come), వినండి (Listen).", "te": "క్రియ చివర 'అండి' చేరిస్తే మర్యాద వస్తుంది: రండి, చెప్పండి.", "hi": "क्रिया के अंत में 'అండి' जोड़ने से आदर जुड़ता है: రండి (आइए), చెప్పండి (बताइए)।"},
                "ruleSummary": {"en": "Verb Root + -అండి = Polite request.", "te": "క్రియ + -అండి = గౌరవ రూపం.", "hi": "क्रिया + -అండి = विनम्र रूप।"},
                "examples": [{"target": "దయచేసి లోపలికి రండి", "transliteration": "Dayachēsi lōpaliki randi", "native": {"en": "Please come inside.", "te": "దయచేసి లోపలికి రండి.", "hi": "कृपया अंदर आइए।"}}],
                "commonMistakes": [{"incorrect": "రా (to elders)", "correct": "రండి", "explanation": {"en": "Use రండి with adults, never bare రా.", "te": "పెద్దవారిని 'రండి' అనాలి.", "hi": "बड़ों से हमेशा రండి कहें।"}}]
            },
            "vocab": [
                {"word": "దయచేసి", "translit": "Dayachēsi", "pron": "Dayachesi", "pos": "phrase", "meanings": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "exTarget": "దయచేసి కొంచెం సహాయం చేయండి.", "exTranslit": "Dayachēsi konchem sahāyam cheyandi.", "exNative": {"en": "Please help a little.", "te": "దయచేసి కొంచెం సహాయం చేయండి.", "hi": "कृपया थोड़ी मदद कीजिए।"}},
                {"word": "క్షమించండి", "translit": "Kshaminchandi", "pron": "Kshaminchandi", "pos": "phrase", "meanings": {"en": "Excuse me / I am sorry", "te": "క్షమించండి", "hi": "माफ़ कीजिए"}, "exTarget": "క్షమించండి, నేను చూడలేదు.", "exTranslit": "Kshaminchandi, nēnu chūdalēdu.", "exNative": {"en": "Excuse me, I didn't see.", "te": "క్షమించండి, నేను చూడలేదు.", "hi": "माफ़ कीजिए, मैंने देखा नहीं।"}},
                {"word": "పర్వాలేదు", "translit": "Parvālēdu", "pron": "Parvaaledu", "pos": "phrase", "meanings": {"en": "No problem / It's okay", "te": "పర్వాలేదు", "hi": "कोई बात नहीं"}, "exTarget": "పర్వాలేదండి, ఏమీ కాదు.", "exTranslit": "Parvālēdandi, ēmī kādu.", "exNative": {"en": "No problem, it's nothing.", "te": "పర్వాలేదండి, ఏమీ కాదు.", "hi": "कोई बात नहीं, कुछ नहीं हुआ।"}},
                {"word": "కాదు / లేదు", "translit": "Kādu / Lēdu", "pron": "Kaadu / Ledu", "pos": "interjection", "meanings": {"en": "No / Not", "te": "కాదు / లేదు", "hi": "नहीं"}, "exTarget": "లేదు, నాకు వద్దు.", "exTranslit": "Lēdu, nāku vaddu.", "exNative": {"en": "No, I don't want it.", "te": "లేదు, నాకు వద్దు.", "hi": "नहीं, मुझे नहीं चाहिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'Please' in Telugu?", "te": "'దయచేసి' అని తెలుగులో ఎలా అంటారు?", "hi": "तेलुगु में 'कृपया' कैसे कहते हैं?"}, "prompt": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "correct": "దయచేసి", "options": ["దయచేసి", "పర్వాలేదు", "నమస్కారం", "లేదు"], "expl": {"en": "'దయచేసి' means please.", "te": "దయచేసి అంటే Dayachesi.", "hi": "దయచేసి का अर्थ कृपया है।"}}
            ]
        },
        {
            "title": {"en": "Introducing Yourself & Origin", "te": "పరిచయం & ఎక్కడి నుంచి వచ్చారో చెప్పడం", "hi": "आत्मपरिचय और गृह देश"},
            "objective": {"en": "Say 'నా పేరు...' (My name is...) and 'నేను భారతదేశం నుంచి వచ్చాను' (I came from India).", "te": "మీ పేరు మరియు ఊరు తెలుగులో చెప్పడం నేర్చుకోండి.", "hi": "अपना नाम और स्थान बताना सीखें।"},
            "culturalTip": {"en": "After introducing yourself, saying 'మిమ్మల్ని కలవడం చాలా సంతోషం' (Pleased to meet you) makes a wonderful impression.", "te": "పరిచయం తర్వాత 'మిమ్మల్ని కలవడం సంతోషం' అనడం ఆత్మీయతను పెంచుతుంది.", "hi": "परिचय के बाद 'మిమ్మల్ని కలవడం చాలా సంతోషం' कहना स्नेह बढ़ाता है।"},
            "grammar": {
                "title": {"en": "Possessive & Origin (నా పేరు / నుంచి)", "te": "సంబంధ రూపాలు (నా పేరు / నుంచి)", "hi": "संबंध रूप (నా పేరు / నుంచి)"},
                "explanation": {"en": "'నా పేరు [Name]' = 'My name is [Name]'. '[Place] నుంచి వచ్చాను' = 'I came from [Place]'.", "te": "నా పేరు చెప్పడానికి 'నా పేరు...', ఊరు చెప్పడానికి '[ఊరు] నుంచి వచ్చాను' అంటారు.", "hi": "नाम के लिए 'నా పేరు...' और स्थान के लिए '[स्थान] నుంచి వచ్చాను' बोलें।"},
                "ruleSummary": {"en": "నా పేరు [Name]. నేను [Place] నుంచి వచ్చాను.", "te": "నా పేరు [పేరు]. నేను [స్థలం] నుంచి వచ్చాను.", "hi": "मेरा नाम [नाम] है। मैं [स्थान] से आया हूँ।"},
                "examples": [{"target": "నా పేరు కిరణ్, నేను హైదరాబాద్ నుంచి వచ్చాను", "transliteration": "Nā pēru Kiran, nēnu Hyderabad nunchi vachānu", "native": {"en": "My name is Kiran, I am from Hyderabad.", "te": "నా పేరు కిరణ్, నేను హైదరాబాద్ నుంచి వచ్చాను.", "hi": "मेरा नाम किरण है, मैं हैदराबाद से आया हूँ।"}}],
                "commonMistakes": [{"incorrect": "నేను పేరు కిరణ్", "correct": "నా పేరు కిరణ్", "explanation": {"en": "Use possessive 'నా' (my), not 'నేను' (I).", "te": "నా పేరు అనాలి, నేను పేరు అనకూడదు.", "hi": "हमेशा 'నా పేరు' (मेरा नाम) कहें।"}}]
            },
            "vocab": [
                {"word": "పేరు", "translit": "Pēru", "pron": "Peeru", "pos": "noun", "meanings": {"en": "Name", "te": "పేరు", "hi": "नाम"}, "exTarget": "మీ పేరు ఏమిటి?", "exTranslit": "Mee pēru ēmiti?", "exNative": {"en": "What is your name?", "te": "మీ పేరు ఏమిటి?", "hi": "आपका नाम क्या है?"}},
                {"word": "నుంచి", "translit": "Nunchi", "pron": "Nunchi", "pos": "postposition", "meanings": {"en": "From", "te": "నుంచి / నుండి", "hi": "से"}, "exTarget": "నేను భారతదేశం నుంచి వచ్చాను.", "exTranslit": "Nēnu Bhāratadēśam nunchi vachānu.", "exNative": {"en": "I came from India.", "te": "నేను భారతదేశం నుంచి వచ్చాను.", "hi": "मैं भारत से आया हूँ।"}},
                {"word": "సంతోషం", "translit": "Santōsham", "pron": "Santosham", "pos": "noun", "meanings": {"en": "Happy / Pleasure", "te": "సంతోషం", "hi": "खुशी / प्रसन्नता"}, "exTarget": "మిమ్మల్ని కలవడం చాలా సంతోషం.", "exTranslit": "Mimmalni kalavadam chālā santōsham.", "exNative": {"en": "Very happy to meet you.", "te": "మిమ్మల్ని కలవడం చాలా సంతోషం.", "hi": "आपसे मिलकर बहुत खुशी हुई।"}},
                {"word": "ఎవరు", "translit": "Evaru", "pron": "Evaru", "pos": "pronoun", "meanings": {"en": "Who", "te": "ఎవరు", "hi": "कौन"}, "exTarget": "వారు ఎవరు?", "exTranslit": "Vāru evaru?", "exNative": {"en": "Who is that person?", "te": "వారు ఎవరు?", "hi": "वे कौन हैं?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'What is your name?' politely in Telugu?", "te": "'మీ పేరు ఏమిటి?' అని గౌరవంగా ఎలా అడుగుతారు?", "hi": "तेलुगु में 'आपका नाम क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is your name?", "te": "మీ పేరు ఏమిటి?", "hi": "आपका नाम क्या है?"}, "correct": "మీ పేరు ఏమిటి?", "options": ["మీ పేరు ఏమిటి?", "నువ్వు ఎవరు?", "మీరు ఎక్కడ ఉన్నారు?", "బాగున్నారా?"], "expl": {"en": "'మీ పేరు ఏమిటి?' (Mee pēru ēmiti?) is the polite question.", "te": "గౌరవంగా 'మీ పేరు ఏమిటి?' అని అడగాలి.", "hi": "'మీ పేరు ఏమిటి?' आदरणीय प्रश्न है।"}}
            ]
        }
    ],

    # MODULE 2: Real-World Shopping & Numbers
    [
        {
            "title": {"en": "Numbers & Counting Prices", "te": "సంఖ్యలు & ధరలు లెక్కించడం", "hi": "संख्याएँ और कीमतें"},
            "objective": {"en": "Count numbers 1 to 1000 and calculate rupees in Telugu markets.", "te": "1 నుంచి 1000 వరకు సంఖ్యలు మరియు రూపాయలు లెక్కించడం నేర్చుకోండి.", "hi": "1 से 1000 तक संख्याएँ और रुपयों की गणना सीखें।"},
            "culturalTip": {"en": "In local bazaars, saying 'ఎంతండి?' (Enthandi? - How much?) with 'అండి' builds immediate rapport with vendors.", "te": "షాపులో 'ఎంతండి?' అని మర్యాదగా అడగడం స్థానిక పద్ధతి.", "hi": "बाज़ार में 'ఎంతండి?' (कितना है जी?) कहना बहुत शिष्ट माना जाता है।"},
            "grammar": {
                "title": {"en": "Asking 'How much?' (ఎంత)", "te": "ఎంత అని అడగడం", "hi": "कितना पूछना (ఎంత)"},
                "explanation": {"en": "Use 'ఎంత' (Entha) for price or quantity: 'ఇది ఎంత?' (How much is this?).", "te": "ధర లేదా పరిమాణం అడగడానికి 'ఎంత' వాడతారు.", "hi": "कीमत या मात्रा पूछने के लिए 'ఎంత' का प्रयोग होता है।"},
                "ruleSummary": {"en": "[Item] + ఎంత? = How much is [Item]?", "te": "[వస్తువు] + ఎంత?", "hi": "[चीज़] + ఎంత? (कितने की है?)"},
                "examples": [{"target": "ఈ పుస్తకం ఎంత?", "transliteration": "Ee pustakam entha?", "native": {"en": "How much is this book?", "te": "ఈ పుస్తకం ఎంత?", "hi": "यह किताब कितने की है?"}}],
                "commonMistakes": [{"incorrect": "ఎక్కడ ధర", "correct": "ధర ఎంత?", "explanation": {"en": "Say 'ధర ఎంత?' (How much is the price?), not 'ఎక్కడ'.", "te": "'ధర ఎంత?' అని అడగాలి.", "hi": "'ధర ఎంత?' (दाम कितना है?) कहें।"}}]
            },
            "vocab": [
                {"word": "ఒకటి", "translit": "Okati", "pron": "Okati", "pos": "numeral", "meanings": {"en": "One (1)", "te": "ఒకటి", "hi": "एक (1)"}, "exTarget": "నాకు ఒకటి కావాలి.", "exTranslit": "Nāku okati kāvāli.", "exNative": {"en": "I want one.", "te": "నాకు ఒకటి కావాలి.", "hi": "मुझे एक चाहिए।"}},
                {"word": "పది", "translit": "Padi", "pron": "Padi", "pos": "numeral", "meanings": {"en": "Ten (10)", "te": "పది", "hi": "दस (10)"}, "exTarget": "ఇది పది రూపాయలు.", "exTranslit": "Idi padi rūpāyalu.", "exNative": {"en": "This is ten rupees.", "te": "ఇది పది రూపాయలు.", "hi": "यह दस रुपये है।"}},
                {"word": "వంద", "translit": "Vanda", "pron": "Vanda", "pos": "numeral", "meanings": {"en": "Hundred (100)", "te": "వంద", "hi": "सौ (100)"}, "exTarget": "వంద రూపాయలు ఇవ్వండి.", "exTranslit": "Vanda rūpāyalu ivvandi.", "exNative": {"en": "Please give a hundred rupees.", "te": "వంద రూపాయలు ఇవ్వండి.", "hi": "सौ रुपये दीजिए।"}},
                {"word": "రూపాయలు", "translit": "Rūpāyalu", "pron": "Roopaayalu", "pos": "noun", "meanings": {"en": "Rupees", "te": "రూపాయలు", "hi": "रुपये"}, "exTarget": "మొత్తం యాభై రూపాయలు.", "exTranslit": "Mottam yābhai rūpāyalu.", "exNative": {"en": "Total fifty rupees.", "te": "మొత్తం యాభై రూపాయలు.", "hi": "कुल पचास रुपये।"}}
            ],
            "exercises": [
                {"instruction": {"en": "What does 'వంద' mean?", "te": "'వంద' అంటే ఏమిటి?", "hi": "'వంద' का क्या अर्थ है?"}, "prompt": {"en": "వంద", "te": "వంద", "hi": "వంద"}, "correct": "100 (Hundred)", "options": ["100 (Hundred)", "10 (Ten)", "1 (One)", "1000 (Thousand)"], "expl": {"en": "'వంద' means hundred.", "te": "వంద అంటే 100.", "hi": "వంద का अर्थ सौ (100) है।"}}
            ]
        },
        {
            "title": {"en": "At the Market / Store", "te": "మార్కెట్ & దుకాణంలో షాపింగ్", "hi": "बाज़ार और दुकान में खरीदारी"},
            "objective": {"en": "Ask for items using 'నాకు ఇది కావాలి' (I want this) and check fresh produce.", "te": "దుకాణంలో కావలసిన వస్తువులు అడగడం మరియు ఎంచుకోవడం నేర్చుకోండి.", "hi": "दुकान में सामान मांगना और पसंद करना सीखें।"},
            "culturalTip": {"en": "In fruit and vegetable markets, asking 'తాజాగా ఉన్నాయా?' (Are they fresh?) is very common.", "te": "మార్కెట్‌లో 'తాజాగా ఉన్నాయా?' అని విచారించడం సాధారణం.", "hi": "सब्जी मंडी में 'తాజాగా ఉన్నాయా?' (ताज़ा हैं क्या?) पूछना सामान्य है।"},
            "grammar": {
                "title": {"en": "Desire / Need (కావాలి vs వద్దు)", "te": "కావాలి vs వద్దు", "hi": "चाहिए बनाम नहीं चाहिए (కావాలి vs వద్దు)"},
                "explanation": {"en": "Use 'నాకు [Item] కావాలి' for 'I want [Item]', and 'నాకు వద్దు' for 'I don't want'.", "te": "కావలసినప్పుడు 'కావాలి', వద్దనుకున్నప్పుడు 'వద్దు' వాడతారు.", "hi": "चाहिए के लिए 'కావాలి' और नहीं चाहिए के लिए 'వద్దు' का प्रयोग करें।"},
                "ruleSummary": {"en": "నాకు [Item] కావాలి = I want [Item].", "te": "నాకు [వస్తువు] కావాలి.", "hi": "मुझे [चीज़] चाहिए।"},
                "examples": [{"target": "నాకు రెండు కిలోల మామిడిపండ్లు కావాలి", "transliteration": "Nāku rendu kilōla māmidipandlu kāvāli", "native": {"en": "I want two kilos of mangoes.", "te": "నాకు రెండు కిలోల మామిడిపండ్లు కావాలి.", "hi": "मुझे दो किलो आम चाहिए।"}}],
                "commonMistakes": [{"incorrect": "నేను కావాలి మామిడిపండ్లు", "correct": "నాకు మామిడిపండ్లు కావాలి", "explanation": {"en": "Use 'నాకు' (to me), not 'నేను' with కావాలి.", "te": "'నాకు కావాలి' అనాలి, 'నేను కావాలి' అనకూడదు.", "hi": "हमेशा 'నాకు కావాలి' (मुझे चाहिए) कहें।"}}]
            },
            "vocab": [
                {"word": "కావాలి", "translit": "Kāvāli", "pron": "Kaavaali", "pos": "verb", "meanings": {"en": "Want / Need", "te": "కావాలి", "hi": "चाहिए"}, "exTarget": "మీకు ఏమి కావాలి?", "exTranslit": "Meeku ēmi kāvāli?", "exNative": {"en": "What do you want?", "te": "మీకు ఏమి కావాలి?", "hi": "आपको क्या चाहिए?"}},
                {"word": "వద్దు", "translit": "Vaddu", "pron": "Vaddu", "pos": "verb", "meanings": {"en": "Don't want", "te": "వద్దు", "hi": "नहीं चाहिए"}, "exTarget": "నాకు అది వద్దు.", "exTranslit": "Nāku adi vaddu.", "exNative": {"en": "I don't want that.", "te": "నాకు అది వద్దు.", "hi": "मुझे वह नहीं चाहिए।"}},
                {"word": "ఇది", "translit": "Idi", "pron": "Idi", "pos": "pronoun", "meanings": {"en": "This", "te": "ఇది", "hi": "यह"}, "exTarget": "ఇది చాలా బాగుంది.", "exTranslit": "Idi chālā bāgundi.", "exNative": {"en": "This is very good.", "te": "ఇది చాలా బాగుంది.", "hi": "यह बहुत अच्छा है।"}},
                {"word": "అది", "translit": "Adi", "pron": "Adi", "pos": "pronoun", "meanings": {"en": "That", "te": "అది", "hi": "वह"}, "exTarget": "అది చూపించండి.", "exTranslit": "Adi chūpinchandi.", "exNative": {"en": "Please show that.", "te": "అది చూపించండి.", "hi": "वह दिखाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'I want this' in Telugu?", "te": "'నాకు ఇది కావాలి' అని ఎలా అంటారు?", "hi": "तेलुगु में 'मुझे यह चाहिए' कैसे कहेंगे?"}, "prompt": {"en": "I want this", "te": "నాకు ఇది కావాలి", "hi": "मुझे यह चाहिए"}, "correct": "నాకు ఇది కావాలి", "options": ["నాకు ఇది కావాలి", "నాకు అది వద్దు", "ధర ఎంత?", "వంద రూపాయలు"], "expl": {"en": "'నాకు ఇది కావాలి' means 'I want this'.", "te": "'నాకు ఇది కావాలి' సరైన సమాధానం.", "hi": "'నాకు ఇది కావాలి' का अर्थ है मुझे यह चाहिए।"}}
            ]
        },
        {
            "title": {"en": "Payment, UPI & Discounts", "te": "చెల్లింపు, యూపీఐ & తగ్గింపులు", "hi": "भुगतान, यूपीआई और छूट"},
            "objective": {"en": "Pay using UPI/Google Pay/cash and negotiate politely: 'కొంచెం తగ్గిస్తారా?'", "te": "యూపీఐ ద్వారా చెల్లించడం మరియు కొంచెం తగ్గింపు అడగడం నేర్చుకోండి.", "hi": "यूपीआई से भुगतान और दाम कम करने का अनुरोध सीखें।"},
            "culturalTip": {"en": "UPI QR codes are everywhere in Andhra & Telangana; asking 'స్కానర్ ఉందా అండి?' (Do you have a scanner?) is universal.", "te": "షాపుల్లో 'స్కానర్ ఉందా అండి?' అని అడగడం చాలా సర్వసాధారణం.", "hi": "दुकानों में 'స్కానర్ ఉందా అండి?' (क्यूआर स्कैनर है क्या?) पूछना बेहद आम है।"},
            "grammar": {
                "title": {"en": "Polite Negotation (తగ్గిస్తారా?)", "te": "ధర తగ్గించమని అడగడం", "hi": "दाम कम करने का अनुरोध"},
                "explanation": {"en": "Add '-తారా?' (Will you?) to request discounts politely: 'కొంచెం తగ్గిస్తారా?' (Will you reduce a little?).", "te": "కొంచెం తగ్గించమని మర్యాదగా 'తగ్గిస్తారా?' అని అడగాలి.", "hi": "दाम कम कराने के लिए 'కొంచెం తగ్గిస్తారా?' (थोड़ा कम करेंगे क्या?) कहें।"},
                "ruleSummary": {"en": "కొంచెం తగ్గిస్తారా? = Can you reduce a little?", "te": "కొంచెం తగ్గిస్తారా?", "hi": "क्या थोड़ा कम करेंगे?"},
                "examples": [{"target": "ధర కొంచెం తగ్గిస్తారా అండి?", "transliteration": "Dhara konchem taggistārā andi?", "native": {"en": "Could you reduce the price a little, please?", "te": "ధర కొంచెం తగ్గిస్తారా అండి?", "hi": "क्या दाम थोड़ा कम करेंगे?"}}],
                "commonMistakes": [{"incorrect": "ధర తగ్గించు (blunt)", "correct": "కొంచెం తగ్గిస్తారా అండి?", "explanation": {"en": "Always be polite when negotiating.", "te": "ఎప్పుడూ గౌరవంగా అడగాలి.", "hi": "हमेशा विनम्रता से पूछें।"}}]
            },
            "vocab": [
                {"word": "డబ్బులు", "translit": "Dabbulu", "pron": "Dabbulu", "pos": "noun", "meanings": {"en": "Money / Cash", "te": "డబ్బులు / నగదు", "hi": "पैसे / नकद"}, "exTarget": "డబ్బులు ఇక్కడ ఇవ్వండి.", "exTranslit": "Dabbulu ikkada ivvandi.", "exNative": {"en": "Give the money here.", "te": "డబ్బులు ఇక్కడ ఇవ్వండి.", "hi": "पैसे यहाँ दीजिए।"}},
                {"word": "స్కానర్", "translit": "Scanner", "pron": "Scanner", "pos": "noun", "meanings": {"en": "QR Scanner / UPI", "te": "స్కానర్ / క్యూఆర్ కోడ్", "hi": "क्यूआर स्कैनर / यूपीआई"}, "exTarget": "యూపీఐ స్కానర్ ఉందా?", "exTranslit": "UPI scanner undā?", "exNative": {"en": "Do you have a UPI scanner?", "te": "యూపీఐ స్కానర్ ఉందా?", "hi": "क्या यूपीआई स्कैनर है?"}},
                {"word": "బిల్లు", "translit": "Billu", "pron": "Billu", "pos": "noun", "meanings": {"en": "Bill / Receipt", "te": "బిల్లు / రసీదు", "hi": "बिल / रसीद"}, "exTarget": "బిల్లు ఇవ్వండి, దయచేసి.", "exTranslit": "Billu ivvandi, dayachēsi.", "exNative": {"en": "Please give the bill.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"}},
                {"word": "తక్కువ", "translit": "Takkuva", "pron": "Takkuva", "pos": "adjective", "meanings": {"en": "Less / Cheap", "te": "తక్కువ", "hi": "कम / सस्ता"}, "exTarget": "ఇది చాలా తక్కువ ధర.", "exTranslit": "Idi chālā takkuva dhara.", "exNative": {"en": "This is a very cheap price.", "te": "ఇది చాలా తక్కువ ధర.", "hi": "यह बहुत कम कीमत है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the bill in Telugu?", "te": "'బిల్లు ఇవ్వండి' అని ఎలా అడుగుతారు?", "hi": "तेलुगु में 'बिल दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Please give the bill", "te": "బిల్లు ఇవ్వండి, దయచేసి", "hi": "कृपया बिल दीजिए"}, "correct": "బిల్లు ఇవ్వండి, దయచేసి", "options": ["బిల్లు ఇవ్వండి, దయచేసి", "స్కానర్ లేదు", "డబ్బులు వద్దు", "ధర ఎక్కువ"], "expl": {"en": "'బిల్లు ఇవ్వండి' means please give the bill.", "te": "బిల్లు అడగడానికి 'బిల్లు ఇవ్వండి' అంటారు.", "hi": "'బిల్లు ఇవ్వండి' का अर्थ बिल देना है।"}}
            ]
        }
    ],

    # MODULE 3: Cafés, Street Food & Restaurants
    [
        {
            "title": {"en": "Ordering Chai, Coffee & Breakfast", "te": "టీ, ఫిల్టర్ కాఫీ & టిఫిన్ ఆర్డర్ చేయడం", "hi": "चाय, फ़िल्टर कॉफ़ी और नाश्ता"},
            "objective": {"en": "Order Telugu breakfast staples like ఇడ్లీ (Idli), దోశ (Dosa), and డిగ్రీ కాఫీ (Filter Coffee).", "te": "ఇడ్లీ, దోశ మరియు ఫిల్టర్ కాఫీని హోటల్‌లో ఆర్డర్ చేయడం నేర్చుకోండి.", "hi": "इडली, डोसा और कॉफ़ी का ऑर्डर देना सीखें।"},
            "culturalTip": {"en": "In Andhra and Telangana tiffin centers, ordering 'ఒక ప్లేట్ ఇడ్లీ, ఒక వడ' (One plate idli, one vada) is the beloved morning ritual.", "te": "తెలుగు హోటళ్లలో 'ఒక ప్లేట్ ఇడ్లీ, కాఫీ' ఆర్డర్ చేయడం దినచర్య.", "hi": "नाश्ते की दुकानों में इडली और कॉफ़ी का ऑर्डर देना बहुत लोकप्रिय है।"},
            "grammar": {
                "title": {"en": "Ordering Quantities (ఒక... ఇవ్వండి)", "te": "ఆర్డర్ చేయడం (ఒక... ఇవ్వండి)", "hi": "मात्रा में ऑर्डर देना (ఒక... ఇవ్వండి)"},
                "explanation": {"en": "Use '[Number] [Item] ఇవ్వండి' (Give [Number] [Item]): 'ఒక కాఫీ ఇవ్వండి' (Give one coffee).", "te": "ఏదైనా ఆర్డర్ చేయడానికి 'ఒక [వస్తువు] ఇవ్వండి' అంటారు.", "hi": "ऑर्डर करने के लिए 'ఒక [चीज़] ఇవ్వండి' (एक ... दीजिए) कहें।"},
                "ruleSummary": {"en": "ఒక [Food/Drink] ఇవ్వండి = Give one [Food/Drink].", "te": "ఒక [ఆహారం] ఇవ్వండి.", "hi": "एक [खाना] दीजिए।"},
                "examples": [{"target": "ఒక మసాలా దోశ మరియు ఒక టీ ఇవ్వండి", "transliteration": "Oka masālā dōśa mariyu oka tī ivvandi", "native": {"en": "Please give one masala dosa and one tea.", "te": "ఒక మసాలా దోశ మరియు ఒక టీ ఇవ్వండి.", "hi": "एक मसाला डोसा और एक चाय दीजिए।"}}],
                "commonMistakes": [{"incorrect": "ఇవ్వండి కాఫీ ఒకటి", "correct": "ఒక కాఫీ ఇవ్వండి", "explanation": {"en": "Put quantity before the noun.", "te": "సంఖ్యను ముందు ఉంచాలి: 'ఒక కాఫీ'.", "hi": "संख्या को पहले रखें: 'ఒక కాఫీ'।"}}]
            },
            "vocab": [
                {"word": "కాఫీ", "translit": "Coffee", "pron": "Coffee", "pos": "noun", "meanings": {"en": "Coffee", "te": "కాఫీ", "hi": "कॉफ़ी"}, "exTarget": "వేడి కాఫీ ఇవ్వండి.", "exTranslit": "Vēdi coffee ivvandi.", "exNative": {"en": "Give hot coffee.", "te": "వేడి కాఫీ ఇవ్వండి.", "hi": "गर्म कॉफ़ी दीजिए।"}},
                {"word": "టీ / ఛాయ్", "translit": "Tī / Chāy", "pron": "Tee / Chaay", "pos": "noun", "meanings": {"en": "Tea", "te": "టీ / ఛాయ్", "hi": "चाय"}, "exTarget": "ఒక ఇరాని ఛాయ్ ఇవ్వండి.", "exTranslit": "Oka Irānī chāy ivvandi.", "exNative": {"en": "Give one Irani chai.", "te": "ఒక ఇరాని ఛాయ్ ఇవ్వండి.", "hi": "एक ईरानी चाय दीजिए।"}},
                {"word": "నీళ్లు", "translit": "Nīllu", "pron": "Neellu", "pos": "noun", "meanings": {"en": "Water", "te": "నీళ్లు / జలం", "hi": "पानी"}, "exTarget": "మంచినీళ్లు తీసుకురండి.", "exTranslit": "Manchinīllu tīsukurandi.", "exNative": {"en": "Please bring drinking water.", "te": "మంచినీళ్లు తీసుకురండి.", "hi": "पीने का पानी लाइए।"}},
                {"word": "రుచికరమైన", "translit": "Ruchikaramaina", "pron": "Ruchikaramaina", "pos": "adjective", "meanings": {"en": "Delicious / Tasty", "te": "రుచికరమైన / రుచిగా", "hi": "स्वादिष्ट"}, "exTarget": "ఈ భోజనం చాలా రుచిగా ఉంది.", "exTranslit": "Ee bhōjanam chālā ruchigā undi.", "exNative": {"en": "This food is very tasty.", "te": "ఈ భోజనం చాలా రుచిగా ఉంది.", "hi": "यह खाना बहुत स्वादिष्ट है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for 'drinking water' in Telugu?", "te": "'మంచినీళ్లు' అని తెలుగులో ఏమంటారు?", "hi": "तेलुगु में पीने के पानी को क्या कहते हैं?"}, "prompt": {"en": "Water", "te": "నీళ్లు", "hi": "पानी"}, "correct": "నీళ్లు", "options": ["నీళ్లు", "కాఫీ", "టీ", "బిల్లు"], "expl": {"en": "'నీళ్లు' (Nīllu) means water.", "te": "నీళ్లను 'నీళ్లు' అంటారు.", "hi": "'నీళ్లు' का अर्थ पानी है।"}}
            ]
        },
        {
            "title": {"en": "Dining Out & Ordering Meals", "te": "రెస్టారెంట్‌లో భోజనం & ఆర్డర్ చేయడం", "hi": "रेस्तरां में भोजन और ऑर्डर"},
            "objective": {"en": "Order lunch meals (భోజనం), Biryani, and ask for extra chutney or rice.", "te": "భోజనం, బిర్యానీ మరియు సైడ్ డిష్‌లు ఆర్డర్ చేయడం నేర్చుకోండి.", "hi": "भोजन, बिरयानी और अतिरिक्त चीजें मंगाना सीखें।"},
            "culturalTip": {"en": "Hyderabadi Dum Biryani and Andhra meals served on banana leaves are legendary; locals love extra 'గోంగూర' (Gongura).", "te": "ఆంధ్రా భోజనంలో 'గోంగూర పచ్చడి' మరియు నెయ్యి చాలా ప్రత్యేకం.", "hi": "आंध्र थाली में 'గోంగూర' (गोंगूरा की चटनी) बहुत प्रसिद्ध है।"},
            "grammar": {
                "title": {"en": "Asking for Extra ('ఇంకొంచెం')", "te": "మరికొంత అడగడం (ఇంకొంచెం)", "hi": "और अधिक मांगना (ఇంకొంచెం)"},
                "explanation": {"en": "Say 'ఇంకొంచెం [Item] ఇవ్వండి' to ask for a little more: 'ఇంకొంచెం రైస్ ఇవ్వండి' (Give a little more rice).", "te": "మరికొంత కావాలంటే 'ఇంకొంచెం [వస్తువు] ఇవ్వండి' అంటారు.", "hi": "थोड़ा और मांगने के लिए 'ఇంకొంచెం...' का प्रयोग करें।"},
                "ruleSummary": {"en": "ఇంకొంచెం [Item] ఇవ్వండి = Please give a little more [Item].", "te": "ఇంకొంచెం [వస్తువు] ఇవ్వండి.", "hi": "थोड़ा और [चीज़] दीजिए।"},
                "examples": [{"target": "ఇంకొంచెం సాంబార్ వేయండి", "transliteration": "Inkonchem sāmbār vēyandi", "native": {"en": "Please serve a little more sambar.", "te": "ఇంకొంచెం సాంబార్ వేయండి.", "hi": "थोड़ा और सांभर डालिए।"}}],
                "commonMistakes": [{"incorrect": "ఎక్కువ సాంబార్ (blunt)", "correct": "ఇంకొంచెం సాంబార్ ఇవ్వండి", "explanation": {"en": "Say 'ఇంకొంచెం' politely.", "te": "మర్యాదగా 'ఇంకొంచెం' అనాలి.", "hi": "विनम्रता से 'ఇంకొంచెం' कहें।"}}]
            },
            "vocab": [
                {"word": "భోజనం", "translit": "Bhōjanam", "pron": "Bhojanam", "pos": "noun", "meanings": {"en": "Meal / Lunch", "te": "భోజనం / అన్నం", "hi": "भोजन / खाना"}, "exTarget": "రెండు భోజనాలు తీసుకురండి.", "exTranslit": "Rendu bhōjanālu tīsukurandi.", "exNative": {"en": "Bring two meals.", "te": "రెండు భోజనాలు తీసుకురండి.", "hi": "दो थाली खाना लाइए।"}},
                {"word": "అన్నం", "translit": "Annam", "pron": "Annam", "pos": "noun", "meanings": {"en": "Rice", "te": "అన్నం", "hi": "चावल / भात"}, "exTarget": "వేడి అన్నం వడ్డించండి.", "exTranslit": "Vēdi annam vaddinchandi.", "exNative": {"en": "Serve hot rice.", "te": "వేడి అన్నం వడ్డించండి.", "hi": "गर्म चावल परोसिए।"}},
                {"word": "కూర", "translit": "Kūra", "pron": "Koora", "pos": "noun", "meanings": {"en": "Curry / Vegetable", "te": "కూర", "hi": "सब्जी / करी"}, "exTarget": "ఈ కూర చాలా బాగుంది.", "exTranslit": "Ee kūra chālā bāgundi.", "exNative": {"en": "This curry is very good.", "te": "ఈ కూర చాలా బాగుంది.", "hi": "यह सब्जी बहुत अच्छी है।"}},
                {"word": "చట్నీ", "translit": "Chutney", "pron": "Chutney", "pos": "noun", "meanings": {"en": "Chutney", "te": "పచ్చడి / చట్నీ", "hi": "चटनी"}, "exTarget": "కొబ్బరి చట్నీ ఇవ్వండి.", "exTranslit": "Kobbari chutney ivvandi.", "exNative": {"en": "Give coconut chutney.", "te": "కొబ్బరి చట్నీ ఇవ్వండి.", "hi": "नारियल की चटनी दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "What is the Telugu word for 'Meal'?", "te": "'భోజనం' కి సమానమైనది ఏది?", "hi": "'भोजन' के लिए तेलुगु शब्द कौन सा है?"}, "prompt": {"en": "Meal", "te": "భోజనం", "hi": "भोजन"}, "correct": "భోజనం", "options": ["భోజనం", "నీళ్లు", "కాఫీ", "స్కానర్"], "expl": {"en": "'భోజనం' (Bhōjanam) means meal.", "te": "భోజనాన్ని 'భోజనం' అంటారు.", "hi": "'భోజనం' का अर्थ भोजन है।"}}
            ]
        },
        {
            "title": {"en": "Dietary Needs & Spice Levels", "te": "ఆహార నియమాలు & కారం స్థాయిలు", "hi": "खानपान की ज़रूरतें और मिर्च"},
            "objective": {"en": "Specify spice levels ('కారం తక్కువ') and dietary preferences ('శాకాహారం' - Vegetarian).", "te": "కారం తక్కువగా వేయమని మరియు శాకాహారం కావాలని చెప్పడం నేర్చుకోండి.", "hi": "कम तीखा और शाकाहारी भोजन मांगना सीखें।"},
            "culturalTip": {"en": "Andhra cuisine is famously spicy! If you cannot tolerate chili, always emphasize 'కారం చాలా తక్కువ వేయండి' (Put very little chili).", "te": "ఆంధ్రా వంటకాలు కారంగా ఉంటాయి; కారం తక్కువ కావాలంటే ముందే చెప్పాలి.", "hi": "आंध्र का खाना तीखा होता है; कम तीखा चाहिए तो पहले ही 'కారం తక్కువ' कहें।"},
            "grammar": {
                "title": {"en": "Modifiers: Less / More (తక్కువ / ఎక్కువ)", "te": "తక్కువ vs ఎక్కువ", "hi": "कम बनाम ज़्यादा (తక్కువ vs ఎక్కువ)"},
                "explanation": {"en": "Use 'తక్కువ' (less) or 'ఎక్కువ' (more) before adjectives/nouns: 'కారం తక్కువ' (less spicy).", "te": "పరిమాణాన్ని చెప్పడానికి 'తక్కువ' లేదా 'ఎక్కువ' వాడతారు.", "hi": "मात्रा बताने के लिए 'తక్కువ' (कम) या 'ఎక్కువ' (ज़्यादा) का प्रयोग करें।"},
                "ruleSummary": {"en": "[Item] + తక్కువ చేయండి = Make [Item] less.", "te": "[వస్తువు] తక్కువ చేయండి.", "hi": "[चीज़] कम कीजिए।"},
                "examples": [{"target": "దయచేసి కారం తక్కువ వేయండి", "transliteration": "Dayachēsi kāram takkuva vēyandi", "native": {"en": "Please add less spice/chili.", "te": "దయచేసి కారం తక్కువ వేయండి.", "hi": "कृपया मिर्च कम डालिए।"}}],
                "commonMistakes": [{"incorrect": "కారం లేదు వద్దు", "correct": "కారం తక్కువ వేయండి", "explanation": {"en": "Say 'కారం తక్కువ వేయండి' for less spicy.", "te": "'కారం తక్కువ వేయండి' అనాలి.", "hi": "'కారం తక్కువ వేయండి' बोलें।"}}]
            },
            "vocab": [
                {"word": "కారం", "translit": "Kāram", "pron": "Kaaram", "pos": "noun", "meanings": {"en": "Spicy / Chili", "te": "కారం", "hi": "तीखा / मिर्च"}, "exTarget": "ఇది చాలా కారంగా ఉంది.", "exTranslit": "Idi chālā kārangā undi.", "exNative": {"en": "This is very spicy.", "te": "ఇది చాలా కారంగా ఉంది.", "hi": "यह बहुत तीखा है।"}},
                {"word": "శాకాహారం", "translit": "Śākāhāram", "pron": "Shaakaahaaram", "pos": "noun", "meanings": {"en": "Vegetarian", "te": "శాకాహారం", "hi": "शाकाहारी"}, "exTarget": "ఇక్కడ శాకాహార భోజనం దొరుకుతుందా?", "exTranslit": "Ikkada śākāhāra bhōjanam dorukutundā?", "exNative": {"en": "Is vegetarian food available here?", "te": "ఇక్కడ శాకాహార భోజనం దొరుకుతుందా?", "hi": "क्या यहाँ शाकाहारी भोजन मिलता है?"}},
                {"word": "తీపి", "translit": "Tīpi", "pron": "Teepi", "pos": "noun", "meanings": {"en": "Sweet", "te": "తీపి", "hi": "मीठा"}, "exTarget": "నాకు తీపి పదార్థాలు ఇష్టం.", "exTranslit": "Nāku tīpi padārthālu ishtam.", "exNative": {"en": "I like sweet dishes.", "te": "నాకు తీపి పదార్థాలు ఇష్టం.", "hi": "मुझे मीठा पसंद है।"}},
                {"word": "ఉప్పు", "translit": "Uppu", "pron": "Uppu", "pos": "noun", "meanings": {"en": "Salt", "te": "ఉప్పు", "hi": "नमक"}, "exTarget": "కొంచెం ఉప్పు తీసుకురండి.", "exTranslit": "Konchem uppu tīsukurandi.", "exNative": {"en": "Bring a little salt.", "te": "కొంచెం ఉప్పు తీసుకురండి.", "hi": "थोड़ा नमक लाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you request 'less spice' in Telugu?", "te": "'కారం తక్కువ' అని ఎలా అడుగుతారు?", "hi": "तेलुगु में 'मिर्च कम' कैसे कहेंगे?"}, "prompt": {"en": "Less spice", "te": "కారం తక్కువ", "hi": "कम तीखा"}, "correct": "కారం తక్కువ", "options": ["కారం తక్కువ", "కారం ఎక్కువ", "తీపి వద్దు", "ఉప్పు ఎక్కువ"], "expl": {"en": "'కారం తక్కువ' means less spicy.", "te": "కారం తక్కువ అంటే Less spicy.", "hi": "'కారం తక్కువ' का अर्थ कम तीखा है।"}}
            ]
        }
    ],

    # MODULE 4: Real-Life Transit & Navigation
    [
        {
            "title": {"en": "Asking Directions & Finding Places", "te": "దారి అడగడం & స్థలాలు వెతకడం", "hi": "रास्ता पूछना और स्थान खोजना"},
            "objective": {"en": "Ask 'ఎక్కడ ఉంది?' (Where is...?) and understand directions (ఎడమ, కుడి, తిన్నగా).", "te": "ఎక్కడ ఉంది అని అడగడం మరియు ఎడమ, కుడి దిశలు అర్థం చేసుకోవడం నేర్చుకోండి.", "hi": "कहाँ है पूछना और दाएँ, बाएँ, सीधे दिशाएँ समझना सीखें।"},
            "culturalTip": {"en": "Saying 'కొంచెం వినండి అండి' (Excuse me, please listen) before asking strangers for directions is very polite.", "te": "దారి అడిగే ముందు 'కొంచెం వినండి అండి' అనడం మర్యాద.", "hi": "रास्ता पूछने से पहले 'కొంచెం వినండి అండి' (ज़रा सुनिए) कहना बहुत आदरणीय है।"},
            "grammar": {
                "title": {"en": "Location Question ('ఎక్కడ ఉంది?')", "te": "ఎక్కడ ఉంది? అని అడగడం", "hi": "स्थान पूछना (ఎక్కడ ఉంది?)"},
                "explanation": {"en": "Place the location/item first, followed by 'ఎక్కడ ఉంది?': 'బస్ స్టాప్ ఎక్కడ ఉంది?' (Where is the bus stop?).", "te": "స్థలం పేరు చెప్పి 'ఎక్కడ ఉంది?' అని అడగాలి.", "hi": "जगह का नाम बताकर 'ఎక్కడ ఉంది?' (कहाँ है?) पूछें।"},
                "ruleSummary": {"en": "[Location] + ఎక్కడ ఉంది? = Where is [Location]?", "te": "[స్థలం] + ఎక్కడ ఉంది?", "hi": "[स्थान] + कहाँ है?"},
                "examples": [{"target": "రైల్వే స్టేషన్ ఎక్కడ ఉంది అండి?", "transliteration": "Railway station ekkada undi andi?", "native": {"en": "Where is the railway station, please?", "te": "రైల్వే స్టేషన్ ఎక్కడ ఉంది అండి?", "hi": "रेलवे स्टेशन कहाँ है जी?"}}],
                "commonMistakes": [{"incorrect": "ఎక్కడ రైల్వే స్టేషన్ ఉంది", "correct": "రైల్వే స్టేషన్ ఎక్కడ ఉంది?", "explanation": {"en": "Put the place name first.", "te": "ముందు స్థలం పేరు చెప్పాలి: 'రైల్వే స్టేషన్ ఎక్కడ ఉంది?'.", "hi": "स्थान का नाम पहले रखें।"}}]
            },
            "vocab": [
                {"word": "ఎక్కడ", "translit": "Ekkada", "pron": "Ekkada", "pos": "adverb", "meanings": {"en": "Where", "te": "ఎక్కడ", "hi": "कहाँ"}, "exTarget": "హోటల్ ఎక్కడ ఉంది?", "exTranslit": "Hotel ekkada undi?", "exNative": {"en": "Where is the hotel?", "te": "హోటల్ ఎక్కడ ఉంది?", "hi": "होटल कहाँ है?"}},
                {"word": "కుడివైపు", "translit": "Kudivaipu", "pron": "Kudivaipu", "pos": "noun", "meanings": {"en": "Right side", "te": "కుడివైపు", "hi": "दाहिनी तरफ"}, "exTarget": "కుడివైపు తిరగండి.", "exTranslit": "Kudivaipu tiragandi.", "exNative": {"en": "Turn to the right side.", "te": "కుడివైపు తిరగండి.", "hi": "दाहिनी तरफ मुड़िए।"}},
                {"word": "ఎడమవైపు", "translit": "Edamavaipu", "pron": "Edamavaipu", "pos": "noun", "meanings": {"en": "Left side", "te": "ఎడమవైపు", "hi": "बाईं तरफ"}, "exTarget": "ఎడమవైపు వెళ్లండి.", "exTranslit": "Edamavaipu vellandi.", "exNative": {"en": "Go to the left side.", "te": "ఎడమవైపు వెళ్లండి.", "hi": "बाईं तरफ जाइए।"}},
                {"word": "తిన్నగా / ఎదురుగా", "translit": "Tinnagā / Edurugā", "pron": "Tinnagaa / Edurugaa", "pos": "adverb", "meanings": {"en": "Straight / In front", "te": "తిన్నగా / ఎదురుగా", "hi": "सीधे / सामने"}, "exTarget": "తిన్నగా ముందుకు వెళ్లండి.", "exTranslit": "Tinnagā munduku vellandi.", "exNative": {"en": "Go straight ahead.", "te": "తిన్నగా ముందుకు వెళ్లండి.", "hi": "सीधे आगे बढ़िए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Where is the metro station?' in Telugu?", "te": "'మెట్రో స్టేషన్ ఎక్కడ ఉంది?' అని ఎలా అడుగుతారు?", "hi": "तेलुगु में 'मेट्रो स्टेशन कहाँ है?' कैसे पूछेंगे?"}, "prompt": {"en": "Where is the metro station?", "te": "మెట్రో స్టేషన్ ఎక్కడ ఉంది?", "hi": "मेट्रो स्टेशन कहाँ है?"}, "correct": "మెట్రో స్టేషన్ ఎక్కడ ఉంది?", "options": ["మెట్రో స్టేషన్ ఎక్కడ ఉంది?", "కుడివైపు తిరగండి", "బస్ రాలేదు", "ఎడమవైపు వెళ్లండి"], "expl": {"en": "'మెట్రో స్టేషన్ ఎక్కడ ఉంది?' is the correct question.", "te": "స్థలం ఎక్కడ ఉందో అడగడానికి 'ఎక్కడ ఉంది?' వాడతారు.", "hi": "'మెట్రో స్టేషన్ ఎక్కడ ఉంది?' सही वाक्य है।"}}
            ]
        },
        {
            "title": {"en": "Metro, Bus & Auto-Rickshaws", "te": "మెట్రో, బస్సు & ఆటో ప్రయాణం", "hi": "मेट्रो, बस और ऑटो रिक्शा की सवारी"},
            "objective": {"en": "Take Hyderabad Metro, RTC buses, and hire autos with 'చార్మినార్ వెళ్తుందా?' (Does it go to Charminar?).", "te": "మెట్రో, ఆర్టీసీ బస్సు మరియు ఆటోలో ప్రయాణించడం నేర్చుకోండి.", "hi": "मेट्रो, बस और ऑटो रिक्शा लेना सीखें।"},
            "culturalTip": {"en": "When hailing an auto in Hyderabad or Vijayawada, always ask 'మీటర్ వేస్తారా?' (Will you turn on the meter?) or agree on the fare beforehand.", "te": "ఆటో ఎక్కేటప్పుడు 'మీటర్ వేస్తారా?' లేదా ముందుగానే చార్జీ మాట్లాడుకోవడం మంచిది.", "hi": "ऑटो लेते समय 'మీటర్ వేస్తారా?' (मीटर चलाएंगे?) या पहले किराया तय करना समझदारी है।"},
            "grammar": {
                "title": {"en": "Destination Questions ('వెళ్తుందా?')", "te": "వెళ్తుందా? అని అడగడం", "hi": "गंतव्य पूछना (వెళ్తుందా?)"},
                "explanation": {"en": "Add 'వెళ్తుందా?' (Does it go?) after the destination name: '[Place] వెళ్తుందా?' (Does this go to [Place]?).", "te": "బస్సు లేదా ఆటో ఎక్కేముందు '[స్థలం] వెళ్తుందా?' అని అడగాలి.", "hi": "गंतव्य के बाद 'వెళ్తుందా?' (जाती है क्या?) लगाएं।"},
                "ruleSummary": {"en": "[Destination] + వెళ్తుందా? = Does this go to [Destination]?", "te": "[గమ్యం] + వెళ్తుందా?", "hi": "[स्थान] + जाएगी क्या?"},
                "examples": [{"target": "ఈ బస్సు సికింద్రాబాద్ వెళ్తుందా?", "transliteration": "Ee bus Secunderabad veltundā?", "native": {"en": "Does this bus go to Secunderabad?", "te": "ఈ బస్సు సికింద్రాబాద్ వెళ్తుందా?", "hi": "क्या यह बस सिकंदराबाद जाएगी?"}}],
                "commonMistakes": [{"incorrect": "ఈ బస్సు సికింద్రాబాద్ వెళ్లు", "correct": "సికింద్రాబాద్ వెళ్తుందా?", "explanation": {"en": "Use question form 'వెళ్తుందా?'.", "te": "ప్రశ్నార్థకంగా 'వెళ్తుందా?' అనాలి.", "hi": "हमेशा प्रश्न रूप 'వెళ్తుందా?' कहें।"}}]
            },
            "vocab": [
                {"word": "బస్సు", "translit": "Bus", "pron": "Bus", "pos": "noun", "meanings": {"en": "Bus", "te": "బస్సు", "hi": "बस"}, "exTarget": "బస్సు ఎప్పుడు వస్తుంది?", "exTranslit": "Bus eppudu vastundi?", "exNative": {"en": "When will the bus come?", "te": "బస్సు ఎప్పుడు వస్తుంది?", "hi": "बस कब आएगी?"}},
                {"word": "ఆటో", "translit": "Auto", "pron": "Auto", "pos": "noun", "meanings": {"en": "Auto-rickshaw", "te": "ఆటో", "hi": "ऑटो रिक्शा"}, "exTarget": "రైల్వే స్టేషన్‌కి ఆటో కావాలి.", "exTranslit": "Railway station-ki auto kāvāli.", "exNative": {"en": "I need an auto to the railway station.", "te": "రైల్వే స్టేషన్‌కి ఆటో కావాలి.", "hi": "रेलवे स्टेशन के लिए ऑटो चाहिए।"}},
                {"word": "టికెట్", "translit": "Ticket", "pron": "Ticket", "pos": "noun", "meanings": {"en": "Ticket", "te": "టికెట్", "hi": "टिकट"}, "exTarget": "రెండు టికెట్లు ఇవ్వండి.", "exTranslit": "Rendu ticketlu ivvandi.", "exNative": {"en": "Give two tickets.", "te": "రెండు టికెట్లు ఇవ్వండి.", "hi": "दो टिकट दीजिए।"}},
                {"word": "ఆగండి", "translit": "Aagandi", "pron": "Aagandi", "pos": "verb", "meanings": {"en": "Stop / Wait", "te": "ఆగండి / నిలపండి", "hi": "रुकिए / रोकिए"}, "exTarget": "ఇక్కడ ఆటో ఆగండి.", "exTranslit": "Ikkada auto aagandi.", "exNative": {"en": "Please stop the auto here.", "te": "ఇక్కడ ఆటో ఆపండి.", "hi": "यहाँ ऑटो रोकिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Does this bus go to the airport?' in Telugu?", "te": "'ఈ బస్సు ఎయిర్‌పోర్ట్ వెళ్తుందా?' అని ఎలా అడుగుతారు?", "hi": "तेलुगु में 'क्या यह बस एयरपोर्ट जाएगी?' कैसे पूछेंगे?"}, "prompt": {"en": "Does this bus go to the airport?", "te": "ఈ బస్సు ఎయిర్‌పోర్ట్ వెళ్తుందా?", "hi": "क्या यह बस एयरपोर्ट जाएगी?"}, "correct": "ఈ బస్సు ఎయిర్‌పోర్ట్ వెళ్తుందా?", "options": ["ఈ బస్సు ఎయిర్‌పోర్ట్ వెళ్తుందా?", "టికెట్ ఎంత?", "ఇక్కడ ఆగండి", "ఆటో రాలేదు"], "expl": {"en": "'ఈ బస్సు ఎయిర్‌పోర్ట్ వెళ్తుందా?' is the correct question.", "te": "వెళ్తుందా అని అడగడానికి 'వెళ్తుందా?' వాడతారు.", "hi": "'ఈ బస్సు ఎయిర్‌పోర్ట్ వెళ్తుందా?' सही प्रश्न है।"}}
            ]
        },
        {
            "title": {"en": "Hotel Check-In & Lodging", "te": "హోటల్ చెక్-ఇన్ & వసతి", "hi": "होटल चेक-इन और ठहरना"},
            "objective": {"en": "Check into hotels, request keys, WiFi password, and room service.", "te": "హోటల్‌లో రూమ్ బుక్ చేసుకోవడం మరియు వైఫై పాస్‌వర్డ్ అడగడం నేర్చుకోండి.", "hi": "होटल में कमरा लेना और वाई-फ़ाई पासवर्ड पूछना सीखें।"},
            "culturalTip": {"en": "Providing Government ID (Aadhaar or Passport) at check-in is mandatory across all Indian hotels.", "te": "హోటల్ చెక్-ఇన్ సమయంలో గుర్తింపు కార్డు (ఐడీ ప్రూఫ్) చూపించడం తప్పనిసరి.", "hi": "होटल चेक-इन के समय आधार या पासपोर्ट दिखाना अनिवार्य है।"},
            "grammar": {
                "title": {"en": "Requesting Facilities ('ఉందా?')", "te": "సదుపాయాలు అడగడం (ఉందా?)", "hi": "सुविधा पूछना (ఉందా?)"},
                "explanation": {"en": "Ask '[Amenity] ఉందా?' (Is there [Amenity]?): 'వైఫై ఉందా?' (Is there WiFi?).", "te": "ఏదైనా సదుపాయం ఉందో లేదో తెలుసుకోవడానికి '[సదుపాయం] ఉందా?' అంటారు.", "hi": "सुविधा के बारे में पूछने के लिए '[सुविधा] ఉందా?' बोलें।"},
                "ruleSummary": {"en": "[Amenity] + ఉందా? = Is there [Amenity]?", "te": "[సదుపాయం] + ఉందా?", "hi": "[सुविधा] + है क्या?"},
                "examples": [{"target": "రూమ్‌లో వేడి నీళ్లు ఉన్నాయా?", "transliteration": "Room-lō vēdi nīllu unnāyā?", "native": {"en": "Is there hot water in the room?", "te": "రూమ్‌లో వేడి నీళ్లు ఉన్నాయా?", "hi": "क्या कमरे में गर्म पानी है?"}}],
                "commonMistakes": [{"incorrect": "వైఫై ఎక్కడ ఉంది పాస్‌వర్డ్", "correct": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "explanation": {"en": "Say 'వైఫై పాస్‌వర్డ్ ఏమిటి?' for what is the WiFi password.", "te": "'వైఫై పాస్‌వర్డ్ ఏమిటి?' అని అడగాలి.", "hi": "'వైఫై పాస్‌వర్డ్ ఏమిటి?' कहें।"}}]
            },
            "vocab": [
                {"word": "గది / రూమ్", "translit": "Gadi / Room", "pron": "Gadi / Room", "pos": "noun", "meanings": {"en": "Room", "te": "గది / రూమ్", "hi": "कमरा"}, "exTarget": "నాకు ఒక గది కావాలి.", "exTranslit": "Nāku oka gadi kāvāli.", "exNative": {"en": "I want one room.", "te": "నాకు ఒక గది కావాలి.", "hi": "मुझे एक कमरा चाहिए।"}},
                {"word": "తాళం చెవి", "translit": "Tālam chevi", "pron": "Taalam chevi", "pos": "noun", "meanings": {"en": "Key", "te": "తాళం చెవి / కీ", "hi": "चाबी"}, "exTarget": "గది తాళం చెవి ఇవ్వండి.", "exTranslit": "Gadi tālam chevi ivvandi.", "exNative": {"en": "Please give the room key.", "te": "గది తాళం చెవి ఇవ్వండి.", "hi": "कमरे की चाबी दीजिए।"}},
                {"word": "పాస్‌వర్డ్", "translit": "Password", "pron": "Password", "pos": "noun", "meanings": {"en": "Password", "te": "పాస్‌వర్డ్", "hi": "पासवर्ड"}, "exTarget": "వైఫై పాస్‌వర్డ్ చెప్పండి.", "exTranslit": "WiFi password cheppandi.", "exNative": {"en": "Please tell the WiFi password.", "te": "వైఫై పాస్‌వర్డ్ చెప్పండి.", "hi": "वाई-फ़ाई पासवर्ड बताइए।"}},
                {"word": "శుభ్రంగా", "translit": "Śubhrangā", "pron": "Shubhrangaa", "pos": "adjective", "meanings": {"en": "Clean", "te": "శుభ్రంగా", "hi": "साफ़-सुथरा"}, "exTarget": "గది చాలా శుభ్రంగా ఉంది.", "exTranslit": "Gadi chālā śubhrangā undi.", "exNative": {"en": "The room is very clean.", "te": "గది చాలా శుభ్రంగా ఉంది.", "hi": "कमरा बहुत साफ़ है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "What is the Telugu word for 'Key'?", "te": "'కీ / తాళం చెవి' కి సరైన తెలుగు పదం ఏది?", "hi": "'चाबी' के लिए सही तेलुगु शब्द कौन सा है?"}, "prompt": {"en": "Key", "te": "తాళం చెవి", "hi": "चाबी"}, "correct": "తాళం చెవి", "options": ["తాళం చెవి", "గది", "బస్సు", "డబ్బులు"], "expl": {"en": "'తాళం చెవి' (Tālam chevi) means key.", "te": "తాళం చెవి అంటే కీ.", "hi": "'తాళం చెవి' का अर्थ चाबी है।"}}
            ]
        }
    ],

    # MODULE 5: Social Fluency & Urgent Help
    [
        {
            "title": {"en": "Making Friends & Casual Chat", "te": "స్నేహం చేయడం & సరదా సంభాషణ", "hi": "दोस्त बनाना और अनौपचारिक बातचीत"},
            "objective": {"en": "Make Telugu friends, chat about hobbies, and exchange phone numbers.", "te": "కొత్త స్నేహితులను చేసుకోవడం, ఫోన్ నంబర్లు మార్చుకోవడం నేర్చుకోండి.", "hi": "नए दोस्त बनाना और फ़ोन नंबर का आदान-प्रदान सीखें।"},
            "culturalTip": {"en": "Asking 'భోజనం చేశారా?' (Did you eat?) is the affectionate Telugu way of asking 'How are you?' and expressing care.", "te": "తెలుగువారిలో 'భోజనం చేశారా?' అని అడగడం ఆప్యాయతతో కూడిన పలకరింపు.", "hi": "तेलुगु लोग हालचाल पूछते समय प्यार से 'భోజనం చేశారా?' (खाना खाया क्या?) ज़रूर पूछते हैं।"},
            "grammar": {
                "title": {"en": "Past Caring Question ('చేశారా?')", "te": "ఆప్యాయతతో అడగడం (చేశారా?)", "hi": "स्नेहपूर्वक पूछना (చేశారా?)"},
                "explanation": {"en": "Ask 'భోజనం చేశారా?' (Did you have food?) or 'టీ తాగారా?' (Did you drink tea?) as an affectionate friendly check-in.", "te": "స్నేహితులను ఆప్యాయంగా పలకరించడానికి 'భోజనం చేశారా?' అంటారు.", "hi": "दोस्ताना बातचीत में 'భోజనం చేశారా?' (खाना खाया?) बहुत लोकप्रिय है।"},
                "ruleSummary": {"en": "భోజనం చేశారా? = Have you eaten?", "te": "భోజనం చేశారా?", "hi": "खाना खा लिया क्या?"},
                "examples": [{"target": "నమస్కారం అండి! భోజనం చేశారా?", "transliteration": "Namaskāram andi! Bhōjanam chēśārā?", "native": {"en": "Hello! Did you have your meal?", "te": "నమస్కారం అండి! భోజనం చేశారా?", "hi": "नमस्ते जी! क्या आपने खाना खाया?"}}],
                "commonMistakes": [{"incorrect": "నువ్వు తిన్నావా (to new acquaintances)", "correct": "భోజనం చేశారా అండి?", "explanation": {"en": "Use polite 'చేశారా' with adults.", "te": "మర్యాదగా 'భోజనం చేశారా అండి?' అనాలి.", "hi": "आदर से 'భోజనం చేశారా అండి?' कहें।"}}]
            },
            "vocab": [
                {"word": "స్నేహితుడు", "translit": "Snēhituḍu", "pron": "Snehithudu", "pos": "noun", "meanings": {"en": "Friend", "te": "స్నేహితుడు / మిత్రుడు", "hi": "मित्र / दोस्त"}, "exTarget": "ఇతను నా మంచి స్నేహితుడు.", "exTranslit": "Itanu nā manchi snēhituḍu.", "exNative": {"en": "He is my good friend.", "te": "ఇతను నా మంచి స్నేహితుడు.", "hi": "यह मेरा अच्छा दोस्त है।"}},
                {"word": "ఫోన్ నంబర్", "translit": "Phone number", "pron": "Phone number", "pos": "noun", "meanings": {"en": "Phone number", "te": "ఫోన్ నంబర్", "hi": "फ़ोन नंबर"}, "exTarget": "మీ ఫోన్ నంబర్ ఇవ్వండి.", "exTranslit": "Mee phone number ivvandi.", "exNative": {"en": "Please give your phone number.", "te": "మీ ఫోన్ నంబర్ ఇవ్వండి.", "hi": "अपना फ़ोन नंबर दीजिए।"}},
                {"word": "ఇష్టం", "translit": "Ishtam", "pron": "Ishtam", "pos": "noun", "meanings": {"en": "Like / Favorite", "te": "ఇష్టం", "hi": "पसंद"}, "exTarget": "నాకు సంగీతం అంటే చాలా ఇష్టం.", "exTranslit": "Nāku sangītam antē chālā ishtam.", "exNative": {"en": "I like music very much.", "te": "నాకు సంగీతం అంటే చాలా ఇష్టం.", "hi": "मुझे संगीत बहुत पसंद है।"}},
                {"word": "సమయం", "translit": "Samayam", "pron": "Samayam", "pos": "noun", "meanings": {"en": "Time", "te": "సమయం / టైమ్", "hi": "समय / वक़्त"}, "exTarget": "ఇప్పుడు సమయం ఎంత?", "exTranslit": "Ippudu samayam entha?", "exNative": {"en": "What time is it now?", "te": "ఇప్పుడు సమయం ఎంత?", "hi": "अभी क्या समय हुआ है?"}}
            ],
            "exercises": [
                {"instruction": {"en": "What affectionate greeting do Telugu speakers often ask?", "te": "తెలుగువారు ఆప్యాయంగా ఏమని పలకరిస్తారు?", "hi": "तेलुगु भाषी स्नेहपूर्वक क्या पूछते हैं?"}, "prompt": {"en": "Did you eat?", "te": "భోజనం చేశారా?", "hi": "खाना खाया क्या?"}, "correct": "భోజనం చేశారా?", "options": ["భోజనం చేశారా?", "ఎవరు మీరు?", "సమయం లేదు", "వెళ్లిపోండి"], "expl": {"en": "'భోజనం చేశారా?' is the classic caring Telugu greeting.", "te": "'భోజనం చేశారా?' అనేది తెలుగువారి ఆప్యాయత పలకరింపు.", "hi": "'భోజనం చేశారా?' स्नेहपूर्ण अभिवादन है।"}}
            ]
        },
        {
            "title": {"en": "Medical Needs & Pharmacy", "te": "వైద్య సహాయం & మందుల షాపు", "hi": "चिकित्सा सहायता और दवाई की दुकान"},
            "objective": {"en": "Describe symptoms (తలనెప్పి - headache, జ్వరం - fever) and buy medicines at medical stores.", "te": "తలనెప్పి, జ్వరం వంటి లక్షణాలు చెప్పి మందుల షాపులో మందులు కొనడం నేర్చుకోండి.", "hi": "सिरदर्द, बुखार के लक्षण बताकर दवाई खरीदना सीखें।"},
            "culturalTip": {"en": "Pharmacies in South India are known as 'Medical Stores'; pharmacists usually speak both Telugu and basic English.", "te": "మందుల షాపులలో ప్రిస్క్రిప్షన్ చూపించి సులభంగా మందులు పొందవచ్చు.", "hi": "दवा की दुकानों पर लक्षण बताकर आसानी से दवा ली जा सकती है।"},
            "grammar": {
                "title": {"en": "Expressing Pain ('నెప్పిగా ఉంది')", "te": "బాధను వ్యక్తం చేయడం (నెప్పిగా ఉంది)", "hi": "दर्द व्यक्त करना (నెప్పిగా ఉంది)"},
                "explanation": {"en": "State the body part followed by 'నెప్పిగా ఉంది' (It hurts): 'తల నెప్పిగా ఉంది' (Head hurts).", "te": "శరీర భాగం పేరు చెప్పి 'నెప్పిగా ఉంది' అని చెప్పాలి.", "hi": "अंग का नाम बताकर 'నెప్పిగా ఉంది' (दर्द हो रहा है) कहें।"},
                "ruleSummary": {"en": "[Body part] + నెప్పిగా ఉంది = [Body part] hurts.", "te": "[శరీర భాగం] + నెప్పిగా ఉంది.", "hi": "[अंग] + में दर्द है।"},
                "examples": [{"target": "నాకు తలనెప్పిగా ఉంది, టాబ్లెట్ ఇవ్వండి", "transliteration": "Nāku talaneppigā undi, tablet ivvandi", "native": {"en": "I have a headache, please give a tablet.", "te": "నాకు తలనెప్పిగా ఉంది, టాబ్లెట్ ఇవ్వండి.", "hi": "मुझे सिरदर्द है, कृपया एक गोली दीजिए।"}}],
                "commonMistakes": [{"incorrect": "తల బాధ ఉంది", "correct": "తలనెప్పిగా ఉంది", "explanation": {"en": "Use 'తలనెప్పి' for headache.", "te": "తలనెప్పి అనాలి.", "hi": "सिरदर्द के लिए 'తలనెప్పి' कहें।"}}]
            },
            "vocab": [
                {"word": "మందులు", "translit": "Mandulu", "pron": "Mandulu", "pos": "noun", "meanings": {"en": "Medicines", "te": "మందులు / ఔషధం", "hi": "दवाइयाँ"}, "exTarget": "జ్వరానికి మందులు ఇవ్వండి.", "exTranslit": "Jvarāniki mandulu ivvandi.", "exNative": {"en": "Give medicines for fever.", "te": "జ్వరానికి మందులు ఇవ్వండి.", "hi": "बुखार की दवाई दीजिए।"}},
                {"word": "జ్వరం", "translit": "Jvaram", "pron": "Jvaram", "pos": "noun", "meanings": {"en": "Fever", "te": "జ్వరం", "hi": "बुखार"}, "exTarget": "నాకు తీవ్రమైన జ్వరం వచ్చింది.", "exTranslit": "Nāku tīvramaina jvaram vachindi.", "exNative": {"en": "I got a high fever.", "te": "నాకు తీవ్రమైన జ్వరం వచ్చింది.", "hi": "मुझे तेज़ बुखार आया है।"}},
                {"word": "డాక్టర్", "translit": "Doctor", "pron": "Doctor", "pos": "noun", "meanings": {"en": "Doctor", "te": "డాక్టర్ / వైద్యుడు", "hi": "डॉक्टर / चिकित्सक"}, "exTarget": "డాక్టర్ గారు ఎప్పుడు వస్తారు?", "exTranslit": "Doctor gāru eppudu vastāru?", "exNative": {"en": "When will the doctor arrive?", "te": "డాక్టర్ గారు ఎప్పుడు వస్తారు?", "hi": "डॉक्टर साहब कब आएंगे?"}},
                {"word": "ఆసుపత్రి", "translit": "Āsupatri", "pron": "Aasupatri", "pos": "noun", "meanings": {"en": "Hospital", "te": "ఆసుపత్రి / దావాఖానా", "hi": "अस्पताल"}, "exTarget": "దగ్గరలో ఆసుపత్రి ఎక్కడ ఉంది?", "exTranslit": "Daggaralō āsupatri ekkada undi?", "exNative": {"en": "Where is the hospital nearby?", "te": "దగ్గరలో ఆసుపత్రి ఎక్కడ ఉంది?", "hi": "पास में अस्पताल कहाँ है?"}}
            ],
            "exercises": [
                {"instruction": {"en": "What is the Telugu word for 'Hospital'?", "te": "'ఆసుపత్రి' కి సమానమైన పదం ఏది?", "hi": "'अस्पताल' के लिए तेलुगु शब्द कौन सा है?"}, "prompt": {"en": "Hospital", "te": "ఆసుపత్రి", "hi": "अस्पताल"}, "correct": "ఆసుపత్రి", "options": ["ఆసుపత్రి", "హోటల్", "బస్సు", "మార్కెట్"], "expl": {"en": "'ఆసుపత్రి' (Āsupatri) means hospital.", "te": "ఆసుపత్రి అంటే హాస్పిటల్.", "hi": "'ఆసుపత్రి' का अर्थ अस्पताल है।"}}
            ]
        },
        {
            "title": {"en": "Emergencies & Lost Items", "te": "అత్యవసర పరిస్థితులు & పోయిన వస్తువులు", "hi": "आपातकालीन स्थिति और खोया सामान"},
            "objective": {"en": "Call for help ('కాపాడండి!' - Save me!), report lost items, and contact police (100 / 112).", "te": "సహాయం కోసం అరవడం, పోయిన వస్తువులను పోలీసులకు నివేదించడం నేర్చుకోండి.", "hi": "मदद मांगना और खोया सामान पुलिस को रिपोर्ट करना सीखें।"},
            "culturalTip": {"en": "In India, dialing 112 or 100 connects directly to emergency police services.", "te": "అత్యవసర సమయంలో 100 లేదా 112 కు డయల్ చేసి పోలీసుల సహాయం పొందవచ్చు.", "hi": "आपातकाल में 100 या 112 डायल करके पुलिस सहायता प्राप्त करें।"},
            "grammar": {
                "title": {"en": "Urgent Imperative ('కాపాడండి!')", "te": "అత్యవసర పిలుపు (కాపాడండి!)", "hi": "आपातकालीन पुकार (కాపాడండి!)"},
                "explanation": {"en": "Shout 'కాపాడండి!' (Help / Save me!) or 'సహాయం చేయండి!' (Help me!) in critical situations.", "te": "ప్రమాదంలో ఉన్నప్పుడు 'కాపాడండి!' లేదా 'సహాయం చేయండి!' అని అరవాలి.", "hi": "संकट के समय 'కాపాడండి!' (बचाइए!) या 'సహాయం చేయండి!' (मदद कीजिए!) कहें।"},
                "ruleSummary": {"en": "కాపాడండి! = Help! / Save me!", "te": "కాపాడండి!", "hi": "बचाइए! / सहायता कीजिए!"},
                "examples": [{"target": "ఎవరైనా కాపాడండి! సహాయం చేయండి!", "transliteration": "Evarainā kāpādandi! Sahāyam cheyandi!", "native": {"en": "Someone please help! Save me!", "te": "ఎవరైనా కాపాడండి! సహాయం చేయండి!", "hi": "कोई बचाइए! मदद कीजिए!"}}],
                "commonMistakes": [{"incorrect": "సహాయం లేదు", "correct": "సహాయం చేయండి!", "explanation": {"en": "Use 'సహాయం చేయండి!' for please help.", "te": "'సహాయం చేయండి!' అని అరవాలి.", "hi": "'సహాయం చేయండి!' बोलें।"}}]
            },
            "vocab": [
                {"word": "కాపాడండి", "translit": "Kāpāḍandi", "pron": "Kaapaadandi", "pos": "verb", "meanings": {"en": "Help! / Save me!", "te": "కాపాడండి!", "hi": "बचाइए! / सहायता कीजिए!"}, "exTarget": "దయచేసి నన్ను కాపాడండి!", "exTranslit": "Dayachēsi nannu kāpāḍandi!", "exNative": {"en": "Please save me!", "te": "దయచేసి నన్ను కాపాడండి!", "hi": "कृपया मुझे बचाइए!"}},
                {"word": "పోలీసులు", "translit": "Polīśulu", "pron": "Poleesulu", "pos": "noun", "meanings": {"en": "Police", "te": "పోలీసులు", "hi": "पुलिस"}, "exTarget": "పోలీసులకు ఫోన్ చేయండి.", "exTranslit": "Polīśulaku phone cheyandi.", "exNative": {"en": "Call the police.", "te": "పోలీసులకు ఫోన్ చేయండి.", "hi": "पुलिस को फ़ोन कीजिए।"}},
                {"word": "పోయింది", "translit": "Pōyindi", "pron": "Poyindi", "pos": "verb", "meanings": {"en": "Lost / Gone", "te": "పోయింది / పోగొట్టుకున్నాను", "hi": "खो गया"}, "exTarget": "నా పర్స్ పోయింది.", "exTranslit": "Nā purse pōyindi.", "exNative": {"en": "My purse is lost.", "te": "నా పర్స్ పోయింది.", "hi": "मेरा पर्स खो गया।"}},
                {"word": "అత్యవసరం", "translit": "Atyavasaram", "pron": "Atyavasaram", "pos": "noun", "meanings": {"en": "Emergency / Urgent", "te": "అత్యవసరం", "hi": "आपातकालीन / ज़रूरी"}, "exTarget": "ఇది చాలా అత్యవసర పరిస్థితి.", "exTranslit": "Idi chālā atyavasara paristhiti.", "exNative": {"en": "This is an emergency situation.", "te": "ఇది చాలా అత్యవసర పరిస్థితి.", "hi": "यह आपातकालीन स्थिति है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you shout 'Help! Save me!' in Telugu?", "te": "'కాపాడండి!' అని సహాయం కోసం ఎలా అరుస్తారు?", "hi": "तेलुगु में 'बचाइए!' कैसे पुकारेंगे?"}, "prompt": {"en": "Help! Save me!", "te": "కాపాడండి!", "hi": "बचाइए!"}, "correct": "కాపాడండి!", "options": ["కాపాడండి!", "ధన్యవాదాలు", "రండి", "బాగున్నారా"], "expl": {"en": "'కాపాడండి!' (Kāpāḍandi) is the urgent call for help.", "te": "'కాపాడండి!' అంటే Help / Save me.", "hi": "'కాపాడండి!' संकट की पुकार है।"}}
            ]
        }
    ]
]
