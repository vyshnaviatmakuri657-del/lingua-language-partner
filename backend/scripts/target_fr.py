# scripts/target_fr.py
# -*- coding: utf-8 -*-
"""15 Real-Life Situational French Lessons across 5 Modules."""

FR_LESSONS = [
    # MODULE 1: Everyday Survival & Greetings
    [
        {
            "title": {"en": "Daily Greetings & Hello", "te": "రోజువారీ శుభాకాంక్షలు (Bonjour)", "hi": "दैनिक अभिवादन (Bonjour)"},
            "objective": {"en": "Master Bonjour, Merci, and polite greeting etiquette in France.", "te": "ఫ్రాన్స్‌లో నమస్కారం, ధన్యవాదాలు మరియు పలకరింపులు నేర్చుకోండి.", "hi": "फ्रांस में नमस्ते, धन्यवाद और शिष्टाचार सीखें।"},
            "culturalTip": {"en": "Always say 'Bonjour' before asking a question in a French shop or café; skipping it is considered very rude.", "te": "ఫ్రాన్స్ లో దుకాణాల్లోకి వెళ్లిన వెంటనే ముందుగా 'Bonjour' అనడం తప్పనిసరి.", "hi": "फ्रांस में किसी भी दुकान में प्रवेश करते ही पहले 'Bonjour' कहना अनिवार्य माना जाता है।"},
            "grammar": {
                "title": {"en": "Tu vs Vous (Informal vs Formal)", "te": "నువ్వు vs మీరు (Tu vs Vous)", "hi": "तुम बनाम आप (Tu बनाम Vous)"},
                "explanation": {"en": "Use 'vous' with strangers, elders, and shop staff; use 'tu' only with close friends and children.", "te": "పరిచయం లేనివారితో, పెద్దవారితో ఎప్పుడూ 'vous' వాడాలి.", "hi": "अजनबियों और बड़ों से हमेशा 'vous' (आप) कहें।"},
                "ruleSummary": {"en": "Comment allez-vous? (Formal) vs Comment vas-tu? (Informal).", "te": "గౌరవంగా: Comment allez-vous?", "hi": "विनम्र रूप: Comment allez-vous?"},
                "examples": [{"target": "Bonjour! Comment allez-vous?", "transliteration": "Bonjour! Comment allez-vous?", "native": {"en": "Hello! How are you?", "te": "నమస్కారం! ఎలా ఉన్నారు?", "hi": "नमस्ते! आप कैसे हैं?"}}],
                "commonMistakes": [{"incorrect": "Salut to a shopkeeper", "correct": "Bonjour", "explanation": {"en": "Use Bonjour in stores, never casual Salut.", "te": "షాపుల్లో ఎప్పుడూ Bonjour అనాలి.", "hi": "दुकानों में हमेशा Bonjour बोलें।"}}]
            },
            "vocab": [
                {"word": "Bonjour", "translit": "Bonzhoor", "pron": "బోన్-జూర్", "pos": "greeting", "meanings": {"en": "Hello / Good day", "te": "నమస్కారం / బాగున్నారా", "hi": "नमस्ते / शुभ प्रभात"}, "exTarget": "Bonjour! Bonne journée.", "exTranslit": "Bonjour! Bonne journee.", "exNative": {"en": "Hello! Have a nice day.", "te": "నమస్కారం! ఈరోజు మీకు శుభప్రదం.", "hi": "नमस्ते! आपका दिन शुभ हो।"}},
                {"word": "Merci", "translit": "Mersi", "pron": "మెర్-సీ", "pos": "phrase", "meanings": {"en": "Thank you", "te": "ధన్యవాదాలు", "hi": "धन्यवाद"}, "exTarget": "Merci beaucoup pour tout.", "exTranslit": "Merci beaucoup pour tout.", "exNative": {"en": "Thank you very much for everything.", "te": "అన్నింటికీ చాలా ధన్యవాదాలు.", "hi": "सब कुछ के लिए बहुत धन्यवाद।"}},
                {"word": "Au revoir", "translit": "O revwar", "pron": "ఓ రో-వార్", "pos": "phrase", "meanings": {"en": "Goodbye", "te": "వీడ్కోలు / వెళ్లివస్తాను", "hi": "अलविदा"}, "exTarget": "Au revoir, à bientôt!", "exTranslit": "Au revoir, a bientot!", "exNative": {"en": "Goodbye, see you soon!", "te": "వెళ్లివస్తాను, త్వరలో కలుద్దాం!", "hi": "अलविदा, जल्द मिलते हैं!"}},
                {"word": "Oui", "translit": "Wi", "pron": "వీ", "pos": "interjection", "meanings": {"en": "Yes", "te": "అవును", "hi": "हाँ"}, "exTarget": "Oui, tout à fait.", "exTranslit": "Oui, tout a fait.", "exNative": {"en": "Yes, absolutely.", "te": "అవును, ఖచ్చితంగా.", "hi": "हाँ, बिल्कुल।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the French greeting for 'Hello / Good day'.", "te": "నమస్కారానికి సరైన ఫ్రెంచ్ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही फ्रेंच शब्द चुनें।"}, "prompt": {"en": "Hello / Good day", "te": "నమస్కారం", "hi": "नमस्ते"}, "correct": "Bonjour", "options": ["Bonjour", "Merci", "Au revoir", "Non"], "expl": {"en": "'Bonjour' is the standard polite greeting.", "te": "ప్రామాణిక ఫ్రెంచ్ శుభాకాంక్ష Bonjour.", "hi": "मानक अभिवादन Bonjour है।"}}
            ]
        },
        {
            "title": {"en": "Politeness, Excuse Me & Please", "te": "మర్యాదపూర్వక మాటలు & క్షమించండి", "hi": "माफ़ी और शिष्टाचार"},
            "objective": {"en": "Say S'il vous plaît, Pardon, and Excusez-moi politely in public.", "te": "దయచేసి మరియు క్షమించండి అని గౌరవంగా చెప్పడం నేర్చుకోండి.", "hi": "कृपया और माफ़ कीजिए का उपयोग सीखें।"},
            "culturalTip": {"en": "'S'il vous plaît' (please) is expected with every order or request in France.", "te": "ఫ్రాన్స్ లో ప్రతి ఆర్డర్ కు 'S'il vous plaît' చేర్చడం సంస్కారం.", "hi": "फ्रांस में हर अनुरोध के साथ 'S'il vous plaît' जोड़ना आवश्यक है।"},
            "grammar": {
                "title": {"en": "Polite Requests (S'il vous plaît)", "te": "దయచేసి (S'il vous plaît)", "hi": "कृपया (S'il vous plaît)"},
                "explanation": {"en": "Always append 's'il vous plaît' (if it pleases you) to requests.", "te": "ఏదైనా అడిగేటప్పుడు చివర 's'il vous plaît' అనాలి.", "hi": "अनुरोध करते समय 's'il vous plaît' लगाएं।"},
                "ruleSummary": {"en": "[Request] + s'il vous plaît = Polite request.", "te": "[కోరిక] + దయచేసి.", "hi": "[अनुरोध] + कृपया।"},
                "examples": [{"target": "Un croissant, s'il vous plaît", "transliteration": "Un croissant, s'il vous plait", "native": {"en": "A croissant, please.", "te": "ఒక క్రోసెంట్ ఇవ్వండి, దయచేసి.", "hi": "एक क्रोइसैंट, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Donne croissant", "correct": "Un croissant, s'il vous plaît", "explanation": {"en": "Never use blunt commands.", "te": "మర్యాదగా s'il vous plaît అనాలి.", "hi": "हमेशा s'il vous plaît बोलें।"}}]
            },
            "vocab": [
                {"word": "S'il vous plaît", "translit": "Sil voo ple", "pron": "సిల్ వూ ప్లే", "pos": "phrase", "meanings": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "exTarget": "L'addition, s'il vous plaît.", "exTranslit": "L'addition, s'il vous plait.", "exNative": {"en": "The check, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"}},
                {"word": "Excusez-moi", "translit": "Exkuze mwa", "pron": "ఎక్స్‌-క్యూ-జే మూ-వా", "pos": "phrase", "meanings": {"en": "Excuse me", "te": "కొద్దిగా వినండి / క్షమించండి", "hi": "माफ़ कीजिए / सुनिए"}, "exTarget": "Excusez-moi, où est la gare?", "exTranslit": "Excusez-moi, ou est la gare?", "exNative": {"en": "Excuse me, where is the station?", "te": "కొద్దిగా వినండి, స్టేషన్ ఎక్కడ ఉంది?", "hi": "सुनिए, स्टेशन कहाँ है?"}},
                {"word": "Pardon", "translit": "Pardon", "pron": "పార్-దోన్", "pos": "phrase", "meanings": {"en": "Sorry / pardon", "te": "నన్ను క్షమించండి", "hi": "माफ़ कीजिए"}, "exTarget": "Pardon, je ne vous avais pas vu.", "exTranslit": "Pardon, je ne vous avais pas vu.", "exNative": {"en": "Sorry, I didn't see you.", "te": "క్షమించండి, నేను మిమ్మల్ని చూడలేదు.", "hi": "माफ़ करें, मैंने आपको देखा नहीं था।"}},
                {"word": "De rien", "translit": "De rye", "pron": "దో రి-యాన్", "pos": "phrase", "meanings": {"en": "You are welcome", "te": "పర్వాలేదండి", "hi": "कोई बात नहीं"}, "exTarget": "—Merci! —De rien.", "exTranslit": "Merci! De rien.", "exNative": {"en": "—Thank you! —You're welcome.", "te": "—ధన్యవాదాలు! —పర్వాలేదండి.", "hi": "—धन्यवाद! —कोई बात नहीं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'Please' in French?", "te": "'దయచేసి' అని ఫ్రెంచ్‌లో ఎలా అంటారు?", "hi": "फ्रेंच में 'कृपया' कैसे कहते हैं?"}, "prompt": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "correct": "S'il vous plaît", "options": ["S'il vous plaît", "De rien", "Bonjour", "Au revoir"], "expl": {"en": "S'il vous plaît means please.", "te": "దయచేసి అంటే S'il vous plaît.", "hi": "कृपया के लिए S'il vous plaît बोलते हैं।"}}
            ]
        },
        {
            "title": {"en": "Introducing Yourself & Origin", "te": "పరిచయం & ఎక్కడి నుంచి వచ్చారో చెప్పడం", "hi": "आत्मपरिचय और गृह देश"},
            "objective": {"en": "State your name with 'Je m'appelle...' and origin with 'Je viens de...'.", "te": "మీ పేరు 'Je m'appelle...' మరియు దేశం 'Je viens de...' చెప్పడం.", "hi": "अपना नाम 'Je m'appelle...' और देश बताना सीखें।"},
            "culturalTip": {"en": "Say 'Enchanté' (Pleased to meet you) with a firm handshake when meeting someone new.", "te": "పరిచయమైనప్పుడు 'Enchanté' అని చెప్పడం ఫ్రెంచ్ మర్యాద.", "hi": "नए व्यक्ति से मिलते समय 'Enchanté' कहकर हाथ मिलाएँ।"},
            "grammar": {
                "title": {"en": "Introducing Name (Je m'appelle...)", "te": "నా పేరు...", "hi": "मेरा नाम..."},
                "explanation": {"en": "'Je m'appelle [Name]' means 'My name is [Name]'.", "te": "నా పేరు చెప్పడానికి Je m'appelle వాడతారు.", "hi": "नाम बताने के लिए Je m'appelle का प्रयोग करें।"},
                "ruleSummary": {"en": "Je m'appelle [Name]. Enchanté(e).", "te": "నా పేరు [పేరు].", "hi": "मेरा नाम [नाम] है।"},
                "examples": [{"target": "Je m'appelle Sophie, et vous?", "transliteration": "Je m'appelle Sophie, et vous?", "native": {"en": "My name is Sophie, and you?", "te": "నా పేరు సోఫీ, మరి మీ పేరు?", "hi": "मेरा नाम सोफी है, और आपका?"}}],
                "commonMistakes": [{"incorrect": "Mon nom est Rahul", "correct": "Je m'appelle Rahul", "explanation": {"en": "'Je m'appelle' is much more natural.", "te": "ఫ్రెంచ్‌లో Je m'appelle అనడం అత్యంత సహజం.", "hi": "हमेशा Je m'appelle कहें।"}}]
            },
            "vocab": [
                {"word": "Je m'appelle", "translit": "Zhe mapel", "pron": "ఝో మా-పెల్", "pos": "phrase", "meanings": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "exTarget": "Je m'appelle Pierre.", "exTranslit": "Je m'appelle Pierre.", "exNative": {"en": "My name is Pierre.", "te": "నా పేరు పియెర్.", "hi": "मेरा नाम पियरे है।"}},
                {"word": "Enchanté", "translit": "Onshante", "pron": "ఆన్-షాన్-తే", "pos": "phrase", "meanings": {"en": "Nice to meet you", "te": "మిమ్మల్ని కలవడం సంతోషం", "hi": "आपसे मिलकर खुशी हुई"}, "exTarget": "Enchanté de faire votre connaissance.", "exTranslit": "Enchante de faire votre connaissance.", "exNative": {"en": "Pleasure meeting you.", "te": "మిమ్మల్ని కలవడం ఆనందంగా ఉంది.", "hi": "आपसे मिलकर बहुत प्रसन्नता हुई।"}},
                {"word": "Je viens de", "translit": "Zhe vye de", "pron": "ఝో వియాన్ దో", "pos": "phrase", "meanings": {"en": "I come from", "te": "నేను ... నుంచి వచ్చాను", "hi": "मैं ... से हूँ"}, "exTarget": "Je viens de l'Inde.", "exTranslit": "Je viens de l'Inde.", "exNative": {"en": "I come from India.", "te": "నేను భారతదేశం నుంచి వచ్చాను.", "hi": "मैं भारत से आया हूँ।"}},
                {"word": "Ami", "translit": "Ami", "pron": "ఆ-మీ", "pos": "noun", "meanings": {"en": "Friend", "te": "స్నేహితుడు / మిత్రుడు", "hi": "दोस्त / मित्र"}, "exTarget": "C'est mon ami.", "exTranslit": "C'est mon ami.", "exNative": {"en": "He is my friend.", "te": "అతను నా స్నేహితుడు.", "hi": "यह मेरा दोस्त है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'My name is' in French?", "te": "'నా పేరు...' అని ఫ్రెంచ్‌లో ఎలా అంటారు?", "hi": "फ्रेंच में 'मेरा नाम... है' कैसे कहेंगे?"}, "prompt": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "correct": "Je m'appelle", "options": ["Je m'appelle", "Je viens de", "Enchanté", "Bonjour"], "expl": {"en": "'Je m'appelle' is standard French.", "te": "పేరు చెప్పడానికి Je m'appelle వాడతారు.", "hi": "नाम बताने के लिए Je m'appelle का प्रयोग करें।"}}
            ]
        }
    ],
    # MODULE 2: Real-World Shopping & Numbers
    [
        {
            "title": {"en": "Numbers & Asking Prices", "te": "సంఖ్యలు & ధరలు అడగడం", "hi": "संख्याएँ और दाम पूछना"},
            "objective": {"en": "Ask 'C'est combien?' and understand euro prices in Parisian markets.", "te": "'దీని ఖరీదు ఎంత?' అని అడగడం మరియు యూరో ధరలు అర్థం చేసుకోవడం.", "hi": "'यह कितने का है?' पूछना और कीमतें समझना।"},
            "culturalTip": {"en": "Always greet market stall owners with 'Bonjour Madame/Monsieur' before touching produce.", "te": "ఫ్రాన్స్ లో మార్కెట్ స్టాల్ వద్ద వస్తువులు తాకే ముందు నమస్కరించాలి.", "hi": "दुकानदार से बात शुरू करने से पहले 'Bonjour' कहें।"},
            "grammar": {
                "title": {"en": "Asking Cost (C'est combien?)", "te": "ధర అడగడం", "hi": "दाम पूछना"},
                "explanation": {"en": "Point to an item and say 'C'est combien, s'il vous plaît?'.", "te": "వస్తువును చూపిస్తూ 'C'est combien, s'il vous plaît?' అనాలి.", "hi": "वस्तु की ओर देखकर 'C'est combien, s'il vous plaît?' पूछें।"},
                "ruleSummary": {"en": "C'est combien? = How much is it?", "te": "దీని ఖరీదు ఎంత?", "hi": "यह कितने का है?"},
                "examples": [{"target": "C'est combien le kilo?", "transliteration": "C'est combien le kilo?", "native": {"en": "How much is a kilo?", "te": "కిలో ఎంత ధర?", "hi": "एक किलो कितने का है?"}}],
                "commonMistakes": [{"incorrect": "Combien argent?", "correct": "C'est combien?", "explanation": {"en": "Use 'C'est combien?'.", "te": "ధర అడగడానికి C'est combien వాడాలి.", "hi": "हमेशा C'est combien कहें।"}}]
            },
            "vocab": [
                {"word": "C'est combien?", "translit": "Se kombya?", "pron": "సే కోమ్-బియాన్?", "pos": "phrase", "meanings": {"en": "How much is it?", "te": "దీని ఖరీదు ఎంత?", "hi": "यह कितने का है?"}, "exTarget": "C'est combien, s'il vous plaît?", "exTranslit": "C'est combien, s'il vous plait?", "exNative": {"en": "How much is it, please?", "te": "దీని ధర ఎంత, దయచేసి?", "hi": "कृपया बताइए यह कितने का है?"}},
                {"word": "Euro", "translit": "Öro", "pron": "ఎవ్-రో", "pos": "noun", "meanings": {"en": "Euro (currency)", "te": "యూరో (కరెన్సీ)", "hi": "यूरो"}, "exTarget": "Ça fait cinq euros.", "exTranslit": "Ca fait cinq euros.", "exNative": {"en": "That is 5 euros.", "te": "ఇది 5 యూరోలు.", "hi": "यह 5 यूरो हुआ।"}},
                {"word": "Cher", "translit": "Sher", "pron": "షేర్", "pos": "adjective", "meanings": {"en": "Expensive", "te": "ఖరీదైనది", "hi": "महँगा"}, "exTarget": "C'est un peu cher.", "exTranslit": "C'est un peu cher.", "exNative": {"en": "It is a bit expensive.", "te": "ఇది కాస్త ఖరీదైనది.", "hi": "यह थोड़ा महँगा है।"}},
                {"word": "Pas cher", "translit": "Pa sher", "pron": "పా షేర్", "pos": "adjective", "meanings": {"en": "Inexpensive / cheap", "te": "చవకైనది", "hi": "सस्ता"}, "exTarget": "Ce n'est pas cher.", "exTranslit": "Ce n'est pas cher.", "exNative": {"en": "It is not expensive.", "te": "ఇది అంత ఖరీదు కాదు.", "hi": "यह महँगा नहीं है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the French question for 'How much is it?'.", "te": "'దీని ఖరీదు ఎంత?' కి ఫ్రెంచ్ వాక్యం ఏది?", "hi": "'यह कितने का है?' के लिए सही वाक्य चुनें।"}, "prompt": {"en": "How much is it?", "te": "దీని ఖరీదు ఎంత?", "hi": "यह कितने का है?"}, "correct": "C'est combien?", "options": ["C'est combien?", "Où est la gare?", "Comment vous appelez-vous?", "Merci"], "expl": {"en": "C'est combien? is the essential shopping phrase.", "te": "ధర అడిగే ముఖ్యమైన ప్రశ్న ఇది.", "hi": "दाम पूछने का मुख्य वाक्य यही है।"}}
            ]
        },
        {
            "title": {"en": "Paying by Card, Cash & Receipt", "te": "కార్డు, నగదు చెల్లింపు & రసీదు", "hi": "कार्ड, नकद और रसीद"},
            "objective": {"en": "Ask 'Par carte, c'est possible?', ask for cash, and request a receipt.", "te": "కార్డుతో చెల్లించవచ్చా అని అడగడం మరియు రసీదు తీసుకోవడం.", "hi": "कार्ड से भुगतान और रसीद मांगना सीखें।"},
            "culturalTip": {"en": "Contactless card payment ('sans contact') is accepted everywhere in France for any amount.", "te": "ఫ్రాన్స్ లో కాంటాక్ట్‌లెస్ కార్డు పేమెంట్ విస్తృతంగా వాడుతారు.", "hi": "फ्रांस में कॉन्टैक्टलेस कार्ड भुगतान हर जगह स्वीकार्य है।"},
            "grammar": {
                "title": {"en": "Means of Payment (Par carte / En espèces)", "te": "చెల్లింపు పద్ధతులు", "hi": "भुगतान का माध्यम"},
                "explanation": {"en": "Say 'Par carte' (by card) or 'En espèces' (in cash).", "te": "కార్డు అయితే 'Par carte', నగదు అయితే 'En espèces' అనాలి.", "hi": "कार्ड के लिए 'Par carte' और नकद के लिए 'En espèces' कहें।"},
                "ruleSummary": {"en": "Par carte = By card; En espèces = In cash.", "te": "కార్డు ద్వారా / నగదు ద్వారా.", "hi": "कार्ड से / नकद से।"},
                "examples": [{"target": "Je peux payer par carte?", "transliteration": "Je peux payer par carte?", "native": {"en": "Can I pay by card?", "te": "నేను కార్డు ద్వారా చెల్లించవచ్చా?", "hi": "क्या मैं कार्ड से भुगतान कर सकता हूँ?"}}],
                "commonMistakes": [{"incorrect": "Payer carte moi", "correct": "Par carte, s'il vous plaît", "explanation": {"en": "Say 'Par carte, s'il vous plaît'.", "te": "స్పష్టంగా Par carte అనాలి.", "hi": "हमेशा Par carte बोलें।"}}]
            },
            "vocab": [
                {"word": "Par carte", "translit": "Par kart", "pron": "పార్ కార్త్", "pos": "phrase", "meanings": {"en": "By card", "te": "కార్డు ద్వారా", "hi": "कार्ड से"}, "exTarget": "Par carte, s'il vous plaît.", "exTranslit": "Par carte, s'il vous plait.", "exNative": {"en": "By card, please.", "te": "కార్డు ద్వారా చెల్లిస్తాను.", "hi": "कार्ड से, कृपया।"}},
                {"word": "En espèces", "translit": "On espes", "pron": "ఆన్ ఎస్-పెస్", "pos": "phrase", "meanings": {"en": "In cash", "te": "నగదు ద్వారా", "hi": "नकद में"}, "exTarget": "Je paie en espèces.", "exTranslit": "Je paie en especes.", "exNative": {"en": "I pay in cash.", "te": "నేను నగదు చెల్లిస్తాను.", "hi": "मैं नकद देता हूँ।"}},
                {"word": "Le ticket", "translit": "Le tike", "pron": "లో తి-కే", "pos": "noun", "meanings": {"en": "Receipt / ticket", "te": "రసీదు / టికెట్", "hi": "रसीद / टिकट"}, "exTarget": "Le ticket, s'il vous plaît.", "exTranslit": "Le ticket, s'il vous plait.", "exNative": {"en": "The receipt, please.", "te": "రసీదు ఇవ్వండి, దయచేసి.", "hi": "कृपया रसीद दीजिए।"}},
                {"word": "Un sac", "translit": "Un sak", "pron": "అన్ సాక్", "pos": "noun", "meanings": {"en": "A shopping bag", "te": "సంచి / బ్యాగ్", "hi": "थैली / बैग"}, "exTarget": "Vous désirez un sac?", "exTranslit": "Vous desirez un sac?", "exNative": {"en": "Would you like a bag?", "te": "మీకు సంచి కావాలా?", "hi": "क्या आपको थैली चाहिए?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'By card, please' in French?", "te": "'కార్డు ద్వారా, దయచేసి' అని ఎలా అంటారు?", "hi": "फ्रेंच में 'कार्ड से, कृपया' कैसे कहेंगे?"}, "prompt": {"en": "By card, please.", "te": "కార్డు ద్వారా, దయచేసి.", "hi": "कार्ड से, कृपया।"}, "correct": "Par carte, s'il vous plaît", "options": ["Par carte, s'il vous plaît", "C'est combien?", "Où est la gare?", "Merci"], "expl": {"en": "Par carte, s'il vous plaît is standard payment speech.", "te": "కార్డు చెల్లింపుకు వాడే స్పష్టమైన మాట.", "hi": "कार्ड भुगतान का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Boulangerie & Daily Grocery", "te": "బేకరీ & నిత్యావసర కొనుగోళ్లు", "hi": "बेकरी और किराने का सामान"},
            "objective": {"en": "Order bread at a French boulangerie ('Une baguette, s'il vous plaît') and ask for water.", "te": "బాగెట్ రొట్టె మరియు నీళ్లు ఆర్డర్ చేయడం నేర్చుకోండి.", "hi": "ब्रेड और पानी मांगना सीखें।"},
            "culturalTip": {"en": "The baguette is a UNESCO cultural heritage item in France; always buy it fresh at the boulangerie.", "te": "ఫ్రాన్స్ లో ప్రతిరోజూ బేకరీ నుంచి తాజాగా బాగెట్ బ్రెడ్ కొంటారు.", "hi": "फ्रांस में रोज़ाना ताज़ा बैगूएट ब्रेड खरीदी जाती है।"},
            "grammar": {
                "title": {"en": "Gender Articles (Un vs Une)", "te": "లింగ ప్రత్యయాలు (Un vs Une)", "hi": "पुल्लिंग व स्त्रीलिंग (Un बनाम Une)"},
                "explanation": {"en": "'Un' is masculine (un café, un croissant); 'Une' is feminine (une baguette, une bouteille).", "te": "పుల్లింగ వస్తువులకు Un, స్త్రీలింగ వస్తువులకు Une వాడతారు.", "hi": "पुल्लिंग के लिए Un और स्त्रीलिंग के लिए Une लगाएं।"},
                "ruleSummary": {"en": "Un + Masc Noun; Une + Fem Noun.", "te": "Un / Une + వస్తువు.", "hi": "Un / Une + वस्तु।"},
                "examples": [{"target": "Une baguette bien cuite, s'il vous plaît", "transliteration": "Une baguette bien cuite, s'il vous plait", "native": {"en": "One well-baked baguette, please.", "te": "ఒక బాగెట్ బ్రెడ్ ఇవ్వండి, దయచేసి.", "hi": "एक बैगूएट ब्रेड, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Un baguette", "correct": "Une baguette", "explanation": {"en": "Baguette is feminine, use 'une'.", "te": "బాగెట్ కు 'une' వాడాలి.", "hi": "बैगूएट के लिए 'une' लगाएं।"}}]
            },
            "vocab": [
                {"word": "De l'eau", "translit": "De lo", "pron": "దో లో", "pos": "noun", "meanings": {"en": "Water", "te": "నీళ్లు", "hi": "पानी"}, "exTarget": "Une bouteille d'eau, s'il vous plaît.", "exTranslit": "Une bouteille d'eau, s'il vous plait.", "exNative": {"en": "A bottle of water, please.", "te": "ఒక వాటర్ బాటిల్ ఇవ్వండి.", "hi": "एक बोतल पानी, कृपया।"}},
                {"word": "Une baguette", "translit": "Un baget", "pron": "ఊన్ బా-గెత్", "pos": "noun", "meanings": {"en": "A French baguette bread", "te": "బాగెట్ రొట్టె", "hi": "बैगूएट ब्रेड"}, "exTarget": "Une baguette, s'il vous plaît.", "exTranslit": "Une baguette, s'il vous plait.", "exNative": {"en": "One baguette, please.", "te": "ఒక బాగెట్ ఇవ్వండి.", "hi": "एक बैगूएट दीजिए।"}},
                {"word": "Un", "translit": "Un", "pron": "అన్", "pos": "number", "meanings": {"en": "One", "te": "ఒకటి", "hi": "एक"}, "exTarget": "Un seul, merci.", "exTranslit": "Un seul, merci.", "exNative": {"en": "Only one, thanks.", "te": "ఒక్కటి చాలు, ధన్యవాదాలు.", "hi": "केवल एक, धन्यवाद।"}},
                {"word": "Deux", "translit": "Dö", "pron": "దో", "pos": "number", "meanings": {"en": "Two", "te": "రెండు", "hi": "दो"}, "exTarget": "Deux baguettes, s'il vous plaît.", "exTranslit": "Deux baguettes, s'il vous plait.", "exNative": {"en": "Two baguettes, please.", "te": "రెండు బాగెట్లు ఇవ్వండి.", "hi": "दो बैगूएट दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Order a baguette in a French bakery.", "te": "ఫ్రెంచ్ బేకరీలో బాగెట్ ఆర్డర్ చేసే వాక్యాన్ని ఎంచుకోండి.", "hi": "बेकरी में बैगूएट ऑर्डर करने वाला वाक्य चुनें।"}, "prompt": {"en": "One baguette, please.", "te": "ఒక బాగెట్ ఇవ్వండి, దయచేసి.", "hi": "एक बैगूएट, कृपया।"}, "correct": "Une baguette, s'il vous plaît", "options": ["Une baguette, s'il vous plaît", "C'est combien?", "Au revoir", "Merci"], "expl": {"en": "Une baguette, s'il vous plaît is the quintessential bakery phrase.", "te": "బేకరీలో ఆర్డర్ చేసే ప్రామాణిక వాక్యం.", "hi": "बेकरी का मुख्य वाक्य यही है।"}}
            ]
        }
    ],
    # MODULE 3: Cafés, Street Food & Restaurants
    [
        {
            "title": {"en": "At the Parisian Café", "te": "పారిస్ కేఫ్‌లో కాఫీ ఆర్డర్ చేయడం", "hi": "पेरिस के कैफ़े में कॉफ़ी"},
            "objective": {"en": "Order un café, café crème, and ask for terrace or takeaway.", "te": "ఎస్ప్రెస్సో లేదా కాఫీ విత్ మిల్క్ ఆర్డర్ చేయడం నేర్చుకోండి.", "hi": "कॉफ़ी मंगाना और टेरेस पर बैठना सीखें।"},
            "culturalTip": {"en": "Ordering 'un café' in France gets you an espresso; if you want milk, ask for 'un café crème'.", "te": "ఫ్రాన్స్ లో 'un café' అంటే ఎస్ప్రెస్సో; పాలు కావాలంటే 'un café crème' అనాలి.", "hi": "फ्रांस में 'un café' का मतलब एस्प्रेसो होता है; दूध वाली कॉफ़ी के लिए 'un café crème' कहें।"},
            "grammar": {
                "title": {"en": "Ordering with 'Je voudrais...'", "te": "నాకు ఇది కావాలి (Je voudrais...)", "hi": "मुझे चाहिए (Je voudrais...)"},
                "explanation": {"en": "'Je voudrais [Item], s'il vous plaît' (I would like [Item], please) is the polite standard.", "te": "మర్యాదగా ఆర్డర్ చేయడానికి 'Je voudrais...' వాడతారు.", "hi": "विनम्रता से ऑर्डर के लिए 'Je voudrais...' का प्रयोग करें।"},
                "ruleSummary": {"en": "Je voudrais + [Noun] + s'il vous plaît.", "te": "నాకు [వస్తువు] కావాలి, దయచేసి.", "hi": "मुझे [वस्तु] चाहिए, कृपया।"},
                "examples": [{"target": "Je voudrais un café crème, s'il vous plaît", "transliteration": "Je voudrais un cafe creme, s'il vous plait", "native": {"en": "I would like a coffee with milk, please.", "te": "నాకు కాఫీ విత్ మిల్క్ ఇవ్వండి, దయచేసి.", "hi": "मुझे दूध वाली कॉफ़ी चाहिए, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Je veux café", "correct": "Je voudrais un café, s'il vous plaît", "explanation": {"en": "Avoid blunt 'Je veux'; use polite 'Je voudrais'.", "te": "ఎప్పుడూ Je voudrais అనాలి.", "hi": "हमेशा Je voudrais कहें।"}}]
            },
            "vocab": [
                {"word": "Un café", "translit": "Un kafe", "pron": "అన్ కా-ఫే", "pos": "noun", "meanings": {"en": "An espresso coffee", "te": "ఎస్ప్రెస్సో కాఫీ", "hi": "एस्प्रेसो कॉफ़ी"}, "exTarget": "Un café, s'il vous plaît.", "exTranslit": "Un cafe, s'il vous plait.", "exNative": {"en": "A coffee, please.", "te": "ఒక కాఫీ ఇవ్వండి, దయచేసి.", "hi": "एक कॉफ़ी, कृपया।"}},
                {"word": "Café crème", "translit": "Kafe krem", "pron": "కా-ఫే క్రెమ్", "pos": "noun", "meanings": {"en": "Coffee with milk", "te": "పాల కాఫీ", "hi": "दूध वाली कॉफ़ी"}, "exTarget": "Un café crème et un croissant.", "exTranslit": "Un cafe creme et un croissant.", "exNative": {"en": "Coffee with milk and a croissant.", "te": "పాల కాఫీ మరియు క్రోసెంట్.", "hi": "दूध वाली कॉफ़ी और क्रोइसैंट।"}},
                {"word": "À emporter", "translit": "A omporte", "pron": "ఆ ఓమ్-పోర్-తే", "pos": "phrase", "meanings": {"en": "Takeout / to-go", "te": "పార్శిల్ / టేక్‌అవే", "hi": "पैक / टेकअवे"}, "exTarget": "C'est à emporter.", "exTranslit": "C'est a emporter.", "exNative": {"en": "It's to-go.", "te": "ఇది పార్శిల్ తీసుకెళ్తాను.", "hi": "यह पैक करके ले जाना है।"}},
                {"word": "Sans sucre", "translit": "San syukr", "pron": "సాన్ సూ-క్రు", "pos": "phrase", "meanings": {"en": "Without sugar", "te": "చక్కెర లేకుండా", "hi": "बिना चीनी के"}, "exTarget": "Sans sucre, s'il vous plaît.", "exTranslit": "Sans sucre, s'il vous plait.", "exNative": {"en": "Without sugar, please.", "te": "చక్కెర లేకుండా ఇవ్వండి.", "hi": "बिना चीनी के, कृपया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you politely order an espresso in Paris?", "te": "పారిస్ కేఫ్‌లో ఎస్ప్రెస్సో ఎలా ఆర్డర్ చేస్తారు?", "hi": "पेरिस के कैफ़े में कॉफ़ी कैसे मंगाएंगे?"}, "prompt": {"en": "A coffee, please.", "te": "ఒక కాఫీ ఇవ్వండి, దయచేసి.", "hi": "एक कॉफ़ी, कृपया।"}, "correct": "Un café, s'il vous plaît", "options": ["Un café, s'il vous plaît", "C'est combien?", "Au revoir", "De rien"], "expl": {"en": "Un café, s'il vous plaît is the authentic order.", "te": "ప్రామాణికమైన ఫ్రెంచ్ కేఫ్ ఆర్డర్.", "hi": "प्रामाणिक फ्रेंच कैफ़े ऑर्डर।"}}
            ]
        },
        {
            "title": {"en": "Bistro Dining & Popular Dishes", "te": "ఫ్రెంచ్ బిస్ట్రో భోజనం", "hi": "बिस्ट्रो में भोजन"},
            "objective": {"en": "Request a table for two, ask for the menu (la carte), and compliment the meal.", "te": "ఇద్దరికి టేబుల్ అడగడం మరియు మెనూ కార్డు చూడడం.", "hi": "दो लोगों के लिए टेबल और मेन्यू मांगना सीखें।"},
            "culturalTip": {"en": "Tap water in a carafe ('une carafe d'eau') and bread ('le pain') are complimentary in all French restaurants by law.", "te": "ఫ్రాన్స్ లో కారఫే మంచినీళ్లు మరియు బ్రెడ్ రెస్టారెంట్లలో ఉచితం.", "hi": "फ्रांस के रेस्तरां में पानी और ब्रेड मुफ़्त मिलते हैं।"},
            "grammar": {
                "title": {"en": "Table Request (Une table pour...)", "te": "టేబుల్ అడగడం", "hi": "टेबल मांगना"},
                "explanation": {"en": "Say 'Une table pour deux, s'il vous plaît' upon entering.", "te": "లోపలికి వెళ్లగానే 'Une table pour deux, s'il vous plaît' అనాలి.", "hi": "प्रवेश करते ही 'Une table pour deux, s'il vous plaît' कहें।"},
                "ruleSummary": {"en": "Une table pour [Number] = A table for [Number].", "te": "ఇద్దరికి టేబుల్.", "hi": "दो लोगों के लिए टेबल।"},
                "examples": [{"target": "Une table pour deux personnes, s'il vous plaît", "transliteration": "Une table pour deux personnes, s'il vous plait", "native": {"en": "A table for two persons, please.", "te": "ఇద్దరికి టేబుల్ ఇవ్వండి, దయచేసి.", "hi": "दो लोगों के लिए एक टेबल, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Je veux table", "correct": "Une table pour deux, s'il vous plaît", "explanation": {"en": "Always polite phrasing.", "te": "మర్యాదగా అడగాలి.", "hi": "विनम्रता से कहें।"}}]
            },
            "vocab": [
                {"word": "Une table", "translit": "Un tabl", "pron": "ఊన్ తా-బ్ల్", "pos": "noun", "meanings": {"en": "A table", "te": "ఒక టేబుల్ / బల్ల", "hi": "एक टेबल"}, "exTarget": "Une table pour deux, s'il vous plaît.", "exTranslit": "Une table pour deux, s'il vous plait.", "exNative": {"en": "A table for two, please.", "te": "ఇద్దరికి టేబుల్ ఇవ్వండి.", "hi": "दो लोगों के लिए टेबल दीजिए।"}},
                {"word": "La carte", "translit": "La kart", "pron": "లా కార్త్", "pos": "noun", "meanings": {"en": "The menu", "te": "మెనూ కార్డు", "hi": "मेन्यू कार्ड"}, "exTarget": "La carte, s'il vous plaît.", "exTranslit": "La carte, s'il vous plait.", "exNative": {"en": "The menu, please.", "te": "మెనూ కార్డు ఇవ్వండి.", "hi": "कृपया मेन्यू दिखाइए।"}},
                {"word": "Délicieux", "translit": "Delisye", "pron": "దే-లి-సి-యో", "pos": "adjective", "meanings": {"en": "Delicious", "te": "చాలా రుచికరమైనది", "hi": "बहुत स्वादिष्ट"}, "exTarget": "C'est délicieux!", "exTranslit": "C'est delicieux!", "exNative": {"en": "It is delicious!", "te": "ఇది చాలా రుచిగా ఉంది!", "hi": "यह बहुत स्वादिष्ट है!"}},
                {"word": "Carafe d'eau", "translit": "Karaf do", "pron": "కా-రాఫ్ దో", "pos": "noun", "meanings": {"en": "Pitcher of tap water (free)", "te": "మంచినీళ్ల జగ్గు (ఉచితం)", "hi": "पानी का जग (मुफ़्त)"}, "exTarget": "Une carafe d'eau, s'il vous plaît.", "exTranslit": "Une carafe d'eau, s'il vous plait.", "exNative": {"en": "A pitcher of water, please.", "te": "మంచినీళ్ల జగ్గు ఇవ్వండి.", "hi": "एक जग पानी दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you request a table for two in a French bistro?", "te": "ఫ్రెంచ్ బిస్ట్రోలో ఇద్దరికి టేబుల్ ఎలా అడుగుతారు?", "hi": "फ्रेंच बिस्ट्रो में दो के लिए टेबल कैसे मांगेंगे?"}, "prompt": {"en": "A table for two, please.", "te": "ఇద్దరికి టేబుల్ ఇవ్వండి, దయచేసి.", "hi": "दो के लिए टेबल, कृपया।"}, "correct": "Une table pour deux, s'il vous plaît", "options": ["Une table pour deux, s'il vous plaît", "Un café s'il vous plaît", "C'est combien?", "Merci"], "expl": {"en": "Une table pour deux, s'il vous plaît is standard.", "te": "టేబుల్ అడిగే సరైన ఫ్రెంచ్ వాక్యం.", "hi": "टेबल मांगने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Dietary Needs & The Bill (L'addition)", "te": "ఆహార అలవాట్లు & బిల్లు చెల్లించడం", "hi": "शाकाहारी और बिल चुकाना"},
            "objective": {"en": "Ask for the bill ('L'addition, s'il vous plaît') and communicate vegetarian needs.", "te": "బిల్లు అడగడం మరియు శాకాహారం కావాలని చెప్పడం.", "hi": "बिल मांगना और शाकाहारी भोजन बताना सीखें।"},
            "culturalTip": {"en": "In France, servers will never bring the bill until you explicitly ask 'L'addition, s'il vous plaît'.", "te": "ఫ్రాన్స్ లో మీరు అడిగేంత వరకు బిల్లు టేబుల్ వద్దకు తీసుకురారు.", "hi": "फ्रांस में जब तक आप न मांगें, वेटर बिल नहीं लाते।"},
            "grammar": {
                "title": {"en": "Asking for the Bill (L'addition, s'il vous plaît)", "te": "బిల్లు అడగడం", "hi": "बिल मांगना"},
                "explanation": {"en": "Simply catch your server's eye and say 'L'addition, s'il vous plaît'.", "te": "'L'addition, s'il vous plaît' అంటే బిల్లు ఇవ్వండి అని అర్థం.", "hi": "'L'addition, s'il vous plaît' कहकर बिल मांगें।"},
                "ruleSummary": {"en": "L'addition, s'il vous plaît = The bill, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"},
                "examples": [{"target": "L'addition pour la table quatre, s'il vous plaît", "transliteration": "L'addition pour la table quatre, s'il vous plait", "native": {"en": "The check for table four, please.", "te": "నాలుగో నంబర్ టేబుల్ బిల్లు ఇవ్వండి.", "hi": "टेबल नंबर चार का बिल, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Donne moi facture", "correct": "L'addition, s'il vous plaît", "explanation": {"en": "Use 'L'addition' in restaurants.", "te": "రెస్టారెంట్లలో L'addition అనాలి.", "hi": "रेस्तरां में L'addition कहें।"}}]
            },
            "vocab": [
                {"word": "L'addition", "translit": "Ladisyon", "pron": "ల్యా-ది-సి-యోన్", "pos": "noun", "meanings": {"en": "The bill / check", "te": "బిల్లు / లెక్క", "hi": "बिल / चेक"}, "exTarget": "L'addition, s'il vous plaît.", "exTranslit": "L'addition, s'il vous plait.", "exNative": {"en": "The bill, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"}},
                {"word": "Végétarien", "translit": "Vehetarye", "pron": "వె-జె-తా-రి-యాన్", "pos": "adjective", "meanings": {"en": "Vegetarian", "te": "శాకాహారం / శాకాహారి", "hi": "शाकाहारी"}, "exTarget": "Je suis végétarien.", "exTranslit": "Je suis vegetarien.", "exNative": {"en": "I am vegetarian.", "te": "నేను శాకాహారిని.", "hi": "मैं शाकाहारी हूँ।"}},
                {"word": "Épicé", "translit": "Epise", "pron": "ఎ-పి-సే", "pos": "adjective", "meanings": {"en": "Spicy", "te": "కారంగా / ఘాటుగా", "hi": "तीखा"}, "exTarget": "Pas trop épicé, s'il vous plaît.", "exTranslit": "Pas trop epice, s'il vous plait.", "exNative": {"en": "Not too spicy, please.", "te": "కారం తక్కువగా చేయండి.", "hi": "ज़्यादा तीखा मत बनाइए, कृपया।"}},
                {"word": "Viande", "translit": "Vyond", "pron": "వి-యాంద్", "pos": "noun", "meanings": {"en": "Meat", "te": "మాంసం", "hi": "मांस"}, "exTarget": "Sans viande, s'il vous plaît.", "exTranslit": "Sans viande, s'il vous plait.", "exNative": {"en": "Without meat, please.", "te": "మాంసం లేకుండా చేయండి.", "hi": "कृपया बिना मांस के बनाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the bill in a French restaurant?", "te": "ఫ్రెంచ్ రెస్టారెంట్‌లో 'బిల్లు ఇవ్వండి' అని ఎలా అంటారు?", "hi": "फ्रेंच रेस्तरां में बिल कैसे मांगेंगे?"}, "prompt": {"en": "The bill, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"}, "correct": "L'addition, s'il vous plaît", "options": ["L'addition, s'il vous plaît", "La carte s'il vous plaît", "Bonjour", "Merci"], "expl": {"en": "L'addition, s'il vous plaît is standard.", "te": "బిల్లు అడిగే ఖచ్చితమైన ఫ్రెంచ్ వాక్యం.", "hi": "बिल मांगने का सही वाक्य।"}}
            ]
        }
    ],
    # MODULE 4: Real-Life Transit & Navigation
    [
        {
            "title": {"en": "Where is the Restroom? (Navigation)", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది? (దిశలు)", "hi": "शौचालय कहाँ है? (रास्ता पूछना)"},
            "objective": {"en": "Ask 'Où sont les toilettes?' and understand left, right, and straight.", "te": "బాత్‌రూమ్ ఎక్కడుందో అడగడం, ఎడమ, కుడి మరియు తిన్నగా వెళ్లడం అర్థం చేసుకోవడం.", "hi": "शौचालय पूछना, बाएँ, दाएँ और सीधे जाना समझना।"},
            "culturalTip": {"en": "In French, 'les toilettes' is always plural. In public places, look for 'WC'.", "te": "ఫ్రెంచ్‌లో టాయిలెట్‌ను ఎప్పుడూ బహువచనం 'les toilettes' అంటారు.", "hi": "फ्रेंच में शौचालय हमेशा बहुवचन 'les toilettes' होता है।"},
            "grammar": {
                "title": {"en": "Asking Locations (Où est... / Où sont...)", "te": "ఎక్కడ ఉంది? (Où est...)", "hi": "कहाँ है? (Où est...)"},
                "explanation": {"en": "Use 'Où est [Singular]?' and 'Où sont [Plural]?'.", "te": "ఏకవచనానికి Où est, బహువచనానికి Où sont వాడతారు.", "hi": "एकवचन के लिए Où est और बहुवचन के लिए Où sont लगाएं।"},
                "ruleSummary": {"en": "Où sont les toilettes? = Where are the restrooms?", "te": "బాత్‌రూమ్‌లు ఎక్కడ ఉన్నాయి?", "hi": "शौचालय कहाँ हैं?"},
                "examples": [{"target": "Où est la station de métro?", "transliteration": "Ou est la station de metro?", "native": {"en": "Where is the metro station?", "te": "మెట్రో స్టేషన్ ఎక్కడ ఉంది?", "hi": "मेट्रो स्टेशन कहाँ है?"}}],
                "commonMistakes": [{"incorrect": "Où est les toilettes?", "correct": "Où sont les toilettes?", "explanation": {"en": "Toilettes is plural, use 'sont'.", "te": "Toilettes కు sont వాడాలి.", "hi": "Toilettes के लिए sont लगाएं।"}}]
            },
            "vocab": [
                {"word": "Les toilettes", "translit": "Le twalet", "pron": "లే త్వా-లెత్", "pos": "noun", "meanings": {"en": "Restroom / toilets", "te": "బాత్‌రూమ్ / శౌచాలయం", "hi": "शौचालय / बाथरूम"}, "exTarget": "Où sont les toilettes, s'il vous plaît?", "exTranslit": "Ou sont les toilettes, s'il vous plait?", "exNative": {"en": "Where are the restrooms, please?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది, దయచేసి?", "hi": "कृपया बताइए शौचालय कहाँ है?"}},
                {"word": "À gauche", "translit": "A gosh", "pron": "ఆ గోష్", "pos": "noun", "meanings": {"en": "To the left", "te": "ఎడమ వైపునకు", "hi": "बाईं ओर"}, "exTarget": "Tournez à gauche.", "exTranslit": "Tournez a gauche.", "exNative": {"en": "Turn to the left.", "te": "ఎడమ వైపునకు తిరగండి.", "hi": "बाईं तरफ मुड़िए।"}},
                {"word": "À droite", "translit": "A drwat", "pron": "ఆ ద్రు-వాత్", "pos": "noun", "meanings": {"en": "To the right", "te": "కుడి వైపునకు", "hi": "दाईं ओर"}, "exTarget": "C'est à droite.", "exTranslit": "C'est a droite.", "exNative": {"en": "It is on the right.", "te": "అది కుడివైపున ఉంది.", "hi": "यह दाईं तरफ है।"}},
                {"word": "Tout droit", "translit": "Too drwa", "pron": "తూ ద్రు-వా", "pos": "phrase", "meanings": {"en": "Straight ahead", "te": "తిన్నగా / నేరుగా", "hi": "सीधे आगे"}, "exTarget": "Continuez tout droit.", "exTranslit": "Continuez tout droit.", "exNative": {"en": "Continue straight ahead.", "te": "ముందుకు నేరుగా వెళ్లండి.", "hi": "सीधे आगे जाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Where is the restroom?' in French?", "te": "'బాత్‌రూమ్ ఎక్కడ ఉంది?' అని ఫ్రెంచ్‌లో ఎలా అడుగుతారు?", "hi": "फ्रेंच में 'शौचालय कहाँ है?' कैसे पूछेंगे?"}, "prompt": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}, "correct": "Où sont les toilettes?", "options": ["Où sont les toilettes?", "C'est combien?", "Bonjour", "Merci"], "expl": {"en": "Où sont les toilettes? is the vital question.", "te": "ప్రయాణాల్లో అత్యంత ముఖ్యమైన ప్రశ్న.", "hi": "यात्रा का सबसे ज़रूरी सवाल।"}}
            ]
        },
        {
            "title": {"en": "Paris Metro & Taxis", "te": "పారిస్ మెట్రో & టాక్సీ ప్రయాణం", "hi": "पेरिस मेट्रो और टैक्सी"},
            "objective": {"en": "Navigate Paris Metro stations, tell taxi drivers your stop ('Arrêtez-vous ici').", "te": "పారిస్ మెట్రో ప్రయాణం మరియు టాక్సీ డ్రైవర్‌తో మాట్లాడటం నేర్చుకోండి.", "hi": "मेट्रो में यात्रा और टैक्सी रोकने के लिए कहना सीखें।"},
            "culturalTip": {"en": "Hold onto your metro ticket until you fully exit the station; inspectors regularly check inside corridors.", "te": "పారిస్ మెట్రో నుంచి బయటకు వచ్చేంత వరకు టికెట్ జాగ్రత్తగా ఉంచుకోవాలి.", "hi": "पेरिस मेट्रो से बाहर निकलने तक टिकट संभालकर रखें।"},
            "grammar": {
                "title": {"en": "Giving Directions to Drivers (À cette adresse...)", "te": "డ్రైవర్‌కు చిరునామా చెప్పడం", "hi": "ड्राइवर को पता बताना"},
                "explanation": {"en": "Say 'À cette adresse, s'il vous plaît' (To this address, please) or 'À la gare' (To the station).", "te": "డ్రైవర్‌తో మాట్లాడేటప్పుడు 'À cette adresse, s'il vous plaît' అనాలి.", "hi": "ड्राइवर से 'À cette adresse, s'il vous plaît' कहें।"},
                "ruleSummary": {"en": "À [Destination], s'il vous plaît.", "te": "[స్థలం]కు తీసుకెళ్లండి, దయచేసి.", "hi": "[स्थान] तक, कृपया।"},
                "examples": [{"target": "À la gare du Nord, s'il vous plaît", "transliteration": "A la gare du Nord, s'il vous plait", "native": {"en": "To Gare du Nord station, please.", "te": "గార్ దు నోర్డ్ స్టేషన్‌కు తీసుకెళ్లండి.", "hi": "गारे दु नॉर्ड स्टेशन तक, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Tu vas gare", "correct": "À la gare, s'il vous plaît", "explanation": {"en": "Use the preposition 'À' with destination.", "te": "ముందు 'À' చేర్చాలి.", "hi": "गंतव्य से पहले 'À' लगाएं।"}}]
            },
            "vocab": [
                {"word": "La gare", "translit": "La gar", "pron": "లా గార్", "pos": "noun", "meanings": {"en": "Train / railway station", "te": "రైల్వే స్టేషన్", "hi": "रेलवे स्टेशन"}, "exTarget": "Où est la gare la plus proche?", "exTranslit": "Ou est la gare la plus proche?", "exNative": {"en": "Where is the nearest station?", "te": "దగ్గరలోని స్టేషన్ ఎక్కడ ఉంది?", "hi": "सबसे पास का स्टेशन कहाँ है?"}},
                {"word": "Taxi", "translit": "Taksi", "pron": "త్యాక్-సీ", "pos": "noun", "meanings": {"en": "Taxi", "te": "టాక్సీ", "hi": "टैक्सी"}, "exTarget": "Je cherche un taxi.", "exTranslit": "Je cherche un taxi.", "exNative": {"en": "I am looking for a taxi.", "te": "నేను టాక్సీ కోసం చూస్తున్నాను.", "hi": "मैं टैक्सी ढूंढ रहा हूँ।"}},
                {"word": "Arrêtez-vous ici", "translit": "Arete voo isi", "pron": "ఆ-రే-తే వూ ఈ-సీ", "pos": "phrase", "meanings": {"en": "Stop here, please", "te": "ఇక్కడ ఆపండి", "hi": "यहाँ रोक दीजिए"}, "exTarget": "Arrêtez-vous ici, s'il vous plaît.", "exTranslit": "Arretez-vous ici, s'il vous plait.", "exNative": {"en": "Stop here, please.", "te": "ఇక్కడే ఆపండి, దయచేసి.", "hi": "कृपया यहीं रोक दीजिए।"}},
                {"word": "Combien de temps?", "translit": "Kombya de ton?", "pron": "కోమ్-బియాన్ దో తోన్?", "pos": "phrase", "meanings": {"en": "How long does it take?", "te": "ఎంత సమయం పడుతుంది?", "hi": "कितना समय लगेगा?"}, "exTarget": "Combien de temps ça prend?", "exTranslit": "Combien de temps ca prend?", "exNative": {"en": "How much time does it take?", "te": "దీనికి ఎంత సమయం పడుతుంది?", "hi": "इसमें कितना समय लगता है?"}}
            ],
            "exercises": [
                {"instruction": {"en": "Tell your taxi driver 'Stop here, please' in French.", "te": "టాక్సీ డ్రైవర్‌తో 'ఇక్కడ ఆపండి' అని ఎలా అంటారు?", "hi": "टैक्सी चालक से 'यहाँ रोक दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Stop here, please.", "te": "ఇక్కడ ఆపండి, దయచేసి.", "hi": "यहाँ रोक दीजिए, कृपया।"}, "correct": "Arrêtez-vous ici, s'il vous plaît", "options": ["Arrêtez-vous ici, s'il vous plaît", "Où sont les toilettes?", "C'est combien?", "Merci"], "expl": {"en": "Arrêtez-vous ici, s'il vous plaît is polite and accurate.", "te": "ఇక్కడ ఆపండి అని చెప్పే స్పష్టమైన మాట.", "hi": "यहाँ गाड़ी रोकने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Hotel Check-In & Wi-Fi", "te": "హోటల్ చెక్-ఇన్ & రూమ్ సర్వీస్", "hi": "होटल चेक-इन और कमरा"},
            "objective": {"en": "Check in with 'J'ai une réservation', ask for Wi-Fi, and request luggage hold.", "te": "రిజర్వేషన్ చూపించడం, వైఫై పాస్‌వర్డ్ మరియు లగేజ్ భద్రపరచడం అడగడం.", "hi": "आरक्षण दिखाना, वाई-फाई पासवर्ड और सामान रखना सीखें।"},
            "culturalTip": {"en": "French hotel city tax ('taxe de séjour') is small (1-3 euros) and paid upon checkout.", "te": "ఫ్రాన్స్ హోటళ్లలో చెక్-అవుట్ సమయంలో చిన్న సిటీ ట్యాక్స్ చెల్లించాలి.", "hi": "फ्रांस के होटलों में चेक-आउट पर छोटा सा नगर कर लिया जाता है।"},
            "grammar": {
                "title": {"en": "Possession with Avoir (J'ai une réservation)", "te": "నాకు ఉంది (J'ai...)", "hi": "मेरे पास है (J'ai...)"},
                "explanation": {"en": "'J'ai une réservation au nom de [Name]' means 'I have a booking under [Name]'.", "te": "నా పేరు మీద రిజర్వేషన్ ఉంది అని చెప్పడానికి J'ai une réservation వాడతారు.", "hi": "मेरे नाम से बुकिंग है कहने के लिए J'ai une réservation का प्रयोग करें।"},
                "ruleSummary": {"en": "J'ai [Noun] = I have [Noun].", "te": "నా దగ్గర [వస్తువు] ఉంది.", "hi": "मेरे पास [वस्तु] है।"},
                "examples": [{"target": "J'ai une réservation pour deux nuits", "transliteration": "J'ai une reservation pour deux nuits", "native": {"en": "I have a reservation for two nights.", "te": "నాకు రెండు రాత్రుల బుకింగ్ ఉంది.", "hi": "मेरे पास दो रातों की बुकिंग है।"}}],
                "commonMistakes": [{"incorrect": "Je suis réservation", "correct": "J'ai une réservation", "explanation": {"en": "Use 'avoir' (to have), not 'être'.", "te": "బుకింగ్ కోసం J'ai వాడాలి.", "hi": "बुकिंग के लिए J'ai कहें।"}}]
            },
            "vocab": [
                {"word": "Réservation", "translit": "Rezervasyon", "pron": "రే-జేర్-వా-సి-యోన్", "pos": "noun", "meanings": {"en": "Reservation / booking", "te": "రిజర్వేషన్ / బుకింగ్", "hi": "आरक्षण / बुकिंग"}, "exTarget": "J'ai une réservation à mon nom.", "exTranslit": "J'ai une reservation a mon nom.", "exNative": {"en": "I have a booking in my name.", "te": "నా పేరు మీద రిజర్వేషన్ ఉంది.", "hi": "मेरे नाम से आरक्षण है।"}},
                {"word": "Mot de passe Wi-Fi", "translit": "Mo de pas Wi-Fi", "pron": "మో దో పాస్ వై-ఫై", "pos": "noun", "meanings": {"en": "Wi-Fi password", "te": "వైఫై పాస్‌వర్డ్", "hi": "वाई-फाई पासवर्ड"}, "exTarget": "Quel est le mot de passe Wi-Fi?", "exTranslit": "Quel est le mot de passe Wi-Fi?", "exNative": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}},
                {"word": "La clé", "translit": "La kle", "pron": "లా క్లే", "pos": "noun", "meanings": {"en": "The room key / keycard", "te": "గది తాళం / కీ కార్డు", "hi": "कमरे की चाबी"}, "exTarget": "Voici votre clé de chambre.", "exTranslit": "Voici votre cle de chambre.", "exNative": {"en": "Here is your room key.", "te": "ఇదిగోండి మీ గది తాళం.", "hi": "यह रही आपके कमरे की चाबी।"}},
                {"word": "Les bagages", "translit": "Le bagazh", "pron": "లే బా-గాజ్", "pos": "noun", "meanings": {"en": "Luggage / bags", "te": "సామాన్లు / లగేజ్", "hi": "सामान / बैग"}, "exTarget": "Puis-je laisser mes bagages ici?", "exTranslit": "Puis-je laisser mes bagages ici?", "exNative": {"en": "May I leave my bags here?", "te": "నా లగేజ్ ఇక్కడ ఉంచవచ్చా?", "hi": "क्या मैं सामान यहाँ रख सकता हूँ?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the Wi-Fi password in French?", "te": "'వైఫై పాస్‌వర్డ్ ఏమిటి?' అని ఫ్రెంచ్‌లో ఎలా అడుగుతారు?", "hi": "फ्रेंच में 'वाई-फाई पासवर्ड क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}, "correct": "Quel est le mot de passe Wi-Fi?", "options": ["Quel est le mot de passe Wi-Fi?", "C'est combien?", "Au revoir", "Où sont les toilettes?"], "expl": {"en": "Quel est le mot de passe Wi-Fi? is standard.", "te": "వైఫై పాస్‌వర్డ్ అడిగే సరైన మాట.", "hi": "वाई-फाई पासवर्ड पूछने का वाक्य।"}}
            ]
        }
    ],
    # MODULE 5: Social Fluency & Urgent Help
    [
        {
            "title": {"en": "Making Friends & Contact Info", "te": "స్నేహం చేయడం & నంబర్ అడగడం", "hi": "दोस्त बनाना और फोन नंबर"},
            "objective": {"en": "Ask for phone numbers/socials and invite friends for coffee.", "te": "ఫోన్ నంబర్ అడగడం మరియు కాఫీకి ఆహ్వానించడం నేర్చుకోండి.", "hi": "फोन नंबर मांगना और कॉफ़ी के लिए आमंत्रित करना।"},
            "culturalTip": {"en": "French friendships develop through stimulating conversation and shared apéritifs (apéro).", "te": "ఫ్రాన్స్ లో స్నేహితులు కాఫీ లేదా అపెరిటిఫ్ తాగుతూ కబుర్లు చెబుతారు.", "hi": "फ्रांस में बातचीत और कैफ़े में मिलना दोस्ती का मुख्य हिस्सा है।"},
            "grammar": {
                "title": {"en": "Invitations (Tu es libre...?)", "te": "ఆహ్వానించడం", "hi": "आमंत्रित करना"},
                "explanation": {"en": "'Tu es libre demain?' asks 'Are you free tomorrow?'. 'On prend un café?' (Shall we grab coffee?).", "te": "కలిసి కాఫీ తాగుదామా అని అడగడానికి On prend un café? అనాలి.", "hi": "क्या कॉफ़ी पिएं पूछने के लिए On prend un café? कहें।"},
                "ruleSummary": {"en": "On prend un café? = Shall we grab a coffee?", "te": "మనం కాఫీ తాగుదామా?", "hi": "क्या हम कॉफ़ी पिएं?"},
                "examples": [{"target": "On prend un verre ce soir?", "transliteration": "On prend un verre ce soir?", "native": {"en": "Shall we get a drink tonight?", "te": "ఈ సాయంత్రం కలిసి డ్రింక్ తాగుదామా?", "hi": "क्या आज शाम कुछ पिएंगे?"}}],
                "commonMistakes": [{"incorrect": "Tu veux café avec moi", "correct": "On prend un café?", "explanation": {"en": "'On prend un café?' is the natural suggestion.", "te": "సహజంగా On prend un café? అనాలి.", "hi": "स्वाभाविक रूप से On prend un café? बोलें।"}}]
            },
            "vocab": [
                {"word": "Numéro de téléphone", "translit": "Nyumero de telefon", "pron": "న్యూ-మే-రో దో తే-లే-ఫోన్", "pos": "noun", "meanings": {"en": "Phone number", "te": "ఫోన్ నంబర్", "hi": "फोन नंबर"}, "exTarget": "Quel est ton numéro de téléphone?", "exTranslit": "Quel est ton numero de telephone?", "exNative": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}},
                {"word": "Demain", "translit": "Doma", "pron": "దో-మాన్", "pos": "noun", "meanings": {"en": "Tomorrow", "te": "రేపు", "hi": "कल (आने वाला)"}, "exTarget": "À demain!", "exTranslit": "A demain!", "exNative": {"en": "See you tomorrow!", "te": "రేపు కలుద్దాం!", "hi": "कल मिलते हैं!"}},
                {"word": "Libre", "translit": "Libr", "pron": "లీ-బ్రు", "pos": "adjective", "meanings": {"en": "Free / available", "te": "సమయం ఉండటం / ఖాళీగా ఉండటం", "hi": "खाली / समय होना"}, "exTarget": "Tu es libre demain après-midi?", "exTranslit": "Tu es libre demain apres-midi?", "exNative": {"en": "Are you free tomorrow afternoon?", "te": "రేపు మధ్యాహ్నం మీకు సమయం ఉందా?", "hi": "क्या कल दोपहर आप फ्री हैं?"}},
                {"word": "Ensemble", "translit": "Onsombl", "pron": "ఆన్-సామ్-బ్ల్", "pos": "adverb", "meanings": {"en": "Together", "te": "కలిసి", "hi": "साथ में"}, "exTarget": "Allons-y ensemble.", "exTranslit": "Allons-y ensemble.", "exNative": {"en": "Let's go together.", "te": "కలిసి వెళ్దాం.", "hi": "साथ चलते हैं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for someone's phone number in French?", "te": "'మీ ఫోన్ నంబర్ ఏమిటి?' అని ఫ్రెంచ్‌లో ఎలా అడుగుతారు?", "hi": "फ्रेंच में 'आपका फोन नंबर क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}, "correct": "Quel est ton numéro de téléphone?", "options": ["Quel est ton numéro de téléphone?", "Où sont les toilettes?", "C'est combien?", "Merci"], "expl": {"en": "Quel est ton numéro de téléphone? is standard.", "te": "ఫోన్ నంబర్ అడిగే స్పష్టమైన మాట.", "hi": "फोन नंबर पूछने का वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Emergencies & Medical Help", "te": "అత్యవసర సహాయం & డాక్టర్", "hi": "आपातकाल और डॉक्टर की सहायता"},
            "objective": {"en": "Shout 'Au secours!', locate an urgence clinic, and dial 112 or 15.", "te": "సహాయం కోరడం (Au secours!), ఆసుపత్రి మరియు ఎమర్జెన్సీ నంబర్లు.", "hi": "मदद मांगना (Au secours!), अस्पताल और आपातकालीन सहायता।"},
            "culturalTip": {"en": "Dial 15 for Medical Emergencies (SAMU) or 112 for universal European emergency services in France.", "te": "ఫ్రాన్స్ లో మెడికల్ ఎమర్జెన్సీ కోసం 15 లేదా 112 డయల్ చేయాలి.", "hi": "फ्रांस में मेडिकल आपातकाल के लिए 15 या 112 पर कॉल करें।"},
            "grammar": {
                "title": {"en": "Expressing Urgent Need (J'ai besoin d'un...)", "te": "నాకు అవసరం (J'ai besoin d'un...)", "hi": "मुझे आवश्यकता है"},
                "explanation": {"en": "'J'ai besoin d'un médecin' means 'I need a doctor'. 'Aidez-moi!' means 'Help me!'.", "te": "నాకు డాక్టర్ అవసరం అంటే J'ai besoin d'un médecin అనాలి.", "hi": "मुझे डॉक्टर चाहिए कहने के लिए J'ai besoin d'un médecin कहें।"},
                "ruleSummary": {"en": "J'ai besoin d'un [Noun] = I need a [Noun].", "te": "నాకు [సహాయం] కావాలి.", "hi": "मुझे [सहायता] चाहिए।"},
                "examples": [{"target": "J'ai besoin d'aide immédiatement", "transliteration": "J'ai besoin d'aide immediatement", "native": {"en": "I need help immediately.", "te": "నాకు తక్షణమే సహాయం కావాలి.", "hi": "मुझे तुरंत मदद चाहिए।"}}],
                "commonMistakes": [{"incorrect": "Je veux médecin", "correct": "J'ai besoin d'un médecin", "explanation": {"en": "Use 'J'ai besoin de' for needs.", "te": "అవసరానికి J'ai besoin వాడాలి.", "hi": "हमेशा J'ai besoin कहें।"}}]
            },
            "vocab": [
                {"word": "Au secours!", "translit": "O sekur!", "pron": "ఓ సె-కూర్!", "pos": "phrase", "meanings": {"en": "Help! (emergency)", "te": "సహాయం చేయండి! (అత్యవసరం)", "hi": "मदद कीजिए! (आपातकाल)"}, "exTarget": "Au secours! Aidez-moi!", "exTranslit": "Au secours! Aidez-moi!", "exNative": {"en": "Help! Help me!", "te": "సహాయం చేయండి! నన్ను కాపాడండి!", "hi": "मदद कीजिए! मेरी सहायता करें!"}},
                {"word": "L'hôpital", "translit": "Lopital", "pron": "లో-పి-తాల్", "pos": "noun", "meanings": {"en": "Hospital", "te": "ఆసుపత్రి", "hi": "अस्पताल"}, "exTarget": "Où est l'hôpital le plus proche?", "exTranslit": "Ou est l'hopital le plus proche?", "exNative": {"en": "Where is the nearest hospital?", "te": "దగ్గరలోని ఆసుపత్రి ఎక్కడ ఉంది?", "hi": "सबसे पास का अस्पताल कहाँ है?"}},
                {"word": "La pharmacie", "translit": "La farmasi", "pron": "లా ఫార్-మా-సీ", "pos": "noun", "meanings": {"en": "Pharmacy / chemist", "te": "మందుల షాప్", "hi": "दवा की दुकान"}, "exTarget": "La pharmacie est ouverte?", "exTranslit": "La pharmacie est ouverte?", "exNative": {"en": "Is the pharmacy open?", "te": "మందుల షాప్ తెరిచే ఉందా?", "hi": "क्या दवा की दुकान खुली है?"}},
                {"word": "La police", "translit": "La polis", "pron": "లా పో-లీస్", "pos": "noun", "meanings": {"en": "Police", "te": "పోలీసులు", "hi": "पुलिस"}, "exTarget": "Appelez la police!", "exTranslit": "Appelez la police!", "exNative": {"en": "Call the police!", "te": "పోలీసులను పిలవండి!", "hi": "पुलिस को बुलाइए!"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you shout 'Help!' in French during an emergency?", "te": "అత్యవసరంలో 'సహాయం చేయండి!' అని ఎలా అరుస్తారు?", "hi": "आपात स्थिति में 'मदद!' कैसे पुकारेंगे?"}, "prompt": {"en": "Help!", "te": "సహాయం చేయండి!", "hi": "मदद कीजिए!"}, "correct": "Au secours!", "options": ["Au secours!", "Bonjour", "Merci", "C'est combien?"], "expl": {"en": "Au secours! is the urgent call for help.", "te": "సహాయం కోసం వాడే అత్యవసర ఫ్రెంచ్ మాట.", "hi": "मदद की मुख्य गुहार।"}}
            ]
        },
        {
            "title": {"en": "Lost Items & Speaking Slowly", "te": "పోగొట్టుకున్న వస్తువులు & నెమ్మదిగా మాట్లాడమనడం", "hi": "खोया सामान और धीरे बोलना"},
            "objective": {"en": "Report a lost wallet/phone and ask 'Parlez plus lentement, s'il vous plaît'.", "te": "పర్స్ పోయిందని చెప్పడం మరియు దయచేసి నెమ్మదిగా మాట్లాడమనడం.", "hi": "खोया पर्स बताना और धीरे बोलने का अनुरोध करना।"},
            "culturalTip": {"en": "Parisians appreciate when learners politely state 'Je ne comprends pas bien' before asking them to slow down.", "te": "నాకు కొద్దిగా అర్థమైంది, నెమ్మదిగా మాట్లాడండి అంటే ఫ్రెంచ్ వారు సహాయం చేస్తారు.", "hi": "धीरे बोलने का विनम्र अनुरोध करने पर लोग खुशी से मदद करते हैं।"},
            "grammar": {
                "title": {"en": "Asking to Slow Down (Parlez plus lentement)", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి", "hi": "कृपया धीरे बोलिए"},
                "explanation": {"en": "'Parlez plus lentement, s'il vous plaît' or 'Pouvez-vous répéter?' (Can you repeat?).", "te": "నెమ్మదిగా చెప్పమనడానికి Parlez plus lentement అనాలి.", "hi": "धीरे बोलने के लिए Parlez plus lentement कहें।"},
                "ruleSummary": {"en": "Plus lentement, s'il vous plaît = More slowly, please.", "te": "నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया थोड़ा धीरे बोलिए।"},
                "examples": [{"target": "Pouvez-vous répéter plus lentement?", "transliteration": "Pouvez-vous repeter plus lentement?", "native": {"en": "Can you repeat more slowly?", "te": "మరొక్కసారి నెమ్మదిగా చెప్పగలరా?", "hi": "क्या आप थोड़ा धीरे दोहरा सकते हैं?"}}],
                "commonMistakes": [{"incorrect": "Toi parle lent", "correct": "Parlez plus lentement, s'il vous plaît", "explanation": {"en": "Always polite honorific form.", "te": "మర్యాదగా చెప్పాలి.", "hi": "हमेशा आदरपूर्वक बोलें।"}}]
            },
            "vocab": [
                {"word": "Mon portefeuille", "translit": "Mon portfey", "pron": "మోన్ పోర్త్-ఫేయ్", "pos": "noun", "meanings": {"en": "My wallet", "te": "నా పర్స్ / పర్సు", "hi": "मेरा बटुआ / पर्स"}, "exTarget": "J'ai perdu mon portefeuille.", "exTranslit": "J'ai perdu mon portefeuille.", "exNative": {"en": "I lost my wallet.", "te": "నా పర్స్ పోయింది.", "hi": "मेरा बटुआ खो गया।"}},
                {"word": "Mon portable", "translit": "Mon portabl", "pron": "మోన్ పోర్-తా-బ్ల్", "pos": "noun", "meanings": {"en": "My mobile phone", "te": "నా మొబైల్ ఫోన్", "hi": "मेरा मोबाइल फोन"}, "exTarget": "Où est mon portable?", "exTranslit": "Ou est mon portable?", "exNative": {"en": "Where is my phone?", "te": "నా ఫోన్ ఎక్కడ ఉంది?", "hi": "मेरा फोन कहाँ है?"}},
                {"word": "Lentement", "translit": "Lontmon", "pron": "లాంట్-మాన్", "pos": "adverb", "meanings": {"en": "Slowly", "te": "నెమ్మదిగా", "hi": "धीरे-धीरे"}, "exTarget": "Parlez plus lentement, s'il vous plaît.", "exTranslit": "Parlez plus lentement, s'il vous plait.", "exNative": {"en": "Please speak more slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया थोड़ा धीरे बोलिए।"}},
                {"word": "Répétez", "translit": "Repete", "pron": "రే-పే-తే", "pos": "verb", "meanings": {"en": "Repeat", "te": "మళ్లీ చెప్పడం", "hi": "दोहराना"}, "exTarget": "Répétez, s'il vous plaît.", "exTranslit": "Repetez, s'il vous plait.", "exNative": {"en": "Repeat, please.", "te": "మరొక్కసారి చెప్పండి.", "hi": "कृपया दोहराइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask someone to speak more slowly in French?", "te": "'దయచేసి నెమ్మదిగా మాట్లాడండి' అని ఫ్రెంచ్‌లో ఎలా అంటారు?", "hi": "फ्रेंच में 'कृपया धीरे बोलिए' कैसे कहेंगे?"}, "prompt": {"en": "Please speak more slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"}, "correct": "Parlez plus lentement, s'il vous plaît", "options": ["Parlez plus lentement, s'il vous plaît", "Au secours!", "Où sont les toilettes?", "Merci"], "expl": {"en": "Parlez plus lentement, s'il vous plaît is standard.", "te": "నెమ్మదిగా మాట్లాడమని కోరే మర్యాదపూర్వక మాట.", "hi": "धीरे बोलने का विनम्र अनुरोध।"}}
            ]
        }
    ]
]
