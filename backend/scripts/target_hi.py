# scripts/target_hi.py
# -*- coding: utf-8 -*-
"""15 Real-Life Situational Hindi Lessons across 5 Modules."""

HI_LESSONS = [
    # MODULE 1: Everyday Survival & Greetings
    [
        {
            "title": {"en": "Daily Greetings & Hello", "te": "రోజువారీ శుభాకాంక్షలు (नमस्ते)", "hi": "दैनिक अभिवादन (नमस्ते)"},
            "objective": {"en": "Master नमस्ते (Namaste), धन्यवाद, and daily polite greetings in Hindi.", "te": "నమస్కారం, ధన్యవాదాలు మరియు దైనందిన హిందీ పలకరింపులు నేర్చుకోండి.", "hi": "नमस्ते, धन्यवाद और दैनिक शिष्टाचार सीखें।"},
            "culturalTip": {"en": "Joining both palms at chest level and saying 'नमस्ते' (Namaste) shows deep cultural respect.", "te": "రెండు చేతులు జోడించి 'नमस्ते' అనడం హిందీలో గౌరవప్రదమైన నమస్కారం.", "hi": "दोनों हाथ जोड़कर 'नमस्ते' कहना भारतीय संस्कृति का प्रतीक है।"},
            "grammar": {
                "title": {"en": "Levels of Respect (आप vs तुम vs तू)", "te": "గౌరవ సంబోధన (మీరు vs నువ్వు)", "hi": "आदरणीय स्तर (आप बनाम तुम)"},
                "explanation": {"en": "Always use 'आप' (Aap) with elders and strangers; 'तुम' (Tum) with friends.", "te": "గౌరవంగా 'आप' (మీరు), స్నేహితులతో 'तुम' (నువ్వు) వాడాలి.", "hi": "हमेशा बड़ों और अजनबियों से 'आप' कहें।"},
                "ruleSummary": {"en": "आप कैसे हैं? (Formal) vs तुम कैसे हो? (Informal).", "te": "మీరు ఎలా ఉన్నారు? (आप कैसे हैं?)", "hi": "आप कैसे हैं? (विनम्र रूप)"},
                "examples": [{"target": "नमस्ते! आप कैसे हैं?", "transliteration": "Namaste! Aap kaise hain?", "native": {"en": "Hello! How are you?", "te": "నమస్కారం! మీరు ఎలా ఉన్నారు?", "hi": "नमस्ते! आप कैसे हैं?"}}],
                "commonMistakes": [{"incorrect": "तू कैसा है (to elders)", "correct": "आप कैसे हैं?", "explanation": {"en": "Never use तू with adults or strangers.", "te": "పెద్దవారితో మాట్లాడేటప్పుడు 'आप' మాత్రమే వాడాలి.", "hi": "बड़ों से हमेशा 'आप' कहें।"}}]
            },
            "vocab": [
                {"word": "नमस्ते", "translit": "Namaste", "pron": "న-మస్-తే", "pos": "greeting", "meanings": {"en": "Hello / Greetings", "te": "నమస్కారం / బాగున్నారా", "hi": "नमस्ते / हैलो"}, "exTarget": "नमस्ते! शुभ प्रभात।", "exTranslit": "Namaste! Shubh prabhat.", "exNative": {"en": "Hello! Good morning.", "te": "నమస్కారం! శుభోదయం.", "hi": "नमस्ते! शुभ प्रभात।"}},
                {"word": "धन्यवाद", "translit": "Dhanyavaad", "pron": "ధన్-య-వాద్", "pos": "phrase", "meanings": {"en": "Thank you", "te": "ధన్యవాదాలు", "hi": "धन्यवाद"}, "exTarget": "आपकी मदद के लिए धन्यवाद।", "exTranslit": "Aapki madad ke liye dhanyavaad.", "exNative": {"en": "Thank you for your help.", "te": "మీ సహాయానికి ధన్యవాదాలు.", "hi": "आपकी सहायता के लिए धन्यवाद।"}},
                {"word": "अलविदा", "translit": "Alvida", "pron": "అల్-వి-దా", "pos": "phrase", "meanings": {"en": "Goodbye", "te": "వీడ్కోలు / వెళ్లివస్తాను", "hi": "अलविदा"}, "exTarget": "अलविदा, कल फिर मिलेंगे।", "exTranslit": "Alvida, kal phir milenge.", "exNative": {"en": "Goodbye, see you again tomorrow.", "te": "వెళ్లివస్తాను, రేపు మళ్లీ కలుద్దాం.", "hi": "अलविदा, कल फिर मिलेंगे।"}},
                {"word": "हाँ", "translit": "Haan", "pron": "హాఁ", "pos": "interjection", "meanings": {"en": "Yes", "te": "అవును", "hi": "हाँ"}, "exTarget": "हाँ, मैं समझ गया।", "exTranslit": "Haan, main samajh gaya.", "exNative": {"en": "Yes, I understood.", "te": "అవును, నాకు అర్థమైంది.", "hi": "हाँ, मैं समझ गया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the Hindi word for 'Hello'.", "te": "నమస్కారానికి సరైన హిందీ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही शब्द चुनें।"}, "prompt": {"en": "Hello", "te": "నమస్కారం", "hi": "नमस्ते"}, "correct": "नमस्ते", "options": ["नमस्ते", "धन्यवाद", "अलविदा", "नहीं"], "expl": {"en": "'नमस्ते' is the universal polite greeting.", "te": "హిందీలో ప్రామాణిక నమస్కారం 'नमस्ते'.", "hi": "'नमस्ते' मुख्य अभिवादन है।"}}
            ]
        },
        {
            "title": {"en": "Politeness, Excuse Me & Please", "te": "మర్యాదపూర్వక మాటలు & క్షమించండి", "hi": "माफ़ी और शिष्टाचार"},
            "objective": {"en": "Say 'माफ़ कीजिए' (Sorry/Excuse me) and 'कृपया' (Please) naturally.", "te": "దయచేసి మరియు క్షమించండి అని గౌరవంగా చెప్పడం నేర్చుకోండి.", "hi": "कृपया और माफ़ कीजिए का उपयोग सीखें।"},
            "culturalTip": {"en": "Touching ears or saying 'माफ़ कीजिए' with palms joined expresses sincere apology.", "te": "హిందీలో క్షమించండి అనడానికి 'माफ़ कीजिए' లేదా 'क्षमा करें' అంటారు.", "hi": "माफ़ी मांगने के लिए 'माफ़ कीजिए' सबसे विनम्र शब्द है।"},
            "grammar": {
                "title": {"en": "Polite Imperatives (-इए / कृपया)", "te": "గౌరవార్థక క్రియలు (-ఈయే)", "hi": "आदरणीय आज्ञार्थ (-इए)"},
                "explanation": {"en": "Add -इए (iye) to verb stems for polite commands: आइए (come), बैठिए (sit), बोलिए (speak).", "te": "క్రియల చివర -इए చేరిస్తే రండి, కూర్చోండి అని మర్యాదగా చెప్పవచ్చు.", "hi": "क्रिया के अंत में -इए जोड़ने से आदरणीय रूप बनता है: आइए, बैठिए।"},
                "ruleSummary": {"en": "कृपया + [Verb]इए = Please [Verb].", "te": "దయచేసి + చేయండి.", "hi": "कृपया + कीजिए।"},
                "examples": [{"target": "कृपया अंदर आइए", "transliteration": "Kripya andar aaiye", "native": {"en": "Please come inside.", "te": "దయచేసి లోపలికి రండి.", "hi": "कृपया अंदर आइए।"}}],
                "commonMistakes": [{"incorrect": "तू आ", "correct": "आप आइए", "explanation": {"en": "Always use 'आइए'.", "te": "ఎప్పుడూ గౌరవంగా आइए అనాలి.", "hi": "हमेशा आइए बोलें।"}}]
            },
            "vocab": [
                {"word": "कृपया", "translit": "Kripya", "pron": "కృ-ప-యా", "pos": "phrase", "meanings": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "exTarget": "कृपया मेरी मदद कीजिए।", "exTranslit": "Kripya meri madad kijiye.", "exNative": {"en": "Please help me.", "te": "దయచేసి నాకు సహాయం చేయండి.", "hi": "कृपया मेरी सहायता कीजिए।"}},
                {"word": "माफ़ कीजिए", "translit": "Maaf kijiye", "pron": "మాఫ్ కీ-జి-యే", "pos": "phrase", "meanings": {"en": "Excuse me / I am sorry", "te": "నన్ను క్షమించండి", "hi": "माफ़ कीजिए"}, "exTarget": "माफ़ कीजिए, क्या मैं पूछ सकता हूँ?", "exTranslit": "Maaf kijiye, kya main pooch sakta hoon?", "exNative": {"en": "Excuse me, may I ask?", "te": "క్షమించండి, నేను అడగవచ్చా?", "hi": "सुनिए, क्या मैं पूछ सकता हूँ?"}},
                {"word": "कोई बात नहीं", "translit": "Koi baat nahi", "pron": "కో-యీ బాత్ న-హీ", "pos": "phrase", "meanings": {"en": "No problem / It's okay", "te": "పర్వాలేదు / అంతా బాగుంది", "hi": "कोई बात नहीं"}, "exTarget": "कोई बात नहीं, चिंता मत कीजिए।", "exTranslit": "Koi baat nahi, chinta mat kijiye.", "exNative": {"en": "No problem, don't worry.", "te": "పర్వాలేదు, ఆందోళన వద్దు.", "hi": "कोई बात नहीं, चिंता मत कीजिए।"}},
                {"word": "नहीं", "translit": "Nahi", "pron": "న-హీఁ", "pos": "interjection", "meanings": {"en": "No", "te": "కాదు / లేదు", "hi": "नहीं"}, "exTarget": "नहीं, मुझे यह नहीं चाहिए।", "exTranslit": "Nahi, mujhe yeh nahi chahiye.", "exNative": {"en": "No, I don't want this.", "te": "లేదు, నాకు ఇది వద్దు.", "hi": "नहीं, मुझे यह नहीं चाहिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'Please' in Hindi?", "te": "'దయచేసి' అని హిందీలో ఎలా అంటారు?", "hi": "हिंदी में 'कृपया' कैसे कहते हैं?"}, "prompt": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "correct": "कृपया", "options": ["कृपया", "कोई बात नहीं", "नमस्ते", "नहीं"], "expl": {"en": "कृपया means please.", "te": "దయచేసి అంటే कृपया.", "hi": "कृपया का अर्थ please है।"}}
            ]
        },
        {
            "title": {"en": "Introducing Yourself & Origin", "te": "పరిచయం & ఎక్కడి నుంచి వచ్చారో చెప్పడం", "hi": "आत्मपरिचय और गृह देश"},
            "objective": {"en": "Say 'मेरा नाम... है' and 'आपसे मिलकर खुशी हुई' in self-introductions.", "te": "మీ పేరు 'मेरा नाम...' మరియు పరిచయం హిందీలో చెప్పడం నేర్చుకోండి.", "hi": "अपना नाम 'मेरा नाम...' और परिचय देना सीखें।"},
            "culturalTip": {"en": "Saying 'आपसे मिलकर बहुत खुशी हुई' (Very pleased to meet you) forms immediate bonds in India.", "te": "కలిసినప్పుడు 'आपसे मिलकर खुशी हुई' అనడం ఆత్మీయతను తెలుపుతుంది.", "hi": "परिचय के बाद 'आपसे मिलकर खुशी हुई' कहना आदर व्यक्त करता है।"},
            "grammar": {
                "title": {"en": "Identity Sentences (मेरा नाम... है)", "te": "నా పేరు...", "hi": "मेरा नाम... है"},
                "explanation": {"en": "मेरा नाम [Name] है = My name is [Name]. मैं [Country] से हूँ = I am from [Country].", "te": "నా పేరు చెప్పడానికి 'मेरा नाम [పేరు] है' అంటారు.", "hi": "नाम बताने के लिए मेरा नाम [नाम] है कहें।"},
                "ruleSummary": {"en": "मेरा नाम [Name] है।", "te": "నా పేరు [పేరు].", "hi": "मेरा नाम [नाम] है।"},
                "examples": [{"target": "मेरा नाम अमित है और मैं हैदराबाद से हूँ", "transliteration": "Mera naam Amit hai aur main Hyderabad se hoon", "native": {"en": "My name is Amit and I am from Hyderabad.", "te": "నా పేరు అమిత్, నేను హైదరాబాద్ నుంచి వచ్చాను.", "hi": "मेरा नाम अमित है और मैं हैदराबाद से हूँ।"}}],
                "commonMistakes": [{"incorrect": "मैं नाम अमित", "correct": "मेरा नाम अमित है", "explanation": {"en": "Use possessive मेरा (my).", "te": "నా పేరు అనడానికి 'मेरा नाम' అనాలి.", "hi": "हमेशा 'मेरा नाम' का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "मेरा नाम", "translit": "Mera naam", "pron": "మే-రా నామ్", "pos": "phrase", "meanings": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "exTarget": "मेरा नाम पूजा है।", "exTranslit": "Mera naam Pooja hai.", "exNative": {"en": "My name is Pooja.", "te": "నా పేరు పూజ.", "hi": "मेरा नाम पूजा है।"}},
                {"word": "आपसे मिलकर खुशी हुई", "translit": "Aapse milkar khushi hui", "pron": "ఆప్-సే మిల్-కర్ ఖు-షీ హు-యీ", "pos": "phrase", "meanings": {"en": "Pleased to meet you", "te": "మిమ్మల్ని కలవడం సంతోషం", "hi": "आपसे मिलकर खुशी हुई"}, "exTarget": "नमस्ते, आपसे मिलकर बहुत खुशी हुई।", "exTranslit": "Namaste, aapse milkar bahut khushi hui.", "exNative": {"en": "Hello, very pleased to meet you.", "te": "నమస్కారం, మిమ్మల్ని కలవడం చాలా ఆనందంగా ఉంది.", "hi": "नमस्ते, आपसे मिलकर बहुत प्रसन्नता हुई।"}},
                {"word": "मैं", "translit": "Main", "pron": "మైం", "pos": "pronoun", "meanings": {"en": "I", "te": "నేను", "hi": "मैं"}, "exTarget": "मैं एक छात्र हूँ।", "exTranslit": "Main ek chhaatr hoon.", "exNative": {"en": "I am a student.", "te": "నేను విద్యార్థిని.", "hi": "मैं एक छात्र हूँ।"}},
                {"word": "दोस्त", "translit": "Dost", "pron": "దోస్త్", "pos": "noun", "meanings": {"en": "Friend", "te": "స్నేహితుడు / మిత్రుడు", "hi": "दोस्त / मित्र"}, "exTarget": "यह मेरा अच्छा दोस्त है।", "exTranslit": "Yeh mera achha dost hai.", "exNative": {"en": "He is my good friend.", "te": "ఇతను నా మంచి స్నేహితుడు.", "hi": "यह मेरा अच्छा दोस्त है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'My name is' in Hindi?", "te": "'నా పేరు...' అని హిందీలో ఎలా అంటారు?", "hi": "हिंदी में 'मेरा नाम... है' कैसे कहेंगे?"}, "prompt": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "correct": "मेरा नाम", "options": ["मेरा नाम", "मैं हूँ", "दोस्त", "नमस्ते"], "expl": {"en": "'मेरा नाम' is the standard way to state your name.", "te": "పేరు చెప్పడానికి 'मेरा नाम' వాడతారు.", "hi": "नाम बताने के लिए मेरा नाम बोलते हैं।"}}
            ]
        }
    ],
    # MODULE 2: Real-World Shopping & Numbers
    [
        {
            "title": {"en": "Numbers & Asking Prices", "te": "సంఖ్యలు & ధరలు అడగడం", "hi": "संख्याएँ और दाम पूछना"},
            "objective": {"en": "Ask 'यह कितने का है?' and understand rupee denominations in markets.", "te": "'దీని ఖరీదు ఎంత?' అని అడగడం మరియు రూపాయల విలువలు అర్థం చేసుకోవడం.", "hi": "'यह कितने का है?' पूछना और कीमतें समझना।"},
            "culturalTip": {"en": "Polite bargaining in Indian bazaars starts by asking 'भैया, ठीक-ठीक लगाइए' (Brother, give a fair price).", "te": "బజార్లలో బేరమాడేటప్పుడు 'భయ్యా, కాస్త తగ్గించండి' అని అడగడం సహజం.", "hi": "बाज़ार में 'भैया, ठीक-ठीक लगाइए' कहकर मोलभाव किया जाता है।"},
            "grammar": {
                "title": {"en": "Asking Cost (कितने का है?)", "te": "ధర అడగడం", "hi": "दाम पूछना"},
                "explanation": {"en": "यह (this) + कितने का है? (how much does it cost?).", "te": "దీని ధర ఎంత అని అడగడానికి 'यह कितने का है?' అంటారు.", "hi": "कीमत पूछने के लिए 'यह कितने का है?' कहें।"},
                "ruleSummary": {"en": "यह कितने का है? = How much is this?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"},
                "examples": [{"target": "यह आम कितने रुपये किलो है?", "transliteration": "Yeh aam kitne rupaye kilo hai?", "native": {"en": "How much per kilo are these mangoes?", "te": "ఈ మామిడి పండ్లు కిలో ఎంత?", "hi": "यह आम कितने रुपये किलो है?"}}],
                "commonMistakes": [{"incorrect": "यह कितना पैसा", "correct": "यह कितने का है?", "explanation": {"en": "Use 'यह कितने का है?'.", "te": "స్పష్టంగా 'यह कितने का है?' అనాలి.", "hi": "हमेशा 'यह कितने का है?' बोलें।"}}]
            },
            "vocab": [
                {"word": "यह कितने का है?", "translit": "Yeh kitne ka hai?", "pron": "యెహ్ కిత్-నే కా హై?", "pos": "phrase", "meanings": {"en": "How much is this?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "exTarget": "भैया, यह कितने का है?", "exTranslit": "Bhaiya, yeh kitne ka hai?", "exNative": {"en": "Brother, how much is this?", "te": "అన్నయ్యా, దీని ధర ఎంత?", "hi": "भैया, यह कितने का है?"}},
                {"word": "रुपये", "translit": "Rupaye", "pron": "రూ-ప-యే", "pos": "noun", "meanings": {"en": "Rupees (currency)", "te": "రూపాయలు", "hi": "रुपये"}, "exTarget": "यह सौ रुपये का है।", "exTranslit": "Yeh sau rupaye ka hai.", "exNative": {"en": "This is 100 rupees.", "te": "ఇది వంద రూపాయలు.", "hi": "यह सौ रुपये का है।"}},
                {"word": "महँगा", "translit": "Mehanga", "pron": "మ-హన్-గా", "pos": "adjective", "meanings": {"en": "Expensive", "te": "చాలా ఖరీదైనది", "hi": "महँगा"}, "exTarget": "यह बहुत महँगा है, थोड़ा कम कीजिए।", "exTranslit": "Yeh bahut mehanga hai, thoda kam kijiye.", "exNative": {"en": "It is very expensive, reduce a bit.", "te": "ఇది చాలా ఖరీదు, కాస్త తగ్గించండి.", "hi": "यह बहुत महँगा है, थोड़ा कम कीजिए।"}},
                {"word": "यह दीजिए", "translit": "Yeh dijiye", "pron": "యెహ్ దీ-జి-యే", "pos": "phrase", "meanings": {"en": "Give me this, please", "te": "ఇది నాకు ఇవ్వండి", "hi": "यह दीजिए"}, "exTarget": "मुझे यह वाला दीजिए।", "exTranslit": "Mujhe yeh wala dijiye.", "exNative": {"en": "Please give me this one.", "te": "నాకు ఇది ఇవ్వండి, దయచేసి.", "hi": "कृपया मुझे यह वाला दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the Hindi question for 'How much is this?'.", "te": "'దీని ధర ఎంత?' కి హిందీ వాక్యం ఏది?", "hi": "'यह कितने का है?' के लिए सही वाक्य चुनें।"}, "prompt": {"en": "How much is this?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "correct": "यह कितने का है?", "options": ["यह कितने का है?", "आप कहाँ जा रहे हैं?", "नमस्ते", "धन्यवाद"], "expl": {"en": "'यह कितने का है?' asks the price directly.", "te": "ధర అడిగే ముఖ్యమైన ప్రశ్న ఇది.", "hi": "दाम पूछने का मुख्य वाक्य यही है।"}}
            ]
        },
        {
            "title": {"en": "Paying by Card, UPI & Cash", "te": "కార్డు, యూపీఐ & నగదు చెల్లింపు", "hi": "कार्ड, यूपीआई और नकद भुगतान"},
            "objective": {"en": "Ask 'क्या कार्ड चलेगा?' or 'ऑनलाइन पेमेंट है?', and ask for a receipt.", "te": "కార్డు లేదా ఆన్‌లైన్ పేమెంట్ అడగడం మరియు రసీదు తీసుకోవడం.", "hi": "कार्ड/ऑनलाइन भुगतान और रसीद मांगना सीखें।"},
            "culturalTip": {"en": "QR code scanner boards (Paytm, PhonePe, GPay) are at every shop in India; just ask 'QR कोड दिखाइए'.", "te": "భారతదేశంలో ప్రతి దుకాణంలోనూ క్యూఆర్ కోడ్ ఉంటుంది; స్కాన్ చేసి పేమెంట్ చేయవచ్చు.", "hi": "भारत में हर दुकान पर क्यूआर कोड स्कैनर मिल जाता है।"},
            "grammar": {
                "title": {"en": "Asking Possibility (क्या... चलेगा?)", "te": "నడుస్తుందా? (తీసుకుంటారా)", "hi": "क्या चलेगा?"},
                "explanation": {"en": "'क्या कार्ड चलेगा?' asks 'Will card work here?'. 'क्या ऑनलाइन चलेगा?' (Does online pay work?).", "te": "కార్డు పనిచేస్తుందా/తీసుకుంటారా అని అడగడానికి 'क्या कार्ड चलेगा?' అనాలి.", "hi": "भुगतान का माध्यम पूछने के लिए क्या चलेगा लगाएं।"},
                "ruleSummary": {"en": "क्या [Mode] चलेगा? = Will [Mode] work?", "te": "[పద్ధతి] తీసుకుంటారా?", "hi": "क्या [माध्यम] चलेगा?"},
                "examples": [{"target": "क्या यहाँ गूगल पे चलेगा?", "transliteration": "Kya yahan Google Pay chalega?", "native": {"en": "Does Google Pay work here?", "te": "ఇక్కడ గూగుల్ పే పనిచేస్తుందా?", "hi": "क्या यहाँ गूगल पे चलेगा?"}}],
                "commonMistakes": [{"incorrect": "कार्ड होता?", "correct": "क्या कार्ड चलेगा?", "explanation": {"en": "Use 'क्या कार्ड चलेगा?'.", "te": "స్పష్టంగా क्या कार्ड चलेगा? అనాలి.", "hi": "हमेशा क्या कार्ड चलेगा? बोलें।"}}]
            },
            "vocab": [
                {"word": "क्या कार्ड चलेगा?", "translit": "Kya card chalega?", "pron": "క్యా కార్డ్ చ-లే-గా?", "pos": "phrase", "meanings": {"en": "Do you accept cards?", "te": "కార్డు తీసుకుంటారా?", "hi": "क्या कार्ड चलेगा?"}, "exTarget": "क्या यहाँ कार्ड चलेगा?", "exTranslit": "Kya yahan card chalega?", "exNative": {"en": "Do you accept cards here?", "te": "ఇక్కడ కార్డు తీసుకుంటారా?", "hi": "क्या यहाँ कार्ड चलेगा?"}},
                {"word": "नकद", "translit": "Nakad", "pron": "న-కద్", "pos": "noun", "meanings": {"en": "Cash", "te": "నగదు", "hi": "नकद"}, "exTarget": "मैं नकद दे रहा हूँ।", "exTranslit": "Main nakad de raha hoon.", "exNative": {"en": "I am paying in cash.", "te": "నేను నగదు ఇస్తున్నాను.", "hi": "मैं नकद दे रहा हूँ।"}},
                {"word": "रसीद", "translit": "Raseed", "pron": "ర-సీద్", "pos": "noun", "meanings": {"en": "Receipt / bill", "te": "రసీదు / బిల్లు", "hi": "रसीद / बिल"}, "exTarget": "पक्की रसीद दीजिए।", "exTranslit": "Pakki raseed dijiye.", "exNative": {"en": "Please give a proper receipt.", "te": "రసీదు ఇవ్వండి.", "hi": "कृपया पक्की रसीद दीजिए।"}},
                {"word": "थैली", "translit": "Thaili", "pron": "థై-లీ", "pos": "noun", "meanings": {"en": "Carry bag", "te": "సంచి / బ్యాగ్", "hi": "थैली / बैग"}, "exTarget": "एक थैली मिलेगी?", "exTranslit": "Ek thaili milegi?", "exNative": {"en": "Can I get a carry bag?", "te": "ఒక సంచి దొరుకుతుందా?", "hi": "क्या एक थैली मिलेगी?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Do you accept cards?' in Hindi?", "te": "'కార్డు తీసుకుంటారా?' అని హిందీలో ఎలా అడుగుతారు?", "hi": "हिंदी में 'क्या कार्ड चलेगा?' कैसे पूछेंगे?"}, "prompt": {"en": "Do you accept cards?", "te": "కార్డు తీసుకుంటారా?", "hi": "क्या कार्ड चलेगा?"}, "correct": "क्या कार्ड चलेगा?", "options": ["क्या कार्ड चलेगा?", "यह कितने का है?", "नमस्ते", "धन्यवाद"], "expl": {"en": "क्या कार्ड चलेगा? is standard payment speech.", "te": "కార్డు చెల్లింపు అడిగే సరైన మాట.", "hi": "कार्ड भुगतान का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Buying Daily Essentials", "te": "నిత్యావసరాలు & కిరాణా సరుకులు", "hi": "किराने का सामान और आवश्यक वस्तुएं"},
            "objective": {"en": "Ask for drinking water ('पानी'), count items, and ask 'क्या आपके पास है?'.", "te": "మంచినీళ్లు మరియు నిత్యావసరాలు అడగడం నేర్చుకోండి.", "hi": "पीने का पानी और सामान मांगना सीखें।"},
            "culturalTip": {"en": "Ask for 'मिनरल वॉटर' (sealed mineral water bottle) when traveling in India.", "te": "ప్రయాణాల్లో సీల్డ్ వాటర్ బాటిల్ అడగడానికి 'మినరల్ వాటర్' అంటారు.", "hi": "सफ़र में सीलबंद पानी की बोतल के लिए मिनरल वॉटर कहें।"},
            "grammar": {
                "title": {"en": "Asking Availability (क्या आपके पास... है?)", "te": "మీ దగ్గర ఉందా?", "hi": "क्या आपके पास है?"},
                "explanation": {"en": "'क्या आपके पास [Item] है?' asks 'Do you have [Item]?'.", "te": "వస్తువు పేరు + ఉందా అని అడగడానికి 'क्या आपके पास [వస్తువు] है?' అనాలి.", "hi": "उपलब्धता पूछने के लिए 'क्या आपके पास [वस्तु] है?' कहें।"},
                "ruleSummary": {"en": "क्या आपके पास [Item] है? = Do you have [Item]?", "te": "మీ దగ్గర [వస్తువు] ఉందా?", "hi": "क्या आपके पास [वस्तु] है?"},
                "examples": [{"target": "क्या आपके पास पानी की बोतल है?", "transliteration": "Kya aapke paas paani ki botal hai?", "native": {"en": "Do you have a water bottle?", "te": "మీ దగ్గర వాటర్ బాటిల్ ఉందా?", "hi": "क्या आपके पास पानी की बोतल है?"}}],
                "commonMistakes": [{"incorrect": "पानी है तुम", "correct": "क्या आपके पास पानी है?", "explanation": {"en": "Always polite phrasing.", "te": "మర్యాదగా అడగాలి.", "hi": "हमेशा आदरपूर्वक बोलें।"}}]
            },
            "vocab": [
                {"word": "पानी", "translit": "Paani", "pron": "పా-నీ", "pos": "noun", "meanings": {"en": "Water", "te": "నీళ్లు / మంచినీళ్లు", "hi": "पानी"}, "exTarget": "पीने का साफ़ पानी दीजिए।", "exTranslit": "Peene ka saaf paani dijiye.", "exNative": {"en": "Please give clean drinking water.", "te": "తాగడానికి మంచి నీళ్లు ఇవ్వండి.", "hi": "पीने का साफ़ पानी दीजिए।"}},
                {"word": "दूध", "translit": "Doodh", "pron": "దూద్", "pos": "noun", "meanings": {"en": "Milk", "te": "పాలు", "hi": "दूध"}, "exTarget": "एक लीटर दूध चाहिए।", "exTranslit": "Ek litre doodh chahiye.", "exNative": {"en": "I need one liter of milk.", "te": "ఒక లీటర్ పాలు కావాలి.", "hi": "एक लीटर दूध चाहिए।"}},
                {"word": "एक", "translit": "Ek", "pron": "ఏక్", "pos": "number", "meanings": {"en": "One", "te": "ఒకటి", "hi": "एक"}, "exTarget": "बस एक दीजिए।", "exTranslit": "Bas ek dijiye.", "exNative": {"en": "Give just one.", "te": "ఒక్కటి మాత్రమే ఇవ్వండి.", "hi": "बस एक दीजिए।"}},
                {"word": "दो", "translit": "Do", "pron": "దో", "pos": "number", "meanings": {"en": "Two", "te": "రెండు", "hi": "दो"}, "exTarget": "दो पैकेट दीजिए।", "exTranslit": "Do packet dijiye.", "exNative": {"en": "Give two packets.", "te": "రెండు ప్యాకెట్లు ఇవ్వండి.", "hi": "दो पैकेट दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for water in Hindi?", "te": "'నీళ్లు ఇవ్వండి' అని హిందీలో ఎలా అంటారు?", "hi": "हिंदी में 'पानी दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Water, please.", "te": "నీళ్లు ఇవ్వండి, దయచేసి.", "hi": "पानी दीजिए, कृपया।"}, "correct": "पानी दीजिए", "options": ["पानी दीजिए", "यह कितने का है?", "नमस्ते", "धन्यवाद"], "expl": {"en": "पानी दीजिए asks for water politely.", "te": "నీళ్లు అడిగే సరైన మాట.", "hi": "पानी मांगने का सही वाक्य।"}}
            ]
        }
    ],
    # MODULE 3: Cafés, Street Food & Restaurants
    [
        {
            "title": {"en": "Masala Chai & Café Orders", "te": "మసాలా టీ & కాఫీ ఆర్డర్ చేయడం", "hi": "मसाला चाय और कॉफ़ी का ऑर्डर"},
            "objective": {"en": "Order hot chai ('गरम चाय'), specify sugar level, and ask for parcel.", "te": "వేడి మసాలా టీ ఆర్డర్ చేయడం, చక్కర తగ్గించమనడం మరియు పార్శిల్ అడగడం.", "hi": "गरम चाय, कम चीनी और पार्सल मांगना सीखें।"},
            "culturalTip": {"en": "Steaming 'मसाला चाय' (masala chai) served in clay cups (कुल्हड़) is India's beloved national drink.", "te": "మట్టి పాత్రల్లో (కుల్హడ్) ఇచ్చే మసాలా టీ భారతదేశంలో ఎంతో ప్రసిద్ధి.", "hi": "मिट्टी के कुल्हड़ में मिलने वाली मसाला चाय का स्वाद अनोखा होता है।"},
            "grammar": {
                "title": {"en": "Desires with 'मुझे... चाहिए'", "te": "నాకు కావాలి (मुझे... चाहिए)", "hi": "मुझे चाहिए"},
                "explanation": {"en": "'मुझे एक चाय चाहिए' means 'I want a tea'. 'कम चीनी डालिए' (Put less sugar).", "te": "నాకు టీ కావాలి అనడానికి 'मुझे चाय चाहिए' అంటారు.", "hi": "मुझे चाय चाहिए कहने के लिए मुझे चाहिए का प्रयोग करें।"},
                "ruleSummary": {"en": "मुझे [Item] चाहिए = I want [Item].", "te": "నాకు [వస్తువు] కావాలి.", "hi": "मुझे [वस्तु] चाहिए।"},
                "examples": [{"target": "मुझे एक कप गरम मसाला चाय चाहिए", "transliteration": "Mujhe ek cup garam masala chai chahiye", "native": {"en": "I want a cup of hot masala chai.", "te": "నాకు ఒక కప్పు వేడి మసాలా టీ కావాలి.", "hi": "मुझे एक कप गरम मसाला चाय चाहिए।"}}],
                "commonMistakes": [{"incorrect": "मैं चाय चाहिए", "correct": "मुझे चाय चाहिए", "explanation": {"en": "Use 'मुझे' (to me), not 'मैं' (I).", "te": "నాకు కావాలి అనడానికి मुझे అనాలి.", "hi": "हमेशा मुझे का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "चाय", "translit": "Chai", "pron": "చాయ్", "pos": "noun", "meanings": {"en": "Tea", "te": "టీ / తేనీరు", "hi": "चाय"}, "exTarget": "एक कड़क चाय बनाइए।", "exTranslit": "Ek kadak chai banaiye.", "exNative": {"en": "Make one strong tea.", "te": "ఒక స్ట్రాంగ్ టీ చేయండి.", "hi": "एक कड़क चाय बनाइए।"}},
                {"word": "गरम", "translit": "Garam", "pron": "గ-రమ్", "pos": "adjective", "meanings": {"en": "Hot", "te": "వేడి / వేడిగా ఉన్న", "hi": "गरम"}, "exTarget": "गरम कॉफ़ी दीजिए।", "exTranslit": "Garam coffee dijiye.", "exNative": {"en": "Give hot coffee.", "te": "వేడి కాఫీ ఇవ్వండి.", "hi": "गरम कॉफ़ी दीजिए।"}},
                {"word": "पैक कर दीजिए", "translit": "Pack kar dijiye", "pron": "ప్యాక్ కర్ దీ-జి-యే", "pos": "phrase", "meanings": {"en": "Pack it to-go", "te": "పార్శిల్ కట్టండి", "hi": "पैक कर दीजिए"}, "exTarget": "यह खाना पैक कर दीजिए।", "exTranslit": "Yeh khaana pack kar dijiye.", "exNative": {"en": "Please pack this food to-go.", "te": "ఈ భోజనాన్ని పార్శిల్ కట్టండి.", "hi": "कृपया यह खाना पैक कर दीजिए।"}},
                {"word": "कम चीनी", "translit": "Kam cheeni", "pron": "కమ్ చీ-నీ", "pos": "phrase", "meanings": {"en": "Less sugar", "te": "తక్కువ చక్కెర", "hi": "कम चीनी"}, "exTarget": "चाय में कम चीनी डालिए।", "exTranslit": "Chai mein kam cheeni daaliye.", "exNative": {"en": "Put less sugar in tea.", "te": "టీలో చక్కెర తక్కువగా వేయండి.", "hi": "चाय में चीनी कम डालिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Order a hot cup of tea in Hindi.", "te": "వేడి టీ ఆర్డర్ చేసే వాక్యాన్ని ఎంచుకోండి.", "hi": "गरम चाय का ऑर्डर देने वाला वाक्य चुनें।"}, "prompt": {"en": "One hot tea, please.", "te": "ఒక వేడి టీ ఇవ్వండి.", "hi": "एक गरम चाय, कृपया।"}, "correct": "एक गरम चाय दीजिए", "options": ["एक गरम चाय दीजिए", "यह कितने का है?", "नमस्ते", "धन्यवाद"], "expl": {"en": "एक गरम चाय दीजिए is the standard tea stall order.", "te": "టీ స్టాల్ లో ఆర్డర్ చేసే ఖచ్చితమైన మాట.", "hi": "चाय मंगाने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Dhabas & Restaurant Dining", "te": "ధాబా & రెస్టారెంట్ భోజనం", "hi": "ढाबा और रेस्तरां में भोजन"},
            "objective": {"en": "Order thali or rotis, ask for menu, and say 'बहुत स्वादिष्ट है'.", "te": "భోజనం ఆర్డర్ చేయడం మరియు చాలా రుచిగా ఉందని చెప్పడం.", "hi": "थाली, रोटियाँ और स्वादिष्ट कहना सीखें।"},
            "culturalTip": {"en": "Dhaba roadside dining on Indian highways is famous for fresh tandoori rotis, paneer, and dal makhani.", "te": "హైవే ధాబాల్లో తాజా తందూరీ రొట్టెలు మరియు దాల్ మఖానీ ఎంతో ప్రసిద్ధి.", "hi": "ढाबों पर ताज़ा तंदूरी रोटियाँ और दाल मखनी बहुत लोकप्रिय हैं।"},
            "grammar": {
                "title": {"en": "Complimenting Food (बहुत स्वादिष्ट है)", "te": "చాలా రుచిగా ఉంది", "hi": "स्वादिष्ट बताना"},
                "explanation": {"en": "'खाना बहुत स्वादिष्ट है' means 'The food is very delicious'.", "te": "భోజనం చాలా బాగుందని చెప్పడానికి 'खाना बहुत स्वादिष्ट है' అంటారు.", "hi": "खाना स्वादिष्ट है कहने के लिए यह वाक्य बोलें।"},
                "ruleSummary": {"en": "खाना बहुत स्वादिष्ट है = The food is very delicious.", "te": "భోజనం చాలా రుచిగా ఉంది.", "hi": "खाना बहुत स्वादिष्ट है।"},
                "examples": [{"target": "दाल तड़का बहुत स्वादिष्ट है", "transliteration": "Dal tadka bahut swadisht hai", "native": {"en": "The dal tadka is very delicious.", "te": "దాల్ తడ్కా చాలా రుచిగా ఉంది.", "hi": "दाल तड़का बहुत स्वादिष्ट है।"}}],
                "commonMistakes": [{"incorrect": "अच्छा खाना टेस्ट", "correct": "खाना बहुत स्वादिष्ट है", "explanation": {"en": "Use proper Hindi.", "te": "సరైన హిందీ వాక్యం వాడాలి.", "hi": "सही व्याकरण का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "मेन्यू", "translit": "Menu", "pron": "మే-న్యూ", "pos": "noun", "meanings": {"en": "The menu", "te": "మెనూ కార్డు", "hi": "मेन्यू कार्ड"}, "exTarget": "मेन्यू कार्ड दिखाइए।", "exTranslit": "Menu card dikhaiye.", "exNative": {"en": "Please show the menu card.", "te": "మెనూ కార్డు చూపించండి.", "hi": "कृपया मेन्यू कार्ड दिखाइए।"}},
                {"word": "थाली", "translit": "Thaali", "pron": "థా-లీ", "pos": "noun", "meanings": {"en": "Thali meal platter", "te": "థాలీ భోజనం", "hi": "थाली भोजन"}, "exTarget": "एक वेज थाली लगाइए।", "exTranslit": "Ek veg thaali lagaiye.", "exNative": {"en": "Serve one veg thali.", "te": "ఒక వెజ్ థాలీ తీసుకురండి.", "hi": "एक वेज थाली लगाइए।"}},
                {"word": "स्वादिष्ट", "translit": "Swadisht", "pron": "స్వా-దిష్త్", "pos": "adjective", "meanings": {"en": "Delicious", "te": "చాలా రుచికరమైనది", "hi": "बहुत स्वादिष्ट"}, "exTarget": "खाना बहुत स्वादिष्ट था।", "exTranslit": "Khaana bahut swadisht tha.", "exNative": {"en": "The food was very delicious.", "te": "భోజనం చాలా రుచిగా ఉంది.", "hi": "खाना बहुत स्वादिष्ट था।"}},
                {"word": "थोड़ा और", "translit": "Thoda aur", "pron": "థో-డా ఔర్", "pos": "phrase", "meanings": {"en": "A little more", "te": "ఇంకా కొంచెం", "hi": "थोड़ा और"}, "exTarget": "थोड़ा और चावल दीजिए।", "exTranslit": "Thoda aur chaawal dijiye.", "exNative": {"en": "Give a little more rice.", "te": "ఇంకా కాస్త అన్నం ఇవ్వండి.", "hi": "थोड़े और चावल दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'The food is very delicious' in Hindi?", "te": "'భోజనం చాలా రుచిగా ఉంది' అని ఎలా అంటారు?", "hi": "हिंदी में 'खाना बहुत स्वादिष्ट है' कैसे कहेंगे?"}, "prompt": {"en": "It is very delicious.", "te": "చాలా రుచిగా ఉంది.", "hi": "बहुत स्वादिष्ट है।"}, "correct": "बहुत स्वादिष्ट है", "options": ["बहुत स्वादिष्ट है", "यह कितने का है?", "नमस्ते", "धन्यवाद"], "expl": {"en": "बहुत स्वादिष्ट है expresses culinary delight.", "te": "రుచిని ప్రశంసించే మాట ఇది.", "hi": "स्वाद की प्रशंसा का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Dietary Needs & The Bill (बिल दीजिए)", "te": "కారం తగ్గించడం & బిల్లు చెల్లించడం", "hi": "कम तीखा और बिल चुकाना"},
            "objective": {"en": "Ask for the check ('बिल दीजिए') and request less spicy or pure vegetarian food.", "te": "బిల్లు ఇవ్వమని అడగడం మరియు కారం తక్కువ చేయమనడం.", "hi": "बिल मांगना और शाकाहारी भोजन कहना सीखें।"},
            "culturalTip": {"en": "Pure vegetarian restaurants are marked 'शुद्ध शाकाहारी' (Shuddh Shakahari) across North and Central India.", "te": "స్వచ్ఛమైన శాకాహార భోజనశాలలకు 'शुद्ध शाकाहारी' అని బోర్డు ఉంటుంది.", "hi": "भारत में शाकाहारी रेस्तराओं पर 'शुद्ध शाकाहारी' लिखा होता है।"},
            "grammar": {
                "title": {"en": "Asking for the Bill (बिल दीजिए)", "te": "బిల్లు అడగడం", "hi": "बिल मांगना"},
                "explanation": {"en": "Say 'भैया, बिल ले आइए' (Brother, bring the check) to your server.", "te": "బిల్లు కోసం 'भैया, बिल दीजिए' అనాలి.", "hi": "बिल मांगने के लिए बिल दीजिए कहें।"},
                "ruleSummary": {"en": "बिल दीजिए = The bill, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"},
                "examples": [{"target": "खाना खत्म हो गया, बिल ले आइए", "transliteration": "Khaana khatam ho gaya, bill le aaiye", "native": {"en": "We are done eating, please bring the bill.", "te": "భోజనం పూర్తయింది, బిల్లు తీసుకురండి.", "hi": "खाना हो गया, कृपया बिल ले आइए।"}}],
                "commonMistakes": [{"incorrect": "पैसा ले लो", "correct": "बिल दीजिए", "explanation": {"en": "Always polite phrasing.", "te": "మర్యాదగా బిల్ దీజియే అనాలి.", "hi": "हमेशा विनम्रता से बिल मांगें।"}}]
            },
            "vocab": [
                {"word": "बिल दीजिए", "translit": "Bill dijiye", "pron": "బిల్ దీ-జి-యే", "pos": "phrase", "meanings": {"en": "The bill, please", "te": "బిల్లు ఇవ్వండి, దయచేసి", "hi": "कृपया बिल दीजिए"}, "exTarget": "भैया, बिल दीजिए।", "exTranslit": "Bhaiya, bill dijiye.", "exNative": {"en": "Brother, please give the bill.", "te": "అన్నయ్యా, బిల్లు ఇవ్వండి.", "hi": "भैया, कृपया बिल दीजिए।"}},
                {"word": "कम तीखा", "translit": "Kam teekha", "pron": "కమ్ తీ-ఖా", "pos": "phrase", "meanings": {"en": "Less spicy / mild", "te": "కారం తక్కువగా", "hi": "कम तीखा"}, "exTarget": "सब्जी कम तीखी बनाइए।", "exTranslit": "Sabzi kam teekhi banaiye.", "exNative": {"en": "Make the curry less spicy.", "te": "కూరలో కారం తక్కువగా చేయండి.", "hi": "सब्ज़ी कम तीखी बनाइए।"}},
                {"word": "शाकाहारी", "translit": "Shakahari", "pron": "శా-కా-హా-రీ", "pos": "noun", "meanings": {"en": "Vegetarian", "te": "శాకాహారం / శాకాహారి", "hi": "शाकाहारी"}, "exTarget": "मैं शुद्ध शाकाहारी हूँ।", "exTranslit": "Main shuddh shakahari hoon.", "exNative": {"en": "I am strictly vegetarian.", "te": "నేను స్వచ్ఛమైన శాకాహారిని.", "hi": "मैं शुद्ध शाकाहारी हूँ।"}},
                {"word": "बहुत अच्छा", "translit": "Bahut achha", "pron": "బ-హుత్ అచ్-ఛా", "pos": "phrase", "meanings": {"en": "Very good", "te": "చాలా బాగుంది", "hi": "बहुत अच्छा"}, "exTarget": "भोजन बहुत अच्छा था, धन्यवाद।", "exTranslit": "Bhojan bahut achha tha, dhanyavaad.", "exNative": {"en": "The meal was very good, thanks.", "te": "భోజనం చాలా బాగుంది, ధన్యవాదాలు.", "hi": "भोजन बहुत अच्छा था, धन्यवाद।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the bill in a Hindi restaurant?", "te": "రెస్టారెంట్‌లో 'బిల్లు ఇవ్వండి' అని ఎలా అంటారు?", "hi": "रेस्तरां में बिल कैसे मांगेंगे?"}, "prompt": {"en": "The bill, please.", "te": "బిల్లు ఇవ్వండి.", "hi": "कृपया बिल दीजिए।"}, "correct": "बिल दीजिए", "options": ["बिल दीजिए", "मेन्यू दिखाइए", "नमस्ते", "धन्यवाद"], "expl": {"en": "बिल दीजिए is the courteous way to ask for the bill.", "te": "బిల్లు అడిగే సరైన మాట.", "hi": "बिल मांगने का सही वाक्य।"}}
            ]
        }
    ],
    # MODULE 4: Real-Life Transit & Navigation
    [
        {
            "title": {"en": "Where is the Restroom? (Navigation)", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది? (దిశలు)", "hi": "शौचालय कहाँ है? (रास्ता पूछना)"},
            "objective": {"en": "Ask 'शौचालय कहाँ है?' and understand left, right, and straight.", "te": "బాత్‌రూమ్ ఎక్కడుందో అడగడం, ఎడమ, కుడి మరియు తిన్నగా వెళ్లడం అర్థం చేసుకోవడం.", "hi": "शौचालय पूछना, बाएँ, दाएँ और सीधे जाना समझना।"},
            "culturalTip": {"en": "Look for 'शौचालय' (Shauchalay) or 'Washroom' signs at stations and shopping centers.", "te": "రైల్వే స్టేషన్లలో 'शौचालय' అని బోర్డులు ఉంటాయి.", "hi": "स्टेशनों और बाज़ारों में शौचालय का बोर्ड लगा होता है।"},
            "grammar": {
                "title": {"en": "Asking Locations (कहाँ है?)", "te": "ఎక్కడ ఉంది? (कहाँ है?)", "hi": "कहाँ है?"},
                "explanation": {"en": "[Place] + कहाँ है? asks 'Where is [Place]?'.", "te": "స్థలం పేరు + कहाँ है? అంటే ఎక్కడ ఉంది అని అర్థం.", "hi": "स्थान + कहाँ है? लगाकर पूछें।"},
                "ruleSummary": {"en": "[Place] कहाँ है? = Where is [Place]?", "te": "[స్థలం] ఎక్కడ ఉంది?", "hi": "[स्थान] कहाँ है?"},
                "examples": [{"target": "रेलवे स्टेशन कहाँ है?", "transliteration": "Railway station kahan hai?", "native": {"en": "Where is the railway station?", "te": "రైల్వే స్టేషన్ ఎక్కడ ఉంది?", "hi": "रेलवे स्टेशन कहाँ है?"}}],
                "commonMistakes": [{"incorrect": "कहाँ शौचालय", "correct": "शौचालय कहाँ है?", "explanation": {"en": "Place name comes first.", "te": "ముందు స్థలం పేరు చెప్పాలి.", "hi": "स्थान का नाम पहले बोलें।"}}]
            },
            "vocab": [
                {"word": "शौचालय कहाँ है?", "translit": "Shauchalay kahan hai?", "pron": "శౌ-చా-లయ్ క-హాఁ హై?", "pos": "phrase", "meanings": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}, "exTarget": "भैया, शौचालय कहाँ है?", "exTranslit": "Bhaiya, shauchalay kahan hai?", "exNative": {"en": "Brother, where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉందో చెప్పండి?", "hi": "भैया, शौचालय कहाँ है?"}},
                {"word": "बाएँ", "translit": "Baayein", "pron": "బా-యేం", "pos": "noun", "meanings": {"en": "Left", "te": "ఎడమ వైపు", "hi": "बाईं ओर"}, "exTarget": "बाएँ मुड़िए।", "exTranslit": "Baayein mudiye.", "exNative": {"en": "Turn to the left.", "te": "ఎడమ వైపునకు తిరగండి.", "hi": "बाईं तरफ मुड़िए।"}},
                {"word": "दाएँ", "translit": "Daayein", "pron": "దా-యేం", "pos": "noun", "meanings": {"en": "Right", "te": "కుడి వైపు", "hi": "दाईं ओर"}, "exTarget": "दाएँ हाथ पर है।", "exTranslit": "Daayein haath par hai.", "exNative": {"en": "It is on the right hand side.", "te": "అది కుడివైపున ఉంది.", "hi": "यह दाईं तरफ है।"}},
                {"word": "सीधे", "translit": "Seedhe", "pron": "సీ-ధే", "pos": "phrase", "meanings": {"en": "Straight ahead", "te": "తిన్నగా / నేరుగా", "hi": "सीधे आगे"}, "exTarget": "सीधे चले जाइए।", "exTranslit": "Seedhe chale jaiye.", "exNative": {"en": "Go straight ahead.", "te": "ముందుకు నేరుగా వెళ్లండి.", "hi": "सीधे आगे जाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Where is the restroom?' in Hindi?", "te": "'బాత్‌రూమ్ ఎక్కడ ఉంది?' అని హిందీలో ఎలా అడుగుతారు?", "hi": "हिंदी में 'शौचालय कहाँ है?' कैसे पूछेंगे?"}, "prompt": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}, "correct": "शौचालय कहाँ है?", "options": ["शौचालय कहाँ है?", "यह कितने का है?", "नमस्ते", "धन्यवाद"], "expl": {"en": "शौचालय कहाँ है? is accurate.", "te": "బాత్‌రూమ్ కోసం అడిగే ఖచ్చితమైన ప్రశ్న.", "hi": "शौचालय पूछने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Delhi Metro, Autos & Cabs", "te": "మెట్రో, బస్సు & ఆటో ప్రయాణం", "hi": "मेट्रो, ऑटो और टैक्सी"},
            "objective": {"en": "Navigate metro stations, hail autos, and ask 'यहाँ रोक दीजिए'.", "te": "మెట్రో ఎక్కడం మరియు ఇక్కడ ఆపమని డ్రైవర్‌తో చెప్పడం.", "hi": "मेट्रो यात्रा और यहाँ गाड़ी रोकने के लिए कहना सीखें।"},
            "culturalTip": {"en": "Delhi Metro has color-coded lines (Yellow, Blue, Red); smart cards or QR tickets save queuing time.", "te": "ఢిల్లీ మెట్రోలో లైన్లకు రంగులు ఉంటాయి; స్మార్ట్ కార్డు వాడటం సులభం.", "hi": "दिल्ली मेट्रो में स्मार्ट कार्ड या क्यूआर टिकट से समय बचता है।"},
            "grammar": {
                "title": {"en": "Directing Drivers (यहाँ रोक दीजिए)", "te": "డ్రైవర్‌తో ఆపమనడం", "hi": "गाड़ी रोकने को कहना"},
                "explanation": {"en": "Say 'भैया, यहाँ रोक दीजिए' (Brother, please stop here) clearly.", "te": "ఇక్కడ ఆపండి అని చెప్పడానికి 'यहाँ रोक दीजिए' అనాలి.", "hi": "यहाँ रोकिए कहने के लिए 'यहाँ रोक दीजिए' बोलें।"},
                "ruleSummary": {"en": "यहाँ रोक दीजिए = Stop here, please.", "te": "ఇక్కడ ఆపండి, దయచేసి.", "hi": "यहाँ रोक दीजिए, कृपया।"},
                "examples": [{"target": "गेट के पास रोक दीजिए", "transliteration": "Gate ke paas rok dijiye", "native": {"en": "Please stop near the gate.", "te": "గేటు దగ్గర ఆపండి.", "hi": "गेट के पास रोक दीजिए।"}}],
                "commonMistakes": [{"incorrect": "रोक तू", "correct": "रोक दीजिए", "explanation": {"en": "Always polite honorific form.", "te": "మర్యాదగా -दीजिए చేర్చాలి.", "hi": "हमेशा आदरपूर्वक रोक दीजिए कहें।"}}]
            },
            "vocab": [
                {"word": "मेट्रो स्टेशन", "translit": "Metro station", "pron": "మె-ట్రో స్టే-షన్", "pos": "noun", "meanings": {"en": "Metro station", "te": "మెట్రో స్టేషన్", "hi": "मेट्रो स्टेशन"}, "exTarget": "राजीव चौक मेट्रो स्टेशन कहाँ है?", "exTranslit": "Rajiv Chowk metro station kahan hai?", "exNative": {"en": "Where is Rajiv Chowk metro station?", "te": "రాజీవ్ చౌక్ మెట్రో స్టేషన్ ఎక్కడ ఉంది?", "hi": "राजीव चौक मेट्रो स्टेशन कहाँ है?"}},
                {"word": "ऑटो", "translit": "Auto", "pron": "ఆ-టో", "pos": "noun", "meanings": {"en": "Auto rickshaw", "te": "ఆటో", "hi": "ऑटो"}, "exTarget": "ऑटो वाले भैया, चलेंगे?", "exTranslit": "Auto wale bhaiya, chalenge?", "exNative": {"en": "Auto brother, will you go?", "te": "ఆటో వస్తుందా అన్నయ్యా?", "hi": "ऑटो वाले भैया, चलेंगे?"}},
                {"word": "यहाँ रोक दीजिए", "translit": "Yahan rok dijiye", "pron": "య-హాఁ రోక్ దీ-జి-యే", "pos": "phrase", "meanings": {"en": "Stop here, please", "te": "ఇక్కడ ఆపండి", "hi": "यहाँ रोक दीजिए"}, "exTarget": "भैया, यहीं रोक दीजिए।", "exTranslit": "Bhaiya, yahin rok dijiye.", "exNative": {"en": "Brother, please stop right here.", "te": "ఇక్కడే ఆపండి, దయచేసి.", "hi": "भैया, कृपया यहीं रोक दीजिए।"}},
                {"word": "कितना समय लगेगा?", "translit": "Kitna samay lagega?", "pron": "కిత్-నా స-మయ్ ల-గే-గా?", "pos": "phrase", "meanings": {"en": "How long will it take?", "te": "ఎంత సమయం పడుతుంది?", "hi": "कितना समय लगेगा?"}, "exTarget": "वहाँ पहुँचने में कितना समय लगेगा?", "exTranslit": "Wahan pahunchne mein kitna samay lagega?", "exNative": {"en": "How long will it take to reach there?", "te": "అక్కడికి చేరుకోవడానికి ఎంత సమయం పడుతుంది?", "hi": "वहाँ पहुँचने में कितना समय लगेगा?"}}
            ],
            "exercises": [
                {"instruction": {"en": "Tell your driver 'Stop here, please' in Hindi.", "te": "డ్రైవర్‌తో 'ఇక్కడ ఆపండి' అని ఎలా అంటారు?", "hi": "चालक से 'यहाँ रोक दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Stop here, please.", "te": "ఇక్కడ ఆపండి.", "hi": "यहाँ रोक दीजिए।"}, "correct": "यहाँ रोक दीजिए", "options": ["यहाँ रोक दीजिए", "शौचालय कहाँ है?", "यह कितने का है?", "नमस्ते"], "expl": {"en": "यहाँ रोक दीजिए is courteous and unambiguous.", "te": "ఇక్కడ ఆపండి అని చెప్పే స్పష్టమైన మాట.", "hi": "यहाँ गाड़ी रोकने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Hotel Check-In & Wi-Fi", "te": "హోటల్ చెక్-ఇన్ & రూమ్ సర్వీస్", "hi": "होटल चेक-इन और कमरा"},
            "objective": {"en": "Check in with booking ('मेरी बुकिंग है'), ask for Wi-Fi and room key.", "te": "రిజర్వేషన్ చూపించడం, వైఫై పాస్‌వర్డ్ మరియు రూమ్ కీ తీసుకోవడం.", "hi": "बुकिंग दिखाना, वाई-फाई पासवर्ड और चाबी मांगना।"},
            "culturalTip": {"en": "Aadhaar Card or Passport is mandatory for all guests at Indian hotel check-in desks.", "te": "భారతీయ హోటళ్లలో ఆధార్ కార్డు లేదా పాస్‌పోర్ట్ తప్పనిసరిగా చూపించాలి.", "hi": "भारतीय होटलों में आधार कार्ड या पासपोर्ट दिखाना अनिवार्य होता है।"},
            "grammar": {
                "title": {"en": "Stating Bookings (मेरी बुकिंग है)", "te": "నా బుకింగ్ ఉంది", "hi": "मेरी बुकिंग है"},
                "explanation": {"en": "'मेरे नाम से एक कमरा बुक है' means 'A room is booked under my name'.", "te": "నా పేరు మీద రూమ్ బుకింగ్ ఉంది అని చెప్పడానికి ఇది వాడతారు.", "hi": "मेरे नाम से कमरा बुक है कहने के लिए यह वाक्य बोलें।"},
                "ruleSummary": {"en": "मेरी बुकिंग है = I have a booking.", "te": "నాకు బుకింగ్ ఉంది.", "hi": "मेरी बुकिंग है।"},
                "examples": [{"target": "मेरे नाम पर दो दिन की बुकिंग है", "transliteration": "Mere naam par do din ki booking hai", "native": {"en": "I have a two-day booking under my name.", "te": "నా పేరు మీద రెండు రోజుల బుకింగ్ ఉంది.", "hi": "मेरे नाम पर दो दिनों की बुकिंग है।"}}],
                "commonMistakes": [{"incorrect": "मैं रूम बुक", "correct": "मेरी बुकिंग है", "explanation": {"en": "Say 'मेरी बुकिंग है'.", "te": "స్పష్టంగా मेरी बुकिंग है అనాలి.", "hi": "मेरी बुकिंग है बोलें।"}}]
            },
            "vocab": [
                {"word": "बुकिंग", "translit": "Booking", "pron": "బు-కింగ్", "pos": "noun", "meanings": {"en": "Reservation / booking", "te": "రిజర్వేషన్ / బుకింగ్", "hi": "बुकिंग / आरक्षण"}, "exTarget": "मेरी ऑनलाइन बुकिंग है।", "exTranslit": "Meri online booking hai.", "exNative": {"en": "I have an online booking.", "te": "నాకు ఆన్‌లైన్ బుకింగ్ ఉంది.", "hi": "मेरी ऑनलाइन बुकिंग है।"}},
                {"word": "वाई-फाई पासवर्ड", "translit": "Wi-Fi password", "pron": "వై-పై పాస్-వర్డ్", "pos": "noun", "meanings": {"en": "Wi-Fi password", "te": "వైఫై పాస్‌వర్డ్", "hi": "वाई-फाई पासवर्ड"}, "exTarget": "होटल का वाई-फाई पासवर्ड क्या है?", "exTranslit": "Hotel ka Wi-Fi password kya hai?", "exNative": {"en": "What is the hotel's Wi-Fi password?", "te": "హోటల్ వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "होटल का वाई-फाई पासवर्ड क्या है?"}},
                {"word": "चाबी", "translit": "Chaabi", "pron": "చా-బీ", "pos": "noun", "meanings": {"en": "Room key", "te": "తాళం చెవి / రూమ్ కీ", "hi": "कमरे की चाबी"}, "exTarget": "कमरे की चाबी दीजिए।", "exTranslit": "Kamre ki chaabi dijiye.", "exNative": {"en": "Please give the room key.", "te": "గది తాళం ఇవ్వండి.", "hi": "कमरे की चाबी दीजिए।"}},
                {"word": "सामान", "translit": "Saamaan", "pron": "సా-మాన్", "pos": "noun", "meanings": {"en": "Luggage / bags", "te": "సామాన్లు / లగేజ్", "hi": "सामान / बैग"}, "exTarget": "क्या मैं सामान यहाँ रख सकता हूँ?", "exTranslit": "Kya main saamaan yahan rakh sakta hoon?", "exNative": {"en": "Can I keep my luggage here?", "te": "నా లగేజ్ ఇక్కడ ఉంచవచ్చా?", "hi": "क्या मैं सामान यहाँ रख सकता हूँ?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the Wi-Fi password in Hindi?", "te": "'వైఫై పాస్‌వర్డ్ ఏమిటి?' అని హిందీలో ఎలా అడుగుతారు?", "hi": "हिंदी में 'वाई-फाई पासवर्ड क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}, "correct": "वाई-फाई पासवर्ड क्या है?", "options": ["वाई-फाई पासवर्ड क्या है?", "यह कितने का है?", "शौचालय कहाँ है?", "नमस्ते"], "expl": {"en": "वाई-फाई पासवर्ड क्या है? is clear.", "te": "వైఫై పాస్‌వర్డ్ అడిగే సరైన మాట.", "hi": "वाई-फाई पासवर्ड पूछने का वाक्य।"}}
            ]
        }
    ],
    # MODULE 5: Social Fluency & Urgent Help
    [
        {
            "title": {"en": "Making Friends & Contact Info", "te": "స్నేహం చేయడం & నంబర్ అడగడం", "hi": "दोस्त बनाना और फोन नंबर"},
            "objective": {"en": "Ask for phone numbers, WhatsApp, and invite friends for tea.", "te": "ఫోన్ నంబర్ అడగడం మరియు టీ తాగడానికి ఆహ్వానించడం నేర్చుకోండి.", "hi": "फोन नंबर मांगना और चाय के लिए आमंत्रित करना।"},
            "culturalTip": {"en": "WhatsApp is ubiquitous in India; sharing numbers or WhatsApp QR codes is universal.", "te": "భారతదేశంలో వాట్సాప్ అందరూ ఉపయోగిస్తారు; నంబర్లు మార్చుకోవడం సహజం.", "hi": "भारत में हर कोई व्हाट्सएप का उपयोग करता है।"},
            "grammar": {
                "title": {"en": "Suggestions (-एँ?)", "te": "చేద్దామా? (-ఏం?)", "hi": "क्या हम करें? (-एँ?)"},
                "explanation": {"en": "'क्या हम साथ चलें?' asks 'Shall we go together?'. 'चाय पिएँ?' (Shall we have tea?).", "te": "కలిసి టీ తాగుదామా అని అడగడానికి 'क्या हम चाय पिएँ?' అనాలి.", "hi": "क्या हम चाय पिएं पूछने के लिए यह रूप उपयोग करें।"},
                "ruleSummary": {"en": "क्या हम [Verb]एँ? = Shall we [Verb]?", "te": "మనం [పని] చేద్దామా?", "hi": "क्या हम [काम] करें?"},
                "examples": [{"target": "क्या हम कल शाम को मिलें?", "transliteration": "Kya hum kal shaam ko milein?", "native": {"en": "Shall we meet tomorrow evening?", "te": "మనం రేపు సాయంత్రం కలుద్దామా?", "hi": "क्या हम कल शाम को मिलें?"}}],
                "commonMistakes": [{"incorrect": "तू चल मेरे साथ", "correct": "क्या आप चलेंगे?", "explanation": {"en": "Always polite tone.", "te": "మర్యాదగా ఆహ్వానించాలి.", "hi": "हमेशा विनम्र सुझाव दें।"}}]
            },
            "vocab": [
                {"word": "फोन नंबर", "translit": "Phone number", "pron": "ఫోన్ నం-బర్", "pos": "noun", "meanings": {"en": "Phone number", "te": "ఫోన్ నంబర్", "hi": "फोन नंबर"}, "exTarget": "आपका फोन नंबर क्या है?", "exTranslit": "Aapka phone number kya hai?", "exNative": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}},
                {"word": "कल", "translit": "Kal", "pron": "కల్", "pos": "noun", "meanings": {"en": "Tomorrow / yesterday", "te": "రేపు / నిన్న", "hi": "कल (आने वाला)"}, "exTarget": "कल मिलते हैं।", "exTranslit": "Kal milte hain.", "exNative": {"en": "See you tomorrow.", "te": "రేపు కలుద్దాం.", "hi": "कल मिलते हैं।"}},
                {"word": "समय", "translit": "Samay", "pron": "స-మయ్", "pos": "noun", "meanings": {"en": "Time", "te": "సమయం", "hi": "समय"}, "exTarget": "क्या आपके पास समय है?", "exTranslit": "Kya aapke paas samay hai?", "exNative": {"en": "Do you have time?", "te": "మీ దగ్గర సమయం ఉందా?", "hi": "क्या आपके पास समय है?"}},
                {"word": "साथ में", "translit": "Saath mein", "pron": "సాత్ మేం", "pos": "adverb", "meanings": {"en": "Together", "te": "కలిసి", "hi": "साथ में"}, "exTarget": "साथ में चलते हैं।", "exTranslit": "Saath mein chalte hain.", "exNative": {"en": "Let's go together.", "te": "కలిసి వెళ్దాం.", "hi": "साथ में चलते हैं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'What is your phone number?' in Hindi?", "te": "'మీ ఫోన్ నంబర్ ఏమిటి?' అని హిందీలో ఎలా అడుగుతారు?", "hi": "हिंदी में 'आपका फोन नंबर क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}, "correct": "आपका फोन नंबर क्या है?", "options": ["आपका फोन नंबर क्या है?", "यह कितने का है?", "शौचालय कहाँ है?", "नमस्ते"], "expl": {"en": "आपका फोन नंबर क्या है? is polite.", "te": "ఫోన్ నంబర్ అడిగే స్పష్టమైన మాట.", "hi": "फोन नंबर पूछने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Emergencies & Medical Help", "te": "అత్యవసర సహాయం & డాక్టర్", "hi": "आपातकाल और डॉक्टर की सहायता"},
            "objective": {"en": "Call for help ('मदद कीजिए!'), locate a hospital, and dial 112.", "te": "సహాయం కోరడం ('मदद कीजिए!'), ఆసుపత్రి మరియు ఎమర్జెన్సీ నంబర్లు.", "hi": "मदद मांगना ('मदद कीजिए!'), अस्पताल और 112 डायल करना।"},
            "culturalTip": {"en": "Dial 112 for all-in-one emergency services (Police, Ambulance, Fire) across India.", "te": "భారతదేశంలో అన్ని అత్యవసర సేవల కోసం 112 డయల్ చేయాలి.", "hi": "भारत में सभी आपातकालीन सेवाओं के लिए 112 डायल करें।"},
            "grammar": {
                "title": {"en": "Urgent Imperative (मदद कीजिए)", "te": "సహాయం కోరడం", "hi": "आपातकालीन मदद मांगना"},
                "explanation": {"en": "'मदद कीजिए!' means 'Please help!'. 'डॉक्टर को बुलाइए' means 'Call the doctor'.", "te": "సహాయం కోసం 'मदद कीजिए!' లేదా 'बचाओ!' అంటారు.", "hi": "मदद के लिए 'मदद कीजिए!' बोलें।"},
                "ruleSummary": {"en": "मदद कीजिए! = Please help!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"},
                "examples": [{"target": "कोई मदद कीजिए, यहाँ दुर्घटना हुई है", "transliteration": "Koi madad kijiye, yahan durghatna hui hai", "native": {"en": "Someone please help, an accident occurred here.", "te": "సహాయం చేయండి, ఇక్కడ ప్రమాదం జరిగింది.", "hi": "मदद कीजिए, यहाँ दुर्घटना हुई है।"}}],
                "commonMistakes": [{"incorrect": "मदद कर", "correct": "मदद कीजिए!", "explanation": {"en": "Always polite in public.", "te": "స్పష్టంగా मदद कीजिए అనాలి.", "hi": "हमेशा मदद कीजिए! कहें।"}}]
            },
            "vocab": [
                {"word": "मदद कीजिए!", "translit": "Madad kijiye!", "pron": "మ-దద్ కీ-జి-యే!", "pos": "phrase", "meanings": {"en": "Please help me!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"}, "exTarget": "मदद कीजिए! यहाँ कोई बीमार है।", "exTranslit": "Madad kijiye! Yahan koi beemar hai.", "exNative": {"en": "Please help! Someone is sick here.", "te": "సహాయం చేయండి! ఒకరికి ఆరోగ్యం బాగాలేదు.", "hi": "मदद कीजिए! यहाँ कोई बीमार है।"}},
                {"word": "अस्पताल", "translit": "Aspataal", "pron": "అస్-ప-తాల్", "pos": "noun", "meanings": {"en": "Hospital", "te": "ఆసుపత్రి", "hi": "अस्पताल"}, "exTarget": "नज़दीकी अस्पताल कहाँ है?", "exTranslit": "Nazdeeki aspataal kahan hai?", "exNative": {"en": "Where is the nearest hospital?", "te": "దగ్గరలోని ఆసుపత్రి ఎక్కడ ఉంది?", "hi": "सबसे पास का अस्पताल कहाँ है?"}},
                {"word": "दवा की दुकान", "translit": "Dawa ki dukaan", "pron": "ద-వా కీ దు-కాన్", "pos": "noun", "meanings": {"en": "Pharmacy / chemist", "te": "మందుల షాప్", "hi": "दवा की दुकान"}, "exTarget": "दवा की दुकान खुली है?", "exTranslit": "Dawa ki dukaan khuli hai?", "exNative": {"en": "Is the pharmacy open?", "te": "మందుల షాప్ తెరిచే ఉందా?", "hi": "क्या दवा की दुकान खुली है?"}},
                {"word": "पुलिस", "translit": "Police", "pron": "పో-లీస్", "pos": "noun", "meanings": {"en": "Police", "te": "పోలీసులు", "hi": "पुलिस"}, "exTarget": "पुलिस को फ़ोन कीजिए।", "exTranslit": "Police ko phone kijiye.", "exNative": {"en": "Call the police.", "te": "పోలీసులకు ఫోన్ చేయండి.", "hi": "पुलिस को फ़ोन कीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you urgently call for help in Hindi?", "te": "అత్యవసరంలో 'సహాయం చేయండి!' అని ఎలా అంటారు?", "hi": "हिंदी में आपातकाल में 'मदद कीजिए!' कैसे पुकारेंगे?"}, "prompt": {"en": "Please help!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"}, "correct": "मदद कीजिए!", "options": ["मदद कीजिए!", "नमस्ते", "धन्यवाद", "यह कितने का है?"], "expl": {"en": "मदद कीजिए! is the standard emergency plea.", "te": "సహాయం కోసం వాడే అత్యవసర మాట.", "hi": "मदद मांगने का मुख्य वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Lost Items & Speaking Slowly", "te": "పోగొట్టుకున్న వస్తువులు & మెల్లగా మాట్లాడమనడం", "hi": "खोया सामान और धीरे बोलना"},
            "objective": {"en": "Report a lost wallet or phone and ask locals to speak slowly ('कृपया धीरे बोलिए').", "te": "పర్స్ పోయిందని చెప్పడం మరియు మెల్లగా మాట్లాడమనడం.", "hi": "खोया पर्स बताना और धीरे बोलने का अनुरोध करना।"},
            "culturalTip": {"en": "Saying 'कृपया थोड़ा धीरे बोलिए' (Please speak a bit slowly) helps native Hindi speakers adjust to your pace.", "te": "హిందీ వారు వేగంగా మాట్లాడినప్పుడు 'कृपया धीरे बोलिए' అంటే నెమ్మదిగా చెబుతారు.", "hi": "धीरे बोलने का विनम्र अनुरोध करने पर लोग आसानी से समझकर बोलते हैं।"},
            "grammar": {
                "title": {"en": "Asking to Slow Down (कृपया धीरे बोलिए)", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి", "hi": "कृपया धीरे बोलिए"},
                "explanation": {"en": "कृपया (please) + धीरे (slowly) + बोलिए (speak) is the standard polite request.", "te": "నెమ్మదిగా చెప్పమనడానికి कृपया धीरे बोलिए అనాలి.", "hi": "धीरे बोलने के लिए कृपया धीरे बोलिए कहें।"},
                "ruleSummary": {"en": "कृपया धीरे बोलिए = Please speak slowly.", "te": "నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"},
                "examples": [{"target": "मुझे समझ नहीं आया, कृपया फिर से बोलिए", "transliteration": "Mujhe samajh nahi aaya, kripya phir se boliye", "native": {"en": "I didn't understand, please say it again.", "te": "నాకు అర్థం కాలేదు, దయచేసి మళ్లీ చెప్పండి.", "hi": "मुझे समझ नहीं आया, कृपया फिर से बोलिए।"}}],
                "commonMistakes": [{"incorrect": "तू धीरे बोल", "correct": "कृपया धीरे बोलिए", "explanation": {"en": "Always polite honorific form.", "te": "మర్యాదగా చెప్పాలి.", "hi": "हमेशा आदरपूर्वक बोलिए कहें।"}}]
            },
            "vocab": [
                {"word": "बटुआ", "translit": "Batua", "pron": "బ-టు-వా", "pos": "noun", "meanings": {"en": "Wallet / purse", "te": "పర్స్ / పర్సు", "hi": "बटुआ / पर्स"}, "exTarget": "मेरा बटुआ खो गया है।", "exTranslit": "Mera batua kho gaya hai.", "exNative": {"en": "My wallet is lost.", "te": "నా పర్స్ పోయింది.", "hi": "मेरा बटुआ खो गया है।"}},
                {"word": "मोबाइल", "translit": "Mobile", "pron": "మో-బైల్", "pos": "noun", "meanings": {"en": "Mobile phone", "te": "మొబైల్ ఫోన్", "hi": "मोबाइल फोन"}, "exTarget": "मेरा मोबाइल छूट गया।", "exTranslit": "Mera mobile chhoot gaya.", "exNative": {"en": "I left my mobile behind.", "te": "నా మొబైల్ అక్కడ ఉండిపోయింది.", "hi": "मेरा मोबाइल छूट गया।"}},
                {"word": "धीरे", "translit": "Dheere", "pron": "ధీ-రే", "pos": "adverb", "meanings": {"en": "Slowly", "te": "నెమ్మదిగా", "hi": "धीरे-धीरे"}, "exTarget": "कृपया धीरे बोलिए।", "exTranslit": "Kripya dheere boliye.", "exNative": {"en": "Please speak slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"}},
                {"word": "फिर से", "translit": "Phir se", "pron": "ఫిర్ సే", "pos": "adverb", "meanings": {"en": "Again / once more", "te": "మళ్లీ / మరొక్కసారి", "hi": "दोबारा / फिर से"}, "exTarget": "एक बार फिर से कहिए।", "exTranslit": "Ek baar phir se kahiye.", "exNative": {"en": "Please say it once again.", "te": "మరొక్కసారి చెప్పండి.", "hi": "कृपया एक बार फिर कहिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask someone to speak more slowly in Hindi?", "te": "'దయచేసి నెమ్మదిగా మాట్లాడండి' అని ఎలా అంటారు?", "hi": "हिंदी में 'कृपया धीरे बोलिए' कैसे कहेंगे?"}, "prompt": {"en": "Please speak slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"}, "correct": "कृपया धीरे बोलिए", "options": ["कृपया धीरे बोलिए", "मदद कीजिए!", "यह कितने का है?", "नमस्ते"], "expl": {"en": "कृपया धीरे बोलिए politely requests slower speech.", "te": "నెమ్మదిగా మాట్లాడమని కోరే మర్యాదపూర్వక మాట.", "hi": "धीरे बोलने का विनम्र अनुरोध।"}}
            ]
        }
    ]
]
