# scripts/target_en.py
# -*- coding: utf-8 -*-
"""15 Real-Life Situational English Lessons across 5 Modules."""

EN_LESSONS = [
    # MODULE 1: Everyday Survival & Greetings
    [
        {
            "title": {"en": "Daily Greetings & Hello", "te": "రోజువారీ శుభాకాంక్షలు (Hello)", "hi": "दैनिक अभिवादन (Hello)"},
            "objective": {"en": "Master 'Hello', 'Good morning', 'How are you?', and daily greetings in English.", "te": "Hello, Good morning మరియు ఆంగ్ల పలకరింపులను సహజంగా మాట్లాడటం నేర్చుకోండి.", "hi": "Hello, Good morning और दैनिक अंग्रेज़ी अभिवादन सीखें।"},
            "culturalTip": {"en": "A friendly handshake accompanied by 'Nice to meet you' and eye contact is the standard professional greeting.", "te": "చిరునవ్వుతో కరచాలనం (Handshake) చేసి 'Nice to meet you' అనడం ఆంగ్లంలో మర్యాదపూర్వక పద్ధతి.", "hi": "गर्मजोशी से हाथ मिलाना और 'Nice to meet you' कहना अंग्रेज़ी शिष्टाचार है।"},
            "grammar": {
                "title": {"en": "Present Tense of 'To Be' (Am/Is/Are)", "te": "ఉండటం తెలియజేసే రూపాలు (Am/Is/Are)", "hi": "'To Be' क्रिया के रूप (Am/Is/Are)"},
                "explanation": {"en": "Use 'I am', 'You are', 'He/She is' to express identity and current state.", "te": "వ్యక్తి యొక్క స్థితిని లేదా గుర్తింపును చెప్పడానికి I am, You are, He/She is వాడతారు.", "hi": "पहचान और स्थिति बताने के लिए I am, You are, He/She is का प्रयोग करें।"},
                "ruleSummary": {"en": "I am / You are / He/She/It is.", "te": "నేను (I am) / మీరు (You are).", "hi": "मैं (I am) / आप (You are)."},
                "examples": [{"target": "Hello! How are you doing today?", "transliteration": "Hello! How are you doing today?", "native": {"en": "Hello! How are you doing today?", "te": "హలో! ఈరోజు మీరు ఎలా ఉన్నారు?", "hi": "नमस्ते! आज आप कैसे हैं?"}}],
                "commonMistakes": [{"incorrect": "I is fine", "correct": "I am fine", "explanation": {"en": "Always use 'am' with 'I'.", "te": "'I' తో ఎల్లప్పుడూ 'am' వాడాలి.", "hi": "'I' के साथ हमेशा 'am' लगाएं।"}}]
            },
            "vocab": [
                {"word": "Hello", "translit": "Hello", "pron": "హ-లో / हेलो", "pos": "greeting", "meanings": {"en": "Hello / Hi", "te": "హలో / నమస్కారం", "hi": "नमस्ते / हैलो"}, "exTarget": "Hello! Good morning everyone.", "exTranslit": "Hello! Good morning everyone.", "exNative": {"en": "Hello! Good morning everyone.", "te": "హలో! అందరికీ శుభోదయం.", "hi": "नमस्ते! आप सभी को शुभ प्रभात।"}},
                {"word": "Thank you", "translit": "Thank you", "pron": "థాంక్ యూ / थैंक यू", "pos": "phrase", "meanings": {"en": "Thank you", "te": "ధన్యవాదాలు", "hi": "धन्यवाद"}, "exTarget": "Thank you very much for your advice.", "exTranslit": "Thank you very much for your advice.", "exNative": {"en": "Thank you very much for your advice.", "te": "మీ సలహాకు చాలా ధన్యవాదాలు.", "hi": "आपकी सलाह के लिए बहुत धन्यवाद।"}},
                {"word": "Goodbye", "translit": "Goodbye", "pron": "గుడ్-బై / गुडबाय", "pos": "phrase", "meanings": {"en": "Goodbye", "te": "వీడ్కోలు / వెళ్లివస్తాను", "hi": "अलविदा"}, "exTarget": "Goodbye! See you on Monday.", "exTranslit": "Goodbye! See you on Monday.", "exNative": {"en": "Goodbye! See you on Monday.", "te": "వెళ్లివస్తాను! సోమవారం కలుద్దాం.", "hi": "अलविदा! सोमवार को मिलते हैं।"}},
                {"word": "Yes", "translit": "Yes", "pron": "యెస్ / येस", "pos": "interjection", "meanings": {"en": "Yes", "te": "అవును", "hi": "हाँ"}, "exTarget": "Yes, absolutely.", "exTranslit": "Yes, absolutely.", "exNative": {"en": "Yes, absolutely.", "te": "అవును, ఖచ్చితంగా.", "hi": "हाँ, बिल्कुल।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Choose the correct phrase to greet someone politely.", "te": "ఎవరినైనా పలకరించడానికి సరైన పదాన్ని ఎంచుకోండి.", "hi": "अभिवादन के लिए सही शब्द चुनें।"}, "prompt": {"en": "Polite greeting", "te": "పలకరింపు", "hi": "अभिवादन"}, "correct": "Hello! Good morning", "options": ["Hello! Good morning", "Go away", "No thanks", "Yesterday"], "expl": {"en": "'Hello! Good morning' is polite and welcoming.", "te": "'Hello! Good morning' అనేది మర్యాదపూర్వక పలకరింపు.", "hi": "'Hello! Good morning' शिष्ट अभिवादन है।"}}
            ]
        },
        {
            "title": {"en": "Politeness, Excuse Me & Please", "te": "మర్యాదపూర్వక మాటలు & క్షమించండి", "hi": "माफ़ी और शिष्टाचार"},
            "objective": {"en": "Master 'Please', 'Excuse me', and 'I am sorry' in everyday interactions.", "te": "దయచేసి, క్షమించండి అని ఆంగ్లంలో మర్యాదగా చెప్పడం నేర్చుకోండి.", "hi": "Please, Excuse me और Sorry का स्वाभाविक प्रयोग सीखें।"},
            "culturalTip": {"en": "British and American cultures place huge emphasis on 'Please', 'Thank you', and 'Excuse me'; omitting them can sound abrupt.", "te": "ఆంగ్ల సంస్కృతిలో 'Please' మరియు 'Excuse me' వాడటం చాలా ముఖ్యం.", "hi": "अंग्रेज़ी में 'Please' और 'Excuse me' कहना अत्यंत ज़रूरी माना जाता है।"},
            "grammar": {
                "title": {"en": "Polite Modal Verbs (Could / Would / May)", "te": "గౌరవ ప్రార్థనలు (Could / Would)", "hi": "विनम्र अनुरोध (Could / Would)"},
                "explanation": {"en": "Use 'Could you please...' instead of direct commands for polite requests.", "te": "ఆజ్ఞాపించకుండా మర్యాదగా అడగడానికి 'Could you please...' వాడతారు.", "hi": "आदेश देने के बजाय विनम्रता से 'Could you please...' कहें।"},
                "ruleSummary": {"en": "Could you please + [Verb]?", "te": "Could you please + [క్రియ]?", "hi": "Could you please + [क्रिया]?"},
                "examples": [{"target": "Could you please help me with this?", "transliteration": "Could you please help me with this?", "native": {"en": "Could you please help me with this?", "te": "దయచేసి ఇందులో నాకు కొంచెం సహాయం చేయగలరా?", "hi": "क्या आप कृपया इसमें मेरी मदद कर सकते हैं?"}}],
                "commonMistakes": [{"incorrect": "Give me that book", "correct": "Could you please give me that book?", "explanation": {"en": "Always soften requests with 'could you please'.", "te": "ఎల్లప్పుడూ 'could you please' చేర్చాలి.", "hi": "हमेशा 'Could you please' जोड़कर कहें।"}}]
            },
            "vocab": [
                {"word": "Please", "translit": "Please", "pron": "ప్లీజ్ / प्लीज़", "pos": "adverb", "meanings": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "exTarget": "Please take a seat.", "exTranslit": "Please take a seat.", "exNative": {"en": "Please take a seat.", "te": "దయచేసి కూర్చోండి.", "hi": "कृपया बैठिए।"}},
                {"word": "Excuse me", "translit": "Excuse me", "pron": "ఎక్స్‌క్యూజ్ మీ / एक्सक्यूज़ मी", "pos": "phrase", "meanings": {"en": "Excuse me", "te": "కొద్దిగా వినండి / క్షమించండి", "hi": "माफ़ कीजिए / सुनिए"}, "exTarget": "Excuse me, where is the elevator?", "exTranslit": "Excuse me, where is the elevator?", "exNative": {"en": "Excuse me, where is the elevator?", "te": "కొద్దిగా వినండి, లిఫ్ట్ ఎక్కడ ఉంది?", "hi": "सुनिए, लिफ्ट कहाँ है?"}},
                {"word": "Sorry", "translit": "Sorry", "pron": "సారీ / सॉरी", "pos": "adjective", "meanings": {"en": "Sorry / Apologies", "te": "నన్ను క్షమించండి", "hi": "माफ़ कीजिए"}, "exTarget": "I am so sorry for being late.", "exTranslit": "I am so sorry for being late.", "exNative": {"en": "I am so sorry for being late.", "te": "ఆలస్యమైనందుకు నన్ను క్షమించండి.", "hi": "देर से आने के लिए मुझे माफ़ करें।"}},
                {"word": "You're welcome", "translit": "You're welcome", "pron": "యు ఆర్ వెల్‌కమ్ / यू आर वेलकम", "pos": "phrase", "meanings": {"en": "You are welcome", "te": "పర్వాలేదండి / స్వాగతం", "hi": "कोई बात नहीं / आपका स्वागत है"}, "exTarget": "—Thanks! —You're welcome anytime.", "exTranslit": "Thanks! You're welcome anytime.", "exNative": {"en": "—Thanks! —You're welcome anytime.", "te": "—థాంక్స్! —పర్వాలేదండి.", "hi": "—धन्यवाद! —कोई बात नहीं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you politely get someone's attention in English?", "te": "ఎవరినైనా మర్యాదగా పిలవడానికి ఏమంటారు?", "hi": "किसी का ध्यान आकर्षित करने के लिए क्या कहेंगे?"}, "prompt": {"en": "Excuse me", "te": "Excuse me", "hi": "Excuse me"}, "correct": "Excuse me", "options": ["Excuse me", "Hey you", "Shut up", "Nothing"], "expl": {"en": "'Excuse me' is the standard polite opener.", "te": "'Excuse me' అనేది ప్రామాణిక పద్ధతి.", "hi": "'Excuse me' सबसे शिष्ट तरीका है।"}}
            ]
        },
        {
            "title": {"en": "Introducing Yourself & Origin", "te": "పరిచయం & ఎక్కడి నుంచి వచ్చారో చెప్పడం", "hi": "आत्मपरिचय और गृह देश"},
            "objective": {"en": "State your name, nationality, and background using 'My name is...' and 'I am from...'.", "te": "మీ పేరు, ఊరు మరియు వృత్తిని ఆంగ్లంలో స్పష్టంగా చెప్పడం నేర్చుకోండి.", "hi": "अपना नाम, देश और पृष्ठभूमि अंग्रेज़ी में बताना सीखें।"},
            "culturalTip": {"en": "When asked 'What do you do?', English speakers typically share their profession or field of work enthusiastically.", "te": "'What do you do?' అని అడిగితే మీ వృత్తి లేదా పని గురించి చెప్పాలి.", "hi": "'What do you do?' का उत्तर अपना पेशा बताकर दिया जाता है।"},
            "grammar": {
                "title": {"en": "Present Simple for Facts ('I live in / I work at')", "te": "సాధారణ వర్తమాన కాలం", "hi": "सामान्य वर्तमान काल"},
                "explanation": {"en": "Use simple present to talk about routines and facts: 'I work as a software engineer'.", "te": "మీ రోజువారీ పనులు లేదా వాస్తవాలు చెప్పడానికి Simple Present వాడతారు.", "hi": "स्थायी तथ्यों और पेशे के लिए Simple Present का प्रयोग करें।"},
                "ruleSummary": {"en": "I + [Verb] + in/at [Place].", "te": "I live in [నగరం].", "hi": "I live in [शहर]।"},
                "examples": [{"target": "My name is Priya and I am from Hyderabad, India.", "transliteration": "My name is Priya and I am from Hyderabad, India.", "native": {"en": "My name is Priya and I am from Hyderabad, India.", "te": "నా పేరు ప్రియ, నేను భారతదేశంలోని హైదరాబాద్ నుంచి వచ్చాను.", "hi": "मेरा नाम प्रिया है और मैं भारत के हैदराबाद से हूँ।"}}],
                "commonMistakes": [{"incorrect": "Myself Priya", "correct": "My name is Priya / I am Priya", "explanation": {"en": "Never introduce yourself with 'Myself'; say 'My name is'.", "te": "'Myself' అనకూడదు, 'My name is' అనాలి.", "hi": "परिचय में 'Myself' के स्थान पर 'My name is' कहें।"}}]
            },
            "vocab": [
                {"word": "Name", "translit": "Name", "pron": "నేమ్ / नेम", "pos": "noun", "meanings": {"en": "Name", "te": "పేరు", "hi": "नाम"}, "exTarget": "What is your full name?", "exTranslit": "What is your full name?", "exNative": {"en": "What is your full name?", "te": "మీ పూర్తి పేరు ఏమిటి?", "hi": "आपका पूरा नाम क्या है?"}},
                {"word": "Country", "translit": "Country", "pron": "కంట్రీ / कंट्री", "pos": "noun", "meanings": {"en": "Country", "te": "దేశం", "hi": "देश"}, "exTarget": "Which country are you from?", "exTranslit": "Which country are you from?", "exNative": {"en": "Which country are you from?", "te": "మీరు ఏ దేశం నుంచి వచ్చారు?", "hi": "आप किस देश से हैं?"}},
                {"word": "Pleased", "translit": "Pleased", "pron": "ప్లీజ్డ్ / प्लीज़्ड", "pos": "adjective", "meanings": {"en": "Pleased / Delighted", "te": "సంతోషం", "hi": "प्रसन्न / खुश"}, "exTarget": "Pleased to make your acquaintance.", "exTranslit": "Pleased to make your acquaintance.", "exNative": {"en": "Pleased to make your acquaintance.", "te": "మిమ్మల్ని కలవడం చాలా సంతోషం.", "hi": "आपसे मिलकर अत्यंत प्रसन्नता हुई।"}},
                {"word": "Profession", "translit": "Profession", "pron": "ప్రొఫెషన్ / प्रोफेशन", "pos": "noun", "meanings": {"en": "Profession / Job", "te": "వృత్తి / ఉద్యోగం", "hi": "पेशा / काम"}, "exTarget": "Teaching is my true profession.", "exTranslit": "Teaching is my true profession.", "exNative": {"en": "Teaching is my true profession.", "te": "బోధన నా వృత్తి.", "hi": "अध्यापन मेरा पेशा है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the correct way to introduce your name.", "te": "మీ పేరు చెప్పడానికి సరైన వాక్యాన్ని ఎంచుకోండి.", "hi": "अपना नाम बताने के लिए सही वाक्य चुनें।"}, "prompt": {"en": "Introducing name", "te": "పేరు చెప్పడం", "hi": "नाम बताना"}, "correct": "My name is John", "options": ["My name is John", "Myself John is", "I are John", "Me name John"], "expl": {"en": "'My name is [Name]' is the grammatically correct introduction.", "te": "'My name is...' సరైన వ్యాకరణ రూపం.", "hi": "'My name is...' व्याकरण की दृष्टि से सही है।"}}
            ]
        }
    ],

    # MODULE 2: Real-World Shopping & Numbers
    [
        {
            "title": {"en": "Numbers & Asking Prices", "te": "సంఖ్యలు & ధరలు అడగడం", "hi": "संख्याएँ और कीमतें पूछना"},
            "objective": {"en": "Master numbers 1 to 10,000 and ask 'How much does this cost?' fluently.", "te": "సంఖ్యలు మరియు 'How much does this cost?' అని ధరలు అడగడం నేర్చుకోండి.", "hi": "संख्याएँ और कीमतें पूछना सीखें।"},
            "culturalTip": {"en": "In Western retail stores, prices on tags are fixed, but asking about seasonal discounts or sales is normal.", "te": "షాపింగ్ మాల్స్‌లో ధరలు స్థిరంగా ఉంటాయి, అయితే డిస్కౌంట్లు ఉన్నాయా అని అడగవచ్చు.", "hi": "दुकानों में कीमतें तय होती हैं, लेकिन छूट के बारे में पूछ सकते हैं।"},
            "grammar": {
                "title": {"en": "Asking Prices ('How much is / How much are')", "te": "ధరలు అడగడం (How much)", "hi": "दाम पूछना (How much)"},
                "explanation": {"en": "Use 'How much is [Singular]?' and 'How much are [Plural]?'.", "te": "ఏకవచనానికి 'How much is...', బహువచనానికి 'How much are...' వాడతారు.", "hi": "एकवचन के लिए 'How much is...' और बहुवचन के लिए 'How much are...' बोलें।"},
                "ruleSummary": {"en": "How much is this item? / How much are these shoes?", "te": "How much is this?", "hi": "यह कितने का है?"},
                "examples": [{"target": "How much is this leather jacket, please?", "transliteration": "How much is this leather jacket, please?", "native": {"en": "How much is this leather jacket, please?", "te": "ఈ లెదర్ జాకెట్ ధర ఎంతండి?", "hi": "यह लेदर जैकेट कितने की है?"}}],
                "commonMistakes": [{"incorrect": "How much cost this?", "correct": "How much does this cost? / How much is this?", "explanation": {"en": "Use 'How much does this cost?' with auxiliary 'does'.", "te": "'How much does this cost?' అనాలి.", "hi": "'How much does this cost?' कहें।"}}]
            },
            "vocab": [
                {"word": "Hundred", "translit": "Hundred", "pron": "హండ్రెడ్ / हंड्रेड", "pos": "numeral", "meanings": {"en": "One Hundred (100)", "te": "వంద (100)", "hi": "सौ (100)"}, "exTarget": "This shirt costs fifty dollars.", "exTranslit": "This shirt costs fifty dollars.", "exNative": {"en": "This shirt costs fifty dollars.", "te": "ఈ చొక్కా యాభై డాలర్లు.", "hi": "यह शर्ट पचास डॉलर की है।"}},
                {"word": "Thousand", "translit": "Thousand", "pron": "థౌజండ్ / थाउज़ेंड", "pos": "numeral", "meanings": {"en": "One Thousand (1,000)", "te": "వెయ్యి (1000)", "hi": "हज़ार (1000)"}, "exTarget": "A thousand customers visited today.", "exTranslit": "A thousand customers visited today.", "exNative": {"en": "A thousand customers visited today.", "te": "ఈరోజు వెయ్యి మంది కస్టమర్లు వచ్చారు.", "hi": "आज एक हज़ार ग्राहक आए।"}},
                {"word": "Price", "translit": "Price", "pron": "ప్రైస్ / प्राइस", "pos": "noun", "meanings": {"en": "Price / Cost", "te": "ధర / ఖరీదు", "hi": "दाम / मूल्य"}, "exTarget": "The price includes local taxes.", "exTranslit": "The price includes local taxes.", "exNative": {"en": "The price includes local taxes.", "te": "ఈ ధరలో పన్నులు కలిసి ఉన్నాయి.", "hi": "इस दाम में कर शामिल है।"}},
                {"word": "Expensive", "translit": "Expensive", "pron": "ఎక్స్‌పెన్సివ్ / एक्सपेंसिव", "pos": "adjective", "meanings": {"en": "Expensive / Costly", "te": "ఖరీదైనది / ఎక్కువ ధర", "hi": "महँगा"}, "exTarget": "This restaurant is quite expensive.", "exTranslit": "This restaurant is quite expensive.", "exNative": {"en": "This restaurant is quite expensive.", "te": "ఈ రెస్టారెంట్ చాలా ఖరీదైనది.", "hi": "यह रेस्तरां काफ़ी महँगा है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask the cost of an item?", "te": "ఏదైనా వస్తువు ధరను ఎలా అడుగుతారు?", "hi": "किसी चीज़ का दाम कैसे पूछेंगे?"}, "prompt": {"en": "How much does this cost?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "correct": "How much does this cost?", "options": ["How much does this cost?", "Who is that price?", "Where costs item?", "When is dollars?"], "expl": {"en": "'How much does this cost?' is the correct phrasing.", "te": "ధర అడగడానికి 'How much does this cost?' అనాలి.", "hi": "'How much does this cost?' सही वाक्य है।"}}
            ]
        },
        {
            "title": {"en": "In the Store & Finding Sizes", "te": "దుకాణంలో కొనుగోళ్లు & సైజులు", "hi": "दुकान में खरीदारी और आकार"},
            "objective": {"en": "Ask for different sizes ('Do you have this in medium?') and fitting rooms.", "te": "మీడియం లేదా లార్జ్ సైజులు మరియు ట్రయల్ రూమ్ గురించి అడగడం నేర్చుకోండి.", "hi": "अलग आकार और ट्रायल रूम के बारे में पूछना सीखें।"},
            "culturalTip": {"en": "Asking 'May I try this on?' before heading to the fitting room is expected retail etiquette.", "te": "బట్టలు ధరించి చూసేముందు 'May I try this on?' అని అడగడం మర్యాద.", "hi": "कपड़े पहनकर देखने से पहले 'May I try this on?' पूछना अच्छा माना जाता है।"},
            "grammar": {
                "title": {"en": "Questions with 'Do you have...?'", "te": "'Do you have...?' అని ప్రశ్నించడం", "hi": "'Do you have...?' से पूछना"},
                "explanation": {"en": "Use 'Do you have [Item] in [Size/Color]?' to check stock.", "te": "షాపులో వస్తువు లేదా సైజు ఉందో లేదో అడగడానికి 'Do you have...?' వాడతారు.", "hi": "सामान या साइज़ पूछने के लिए 'Do you have...?' का प्रयोग करें।"},
                "ruleSummary": {"en": "Do you have this in a larger size?", "te": "Do you have this in large?", "hi": "क्या आपके पास यह बड़े आकार में है?"},
                "examples": [{"target": "Excuse me, do you have this in size Medium?", "transliteration": "Excuse me, do you have this in size Medium?", "native": {"en": "Excuse me, do you have this in size Medium?", "te": "కొద్దిగా వినండి, ఇది మీడియం సైజులో ఉందా?", "hi": "माफ़ कीजिए, क्या यह मीडियम साइज़ में उपलब्ध है?"}}],
                "commonMistakes": [{"incorrect": "You have large size?", "correct": "Do you have a large size?", "explanation": {"en": "Use auxiliary 'Do' for questions.", "te": "ప్రశ్నలో 'Do you have' అనాలి.", "hi": "प्रश्न में हमेशा 'Do you have' कहें।"}}]
            },
            "vocab": [
                {"word": "Size", "translit": "Size", "pron": "సైజ్ / साइज़", "pos": "noun", "meanings": {"en": "Size", "te": "సైజు / కొలత", "hi": "आकार / साइज़"}, "exTarget": "What size shoe do you wear?", "exTranslit": "What size shoe do you wear?", "exNative": {"en": "What size shoe do you wear?", "te": "మీరు ఏ సైజు షూ వేసుకుంటారు?", "hi": "आप किस साइज़ का जूता पहनते हैं?"}},
                {"word": "Fitting room", "translit": "Fitting room", "pron": "ఫిట్టింగ్ రూమ్ / फ़िटिंग रूम", "pos": "noun", "meanings": {"en": "Fitting / Trial room", "te": "ట్రయల్ రూమ్ / ఫిట్టింగ్ రూమ్", "hi": "ट्रायल रूम"}, "exTarget": "Where are the fitting rooms located?", "exTranslit": "Where are the fitting rooms located?", "exNative": {"en": "Where are the fitting rooms located?", "te": "ట్రయల్ రూమ్స్ ఎక్కడ ఉన్నాయి?", "hi": "ट्रायल रूम कहाँ हैं?"}},
                {"word": "Color", "translit": "Color", "pron": "కలర్ / कलर", "pos": "noun", "meanings": {"en": "Color", "te": "రంగు", "hi": "रंग"}, "exTarget": "Do you have this in blue color?", "exTranslit": "Do you have this in blue color?", "exNative": {"en": "Do you have this in blue color?", "te": "ఇది నీలం రంగులో ఉందా?", "hi": "क्या यह नीले रंग में है?"}},
                {"word": "Discount", "translit": "Discount", "pron": "డిస్కౌంట్ / डिस्काउंट", "pos": "noun", "meanings": {"en": "Discount / Sale", "te": "తగ్గింపు / డిస్కౌంట్", "hi": "छूट / डिस्काउंट"}, "exTarget": "Is there any discount on this item?", "exTranslit": "Is there any discount on this item?", "exNative": {"en": "Is there any discount on this item?", "te": "ఈ వస్తువుపై ఏదైనా డిస్కౌంట్ ఉందా?", "hi": "क्या इस वस्तु पर कोई छूट है?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask to try on clothes?", "te": "బట్టలు ట్రయల్ వేసి చూడవచ్చా అని ఎలా అడుగుతారు?", "hi": "कपड़े आज़माने की अनुमति कैसे मांगेंगे?"}, "prompt": {"en": "May I try this on?", "te": "నేను దీన్ని ట్రయల్ వేయవచ్చా?", "hi": "क्या मैं इसे पहनकर देख सकता हूँ?"}, "correct": "May I try this on?", "options": ["May I try this on?", "Give me free", "Where is exit?", "I don't like clothes"], "expl": {"en": "'May I try this on?' is polite retail speech.", "te": "'May I try this on?' సరైన వాక్యం.", "hi": "'May I try this on?' शिष्ट वाक्य है।"}}
            ]
        },
        {
            "title": {"en": "Payment, Cards & Receipts", "te": "చెల్లింపు, కార్డులు & రసీదులు", "hi": "भुगतान, कार्ड और रसीद"},
            "objective": {"en": "Pay with credit card, cash, contactless tap, and ask for receipts.", "te": "కార్డు లేదా నగదుతో చెల్లించడం మరియు రసీదు అడగడం నేర్చుకోండి.", "hi": "क्रेडिट कार्ड या नकद से भुगतान और रसीद मांगना सीखें।"},
            "culturalTip": {"en": "Cashiers will ask 'Would you like a bag or receipt?' – responding 'Yes, please' or 'No, thank you' is standard.", "te": "క్యాషియర్ 'Would you like a receipt?' అని అడిగితే 'Yes, please' అనడం అలవాటు.", "hi": "कैशियर द्वारा रसीद पूछने पर 'Yes, please' या 'No, thank you' कहें।"},
            "grammar": {
                "title": {"en": "Payment Prepositions ('By card / In cash')", "te": "చెల్లింపు విధానాలు (By card / In cash)", "hi": "भुगतान के तरीके (By card / In cash)"},
                "explanation": {"en": "Say 'by card / by contactless' and 'in cash / with cash'.", "te": "కార్డుతో చెల్లించేటప్పుడు 'by card', నగదు అయితే 'in cash' అంటారు.", "hi": "कार्ड के लिए 'by card' और नकद के लिए 'in cash' का प्रयोग करें।"},
                "ruleSummary": {"en": "Can I pay by card? / I'll pay in cash.", "te": "Can I pay by card?", "hi": "क्या मैं कार्ड से भुगतान कर सकता हूँ?"},
                "examples": [{"target": "Can I pay with credit card or Apple Pay?", "transliteration": "Can I pay with credit card or Apple Pay?", "native": {"en": "Can I pay with credit card or Apple Pay?", "te": "నేను క్రెడిట్ కార్డు లేదా యాపిల్ పే ద్వారా చెల్లించవచ్చా?", "hi": "क्या मैं क्रेडिट कार्ड या एप्पल पे से भुगतान कर सकता हूँ?"}}],
                "commonMistakes": [{"incorrect": "I pay in card", "correct": "I will pay by card", "explanation": {"en": "Use 'by card', not 'in card'.", "te": "'by card' అనాలి.", "hi": "'by card' कहें।"}}]
            },
            "vocab": [
                {"word": "Credit card", "translit": "Credit card", "pron": "క్రెడిట్ కార్డ్ / क्रेडिट कार्ड", "pos": "noun", "meanings": {"en": "Credit card", "te": "క్రెడిట్ కార్డు", "hi": "क्रेडिट कार्ड"}, "exTarget": "Do you accept international credit cards?", "exTranslit": "Do you accept international credit cards?", "exNative": {"en": "Do you accept international credit cards?", "te": "మీరు అంతర్జాతీయ క్రెడిట్ కార్డులను అంగీకరిస్తారా?", "hi": "क्या आप अंतरराष्ट्रीय क्रेडिट कार्ड स्वीकार करते हैं?"}},
                {"word": "Cash", "translit": "Cash", "pron": "క్యాష్ / कैश", "pos": "noun", "meanings": {"en": "Cash / Notes", "te": "నగదు / క్యాష్", "hi": "नकद / कैश"}, "exTarget": "I only have cash on me.", "exTranslit": "I only have cash on me.", "exNative": {"en": "I only have cash on me.", "te": "నా దగ్గర నగదు మాత్రమే ఉంది.", "hi": "मेरे पास केवल नकद है।"}},
                {"word": "Receipt", "translit": "Receipt", "pron": "రిసీట్ / रिसीट", "pos": "noun", "meanings": {"en": "Receipt / Proof of purchase", "te": "రసీదు", "hi": "रसीद / पावती"}, "exTarget": "Please keep your receipt for returns.", "exTranslit": "Please keep your receipt for returns.", "exNative": {"en": "Please keep your receipt for returns.", "te": "వస్తువును మార్చుకోవడానికి రసీదు దాచుకోండి.", "hi": "वापसी के लिए अपनी रसीद संभाल कर रखें।"}},
                {"word": "Change", "translit": "Change", "pron": "ఛేంజ్ / चेंज", "pos": "noun", "meanings": {"en": "Change / Coins", "te": "చిల్లర / మిగిలిన డబ్బు", "hi": "छुट्टे पैसे / चेंज"}, "exTarget": "Here is your change and receipt.", "exTranslit": "Here is your change and receipt.", "exNative": {"en": "Here is your change and receipt.", "te": "ఇదిగోండి మీ చిల్లర మరియు రసీదు.", "hi": "ये रहे आपके छुट्टे पैसे और रसीद।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask if cards are accepted?", "te": "కార్డు తీసుకుంటారా అని ఎలా అడుగుతారు?", "hi": "कार्ड स्वीकार करने के बारे में कैसे पूछेंगे?"}, "prompt": {"en": "Do you accept cards?", "te": "మీరు కార్డు తీసుకుంటారా?", "hi": "क्या आप कार्ड लेते हैं?"}, "correct": "Do you accept credit cards?", "options": ["Do you accept credit cards?", "Give me free cash", "Where is the door?", "I lost my shoes"], "expl": {"en": "'Do you accept credit cards?' is correct.", "te": "'Do you accept credit cards?' సరైన ప్రశ్న.", "hi": "'Do you accept credit cards?' सही प्रश्न है।"}}
            ]
        }
    ],

    # MODULE 3: Cafés, Street Food & Restaurants
    [
        {
            "title": {"en": "Ordering Coffee, Tea & Bakery", "te": "కాఫీ, టీ & బేకరీ ఆర్డర్ చేయడం", "hi": "कॉफ़ी, चाय और बेकरी"},
            "objective": {"en": "Order espresso, latte, tea, iced drinks, and pastries at a coffee shop.", "te": "కాఫీ షాపులో కాఫీ, టీ మరియు బేకరీ వస్తువులు ఆర్డర్ చేయడం నేర్చుకోండి.", "hi": "कॉफ़ी शॉप में लाते, चाय और पेस्ट्री का ऑर्डर देना सीखें।"},
            "culturalTip": {"en": "Baristas will ask 'For here or to go?' (dine-in or take-out) and for your name to write on the cup.", "te": "కెఫేలో 'For here or to go?' (ఇక్కడే తాగుతారా లేక పట్టుకెళ్తారా?) అని అడుగుతారు.", "hi": "कैफ़े में 'For here or to go?' (यहाँ पिएंगे या ले जाएंगे?) पूछा जाता है।"},
            "grammar": {
                "title": {"en": "Polite Ordering ('I would like / Can I get')", "te": "ఆర్డర్ చేసే పద్ధతులు (I would like)", "hi": "ऑर्डर करने का शिष्टाचार (I would like)"},
                "explanation": {"en": "Say 'I would like a large latte' or 'Can I get a cappuccino, please?'.", "te": "ఆర్డర్ చేయడానికి 'I would like...' లేదా 'Can I get...' వాడాలి.", "hi": "ऑर्डर के लिए 'I would like...' या 'Can I get...' का प्रयोग करें।"},
                "ruleSummary": {"en": "I'd like a [Drink], please.", "te": "I would like a coffee, please.", "hi": "मुझे एक कॉफ़ी चाहिए, कृपया।"},
                "examples": [{"target": "I'd like an iced Americano with oat milk, please.", "transliteration": "I'd like an iced Americano with oat milk, please.", "native": {"en": "I'd like an iced Americano with oat milk, please.", "te": "నాకు ఓట్ మిల్క్‌తో కూడిన ఐస్డ్ అమెరికానో కాఫీ కావాలి.", "hi": "मुझे ओट मिल्क के साथ एक आइस्ड अमेरिकानो चाहिए, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Give me coffee", "correct": "Could I have a coffee, please?", "explanation": {"en": "Avoid sounding demanding; use 'Could I have'.", "te": "మర్యాదగా 'Could I have a coffee, please?' అనాలి.", "hi": "हमेशा 'Could I have a coffee, please?' कहें।"}}]
            },
            "vocab": [
                {"word": "Coffee", "translit": "Coffee", "pron": "కాఫీ / कॉफ़ी", "pos": "noun", "meanings": {"en": "Coffee", "te": "కాఫీ", "hi": "कॉफ़ी"}, "exTarget": "I drink black coffee every morning.", "exTranslit": "I drink black coffee every morning.", "exNative": {"en": "I drink black coffee every morning.", "te": "నేను ప్రతి ఉదయం బ్లాక్ కాఫీ తాగుతాను.", "hi": "मैं रोज़ सुबह ब्लैक कॉफ़ी पीता हूँ।"}},
                {"word": "Milk", "translit": "Milk", "pron": "మిల్క్ / मिल्क", "pos": "noun", "meanings": {"en": "Milk", "te": "పాలు", "hi": "दूध"}, "exTarget": "Can I have whole milk or almond milk?", "exTranslit": "Can I have whole milk or almond milk?", "exNative": {"en": "Can I have whole milk or almond milk?", "te": "సాధారణ పాలు లేదా బాదం పాలు ఇవ్వగలరా?", "hi": "क्या बादाम का दूध मिल सकता है?"}},
                {"word": "Sugar", "translit": "Sugar", "pron": "షుగర్ / शुगर", "pos": "noun", "meanings": {"en": "Sugar", "te": "చక్కెర", "hi": "चीनी / शक्कर"}, "exTarget": "No sugar for me, thank you.", "exTranslit": "No sugar for me, thank you.", "exNative": {"en": "No sugar for me, thank you.", "te": "నాకు చక్కెర వద్దు, ధన్యవాదాలు.", "hi": "मुझे चीनी नहीं चाहिए, धन्यवाद।"}},
                {"word": "Takeaway", "translit": "Takeaway / To go", "pron": "టేక్‌అవే / టు-గో / टेकअवे", "pos": "noun", "meanings": {"en": "Takeout / To go", "te": "పార్శిల్ / పట్టుకెళ్లడం", "hi": "पार्सल / ले जाना"}, "exTarget": "Two coffees to go, please.", "exTranslit": "Two coffees to go, please.", "exNative": {"en": "Two coffees to go, please.", "te": "దయచేసి రెండు కాఫీలు పార్శిల్ ఇవ్వండి.", "hi": "कृपया दो कॉफ़ी ले जाने के लिए दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you order a cappuccino politely?", "te": "క్యాపుచినోను మర్యాదగా ఎలా ఆర్డర్ చేస్తారు?", "hi": "कैपुचीनो का शिष्टता से ऑर्डर कैसे देंगे?"}, "prompt": {"en": "I would like a cappuccino, please", "te": "నాకు ఒక క్యాపుచినో ఇవ్వండి", "hi": "कृपया एक कैपुचीनो दीजिए"}, "correct": "I'd like a cappuccino, please", "options": ["I'd like a cappuccino, please", "Throw me coffee", "No drinks here", "Where is morning?"], "expl": {"en": "'I'd like a cappuccino, please' is the standard polite order.", "te": "'I'd like a cappuccino, please' సరైన వాక్యం.", "hi": "'I'd like a cappuccino, please' सही ऑर्डर है।"}}
            ]
        },
        {
            "title": {"en": "Dining Out & Menu Orders", "te": "రెస్టారెంట్‌లో భోజనం & మెనూ ఆర్డర్", "hi": "रेस्तरां में भोजन और मेनू"},
            "objective": {"en": "Book a table, read the menu, order starters and mains, and ask for recommendations.", "te": "టేబుల్ బుక్ చేసుకోవడం, మెనూ చూసి ఆర్డర్ చేయడం నేర్చుకోండి.", "hi": "टेबल बुक करना, मेनू पढ़ना और खाना मंगाना सीखें।"},
            "culturalTip": {"en": "In North America, tipping 15-20% of the bill is standard custom; in the UK, a 10-12.5% service charge is often included.", "te": "రెస్టారెంట్లలో బిల్లుపై టిప్పు (Tip) ఇవ్వడం విదేశాల్లో ఆచారం.", "hi": "पश्चिमी देशों में रेस्तरां में 15-20% टिप देना सामान्य शिष्टाचार है।"},
            "grammar": {
                "title": {"en": "Requesting Recommendations ('What do you recommend?')", "te": "సలహాలు అడగడం", "hi": "सिफ़ारिश पूछना"},
                "explanation": {"en": "Ask the server 'What is your specialty?' or 'What do you recommend?'.", "te": "సర్వర్‌ని ప్రత్యేక వంటకం గురించి అడగడానికి 'What do you recommend?' అంటారు.", "hi": "विशेष व्यंजन के बारे में पूछने के लिए 'What do you recommend?' कहें।"},
                "ruleSummary": {"en": "What do you recommend for dinner?", "te": "What do you recommend?", "hi": "आप क्या खाने की सलाह देंगे?"},
                "examples": [{"target": "Excuse me, what is the chef's special today?", "transliteration": "Excuse me, what is the chef's special today?", "native": {"en": "Excuse me, what is the chef's special today?", "te": "కొద్దిగా వినండి, ఈరోజు చెఫ్ స్పెషల్ ఏమిటి?", "hi": "सुनिए, आज का विशेष व्यंजन क्या है?"}}],
                "commonMistakes": [{"incorrect": "What good food here?", "correct": "What do you recommend here?", "explanation": {"en": "Use 'What do you recommend?'.", "te": "'What do you recommend?' అనాలి.", "hi": "'What do you recommend?' कहें।"}}]
            },
            "vocab": [
                {"word": "Menu", "translit": "Menu", "pron": "మెనూ / मेनू", "pos": "noun", "meanings": {"en": "Menu", "te": "మెనూ కార్డు", "hi": "मेनू सूची"}, "exTarget": "Could we see the dessert menu, please?", "exTranslit": "Could we see the dessert menu, please?", "exNative": {"en": "Could we see the dessert menu, please?", "te": "డెసర్ట్ మెనూ తీసుకురాగలరా?", "hi": "क्या हमें मीठे का मेनू मिल सकता है?"}},
                {"word": "Table", "translit": "Table", "pron": "టేబుల్ / टेबल", "pos": "noun", "meanings": {"en": "Table", "te": "టేబుల్ / బల్ల", "hi": "मेज़ / टेबल"}, "exTarget": "A table for four by the window, please.", "exTranslit": "A table for four by the window, please.", "exNative": {"en": "A table for four by the window, please.", "te": "కిటికీ దగ్గర నలుగురికి టేబుల్ కావాలి.", "hi": "खिड़की के पास चार लोगों के लिए टेबल दीजिए।"}},
                {"word": "Appetizer", "translit": "Appetizer / Starter", "pron": "యాపిటైజర్ / స్టార్టర్ / ऐपेटाइज़र", "pos": "noun", "meanings": {"en": "Starter / Appetizer", "te": "స్టార్టర్స్ / ప్రారంభ వంటకం", "hi": "शुरुआती नाश्ता / स्टार्टर"}, "exTarget": "We will start with soup as an appetizer.", "exTranslit": "We will start with soup as an appetizer.", "exNative": {"en": "We will start with soup as an appetizer.", "te": "మేము సూప్‌తో మొదలుపెడతాము.", "hi": "हम सूप से शुरुआत करेंगे।"}},
                {"word": "Delicious", "translit": "Delicious", "pron": "డెలిషియస్ / डिलीशियस", "pos": "adjective", "meanings": {"en": "Delicious / Tasty", "te": "చాలా రుచికరమైన", "hi": "अत्यंत स्वादिष्ट"}, "exTarget": "The pasta was absolutely delicious.", "exTranslit": "The pasta was absolutely delicious.", "exNative": {"en": "The pasta was absolutely delicious.", "te": "పాస్తా చాలా రుచిగా ఉంది.", "hi": "पास्ता सचमुच बहुत स्वादिष्ट था।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you request a table for two people?", "te": "ఇద్దరికి టేబుల్ కావాలని ఎలా అడుగుతారు?", "hi": "दो लोगों के लिए टेबल कैसे मांगेंगे?"}, "prompt": {"en": "A table for two, please", "te": "ఇద్దరికి ఒక టేబుల్ ఇవ్వండి", "hi": "दो लोगों के लिए एक टेबल दीजिए"}, "correct": "A table for two, please", "options": ["A table for two, please", "Two chairs on street", "No tables today", "Where is the kitchen?"], "expl": {"en": "'A table for two, please' is the natural way.", "te": "'A table for two, please' సరైన వాక్యం.", "hi": "'A table for two, please' सही वाक्य है।"}}
            ]
        },
        {
            "title": {"en": "Dietary Needs & Getting the Check", "te": "ఆహార నియమాలు & బిల్లు చెల్లించడం", "hi": "खानपान की ज़रूरतें और बिल"},
            "objective": {"en": "State allergies ('I am allergic to peanuts'), vegetarian options, and ask 'Could we get the check?'.", "te": "అలర్జీలు, శాకాహారం గురించి చెప్పడం మరియు బిల్లు అడగడం నేర్చుకోండి.", "hi": "एलर्जी, शाकाहार की जानकारी देना और बिल मांगना सीखें।"},
            "culturalTip": {"en": "Restaurants take food allergies extremely seriously; always inform staff upfront: 'Does this contain nuts/gluten?'.", "te": "ఆహారంలో నట్స్ లేదా గ్లూటెన్ అలర్జీ ఉంటే ముందే హోటల్ సిబ్బందికి చెప్పాలి.", "hi": "एलर्जी के बारे में वेटर को पहले ही बता देना अत्यंत आवश्यक है।"},
            "grammar": {
                "title": {"en": "Asking for the Bill ('Could we have the check, please?')", "te": "బిల్లు అడగడం (The check / The bill)", "hi": "बिल मांगना (The check / The bill)"},
                "explanation": {"en": "In US English use 'the check'; in UK English use 'the bill'.", "te": "అమెరికాలో 'the check', యూకేలో 'the bill' అంటారు.", "hi": "अमेरिका में 'the check' और ब्रिटेन में 'the bill' बोला जाता है।"},
                "ruleSummary": {"en": "Could we have the check, please?", "te": "Could we have the bill, please?", "hi": "क्या हमें बिल मिल सकता है?"},
                "examples": [{"target": "Could we get the check, please? We are ready to pay.", "transliteration": "Could we get the check, please? We are ready to pay.", "native": {"en": "Could we get the check, please? We are ready to pay.", "te": "దయచేసి బిల్లు తీసుకురాగలరా? మేము చెల్లించడానికి సిద్ధంగా ఉన్నాము.", "hi": "कृपया बिल लाइए, हम भुगतान करने के लिए तैयार हैं।"}}],
                "commonMistakes": [{"incorrect": "Give check now", "correct": "Could we have the check, please?", "explanation": {"en": "Always ask politely for the check.", "te": "మర్యాదగా 'Could we have the check, please?' అనాలి.", "hi": "हमेशा विनम्रता से बिल मांगें।"}}]
            },
            "vocab": [
                {"word": "Check / Bill", "translit": "Check / Bill", "pron": "చెక్ / బిల్ / चेक / बिल", "pos": "noun", "meanings": {"en": "Check / Bill", "te": "బిల్లు / రసీదు", "hi": "बिल / चेक"}, "exTarget": "Could you split the check between us?", "exTranslit": "Could you split the check between us?", "exNative": {"en": "Could you split the check between us?", "te": "బిల్లును మా ఇద్దరి మధ్య సమానంగా విభజించగలరా?", "hi": "क्या आप बिल को हमारे बीच आधा-आधा बांट सकते हैं?"}},
                {"word": "Vegetarian", "translit": "Vegetarian", "pron": "వెజిటేరియన్ / वेजीटेरियन", "pos": "adjective", "meanings": {"en": "Vegetarian", "te": "శాకాహారం", "hi": "शाकाहारी"}, "exTarget": "Do you have any vegetarian pasta options?", "exTranslit": "Do you have any vegetarian pasta options?", "exNative": {"en": "Do you have any vegetarian pasta options?", "te": "మీ వద్ద ఏదైనా శాకాహార పాస్తా ఉందా?", "hi": "क्या आपके पास शाकाहारी पास्ता का विकल्प है?"}},
                {"word": "Allergy", "translit": "Allergy", "pron": "అలర్జీ / एलर्जी", "pos": "noun", "meanings": {"en": "Allergy", "te": "అలర్జీ / పడనిది", "hi": "एलर्जी"}, "exTarget": "I have a severe peanut allergy.", "exTranslit": "I have a severe peanut allergy.", "exNative": {"en": "I have a severe peanut allergy.", "te": "నాకు వేరుశెనగ పడదు (తీవ్రమైన అలర్జీ).", "hi": "मुझे मूंगफली से गंभीर एलर्जी है।"}},
                {"word": "Water", "translit": "Water", "pron": "వాటర్ / वाटर", "pos": "noun", "meanings": {"en": "Water", "te": "మంచినీళ్లు", "hi": "पानी"}, "exTarget": "Could we get a jug of tap water, please?", "exTranslit": "Could we get a jug of tap water, please?", "exNative": {"en": "Could we get a jug of tap water, please?", "te": "దయచేసి ఒక జగ్గు మంచినీళ్లు ఇవ్వగలరా?", "hi": "कृपया पीने का पानी दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the restaurant bill in English?", "te": "రెస్టారెంట్‌లో బిల్లు తీసుకురమ్మని ఎలా అడుగుతారు?", "hi": "रेस्तरां में बिल कैसे मांगेंगे?"}, "prompt": {"en": "Could we have the check, please?", "te": "దయచేసి బిల్లు తీసుకురాగలరా?", "hi": "क्या हमें बिल मिल सकता है?"}, "correct": "Could we have the check, please?", "options": ["Could we have the check, please?", "I don't have money", "Throw the food", "Bring more tables"], "expl": {"en": "'Could we have the check, please?' is the standard request.", "te": "'Could we have the check, please?' సరైన వాక్యం.", "hi": "'Could we have the check, please?' सही वाक्य है।"}}
            ]
        }
    ],

    # MODULE 4: Real-Life Transit & Navigation
    [
        {
            "title": {"en": "Asking Directions & Finding Places", "te": "దారి అడగడం & స్థలాలు వెతకడం", "hi": "रास्ता पूछना और स्थान खोजना"},
            "objective": {"en": "Ask 'Where is the nearest...?' and follow directions (straight, left, right, block).", "te": "సమీపంలోని స్థలాలు ఎక్కడ ఉన్నాయో అడగడం మరియు దారులు తెలుసుకోవడం నేర్చుకోండి.", "hi": "नज़दीकी स्थान पूछना और दिशाएँ समझना सीखें।"},
            "culturalTip": {"en": "In Western cities, people often give directions in 'blocks' (e.g., 'walk two blocks down and turn left').", "te": "విదేశాల్లో దారి చెప్పేటప్పుడు 'blocks' (రెండు వీధుల దూరం) అని చెబుతారు.", "hi": "पश्चिमी देशों में दूरी 'ब्लॉक' में बताई जाती है (जैसे 2 ब्लॉक आगे)।"},
            "grammar": {
                "title": {"en": "Superlative for Convenience ('Nearest')", "te": "సమీపంలో ఉన్నది ('Nearest')", "hi": "सबसे नज़दीकी ('Nearest')"},
                "explanation": {"en": "Use 'Where is the nearest [Bank / Restroom]?' to locate services quickly.", "te": "సమీపంలో ఉన్న ప్రదేశం కనుక్కోవడానికి 'Where is the nearest...?' అంటారు.", "hi": "सबसे नज़दीकी स्थान ढूंढने के लिए 'Where is the nearest...?' पूछें।"},
                "ruleSummary": {"en": "Where is the nearest [Place]?", "te": "Where is the nearest [స్థలం]?", "hi": "सबसे नज़दीकी [स्थान] कहाँ है?"},
                "examples": [{"target": "Excuse me, where is the nearest subway station?", "transliteration": "Excuse me, where is the nearest subway station?", "native": {"en": "Excuse me, where is the nearest subway station?", "te": "కొద్దిగా వినండి, సమీపంలోని సబ్‌వే స్టేషన్ ఎక్కడ ఉంది?", "hi": "माफ़ कीजिए, सबसे नज़दीकी मेट्रो स्टेशन कहाँ है?"}}],
                "commonMistakes": [{"incorrect": "Where nearest subway?", "correct": "Where is the nearest subway station?", "explanation": {"en": "Include verb 'is' and article 'the'.", "te": "'Where is the nearest...' అనాలి.", "hi": "'Where is the nearest...' कहें।"}}]
            },
            "vocab": [
                {"word": "Straight", "translit": "Straight", "pron": "స్ట్రెయిట్ / स्ट्रेट", "pos": "adverb", "meanings": {"en": "Straight", "te": "తిన్నగా / సూటిగా", "hi": "सीधे"}, "exTarget": "Go straight for two hundred meters.", "exTranslit": "Go straight for two hundred meters.", "exNative": {"en": "Go straight for two hundred meters.", "te": "రెండు వందల మీటర్లు తిన్నగా వెళ్లండి.", "hi": "दो सौ मीटर सीधे जाइए।"}},
                {"word": "Turn left", "translit": "Turn left", "pron": "టర్న్ లెఫ్ట్ / टर्न लेफ़्ट", "pos": "phrase", "meanings": {"en": "Turn left", "te": "ఎడమవైపు తిరగండి", "hi": "बाईं ओर मुड़िए"}, "exTarget": "Turn left at the traffic light.", "exTranslit": "Turn left at the traffic light.", "exNative": {"en": "Turn left at the traffic light.", "te": "ట్రాఫిక్ లైట్ వద్ద ఎడమవైపు తిరగండి.", "hi": "ट्रैफ़िक लाइट पर बाईं तरफ मुड़िए।"}},
                {"word": "Turn right", "translit": "Turn right", "pron": "టర్న్ రైట్ / टर्न राइट", "pos": "phrase", "meanings": {"en": "Turn right", "te": "కుడివైపు తిరగండి", "hi": "दाहिनी ओर मुड़िए"}, "exTarget": "Turn right after passing the bank.", "exTranslit": "Turn right after passing the bank.", "exNative": {"en": "Turn right after passing the bank.", "te": "బ్యాంకు దాటిన తర్వాత కుడివైపు తిరగండి.", "hi": "बैंक के बाद दाहिनी तरफ मुड़िए।"}},
                {"word": "Restroom", "translit": "Restroom / Bathroom", "pron": "రెస్ట్‌రూమ్ / బాత్‌రూమ్ / रेस्टथरूम", "pos": "noun", "meanings": {"en": "Restroom / Toilet", "te": "వాష్‌రూమ్ / టాయిలెట్", "hi": "शौचालय / वॉशरूम"}, "exTarget": "Could you tell me where the restrooms are?", "exTranslit": "Could you tell me where the restrooms are?", "exNative": {"en": "Could you tell me where the restrooms are?", "te": "వాష్‌రూమ్‌లు ఎక్కడ ఉన్నాయో చెప్పగలరా?", "hi": "क्या आप बता सकते हैं कि शौचालय कहाँ है?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the nearest pharmacy in English?", "te": "సమీపంలోని మందుల షాపు ఎక్కడ ఉందో ఎలా అడుగుతారు?", "hi": "सबसे नज़दीकी दवा की दुकान कैसे पूछेंगे?"}, "prompt": {"en": "Where is the nearest pharmacy?", "te": "సమీపంలోని ఫార్మసీ ఎక్కడ ఉంది?", "hi": "नज़दीकी फ़ार्मेसी कहाँ है?"}, "correct": "Where is the nearest pharmacy?", "options": ["Where is the nearest pharmacy?", "Pharmacy is far away", "I don't need medicine", "Go back home"], "expl": {"en": "'Where is the nearest pharmacy?' is correct.", "te": "'Where is the nearest pharmacy?' సరైన ప్రశ్న.", "hi": "'Where is the nearest pharmacy?' सही प्रश्न है।"}}
            ]
        },
        {
            "title": {"en": "Subway, Trains & Ride-Sharing", "te": "సబ్‌వే, రైళ్లు & క్యాబ్‌లు", "hi": "मेट्रो, ट्रेन और टैक्सी"},
            "objective": {"en": "Buy transit tickets, ask platforms, and book rides on Uber/Lyft.", "te": "సబ్‌వే కార్డు కొనడం, ప్లాట్‌ఫారమ్ తెలుసుకోవడం మరియు ఉబెర్ బుక్ చేయడం నేర్చుకోండి.", "hi": "मेट्रो कार्ड लेना, प्लेटफ़ॉर्म पूछना और उबर बुक करना सीखें।"},
            "culturalTip": {"en": "On subway escalators, the universal rule is 'Stand on the right, walk on the left' so rushing commuters can pass.", "te": "సబ్‌వే ఎస్కలేటర్లపై కుడివైపు నిలబడాలి, ఎడమవైపు నడిచేవారికి దారి ఇవ్వాలి.", "hi": "एस्केलेटर पर दाईं तरफ खड़े रहें और बाईं तरफ चलने वालों को रास्ता दें।"},
            "grammar": {
                "title": {"en": "Asking Platform / Train Lines ('Which line / platform?')", "te": "ప్లాట్‌ఫారమ్ అడగడం", "hi": "प्लेटफ़ॉर्म पूछना"},
                "explanation": {"en": "Ask 'Which platform does the train to [Destination] leave from?'.", "te": "రైలు ఏ ప్లాట్‌ఫారమ్ నుంచి బయలుదేరుతుందో తెలుసుకోవడానికి ఈ వాక్యం వాడతారు.", "hi": "ट्रेन का प्लेटफ़ॉर्म जानने के लिए 'Which platform...?' पूछें।"},
                "ruleSummary": {"en": "Which platform for the airport train?", "te": "Which platform for [గమ్యం]?", "hi": "किस प्लेटफ़ॉर्म पर गाड़ी आएगी?"},
                "examples": [{"target": "Which platform does the train to Oxford leave from?", "transliteration": "Which platform does the train to Oxford leave from?", "native": {"en": "Which platform does the train to Oxford leave from?", "te": "ఆక్స్‌ఫర్డ్ వెళ్లే రైలు ఏ ప్లాట్‌ఫారమ్ నుంచి బయలుదేరుతుంది?", "hi": "ऑक्सफ़ोर्ड जाने वाली ट्रेन किस प्लेटफ़ॉर्म से जाएगी?"}}],
                "commonMistakes": [{"incorrect": "What platform train go?", "correct": "Which platform does the train leave from?", "explanation": {"en": "Use 'Which platform does the train leave from?'.", "te": "'Which platform does the train leave from?' అనాలి.", "hi": "'Which platform does the train leave from?' कहें।"}}]
            },
            "vocab": [
                {"word": "Platform", "translit": "Platform", "pron": "ప్లాట్‌ఫారమ్ / प्लेटफ़ॉर्म", "pos": "noun", "meanings": {"en": "Platform", "te": "ప్లాట్‌ఫారమ్", "hi": "प्लेटफ़ॉर्म"}, "exTarget": "The express train is arriving on platform three.", "exTranslit": "The express train is arriving on platform three.", "exNative": {"en": "The express train is arriving on platform three.", "te": "ఎక్స్‌ప్రెస్ రైలు మూడవ ప్లాట్‌ఫారమ్‌కు వస్తోంది.", "hi": "एक्सप्रेस ट्रेन प्लेटफ़ॉर्म नंबर तीन पर आ रही है।"}},
                {"word": "Ticket", "translit": "Ticket", "pron": "టికెట్ / टिकट", "pos": "noun", "meanings": {"en": "Ticket", "te": "టికెట్", "hi": "टिकट"}, "exTarget": "A round-trip ticket to Central Station, please.", "exTranslit": "A round-trip ticket to Central Station, please.", "exNative": {"en": "A round-trip ticket to Central Station, please.", "te": "సెంట్రల్ స్టేషన్‌కు రిటర్న్ టికెట్ ఇవ్వండి.", "hi": "सेंट्रल स्टेशन के लिए रिटर्न टिकट दीजिए।"}},
                {"word": "Airport", "translit": "Airport", "pron": "ఎయిర్‌పోర్ట్ / एयरपोर्ट", "pos": "noun", "meanings": {"en": "Airport", "te": "విమానాశ్రయం / ఎయిర్‌పోర్ట్", "hi": "हवाई अड्डा / एयरपोर्ट"}, "exTarget": "How long does it take to reach the airport?", "exTranslit": "How long does it take to reach the airport?", "exNative": {"en": "How long does it take to reach the airport?", "te": "ఎయిర్‌పోర్ట్ చేరుకోవడానికి ఎంత సమయం పడుతుంది?", "hi": "हवाई अड्डे पहुँचने में कितना समय लगता है?"}},
                {"word": "Taxi / Ride", "translit": "Taxi / Ride", "pron": "టాక్సీ / క్యాబ్ / टैक्सी", "pos": "noun", "meanings": {"en": "Taxi / Cab / Uber", "te": "టాక్సీ / క్యాబ్", "hi": "टैक्सी / कैब"}, "exTarget": "My Uber driver has arrived outside.", "exTranslit": "My Uber driver has arrived outside.", "exNative": {"en": "My Uber driver has arrived outside.", "te": "నా ఉబెర్ డ్రైవర్ బయటకు వచ్చారు.", "hi": "मेरा उबर ड्राइवर बाहर आ गया है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for a return ticket in English?", "te": "రానుపోను (రౌండ్-ట్రిప్) టికెట్ ఎలా అడుగుతారు?", "hi": "आने-जाने का टिकट कैसे मांगेंगे?"}, "prompt": {"en": "A round-trip ticket, please", "te": "రౌండ్-ట్రిప్ టికెట్ ఇవ్వండి", "hi": "एक राउंड-ट्रिप टिकट दीजिए"}, "correct": "A round-trip ticket, please", "options": ["A round-trip ticket, please", "Free ride please", "Stop all trains", "Walk to station"], "expl": {"en": "'A round-trip ticket, please' is correct.", "te": "'A round-trip ticket, please' సరైన పద్ధతి.", "hi": "'A round-trip ticket, please' सही वाक्य है।"}}
            ]
        },
        {
            "title": {"en": "Hotel Check-In & Lodging", "te": "హోటల్ చెక్-ఇన్ & వసతి", "hi": "होटल चेक-इन और ठहरना"},
            "objective": {"en": "Check into your hotel, ask about breakfast hours, WiFi passwords, and luggage storage.", "te": "హోటల్‌లో చెక్-ఇన్ అవ్వడం, బ్రేక్‌ఫాస్ట్ వేళలు మరియు వైఫై పాస్‌వర్డ్ అడగడం నేర్చుకోండి.", "hi": "होटल में चेक-इन, नाश्ते का समय और वाई-फ़ाई पासवर्ड पूछना सीखें।"},
            "culturalTip": {"en": "Most hotels have check-in at 3:00 PM and check-out at 11:00 AM; asking to store luggage if you arrive early is complimentary.", "te": "ముందుగా చేరుకుంటే లగేజీని హోటల్‌లో భద్రపరచమని (Luggage storage) అడగవచ్చు.", "hi": "जल्दी पहुँचने पर होटल में सामान रखवाने की निःशुल्क सुविधा मांग सकते हैं।"},
            "grammar": {
                "title": {"en": "Checking In ('I have a reservation under...')", "te": "రిజర్వేషన్ చెప్పడం", "hi": "आरक्षण बताना"},
                "explanation": {"en": "Say 'Hi, I have a reservation under the name [Your Name]'.", "te": "హోటల్ కౌంటర్‌లో 'I have a reservation under [మీ పేరు]' అనాలి.", "hi": "होटल रिसेप्शन पर 'I have a reservation under [नाम]' बोलें।"},
                "ruleSummary": {"en": "I have a reservation under [Name].", "te": "I have a reservation under [పేరు].", "hi": "मेरे नाम पर एक आरक्षण है।"},
                "examples": [{"target": "Good afternoon, I have a reservation under John Doe for three nights.", "transliteration": "Good afternoon, I have a reservation under John Doe for three nights.", "native": {"en": "Good afternoon, I have a reservation under John Doe for three nights.", "te": "శుభ మధ్యాహ్నం, జాన్ డో పేరు మీద మూడు రోజులకు రిజర్వేషన్ ఉంది.", "hi": "शुभ दोपहर, जॉन डो के नाम पर तीन रातों के लिए बुकिंग है।"}}],
                "commonMistakes": [{"incorrect": "I booked room give key", "correct": "I have a reservation under my name.", "explanation": {"en": "State your reservation politely.", "te": "మర్యాదగా రిజర్వేషన్ తెలపండి.", "hi": "विनम्रता से आरक्षण बताएं।"}}]
            },
            "vocab": [
                {"word": "Reservation", "translit": "Reservation / Booking", "pron": "రిజర్వేషన్ / బూకింగ్ / रिज़र्वेशन", "pos": "noun", "meanings": {"en": "Reservation / Booking", "te": "రిజర్వేషన్ / బుకింగ్", "hi": "बुकिंग / आरक्षण"}, "exTarget": "Here is my reservation confirmation number.", "exTranslit": "Here is my reservation confirmation number.", "exNative": {"en": "Here is my reservation confirmation number.", "te": "ఇదిగోండి నా బుకింగ్ కన్ఫర్మేషన్ నంబర్.", "hi": "यह रहा मेरा बुकिंग कन्फर्मेशन नंबर।"}},
                {"word": "Keycard", "translit": "Keycard", "pron": "కీకార్డ్ / कीकार्ड", "pos": "noun", "meanings": {"en": "Room keycard", "te": "రూమ్ కీకార్డ్", "hi": "कमरे का कीकार्ड"}, "exTarget": "Here are your keycards for room 402.", "exTranslit": "Here are your keycards for room 402.", "exNative": {"en": "Here are your keycards for room 402.", "te": "ఇదిగోండి రూమ్ 402 కీకార్డులు.", "hi": "ये रहे कमरा नंबर 402 के कीकार्ड।"}},
                {"word": "Breakfast", "translit": "Breakfast", "pron": "బ్రేక్‌ఫాస్ట్ / ब्रेकफ़ास्ट", "pos": "noun", "meanings": {"en": "Breakfast", "te": "అల్పాహారం / బ్రేక్‌ఫాస్ట్", "hi": "नाश्ता / ब्रेकफ़ास्ट"}, "exTarget": "What time is complimentary breakfast served?", "exTranslit": "What time is complimentary breakfast served?", "exNative": {"en": "What time is complimentary breakfast served?", "te": "ఉచిత అల్పాహారం ఏ సమయానికి అందిస్తారు?", "hi": "मुफ़्त नाश्ता किस समय परोसा जाता है?"}},
                {"word": "Luggage", "translit": "Luggage / Baggage", "pron": "లగేజ్ / లగేజీ / लगेज", "pos": "noun", "meanings": {"en": "Luggage / Bags", "te": "సామాన్లు / లగేజీ", "hi": "सामान / लगेज"}, "exTarget": "Could you hold our luggage until check-in?", "exTranslit": "Could you hold our luggage until check-in?", "exNative": {"en": "Could you hold our luggage until check-in?", "te": "చెక్-ఇన్ అయ్యే వరకు మా లగేజీని భద్రపరచగలరా?", "hi": "क्या आप चेक-इन तक हमारा सामान रख सकते हैं?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you state your hotel booking upon arrival?", "te": "హోటల్ వద్ద బుకింగ్ ఉందని ఎలా చెబుతారు?", "hi": "होटल पहुँचकर बुकिंग की जानकारी कैसे देंगे?"}, "prompt": {"en": "I have a reservation under my name", "te": "నా పేరు మీద రిజర్వేషన్ ఉంది", "hi": "मेरे नाम पर बुकिंग है"}, "correct": "I have a reservation under my name", "options": ["I have a reservation under my name", "No rooms here", "Give me a car", "Where is the beach?"], "expl": {"en": "'I have a reservation under my name' is the standard phrase.", "te": "'I have a reservation under my name' సరైన వాక్యం.", "hi": "'I have a reservation under my name' सही वाक्य है।"}}
            ]
        }
    ],

    # MODULE 5: Social Fluency & Urgent Help
    [
        {
            "title": {"en": "Making Friends & Small Talk", "te": "స్నేహం చేయడం & సరదా సంభాషణ", "hi": "दोस्त बनाना और छोटी बातचीत"},
            "objective": {"en": "Chat about weather, hobbies, weekend plans, and exchange contact info (Instagram, LinkedIn).", "te": "వాతావరణం, అలవాట్లు మరియు వారాంతపు ప్రణాళికల గురించి సంభాషించడం నేర్చుకోండి.", "hi": "मौसम, शौक और सप्ताहांत की योजनाओं पर बात करना सीखें।"},
            "culturalTip": {"en": "Commenting on the weather ('Lovely weather today, isn't it?') is the quintessential English conversation starter with anyone.", "te": "వాతావరణం గురించి మాట్లాడటం ఆంగ్లేయులతో సంభాషణ ప్రారంభించడానికి అత్యంత సాధారణ మార్గం.", "hi": "मौसम पर टिप्पणी करना अंग्रेज़ी में बातचीत शुरू करने का सबसे आम तरीका है।"},
            "grammar": {
                "title": {"en": "Tag Questions for Friendly Agreement ('..., isn't it?')", "te": "ఒప్పుకోలు ప్రశ్నలు (..., isn't it?)", "hi": "टैग प्रश्न (..., isn't it?)"},
                "explanation": {"en": "Add ', isn't it?' or ', right?' to invite the other person into conversation.", "te": "ఎదుటివారి అభిప్రాయం తెలుసుకోవడానికి വാక్యం చివర Tag questions వాడతారు.", "hi": "बातचीत को आगे बढ़ाने के लिए वाक्य के अंत में टैग प्रश्न जोड़ें।"},
                "ruleSummary": {"en": "It's a beautiful day, isn't it?", "te": "It's great, isn't it?", "hi": "यह बहुत अच्छा है, है ना?"},
                "examples": [{"target": "The view from here is amazing, isn't it?", "transliteration": "The view from here is amazing, isn't it?", "native": {"en": "The view from here is amazing, isn't it?", "te": "ఇక్కడి నుంచి దృశ్యం అద్భుతంగా ఉంది కదూ?", "hi": "यहाँ से नज़ारा अद्भुत है, है ना?"}}],
                "commonMistakes": [{"incorrect": "Today is good weather, no?", "correct": "Lovely day today, isn't it?", "explanation": {"en": "Use tag questions like 'isn't it?' instead of trailing 'no?'.", "te": "'..., isn't it?' అనాలి.", "hi": "'..., isn't it?' कहें।"}}]
            },
            "vocab": [
                {"word": "Weather", "translit": "Weather", "pron": "వెదర్ / वेदर", "pos": "noun", "meanings": {"en": "Weather", "te": "వాతావరణం", "hi": "मौसम"}, "exTarget": "The weather forecast predicts sunny skies.", "exTranslit": "The weather forecast predicts sunny skies.", "exNative": {"en": "The weather forecast predicts sunny skies.", "te": "వాతావరణ సూచన ఎండగా ఉంటుందని చెబుతోంది.", "hi": "मौसम विभाग ने धूप की संभावना जताई है।"}},
                {"word": "Weekend", "translit": "Weekend", "pron": "వీకెండ్ / वीकेंड", "pos": "noun", "meanings": {"en": "Weekend (Sat-Sun)", "te": "వారాంతం / వీకెండ్", "hi": "सप्ताहांत / वीकेंड"}, "exTarget": "What are your plans for the weekend?", "exTranslit": "What are your plans for the weekend?", "exNative": {"en": "What are your plans for the weekend?", "te": "ఈ వీకెండ్‌కు మీ ప్లాన్స్ ఏమిటి?", "hi": "वीकेंड के लिए आपकी क्या योजना है?"}},
                {"word": "Hobby", "translit": "Hobby", "pron": "హాబీ / हॉबी", "pos": "noun", "meanings": {"en": "Hobby / Pastime", "te": "వ్యాపకం / అభిరుచి", "hi": "शौक / हॉबी"}, "exTarget": "Photography has always been my hobby.", "exTranslit": "Photography has always been my hobby.", "exNative": {"en": "Photography has always been my hobby.", "te": "ఫోటోగ్రఫీ ఎల్లప్పుడూ నా అభిరుచి.", "hi": "फ़ोटोग्राफ़ी हमेशा से मेरा शौक रहा है।"}},
                {"word": "Keep in touch", "translit": "Keep in touch", "pron": "కీప్ ఇన్ టచ్ / कीप इन टच", "pos": "phrase", "meanings": {"en": "Stay connected", "te": "టచ్‌లో ఉండటం / కలుస్తూ ఉండటం", "hi": "सम्पर्क में रहना"}, "exTarget": "Let's definitely keep in touch on WhatsApp.", "exTranslit": "Let's definitely keep in touch on WhatsApp.", "exNative": {"en": "Let's definitely keep in touch on WhatsApp.", "te": "వాట్సాప్‌లో కలుస్తూ ఉందాం.", "hi": "व्हाट्सएप पर ज़रूर संपर्क में रहें।"}}
            ],
            "exercises": [
                {"instruction": {"en": "What is a natural English conversation starter about the weather?", "te": "వాతావరణం గురించి సంభాషణ మొదలుపెట్టే సహజమైన వాక్యం ఏది?", "hi": "मौसम पर बातचीत शुरू करने के लिए स्वाभाविक वाक्य कौन सा है?"}, "prompt": {"en": "Lovely day, isn't it?", "te": "ఈరోజు వాతావరణం చాలా బాగుంది కదూ?", "hi": "आज कितना सुहावना दिन है, है ना?"}, "correct": "Lovely day today, isn't it?", "options": ["Lovely day today, isn't it?", "Stop talking to me", "I dislike sun", "Where is my money?"], "expl": {"en": "'Lovely day today, isn't it?' is the classic friendly opener.", "te": "'Lovely day today, isn't it?' ఉత్తమ ప్రారంభ వాక్యం.", "hi": "'Lovely day today, isn't it?' क्लासिक शुरुआत है।"}}
            ]
        },
        {
            "title": {"en": "Medical Needs & Pharmacy", "te": "వైద్య సహాయం & మందుల షాపు", "hi": "चिकित्सा सहायता और दवाई"},
            "objective": {"en": "Describe symptoms (fever, sore throat, stomach ache), buy pain relief, and see a doctor.", "te": "జ్వరం, గొంతునొప్పి వంటి లక్షణాలు చెప్పి ఫార్మసీలో మందులు కొనడం నేర్చుకోండి.", "hi": "बुखार, गले में खराश के लक्षण बताकर दवा खरीदना सीखें।"},
            "culturalTip": {"en": "Over-the-counter (OTC) medications like paracetamol or ibuprofen can be bought without prescription at supermarkets and chemists.", "te": "సాధారణ నొప్పుల మందులు (Paracetamol) ప్రిస్క్రిప్షన్ లేకుండానే ఫార్మసీలలో దొరుకుతాయి.", "hi": "पेरासिटामोल जैसी सामान्य दवाइयां बिना पर्ची के फ़ार्मेसी में मिल जाती हैं।"},
            "grammar": {
                "title": {"en": "Expressing Symptoms ('I have a ... / My ... hurts')", "te": "లక్షణాలు చెప్పడం", "hi": "लक्षण बताना"},
                "explanation": {"en": "Say 'I have a headache / sore throat' or 'My shoulder hurts'.", "te": "నొప్పి లేదా సమస్య చెప్పడానికి 'I have a...' లేదా 'My... hurts' వాడతారు.", "hi": "तकलीफ़ बताने के लिए 'I have a...' या 'My... hurts' बोलें।"},
                "ruleSummary": {"en": "I have a headache / I feel dizzy.", "te": "I have a headache.", "hi": "मुझे सिरदर्द है।" },
                "examples": [{"target": "I have a terrible headache and fever; do you have paracetamol?", "transliteration": "I have a terrible headache and fever; do you have paracetamol?", "native": {"en": "I have a terrible headache and fever; do you have paracetamol?", "te": "నాకు తీవ్రమైన తలనొప్పి మరియు జ్వరం ఉంది; పారాసిటమాల్ ఉందా?", "hi": "मुझे तेज़ सिरदर्द और बुखार है; क्या आपके पास पेरासिटामोल है?"}}],
                "commonMistakes": [{"incorrect": "My head paining", "correct": "I have a headache / My head hurts", "explanation": {"en": "Say 'I have a headache', not 'head paining'.", "te": "'I have a headache' అనాలి.", "hi": "'I have a headache' कहें।"}}]
            },
            "vocab": [
                {"word": "Headache", "translit": "Headache", "pron": "హెడేక్ / हेडेक", "pos": "noun", "meanings": {"en": "Headache", "te": "తలనొప్పి", "hi": "सिरदर्द"}, "exTarget": "I need some painkillers for a bad headache.", "exTranslit": "I need some painkillers for a bad headache.", "exNative": {"en": "I need some painkillers for a bad headache.", "te": "తీవ్రమైన తలనొప్పికి పెయిన్‌కిల్లర్స్ కావాలి.", "hi": "सिरदर्द के लिए दर्दनिवारक गोली चाहिए।"}},
                {"word": "Fever", "translit": "Fever", "pron": "ఫీవర్ / फ़ीवर", "pos": "noun", "meanings": {"en": "Fever / Temperature", "te": "జ్వరం", "hi": "बुखार"}, "exTarget": "The thermometer shows a high fever.", "exTranslit": "The thermometer shows a high fever.", "exNative": {"en": "The thermometer shows a high fever.", "te": "థర్మామీటర్‌లో ఎక్కువ జ్వరం చూపిస్తోంది.", "hi": "थर्मामीटर में तेज़ बुखार दिख रहा है।"}},
                {"word": "Prescription", "translit": "Prescription", "pron": "ప్రిస్క్రిప్షన్ / प्रिस्क्रिप्शन", "pos": "noun", "meanings": {"en": "Doctor's prescription", "te": "వైద్యుని చీటీ / ప్రిస్క్రిప్షన్", "hi": "डॉक्टर का पर्चा / प्रिस्क्रिप्शन"}, "exTarget": "The chemist checked the doctor's prescription.", "exTranslit": "The chemist checked the doctor's prescription.", "exNative": {"en": "The chemist checked the doctor's prescription.", "te": "ఫార్మసిస్ట్ డాక్టర్ చీటీని పరిశీలించారు.", "hi": "दवा विक्रेता ने डॉक्टर का पर्चा देखा।"}},
                {"word": "Hospital", "translit": "Hospital", "pron": "హాస్పిటల్ / हॉस्पिटल", "pos": "noun", "meanings": {"en": "Hospital", "te": "ఆసుపత్రి / హాస్పిటల్", "hi": "अस्पताल"}, "exTarget": "Please take me to the nearest emergency hospital.", "exTranslit": "Please take me to the nearest emergency hospital.", "exNative": {"en": "Please take me to the nearest emergency hospital.", "te": "దయచేసి నన్ను సమీపంలోని అత్యవసర ఆసుపత్రికి తీసుకెళ్లండి.", "hi": "कृपया मुझे सबसे नज़दीकी आपातकालीन अस्पताल ले चलें।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you explain having a headache in English?", "te": "తలనొప్పి ఉందని సరైన ఆంగ్లంలో ఎలా చెబుతారు?", "hi": "सिरदर्द होने की बात अंग्रेज़ी में कैसे कहेंगे?"}, "prompt": {"en": "I have a headache", "te": "నాకు తలనొప్పి ఉంది", "hi": "मुझे सिरदर्द है"}, "correct": "I have a headache", "options": ["I have a headache", "My head is running", "Pain in table", "Fever is smiling"], "expl": {"en": "'I have a headache' is grammatically correct.", "te": "'I have a headache' సరైన వాక్యం.", "hi": "'I have a headache' सही वाक्य है।"}}
            ]
        },
        {
            "title": {"en": "Emergencies & Lost Items", "te": "అత్యవసర పరిస్థితులు & పోయిన వస్తువులు", "hi": "आपातकालीन स्थिति और खोया सामान"},
            "objective": {"en": "Call emergency numbers (911 / 999), shout 'Help!', and report lost passports or wallets.", "te": "అత్యవసర సహాయం కోరడం, పోయిన పాస్‌పోర్ట్ లేదా పర్స్ పోలీసులకు నివేదించడం నేర్చుకోండి.", "hi": "आपातकालीन नंबर डायल करना और खोया पासपोर्ट रिपोर्ट करना सीखें।"},
            "culturalTip": {"en": "Emergency dial numbers: 911 in the USA/Canada, 999 in the UK, 112 in the European Union and India.", "te": "అత్యవసర నంబర్లు: అమెరికాలో 911, యూకేలో 999, భారత్ మరియు ఐరోపాలో 112.", "hi": "आपातकालीन नंबर: अमेरिका में 911, ब्रिटेन में 999 और भारत/यूरोप में 112।"},
            "grammar": {
                "title": {"en": "Reporting Loss ('I have lost my ... / My ... was stolen')", "te": "వస్తువు పోయిందని చెప్పడం", "hi": "सामान खोने की रिपोर्ट करना"},
                "explanation": {"en": "Use 'I have lost my [Wallet / Passport]' or 'My phone was stolen'.", "te": "వస్తువు పోయినప్పుడు 'I have lost my...' లేదా 'My... was stolen' వాడాలి.", "hi": "सामान खोने पर 'I have lost my...' या चोरी होने पर 'My... was stolen' बोलें।"},
                "ruleSummary": {"en": "I lost my passport / Please call the police!", "te": "I lost my passport.", "hi": "मेरा पासपोर्ट खो गया है।" },
                "examples": [{"target": "Help! Someone stole my wallet on the train!", "transliteration": "Help! Someone stole my wallet on the train!", "native": {"en": "Help! Someone stole my wallet on the train!", "te": "సహాయం చేయండి! రైలులో ఎవరో నా వాలెట్ దొంగిలించారు!", "hi": "मदद कीजिए! ट्रेन में किसी ने मेरा पर्स चुरा लिया!"}}],
                "commonMistakes": [{"incorrect": "My passport lost himself", "correct": "I have lost my passport", "explanation": {"en": "Say 'I have lost my passport'.", "te": "'I have lost my passport' అనాలి.", "hi": "'I have lost my passport' कहें।"}}]
            },
            "vocab": [
                {"word": "Help", "translit": "Help", "pron": "హెల్ప్ / हेल्प", "pos": "verb", "meanings": {"en": "Help! / Assist", "te": "సహాయం చేయండి!", "hi": "मदद कीजिए! / सहायता"}, "exTarget": "Help! Please call an ambulance immediately!", "exTranslit": "Help! Please call an ambulance immediately!", "exNative": {"en": "Help! Please call an ambulance immediately!", "te": "సహాయం చేయండి! వెంటనే అంబులెన్స్‌కు ఫోన్ చేయండి!", "hi": "मदद कीजिए! तुरंत एम्बुलेंस को कॉल कीजिए!"}},
                {"word": "Police", "translit": "Police", "pron": "పోలీస్ / पुलिस", "pos": "noun", "meanings": {"en": "Police", "te": "పోలీసులు", "hi": "पुलिस"}, "exTarget": "Where is the nearest police station?", "exTranslit": "Where is the nearest police station?", "exNative": {"en": "Where is the nearest police station?", "te": "సమీపంలోని పోలీస్ స్టేషన్ ఎక్కడ ఉంది?", "hi": "सबसे नज़दीकी पुलिस स्टेशन कहाँ है?"}},
                {"word": "Passport", "translit": "Passport", "pron": "పాస్‌పోర్ట్ / पासपोर्ट", "pos": "noun", "meanings": {"en": "Passport", "te": "పాస్‌పోర్ట్", "hi": "पासपोर्ट"}, "exTarget": "I urgently need to report a lost passport to the embassy.", "exTranslit": "I urgently need to report a lost passport to the embassy.", "exNative": {"en": "I urgently need to report a lost passport to the embassy.", "te": "పోయిన పాస్‌పోర్ట్ గురించి ఎంబసీకి నివేదించాలి.", "hi": "मुझे दूतावास में खोए हुए पासपोर्ट की रिपोर्ट करनी है।"}},
                {"word": "Emergency", "translit": "Emergency", "pron": "ఎమర్జెన్సీ / इमरजेंसी", "pos": "noun", "meanings": {"en": "Emergency", "te": "అత్యవసర పరిస్థితి", "hi": "आपातकाल / संकट"}, "exTarget": "This is a serious medical emergency.", "exTranslit": "This is a serious medical emergency.", "exNative": {"en": "This is a serious medical emergency.", "te": "ఇది తీవ్రమైన వైద్య అత్యవసర పరిస్థితి.", "hi": "यह गंभीर चिकित्सा आपातकाल है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you urgently call for help in English?", "te": "అత్యవసరంగా సహాయం కోసం ఎలా పిలుస్తారు?", "hi": "आपातकाल में मदद के लिए कैसे पुकारेंगे?"}, "prompt": {"en": "Help! Please call the police!", "te": "సహాయం చేయండి! పోలీసులను పిలవండి!", "hi": "मदद कीजिए! पुलिस को बुलाइए!"}, "correct": "Help! Please call the police!", "options": ["Help! Please call the police!", "Hello good morning", "I want tea", "Goodbye friends"], "expl": {"en": "'Help! Please call the police!' is the direct emergency call.", "te": "'Help! Please call the police!' సరైన అత్యవసర పిలుపు.", "hi": "'Help! Please call the police!' सही आपातकालीन पुकार है।"}}
            ]
        }
    ]
]
