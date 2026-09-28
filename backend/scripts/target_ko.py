# scripts/target_ko.py
# -*- coding: utf-8 -*-
"""15 Real-Life Situational Korean Lessons across 5 Modules."""

KO_LESSONS = [
    # MODULE 1: Everyday Survival & Greetings
    [
        {
            "title": {"en": "Daily Greetings & Hello", "te": "రోజువారీ శుభాకాంక్షలు (Hello)", "hi": "दैनिक अभिवादन (Hello)"},
            "objective": {"en": "Master 안녕하세요 and greeting locals naturally in Korean shops and streets.", "te": "కొరియన్ షాపులు మరియు వీధుల్లో స్థానికులను నమస్కరించడం నేర్చుకోండి.", "hi": "दुकानों और सड़कों पर स्थानीय लोगों का अभिवादन करना सीखें।"},
            "culturalTip": {"en": "Bowing slightly at a 15-30 degree angle while saying 안녕하세요 is standard Korean etiquette.", "te": "కొరియాలో 안녕하세요 చెప్పేటప్పుడు తల కొద్దిగా వంచి నమస్కరించడం మర్యాద.", "hi": "안녕하세요 बोलते समय थोड़ा सिर झुकाना कोरियाई शिष्टाचार है।"},
            "grammar": {
                "title": {"en": "Polite Ending (-요)", "te": "మర్యాదపూర్వక ముగింపు (-요)", "hi": "विनम्र अंत (-요)"},
                "explanation": {"en": "Adding -요 makes your sentences polite and friendly in everyday conversation.", "te": "క్రియ చివర -요 చేరిస్తే రోజువారీ సంభాషణలో మర్యాద వస్తుంది.", "hi": "क्रिया के अंत में -요 जोड़ने से वाक्य विनम्र बन जाता है।"},
                "ruleSummary": {"en": "Verb Stem + -아요/-어요 = Polite form.", "te": "క్రియ + -아요/-어요 = మర్యాద రూపం.", "hi": "क्रिया + -아요/-어요 = विनम्र रूप।"},
                "examples": [{"target": "안녕하세요", "transliteration": "Annyeonghaseyo", "native": {"en": "Hello / How are you?", "te": "నమస్కారం / బాగున్నారా?", "hi": "नमस्ते / आप कैसे हैं?"}}],
                "commonMistakes": [{"incorrect": "안녕 (to elders)", "correct": "안녕하세요", "explanation": {"en": "Use 안녕하세요 with everyone except close children.", "te": "పెద్దవారితో మాట్లాడేటప్పుడు ఎప్పుడూ 안녕하세요 అనాలి.", "hi": "बड़ों से बात करते समय हमेशा 안녕하세요 कहें।"}}]
            },
            "vocab": [
                {"word": "안녕하세요", "translit": "Annyeonghaseyo", "pron": "ఆన్-న్యాంగ్-హా-సే-యో", "pos": "greeting", "meanings": {"en": "Hello / Good day", "te": "నమస్కారం / బాగున్నారా", "hi": "नमस्ते / हैलो"}, "exTarget": "안녕하세요! 만나서 반갑습니다.", "exTranslit": "Annyeonghaseyo! Mannaseo bangapsumnida.", "exNative": {"en": "Hello! Nice to meet you.", "te": "నమస్కారం! మిమ్మల్ని కలవడం సంతోషం.", "hi": "नमस्ते! आपसे मिलकर खुशी हुई।"}},
                {"word": "감사합니다", "translit": "Gamsahamnida", "pron": "గమ్-సా-హామ్-ని-దా", "pos": "phrase", "meanings": {"en": "Thank you (formal)", "te": "చాలా ధన్యవాదాలు", "hi": "बहुत धन्यवाद"}, "exTarget": "도와주셔서 감사합니다.", "exTranslit": "Dowajusyeoseo gamsahamnida.", "exNative": {"en": "Thank you for helping me.", "te": "నాకు సహాయం చేసినందుకు ధన్యవాదాలు.", "hi": "मेरी मदद के लिए धन्यवाद।"}},
                {"word": "안녕히 가세요", "translit": "Annyeonghi gaseyo", "pron": "ఆన్-న్యాంగ్-హి గా-సే-యో", "pos": "phrase", "meanings": {"en": "Goodbye (to one leaving)", "te": "వెళ్లి రండి (వీడ్కోలు)", "hi": "अलविदा (जाने वाले से)"}, "exTarget": "안녕히 가세요! 내일 봐요.", "exTranslit": "Annyeonghi gaseyo! Naeil bwayo.", "exNative": {"en": "Goodbye! See you tomorrow.", "te": "వెళ్లి రండి! రేపు కలుద్దాం.", "hi": "अलविदा! कल मिलते हैं।"}},
                {"word": "네", "translit": "Ne", "pron": "నే", "pos": "interjection", "meanings": {"en": "Yes / Okay", "te": "అవును / సరే", "hi": "हाँ / ठीक है"}, "exTarget": "네, 알겠습니다.", "exTranslit": "Ne, algesseumnida.", "exNative": {"en": "Yes, I understand.", "te": "అవును, నాకు అర్థమైంది.", "hi": "हाँ, मैं समझ गया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the correct greeting for 'Hello'.", "te": "నమస్కారానికి సరైన కొరియన్ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही शब्द चुनें।"}, "prompt": {"en": "Polite Hello", "te": "నమస్కారం", "hi": "नमस्ते"}, "correct": "안녕하세요", "options": ["안녕하세요", "감사합니다", "죄송합니다", "안녕히 가세요"], "expl": {"en": "안녕하세요 is the standard polite greeting.", "te": "안녕하세요 ప్రామాణిక కొరియన్ నమస్కారం.", "hi": "안녕하세요 मानक अभिवादन है।"}},
                {"instruction": {"en": "Choose the formal phrase for 'Thank you'.", "te": "'ధన్యవాదాలు' కి సరైనది ఏది?", "hi": "'धन्यवाद' के लिए सही विकल्प कौन सा है?"}, "prompt": {"en": "Thank you", "te": "ధన్యవాదాలు", "hi": "धन्यवाद"}, "correct": "감사합니다", "options": ["감사합니다", "안녕하세요", "네", "아니요"], "expl": {"en": "감사합니다 expresses sincere gratitude.", "te": "కృతజ్ఞత తెలపడానికి 감사합니다 అంటారు.", "hi": "आभार के लिए 감사합니다 का प्रयोग होता है।"}}
            ]
        },
        {
            "title": {"en": "Apologies & Excuse Me", "te": "క్షమాపణలు & మర్యాదపూర్వక మాటలు", "hi": "क्षमा याचना और शिष्टाचार"},
            "objective": {"en": "Apologize politely and get attention using 죄송합니다 and 실례합니다.", "te": "క్షమించండి మరియు కొద్దిగా వినండి అని గౌరవంగా చెప్పడం.", "hi": "विनम्रता से माफ़ी मांगना और दूसरों का ध्यान आकर्षित करना।"},
            "culturalTip": {"en": "Say 실례합니다 when walking through crowded subway trains or asking strangers for directions.", "te": "రద్దీగా ఉండే మెట్రోలో వెళ్లేటప్పుడు '실례합니다' అనడం మర్యాద.", "hi": "भीड़भाड़ में निकलते समय 실례합니다 बोलें।"},
            "grammar": {
                "title": {"en": "Polite Apology (죄송합니다)", "te": "గౌరవ క్షమాపణ", "hi": "विनम्र क्षमा"},
                "explanation": {"en": "죄송합니다 is used for genuine apologies in public.", "te": "ప్రజా ప్రదేశాల్లో క్షమాపణ చెప్పడానికి 죄송합니다 వాడతారు.", "hi": "सार्वजनिक स्थानों पर माफ़ी मांगने के लिए 죄송합니다 उपयुक्त है।"},
                "ruleSummary": {"en": "죄송합니다 = Formal I am sorry.", "te": "죄송합니다 = నన్ను క్షమించండి.", "hi": "죄송합니다 = मुझे माफ़ कीजिए।"},
                "examples": [{"target": "늦어서 죄송합니다", "transliteration": "Neujeoseo joesonghamnida", "native": {"en": "Sorry for being late.", "te": "ఆలస్యమైనందుకు క్షమించండి.", "hi": "देर से आने के लिए माफ़ करें।"}}],
                "commonMistakes": [{"incorrect": "미안해요 (to strangers)", "correct": "죄송합니다", "explanation": {"en": "Use 죄송합니다 with adults and strangers.", "te": "పరిచయం లేనివారితో 죄송합니다 అనాలి.", "hi": "अजनबियों से हमेशा 죄송합니다 कहें।"}}]
            },
            "vocab": [
                {"word": "죄송합니다", "translit": "Joesonghamnida", "pron": "జ్వే-సోంగ్-హామ్-ని-దా", "pos": "phrase", "meanings": {"en": "I am sorry", "te": "నన్ను క్షమించండి", "hi": "मुझे माफ़ कीजिए"}, "exTarget": "정말 죄송합니다.", "exTranslit": "Jeongmal joesonghamnida.", "exNative": {"en": "I am really sorry.", "te": "నిజంగా క్షమించండి.", "hi": "मुझे सचमुच खेद है।"}},
                {"word": "실례합니다", "translit": "Sillyehamnida", "pron": "షిల్-ల్యే-హామ్-ని-దా", "pos": "phrase", "meanings": {"en": "Excuse me", "te": "కొద్దిగా వినండి / ఎక్స్‌క్యూజ్ మీ", "hi": "माफ़ कीजिए / सुनिए"}, "exTarget": "실례합니다, 길 좀 물어볼게요.", "exTranslit": "Sillyehamnida, gil jom mureobolgeyo.", "exNative": {"en": "Excuse me, can I ask the way?", "te": "కొద్దిగా వినండి, దారి అడగవచ్చా?", "hi": "सुनिए, क्या रास्ता पूछ सकता हूँ?"}},
                {"word": "괜찮아요", "translit": "Gwaenchanayo", "pron": "గ్వేన్-ఛా-నా-యో", "pos": "phrase", "meanings": {"en": "It is okay / No problem", "te": "పర్వాలేదు / అంతా బాగుంది", "hi": "कोई बात नहीं / ठीक है"}, "exTarget": "괜찮아요, 걱정 마세요.", "exTranslit": "Gwaenchanayo, geokjeong maseyo.", "exNative": {"en": "It's fine, don't worry.", "te": "పర్వాలేదు, ఆందోళన వద్దు.", "hi": "कोई बात नहीं, चिंता मत कीजिए।"}},
                {"word": "아니요", "translit": "Aniyo", "pron": "ఆ-ని-యో", "pos": "interjection", "meanings": {"en": "No", "te": "కాదు / లేదు", "hi": "नहीं"}, "exTarget": "아니요, 괜찮습니다.", "exTranslit": "Aniyo, gwaenchansumnida.", "exNative": {"en": "No, I am fine.", "te": "లేదు, నేను బానే ఉన్నాను.", "hi": "नहीं, मैं ठीक हूँ।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the formal apology for 'I am sorry'.", "te": "'నన్ను క్షమించండి' కి సరైనది ఎంచుకోండి.", "hi": "'मुझे माफ़ कीजिए' के लिए सही विकल्प चुनें।"}, "prompt": {"en": "I am sorry", "te": "నన్ను క్షమించండి", "hi": "मुझे माफ़ कीजिए"}, "correct": "죄송합니다", "options": ["죄송합니다", "괜찮아요", "실례합니다", "안녕하세요"], "expl": {"en": "죄송합니다 is the standard respectful apology.", "te": "మర్యాదపూర్వక క్షమాపణకు 죄송합니다 వాడతారు.", "hi": "죄송합니다 मानक माफ़ी है।"}}
            ]
        },
        {
            "title": {"en": "Introducing Yourself & Origin", "te": "పరిచయం & ఎక్కడి నుంచి వచ్చారో చెప్పడం", "hi": "आत्मपरिचय और गृह देश"},
            "objective": {"en": "State your name, nationality, and profession with 저는 ... 이에요.", "te": "మీ పేరు, ఊరు మరియు వృత్తిని కొరియన్‌లో చెప్పడం నేర్చుకోండి.", "hi": "अपना नाम, देश और पेशा बताना सीखें।"},
            "culturalTip": {"en": "Handing business cards with both hands is a sign of high respect in Korea.", "te": "విజిటింగ్ కార్డును రెండు చేతులతో ఇవ్వడం మరియు తీసుకోవడం కొరియన్ పద్ధతి.", "hi": "दोनों हाथों से विज़िटिंग कार्ड देना कोरिया में सम्मान का प्रतीक है।"},
            "grammar": {
                "title": {"en": "Identity Copula (이에요/예요)", "te": "గుర్తింపు రూపం (이에요/예요)", "hi": "पहचान रूप (이에요/예요)"},
                "explanation": {"en": "Use 이에요 after consonant endings, 예요 after vowel endings: 저는 [Name]예요.", "te": "హల్లుల తర్వాత 이에요, అచ్చుల తర్వాత 예요 వస్తుంది.", "hi": "व्यंजन के बाद 이에요, स्वर के बाद 예요 लगता है।"},
                "ruleSummary": {"en": "저 (I) + 는 + [Noun] + 이에요/예요.", "te": "నేను [పేరు]ని.", "hi": "मैं [नाम] हूँ।"},
                "examples": [{"target": "저는 라훌이에요", "transliteration": "Jeoneun Rahurieyo", "native": {"en": "I am Rahul.", "te": "నా పేరు రాహుల్.", "hi": "मैं राहुल हूँ।"}}],
                "commonMistakes": [{"incorrect": "나 이름 라훌", "correct": "제 이름은 라훌이에요", "explanation": {"en": "Use polite 제 이름은 instead of casual 나.", "te": "మర్యాదగా 제 이름은 అనాలి.", "hi": "विनम्रता से 제 이름은 कहें।"}}]
            },
            "vocab": [
                {"word": "이름", "translit": "Ireum", "pron": "ఈ-రమ్", "pos": "noun", "meanings": {"en": "Name", "te": "పేరు", "hi": "नाम"}, "exTarget": "이름이 뭐예요?", "exTranslit": "Ireumi mwoyeyo?", "exNative": {"en": "What is your name?", "te": "మీ పేరేమిటి?", "hi": "आपका नाम क्या है?"}},
                {"word": "사람", "translit": "Saram", "pron": "సా-రామ్", "pos": "noun", "meanings": {"en": "Person / nationality", "te": "వ్యక్తి / దేశస్థుడు", "hi": "व्यक्ति / नागरिक"}, "exTarget": "저는 인도 사람이에요.", "exTranslit": "Jeoneun indo saramieyo.", "exNative": {"en": "I am Indian.", "te": "నేను భారతీయుడిని.", "hi": "मैं भारतीय हूँ।"}},
                {"word": "반갑습니다", "translit": "Bangapsumnida", "pron": "బన్-గప్-సుమ్-ని-దా", "pos": "phrase", "meanings": {"en": "Nice to meet you", "te": "మిమ్మల్ని కలవడం సంతోషం", "hi": "आपसे मिलकर खुशी हुई"}, "exTarget": "만나서 반갑습니다.", "exTranslit": "Mannaseo bangapsumnida.", "exNative": {"en": "Pleased to meet you.", "te": "కలవడం చాలా ఆనందంగా ఉంది.", "hi": "आपसे मिलकर बहुत प्रसन्नता हुई।"}},
                {"word": "학생", "translit": "Haksaeng", "pron": "హక్-సేంగ్", "pos": "noun", "meanings": {"en": "Student", "te": "విద్యార్థి", "hi": "छात्र"}, "exTarget": "저는 학생이에요.", "exTranslit": "Jeoneun haksaeng-ieyo.", "exNative": {"en": "I am a student.", "te": "నేను విద్యార్థిని.", "hi": "मैं एक छात्र हूँ।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the phrase for 'Nice to meet you'.", "te": "'మిమ్మల్ని కలవడం సంతోషం' కి సరైనది ఏది?", "hi": "'आपसे मिलकर खुशी हुई' के लिए सही वाक्य चुनें।"}, "prompt": {"en": "Nice to meet you", "te": "మిమ్మల్ని కలవడం సంతోషం", "hi": "आपसे मिलकर खुशी हुई"}, "correct": "만나서 반갑습니다", "options": ["만나서 반갑습니다", "안녕히 가세요", "이거 얼마예요", "화장실 어디예요"], "expl": {"en": "만나서 반갑습니다 closes introductions politely.", "te": "పరిచయం చేసుకునేటప్పుడు ఈ మాట వాడతారు.", "hi": "परिचय के अंत में यह वाक्य बोला जाता है।"}}
            ]
        }
    ],
    # MODULE 2: Real-World Shopping & Numbers
    [
        {
            "title": {"en": "How Much is This? (Prices & Numbers)", "te": "ఇది ఎంత ధర? (ధరలు & సంఖ్యలు)", "hi": "यह कितने का है? (दाम और संख्याएँ)"},
            "objective": {"en": "Ask '이거 얼마예요?' and understand prices from 1,000 to 50,000 Won.", "te": "'దీని ధర ఎంత?' అని అడగడం మరియు సంఖ్యలను అర్థం చేసుకోవడం.", "hi": "'यह कितने का है?' पूछना और वॉन में कीमतें समझना।"},
            "culturalTip": {"en": "Sino-Korean numbers (일, 이, 삼... 천, 만) are used for Korean currency Won (원).", "te": "డబ్బు మరియు ధరల కోసం సినో-కొరియన్ సంఖ్యలను వాడతారు.", "hi": "पैसों और कीमतों के लिए सनो-कोरियाई गिनती का प्रयोग होता है।"},
            "grammar": {
                "title": {"en": "Asking Prices (얼마예요?)", "te": "ధర అడగడం (얼마예요?)", "hi": "दाम पूछना (얼मा예요?)"},
                "explanation": {"en": "Point to an item and say 이거 얼마예요? (How much is this?).", "te": "వస్తువును చూపిస్తూ '이거 얼마예요?' అని సులభంగా అడగవచ్చు.", "hi": "किसी चीज़ की तरफ इशारा करके 이거 얼마예요? पूछें।"},
                "ruleSummary": {"en": "이거 (this) + 얼마예요? (how much is it?)", "te": "ఇది + ఎంత ధర?", "hi": "यह + कितने का है?"},
                "examples": [{"target": "이 사과 얼마예요?", "transliteration": "I sagwa eolmayeyo?", "native": {"en": "How much is this apple?", "te": "ఈ ఆపిల్ ఎంత?", "hi": "यह सेब कितने का है?"}}],
                "commonMistakes": [{"incorrect": "이거 몇 돈?", "correct": "이거 얼마예요?", "explanation": {"en": "Always use 얼마예요 to ask prices.", "te": "ధర అడగడానికి 얼마예요 వాడాలి.", "hi": "दाम के लिए हमेशा 얼마예요 का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "얼마", "translit": "Eolma", "pron": "ఓల్-మా", "pos": "pronoun", "meanings": {"en": "How much", "te": "ఎంత", "hi": "कितना"}, "exTarget": "이거 얼마예요?", "exTranslit": "Igeo eolmayeyo?", "exNative": {"en": "How much is this?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}},
                {"word": "원", "translit": "Won", "pron": "వోన్", "pos": "noun", "meanings": {"en": "Won (currency)", "te": "వోన్ (కొరియన్ కరెన్సీ)", "hi": "वॉन (कोरियाई मुद्रा)"}, "exTarget": "오천 원이에요.", "exTranslit": "Ocheon wonieyo.", "exNative": {"en": "It is 5,000 Won.", "te": "ఇది 5,000 వోన్లు.", "hi": "यह 5,000 वॉन का है।"}},
                {"word": "이거", "translit": "Igeo", "pron": "ఈ-గో", "pos": "pronoun", "meanings": {"en": "This thing", "te": "ఇది / ఈ వస్తువు", "hi": "यह वस्तु"}, "exTarget": "이거 주세요.", "exTranslit": "Igeo juseyo.", "exNative": {"en": "Please give me this.", "te": "ఇది నాకు ఇవ్వండి.", "hi": "कृपया मुझे यह दीजिए।"}},
                {"word": "비싸요", "translit": "Bissayo", "pron": "బి-స్సా-యో", "pos": "adjective", "meanings": {"en": "It is expensive", "te": "చాలా ఖరీదైనది", "hi": "महँगा है"}, "exTarget": "조금 비싸요.", "exTranslit": "Jogeum bissayo.", "exNative": {"en": "It is a bit expensive.", "te": "ఇది కాస్త ఖరీదైనది.", "hi": "यह थोड़ा महँगा है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'How much is this?' in Korean?", "te": "'దీని ధర ఎంత?' అని కొరియన్‌లో ఎలా అడుగుతారు?", "hi": "कोरियाई में 'यह कितने का है?' कैसे पूछेंगे?"}, "prompt": {"en": "How much is this?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "correct": "이거 얼마예요?", "options": ["이거 얼마예요?", "어디에 가요?", "이름이 뭐예요?", "맛있어요?"], "expl": {"en": "이거 얼마예요? is the essential shopping inquiry.", "te": "ధర అడిగే ముఖ్యమైన ప్రశ్న ఇది.", "hi": "दाम पूछने का मुख्य वाक्य यही है।"}}
            ]
        },
        {
            "title": {"en": "Paying by Card, Cash & Receipt", "te": "కార్డు, నగదు చెల్లింపు & రసీదు", "hi": "कार्ड, नकद और रसीद"},
            "objective": {"en": "Ask '카드 돼요?', request a bag, and ask for a receipt at checkout.", "te": "కార్డు చెల్లింపు, క్యారీ బ్యాగ్ మరియు రసీదు అడగడం నేర్చుకోండి.", "hi": "कार्ड से भुगतान, बैग और रसीद मांगना सीखें।"},
            "culturalTip": {"en": "Cashless payments and mobile cards are universally supported in South Korea.", "te": "కొరియాలో ప్రతి చిన్న దుకాణంలోనూ కార్డు మరియు మొబైల్ పేమెంట్లు ఉంటాయి.", "hi": "दक्षिण कोरिया में लगभग सभी जगह कार्ड से भुगतान स्वीकार होता है।"},
            "grammar": {
                "title": {"en": "Requesting Items (-주세요)", "te": "దయచేసి ఇవ్వండి (-주세요)", "hi": "कृपया दीजिए (-주세요)"},
                "explanation": {"en": "Add 주세요 (juseyo) to any item to politely ask for it: [Item] + 주세요.", "te": "ఏదైనా వస్తువు తర్వాత 주세요 చేర్చితే 'దయచేసి ఇవ్వండి' అని అర్థం.", "hi": "वस्तु के नाम के बाद 주세요 लगाने से 'कृपया दीजिए' का अर्थ बनता है।"},
                "ruleSummary": {"en": "[Noun] + 주세요 = Please give me [Noun].", "te": "[వస్తువు] + 주세요 = నాకు ఇవ్వండి.", "hi": "[वस्तु] + 주세요 = कृपया दीजिए।"},
                "examples": [{"target": "영수증 주세요", "transliteration": "Yeongsujeung juseyo", "native": {"en": "Receipt please.", "te": "రసీదు ఇవ్వండి.", "hi": "रसीद दीजिए।"}}],
                "commonMistakes": [{"incorrect": "카드 줘", "correct": "카드 돼요?", "explanation": {"en": "Politely ask '카드 돼요?' (Is card accepted?).", "te": "మర్యాదగా '카드 돼요?' అని అడగాలి.", "hi": "विनम्रता से कार्ड भुगतान के लिए पूछें।"}}]
            },
            "vocab": [
                {"word": "카드", "translit": "Kadeu", "pron": "కా-డు", "pos": "noun", "meanings": {"en": "Card (credit/debit)", "te": "కార్డు", "hi": "कार्ड"}, "exTarget": "카드 돼요?", "exTranslit": "Kadeu dwaeyo?", "exNative": {"en": "Can I pay with card?", "te": "కార్డు తీసుకుంటారా?", "hi": "क्या कार्ड चलेगा?"}},
                {"word": "현금", "translit": "Hyeongeum", "pron": "హ్యాన్-గుమ్", "pos": "noun", "meanings": {"en": "Cash", "te": "నగదు", "hi": "नकद"}, "exTarget": "현금 영수증 해주세요.", "exTranslit": "Hyeongeum yeongsujeung haejuseyo.", "exNative": {"en": "Cash receipt please.", "te": "నగదు రసీదు ఇవ్వండి.", "hi": "नकद रसीद दीजिए।"}},
                {"word": "영수증", "translit": "Yeongsujeung", "pron": "యాంగ్-సు-జుంగ్", "pos": "noun", "meanings": {"en": "Receipt", "te": "రసీదు / బిల్లు", "hi": "रसीद / बिल"}, "exTarget": "영수증 버려주세요.", "exTranslit": "Yeongsujeung beoryeojuseyo.", "exNative": {"en": "Please dispose of receipt.", "te": "రసీదు అక్కర్లేదు (పడేయండి).", "hi": "रसीद फेंक दीजिए (ज़रूरत नहीं)।"}},
                {"word": "봉투", "translit": "Bongtu", "pron": "బోంగ్-తు", "pos": "noun", "meanings": {"en": "Bag / sack", "te": "సంచి / క్యారీ బ్యాగ్", "hi": "थैली / बैग"}, "exTarget": "봉투에 넣어주세요.", "exTranslit": "Bongtue neoeojuseyo.", "exNative": {"en": "Please put it in a bag.", "te": "సంచిలో వేసి ఇవ్వండి.", "hi": "बैग में रख दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Can I pay by card?'", "te": "'కార్డు పేమెంట్ తీసుకుంటారా?' అని ఎలా అడుగుతారు?", "hi": "'क्या कार्ड चलेगा?' कैसे पूछेंगे?"}, "prompt": {"en": "Can I pay with card?", "te": "కార్డు తీసుకుంటారా?", "hi": "क्या कार्ड चलेगा?"}, "correct": "카드 돼요?", "options": ["카드 돼요?", "물 주세요", "얼마예요?", "안녕히 가세요"], "expl": {"en": "카드 돼요? literally asks 'Is card possible?'.", "te": "కార్డుతో చెల్లించవచ్చా అని అడిగే మాట.", "hi": "कार्ड से भुगतान पूछने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Convenience Stores (CU, GS25)", "te": "కన్వీనియన్స్ స్టోర్‌లో అవసరమైన వస్తువులు", "hi": "सुविधा स्टोर में खरीदारी"},
            "objective": {"en": "Find drinks, snacks, warm up food, and ask '있어요?'.", "te": "డ్రింక్స్, తినుబండారాలు తీసుకోవడం మరియు వస్తువు ఉందా అని అడగడం.", "hi": "पेय पदार्थ, स्नैक्स लेना और खाने को गर्म करवाना।"},
            "culturalTip": {"en": "Korean convenience stores provide hot water for instant ramen and microwaves to heat food yourself.", "te": "కొరియన్ కన్వీనియన్స్ స్టోర్లలో రామెన్ కోసం వేడి నీళ్లు మరియు మైక్రోవేవ్ స్వయంగా వాడవచ్చు.", "hi": "कोरिया के स्टोरों में गर्म पानी और माइक्रोवेव खुद इस्तेमाल कर सकते हैं।"},
            "grammar": {
                "title": {"en": "Asking for Existence (있어요?)", "te": "ఉందా? (있어요?)", "hi": "क्या यह है? (있어요?)"},
                "explanation": {"en": "Noun + 있어요? asks 'Do you have [Item]?'. Noun + 없어요 means 'It is not available'.", "te": "వస్తువు పేరు + 있어요? అంటే 'మీ దగ్గర ఇది ఉందా?' అని అర్థం.", "hi": "वस्तु + 있어요? का अर्थ है क्या आपके पास यह है?"},
                "ruleSummary": {"en": "[Item] 있어요? = Do you have [Item]?", "te": "[వస్తువు] ఉందా?", "hi": "[वस्तु] है क्या?"},
                "examples": [{"target": "물 있어요?", "transliteration": "Mul isseoyo?", "native": {"en": "Do you have water?", "te": "నీళ్లు ఉన్నాయా?", "hi": "क्या पानी है?"}}],
                "commonMistakes": [{"incorrect": "물 가졌어요?", "correct": "물 있어요?", "explanation": {"en": "Use 있어요 to check inventory or presence.", "te": "వస్తువు లభ్యతను అడగడానికి 있어요 వాడాలి.", "hi": "उपलब्धता पूछने के लिए 있어요 कहें।"}}]
            },
            "vocab": [
                {"word": "물", "translit": "Mul", "pron": "ముల్", "pos": "noun", "meanings": {"en": "Water", "te": "నీళ్లు", "hi": "पानी"}, "exTarget": "시원한 물 주세요.", "exTranslit": "Siwonhan mul juseyo.", "exNative": {"en": "Cold water please.", "te": "చల్లని నీళ్లు ఇవ్వండి.", "hi": "ठंडा पानी दीजिए।"}},
                {"word": "도시락", "translit": "Dosirak", "pron": "దో-సి-రాక్", "pos": "noun", "meanings": {"en": "Meal box / lunchbox", "te": "లంచ్ బాక్స్ / భోజనం", "hi": "लंच बॉक्स"}, "exTarget": "도시락 데워주세요.", "exTranslit": "Dosirak deowojuseyo.", "exNative": {"en": "Please microwave this meal.", "te": "ఈ భోజనాన్ని వేడి చేయండి.", "hi": "कृपया यह लंच गर्म कर दीजिए।"}},
                {"word": "하나", "translit": "Hana", "pron": "హా-నా", "pos": "number", "meanings": {"en": "One (item)", "te": "ఒకటి", "hi": "एक"}, "exTarget": "이거 하나 주세요.", "exTranslit": "Igeo hana juseyo.", "exNative": {"en": "Please give me one of this.", "te": "ఇందులో ఒకటి ఇవ్వండి.", "hi": "इसमें से एक दीजिए।"}},
                {"word": "둘", "translit": "Dul", "pron": "దుల్", "pos": "number", "meanings": {"en": "Two (items)", "te": "రెండు", "hi": "दो"}, "exTarget": "삼각김밥 둘 주세요.", "exTranslit": "Samgakgimbap dul juseyo.", "exNative": {"en": "Two triangle gimbap please.", "te": "రెండు ట్రయాంగిల్ గింబాప్ ఇవ్వండి.", "hi": "दो त्रिकोण गिम्बाप दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Ask 'Do you have water?' in Korean.", "te": "'నీళ్లు ఉన్నాయా?' అని కొరియన్‌లో ఎలా అడుగుతారు?", "hi": "कोरियाई में 'क्या पानी है?' कैसे पूछेंगे?"}, "prompt": {"en": "Do you have water?", "te": "నీళ్లు ఉన్నాయా?", "hi": "क्या पानी है?"}, "correct": "물 있어요?", "options": ["물 있어요?", "물 없어요", "얼마예요?", "감사합니다"], "expl": {"en": "물 (water) + 있어요? (is there?).", "te": "ముల్ + ఇస్సోయో?", "hi": "मुल + इसोयो?"}}
            ]
        }
    ],
    # MODULE 3: Cafés, Street Food & Restaurants
    [
        {
            "title": {"en": "Ordering at Korean Cafés", "te": "కేఫ్‌లో కాఫీ ఆర్డర్ చేయడం", "hi": "कैफ़े में कॉफ़ी का ऑर्डर"},
            "objective": {"en": "Order hot or iced coffee, choose cup size, and request takeaway or dine-in.", "te": "హాట్ లేదా ఐస్డ్ కాఫీ ఆర్డర్ చేయడం, టేక్‌అవే లేదా కేఫ్‌లో కూర్చోవడం.", "hi": "हॉट या आइस्ड कॉफ़ी ऑर्डर करना और टेकअवे कहना।"},
            "culturalTip": {"en": "Koreans love iced coffee year-round; '아아' (Ah-Ah) is famous slang for Iced Americano.", "te": "కొరియాలో 'ఆ-ఆ' అంటే ఐస్డ్ అమెరికానో కాఫీ అని అర్థం.", "hi": "कोरिया में 'आ-आ' का मतलब आइस्ड अमेरिकानो होता है।"},
            "grammar": {
                "title": {"en": "Takeout vs Dine-In (포장 / 매장)", "te": "పార్శిల్ / అక్కడే తాగడం", "hi": "पैक करवाना / यहीं पीना"},
                "explanation": {"en": "Say '포장해 주세요' for takeaway, or '먹고 갈게요' for dine-in.", "te": "తీసుకెళ్లడానికి '포장해 주세요' అనాలి.", "hi": "साथ ले जाने के लिए 포장해 주세요 कहें।"},
                "ruleSummary": {"en": "포장 = Takeout; 매장 = Dine-in.", "te": "పోజాంగ్ = పార్శిల్.", "hi": "पोजांग = टेकअवे।"},
                "examples": [{"target": "테이크아웃 해주세요", "transliteration": "Teikeu-aut haejuseyo", "native": {"en": "To-go please.", "te": "పార్శిల్ కట్టండి.", "hi": "पैक कर दीजिए।"}}],
                "commonMistakes": [{"incorrect": "가져가", "correct": "포장해 주세요", "explanation": {"en": "Use polite 포장해 주세요 with baristas.", "te": "సిబ్బందితో మర్యాదగా మాట్లాడాలి.", "hi": "हमेशा विनम्र भाषा का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "아이스 아메리카노", "translit": "Aiseu Amerikano", "pron": "ఐస్ అమేరికానో", "pos": "noun", "meanings": {"en": "Iced Americano", "te": "ఐస్డ్ అమెరికానో కాఫీ", "hi": "आइस्ड अमेरिकानो"}, "exTarget": "아이스 아메리카노 한 잔 주세요.", "exTranslit": "Aiseu Amerikano han jan juseyo.", "exNative": {"en": "One Iced Americano please.", "te": "ఒక ఐస్డ్ అమెరికానో ఇవ్వండి.", "hi": "एक आइस्ड अमेरिकानो दीजिए।"}},
                {"word": "따뜻한 것", "translit": "Ttatteut-han geot", "pron": "త్తా-త్తృత్-హాన్ గోత్", "pos": "noun", "meanings": {"en": "Hot / warm one", "te": "వేడిది (హాట్)", "hi": "गरम वाला"}, "exTarget": "따뜻한 라떼 주세요.", "exTranslit": "Ttatteut-han rate juseyo.", "exNative": {"en": "Hot latte please.", "te": "వేడి లాటే ఇవ్వండి.", "hi": "गरम लाते दीजिए।"}},
                {"word": "포장", "translit": "Pojang", "pron": "పో-జాంగ్", "pos": "noun", "meanings": {"en": "Takeout / to-go", "te": "పార్శిల్ / టేక్‌అవే", "hi": "पैक / टेकअवे"}, "exTarget": "포장해 갈게요.", "exTranslit": "Pojanghae galgeyo.", "exNative": {"en": "I will take it to-go.", "te": "నేను పార్శిల్ తీసుకెళ్తాను.", "hi": "मैं इसे पैक कराकर ले जाऊँगा।"}},
                {"word": "덜 달게", "translit": "Deol dalge", "pron": "దోల్ దాల్-గే", "pos": "phrase", "meanings": {"en": "Less sweet", "te": "తీపి తగ్గించి", "hi": "कम मीठा"}, "exTarget": "덜 달게 해주세요.", "exTranslit": "Deol dalge haejuseyo.", "exNative": {"en": "Please make it less sweet.", "te": "కాస్త తీపి తగ్గించి చేయండి.", "hi": "कृपया कम मीठा बनाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Order an Iced Americano politely.", "te": "ఐస్డ్ అమెరికానో ఆర్డర్ చేసే వాక్యాన్ని ఎంచుకోండి.", "hi": "आइस्ड अमेरिकानो का ऑर्डर देने वाला वाक्य चुनें।"}, "prompt": {"en": "One Iced Americano please.", "te": "ఒక ఐస్డ్ అమెరికానో ఇవ్వండి.", "hi": "एक आइस्ड अमेरिकानो दीजिए।"}, "correct": "아이스 아메리카노 한 잔 주세요", "options": ["아이스 아메리카노 한 잔 주세요", "얼마예요?", "이름이 뭐예요?", "안녕히 가세요"], "expl": {"en": "아이스 아메리카노 + 한 잔 + 주세요.", "te": "స్పష్టమైన కొరియన్ ఆర్డర్ వాక్యం.", "hi": "कोरियाई में कॉफ़ी ऑर्डर करने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Dining at Korean Restaurants (K-BBQ)", "te": "రెస్టారెంట్‌లో భోజనం ఆర్డర్ చేయడం", "hi": "रेस्तरां में भोजन और ऑर्डर"},
            "objective": {"en": "Call the server (여기요!), order dishes, and ask for free side-dish refills.", "te": "వెయిటర్‌ను పిలవడం, భోజనం ఆర్డర్ చేయడం మరియు ఉచిత సైడ్ డిష్ అడగడం.", "hi": "वेटर को बुलाना, व्यंजन ऑर्डर करना और साइड डिश मांगना।"},
            "culturalTip": {"en": "Side dishes (반찬 banchan) and drinking water are complimentary and unlimited in Korea.", "te": "కొరియన్ రెస్టారెంట్లలో సైడ్ డిషెస్ మరియు నీళ్లు పూర్తిగా ఉచితం.", "hi": "कोरियाई रेस्तरां में साइड डिश और पानी मुफ़्त होते हैं।"},
            "grammar": {
                "title": {"en": "Calling Waiters Politely (여기요 / 저기요)", "te": "సర్వర్‌ను పిలవడం (ఇక్కడ చూడండి)", "hi": "वेटर को आवाज देना"},
                "explanation": {"en": "Say '여기요!' (Over here!) or press the call button on the table.", "te": "వెయిటర్‌ను పిలవడానికి '여기요!' అనడం లేదా బటన్ నొక్కడం పద్ధతి.", "hi": "वेटर को बुलाने के लिए '여기요!' बोलें या घंटी बजाएं।"},
                "ruleSummary": {"en": "여기요 = Over here, please!", "te": "ఇక్కడ చూడండి!", "hi": "यहाँ सुनिए, कृपया!"},
                "examples": [{"target": "여기요! 주문할게요.", "transliteration": "Yeogiyo! Jumunhalgeyo.", "native": {"en": "Excuse me! We are ready to order.", "te": "కొద్దిగా వినండి! ఆర్డర్ ఇస్తాం.", "hi": "सुनिए! हमें ऑर्डर देना है।"}}],
                "commonMistakes": [{"incorrect": "웨이터!", "correct": "여기요 / 저기요", "explanation": {"en": "Do not yell 'Waiter!'. Use '여기요'.", "te": "వెయిటర్ అని పిలవకూడదు, '여기요' అనాలి.", "hi": "'वेटर' चिल्लाने के बजाय '여기요' कहें।"}}]
            },
            "vocab": [
                {"word": "여기요", "translit": "Yeogiyo", "pron": "యా-గి-యో", "pos": "interjection", "meanings": {"en": "Excuse me! (to server)", "te": "కొద్దిగా ఇటు చూడండి (సర్వర్ కోసం)", "hi": "यहाँ सुनिए! (वेटर से)"}, "exTarget": "여기요, 물 좀 주세요.", "exTranslit": "Yeogiyo, mul jom juseyo.", "exNative": {"en": "Excuse me, water please.", "te": "కొద్దిగా చూడండి, నీళ్లు ఇవ్వండి.", "hi": "सुनिए, थोड़ा पानी दीजिए।"}},
                {"word": "메뉴판", "translit": "Menyupan", "pron": "మే-న్యూ-పాన్", "pos": "noun", "meanings": {"en": "Menu board / book", "te": "మెనూ కార్డు", "hi": "मेन्यू कार्ड"}, "exTarget": "메뉴판 보여주세요.", "exTranslit": "Menyupan boyeojuseyo.", "exNative": {"en": "Please show me the menu.", "te": "మెనూ కార్డు చూపించండి.", "hi": "कृपया मेन्यू दिखाइए।"}},
                {"word": "맛있어요", "translit": "Masisseoyo", "pron": "మా-సి-స్సో-యో", "pos": "adjective", "meanings": {"en": "It is delicious", "te": "చాలా రుచిగా ఉంది", "hi": "बहुत स्वादिष्ट है"}, "exTarget": "정말 맛있어요!", "exTranslit": "Jeongmal masisseoyo!", "exNative": {"en": "It is very delicious!", "te": "నిజంగా చాలా రుచిగా ఉంది!", "hi": "सचमुच बहुत स्वादिष्ट है!"}},
                {"word": "더", "translit": "Deo", "pron": "దో", "pos": "adverb", "meanings": {"en": "More", "te": "ఇంకా / మరికొంచెం", "hi": "और / अधिक"}, "exTarget": "김치 좀 더 주세요.", "exTranslit": "Gimchi jom deo juseyo.", "exNative": {"en": "More kimchi please.", "te": "మరికొంచెం కిమ్చి ఇవ్వండి.", "hi": "थोड़ा और किमची दीजिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the phrase to call your server.", "te": "సర్వర్‌ను పిలిచే పదాన్ని ఎంచుకోండి.", "hi": "वेटर को बुलाने वाला शब्द चुनें।"}, "prompt": {"en": "Excuse me (server)!", "te": "ఇక్కడ చూడండి!", "hi": "यहाँ सुनिए!"}, "correct": "여기요!", "options": ["여기요!", "안녕히 계세요", "얼마예요?", "감사합니다"], "expl": {"en": "여기요! is the natural dining call in Korea.", "te": "రెస్టారెంట్‌లో సహజమైన పిలుపు.", "hi": "रेस्तरां में यह सबसे स्वाभाविक पुकार है।"}}
            ]
        },
        {
            "title": {"en": "Spice Level, Dietary Needs & The Bill", "te": "కారం తగ్గించడం & బిల్లు చెల్లించడం", "hi": "कम तीखा और बिल चुकाना"},
            "objective": {"en": "Ask for mild spice (덜 맵게), explain dietary preferences, and ask for the bill.", "te": "కారం తక్కువ చేయమని చెప్పడం మరియు భోజనం తర్వాత బిల్లు అడగడం.", "hi": "कम तीखा खाना मांगना और भोजन के बाद बिल मांगना।"},
            "culturalTip": {"en": "Say '덜 맵게 해주세요' if you are sensitive to Korean red chili pepper (gochugaru).", "te": "కొరియన్ వంటకాల్లో కారం ఎక్కువ; '덜 맵게 해주세요' అంటే కారం తగ్గిస్తారు.", "hi": "कोरियाई खाने में मिर्च कम कराने के लिए 덜 맵게 해주세요 कहें।"},
            "grammar": {
                "title": {"en": "Asking for the Bill (계산해 주세요)", "te": "బిల్లు అడగడం", "hi": "बिल मांगना"},
                "explanation": {"en": "Go to the counter and say '계산해 주세요' (Please calculate the bill).", "te": "కౌంటర్ వద్ద '계산해 주세요' అంటే బిల్లు చేస్తారు.", "hi": "काउंटर पर '계산해 주세요' कहकर बिल चुकाएं।"},
                "ruleSummary": {"en": "계산 (calculation) + 해 주세요 (please do).", "te": "బిల్లు లెక్కించండి.", "hi": "कृपया बिल बना दीजिए।"},
                "examples": [{"target": "따로 계산해 주세요", "transliteration": "Ttaro gyesanhae juseyo", "native": {"en": "Split the bill please.", "te": "విడివిడిగా బిల్లు వేయండి.", "hi": "कृपया अलग-अलग बिल बनाइए।"}}],
                "commonMistakes": [{"incorrect": "돈 얼마?", "correct": "계산해 주세요", "explanation": {"en": "Always ask respectfully with 계산해 주세요.", "te": "మర్యాదగా 계산해 주세요 అనాలి.", "hi": "हमेशा विनम्रता से 계산해 주세요 कहें।"}}]
            },
            "vocab": [
                {"word": "덜 맵게", "translit": "Deol maepge", "pron": "దోల్ మేప్-గే", "pos": "phrase", "meanings": {"en": "Less spicy", "te": "తక్కువ కారంగా", "hi": "कम तीखा"}, "exTarget": "덜 맵게 해주세요.", "exTranslit": "Deol maepge haejuseyo.", "exNative": {"en": "Please make it less spicy.", "te": "కారం తక్కువగా చేయండి.", "hi": "कृपया कम तीखा बनाइए।"}},
                {"word": "고기", "translit": "Gogi", "pron": "గో-గి", "pos": "noun", "meanings": {"en": "Meat", "te": "మాంసం", "hi": "मांस"}, "exTarget": "고기 빼주세요.", "exTranslit": "Gogi bbaejuseyo.", "exNative": {"en": "No meat please (vegetarian).", "te": "మాంసం లేకుండా చేయండి.", "hi": "कृपया बिना मांस के बनाइए।"}},
                {"word": "계산", "translit": "Gyesan", "pron": "గ్యే-సాన్", "pos": "noun", "meanings": {"en": "Bill / check", "te": "బిల్లు / లెక్క", "hi": "बिल / हिसाब"}, "exTarget": "계산해 주세요.", "exTranslit": "Gyesanhae juseyo.", "exNative": {"en": "The check please.", "te": "బిల్లు ఇవ్వండి.", "hi": "कृपया बिल दीजिए।"}},
                {"word": "잘 먹었습니다", "translit": "Jal meogeosseumnida", "pron": "జల్ మో-గో-స్సుమ్-ని-దా", "pos": "phrase", "meanings": {"en": "Thank you for the meal", "te": "భోజనం చాలా బాగుంది", "hi": "भोजन बहुत अच्छा था"}, "exTarget": "잘 먹었습니다, 감사합니다!", "exTranslit": "Jal meogeosseumnida, gamsahamnida!", "exNative": {"en": "Thank you for the meal!", "te": "భోజనం బాగుంది, ధన్యవాదాలు!", "hi": "स्वादिष्ट भोजन के लिए धन्यवाद!"}}
            ],
            "exercises": [
                {"instruction": {"en": "How to say 'The check please' after dining?", "te": "భోజనం తర్వాత 'బిల్లు ఇవ్వండి' అని ఎలా అంటారు?", "hi": "खाना खाने के बाद 'कृपया बिल दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "The check please.", "te": "బిల్లు ఇవ్వండి.", "hi": "कृपया बिल दीजिए।"}, "correct": "계산해 주세요", "options": ["계산해 주세요", "덜 맵게", "여기요!", "안녕히 가세요"], "expl": {"en": "계산해 주세요 asks politely for the bill.", "te": "బిల్లు కోసం '계산해 주세요' అనాలి.", "hi": "बिल मांगने के लिए यही वाक्य बोलते हैं।"}}
            ]
        }
    ],
    # MODULE 4: Real-Life Transit & Navigation
    [
        {
            "title": {"en": "Where is the Restroom? (Navigation)", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది? (దిశలు)", "hi": "शौचालय कहाँ है? (रास्ता पूछना)"},
            "objective": {"en": "Ask '화장실이 어디예요?' and understand left, right, and straight ahead.", "te": "బాత్‌రూమ్ ఎక్కడుందో అడగడం, ఎడమ, కుడి మరియు తిన్నగా వెళ్లడం అర్థం చేసుకోవడం.", "hi": "शौचालय पूछना, बाएँ, दाएँ और सीधे जाना समझना।"},
            "culturalTip": {"en": "Seoul subway station restrooms are free, extremely clean, and clearly signposted.", "te": "కొరియాలో మెట్రో బాత్‌రూమ్‌లు ఉచితంగా మరియు ఎంతో శుభ్రంగా ఉంటాయి.", "hi": "सियोल के मेट्रो स्टेशनों पर शौचालय साफ़ और मुफ़्त होते हैं।"},
            "grammar": {
                "title": {"en": "Asking Locations (어디예요?)", "te": "ఎక్కడ ఉంది? (어디예요?)", "hi": "स्थान पूछना (어디예요?)"},
                "explanation": {"en": "[Place] + 어디예요? asks 'Where is [Place]?'.", "te": "స్థలం పేరు + ఎక్కడ ఉంది? (어డి예요?) అని అడగాలి.", "hi": "स्थान का नाम + कहाँ है? (어디예요?) लगाकर पूछें।"},
                "ruleSummary": {"en": "[Place] 어디예요? = Where is [Place]?", "te": "[స్థలం] ఎక్కడ ఉంది?", "hi": "[स्थान] कहाँ है?"},
                "examples": [{"target": "지하철역이 어디예요?", "transliteration": "Jihacheol-yeogi eodiyeyo?", "native": {"en": "Where is the subway station?", "te": "మెట్రో స్టేషన్ ఎక్కడ ఉంది?", "hi": "मेट्रो स्टेशन कहाँ है?"}}],
                "commonMistakes": [{"incorrect": "어디 화장실?", "correct": "화장실이 어디예요?", "explanation": {"en": "Place name comes first in Korean.", "te": "స్థలం పేరు ముందే చెప్పాలి.", "hi": "स्थान का नाम पहले बोलें।"}}]
            },
            "vocab": [
                {"word": "화장실", "translit": "Hwajangsil", "pron": "హ్వా-జాంగ్-సిల్", "pos": "noun", "meanings": {"en": "Restroom / toilet", "te": "బాత్‌రూమ్ / శౌచాలయం", "hi": "शौचालय / बाथरूम"}, "exTarget": "화장실이 어디예요?", "exTranslit": "Hwajangsiri eodiyeyo?", "exNative": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}},
                {"word": "왼쪽", "translit": "Oenjjok", "pron": "వెన్-జ్జోక్", "pos": "noun", "meanings": {"en": "Left side", "te": "ఎడమ వైపు", "hi": "बाईं ओर"}, "exTarget": "왼쪽으로 가세요.", "exTranslit": "Oenjjogeuro gaseyo.", "exNative": {"en": "Go to the left.", "te": "ఎడమ వైపునకు వెళ్లండి.", "hi": "बाईं तरफ जाइए।"}},
                {"word": "오른쪽", "translit": "Oreunjjok", "pron": "ఓ-రున్-జ్జోక్", "pos": "noun", "meanings": {"en": "Right side", "te": "కుడి వైపు", "hi": "दाईं ओर"}, "exTarget": "오른쪽에 있어요.", "exTranslit": "Oreunjjoge isseoyo.", "exNative": {"en": "It is on the right.", "te": "కుడివైపున ఉంది.", "hi": "यह दाईं तरफ है।"}},
                {"word": "직진", "translit": "Jikjin", "pron": "జిక్-జిన్", "pos": "noun", "meanings": {"en": "Straight ahead", "te": "తిన్నగా / నేరుగా", "hi": "सीधे आगे"}, "exTarget": "앞으로 곧장 가세요.", "exTranslit": "Apeuro gotjang gaseyo.", "exNative": {"en": "Go straight ahead.", "te": "ముందుకు నేరుగా వెళ్లండి.", "hi": "सीधे आगे जाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Ask 'Where is the restroom?' in Korean.", "te": "'బాత్‌రూమ్ ఎక్కడ ఉంది?' అని కొరియన్‌లో ఎలా అడుగుతారు?", "hi": "कोरियाई में 'शौचालय कहाँ है?' कैसे पूछेंगे?"}, "prompt": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}, "correct": "화장실이 어디예요?", "options": ["화장실이 어디예요?", "얼마예요?", "이름이 뭐예요?", "안녕히 가세요"], "expl": {"en": "화장실 (restroom) + 이 어디예요? (where is it?).", "te": "హ్వాజాంగ్సిల్ + ఓడియేయో.", "hi": "ख्वाजांगसिल + ओदियेयो।"}}
            ]
        },
        {
            "title": {"en": "Taking Subways & Taxis in Seoul", "te": "సియోల్ సబ్‌వే & టాక్సీ ప్రయాణం", "hi": "मेट्रो और टैक्सी में सफ़र"},
            "objective": {"en": "Tell a taxi driver your destination and ask to pull over.", "te": "టాక్సీ డ్రైవర్‌కు గమ్యస్థానం చెప్పడం మరియు ఇక్కడ ఆపమనడం నేర్చుకోండి.", "hi": "टैक्सी चालक को पता बताना और गाड़ी रोकने के लिए कहना।"},
            "culturalTip": {"en": "Kakao Taxi or hailing orange/silver street taxis is standard and safe throughout Korea.", "te": "కొరియాలో కాకావో టాక్సీ లేదా నారింజ రంగు టాక్సీలు సురక్షితమైనవి.", "hi": "कोरिया में काकाओ टैक्सी या नारंगी टैक्सियाँ बहुत सुरक्षित हैं।"},
            "grammar": {
                "title": {"en": "Destination Form ((으)로 가주세요)", "te": "అక్కడికి తీసుకెళ్లండి", "hi": "वहाँ ले चलिए"},
                "explanation": {"en": "[Destination] + (으)로 가주세요 means 'Please take me to [Destination]'.", "te": "స్థలం పేరు + రో గాజుసేయో అంటే నన్ను అక్కడికి తీసుకెళ్లండి అని అర్థం.", "hi": "स्थान + रो गाजुसेयो का मतलब है कृपया वहाँ ले चलिए।"},
                "ruleSummary": {"en": "[Place]로 가주세요 = Please go to [Place].", "te": "[స్థలం]కు వెళ్లండి.", "hi": "[स्थान] तक चलिए।"},
                "examples": [{"target": "서울역으로 가주세요", "transliteration": "Seoul-yeogeuro gajuseyo", "native": {"en": "To Seoul Station please.", "te": "సియోల్ స్టేషన్‌కు తీసుకెళ్లండి.", "hi": "कृपया सियोल स्टेशन ले चलिए।"}}],
                "commonMistakes": [{"incorrect": "가 서울역", "correct": "서울역으로 가주세요", "explanation": {"en": "Always state the destination first.", "te": "ముందు స్థలం పేరు చెప్పాలి.", "hi": "हमेशा गंतव्य पहले बोलें।"}}]
            },
            "vocab": [
                {"word": "지하철역", "translit": "Jihacheol-yeok", "pron": "జి-హా-ఛోల్-యోక్", "pos": "noun", "meanings": {"en": "Subway station", "te": "మెట్రో స్టేషన్", "hi": "मेट्रो स्टेशन"}, "exTarget": "지하철역 근처예요.", "exTranslit": "Jihacheol-yeok geuncheoyeyo.", "exNative": {"en": "Near the subway station.", "te": "మెట్రో స్టేషన్ దగ్గరలో ఉంది.", "hi": "मेट्रो स्टेशन के पास है।"}},
                {"word": "택시", "translit": "Taeksi", "pron": "తెక్-సి", "pos": "noun", "meanings": {"en": "Taxi", "te": "టాక్సీ", "hi": "टैक्सी"}, "exTarget": "택시를 타요.", "exTranslit": "Taeksireul tayo.", "exNative": {"en": "I take a taxi.", "te": "నేను టాక్సీ ఎక్కుతాను.", "hi": "मैं टैक्सी लेता हूँ।"}},
                {"word": "세워 주세요", "translit": "Sewo juseyo", "pron": "సే-వో జూ-సే-యో", "pos": "phrase", "meanings": {"en": "Please stop here / pull over", "te": "ఇక్కడ ఆపండి", "hi": "यहाँ रोक दीजिए"}, "exTarget": "여기서 세워 주세요.", "exTranslit": "Yeogiseo sewo juseyo.", "exNative": {"en": "Please stop right here.", "te": "దయచేసి ఇక్కడే ఆపండి.", "hi": "कृपया यहीं रोक दीजिए।"}},
                {"word": "얼마나 걸려요", "translit": "Eolmana geollyeoyo", "pron": "ఓల్-మా-నా గోల్-ల్యో-యో", "pos": "phrase", "meanings": {"en": "How long does it take?", "te": "ఎంత సమయం పడుతుంది?", "hi": "कितना समय लगेगा?"}, "exTarget": "얼마나 걸려요?", "exTranslit": "Eolmana geollyeoyo?", "exNative": {"en": "How long does it take?", "te": "ఎంత సమయం పడుతుంది?", "hi": "कितना समय लगेगा?"}}
            ],
            "exercises": [
                {"instruction": {"en": "Tell the taxi driver to stop here.", "te": "టాక్సీ డ్రైవర్‌తో 'ఇక్కడ ఆపండి' అని ఎలా అంటారు?", "hi": "टैक्सी चालक से 'यहाँ रोक दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Please pull over here.", "te": "ఇక్కడ ఆపండి.", "hi": "यहाँ रोक दीजिए।"}, "correct": "여기서 세워 주세요", "options": ["여기서 세워 주세요", "화장실 어디예요?", "얼마예요?", "감사합니다"], "expl": {"en": "여기서 (here) + 세워 주세요 (please stop).", "te": "ఇక్కడ ఆపండి అని చెప్పే వాక్యం.", "hi": "यहाँ रोक दीजिए कहने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Hotel Check-In & Wi-Fi", "te": "హోటల్ చెక్-ఇన్ & రూమ్ సర్వీస్", "hi": "होटल चेक-इन और कमरा"},
            "objective": {"en": "Check in with reservation, ask for Wi-Fi, and request luggage storage.", "te": "రిజర్వేషన్ చూపించడం, వైఫై పాస్‌వర్డ్ మరియు లగేజ్ భద్రపరచడం అడగడం.", "hi": "आरक्षण दिखाना, वाई-फाई पासवर्ड और सामान रखना मांगना।"},
            "culturalTip": {"en": "Hotel check-in is typically at 3:00 PM; free luggage holding is always offered before check-in.", "te": "కొరియన్ హోటళ్లలో లగేజ్ ఉచితంగా భద్రపరుస్తారు.", "hi": "कोरियाई होटलों में चेक-इन से पहले सामान मुफ़्त रख सकते हैं।"},
            "grammar": {
                "title": {"en": "Expressing Desire (-고 싶어요)", "te": "చేయాలనుకుంటున్నాను (-고 싶어요)", "hi": "चाहता हूँ (-고 싶어요)"},
                "explanation": {"en": "Verb + -고 싶어요 expresses what you want: 체크인하고 싶어요 (I want to check in).", "te": "క్రియ + -గో షిప్పోయో అంటే 'చేయాలనుకుంటున్నాను' అని భావం.", "hi": "क्रिया + -고 싶어요 का मतलब है 'मैं करना चाहता हूँ'।"},
                "ruleSummary": {"en": "Verb + -고 싶어요 = I want to [Verb].", "te": "నేను చేయాలనుకుంటున్నాను.", "hi": "मैं करना चाहता हूँ।"},
                "examples": [{"target": "체크인하고 싶어요", "transliteration": "Chekeu-inhago sipeoyo", "native": {"en": "I want to check in.", "te": "నేను చెక్-ఇన్ చేయాలనుకుంటున్నాను.", "hi": "मैं चेक-इन करना चाहता हूँ।"}}],
                "commonMistakes": [{"incorrect": "나 원해 방", "correct": "예약했어요", "explanation": {"en": "Say '예약했어요' (I have a booking).", "te": "నాకు రిజర్వేషన్ ఉంది అని చెప్పాలి.", "hi": "आरक्षण के लिए 예약했어요 कहें।"}}]
            },
            "vocab": [
                {"word": "예약", "translit": "Yeyak", "pron": "యే-యాక్", "pos": "noun", "meanings": {"en": "Reservation / booking", "te": "రిజర్వేషన్ / బుకింగ్", "hi": "आरक्षण / बुकिंग"}, "exTarget": "예약 확인해 주세요.", "exTranslit": "Yeyak hwaginhae juseyo.", "exNative": {"en": "Please check my booking.", "te": "నా రిజర్వేషన్ చూడండి.", "hi": "कृपया मेरा आरक्षण देखें।"}},
                {"word": "와이파이", "translit": "Waipai", "pron": "వై-పై", "pos": "noun", "meanings": {"en": "Wi-Fi", "te": "వైఫై", "hi": "वाई-फाई"}, "exTarget": "와이파이 비밀번호가 뭐예요?", "exTranslit": "Waipai bimilbeonhoga mwoyeyo?", "exNative": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}},
                {"word": "비밀번호", "translit": "Bimilbeonho", "pron": "బి-మిల్-బ్యోన్-హో", "pos": "noun", "meanings": {"en": "Password", "te": "పాస్‌వర్డ్", "hi": "पासवर्ड"}, "exTarget": "비밀번호 적어주세요.", "exTranslit": "Bimilbeonho jeogeojuseyo.", "exNative": {"en": "Please write the password.", "te": "పాస్‌వర్డ్ రాసి ఇవ్వండి.", "hi": "कृपया पासवर्ड लिख दीजिए।"}},
                {"word": "짐", "translit": "Jim", "pron": "జిమ్", "pos": "noun", "meanings": {"en": "Luggage / bags", "te": "లగేజ్ / సామాన్లు", "hi": "सामान / बैग"}, "exTarget": "짐 맡겨도 돼요?", "exTranslit": "Jim matgyeodo dwaeyo?", "exNative": {"en": "Can I leave my bags?", "te": "లగేజ్ ఇక్కడ ఉంచవచ్చా?", "hi": "क्या सामान यहाँ रख सकते हैं?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the Wi-Fi password?", "te": "'వైఫై పాస్‌వర్డ్ ఏమిటి?' అని ఎలా అడుగుతారు?", "hi": "'वाई-फाई पासवर्ड क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}, "correct": "와이파이 비밀번호가 뭐예요?", "options": ["와이파이 비밀번호가 뭐예요?", "이거 얼마예요?", "어디에 가요?", "감사합니다"], "expl": {"en": "와이파이 + 비밀번호가 뭐예요?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి అని అడిగే స్పష్టమైన మాట.", "hi": "वाई-फाई पासवर्ड पूछने का वाक्य।"}}
            ]
        }
    ],
    # MODULE 5: Social Fluency & Urgent Help
    [
        {
            "title": {"en": "Making Friends & Contact Info", "te": "స్నేహం చేయడం & ఫోన్ నంబర్ అడగడం", "hi": "दोस्त बनाना और फोन नंबर"},
            "objective": {"en": "Ask for phone numbers, KakaoTalk, and invite friends for coffee.", "te": "ఫోన్ నంబర్ లేదా కాకావో టాక్ అడగడం మరియు స్నేహితులను ఆహ్వానించడం.", "hi": "फोन नंबर या काकाओ टॉक मांगना और दोस्तों को आमंत्रित करना।"},
            "culturalTip": {"en": "KakaoTalk is the universal chat app in South Korea for both personal and work communication.", "te": "దక్షిణ కొరియాలో అందరూ కాకావో టాక్ మెసెంజర్ వాడతారు.", "hi": "कोरिया में सभी काकाओ टॉक ऐप इस्तेमाल करते हैं।"},
            "grammar": {
                "title": {"en": "Suggestions (-ㄹ/을까요?)", "te": "కలిసి చేద్దామా? (-ల్కాయో?)", "hi": "क्या हम साथ करें? (-ल्कायो?)"},
                "explanation": {"en": "Verb + -ㄹ까요? asks 'Shall we [Verb] together?': 우리 같이 갈까요? (Shall we go together?).", "te": "క్రియ + -ల్కాయో అంటే 'కలిసి చేద్దామా?' అని ఆహ్వానించడం.", "hi": "क्रिया + -ल्कायो का अर्थ है क्या हम साथ में करें?"},
                "ruleSummary": {"en": "우리 같이 [Verb]ㄹ까요? = Shall we [Verb]?", "te": "మనం కలిసి చేద్దామా?", "hi": "क्या हम साथ करें?"},
                "examples": [{"target": "우리 내일 만날까요?", "transliteration": "Uri naeil mannalkkayo?", "native": {"en": "Shall we meet tomorrow?", "te": "మనం రేపు కలుద్దామా?", "hi": "क्या हम कल मिलें?"}}],
                "commonMistakes": [{"incorrect": "너 나 가", "correct": "우리 같이 갈까요?", "explanation": {"en": "Use polite suggestion 우리 같이 갈까요?.", "te": "మర్యాదగా '우리 같이 갈까요?' అని సూచించాలి.", "hi": "हमेशा विनम्र सुझाव का उपयोग करें।"}}]
            },
            "vocab": [
                {"word": "친구", "translit": "Chingu", "pron": "చిన్-గు", "pos": "noun", "meanings": {"en": "Friend", "te": "స్నేహితుడు / మిత్రుడు", "hi": "दोस्त / मित्र"}, "exTarget": "좋은 친구예요.", "exTranslit": "Joeun chinguyeyo.", "exNative": {"en": "A good friend.", "te": "మంచి స్నేహితుడు.", "hi": "अच्छा दोस्त है।"}},
                {"word": "연락처", "translit": "Yeollakcheo", "pron": "యోల్-లక్-ఛో", "pos": "noun", "meanings": {"en": "Contact info / phone number", "te": "ఫోన్ నంబర్ / వివరాలు", "hi": "संपर्क नंबर"}, "exTarget": "연락처 알려주세요.", "exTranslit": "Yeollakcheo allyeojuseyo.", "exNative": {"en": "Please give me your contact info.", "te": "మీ ఫోన్ నంబర్ ఇవ్వండి.", "hi": "कृपया अपना नंबर दीजिए।"}},
                {"word": "내일", "translit": "Naeil", "pron": "నే-ఇల్", "pos": "noun", "meanings": {"en": "Tomorrow", "te": "రేపు", "hi": "कल (आने वाला)"}, "exTarget": "내일 시간 있어요?", "exTranslit": "Naeil sigan isseoyo?", "exNative": {"en": "Do you have time tomorrow?", "te": "రేపు సమయం ఉందా?", "hi": "क्या कल समय है?"}},
                {"word": "같이", "translit": "Gachi", "pron": "గా-ఛి", "pos": "adverb", "meanings": {"en": "Together", "te": "కలిసి", "hi": "साथ में"}, "exTarget": "같이 가요.", "exTranslit": "Gachi gayo.", "exNative": {"en": "Let's go together.", "te": "కలిసి వెళ్దాం.", "hi": "साथ में चलते हैं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Ask 'Shall we go together?' in Korean.", "te": "'మనం కలిసి వెళ్దామా?' అని ఎలా అడుగుతారు?", "hi": "'क्या हम साथ चलें?' कैसे पूछेंगे?"}, "prompt": {"en": "Shall we go together?", "te": "మనం కలిసి వెళ్దామా?", "hi": "क्या हम साथ चलें?"}, "correct": "우리 같이 갈까요?", "options": ["우리 같이 갈까요?", "화장실 어디예요?", "얼마예요?", "감사합니다"], "expl": {"en": "우리 같이 갈까요? invites someone politely.", "te": "స్నేహపూర్వకంగా ఆహ్వానించే మాట.", "hi": "साथ चलने का विनम्र आमंत्रण।"}}
            ]
        },
        {
            "title": {"en": "Emergencies & Medical Help", "te": "అత్యవసర సహాయం & డాక్టర్", "hi": "आपातकाल और डॉक्टर की सहायता"},
            "objective": {"en": "Call for help (도와주세요!), locate a clinic, and describe medical symptoms.", "te": "సహాయం కోరడం (도와주세요!), నొప్పని చెప్పడం మరియు ఆసుపత్రి కనుగొనడం.", "hi": "मदद मांगना (도와주세요!), दर्द बताना और डॉक्टर को खोजना।"},
            "culturalTip": {"en": "Call 112 for Police and 119 for Ambulance in Korea; free translators are available on call.", "te": "కొరియాలో పోలీసుల కోసం 112, అంబులెన్స్ కోసం 119 డయల్ చేయాలి.", "hi": "कोरिया में पुलिस के लिए 112 और एम्बुलेंस के लिए 119 पर कॉल करें।"},
            "grammar": {
                "title": {"en": "Expressing Pain (아파요)", "te": "నొప్పిగా ఉంది (아파요)", "hi": "दर्द बताना (아파요)"},
                "explanation": {"en": "[Body part] + 이/가 + 아파요 expresses pain: 머리가 아파요 (Head hurts).", "te": "శరీర భాగం + ఆపాయో అంటే నొప్పిగా ఉంది అని అర్థం.", "hi": "अंग का नाम + आफा-यो का अर्थ है दर्द हो रहा है।"},
                "ruleSummary": {"en": "[Part] 아파요 = [Part] hurts.", "te": "నొప్పిగా ఉంది.", "hi": "दर्द हो रहा है।"},
                "examples": [{"target": "배가 아파요", "transliteration": "Baega apayo", "native": {"en": "Stomach hurts.", "te": "కడుపు నొప్పిగా ఉంది.", "hi": "पेट में दर्द है।"}}],
                "commonMistakes": [{"incorrect": "나 아파 사람", "correct": "병원에 가야 해요", "explanation": {"en": "Say 병원에 가야 해요 (I need to go to hospital).", "te": "ఆసుపత్రికి వెళ్లాలి అని చెప్పాలి.", "hi": "अस्पताल जाने के लिए 병원에 가야 해요 कहें।"}}]
            },
            "vocab": [
                {"word": "도와주세요", "translit": "Dowajuseyo", "pron": "దో-వా-జూ-సే-యో", "pos": "phrase", "meanings": {"en": "Please help me!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"}, "exTarget": "도와주세요! 급해요.", "exTranslit": "Dowajuseyo! Geuphaeyo.", "exNative": {"en": "Help! It is urgent.", "te": "సహాయం చేయండి! అత్యవసరం.", "hi": "मदद कीजिए! बहुत ज़रूरी है।"}},
                {"word": "병원", "translit": "Byeong-won", "pron": "బియోంగ్-వోన్", "pos": "noun", "meanings": {"en": "Hospital / clinic", "te": "ఆసుపత్రి", "hi": "अस्पताल"}, "exTarget": "병원에 가야 해요.", "exTranslit": "Byeong-wone gaya haeyo.", "exNative": {"en": "I must go to a hospital.", "te": "ఆసుపత్రికి వెళ్లాలి.", "hi": "मुझे अस्पताल जाना होगा।"}},
                {"word": "약국", "translit": "Yakguk", "pron": "యాక్-గుక్", "pos": "noun", "meanings": {"en": "Pharmacy", "te": "మందుల షాప్", "hi": "दवा की दुकान"}, "exTarget": "약국이 어디예요?", "exTranslit": "Yakgugi eodiyeyo?", "exNative": {"en": "Where is the pharmacy?", "te": "మందుల షాప్ ఎక్కడ ఉంది?", "hi": "दवा की दुकान कहाँ है?"}},
                {"word": "경찰", "translit": "Gyeongchal", "pron": "గ్యోంగ్-చల్", "pos": "noun", "meanings": {"en": "Police", "te": "పోలీసులు", "hi": "पुलिस"}, "exTarget": "경찰을 불러주세요.", "exTranslit": "Gyeongchareul bulleojuseyo.", "exNative": {"en": "Please call the police.", "te": "పోలీసులను పిలవండి.", "hi": "कृपया पुलिस को बुलाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you urgently shout 'Please help me!' in Korean?", "te": "అత్యవసరంలో 'సహాయం చేయండి!' అని ఎలా అరుస్తారు?", "hi": "आपात स्थिति में 'मदद कीजिए!' कैसे चिल्लाएंगे?"}, "prompt": {"en": "Please help me!", "te": "సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"}, "correct": "도와주세요!", "options": ["도와주세요!", "안녕하세요", "얼마예요?", "감사합니다"], "expl": {"en": "도와주세요! is the Korean emergency call for help.", "te": "సహాయం కోరే అత్యవసర మాట.", "hi": "कोरियाई में मदद की मुख्य गुहार।"}}
            ]
        },
        {
            "title": {"en": "Lost Items & Speaking Slowly", "te": "పోగొట్టుకున్న వస్తువులు & సమాచారం", "hi": "खोया हुआ सामान और सहायता"},
            "objective": {"en": "Report a lost wallet or phone and ask locals to speak slowly.", "te": "పర్స్ లేదా ఫోన్ పోయిందని చెప్పడం మరియు మెల్లగా మాట్లాడమనడం.", "hi": "खोया हुआ पर्स/फोन बताना और धीरे बोलने का अनुरोध करना।"},
            "culturalTip": {"en": "Over 80% of lost phones and wallets in Seoul are safely returned via lost112 police registry.", "te": "కొరియాలో పోయిన వస్తువులు దొరకడం చాలా సహజం.", "hi": "सियोल में खोई हुई अधिकांश वस्तुएं पुलिस के माध्यम से मिल जाती हैं।"},
            "grammar": {
                "title": {"en": "Asking to Speak Slowly (천천히 말씀해 주세요)", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి", "hi": "कृपया धीरे बोलिए"},
                "explanation": {"en": "천천히 (slowly) + 말씀해 주세요 (please speak) helps when locals talk fast.", "te": "స్థానికులు వేగంగా మాట్లాడినప్పుడు 천천히 말씀해 주세요 అనాలి.", "hi": "जब स्थानीय लोग तेज़ बोलें तो 천천히 말씀해 주세요 कहें।"},
                "ruleSummary": {"en": "천천히 = slowly; 말씀해 주세요 = please speak.", "te": "నెమ్మదిగా మాట్లాడండి.", "hi": "धीरे बोलिए।"},
                "examples": [{"target": "조금 천천히 말해주세요", "transliteration": "Jogeum cheoncheonhi malhaejuseyo", "native": {"en": "Please speak a little slower.", "te": "కాస్త నెమ్మదిగా చెప్పండి.", "hi": "कृपया थोड़ा धीरे बोलिए।"}}],
                "commonMistakes": [{"incorrect": "느리게 말해", "correct": "천천히 말씀해 주세요", "explanation": {"en": "Use honorific 말씀해 주세요.", "te": "మర్యాదగా 말씀해 주세요 అనాలి.", "hi": "सम्मानपूर्वक 말씀해 주세요 बोलें।"}}]
            },
            "vocab": [
                {"word": "지갑", "translit": "Jigap", "pron": "జి-గాప్", "pos": "noun", "meanings": {"en": "Wallet / purse", "te": "పర్స్ / పర్సు", "hi": "बटुआ / पर्स"}, "exTarget": "지갑을 잃어버렸어요.", "exTranslit": "Jigabeul ireobeoryeosseoyo.", "exNative": {"en": "I lost my wallet.", "te": "నా పర్స్ పోయింది.", "hi": "मेरा बटुआ खो गया।"}},
                {"word": "핸드폰", "translit": "Haendeupon", "pron": "హేన్-డు-పోన్", "pos": "noun", "meanings": {"en": "Mobile phone", "te": "మొబైల్ ఫోన్", "hi": "मोबाइल फोन"}, "exTarget": "핸드폰을 두고 왔어요.", "exTranslit": "Haendeuponeul dugo wasseoyo.", "exNative": {"en": "I left my phone behind.", "te": "ఫోన్ అక్కడే మరిచిపోయాను.", "hi": "मैं फोन भूल आया हूँ।"}},
                {"word": "천천히", "translit": "Cheoncheonhi", "pron": "ఛోన్-ఛోన్-హి", "pos": "adverb", "meanings": {"en": "Slowly", "te": "నెమ్మదిగా", "hi": "धीरे-धीरे"}, "exTarget": "천천히 말씀해 주세요.", "exTranslit": "Cheoncheonhi 말씀해 juseyo.", "exNative": {"en": "Please speak slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"}},
                {"word": "다시", "translit": "Dasi", "pron": "దా-సి", "pos": "adverb", "meanings": {"en": "Again / once more", "te": "మళ్లీ", "hi": "दोबारा / फिर से"}, "exTarget": "다시 말해주세요.", "exTranslit": "Dasi malhaejuseyo.", "exNative": {"en": "Please say it again.", "te": "మళ్లీ ఒకసారి చెప్పండి.", "hi": "कृपया फिर से कहिए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Please speak slowly' in Korean?", "te": "'దయచేసి నెమ్మదిగా మాట్లాడండి' అని ఎలా అంటారు?", "hi": "'कृपया धीरे बोलिए' कैसे कहेंगे?"}, "prompt": {"en": "Please speak slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"}, "correct": "천천히 말씀해 주세요", "options": ["천천히 말씀해 주세요", "도와주세요!", "얼마예요?", "화장실 어디예요?"], "expl": {"en": "천천히 (slowly) + 말씀해 주세요 (please speak).", "te": "నెమ్మదిగా మాట్లాడండి అని చెప్పే మాట.", "hi": "धीरे बोलने का विनम्र अनुरोध।"}}
            ]
        }
    ]
]
