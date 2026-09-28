# scripts/target_ta.py
# -*- coding: utf-8 -*-
"""15 Real-Life Situational Tamil Lessons across 5 Modules."""

TA_LESSONS = [
    # MODULE 1: Everyday Survival & Greetings
    [
        {
            "title": {"en": "Daily Greetings & Hello", "te": "రోజువారీ శుభాకాంక్షలు (வணக்கம்)", "hi": "दैनिक अभिवादन (வணக்கம்)"},
            "objective": {"en": "Master வணக்கம் (Vanakkam), நன்றி (Nandri), and polite daily greetings in Tamil.", "te": "నమస్కారం, ధన్యవాదాలు మరియు సహజమైన తమిళ పలకరింపులు నేర్చుకోండి.", "hi": "नमस्ते, धन्यवाद और तमिल में शिष्टाचार सीखें।"},
            "culturalTip": {"en": "Placing palms together at chest level and saying 'வணக்கம்' (Vanakkam) is the universal greeting in Tamil culture.", "te": "చేతులు జోడించి 'வணக்கம்' (వణక్కం) అనడం తమిళ సంస్కృతిలో ప్రామాణిక పలకరింపు.", "hi": "दोनों हाथ जोड़कर 'வணக்கம்' (वणक्कम) कहना तमिल संस्कृति में आदरणीय अभिवादन है।"},
            "grammar": {
                "title": {"en": "Respectful Address (நீங்கள் vs நீ)", "te": "గౌరవ సంబోధన (మీరు vs నువ్వు)", "hi": "आदरणीय संबोधन (आप बनाम तुम)"},
                "explanation": {"en": "Use நீங்கள் (Neengal) for respect and elders; use நீ (Nee) only for peers or young children.", "te": "గౌరవంగా మీరు అనడానికి 'நீங்கள்', నువ్వు అనడానికి 'நீ' వాడతారు.", "hi": "बड़ों के लिए 'நீங்கள்' (आप) और छोटों के लिए 'நீ' (तुम) का प्रयोग करें।"},
                "ruleSummary": {"en": "எப்படி இருக்கிறீர்கள்? (Formal) vs எப்படி இருக்கிறாய்? (Informal).", "te": "ఎలా ఉన్నారు? (Eppadi irukkireergal?)", "hi": "आप कैसे हैं? (Eppadi irukkireergal?)"},
                "examples": [{"target": "வணக்கம்! எப்படி இருக்கிறீர்கள்?", "transliteration": "Vanakkam! Eppadi irukkireergal?", "native": {"en": "Hello! How are you?", "te": "నమస్కారం! మీరు ఎలా ఉన్నారు?", "hi": "नमस्ते! आप कैसे हैं?"}}],
                "commonMistakes": [{"incorrect": "நீ எப்படி (to elders)", "correct": "நீங்கள் எப்படி இருக்கிறீர்கள்?", "explanation": {"en": "Always use respectful plural with adults.", "te": "పెద్దవారితో మాట్లాడేటప్పుడు ఎప్పుడూ గౌరవ రూపం వాడాలి.", "hi": "बड़ों से हमेशा आदरणीय रूप में बात करें।"}}]
            },
            "vocab": [
                {"word": "வணக்கம்", "translit": "Vanakkam", "pron": "వ-ణక్-కం", "pos": "greeting", "meanings": {"en": "Hello / Greetings", "te": "నమస్కారం / బాగున్నారా", "hi": "नमस्ते / हैलो"}, "exTarget": "வணக்கம்! காலை வணக்கம்.", "exTranslit": "Vanakkam! Kaalai vanakkam.", "exNative": {"en": "Hello! Good morning.", "te": "నమస్కారం! శుభోదయం.", "hi": "नमस्ते! शुभ प्रभात।"}},
                {"word": "மிக்க நன்றி", "translit": "Mikka nandri", "pron": "మిక్-క నన్-డ్రి", "pos": "phrase", "meanings": {"en": "Thank you very much", "te": "చాలా ధన్యవాదాలు", "hi": "बहुत धन्यवाद"}, "exTarget": "உங்கள் உதவிக்கு மிக்க நன்றி.", "exTranslit": "Ungal udhavikku mikka nandri.", "exNative": {"en": "Thank you very much for your help.", "te": "మీ సహాయానికి చాలా ధన్యవాదాలు.", "hi": "आपकी मदद के लिए बहुत धन्यवाद।"}},
                {"word": "போய் வருகிறேன்", "translit": "Poi varugiren", "pron": "పోయ్ వరు-గి-రేన్", "pos": "phrase", "meanings": {"en": "Goodbye (I will go and return)", "te": "వెళ్లివస్తాను (వీడ్కోలు)", "hi": "अलविदा (जाकर आता हूँ)"}, "exTarget": "போய் வருகிறேன், நாளை பார்ப்போம்.", "exTranslit": "Poi varugiren, naalai paarppom.", "exNative": {"en": "Goodbye, see you tomorrow.", "te": "వెళ్లివస్తాను, రేపు కలుద్దాం.", "hi": "अलविदा, कल मिलते हैं।"}},
                {"word": "ஆம்", "translit": "Aam", "pron": "ఆమ్", "pos": "interjection", "meanings": {"en": "Yes", "te": "అవును", "hi": "हाँ"}, "exTarget": "ஆம், எனக்குப் புரிகிறது.", "exTranslit": "Aam, enakku purigiradhu.", "exNative": {"en": "Yes, I understand.", "te": "అవును, నాకు అర్థమైంది.", "hi": "हाँ, मुझे समझ आ गया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the Tamil word for 'Hello'.", "te": "నమస్కారానికి సరైన తమిళ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही तमिल शब्द चुनें।"}, "prompt": {"en": "Hello", "te": "నమస్కారం", "hi": "नमस्ते"}, "correct": "வணக்கம்", "options": ["வணக்கம்", "நன்றி", "போய் வருகிறேன்", "இல்லை"], "expl": {"en": "'வணக்கம்' (Vanakkam) is the standard greeting.", "te": "తమిళంలో ప్రామాణిక నమస్కారం 'வணக்கம்'.", "hi": "'வணக்கம்' मानक तमिल अभिवादन है।"}}
            ]
        },
        {
            "title": {"en": "Politeness, Excuse Me & Please", "te": "మర్యాదపూర్వక మాటలు & క్షమించండి", "hi": "माफ़ी और शिष्टाचार"},
            "objective": {"en": "Say மன்னிக்கவும் (Sorry) and தயவுசெய்து (Please) politely in daily life.", "te": "దయచేసి మరియు క్షమించండి అని గౌరవంగా చెప్పడం నేర్చుకోండి.", "hi": "कृपया और माफ़ कीजिए का उपयोग सीखें।"},
            "culturalTip": {"en": "Tamil speakers value humility and politeness; adding 'தயவுசெய்து' softens any request.", "te": "తమిళంలో ఏదైనా అడిగేటప్పుడు 'தயவுசெய்து' చేర్చడం ఎంతో మర్యాద.", "hi": "तमिल में किसी भी अनुरोध के साथ 'தயவுசெய்து' लगाना विनम्रता का प्रतीक है।"},
            "grammar": {
                "title": {"en": "Polite Particle (-ங்கள் / தயவுசெய்து)", "te": "గౌరవ ప్రత్యయం", "hi": "आदरणीय प्रत्यय"},
                "explanation": {"en": "Add 'தயவுசெய்து' (please) or verb plural ending '-ங்கள்' for polite commands.", "te": "దయచేసి చెప్పడానికి 'தயவுசெய்து' లేదా క్రియ చివర '-ங்கள்' చేర్చాలి.", "hi": "कृपया के लिए 'தயவுசெய்து' या क्रिया के अंत में '-ங்கள்' जोड़ें।"},
                "ruleSummary": {"en": "தயவுசெய்து + [Verb]ுங்கள் = Please [Verb].", "te": "దయచేసి + చేయండి.", "hi": "कृपया + कीजिए।"},
                "examples": [{"target": "தயவுசெய்து உள்ளே வாருங்கள்", "transliteration": "Thayavuseithu ullae vaarungal", "native": {"en": "Please come inside.", "te": "దయచేసి లోపలికి రండి.", "hi": "कृपया अंदर आइए।"}}],
                "commonMistakes": [{"incorrect": "வா (to elders)", "correct": "வாருங்கள்", "explanation": {"en": "Use வாருங்கள் with adults, never bare வா.", "te": "పెద్దవారితో మాట్లాడేటప్పుడు 'வாருங்கள்' అనాలి.", "hi": "बड़ों से हमेशा வாருங்கள் कहें।"}}]
            },
            "vocab": [
                {"word": "தயவுசெய்து", "translit": "Thayavuseithu", "pron": "త-య-వు-సెయ్-దు", "pos": "phrase", "meanings": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "exTarget": "தயவுசெய்து உதவுங்கள்.", "exTranslit": "Thayavuseithu udhavungal.", "exNative": {"en": "Please help me.", "te": "దయచేసి సహాయం చేయండి.", "hi": "कृपया मदद कीजिए।"}},
                {"word": "மன்னிக்கவும்", "translit": "Mannikkavum", "pron": "మన్-నిక్-క-వుమ్", "pos": "phrase", "meanings": {"en": "Excuse me / I am sorry", "te": "నన్ను క్షమించండి", "hi": "माफ़ कीजिए"}, "exTarget": "மன்னிக்கவும், நான் கவனிக்கவில்லை.", "exTranslit": "Mannikkavum, naan gavanikkavillai.", "exNative": {"en": "Excuse me, I didn't notice.", "te": "క్షమించండి, నేను గమనించలేదు.", "hi": "माफ़ कीजिए, मैंने ध्यान नहीं दिया।"}},
                {"word": "பரவாயில்லை", "translit": "Paravaayillai", "pron": "ప-ర-వా-యిల్-లై", "pos": "phrase", "meanings": {"en": "No problem / It's fine", "te": "పర్వాలేదు / అంతా బాగుంది", "hi": "कोई बात नहीं / ठीक है"}, "exTarget": "பரவாயில்லை, கவலைப்படாதீர்கள்.", "exTranslit": "Paravaayillai, kavalaippadaadheergal.", "exNative": {"en": "It's fine, don't worry.", "te": "పర్వాలేదు, ఆందోళన వద్దు.", "hi": "कोई बात नहीं, चिंता मत कीजिए।"}},
                {"word": "இல்லை", "translit": "Illai", "pron": "ఇల్-లై", "pos": "interjection", "meanings": {"en": "No / Not", "te": "కాదు / లేదు", "hi": "नहीं"}, "exTarget": "இல்லை, வேண்டாம்.", "exTranslit": "Illai, vendaam.", "exNative": {"en": "No, I don't need it.", "te": "లేదు, నాకు వద్దు.", "hi": "नहीं, मुझे नहीं चाहिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'Please' in Tamil?", "te": "'దయచేసి' అని తమిళంలో ఎలా అంటారు?", "hi": "तमिल में 'कृपया' कैसे कहते हैं?"}, "prompt": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "correct": "தயவுசெய்து", "options": ["தயவுசெய்து", "பரவாயில்லை", "வணக்கம்", "இல்லை"], "expl": {"en": "தயவுசெய்து means please.", "te": "దయచేసి అంటే தயவுசெய்து.", "hi": "தயவுசெய்து का अर्थ कृपया है।"}}
            ]
        },
        {
            "title": {"en": "Introducing Yourself & Origin", "te": "పరిచయం & ఎక్కడి నుంచి వచ్చారో చెప్పడం", "hi": "आत्मपरिचय और गृह देश"},
            "objective": {"en": "Say 'என் பெயர்...' (My name is...) and 'நான் இந்தியாவில் இருந்து வருகிறேன்'.", "te": "మీ పేరు 'என் பெயர்...' మరియు ఊరు తమిళంలో చెప్పడం నేర్చుకోండి.", "hi": "अपना नाम 'என் பெயர்...' और देश बताना सीखें।"},
            "culturalTip": {"en": "When asked your name, stating it clearly followed by 'உங்களை சந்தித்ததில் மகிழ்ச்சி' shows great warmth.", "te": "పేరు చెప్పిన తర్వాత 'உங்களை சந்தித்ததில் மகிழ்ச்சி' అనడం సంతోషాన్ని తెలుపుతుంది.", "hi": "परिचय के बाद 'உங்களை சந்தித்ததில் மகிழ்ச்சி' कहना आदर व्यक्त करता है।"},
            "grammar": {
                "title": {"en": "Equative Sentences (என் பெயர்...)", "te": "పేరు చెప్పడం", "hi": "नाम बताना"},
                "explanation": {"en": "'என் பெயர் [Name]' means 'My name is [Name]'. Tamil does not require an explicit 'is' verb here.", "te": "తమిళంలో 'నా పేరు [పేరు]' అని నేరుగా చెప్పవచ్చు.", "hi": "तमिल में 'मेरा नाम [नाम]' सीधे बोला जाता है।"},
                "ruleSummary": {"en": "என் பெயர் [Name] = My name is [Name].", "te": "నా పేరు [పేరు].", "hi": "मेरा नाम [नाम] है।"},
                "examples": [{"target": "என் பெயர் ரவி, நான் சென்னையில் வசிக்கிறேன்", "transliteration": "En peyar Ravi, naan Chennayil vasikkiren", "native": {"en": "My name is Ravi, I live in Chennai.", "te": "నా పేరు రవి, నేను చెన్నైలో ఉంటాను.", "hi": "मेरा नाम रवि है, मैं चेन्नई में रहता हूँ।"}}],
                "commonMistakes": [{"incorrect": "நான் பெயர் ரவி", "correct": "என் பெயர் ரவி", "explanation": {"en": "Use possessive என் (my), not நான் (I).", "te": "నా పేరు అనడానికి 'என்' వాడాలి.", "hi": "हमेशा என் (मेरा) का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "என் பெயர்", "translit": "En peyar", "pron": "ఎన్ పె-యర్", "pos": "phrase", "meanings": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "exTarget": "என் பெயர் பிரியா.", "exTranslit": "En peyar Priya.", "exNative": {"en": "My name is Priya.", "te": "నా పేరు ప్రియ.", "hi": "मेरा नाम प्रिया है।"}},
                {"word": "சந்தித்ததில் மகிழ்ச்சி", "translit": "Sandhithadhil magizhchi", "pron": "సన్-దిత్-త-దిల్ మ-గిళ్-చి", "pos": "phrase", "meanings": {"en": "Nice to meet you", "te": "మిమ్మల్ని కలవడం సంతోషం", "hi": "आपसे मिलकर खुशी हुई"}, "exTarget": "உங்களை சந்தித்ததில் மிக்க மகிழ்ச்சி.", "exTranslit": "Ungalai sandhithadhil mikka magizhchi.", "exNative": {"en": "Very pleased to meet you.", "te": "మిమ్మల్ని కలవడం చాలా ఆనందంగా ఉంది.", "hi": "आपसे मिलकर बहुत प्रसन्नता हुई।"}},
                {"word": "நான்", "translit": "Naan", "pron": "నాన్", "pos": "pronoun", "meanings": {"en": "I", "te": "నేను", "hi": "मैं"}, "exTarget": "நான் ஒரு மாணவன்.", "exTranslit": "Naan oru maanavan.", "exNative": {"en": "I am a student.", "te": "నేను విద్యార్థిని.", "hi": "मैं एक छात्र हूँ।"}},
                {"word": "நண்பர்", "translit": "Nanbar", "pron": "నణ్-బర్", "pos": "noun", "meanings": {"en": "Friend", "te": "స్నేహితుడు / మిత్రుడు", "hi": "दोस्त / मित्र"}, "exTarget": "இவர் என் நண்பர்.", "exTranslit": "Ivar en nanbar.", "exNative": {"en": "He is my friend.", "te": "ఈయన నా స్నేహితుడు.", "hi": "यह मेरे मित्र हैं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'My name is' in Tamil?", "te": "'నా పేరు...' అని తమిళంలో ఎలా అంటారు?", "hi": "तमिल में 'मेरा नाम... है' कैसे कहेंगे?"}, "prompt": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "correct": "என் பெயர்", "options": ["என் பெயர்", "நான்", "நண்பர்", "வணக்கம்"], "expl": {"en": "'என் பெயர்' literally means 'My name'.", "te": "పేరు చెప్పడానికి என் பெயர் వాడతారు.", "hi": "नाम बताने के लिए என் பெயர் बोलते हैं।"}}
            ]
        }
    ],
    # MODULE 2: Real-World Shopping & Numbers
    [
        {
            "title": {"en": "Numbers & Asking Prices", "te": "సంఖ్యలు & ధరలు అడగడం", "hi": "संख्याएँ और दाम पूछना"},
            "objective": {"en": "Ask 'இதன் விலை என்ன?' (How much is this?) and understand rupee prices.", "te": "'దీని ధర ఎంత?' అని అడగడం మరియు రూపాయల విలువలు అర్థం చేసుకోవడం.", "hi": "'यह कितने का है?' पूछना और रुपये में कीमतें समझना।"},
            "culturalTip": {"en": "In local Tamil markets (சந்தை sandhai), polite bargaining is common. Ask 'கொஞ்சம் குறைக்க முடியுமா?' (Can you reduce a bit?).", "te": "మార్కెట్లలో కాస్త ధర తగ్గించమని 'கொஞ்சம் குறைக்க முடியுமா?' అని అడగవచ్చు.", "hi": "स्थानीय बाज़ार में थोड़ा मोलभाव करने के लिए கொஞ்சம் குறைக்க முடியுமா? पूछ सकते हैं।"},
            "grammar": {
                "title": {"en": "Asking Cost (விலை என்ன?)", "te": "ధర అడగడం", "hi": "दाम पूछना"},
                "explanation": {"en": "இதன் (of this) + விலை (price) + என்ன? (what is it?).", "te": "దీని ధర ఎంత అని అడగడానికి 'இதன் விலை என்ன?' అంటారు.", "hi": "इसका दाम क्या है पूछने के लिए 'இதன் விலை என்ன?' कहें।"},
                "ruleSummary": {"en": "இதன் விலை என்ன? = What is the price of this?", "te": "దీని ధర ఎంత?", "hi": "इसका दाम क्या है?"},
                "examples": [{"target": "இந்த சேலையின் விலை என்ன?", "transliteration": "Indha saelaiyin vilai enna?", "native": {"en": "How much is this saree?", "te": "ఈ చీర ధర ఎంత?", "hi": "इस साड़ी का दाम क्या है?"}}],
                "commonMistakes": [{"incorrect": "எவ்வளவு பணம் இது", "correct": "இதன் விலை என்ன?", "explanation": {"en": "Use 'இதன் விலை என்ன?' or 'இது எவ்வளவு?'.", "te": "స్పష్టంగా இதன் விலை என்ன? అనాలి.", "hi": "हमेशा இதன் விலை என்ன? बोलें।"}}]
            },
            "vocab": [
                {"word": "இதன் விலை என்ன?", "translit": "Idhan vilai enna?", "pron": "ఇ-దన్ వి-లై ఎన్-న?", "pos": "phrase", "meanings": {"en": "How much does this cost?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "exTarget": "இதன் விலை என்ன, சொல்லுங்கள்?", "exTranslit": "Idhan vilai enna, sollungal?", "exNative": {"en": "Tell me, how much is this?", "te": "దీని ధర ఎంతో చెప్పండి?", "hi": "बताइए, यह कितने का है?"}},
                {"word": "ரூபாய்", "translit": "Roobai", "pron": "రూ-బాయ్", "pos": "noun", "meanings": {"en": "Rupee (currency)", "te": "రూపాయలు", "hi": "रुपये"}, "exTarget": "இது ஐம்பது ரூபாய்.", "exTranslit": "Idhu aimbadhu roobai.", "exNative": {"en": "This is 50 rupees.", "te": "ఇది యాభై రూపాయలు.", "hi": "यह पचास रुपये का है।"}},
                {"word": "அதிகம்", "translit": "Adhigam", "pron": "అ-ది-గం", "pos": "adjective", "meanings": {"en": "Expensive / too much", "te": "చాలా ఎక్కువ / ఖరీదు", "hi": "महँगा / बहुत ज़्यादा"}, "exTarget": "விலை மிக அதிகம்.", "exTranslit": "Vilai miga adhigam.", "exNative": {"en": "The price is too high.", "te": "ధర చాలా ఎక్కువగా ఉంది.", "hi": "दाम बहुत ज़्यादा है।"}},
                {"word": "இது கொடுங்கள்", "translit": "Idhu kodungal", "pron": "ఇ-దు కొ-డుం-గళ్", "pos": "phrase", "meanings": {"en": "Give me this, please", "te": "ఇది నాకు ఇవ్వండి", "hi": "यह मुझे दीजिए"}, "exTarget": "எனக்கு இது கொடுங்கள்.", "exTranslit": "Enakku idhu kodungal.", "exNative": {"en": "Please give me this.", "te": "ఇది నాకు ఇవ్వండి, దయచేసి.", "hi": "कृपया मुझे यह दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the Tamil question for 'How much is this?'.", "te": "'దీని ధర ఎంత?' కి తమిళ వాక్యం ఏది?", "hi": "'यह कितने का है?' के लिए सही वाक्य चुनें।"}, "prompt": {"en": "How much is this?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "correct": "இதன் விலை என்ன?", "options": ["இதன் விலை என்ன?", "எங்கே போகிறீர்கள்?", "வணக்கம்", "மிக்க நன்றி"], "expl": {"en": "இதன் விலை என்ன? asks the cost clearly.", "te": "ధర అడిగే ముఖ్యమైన ప్రశ్న ఇది.", "hi": "दाम पूछने का मुख्य वाक्य यही है।"}}
            ]
        },
        {
            "title": {"en": "Paying by Card, Cash & Receipt", "te": "కార్డు, నగదు చెల్లింపు & రసీదు", "hi": "कार्ड, नकद और रसीद"},
            "objective": {"en": "Ask 'கார்டு ஏற்கப்படுமா?' (Do you take card?) and ask for a receipt (பில்).", "te": "కార్డు తీసుకుంటారా అని అడగడం మరియు రసీదు తీసుకోవడం.", "hi": "कार्ड से भुगतान और रसीद मांगना सीखें।"},
            "culturalTip": {"en": "UPI digital payments (GPay/PhonePe) are accepted at almost every tea stall and shop across Tamil Nadu.", "te": "తమిళనాడులో చిన్న టీ దుకాణం నుంచి పెద్ద షాపు వరకు గూగుల్ పే లేదా యూపీఐ వాడతారు.", "hi": "तमिलनाडु में हर छोटी-बड़ी दुकान पर यूपीआई भुगतान स्वीकार होता है।"},
            "grammar": {
                "title": {"en": "Asking Permission / Acceptance (-ஆகுமா / -ஏற்கப்படுமா)", "te": "అంగీకరిస్తారా? (తీసుకుంటారా)", "hi": "क्या स्वीकार होगा?"},
                "explanation": {"en": "'கார்டு ஏற்கப்படுமா?' asks 'Is card accepted?'. 'கூகுள் பே உள்ளதா?' (Is GPay available?).", "te": "కార్డు తీసుకుంటారా అని అడగడానికి 'கார்டு ஏற்கப்படுமா?' అనాలి.", "hi": "क्या कार्ड चलेगा पूछने के लिए 'கார்டு ஏற்கப்படுமா?' कहें।"},
                "ruleSummary": {"en": "[Payment mode] ஏற்கப்படுமா? = Is [mode] accepted?", "te": "[పద్ధతి] తీసుకుంటారా?", "hi": "क्या [माध्यम] चलेगा?"},
                "examples": [{"target": "ஜிபே மூலம் செலுத்தலாமா?", "transliteration": "GPay moolam seluthalaama?", "native": {"en": "Can I pay via GPay?", "te": "నేను గూగుల్ పే ద్వారా చెల్లించవచ్చా?", "hi": "क्या मैं जीपे से भुगतान कर सकता हूँ?"}}],
                "commonMistakes": [{"incorrect": "கார்டு போடு", "correct": "கார்டு ஏற்கப்படுமா?", "explanation": {"en": "Always ask respectfully.", "te": "మర్యాదగా అడగాలి.", "hi": "विनम्रता से पूछें।"}}]
            },
            "vocab": [
                {"word": "கார்டு ஏற்கப்படுமா?", "translit": "Card yerkappaduma?", "pron": "కార్డ్ ఏర్-కప్-ప-డు-మా?", "pos": "phrase", "meanings": {"en": "Do you accept cards?", "te": "కార్డు తీసుకుంటారా?", "hi": "क्या कार्ड चलेगा?"}, "exTarget": "இங்கே கார்டு ஏற்கப்படுமா?", "exTranslit": "Ingae card yerkappaduma?", "exNative": {"en": "Is card accepted here?", "te": "ఇక్కడ కార్డు తీసుకుంటారా?", "hi": "क्या यहाँ कार्ड चलेगा?"}},
                {"word": "ரொக்கம்", "translit": "Rokkam", "pron": "రొక్-కం", "pos": "noun", "meanings": {"en": "Cash", "te": "నగదు", "hi": "नकद"}, "exTarget": "நான் ரொக்கமாகத் தருகிறேன்.", "exTranslit": "Naan rokkamaaga tharugiren.", "exNative": {"en": "I will pay in cash.", "te": "నేను నగదు ఇస్తాను.", "hi": "मैं नकद देता हूँ।"}},
                {"word": "ரசீது", "translit": "Raseedhu", "pron": "ర-సీ-దు", "pos": "noun", "meanings": {"en": "Receipt / bill", "te": "రసీదు / బిల్లు", "hi": "रसीद / बिल"}, "exTarget": "ரசீது கொடுங்கள்.", "exTranslit": "Raseedhu kodungal.", "exNative": {"en": "Please give the receipt.", "te": "రసీదు ఇవ్వండి.", "hi": "कृपया रसीद दीजिए।"}},
                {"word": "பை", "translit": "Pai", "pron": "పై", "pos": "noun", "meanings": {"en": "Bag / carry bag", "te": "సంచి / బ్యాగ్", "hi": "थैली / बैग"}, "exTarget": "ஒரு பை வேண்டும்.", "exTranslit": "Oru pai vendum.", "exNative": {"en": "I need a bag.", "te": "నాకు ఒక సంచి కావాలి.", "hi": "मुझे एक थैली चाहिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Do you accept cards?' in Tamil?", "te": "'కార్డు తీసుకుంటారా?' అని తమిళంలో ఎలా అడుగుతారు?", "hi": "तमिल में 'क्या कार्ड चलेगा?' कैसे पूछेंगे?"}, "prompt": {"en": "Do you accept cards?", "te": "కార్డు తీసుకుంటారా?", "hi": "क्या कार्ड चलेगा?"}, "correct": "கார்டு ஏற்கப்படுமா?", "options": ["கார்டு ஏற்கப்படுமா?", "இதன் விலை என்ன?", "வணக்கம்", "நன்றி"], "expl": {"en": "கார்டு ஏற்கப்படுமா? asks if card is accepted.", "te": "కార్డు చెల్లింపు అడిగే సరైన మాట.", "hi": "कार्ड भुगतान का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Buying Daily Essentials", "te": "నిత్యావసరాలు & కిరాణా సరుకులు", "hi": "किराने का सामान और दैनिक वस्तुएं"},
            "objective": {"en": "Ask for drinking water ('தண்ணீர்'), count items, and ask 'உள்ளதா?'.", "te": "మంచినీళ్లు మరియు నిత్యావసరాలు అడగడం నేర్చుకోండి.", "hi": "पीने का पानी और आवश्यक सामान मांगना सीखें।"},
            "culturalTip": {"en": "Clean packaged drinking water is asked as 'மினரல் வாட்டர்' (mineral water) or 'குடிநீர்' (drinking water).", "te": "మంచినీళ్ల బాటిల్ అడగడానికి 'குடிநீர்' లేదా మినరల్ వాటర్ అంటారు.", "hi": "पीने के पानी की बोतल के लिए 'குடிநீர்' या मिनरल वॉटर कहते हैं।"},
            "grammar": {
                "title": {"en": "Asking Availability (உள்ளதா?)", "te": "ఉందా? (உள்ளதா?)", "hi": "क्या उपलब्ध है? (உள்ளதா?)"},
                "explanation": {"en": "[Item] + உள்ளதா? or இருக்கிறதா? asks 'Is there [Item]?'.", "te": "వస్తువు పేరు + உள்ளதா? అంటే మీ దగ్గర ఇది ఉందా అని అర్థం.", "hi": "वस्तु + உள்ளதா? का मतलब है क्या यह है?"},
                "ruleSummary": {"en": "[Item] உள்ளதா? = Is [Item] available?", "te": "[వస్తువు] ఉందా?", "hi": "[वस्तु] है क्या?"},
                "examples": [{"target": "குடிநீர் பாட்டில் உள்ளதா?", "transliteration": "Kudineer bottle ulladha?", "native": {"en": "Is there a drinking water bottle?", "te": "మంచినీళ్ల బాటిల్ ఉందా?", "hi": "क्या पीने के पानी की बोतल है?"}}],
                "commonMistakes": [{"incorrect": "தண்ணி கொடு நீ", "correct": "தண்ணீர் கொடுங்கள்", "explanation": {"en": "Use polite கொடுங்கள்.", "te": "మర్యాదగా கொடுங்கள் అనాలి.", "hi": "हमेशा கொடுங்கள் बोलें।"}}]
            },
            "vocab": [
                {"word": "தண்ணீர்", "translit": "Thanneer", "pron": "తణ్-ణీర్", "pos": "noun", "meanings": {"en": "Water", "te": "నీళ్లు / మంచినీళ్లు", "hi": "पानी"}, "exTarget": "குடிப்பதற்குத் தண்ணீர் கொடுங்கள்.", "exTranslit": "Kudippadharku thanneer kodungal.", "exNative": {"en": "Please give drinking water.", "te": "తాగడానికి నీళ్లు ఇవ్వండి.", "hi": "पीने के लिए पानी दीजिए।"}},
                {"word": "பால்", "translit": "Paal", "pron": "పాల్", "pos": "noun", "meanings": {"en": "Milk", "te": "పాలు", "hi": "दूध"}, "exTarget": "ஒரு பாக்கெட் பால் வேண்டும்.", "exTranslit": "Oru packet paal vendum.", "exNative": {"en": "I need a packet of milk.", "te": "ఒక ప్యాకెట్ పాలు కావాలి.", "hi": "एक पैकेट दूध चाहिए।"}},
                {"word": "ஒன்று", "translit": "Ondru", "pron": "ఒన్-డ్రు", "pos": "number", "meanings": {"en": "One", "te": "ఒకటి", "hi": "एक"}, "exTarget": "ஒன்று மட்டும் கொடுங்கள்.", "exTranslit": "Ondru mattum kodungal.", "exNative": {"en": "Give only one, please.", "te": "ఒక్కటి మాత్రమే ఇవ్వండి.", "hi": "केवल एक दीजिए।"}},
                {"word": "இரண்டு", "translit": "Irandu", "pron": "ఇ-రణ్-డు", "pos": "number", "meanings": {"en": "Two", "te": "రెండు", "hi": "दो"}, "exTarget": "இரண்டு கொடுங்கள்.", "exTranslit": "Irandu kodungal.", "exNative": {"en": "Please give two.", "te": "రెండు ఇవ్వండి.", "hi": "दो दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for water in Tamil?", "te": "'నీళ్లు ఇవ్వండి' అని తమిళంలో ఎలా అడుగుతారు?", "hi": "तमिल में 'पानी दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Water, please.", "te": "నీళ్లు ఇవ్వండి, దయచేసి.", "hi": "पानी दीजिए, कृपया।"}, "correct": "தண்ணீர் கொடுங்கள்", "options": ["தண்ணீர் கொடுங்கள்", "இதன் விலை என்ன?", "வணக்கம்", "நன்றி"], "expl": {"en": "தண்ணீர் கொடுங்கள் is polite and direct.", "te": "నీళ్లు అడిగే సరైన మాట.", "hi": "पानी मांगने का सही वाक्य।"}}
            ]
        }
    ],
    # MODULE 3: Cafés, Street Food & Restaurants
    [
        {
            "title": {"en": "South Indian Filter Coffee & Tea", "te": "ఫిల్టర్ కాఫీ & టీ ఆర్డర్ చేయడం", "hi": "फ़िल्टर कॉफ़ी और चाय"},
            "objective": {"en": "Order hot filter coffee ('சூடான பில்டர் காபி'), less sugar, and parcel.", "te": "ఫిల్టర్ కాఫీ ఆర్డర్ చేయడం, తక్కువ చక్కెర మరియు పార్శిల్ అడగడం.", "hi": "फ़िल्टर कॉफ़ी, कम चीनी और पार्सल मांगना सीखें।"},
            "culturalTip": {"en": "South Indian Filter Coffee (டிகிரி காபி) poured back and forth between davarah and tumbler is famous world-wide.", "te": "తమిళనాడులో డవరా-టెంబ్లర్ లో ఇచ్చే డిగ్రీ ఫిల్టర్ కాఫీ ఎంతో ప్రసిద్ధి.", "hi": "तमिलनाडु की फ़िल्टर कॉफ़ी बहुत प्रसिद्ध और स्वादिष्ट होती है।"},
            "grammar": {
                "title": {"en": "Requesting Items (எனக்கு... வேண்டும்)", "te": "నాకు కావాలి (எனக்கு... வேண்டும்)", "hi": "मुझे चाहिए"},
                "explanation": {"en": "'எனக்கு ஒரு காபி வேண்டும்' means 'I want one coffee'. Use 'கொடுங்கள்' (give) as well.", "te": "నాకు కాఫీ కావాలి అనడానికి 'எனக்கு காபி வேண்டும்' అంటారు.", "hi": "मुझे कॉफ़ी चाहिए के लिए 'எனக்கு காபி வேண்டும்' कहें।"},
                "ruleSummary": {"en": "எனக்கு [Item] வேண்டும் = I want [Item].", "te": "నాకు [వస్తువు] కావాలి.", "hi": "मुझे [वस्तु] चाहिए।"},
                "examples": [{"target": "எனக்கு சூடான காபி வேண்டும்", "transliteration": "Enakku soodaana coffee vendum", "native": {"en": "I want hot coffee.", "te": "నాకు వేడి కాఫీ కావాలి.", "hi": "मुझे गरम कॉफ़ी चाहिए।"}}],
                "commonMistakes": [{"incorrect": "நான் காபி வேண்டும்", "correct": "எனக்கு காபி வேண்டும்", "explanation": {"en": "Use dative எனக்கு (to me), not நான் (I).", "te": "నాకు కావాలి అనడానికి எனக்கு అనాలి.", "hi": "हमेशा எனக்கு का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "காபி", "translit": "Coffee", "pron": "కా-ఫీ", "pos": "noun", "meanings": {"en": "Coffee", "te": "కాఫీ", "hi": "कॉफ़ी"}, "exTarget": "ஒரு பில்டர் காபி கொடுங்கள்.", "exTranslit": "Oru filter coffee kodungal.", "exNative": {"en": "One filter coffee, please.", "te": "ఒక ఫిల్టర్ కాఫీ ఇవ్వండి.", "hi": "एक फ़िल्टर कॉफ़ी दीजिए।"}},
                {"word": "சூடான", "translit": "Soodaana", "pron": "సూ-డా-న", "pos": "adjective", "meanings": {"en": "Hot (temperature)", "te": "వేడి / వేడిగా ఉన్న", "hi": "गरम"}, "exTarget": "சூடான டீ கொடுங்கள்.", "exTranslit": "Soodaana tea kodungal.", "exNative": {"en": "Hot tea, please.", "te": "వేడి టీ ఇవ్వండి.", "hi": "गरम चाय दीजिए।"}},
                {"word": "பார்சல்", "translit": "Parcel", "pron": "పార్-సల్", "pos": "noun", "meanings": {"en": "Takeout / parcel", "te": "పార్శిల్ / టేక్‌అవే", "hi": "पैक / पार्सल"}, "exTarget": "பார்சல் செய்து கொடுங்கள்.", "exTranslit": "Parcel seithu kodungal.", "exNative": {"en": "Please pack it as a parcel.", "te": "పార్శిల్ కట్టి ఇవ్వండి.", "hi": "पार्सल कर दीजिए।"}},
                {"word": "சர்க்கரை", "translit": "Sarkkarai", "pron": "సర్క్-క-రై", "pos": "noun", "meanings": {"en": "Sugar", "te": "చక్కెర / పంచదార", "hi": "चीनी / शक्कर"}, "exTarget": "சர்க்கரை குறைவாகப் போடுங்கள்.", "exTranslit": "Sarkkarai kuraivaaga podungal.", "exNative": {"en": "Add less sugar, please.", "te": "చక్కెర తక్కువగా వేయండి.", "hi": "चीनी कम डालिए, कृपया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Order a filter coffee in a Chennai café.", "te": "ఫిల్టర్ కాఫీ ఆర్డర్ చేసే వాక్యాన్ని ఎంచుకోండి.", "hi": "फ़िल्टर कॉफ़ी ऑर्डर करने का सही वाक्य चुनें।"}, "prompt": {"en": "One filter coffee, please.", "te": "ఒక ఫిల్టర్ కాఫీ ఇవ్వండి.", "hi": "एक फ़िल्टर कॉफ़ी दीजिए।"}, "correct": "ஒரு பில்டர் காபி கொடுங்கள்", "options": ["ஒரு பில்டர் காபி கொடுங்கள்", "இதன் விலை என்ன?", "வணக்கம்", "நன்றி"], "expl": {"en": "ஒரு பில்டர் காபி கொடுங்கள் is the classic order.", "te": "ఫిల్టర్ కాఫీ కోసం అడిగే స్పష్టమైన మాట.", "hi": "फ़िल्टर कॉफ़ी मांगने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Restaurant Dining (Dosa & Meals)", "te": "హోటల్ భోజనం & దోశ", "hi": "रेस्तरां में भोजन और डोसा"},
            "objective": {"en": "Order crispy dosa, meals, table for two, and compliment the chef.", "te": "దోశ లేదా భోజనం ఆర్డర్ చేయడం మరియు చాలా రుచిగా ఉందని చెప్పడం.", "hi": "डोसा, भोजन और स्वादिष्ट कहना सीखें।"},
            "culturalTip": {"en": "Banana leaf meals (வாழை இலை சாப்பாடு) are eaten with the right hand; fold the leaf towards you after eating to show satisfaction.", "te": "అరిటాకు భోజనం తిన్నాక ఆకును మన వైపు మడిస్తే భోజనం తృప్తిగా ఉందని అర్థం.", "hi": "केले के पत्ते पर भोजन करने के बाद पत्ते को अपनी ओर मोड़ना संतुष्टि का प्रतीक है।"},
            "grammar": {
                "title": {"en": "Complimenting Food (சுவையாக இருக்கிறது)", "te": "రుచిగా ఉంది అని చెప్పడం", "hi": "स्वादिष्ट बताना"},
                "explanation": {"en": "'சுவையாக இருக்கிறது' or 'ரொம்ப நல்லா இருக்கு' means 'It is very delicious'.", "te": "భోజనం బాగుందని చెప్పడానికి 'சுவையாக இருக்கிறது' లేదా 'ரொம்ப நல்லா இருக்கு' అంటారు.", "hi": "खाना स्वादिष्ट है कहने के लिए 'சுவையாக இருக்கிறது' कहें।"},
                "ruleSummary": {"en": "உணவு மிகவும் சுவையாக இருக்கிறது = The food is very delicious.", "te": "భోజనం చాలా రుచిగా ఉంది.", "hi": "भोजन बहुत स्वादिष्ट है।"},
                "examples": [{"target": "சாப்பாடு ரொம்ப நல்லா இருக்கு", "transliteration": "Saappaadu romba nallaa irukku", "native": {"en": "The food is really good.", "te": "భోజనం చాలా బాగుంది.", "hi": "खाना बहुत अच्छा है।"}}],
                "commonMistakes": [{"incorrect": "நல்லா சாப்பாடு", "correct": "சாப்பாடு நன்றாக உள்ளது", "explanation": {"en": "Subject precedes predicate.", "te": "వాక్య నిర్మాణం సరిగ్గా ఉండాలి.", "hi": "व्याकरण का सही क्रम रखें।"}}]
            },
            "vocab": [
                {"word": "மெனு", "translit": "Menu", "pron": "మె-నూ", "pos": "noun", "meanings": {"en": "The menu", "te": "మెనూ కార్డు", "hi": "मेन्यू کارڈ"}, "exTarget": "மெனு கொடுங்கள்.", "exTranslit": "Menu kodungal.", "exNative": {"en": "Please give the menu.", "te": "మెనూ కార్డు చూపించండి.", "hi": "कृपया मेन्यू दिखाइए।"}},
                {"word": "தோசை", "translit": "Dhosai", "pron": "దో-సై", "pos": "noun", "meanings": {"en": "Dosa (crispy crepe)", "te": "దోశ", "hi": "डोसा"}, "exTarget": "ஒரு மசால் தோசை கொடுங்கள்.", "exTranslit": "Oru masaal dhosai kodungal.", "exNative": {"en": "One masala dosa, please.", "te": "ఒక మసాలా దోశ ఇవ్వండి.", "hi": "एक मसाला डोसा दीजिए।"}},
                {"word": "சுவையாக இருக்கிறது", "translit": "Suvaiyaaga irukkiradhu", "pron": "సు-వై-యా-గ ఇ-రుక్-కి-ర-దు", "pos": "adjective", "meanings": {"en": "It is delicious", "te": "చాలా రుచిగా ఉంది", "hi": "बहुत स्वादिष्ट है"}, "exTarget": "சாம்பார் மிகவும் சுவையாக இருக்கிறது.", "exTranslit": "Saambaar migavum suvaiyaaga irukkiradhu.", "exNative": {"en": "Sambar is very delicious.", "te": "సాంబారు చాలా రుచిగా ఉంది.", "hi": "सांभर बहुत स्वादिष्ट है।"}},
                {"word": "இன்னும் கொஞ்சம்", "translit": "Innum konjam", "pron": "ఇన్-నుమ్ కొన్-జమ్", "pos": "phrase", "meanings": {"en": "A little more", "te": "ఇంకా కొంచెం", "hi": "थोड़ा और"}, "exTarget": "சட்னி இன்னும் கொஞ்சம் கொடுங்கள்.", "exTranslit": "Chutney innum konjam kodungal.", "exNative": {"en": "A little more chutney, please.", "te": "ఇంకా కాస్త చట్నీ ఇవ్వండి.", "hi": "थोड़ी और चटनी दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'The food is very delicious' in Tamil?", "te": "'భోజనం చాలా రుచిగా ఉంది' అని ఎలా అంటారు?", "hi": "तमिल में 'खाना बहुत स्वादिष्ट है' कैसे कहेंगे?"}, "prompt": {"en": "It is delicious.", "te": "చాలా రుచిగా ఉంది.", "hi": "बहुत स्वादिष्ट है।"}, "correct": "சுவையாக இருக்கிறது", "options": ["சுவையாக இருக்கிறது", "இதன் விலை என்ன?", "வணக்கம்", "நன்றி"], "expl": {"en": "சுவையாக இருக்கிறது means it is delicious.", "te": "రుచిని ప్రశంసించే మాట ఇది.", "hi": "स्वादिष्ट कहने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Dietary Needs & The Bill (பில்)", "te": "కారం తగ్గించడం & బిల్లు చెల్లించడం", "hi": "कम तीखा और बिल चुकाना"},
            "objective": {"en": "Ask for the check ('பில் கொடுங்கள்') and request less spicy food.", "te": "బిల్లు ఇవ్వమని అడగడం మరియు కారం తక్కువ చేయమనడం.", "hi": "बिल मांगना और कम तीखा खाना कहना सीखें।"},
            "culturalTip": {"en": "South Indian cuisine can be fiery; saying 'காரம் குறைவாக' (Kaaram kuraivaaga) ensures mild spice.", "te": "దక్షిణ భారత వంటకాల్లో కారం ఎక్కువ; 'காரம் குறைவாக' అంటే కారం తగ్గిస్తారు.", "hi": "कम मिर्च करवाने के लिए காரம் குறைவாக कहें।"},
            "grammar": {
                "title": {"en": "Asking for the Bill (பில் கொடுங்கள்)", "te": "బిల్లు అడగడం", "hi": "बिल मांगना"},
                "explanation": {"en": "Say 'பில் கொடுங்கள்' (Give the bill) or 'எவ்வளவு ஆச்சு?' (How much did it come to?).", "te": "బిల్లు కోసం 'பில் கொடுங்கள்' లేదా 'எவ்வளவு ஆச்சு?' అనాలి.", "hi": "बिल के लिए பில் கொடுங்கள் बोलें।"},
                "ruleSummary": {"en": "பில் கொடுங்கள் = The bill, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"},
                "examples": [{"target": "சாப்பிட்டு முடித்தாயிற்று, பில் கொடுங்கள்", "transliteration": "Saappittu mudiththaayithu, bill kodungal", "native": {"en": "We are done eating, bill please.", "te": "భోజనం పూర్తయింది, బిల్లు ఇవ్వండి.", "hi": "खाना हो गया, बिल दीजिए।"}}],
                "commonMistakes": [{"incorrect": "பணம் எடு", "correct": "பில் கொடுங்கள்", "explanation": {"en": "Always polite phrasing.", "te": "మర్యాదగా పిల్ కొడుంగల్ అనాలి.", "hi": "हमेशा विनम्रता से कहें।"}}]
            },
            "vocab": [
                {"word": "பில் கொடுங்கள்", "translit": "Bill kodungal", "pron": "బిల్ కొ-డుం-గళ్", "pos": "phrase", "meanings": {"en": "The bill, please", "te": "బిల్లు ఇవ్వండి, దయచేసి", "hi": "कृपया बिल दीजिए"}, "exTarget": "அண்ணா, பில் கொடுங்கள்.", "exTranslit": "Anna, bill kodungal.", "exNative": {"en": "Brother, please bring the bill.", "te": "అన్నయ్యా, బిల్లు ఇవ్వండి.", "hi": "भैया, कृपया बिल दीजिए।"}},
                {"word": "காரம் குறைவாக", "translit": "Kaaram kuraivaaga", "pron": "కా-రం కు-రై-వా-గ", "pos": "phrase", "meanings": {"en": "Less spicy", "te": "కారం తక్కువగా", "hi": "कम तीखा"}, "exTarget": "காரம் குறைவாகச் செய்யுங்கள்.", "exTranslit": "Kaaram kuraivaaga seiyungal.", "exNative": {"en": "Make it less spicy, please.", "te": "కారం తక్కువగా చేయండి.", "hi": "कृपया कम तीखा बनाइए।"}},
                {"word": "அசைவம் வேண்டாம்", "translit": "Asaivam vendaam", "pron": "అ-సై-వం వేణ్-డామ్", "pos": "phrase", "meanings": {"en": "No non-veg (pure vegetarian)", "te": "మాంసాహారం వద్దు (శాకాహారం)", "hi": "मांसाहारी नहीं (शुद्ध शाकाहारी)"}, "exTarget": "எனக்கு அசைவம் வேண்டாம், சைவம் மட்டும்.", "exTranslit": "Enakku asaivam vendaam, saivam mattum.", "exNative": {"en": "I don't eat non-veg, only vegetarian.", "te": "నాకు నాన్-వెజ్ వద్దు, కేవలం వెజ్ మాత్రమే.", "hi": "मुझे नॉन-वेज नहीं चाहिए, सिर्फ वेज।"}},
                {"word": "சாப்பாடு நன்று", "translit": "Saappaadu nandru", "pron": "సాప్-పా-డు నన్-డ్రు", "pos": "phrase", "meanings": {"en": "Meal was good", "te": "భోజనం చాలా బాగుంది", "hi": "भोजन बहुत अच्छा था"}, "exTarget": "சாப்பாடு நன்று, நன்றி!", "exTranslit": "Saappaadu nandru, nandri!", "exNative": {"en": "Meal was good, thanks!", "te": "భోజనం బాగుంది, ధన్యవాదాలు!", "hi": "खाना बहुत अच्छा था, धन्यवाद!"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the bill in a Tamil restaurant?", "te": "హోటల్లో 'బిల్లు ఇవ్వండి' అని ఎలా అడుగుతారు?", "hi": "तमिल रेस्तरां में बिल कैसे मांगेंगे?"}, "prompt": {"en": "The bill, please.", "te": "బిల్లు ఇవ్వండి.", "hi": "कृपया बिल दीजिए।"}, "correct": "பில் கொடுங்கள்", "options": ["பில் கொடுங்கள்", "மெனு கொடுங்கள்", "வணக்கம்", "நன்றி"], "expl": {"en": "பில் கொடுங்கள் is standard.", "te": "బిల్లు అడిగే సరైన మాట.", "hi": "बिल मांगने का सही वाक्य।"}}
            ]
        }
    ],
    # MODULE 4: Real-Life Transit & Navigation
    [
        {
            "title": {"en": "Where is the Restroom? (Navigation)", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది? (దిశలు)", "hi": "शौचालय कहाँ है? (रास्ता पूछना)"},
            "objective": {"en": "Ask 'கழிப்பறை எங்கே?' and understand left, right, and straight ahead.", "te": "బాత్‌రూమ్ ఎక్కడుందో అడగడం, ఎడమ, కుడి మరియు తిన్నగా వెళ్లడం అర్థం చేసుకోవడం.", "hi": "शौचालय पूछना, बाएँ, दाएँ और सीधे जाना समझना।"},
            "culturalTip": {"en": "Public restrooms in bus stands and stations in Tamil Nadu are labeled 'கழிப்பறை' (Kazhipparai) or 'Restroom'.", "te": "బస్ స్టేషన్లు మరియు రైల్వే స్టేషన్లలో 'கழிப்பறை' అని రాసి ఉంటుంది.", "hi": "तमिलनाडु में बस स्टैंड और स्टेशनों पर கழிப்பறை लिखा होता है।"},
            "grammar": {
                "title": {"en": "Asking Locations (எங்கே உள்ளது?)", "te": "ఎక్కడ ఉంది? (எங்கே?)", "hi": "कहाँ है? (எங்கே?)"},
                "explanation": {"en": "[Place] + எங்கே? asks 'Where is [Place]?'.", "te": "స్థలం పేరు + எங்கே? అంటే ఎక్కడ ఉంది అని అర్థం.", "hi": "स्थान + எங்கே? का अर्थ है कहाँ है?"},
                "ruleSummary": {"en": "[Place] எங்கே உள்ளது? = Where is [Place]?", "te": "[స్థలం] ఎక్కడ ఉంది?", "hi": "[स्थान] कहाँ है?"},
                "examples": [{"target": "ரயில் நிலையம் எங்கே உள்ளது?", "transliteration": "Railway station engae ulladhu?", "native": {"en": "Where is the railway station?", "te": "రైల్వే స్టేషన్ ఎక్కడ ఉంది?", "hi": "रेलवे स्टेशन कहाँ है?"}}],
                "commonMistakes": [{"incorrect": "எங்கே கழிப்பறை", "correct": "கழிப்பறை எங்கே உள்ளது?", "explanation": {"en": "Place name comes first.", "te": "ముందు స్థలం పేరు చెప్పాలి.", "hi": "स्थान का नाम पहले बोलें।"}}]
            },
            "vocab": [
                {"word": "கழிப்பறை எங்கே?", "translit": "Kazhipparai engae?", "pron": "క-ళిప్-ప-రై ఎం-గే?", "pos": "phrase", "meanings": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}, "exTarget": "கழிப்பறை எங்கே உள்ளது, அண்ணா?", "exTranslit": "Kazhipparai engae ulladhu, anna?", "exNative": {"en": "Where is the restroom, brother?", "te": "బాత్‌రూమ్ ఎక్కడ ఉందో చెప్పండి?", "hi": "शौचालय कहाँ है, भैया?"}},
                {"word": "இடது பக்கம்", "translit": "Idadhu pakkam", "pron": "ఇ-డ-దు పక్-కం", "pos": "noun", "meanings": {"en": "Left side", "te": "ఎడమ వైపు", "hi": "बाईं ओर"}, "exTarget": "இடது பக்கம் திரும்புங்கள்.", "exTranslit": "Idadhu pakkam thirumbungal.", "exNative": {"en": "Turn to the left.", "te": "ఎడమ వైపునకు తిరగండి.", "hi": "बाईं तरफ मुड़िए।"}},
                {"word": "வலது பக்கம்", "translit": "Valadhu pakkam", "pron": "వ-ల-దు పక్-కం", "pos": "noun", "meanings": {"en": "Right side", "te": "కుడి వైపు", "hi": "दाईं ओर"}, "exTarget": "வலது பக்கம் உள்ளது.", "exTranslit": "Valadhu pakkam ulladhu.", "exNative": {"en": "It is on the right.", "te": "అది కుడివైపున ఉంది.", "hi": "यह दाईं तरफ है।"}},
                {"word": "நேராக", "translit": "Neraaga", "pron": "నే-రా-గ", "pos": "phrase", "meanings": {"en": "Straight ahead", "te": "తిన్నగా / నేరుగా", "hi": "सीधे आगे"}, "exTarget": "நேராகப் போங்கள்.", "exTranslit": "Neraaga pongal.", "exNative": {"en": "Go straight ahead.", "te": "ముందుకు నేరుగా వెళ్లండి.", "hi": "सीधे आगे जाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Where is the restroom?' in Tamil?", "te": "'బాత్‌రూమ్ ఎక్కడ ఉంది?' అని తమిళంలో ఎలా అడుగుతారు?", "hi": "तमिल में 'शौचालय कहाँ है?' कैसे पूछेंगे?"}, "prompt": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}, "correct": "கழிப்பறை எங்கே?", "options": ["கழிப்பறை எங்கே?", "இதன் விலை என்ன?", "வணக்கம்", "நன்றி"], "expl": {"en": "கழிப்பறை எங்கே? is the accurate question.", "te": "బాత్‌రూమ్ కోసం అడిగే ఖచ్చితమైన ప్రశ్న.", "hi": "शौचालय पूछने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Autos, Buses & Navigation", "te": "ఆటో, బస్సు ప్రయాణం", "hi": "ऑटो और बस की यात्रा"},
            "objective": {"en": "Negotiate auto fares, tell the driver where to stop ('இங்கே நிறுத்துங்கள்').", "te": "ఆటో ఎక్కడం మరియు ఇక్కడ ఆపమని డ్రైవర్‌కు చెప్పడం.", "hi": "ऑटो में बैठना और यहाँ रोकने के लिए कहना सीखें।"},
            "culturalTip": {"en": "Auto rickshaws are everywhere in Tamil Nadu; agreeing on the fare or meter beforehand is customary.", "te": "తమిళనాడులో ఆటో ఎక్కేముందు ధర మాట్లాడుకోవడం అలవాటు.", "hi": "ऑटो में बैठने से पहले किराया तय कर लेना अच्छा रहता है।"},
            "grammar": {
                "title": {"en": "Commands for Drivers (நிறுத்துங்கள்)", "te": "డ్రైవర్‌తో ఆపమనడం", "hi": "गाड़ी रोकने को कहना"},
                "explanation": {"en": "Say 'இங்கே நிறுத்துங்கள்' (Please stop here) politely.", "te": "ఇక్కడ ఆపండి అని చెప్పడానికి 'இங்கே நிறுத்துங்கள்' అనాలి.", "hi": "यहाँ रोकिए कहने के लिए 'இங்கே நிறுத்துங்கள்' बोलें।"},
                "ruleSummary": {"en": "இங்கே நிறுத்துங்கள் = Stop here, please.", "te": "ఇక్కడ ఆపండి, దయచేసి.", "hi": "यहाँ रोक दीजिए, कृपया।"},
                "examples": [{"target": "சிக்னல் அருகே நிறுத்துங்கள்", "transliteration": "Signal arugae niruthungal", "native": {"en": "Stop near the traffic signal, please.", "te": "సిగ్నల్ దగ్గర ఆపండి.", "hi": "सिग्नल के पास रोक दीजिए।"}}],
                "commonMistakes": [{"incorrect": "நிறுத்து நீ", "correct": "நிறுத்துங்கள்", "explanation": {"en": "Always polite honorific form.", "te": "మర్యాదగా நிறுத்துங்கள் అనాలి.", "hi": "हमेशा நிறுத்துங்கள் कहें।"}}]
            },
            "vocab": [
                {"word": "பேருந்து நிலையம்", "translit": "Paerundhu nilayam", "pron": "పే-రున్-దు ని-ల-యం", "pos": "noun", "meanings": {"en": "Bus stand / station", "te": "బస్ స్టాండ్ / బస్సు నిలయం", "hi": "बस स्टैंड"}, "exTarget": "பேருந்து நிலையம் எங்கே?", "exTranslit": "Paerundhu nilayam engae?", "exNative": {"en": "Where is the bus stand?", "te": "బస్ స్టాండ్ ఎక్కడ ఉంది?", "hi": "बस स्टैंड कहाँ है?"}},
                {"word": "ஆட்டோ", "translit": "Auto", "pron": "ఆ-టో", "pos": "noun", "meanings": {"en": "Auto rickshaw", "te": "ఆటో", "hi": "ऑटो"}, "exTarget": "ஆட்டோ வருமா?", "exTranslit": "Auto varuma?", "exNative": {"en": "Will the auto come?", "te": "ఆటో వస్తుందా?", "hi": "क्या ऑटो चलेगा?"}},
                {"word": "இங்கே நிறுத்துங்கள்", "translit": "Ingae niruthungal", "pron": "ఇం-గే ని-రుత్-తుం-గళ్", "pos": "phrase", "meanings": {"en": "Stop here, please", "te": "ఇక్కడ ఆపండి", "hi": "यहाँ रोक दीजिए"}, "exTarget": "இங்கே ஓரமா நிறுத்துங்கள்.", "exTranslit": "Ingae ooramaa niruthungal.", "exNative": {"en": "Please pull over right here.", "te": "దయచేసి పక్కగా ఇక్కడే ఆపండి.", "hi": "कृपया यहाँ किनारे रोक दीजिए।"}},
                {"word": "எவ்வளவு நேரம்?", "translit": "Evvalavu neram?", "pron": "ఎవ్-వ-ల-వు నే-రం?", "pos": "phrase", "meanings": {"en": "How long will it take?", "te": "ఎంత సమయం పడుతుంది?", "hi": "कितना समय लगेगा?"}, "exTarget": "போக எவ்வளவு நேரம் ஆகும்?", "exTranslit": "Poga evvalavu neram aagum?", "exNative": {"en": "How much time will it take to go?", "te": "వెళ్లడానికి ఎంత సమయం పడుతుంది?", "hi": "जाने में कितना समय लगेगा?"}}
            ],
            "exercises": [
                {"instruction": {"en": "Tell your auto driver 'Stop here, please' in Tamil.", "te": "ఆటో డ్రైవర్‌తో 'ఇక్కడ ఆపండి' అని ఎలా అంటారు?", "hi": "ऑटो चालक से 'यहाँ रोक दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Stop here, please.", "te": "ఇక్కడ ఆపండి.", "hi": "यहाँ रोक दीजिए।"}, "correct": "இங்கே நிறுத்துங்கள்", "options": ["இங்கே நிறுத்துங்கள்", "கழிப்பறை எங்கே?", "இதன் விலை என்ன?", "வணக்கம்"], "expl": {"en": "இங்கே நிறுத்துங்கள் is clear and courteous.", "te": "ఇక్కడ ఆపండి అని చెప్పే స్పష్టమైన మాట.", "hi": "यहाँ गाड़ी रोकने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Hotel Check-In & Wi-Fi", "te": "హోటల్ చెక్-ఇన్ & రూమ్ సర్వీస్", "hi": "होटल चेक-इन और कमरा"},
            "objective": {"en": "Check in with reservation, ask for Wi-Fi password, and request room keys.", "te": "రిజర్వేషన్ చూపించడం, వైఫై పాస్‌వర్డ్ మరియు రూమ్ కీ తీసుకోవడం.", "hi": "आरक्षण दिखाना, वाई-फाई पासवर्ड और चाबी मांगना।"},
            "culturalTip": {"en": "Hotels in Tamil Nadu offer 24-hour check-in/out in many pilgrimage centers like Madurai and Rameswaram.", "te": "తమిళనాడులోని ప్రముఖ యాత్రా స్థలాల్లో 24 గంటల చెక్-ఇన్ సౌకర్యం ఉంటుంది.", "hi": "तमिलनाडु के धार्मिक स्थलों पर 24 घंटे चेक-इन की सुविधा मिलती है।"},
            "grammar": {
                "title": {"en": "Stating Reservation (முன்பதிவு உள்ளது)", "te": "రిజర్వేషన్ ఉంది", "hi": "आरक्षण है"},
                "explanation": {"en": "'என் பெயரில் முன்பதிவு உள்ளது' means 'There is a booking under my name'.", "te": "నా పేరు మీద బుకింగ్ ఉంది అని చెప్పడానికి 'என் பெயரில் முன்பதிவு உள்ளது' అనాలి.", "hi": "मेरे नाम से बुकिंग है के लिए 'என் பெயரில் முன்பதிவு உள்ளது' कहें।"},
                "ruleSummary": {"en": "முன்பதிவு உள்ளது = I have a reservation.", "te": "నాకు రిజర్వేషన్ ఉంది.", "hi": "मेरा आरक्षण है।"},
                "examples": [{"target": "என் பெயரில் இரண்டு நாட்களுக்கு முன்பதிவு உள்ளது", "transliteration": "En peyaril irandu naatkalukku munpadhivu ulladhu", "native": {"en": "I have a booking for two days in my name.", "te": "నా పేరు మీద రెండు రోజుల బుకింగ్ ఉంది.", "hi": "मेरे नाम से दो दिनों की बुकिंग है।"}}],
                "commonMistakes": [{"incorrect": "நான் புக் பண்ணேன் ரூம்", "correct": "முன்பதிவு உள்ளது", "explanation": {"en": "Use proper Tamil முன்பதிவு.", "te": "స్పష్టంగా முன்பதிவு உள்ளது అనాలి.", "hi": "सही वाक्य முன்பதிவு உள்ளது है।"}}]
            },
            "vocab": [
                {"word": "முன்பதிவு", "translit": "Munpadhivu", "pron": "మున్-ప-ది-వు", "pos": "noun", "meanings": {"en": "Reservation / booking", "te": "రిజర్వేషన్ / బుకింగ్", "hi": "आरक्षण / बुकिंग"}, "exTarget": "என் முன்பதிவை சரிபாருங்கள்.", "exTranslit": "En munpadhivai saripaarungal.", "exNative": {"en": "Please check my reservation.", "te": "నా రిజర్వేషన్ చూడండి.", "hi": "कृपया मेरा आरक्षण जांचें।"}},
                {"word": "வைஃபை பாஸ்வேர்ட்", "translit": "Wi-Fi password", "pron": "వై-పై పాస్-వర్డ్", "pos": "noun", "meanings": {"en": "Wi-Fi password", "te": "వైఫై పాస్‌వర్డ్", "hi": "वाई-फाई पासवर्ड"}, "exTarget": "வைஃபை பாஸ்வேர்ட் என்ன?", "exTranslit": "Wi-Fi password enna?", "exNative": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}},
                {"word": "சாவி", "translit": "Saavi", "pron": "సా-వి", "pos": "noun", "meanings": {"en": "Room key", "te": "తాళం చెవి / రూమ్ కీ", "hi": "कमरे की चाबी"}, "exTarget": "அறை சாவி கொடுங்கள்.", "exTranslit": "Arai saavi kodungal.", "exNative": {"en": "Please give the room key.", "te": "గది తాళం ఇవ్వండి.", "hi": "कमरे की चाबी दीजिए।"}},
                {"word": "அறை", "translit": "Arai", "pron": "అ-రై", "pos": "noun", "meanings": {"en": "Room", "te": "గది / రూమ్", "hi": "कमरा"}, "exTarget": "என் அறை எண் என்ன?", "exTranslit": "En arai en enna?", "exNative": {"en": "What is my room number?", "te": "నా రూమ్ నంబర్ ఎంత?", "hi": "मेरा कमरा नंबर क्या है?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the Wi-Fi password in Tamil?", "te": "'వైఫై పాస్‌వర్డ్ ఏమిటి?' అని తమిళంలో ఎలా అడుగుతారు?", "hi": "तमिल में 'वाई-फाई पासवर्ड क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}, "correct": "வைஃபை பாஸ்வேர்ட் என்ன?", "options": ["வைஃபை பாஸ்வேர்ட் என்ன?", "இதன் விலை என்ன?", "கழிப்பறை எங்கே?", "வணக்கம்"], "expl": {"en": "வைஃபை பாஸ்வேர்ட் என்ன? is clear.", "te": "వైఫై పాస్‌వర్డ్ అడిగే సరైన మాట.", "hi": "वाई-फाई पासवर्ड पूछने का वाक्य।"}}
            ]
        }
    ],
    # MODULE 5: Social Fluency & Urgent Help
    [
        {
            "title": {"en": "Making Friends & Contact Info", "te": "స్నేహం చేయడం & నంబర్ అడగడం", "hi": "दोस्त बनाना और फोन नंबर"},
            "objective": {"en": "Ask for phone numbers, stay in touch, and invite friends for tea.", "te": "ఫోన్ నంబర్ అడగడం మరియు టీ తాగడానికి ఆహ్వానించడం నేర్చుకోండి.", "hi": "फोन नंबर मांगना और चाय के लिए आमंत्रित करना।"},
            "culturalTip": {"en": "Meeting for tea (டீ சாப்பிடலாமா?) is the universal social icebreaker across Tamil Nadu.", "te": "స్నేహితులు కలిసినప్పుడు 'டீ சாப்பிடலாமா?' అని టీ తాగడానికి వెళ్లడం అలవాటు.", "hi": "चाय पीने चलना (டீ சாப்பிடலாமா?) दोस्ती बढ़ाने का सबसे बढ़िया तरीका है।"},
            "grammar": {
                "title": {"en": "Suggestions (-லாமா?)", "te": "చేద్దామా? (-లామా?)", "hi": "क्या हम करें? (-லாமா?)"},
                "explanation": {"en": "Add '-லாமா?' to verbs to ask 'Shall we [Verb]?': நாம் போகலாமா? (Shall we go?).", "te": "క్రియ చివర '-లామా?' చేరిస్తే 'మనం వెళ్దామా?' అని ఆహ్వానించడం.", "hi": "क्रिया के अंत में '-லாமா?' जोड़ने से 'क्या हम चलें?' का अर्थ बनता है।"},
                "ruleSummary": {"en": "நாம் [Verb]லாமா? = Shall we [Verb]?", "te": "మనం [పని] చేద్దామా?", "hi": "क्या हम [काम] करें?"},
                "examples": [{"target": "நாம் ஒன்றாகச் சாப்பிடலாமா?", "transliteration": "Naam ondraaga saappidalaama?", "native": {"en": "Shall we eat together?", "te": "మనం కలిసి తిందామా?", "hi": "क्या हम साथ में खाएं?"}}],
                "commonMistakes": [{"incorrect": "நீ வா போ", "correct": "நாம் போகலாமா?", "explanation": {"en": "Use gentle suggestion form.", "te": "మర్యాదగా ఆహ్వానించాలి.", "hi": "हमेशा विनम्र सुझाव का उपयोग करें।"}}]
            },
            "vocab": [
                {"word": "தொலைபேசி எண்", "translit": "Tholaipesi en", "pron": "తొ-లై-పే-సి ఎణ్", "pos": "noun", "meanings": {"en": "Phone number", "te": "ఫోన్ నంబర్", "hi": "फोन नंबर"}, "exTarget": "உங்கள் தொலைபேசி எண் என்ன?", "exTranslit": "Ungal tholaipesi en enna?", "exNative": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}},
                {"word": "நாளை", "translit": "Naalai", "pron": "నా-ళై", "pos": "noun", "meanings": {"en": "Tomorrow", "te": "రేపు", "hi": "कल (आने वाला)"}, "exTarget": "நாளை சந்திப்போம்.", "exTranslit": "Naalai sandhippom.", "exNative": {"en": "See you tomorrow.", "te": "రేపు కలుద్దాం.", "hi": "कल मिलते हैं।"}},
                {"word": "நேரம்", "translit": "Neram", "pron": "నే-రం", "pos": "noun", "meanings": {"en": "Time", "te": "సమయం", "hi": "समय"}, "exTarget": "இன்று உங்களுக்கு நேரம் உள்ளதா?", "exTranslit": "Indru ungalukku neram ulladha?", "exNative": {"en": "Do you have time today?", "te": "ఈరోజు మీకు సమయం ఉందా?", "hi": "क्या आज आपके पास समय है?"}},
                {"word": "ஒன்றாக", "translit": "Ondraaga", "pron": "ఒన్-డ్రా-గ", "pos": "adverb", "meanings": {"en": "Together", "te": "కలిసి", "hi": "साथ में"}, "exTarget": "ஒன்றாகப் போவோம்.", "exTranslit": "Ondraaga povom.", "exNative": {"en": "Let's go together.", "te": "కలిసి వెళ్దాం.", "hi": "साथ में चलते हैं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'What is your phone number?' in Tamil?", "te": "'మీ ఫోన్ నంబర్ ఏమిటి?' అని తమిళంలో ఎలా అడుగుతారు?", "hi": "तमिल में 'आपका फोन नंबर क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}, "correct": "உங்கள் தொலைபேசி எண் என்ன?", "options": ["உங்கள் தொலைபேசி எண் என்ன?", "இதன் விலை என்ன?", "கழிப்பறை எங்கே?", "வணக்கம்"], "expl": {"en": "உங்கள் தொலைபேசி எண் என்ன? is standard.", "te": "ఫోన్ నంబర్ అడిగే స్పష్టమైన మాట.", "hi": "फोन नंबर पूछने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Emergencies & Medical Help", "te": "అత్యవసర సహాయం & డాక్టర్", "hi": "आपातकाल और डॉक्टर की सहायता"},
            "objective": {"en": "Call for help ('உதவி செய்யுங்கள்!'), find a hospital, and call 108.", "te": "సహాయం కోరడం ('உதவி செய்யுங்கள்!'), ఆసుపత్రి మరియు 108 అంబులెన్స్ పిలవడం.", "hi": "मदद मांगना ('உदவி செய்யுங்கள்!'), अस्पताल और 108 एम्बुलेंस बुलाना।"},
            "culturalTip": {"en": "Dial 108 for free ambulance/medical emergency and 100 for police in Tamil Nadu.", "te": "తమిళనాడులో ఉచిత అంబులెన్స్ కోసం 108, పోలీసుల కోసం 100 డయల్ చేయాలి.", "hi": "तमिलनाडु में एम्बुलेंस के लिए 108 और पुलिस के लिए 100 पर कॉल करें।"},
            "grammar": {
                "title": {"en": "Urgent Imperative (உதவுங்கள் / காப்பாற்றுங்கள்)", "te": "అత్యవసర సహాయం కోరడం", "hi": "आपातकालीन मदद मांगना"},
                "explanation": {"en": "'உதவி செய்யுங்கள்!' means 'Help!'. 'மருத்துவரை அழையுங்கள்' means 'Call the doctor'.", "te": "సహాయం కోసం 'உதவி செய்யுங்கள்!' లేదా కాపాడండి కోసం 'காப்பாற்றுங்கள்' అంటారు.", "hi": "मदद के लिए 'உதவி செய்யுங்கள்!' बोलें।"},
                "ruleSummary": {"en": "உதவி செய்யுங்கள்! = Please help!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"},
                "examples": [{"target": "தயவுசெய்து உதவி செய்யுங்கள், அவசரம்!", "transliteration": "Thayavuseithu udhavi seiyungal, avasaram!", "native": {"en": "Please help, it's urgent!", "te": "దయచేసి సహాయం చేయండి, అత్యవసరం!", "hi": "कृपया मदद कीजिए, बहुत ज़रूरी है!"}}],
                "commonMistakes": [{"incorrect": "ஹெல்ப் பண்ணு", "correct": "உதவி செய்யுங்கள்!", "explanation": {"en": "Use proper Tamil in emergencies.", "te": "స్పష్టంగా உதவி செய்யுங்கள் అనాలి.", "hi": "हमेशा உதவி செய்யுங்கள்! कहें।"}}]
            },
            "vocab": [
                {"word": "உதவி செய்யுங்கள்!", "translit": "Udhavi seiyungal!", "pron": "ఉ-ద-వి సెయ్-యుం-గళ్!", "pos": "phrase", "meanings": {"en": "Help me, please!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"}, "exTarget": "உதவி செய்யுங்கள்! ஒருவருக்கு உடம்பு சரியில்லை.", "exTranslit": "Udhavi seiyungal! Oruvarukku udambu sariyillai.", "exNative": {"en": "Please help! Someone is unwell.", "te": "సహాయం చేయండి! ఒకరికి ఆరోగ్యం బాగాలేదు.", "hi": "मदद कीजिए! किसी की तबीयत खराब है।"}},
                {"word": "மருத்துவமனை", "translit": "Maruthuvamanai", "pron": "మ-రుత్-తు-వ-మ-నై", "pos": "noun", "meanings": {"en": "Hospital", "te": "ఆసుపత్రి", "hi": "अस्पताल"}, "exTarget": "அருகில் மருத்துவமனை எங்கே உள்ளது?", "exTranslit": "Arugil maruthuvamanai engae ulladhu?", "exNative": {"en": "Where is the nearby hospital?", "te": "దగ్గరలోని ఆసుపత్రి ఎక్కడ ఉంది?", "hi": "पास का अस्पताल कहाँ है?"}},
                {"word": "மருந்தகம்", "translit": "Marundhagam", "pron": "మ-రున్-ద-గం", "pos": "noun", "meanings": {"en": "Pharmacy / medical shop", "te": "మందుల షాప్", "hi": "दवा की दुकान"}, "exTarget": "மருந்துக் கடை திறந்திருக்கிறதா?", "exTranslit": "Marundhu kadai thirandhirukkiradha?", "exNative": {"en": "Is the medical shop open?", "te": "మందుల దుకాణం తెరిచే ఉందా?", "hi": "क्या दवा की दुकान खुली है?"}},
                {"word": "காவல் நிலையம்", "translit": "Kaaval nilayam", "pron": "కా-వల్ ని-ల-యం", "pos": "noun", "meanings": {"en": "Police station", "te": "పోలీస్ స్టేషన్", "hi": "पुलिस स्टेशन"}, "exTarget": "காவல்துறையை அழையுங்கள்.", "exTranslit": "Kaavalthuraiyai azhaiyungal.", "exNative": {"en": "Call the police.", "te": "పోలీసులను పిలవండి.", "hi": "पुलिस को बुलाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you urgently call for help in Tamil?", "te": "అత్యవసరంలో 'సహాయం చేయండి!' అని ఎలా అంటారు?", "hi": "तमिल में आपातकाल में 'मदद कीजिए!' कैसे पुकारेंगे?"}, "prompt": {"en": "Please help!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"}, "correct": "உதவி செய்யுங்கள்!", "options": ["உதவி செய்யுங்கள்!", "வணக்கம்", "நன்றி", "இதன் விலை என்ன?"], "expl": {"en": "உதவி செய்யுங்கள்! is the Tamil emergency call.", "te": "సహాయం కోసం వాడే అత్యవసర మాట.", "hi": "मदद मांगने का मुख्य वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Lost Items & Speaking Slowly", "te": "పోగొట్టుకున్న వస్తువులు & మెల్లగా మాట్లాడమనడం", "hi": "खोया सामान और धीरे बोलना"},
            "objective": {"en": "Report a lost purse or phone and ask locals to speak slowly ('மெதுவாக பேசுங்கள்').", "te": "పర్స్ పోయిందని చెప్పడం మరియు మెల్లగా మాట్లాడమనడం.", "hi": "खोया पर्स बताना और धीरे बोलने का अनुरोध करना।"},
            "culturalTip": {"en": "Tamil locals speak fast in Chennai; saying 'கொஞ்சம் மெதுவா பேசுங்க' gets gentle, clearer pacing.", "te": "చెన్నైలో ప్రజలు వేగంగా మాట్లాడతారు; 'కొంచెం మెదువా పేసుంగ' అంటే నెమ్మదిగా చెబుతారు.", "hi": "तमिल में 'கொஞ்சம் மெதுவா பேசுங்க' कहने पर लोग धीरे और स्पष्ट बोलते हैं।"},
            "grammar": {
                "title": {"en": "Asking to Slow Down (மெதுவாக பேசுங்கள்)", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి", "hi": "कृपया धीरे बोलिए"},
                "explanation": {"en": "மெதுவாக (slowly) + பேசுங்கள் (please speak) is vital for learners.", "te": "నెమ్మదిగా చెప్పమనడానికి மெதுவாக பேசுங்கள் అనాలి.", "hi": "धीरे बोलने के लिए மெதுவாக பேசுங்கள் कहें।"},
                "ruleSummary": {"en": "மெதுவாக பேசுங்கள் = Please speak slowly.", "te": "నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"},
                "examples": [{"target": "புரியவில்லை, கொஞ்சம் மெதுவாக பேசுங்கள்", "transliteration": "Puriyavillai, konjam medhuvaaga pesungal", "native": {"en": "I don't understand, please speak slower.", "te": "అర్థం కాలేదు, కాస్త నెమ్మదిగా మాట్లాడండి.", "hi": "समझ नहीं आया, कृपया थोड़ा धीरे बोलिए।"}}],
                "commonMistakes": [{"incorrect": "மெதுவா பேசு", "correct": "மெதுவாக பேசுங்கள்", "explanation": {"en": "Always polite ending -ங்கள்.", "te": "మర్యాదగా -ங்கள் చేర్చి చెప్పాలి.", "hi": "हमेशा सम्मानपूर्वक बोलें।"}}]
            },
            "vocab": [
                {"word": "என் பர்ஸ்", "translit": "En purse", "pron": "ఎన్ పర్స్", "pos": "noun", "meanings": {"en": "My wallet / purse", "te": "నా పర్స్ / పర్సు", "hi": "मेरा बटुआ / पर्स"}, "exTarget": "என் பர்ஸ் தொலைந்துவிட்டது.", "exTranslit": "En purse tholaindhuvittadhu.", "exNative": {"en": "I lost my purse.", "te": "నా పర్స్ పోయింది.", "hi": "मेरा बटुआ खो गया है।"}},
                {"word": "செல்போன்", "translit": "Cellphone", "pron": "సెల్-పోన్", "pos": "noun", "meanings": {"en": "Mobile phone", "te": "మొబైల్ ఫోన్", "hi": "मोबाइल फोन"}, "exTarget": "என் செல்போனை காணவில்லை.", "exTranslit": "En cellphonai kaanavillai.", "exNative": {"en": "My phone is missing.", "te": "నా ఫోన్ కనిపించడం లేదు.", "hi": "मेरा फोन नहीं मिल रहा है।"}},
                {"word": "மெதுவாக", "translit": "Medhuvaaga", "pron": "మె-దు-వా-గ", "pos": "adverb", "meanings": {"en": "Slowly", "te": "నెమ్మదిగా", "hi": "धीरे-धीरे"}, "exTarget": "கொஞ்சம் மெதுவாக பேசுங்கள்.", "exTranslit": "Konjam medhuvaaga pesungal.", "exNative": {"en": "Please speak a bit slowly.", "te": "కాస్త నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया थोड़ा धीरे बोलिए।"}},
                {"word": "மீண்டும்", "translit": "Meendum", "pron": "మీణ్-డుమ్", "pos": "adverb", "meanings": {"en": "Again / once more", "te": "మళ్లీ / మరొక్కసారి", "hi": "दोबारा / फिर से"}, "exTarget": "மீண்டும் ஒருமுறை சொல்லுங்கள்.", "exTranslit": "Meendum orumurai sollungal.", "exNative": {"en": "Please say it once more.", "te": "మరొక్కసారి చెప్పండి.", "hi": "कृपया एक बार फिर कहिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask someone to speak more slowly in Tamil?", "te": "'దయచేసి నెమ్మదిగా మాట్లాడండి' అని ఎలా అంటారు?", "hi": "तमिल में 'कृपया धीरे बोलिए' कैसे कहेंगे?"}, "prompt": {"en": "Please speak slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"}, "correct": "மெதுவாக பேசுங்கள்", "options": ["மெதுவாக பேசுங்கள்", "உதவி செய்யுங்கள்!", "இதன் விலை என்ன?", "வணக்கம்"], "expl": {"en": "மெதுவாக பேசுங்கள் asks them to slow down.", "te": "నెమ్మదిగా మాట్లాడమని కోరే మర్యాదపూర్వక మాట.", "hi": "धीरे बोलने का विनम्र अनुरोध।"}}
            ]
        }
    ]
]
