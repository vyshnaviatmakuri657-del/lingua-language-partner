# scripts/target_es.py
# -*- coding: utf-8 -*-
"""15 Real-Life Situational Spanish Lessons across 5 Modules."""

ES_LESSONS = [
    # MODULE 1: Everyday Survival & Greetings
    [
        {
            "title": {"en": "Daily Greetings & Hello", "te": "రోజువారీ శుభాకాంక్షలు (Hola)", "hi": "दैनिक अभिवादन (Hola)"},
            "objective": {"en": "Master ¡Hola!, Buenos días, and natural Spanish greeting etiquette.", "te": "హలో, శుభోదయం మరియు సహజమైన స్పానిష్ పలకరింపులు నేర్చుకోండి.", "hi": "हैलो, शुभ प्रभात और स्वाभाविक स्पैनिश अभिवादन सीखें।"},
            "culturalTip": {"en": "In Spain and Latin America, greeting with two air kisses or a warm handshake is customary.", "te": "స్పెయిన్ మరియు లాటిన్ అమెరికాలో పలకరించుకునేటప్పుడు స్నేహపూర్వక కరచాలనం లేదా పలకరింపు చేస్తారు.", "hi": "स्पेन और लैटिन अमेरिका में गर्मजोशी से हाथ मिलाना या अभिवादन करना सामान्य है।"},
            "grammar": {
                "title": {"en": "Formal vs Informal You (Tú vs Usted)", "te": "నువ్వు vs మీరు (Tú vs Usted)", "hi": "तुम बनाम आप (Tú बनाम Usted)"},
                "explanation": {"en": "Use 'tú' with friends and peers; use 'usted' with elders, shopkeepers, and officials.", "te": "స్నేహితులతో 'tú' (నువ్వు), గౌరవప్రదంగా 'usted' (మీరు) వాడతారు.", "hi": "दोस्तों से 'tú' (तुम) और आदरणीय व्यक्तियों से 'usted' (आप) कहें।"},
                "ruleSummary": {"en": "¿Cómo estás? (Informal) vs ¿Cómo está usted? (Formal).", "te": "¿Cómo estás? (నువ్వు ఎలా ఉన్నావు?) vs ¿Cómo está usted? (మీరు ఎలా ఉన్నారు?)", "hi": "¿Cómo estás? (तुम कैसे हो?) vs ¿Cómo está usted? (आप कैसे हैं?)"},
                "examples": [{"target": "¡Hola! ¿Cómo estás?", "transliteration": "Hola! Como estas?", "native": {"en": "Hello! How are you?", "te": "హలో! ఎలా ఉన్నారు?", "hi": "नमस्ते! आप कैसे हैं?"}}],
                "commonMistakes": [{"incorrect": "Buenos día", "correct": "Buenos días", "explanation": {"en": "Always plural: Buenos días.", "te": "స్పానిష్‌లో 'Buenos días' బహువచనంలో అనాలి.", "hi": "हमेशा बहुवचन 'Buenos días' कहें।"}}]
            },
            "vocab": [
                {"word": "Hola", "translit": "Ola", "pron": "ఓ-లా", "pos": "greeting", "meanings": {"en": "Hello / Hi", "te": "నమస్కారం / హలో", "hi": "नमस्ते / हैलो"}, "exTarget": "¡Hola! Buenos días.", "exTranslit": "Hola! Buenos dias.", "exNative": {"en": "Hello! Good morning.", "te": "హలో! శుభోదయం.", "hi": "नमस्ते! शुभ प्रभात।"}},
                {"word": "Gracias", "translit": "Grasias", "pron": "గ్రా-సి-యాస్", "pos": "phrase", "meanings": {"en": "Thank you", "te": "ధన్యవాదాలు", "hi": "धन्यवाद"}, "exTarget": "Muchas gracias por tu ayuda.", "exTranslit": "Muchas gracias por tu ayuda.", "exNative": {"en": "Thank you very much for your help.", "te": "మీ సహాయానికి చాలా ధన్యవాదాలు.", "hi": "आपकी सहायता के लिए बहुत धन्यवाद।"}},
                {"word": "Adiós", "translit": "Adios", "pron": "ఆ-ది-యోస్", "pos": "phrase", "meanings": {"en": "Goodbye", "te": "వీడ్కోలు / వెళ్లివస్తాను", "hi": "अलविदा"}, "exTarget": "¡Adiós! Hasta mañana.", "exTranslit": "Adios! Hasta manana.", "exNative": {"en": "Goodbye! See you tomorrow.", "te": "వెళ్లివస్తాను! రేపు కలుద్దాం.", "hi": "अलविदा! कल मिलते हैं।"}},
                {"word": "Sí", "translit": "Si", "pron": "సీ", "pos": "interjection", "meanings": {"en": "Yes", "te": "అవును", "hi": "हाँ"}, "exTarget": "Sí, por favor.", "exTranslit": "Si, por favor.", "exNative": {"en": "Yes, please.", "te": "అవును, దయచేసి.", "hi": "हाँ, कृपया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the Spanish word for 'Hello'.", "te": "హలో కు సరైన స్పానిష్ పదాన్ని ఎంచుకోండి.", "hi": "नमस्ते के लिए सही स्पैनिश शब्द चुनें।"}, "prompt": {"en": "Hello", "te": "హలో", "hi": "नमस्ते"}, "correct": "Hola", "options": ["Hola", "Gracias", "Adiós", "Por favor"], "expl": {"en": "'Hola' (h is silent) is universal hello.", "te": "'Hola' లో 'హెచ్' శబ్దం ఉండదు, 'ఓలా' అంటారు.", "hi": "'Hola' में 'H' शांत रहता है, 'ओला' बोलते हैं।"}},
                {"instruction": {"en": "Choose the phrase for 'Thank you'.", "te": "'ధన్యవాదాలు' కి సరైనది ఏది?", "hi": "'धन्यवाद' के लिए सही शब्द कौन सा है?"}, "prompt": {"en": "Thank you", "te": "ధన్యవాదాలు", "hi": "धन्यवाद"}, "correct": "Gracias", "options": ["Gracias", "Hola", "Sí", "No"], "expl": {"en": "'Gracias' expresses gratitude.", "te": "కృతజ్ఞత కోసం Gracias అంటారు.", "hi": "धन्यवाद के लिए Gracias का प्रयोग होता है।"}}
            ]
        },
        {
            "title": {"en": "Politeness, Excuse Me & Please", "te": "మర్యాదపూర్వక మాటలు & క్షమించండి", "hi": "माफ़ी और शिष्टाचार"},
            "objective": {"en": "Use Por favor, Disculpe, and Perdón in markets and public places.", "te": "దయచేసి, క్షమించండి అని మర్యాదగా మాట్లాడటం నేర్చుకోండి.", "hi": "कृपया और माफ़ कीजिए का स्वाभाविक प्रयोग सीखें।"},
            "culturalTip": {"en": "Adding 'Por favor' and 'Gracias' to every interaction is deeply appreciated in Spanish-speaking cultures.", "te": "స్పానిష్ లో 'Por favor' మరియు 'Gracias' తరచుగా వాడటం ఎంతో గౌరవప్రదం.", "hi": "स्पैनिश में 'Por favor' और 'Gracias' का प्रयोग अत्यंत आदरणीय माना जाता है।"},
            "grammar": {
                "title": {"en": "Polite Requests (Por favor)", "te": "దయచేసి అడగడం", "hi": "विनम्र अनुरोध"},
                "explanation": {"en": "Place 'Por favor' at the beginning or end of requests.", "te": "వాక్యం మొదట్లో లేదా చివర 'Por favor' చేర్చండి.", "hi": "वाक्य के शुरू या अंत में 'Por favor' जोड़ें।"},
                "ruleSummary": {"en": "[Request] + por favor = Polite request.", "te": "[కోరిక] + దయచేసి.", "hi": "[अनुरोध] + कृपया।"},
                "examples": [{"target": "Un café, por favor", "transliteration": "Un cafe, por favor", "native": {"en": "A coffee, please.", "te": "ఒక కాఫీ ఇవ్వండి, దయచేసి.", "hi": "एक कॉफ़ी, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Dame café", "correct": "Un café, por favor", "explanation": {"en": "Avoid bare commands; always add 'por favor'.", "te": "ఎప్పుడూ 'por favor' జతచేసి అడగాలి.", "hi": "हमेशा 'por favor' जोड़कर कहें।"}}]
            },
            "vocab": [
                {"word": "Por favor", "translit": "Por favor", "pron": "పోర్ ఫా-వోర్", "pos": "phrase", "meanings": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "exTarget": "Ayúdame, por favor.", "exTranslit": "Ayudame, por favor.", "exNative": {"en": "Help me, please.", "te": "దయచేసి నాకు సహాయం చేయండి.", "hi": "कृपया मेरी मदद कीजिए।"}},
                {"word": "Disculpe", "translit": "Diskulpe", "pron": "దిస్-కుల్-పే", "pos": "phrase", "meanings": {"en": "Excuse me (formal)", "te": "కొద్దిగా వినండి / క్షమించండి", "hi": "माफ़ कीजिए / सुनिए"}, "exTarget": "Disculpe, ¿dónde está el metro?", "exTranslit": "Disculpe, donde esta el metro?", "exNative": {"en": "Excuse me, where is the metro?", "te": "కొద్దిగా వినండి, మెట్రో ఎక్కడ ఉంది?", "hi": "सुनिए, मेट्रो कहाँ है?"}},
                {"word": "Perdón", "translit": "Perdon", "pron": "పెర్-దోన్", "pos": "phrase", "meanings": {"en": "Sorry / Pardon", "te": "నన్ను క్షమించండి", "hi": "माफ़ कीजिए"}, "exTarget": "Perdón, no fue mi intención.", "exTranslit": "Perdon, no fue mi intencion.", "exNative": {"en": "Sorry, it was not my intention.", "te": "క్షమించండి, కావాలని చేయలేదు.", "hi": "माफ़ करें, मेरी यह मंशा नहीं थी।"}},
                {"word": "De nada", "translit": "De nada", "pron": "దే నా-దా", "pos": "phrase", "meanings": {"en": "You are welcome", "te": "పర్వాలేదు / పర్లేదు", "hi": "कोई बात नहीं / आपका स्वागत है"}, "exTarget": "—Gracias. —De nada.", "exTranslit": "Gracias. De nada.", "exNative": {"en": "—Thank you. —You're welcome.", "te": "—ధన్యవాదాలు. —పర్వాలేదండి.", "hi": "—धन्यवाद। —कोई बात नहीं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'Please' in Spanish?", "te": "'దయచేసి' అని స్పానిష్‌లో ఎలా అంటారు?", "hi": "स्पैनिश में 'कृपया' कैसे कहते हैं?"}, "prompt": {"en": "Please", "te": "దయచేసి", "hi": "कृपया"}, "correct": "Por favor", "options": ["Por favor", "De nada", "Hola", "Adiós"], "expl": {"en": "'Por favor' means please.", "te": "దయచేసి అంటే Por favor.", "hi": "Por favor का अर्थ कृपया है।"}}
            ]
        },
        {
            "title": {"en": "Introducing Yourself & Origin", "te": "పరిచయం & ఎక్కడి నుంచి వచ్చారో చెప్పడం", "hi": "आत्मपरिचय और गृह देश"},
            "objective": {"en": "State your name with 'Me llamo...' and nationality with 'Soy de...'.", "te": "మీ పేరు 'Me llamo...' మరియు దేశం 'Soy de...' చెప్పడం నేర్చుకోండి.", "hi": "अपना नाम 'Me llamo...' और देश 'Soy de...' बताना सीखें।"},
            "culturalTip": {"en": "Say 'Mucho gusto' (Pleasure to meet you) with a smile when introduced to anyone.", "te": "పరిచయమైనప్పుడు 'Mucho gusto' అని చిరునవ్వుతో చెప్పడం సాంప్రదాయం.", "hi": "परिचय के समय मुस्कुराते हुए 'Mucho gusto' कहें।"},
            "grammar": {
                "title": {"en": "Verb Ser vs Llamarse", "te": "పేరు & గుర్తింపు", "hi": "नाम और पहचान"},
                "explanation": {"en": "'Me llamo [Name]' means 'My name is [Name]'. 'Soy de [Country]' means 'I am from [Country]'.", "te": "నా పేరు చెప్పడానికి Me llamo..., నా దేశం చెప్పడానికి Soy de... వాడతారు.", "hi": "नाम के लिए Me llamo... और देश के लिए Soy de... का प्रयोग करें।"},
                "ruleSummary": {"en": "Me llamo [Name]. Soy de [Country].", "te": "నా పేరు [పేరు]. నేను [దేశం] నుంచి వచ్చాను.", "hi": "मेरा नाम [नाम] है। मैं [देश] से हूँ।"},
                "examples": [{"target": "Me llamo Carlos y soy de la India", "transliteration": "Me llamo Carlos y soy de la India", "native": {"en": "My name is Carlos and I am from India.", "te": "నా పేరు కార్లోస్, నేను భారతదేశం నుంచి వచ్చాను.", "hi": "मेरा नाम कार्लोस है और मैं भारत से हूँ।"}}],
                "commonMistakes": [{"incorrect": "Mi nombre soy Carlos", "correct": "Me llamo Carlos", "explanation": {"en": "Say 'Me llamo Carlos' or 'Mi nombre es Carlos'.", "te": "స్పానిష్ లో Me llamo అనడం అత్యంత సహజం.", "hi": "हमेशा Me llamo कहें।"}}]
            },
            "vocab": [
                {"word": "Me llamo", "translit": "Me yamo", "pron": "మే యా-మో", "pos": "phrase", "meanings": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "exTarget": "Me llamo David.", "exTranslit": "Me llamo David.", "exNative": {"en": "My name is David.", "te": "నా పేరు డేవిడ్.", "hi": "मेरा नाम डेविड है।"}},
                {"word": "Mucho gusto", "translit": "Mucho gusto", "pron": "ము-చో గుస్-తో", "pos": "phrase", "meanings": {"en": "Nice to meet you", "te": "మిమ్మల్ని కలవడం సంతోషం", "hi": "आपसे मिलकर खुशी हुई"}, "exTarget": "Mucho gusto en conocerte.", "exTranslit": "Mucho gusto en conocerte.", "exNative": {"en": "Pleased to meet you.", "te": "మిమ్మల్ని కలవడం చాలా సంతోషం.", "hi": "आपसे मिलकर बहुत प्रसन्नता हुई।"}},
                {"word": "Soy de", "translit": "Soy de", "pron": "సోయ్ దే", "pos": "phrase", "meanings": {"en": "I am from", "te": "నేను ... నుంచి వచ్చాను", "hi": "मैं ... से हूँ"}, "exTarget": "Soy de la India.", "exTranslit": "Soy de la India.", "exNative": {"en": "I am from India.", "te": "నేను భారతదేశం నుంచి వచ్చాను.", "hi": "मैं भारत से हूँ।"}},
                {"word": "Amigo", "translit": "Amigo", "pron": "అ-మీ-గో", "pos": "noun", "meanings": {"en": "Friend", "te": "స్నేహితుడు / మిత్రుడు", "hi": "दोस्त / मित्र"}, "exTarget": "Él es mi amigo.", "exTranslit": "El es mi amigo.", "exNative": {"en": "He is my friend.", "te": "అతను నా స్నేహితుడు.", "hi": "वह मेरा दोस्त है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you say 'My name is' in Spanish?", "te": "'నా పేరు...' అని స్పానిష్‌లో ఎలా అంటారు?", "hi": "स्पैनिश में 'मेरा नाम... है' कैसे कहेंगे?"}, "prompt": {"en": "My name is", "te": "నా పేరు...", "hi": "मेरा नाम... है"}, "correct": "Me llamo", "options": ["Me llamo", "Soy de", "Mucho gusto", "Por favor"], "expl": {"en": "'Me llamo' literally means 'I call myself'.", "te": "పేరు చెప్పడానికి Me llamo వాడతారు.", "hi": "नाम बताने के लिए Me llamo बोलते हैं।"}}
            ]
        }
    ],
    # MODULE 2: Real-World Shopping & Numbers
    [
        {
            "title": {"en": "Numbers & Asking Prices", "te": "సంఖ్యలు & ధరలు అడగడం", "hi": "संख्याएँ और दाम पूछना"},
            "objective": {"en": "Ask '¿Cuánto cuesta?' and understand euro prices in stores.", "te": "'దీని ధర ఎంత?' అని అడగడం మరియు యూరో ధరలు అర్థం చేసుకోవడం.", "hi": "'यह कितने का है?' पूछना और यूरो में दाम समझना।"},
            "culturalTip": {"en": "In Spain, currency is the Euro (€). Taxes are almost always included in the marked shelf price.", "te": "స్పెయిన్ లో యూరో కరెన్సీ వాడతారు; ధరల్లో ట్యాక్స్ కలిసి ఉంటుంది.", "hi": "स्पेन में यूरो मुद्रा चलती है; कर हमेशा मूल्य में जुड़ा होता है।"},
            "grammar": {
                "title": {"en": "Asking Cost (¿Cuánto cuesta?)", "te": "ధర అడగడం", "hi": "दाम पूछना"},
                "explanation": {"en": "Use '¿Cuánto cuesta [singular item]?' and '¿Cuánto cuestan [plural items]?'.", "te": "ఒక్క వస్తువైతే cuesta, ఎక్కువైతే cuestan అంటారు.", "hi": "एकवचन के लिए cuesta, बहुवचन के लिए cuestan लगाएं।"},
                "ruleSummary": {"en": "¿Cuánto cuesta esto? = How much does this cost?", "te": "దీని ఖరీదు ఎంత?", "hi": "यह कितने का है?"},
                "examples": [{"target": "¿Cuánto cuesta esta camisa?", "transliteration": "Cuanto cuesta esta camisa?", "native": {"en": "How much is this shirt?", "te": "ఈ షర్ట్ ధర ఎంత?", "hi": "यह कमीज कितने की है?"}}],
                "commonMistakes": [{"incorrect": "¿Cuánto es dinero?", "correct": "¿Cuánto cuesta esto?", "explanation": {"en": "Always use '¿Cuánto cuesta?'.", "te": "ధర అడగడానికి ¿Cuánto cuesta? వాడాలి.", "hi": "हमेशा ¿Cuánto cuesta? कहें।"}}]
            },
            "vocab": [
                {"word": "¿Cuánto cuesta?", "translit": "Cuanto kuesta?", "pron": "క్వాన్-తో క్వెస్-తా?", "pos": "phrase", "meanings": {"en": "How much does it cost?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "exTarget": "¿Cuánto cuesta esto, por favor?", "exTranslit": "Cuanto cuesta esto, por favor?", "exNative": {"en": "How much is this, please?", "te": "దయచేసి చెప్పండి, దీని ధర ఎంత?", "hi": "कृपया बताइए यह कितने का है?"}},
                {"word": "Euro", "translit": "Euro", "pron": "ఎవ్-రో", "pos": "noun", "meanings": {"en": "Euro (currency)", "te": "యూరో (కరెన్సీ)", "hi": "यूरो"}, "exTarget": "Cuesta diez euros.", "exTranslit": "Cuesta diez euros.", "exNative": {"en": "It costs 10 euros.", "te": "ఇది 10 యూరోలు.", "hi": "यह 10 यूरो का है।"}},
                {"word": "Caro", "translit": "Karo", "pron": "కా-రో", "pos": "adjective", "meanings": {"en": "Expensive", "te": "చాలా ఖరీదైనది", "hi": "महँगा"}, "exTarget": "Es un poco caro.", "exTranslit": "Es un poco caro.", "exNative": {"en": "It is a bit expensive.", "te": "ఇది కాస్త ఖరీదైనది.", "hi": "यह थोड़ा महँगा है।"}},
                {"word": "Barato", "translit": "Barato", "pron": "బా-రా-తో", "pos": "adjective", "meanings": {"en": "Cheap / affordable", "te": "చవకైనది / అందుబాటు ధర", "hi": "सस्ता"}, "exTarget": "Es muy barato.", "exTranslit": "Es muy barato.", "exNative": {"en": "It is very cheap.", "te": "ఇది చాలా చవకైనది.", "hi": "यह बहुत सस्ता है।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Select the Spanish question for 'How much is this?'.", "te": "'దీని ధర ఎంత?' కి సరైన స్పానిష్ వాక్యం ఏది?", "hi": "'यह कितने का है?' के लिए सही स्पैनिश वाक्य चुनें।"}, "prompt": {"en": "How much does it cost?", "te": "దీని ధర ఎంత?", "hi": "यह कितने का है?"}, "correct": "¿Cuánto cuesta?", "options": ["¿Cuánto cuesta?", "¿Dónde está?", "¿Cómo te llamas?", "Muchas gracias"], "expl": {"en": "¿Cuánto cuesta? is the primary phrase for asking prices.", "te": "ధర అడిగే ముఖ్యమైన ప్రశ్న ఇది.", "hi": "दाम पूछने का मुख्य वाक्य यही है।"}}
            ]
        },
        {
            "title": {"en": "Paying by Card, Cash & Receipt", "te": "కార్డు, నగదు చెల్లింపు & రసీదు", "hi": "कार्ड, नकद और रसीद"},
            "objective": {"en": "Ask '¿Puedo pagar con tarjeta?' and ask for the receipt (el recibo).", "te": "కార్డుతో చెల్లించవచ్చా అని అడగడం మరియు రసీదు తీసుకోవడం.", "hi": "कार्ड भुगतान और रसीद मांगना सीखें।"},
            "culturalTip": {"en": "Contactless card payment ('con tarjeta') is widely used everywhere in Spain.", "te": "స్పెయిన్ లో కాంటాక్ట్‌లెస్ కార్డు పేమెంట్ విస్తృతంగా వాడుకలో ఉంది.", "hi": "स्पेन में कॉन्टैक्टलेस कार्ड भुगतान हर जगह स्वीकार होता है।"},
            "grammar": {
                "title": {"en": "Ability with Poder (¿Puedo pagar...?)", "te": "నేను చేయవచ్చా? (¿Puedo...?)", "hi": "क्या मैं कर सकता हूँ? (¿Puedo...?)"},
                "explanation": {"en": "Poder + infinitive: ¿Puedo pagar...? (Can I pay...?).", "te": "¿Puedo pagar con tarjeta? అంటే కార్డుతో చెల్లించవచ్చా?", "hi": "¿Puedo pagar...? का मतलब है क्या मैं भुगतान कर सकता हूँ?"},
                "ruleSummary": {"en": "¿Puedo + [Verb]? = Can I [Verb]?", "te": "నేను [పని] చేయవచ్చా?", "hi": "क्या मैं [काम] कर सकता हूँ?"},
                "examples": [{"target": "¿Puedo pagar con tarjeta?", "transliteration": "Puedo pagar con tarjeta?", "native": {"en": "Can I pay by card?", "te": "నేను కార్డు ద్వారా చెల్లించవచ్చా?", "hi": "क्या मैं कार्ड से भुगतान कर सकता हूँ?"}}],
                "commonMistakes": [{"incorrect": "Pagar tarjeta puedo?", "correct": "¿Puedo pagar con tarjeta?", "explanation": {"en": "Auxiliary 'puedo' precedes the main verb.", "te": "ముందు Puedo అనాలి.", "hi": "पहले Puedo बोलें।"}}]
            },
            "vocab": [
                {"word": "Tarjeta", "translit": "Tarheta", "pron": "తార్-హె-తా", "pos": "noun", "meanings": {"en": "Card (credit/debit)", "te": "కార్డు (క్రెడిట్/డెబిట్)", "hi": "कार्ड"}, "exTarget": "¿Aceptan tarjeta?", "exTranslit": "Aceptan tarjeta?", "exNative": {"en": "Do you accept cards?", "te": "కార్డు తీసుకుంటారా?", "hi": "क्या आप कार्ड स्वीकार करते हैं?"}},
                {"word": "Efectivo", "translit": "Efektivo", "pron": "ఎ-ఫెక్-తీ-వో", "pos": "noun", "meanings": {"en": "Cash", "te": "నగదు", "hi": "नकद"}, "exTarget": "Pago en efectivo.", "exTranslit": "Pago en efectivo.", "exNative": {"en": "I pay in cash.", "te": "నేను నగదు చెల్లిస్తాను.", "hi": "मैं नकद भुगतान करता हूँ।"}},
                {"word": "Recibo", "translit": "Resibo", "pron": "రె-సీ-బో", "pos": "noun", "meanings": {"en": "Receipt", "te": "రసీదు", "hi": "रसीद"}, "exTarget": "El recibo, por favor.", "exTranslit": "El recibo, por favor.", "exNative": {"en": "The receipt, please.", "te": "రసీదు ఇవ్వండి, దయచేసి.", "hi": "कृपया रसीद दीजिए।"}},
                {"word": "Bolsa", "translit": "Bolsa", "pron": "బోల్-సా", "pos": "noun", "meanings": {"en": "Shopping bag", "te": "సంచి / బ్యాగ్", "hi": "थैली / बैग"}, "exTarget": "¿Necesita una bolsa?", "exTranslit": "Necesita una bolsa?", "exNative": {"en": "Do you need a bag?", "te": "మీకు సంచి కావాలా?", "hi": "क्या आपको थैली चाहिए?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How to ask 'Can I pay by card?' in Spanish?", "te": "'కార్డుతో చెల్లించవచ్చా?' అని ఎలా అడుగుతారు?", "hi": "स्पैनिश में 'क्या मैं कार्ड से भुगतान कर सकता हूँ?' कैसे पूछेंगे?"}, "prompt": {"en": "Can I pay by card?", "te": "కార్డుతో చెల్లించవచ్చా?", "hi": "क्या कार्ड चलेगा?"}, "correct": "¿Puedo pagar con tarjeta?", "options": ["¿Puedo pagar con tarjeta?", "¿Cuánto cuesta?", "¿Dónde está?", "Muchas gracias"], "expl": {"en": "¿Puedo pagar con tarjeta? is standard.", "te": "కార్డు పేమెంట్ కోసం అడిగే స్పష్టమైన మాట.", "hi": "कार्ड भुगतान का मानक वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Supermarket & Daily Essentials", "te": "సూపర్‌మార్కెట్‌లో నిత్యావసరాలు", "hi": "सुपरमार्केट और दैनिक सामान"},
            "objective": {"en": "Find water, bread, and groceries, and ask '¿Tiene...?'.", "te": "నీళ్లు, బ్రెడ్ వంటి నిత్యావసరాలు అడగడం నేర్చుకోండి.", "hi": "पानी, ब्रेड और आवश्यक सामान मांगना सीखें।"},
            "culturalTip": {"en": "In Spanish supermarkets, remember to weigh your produce and print a barcode sticker before going to checkout.", "te": "స్పెయిన్ లో పండ్లు, కూరగాయలకు ముందుగా బరువు తూచి స్టిక్కర్ వేయించాలి.", "hi": "स्पेन के स्टोरों में सब्ज़ियों का वज़न पहले करवाकर स्टिकर लगवाना होता है।"},
            "grammar": {
                "title": {"en": "Asking Availability (¿Tiene...?)", "te": "మీ దగ్గర ఉందా? (¿Tiene...?)", "hi": "क्या आपके पास है? (¿Tiene...?)"},
                "explanation": {"en": "¿Tiene [item]? asks 'Do you have [item]?'.", "te": "¿Tiene [వస్తువు]? అంటే మీ దగ్గర ఇది ఉందా అని అర్థం.", "hi": "¿Tiene [वस्तु]? का मतलब है क्या आपके पास यह है?"},
                "ruleSummary": {"en": "¿Tiene [Item]? = Do you have [Item]?", "te": "మీ దగ్గర [వస్తువు] ఉందా?", "hi": "क्या आपके पास [वस्तु] है?"},
                "examples": [{"target": "¿Tiene agua mineral?", "transliteration": "Tiene agua mineral?", "native": {"en": "Do you have mineral water?", "te": "మీ దగ్గర మినరల్ వాటర్ ఉందా?", "hi": "क्या आपके पास मिनरल वॉटर है?"}}],
                "commonMistakes": [{"incorrect": "¿Hay tú agua?", "correct": "¿Tiene agua?", "explanation": {"en": "Use ¿Tiene agua? (Do you have water?) or ¿Hay agua? (Is there water?).", "te": "¿Tiene agua? అని అడగాలి.", "hi": "¿Tiene agua? बोलें।"}}]
            },
            "vocab": [
                {"word": "Agua", "translit": "Agwa", "pron": "ఆ-గ్వా", "pos": "noun", "meanings": {"en": "Water", "te": "నీళ్లు", "hi": "पानी"}, "exTarget": "Una botella de agua, por favor.", "exTranslit": "Una botella de agua, por favor.", "exNative": {"en": "A bottle of water, please.", "te": "ఒక వాటర్ బాటిల్ ఇవ్వండి.", "hi": "एक पानी की बोतल, कृपया।"}},
                {"word": "Pan", "translit": "Pan", "pron": "పాన్", "pos": "noun", "meanings": {"en": "Bread", "te": "రొట్టె / బ్రెడ్", "hi": "रोटी / ब्रेड"}, "exTarget": "El pan está fresco.", "exTranslit": "El pan esta fresco.", "exNative": {"en": "The bread is fresh.", "te": "బ్రెడ్ తాజాగా ఉంది.", "hi": "ब्रेड ताज़ा है।"}},
                {"word": "Uno", "translit": "Uno", "pron": "ఉ-నో", "pos": "number", "meanings": {"en": "One", "te": "ఒకటి", "hi": "एक"}, "exTarget": "Solo quiero uno.", "exTranslit": "Solo quiero uno.", "exNative": {"en": "I only want one.", "te": "నాకు ఒక్కటి చాలు.", "hi": "मुझे केवल एक चाहिए।"}},
                {"word": "Dos", "translit": "Dos", "pron": "దోస్", "pos": "number", "meanings": {"en": "Two", "te": "రెండు", "hi": "दो"}, "exTarget": "Dos por favor.", "exTranslit": "Dos por favor.", "exNative": {"en": "Two, please.", "te": "రెండు ఇవ్వండి, దయచేసి.", "hi": "दो, कृपया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Ask 'Do you have water?' in Spanish.", "te": "'నీళ్లు ఉన్నాయా?' అని స్పానిష్‌లో ఎలా అడుగుతారు?", "hi": "स्पैनिश में 'क्या पानी है?' कैसे पूछेंगे?"}, "prompt": {"en": "Do you have water?", "te": "నీళ్లు ఉన్నాయా?", "hi": "क्या पानी है?"}, "correct": "¿Tiene agua?", "options": ["¿Tiene agua?", "¿Cuánto cuesta?", "Adiós", "Gracias"], "expl": {"en": "¿Tiene agua? asks for water politely.", "te": "నీళ్ల కోసం అడిగే స్పష్టమైన ప్రశ్న.", "hi": "पानी पूछने का सही वाक्य।"}}
            ]
        }
    ],
    # MODULE 3: Cafés, Street Food & Restaurants
    [
        {
            "title": {"en": "Ordering at Cafés (Café con leche)", "te": "కేఫ్‌లో కాఫీ ఆర్డర్ చేయడం", "hi": "कैफ़े में कॉफ़ी का ऑर्डर"},
            "objective": {"en": "Order café con leche, express temperature, and ask for takeaway.", "te": "కాఫీ విత్ మిల్క్ ఆర్డర్ చేయడం, పార్శిల్ మరియు వేడిది అడగడం.", "hi": "कॉफ़ी विथ मिल्क, पार्सल और गरम मांगना सीखें।"},
            "culturalTip": {"en": "Spain's café culture is iconic: 'Café con leche' (coffee with milk) is standard for breakfast.", "te": "స్పెయిన్ లో ఉదయాన్నే 'Café con leche' తాగడం ప్రసిద్ధి.", "hi": "स्पेन में सुबह 'Café con leche' पीना बहुत लोकप्रिय है।"},
            "grammar": {
                "title": {"en": "Ordering with 'Quisiera' or 'Un... por favor'", "te": "కాఫీ ఆర్డర్ చేసే రూపాలు", "hi": "विनम्रता से मंगाना"},
                "explanation": {"en": "Say 'Un café con leche, por favor' or 'Quisiera un café' (I would like a coffee).", "te": "'Un café, por favor' అంటే ఒక కాఫీ ఇవ్వండి అని అర్థం.", "hi": "'Un café, por favor' कहकर विनम्रता से ऑर्डर दें।"},
                "ruleSummary": {"en": "Un/Una [Drink] + por favor = Polite order.", "te": "ఒక [డ్రింక్] ఇవ్వండి, దయచేసి.", "hi": "एक [पेय], कृपया।"},
                "examples": [{"target": "Un café solo, por favor", "transliteration": "Un cafe solo, por favor", "native": {"en": "A black coffee, please.", "te": "ఒక బ్లాక్ కాఫీ ఇవ్వండి.", "hi": "एक ब्लैक कॉफ़ी, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Quiero café ya", "correct": "Un café, por favor", "explanation": {"en": "Always remain polite with 'por favor'.", "te": "ఎప్పుడూ por favor అనాలి.", "hi": "हमेशा por favor जोड़ें।"}}]
            },
            "vocab": [
                {"word": "Café", "translit": "Kafe", "pron": "కా-ఫే", "pos": "noun", "meanings": {"en": "Coffee", "te": "కాఫీ", "hi": "कॉफ़ी"}, "exTarget": "Un café con leche, por favor.", "exTranslit": "Un cafe con leche, por favor.", "exNative": {"en": "A coffee with milk, please.", "te": "ఒక కాఫీ విత్ మిల్క్ ఇవ్వండి.", "hi": "दूध वाली कॉफ़ी, कृपया।"}},
                {"word": "Leche", "translit": "Leche", "pron": "లే-చే", "pos": "noun", "meanings": {"en": "Milk", "te": "పాలు", "hi": "दूध"}, "exTarget": "Con leche fría, por favor.", "exTranslit": "Con leche fria, por favor.", "exNative": {"en": "With cold milk, please.", "te": "చల్లని పాలతో ఇవ్వండి.", "hi": "ठंडे दूध के साथ, कृपया।"}},
                {"word": "Para llevar", "translit": "Para yevar", "pron": "పా-రా యా-వార్", "pos": "phrase", "meanings": {"en": "To-go / takeaway", "te": "పార్శిల్ / టేక్‌అవే", "hi": "पैक / टेकअवे"}, "exTarget": "Para llevar, por favor.", "exTranslit": "Para llevar, por favor.", "exNative": {"en": "To-go, please.", "te": "పార్శిల్ కట్టండి, దయచేసి.", "hi": "पैक कर दीजिए, कृपया।"}},
                {"word": "Azúcar", "translit": "Asukar", "pron": "ఆ-సూ-కార్", "pos": "noun", "meanings": {"en": "Sugar", "te": "చక్కెర / పంచదార", "hi": "चीनी / शक्कर"}, "exTarget": "Sin azúcar, por favor.", "exTranslit": "Sin azucar, por favor.", "exNative": {"en": "Without sugar, please.", "te": "చక్కెర లేకుండా ఇవ్వండి.", "hi": "बिना चीनी के, कृपया।"}}
            ],
            "exercises": [
                {"instruction": {"en": "Order a coffee with milk in Spanish.", "te": "కాఫీ విత్ మిల్క్ ఆర్డర్ చేసే వాక్యాన్ని ఎంచుకోండి.", "hi": "दूध वाली कॉफ़ी ऑर्डर करने का सही वाक्य चुनें।"}, "prompt": {"en": "Coffee with milk, please.", "te": "కాఫీ విత్ మిల్క్ ఇవ్వండి.", "hi": "दूध वाली कॉफ़ी, कृपया।"}, "correct": "Un café con leche, por favor", "options": ["Un café con leche, por favor", "¿Cuánto cuesta?", "Adiós", "De nada"], "expl": {"en": "Un café con leche, por favor is the classic order.", "te": "స్పానిష్ లో అత్యంత ప్రసిద్ధ కాఫీ ఆర్డర్.", "hi": "स्पेन में कॉफ़ी मंगाने का क्लासिक तरीका।"}}
            ]
        },
        {
            "title": {"en": "Dining & Tapas", "te": "రెస్టారెంట్‌లో భోజనం & తాపాస్", "hi": "रेस्तरां में भोजन और तापास"},
            "objective": {"en": "Request a table for two, ask for the menu, and compliment the food.", "te": "ఇద్దరికి టేబుల్ అడగడం, మెనూ మరియు భోజనం బాగుందని చెప్పడం.", "hi": "दो लोगों के लिए टेबल, मेन्यू और स्वादिष्ट कहना सीखें।"},
            "culturalTip": {"en": "Lunch in Spain is typically eaten between 2:00 PM and 4:00 PM, and dinner after 9:00 PM.", "te": "స్పెయిన్ లో మధ్యాహ్న భోజనం 2-4 గంటలకు, రాత్రి భోజనం 9 గంటల తర్వాత చేస్తారు.", "hi": "स्पेन में दोपहर का खाना 2 से 4 बजे और रात का खाना 9 बजे के बाद होता है।"},
            "grammar": {
                "title": {"en": "Requesting Tables (Una mesa para...)", "te": "టేబుల్ అడగడం", "hi": "टेबल मांगना"},
                "explanation": {"en": "Say 'Una mesa para dos, por favor' (A table for two, please).", "te": "ఇద్దరి టేబుల్ కోసం 'Una mesa para dos, por favor' అనాలి.", "hi": "दो लोगों के लिए 'Una mesa para dos, por favor' कहें।"},
                "ruleSummary": {"en": "Una mesa para [Number] = A table for [Number].", "te": "[సంఖ్య] మందికి టేబుల్.", "hi": "[संख्या] लोगों के लिए टेबल।"},
                "examples": [{"target": "Una mesa para dos personas, por favor", "transliteration": "Una mesa para dos personas, por favor", "native": {"en": "A table for two persons, please.", "te": "ఇద్దరికి టేబుల్ ఇవ్వండి, దయచేసి.", "hi": "दो लोगों के लिए एक टेबल, कृपया।"}}],
                "commonMistakes": [{"incorrect": "Yo quiero sentar", "correct": "Una mesa para dos, por favor", "explanation": {"en": "Use the standard restaurant greeting.", "te": "సహజమైన రెస్టారెంట్ వాక్యం వాడాలి.", "hi": "रेस्तरां में मानक वाक्य का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "Mesa", "translit": "Mesa", "pron": "మే-సా", "pos": "noun", "meanings": {"en": "Table", "te": "టేబుల్ / బల్ల", "hi": "टेबल / मेज़"}, "exTarget": "Una mesa para dos, por favor.", "exTranslit": "Una mesa para dos, por favor.", "exNative": {"en": "A table for two, please.", "te": "ఇద్దరికి టేబుల్ ఇవ్వండి.", "hi": "दो लोगों के लिए टेबल दीजिए।"}},
                {"word": "La carta", "translit": "La karta", "pron": "లా కార్-తా", "pos": "noun", "meanings": {"en": "The menu", "te": "మెనూ కార్డు", "hi": "मेन्यू कार्ड"}, "exTarget": "¿Nos trae la carta, por favor?", "exTranslit": "Nos trae la carta, por favor?", "exNative": {"en": "Could you bring us the menu, please?", "te": "మెనూ తీసుకురండి, దయచేసి.", "hi": "कृपया हमें मेन्यू ला दीजिए।"}},
                {"word": "Delicioso", "translit": "Delisioso", "pron": "దే-లి-సి-యో-సో", "pos": "adjective", "meanings": {"en": "Delicious", "te": "చాలా రుచికరమైనది", "hi": "बहुत स्वादिष्ट"}, "exTarget": "¡Está delicioso!", "exTranslit": "Esta delicioso!", "exNative": {"en": "It is delicious!", "te": "ఇది చాలా రుచిగా ఉంది!", "hi": "यह बहुत स्वादिष्ट है!"}},
                {"word": "Camarero", "translit": "Kamarero", "pron": "కా-మా-రే-రో", "pos": "noun", "meanings": {"en": "Waiter / server", "te": "వెయిటర్ / సర్వర్", "hi": "वेटर / सेवक"}, "exTarget": "¡Camarero, por favor!", "exTranslit": "Camarero, por favor!", "exNative": {"en": "Waiter, please!", "te": "వెయిటర్ గారు, కొద్దిగా రండి!", "hi": "वेटर जी, कृपया सुनिए!"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you request a table for two in Spanish?", "te": "ఇద్దరికి టేబుల్ కావాలని ఎలా అడుగుతారు?", "hi": "दो लोगों के लिए टेबल कैसे मांगेंगे?"}, "prompt": {"en": "A table for two, please.", "te": "ఇద్దరికి టేబుల్ ఇవ్వండి.", "hi": "दो के लिए टेबल, कृपया।"}, "correct": "Una mesa para dos, por favor", "options": ["Una mesa para dos, por favor", "Un café por favor", "¿Cuánto cuesta?", "Muchas gracias"], "expl": {"en": "Una mesa para dos, por favor is correct.", "te": "ఇద్దరికి టేబుల్ అడిగే సరైన వాక్యం.", "hi": "दो के लिए टेबल मांगने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Dietary Needs & The Bill (La cuenta)", "te": "ఆహార అలవాట్లు & బిల్లు చెల్లించడం", "hi": "शाकाहारी और बिल चुकाना"},
            "objective": {"en": "Ask for the check ('La cuenta, por favor') and state vegetarian preferences.", "te": "'La cuenta, por favor' అని బిల్లు అడగడం మరియు శాకాహారం చెప్పడం.", "hi": "'La cuenta, por favor' कहकर बिल मांगना और शाकाहारी बताना।"},
            "culturalTip": {"en": "Tipping in Spain is modest; leaving 5-10% for good service is appreciated but not mandatory.", "te": "స్పెయిన్ లో టిప్పింగ్ తప్పనిసరి కాదు, మంచి సర్వీస్ కు 5-10% ఇవ్వవచ్చు.", "hi": "स्पेन में टिप देना अनिवार्य नहीं है, लेकिन 5-10% देना अच्छा माना जाता है।"},
            "grammar": {
                "title": {"en": "Asking for the Bill (La cuenta, por favor)", "te": "బిల్లు అడగడం", "hi": "बिल मांगना"},
                "explanation": {"en": "Simply say 'La cuenta, por favor' to your server.", "te": "సర్వర్‌తో 'La cuenta, por favor' అంటే సరిపోతుంది.", "hi": "वेटर से सीधे 'La cuenta, por favor' कहें।"},
                "ruleSummary": {"en": "La cuenta, por favor = The check, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"},
                "examples": [{"target": "¿Nos trae la cuenta, por favor?", "transliteration": "Nos trae la cuenta, por favor?", "native": {"en": "Could you bring us the bill, please?", "te": "బిల్లు తీసుకురండి, దయచేసి.", "hi": "कृपया बिल ले आइए।"}}],
                "commonMistakes": [{"incorrect": "Dame pagar", "correct": "La cuenta, por favor", "explanation": {"en": "Use the standard idiom 'La cuenta, por favor'.", "te": "ఎప్పుడూ 'La cuenta, por favor' అనాలి.", "hi": "हमेशा 'La cuenta, por favor' कहें।"}}]
            },
            "vocab": [
                {"word": "La cuenta", "translit": "La kwenta", "pron": "లా క్వెన్-తా", "pos": "noun", "meanings": {"en": "The bill / check", "te": "బిల్లు / లెక్క", "hi": "बिल / चेक"}, "exTarget": "La cuenta, por favor.", "exTranslit": "La cuenta, por favor.", "exNative": {"en": "The check, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"}},
                {"word": "Vegetariano", "translit": "Vehetariano", "pron": "వె-హె-తా-రి-యా-నో", "pos": "adjective", "meanings": {"en": "Vegetarian", "te": "శాకాహారి / శాకాహారం", "hi": "शाकाहारी"}, "exTarget": "Soy vegetariano.", "exTranslit": "Soy vegetariano.", "exNative": {"en": "I am vegetarian.", "te": "నేను శాకాహారిని.", "hi": "मैं शाकाहारी हूँ।"}},
                {"word": "Picante", "translit": "Pikante", "pron": "పి-కాన్-తే", "pos": "adjective", "meanings": {"en": "Spicy / hot", "te": "కారంగా / ఘాటుగా", "hi": "तीखा"}, "exTarget": "¿Es muy picante?", "exTranslit": "Es muy picante?", "exNative": {"en": "Is it very spicy?", "te": "ఇది చాలా కారంగా ఉంటుందా?", "hi": "क्या यह बहुत तीखा है?"}},
                {"word": "Carne", "translit": "Karne", "pron": "కార్-నే", "pos": "noun", "meanings": {"en": "Meat", "te": "మాంసం", "hi": "मांस"}, "exTarget": "Sin carne, por favor.", "exTranslit": "Sin carne, por favor.", "exNative": {"en": "Without meat, please.", "te": "మాంసం లేకుండా చేయండి.", "hi": "कृपया बिना मांस के बनाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the bill in a restaurant in Spanish?", "te": "రెస్టారెంట్‌లో 'బిల్లు ఇవ్వండి' అని ఎలా అంటారు?", "hi": "स्पैनिश में 'कृपया बिल दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "The check, please.", "te": "బిల్లు ఇవ్వండి, దయచేసి.", "hi": "कृपया बिल दीजिए।"}, "correct": "La cuenta, por favor", "options": ["La cuenta, por favor", "El menú por favor", "Hola", "¿Cuánto cuesta?"], "expl": {"en": "'La cuenta, por favor' is the standard way to request the bill.", "te": "బిల్లు అడిగే ఖచ్చితమైన స్పానిష్ వాక్యం.", "hi": "बिल मांगने का मानक वाक्य।"}}
            ]
        }
    ],
    # MODULE 4: Real-Life Transit & Navigation
    [
        {
            "title": {"en": "Where is the Restroom? (Navigation)", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది? (దిశలు)", "hi": "शौचालय कहाँ है? (रास्ता पूछना)"},
            "objective": {"en": "Ask '¿Dónde está...?' and understand left, right, and straight.", "te": "ఎక్కడ ఉంది అని అడగడం, ఎడమ, కుడి మరియు తిన్నగా వెళ్లడం అర్థం చేసుకోవడం.", "hi": "कहाँ है पूछना, बाएँ, दाएँ और सीधे जाना समझना।"},
            "culturalTip": {"en": "In Spain, public restrooms are marked with 'Servicios', 'Aseos', or 'Baños'.", "te": "స్పెయిన్ లో బాత్‌రూమ్‌లకు 'Aseos' లేదా 'Servicios' అని రాసి ఉంటుంది.", "hi": "स्पेन में शौचालयों पर 'Aseos' या 'Servicios' लिखा होता है।"},
            "grammar": {
                "title": {"en": "Asking Locations (¿Dónde está...?)", "te": "ప్రదేశం ఎక్కడ? (¿Dónde está...?)", "hi": "स्थान पूछना (¿Dónde está...?)"},
                "explanation": {"en": "¿Dónde está [singular location]? asks 'Where is [location]?'.", "te": "ఒక స్థలం ఎక్కడుందో అడగడానికి ¿Dónde está వాడతారు.", "hi": "किसी स्थान का पता पूछने के लिए ¿Dónde está लगाएं।"},
                "ruleSummary": {"en": "¿Dónde está [Place]? = Where is [Place]?", "te": "[స్థలం] ఎక్కడ ఉంది?", "hi": "[स्थान] कहाँ है?"},
                "examples": [{"target": "¿Dónde está la estación?", "transliteration": "Donde esta la estacion?", "native": {"en": "Where is the station?", "te": "స్టేషన్ ఎక్కడ ఉంది?", "hi": "स्टेशन कहाँ है?"}}],
                "commonMistakes": [{"incorrect": "¿Dónde es el baño?", "correct": "¿Dónde está el baño?", "explanation": {"en": "Use 'está' for physical location, never 'es'.", "te": "స్థలం ఎక్కడ ఉందో చెప్పడానికి 'está' వాడాలి.", "hi": "स्थान के लिए हमेशा 'está' का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "El baño", "translit": "El banyo", "pron": "ఎల్ బాన్-యో", "pos": "noun", "meanings": {"en": "Restroom / bathroom", "te": "బాత్‌రూమ్ / శౌచాలయం", "hi": "शौचालय / बाथरूम"}, "exTarget": "¿Dónde está el baño, por favor?", "exTranslit": "Donde esta el bano, por favor?", "exNative": {"en": "Where is the restroom, please?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది, దయచేసి?", "hi": "कृपया बताइए शौचालय कहाँ है?"}},
                {"word": "Izquierda", "translit": "Iskyerda", "pron": "ఇజ్-క్యెర్-దా", "pos": "noun", "meanings": {"en": "Left", "te": "ఎడమ వైపు", "hi": "बाईं ओर"}, "exTarget": "Gire a la izquierda.", "exTranslit": "Gire a la izquierda.", "exNative": {"en": "Turn to the left.", "te": "ఎడమ వైపునకు తిరగండి.", "hi": "बाईं तरफ मुड़िए।"}},
                {"word": "Derecha", "translit": "Derecha", "pron": "దే-రే-చా", "pos": "noun", "meanings": {"en": "Right", "te": "కుడి వైపు", "hi": "दाईं ओर"}, "exTarget": "Está a la derecha.", "exTranslit": "Esta a la derecha.", "exNative": {"en": "It is on the right.", "te": "అది కుడివైపున ఉంది.", "hi": "यह दाईं ओर है।"}},
                {"word": "Todo recto", "translit": "Todo rekto", "pron": "తో-దో రెక్-తో", "pos": "phrase", "meanings": {"en": "Straight ahead", "te": "తిన్నగా / నేరుగా", "hi": "सीधे आगे"}, "exTarget": "Siga todo recto.", "exTranslit": "Siga todo recto.", "exNative": {"en": "Go straight ahead.", "te": "ముందుకు నేరుగా వెళ్లండి.", "hi": "सीधे आगे जाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask 'Where is the restroom?' in Spanish?", "te": "'బాత్‌రూమ్ ఎక్కడ ఉంది?' అని ఎలా అడుగుతారు?", "hi": "स्पैनिश में 'शौचालय कहाँ है?' कैसे पूछेंगे?"}, "prompt": {"en": "Where is the restroom?", "te": "బాత్‌రూమ్ ఎక్కడ ఉంది?", "hi": "शौचालय कहाँ है?"}, "correct": "¿Dónde está el baño?", "options": ["¿Dónde está el baño?", "¿Cuánto cuesta?", "Hola", "Muchas gracias"], "expl": {"en": "¿Dónde está el baño? is the vital travel question.", "te": "ప్రయాణాల్లో అత్యంత అవసరమైన ప్రశ్న.", "hi": "यात्रा में सबसे ज़रूरी वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Subways, Buses & Taxis", "te": "మెట్రో, బస్సు & టాక్సీ ప్రయాణం", "hi": "मेट्रो, बस और टैक्सी"},
            "objective": {"en": "Tell a taxi driver your destination and ask 'Pare aquí, por favor'.", "te": "టాక్సీ డ్రైవర్‌కు గమ్యం చెప్పడం మరియు ఇక్కడ ఆపమనడం.", "hi": "टैक्सी चालक को पता बताना और यहाँ रोकने के लिए कहना।"},
            "culturalTip": {"en": "Licensed taxis in Madrid are white with a diagonal red stripe; green roof light means available.", "te": "మాడ్రిడ్‌లో టాక్సీలు తెలుపు రంగులో ఉండి పచ్చ లైట్ వెలుగుతుంటే ఖాళీగా ఉన్నట్లు.", "hi": "मैड्रिड में सफेद टैक्सियों पर हरी बत्ती का मतलब खाली होना है।"},
            "grammar": {
                "title": {"en": "Directions with 'Lléveme a...'", "te": "నన్ను అక్కడికి తీసుకెళ్లండి", "hi": "वहाँ ले चलिए"},
                "explanation": {"en": "Say 'Lléveme a [destination], por favor' to your taxi driver.", "te": "టాక్సీ డ్రైవర్‌తో 'Lléveme a [స్థలం], por favor' అనాలి.", "hi": "टैक्सी चालक से 'Lléveme a [स्थान], por favor' कहें।"},
                "ruleSummary": {"en": "Lléveme a [Place] = Take me to [Place].", "te": "నన్ను [స్థలం]కు తీసుకెళ్లండి.", "hi": "मुझे [स्थान] ले चलिए।"},
                "examples": [{"target": "Lléveme al aeropuerto, por favor", "transliteration": "Lleveme al aeropuerto, por favor", "native": {"en": "Take me to the airport, please.", "te": "నన్ను ఎయిర్‌పోర్ట్‌కు తీసుకెళ్లండి.", "hi": "कृपया मुझे हवाई अड्डे ले चलिए।"}}],
                "commonMistakes": [{"incorrect": "Tú vas aeropuerto", "correct": "Al aeropuerto, por favor", "explanation": {"en": "Say 'Al aeropuerto, por favor' directly.", "te": "నేరుగా Al aeropuerto, por favor అనవచ్చు.", "hi": "सीधे Al aeropuerto, por favor बोलें।"}}]
            },
            "vocab": [
                {"word": "La estación", "translit": "La estasion", "pron": "లా ఎస్-తా-సి-యోన్", "pos": "noun", "meanings": {"en": "The station (metro/train)", "te": "స్టేషన్ (మెట్రో/రైలు)", "hi": "स्टेशन (मेट्रो/ट्रेन)"}, "exTarget": "¿Dónde está la estación de metro?", "exTranslit": "Donde esta la estacion de metro?", "exNative": {"en": "Where is the metro station?", "te": "మెట్రో స్టేషన్ ఎక్కడ ఉంది?", "hi": "मेट्रो स्टेशन कहाँ है?"}},
                {"word": "Taxi", "translit": "Taksi", "pron": "త్యాక్-సీ", "pos": "noun", "meanings": {"en": "Taxi", "te": "టాక్సీ", "hi": "टैक्सी"}, "exTarget": "Necesito un taxi.", "exTranslit": "Necesito un taxi.", "exNative": {"en": "I need a taxi.", "te": "నాకు టాక్సీ కావాలి.", "hi": "मुझे एक टैक्सी चाहिए।"}},
                {"word": "Pare aquí", "translit": "Pare aki", "pron": "పా-రే ఆ-కీ", "pos": "phrase", "meanings": {"en": "Stop here / pull over", "te": "ఇక్కడ ఆపండి", "hi": "यहाँ रोक दीजिए"}, "exTarget": "Pare aquí, por favor.", "exTranslit": "Pare aqui, por favor.", "exNative": {"en": "Please stop right here.", "te": "దయచేసి ఇక్కడే ఆపండి.", "hi": "कृपया यहीं रोक दीजिए।"}},
                {"word": "¿Cuánto tarda?", "translit": "Cuanto tarda?", "pron": "క్వాన్-తో తార్-దా?", "pos": "phrase", "meanings": {"en": "How long does it take?", "te": "ఎంత సమయం పడుతుంది?", "hi": "कितना समय लगेगा?"}, "exTarget": "¿Cuánto tarda en llegar?", "exTranslit": "Cuanto tarda en llegar?", "exNative": {"en": "How long does it take to arrive?", "te": "చేరుకోవడానికి ఎంత సమయం పడుతుంది?", "hi": "पहुँचने में कितना समय लगेगा?"}}
            ],
            "exercises": [
                {"instruction": {"en": "Tell the taxi driver 'Please stop here' in Spanish.", "te": "టాక్సీ డ్రైవర్‌తో 'ఇక్కడ ఆపండి' అని ఎలా అంటారు?", "hi": "टैक्सी चालक से 'यहाँ रोक दीजिए' कैसे कहेंगे?"}, "prompt": {"en": "Please stop here.", "te": "ఇక్కడ ఆపండి.", "hi": "यहाँ रोक दीजिए।"}, "correct": "Pare aquí, por favor", "options": ["Pare aquí, por favor", "¿Dónde está?", "¿Cuánto cuesta?", "Muchas gracias"], "expl": {"en": "Pare aquí, por favor is courteous and clear.", "te": "ఇక్కడ ఆపండి అని స్పష్టంగా చెప్పే మాట.", "hi": "यहाँ गाड़ी रोकने का सही वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Hotel Check-In & Wi-Fi", "te": "హోటల్ చెక్-ఇన్ & రూమ్ సర్వీస్", "hi": "होटल चेक-इन और कमरा"},
            "objective": {"en": "Check in with 'Tengo una reserva', ask for Wi-Fi, and request luggage hold.", "te": "రిజర్వేషన్ చూపించడం, వైఫై పాస్‌వర్డ్ మరియు లగేజ్ ఉంచడం నేర్చుకోండి.", "hi": "आरक्षण दिखाना, वाई-फाई पासवर्ड और सामान रखना सीखें।"},
            "culturalTip": {"en": "Spain requires passport presentation during hotel check-in by national law.", "te": "స్పెయిన్ హోటళ్లలో చెక్-ఇన్ చేసేటప్పుడు పాస్‌పోర్ట్ చూపించడం చట్టరీత్యా తప్పనిసరి.", "hi": "स्पेन के होटलों में चेक-इन के समय पासपोर्ट दिखाना कानूनी रूप से अनिवार्य है।"},
            "grammar": {
                "title": {"en": "Possession with Tener (Tengo una reserva)", "te": "నాకు ఉంది (Tengo...)", "hi": "मेरे पास है (Tengo...)"},
                "explanation": {"en": "'Tengo una reserva a nombre de [Name]' means 'I have a booking under [Name]'.", "te": "నా పేరు మీద బుకింగ్ ఉంది అని చెప్పడానికి Tengo una reserva అంటారు.", "hi": "मेरे नाम से बुकिंग है कहने के लिए Tengo una reserva का प्रयोग करें।"},
                "ruleSummary": {"en": "Tengo [Noun] = I have [Noun].", "te": "నా దగ్గర [వస్తువు] ఉంది.", "hi": "मेरे पास [वस्तु] है।"},
                "examples": [{"target": "Tengo una reserva para dos noches", "transliteration": "Tengo una reserva para dos noches", "native": {"en": "I have a reservation for two nights.", "te": "నాకు రెండు రాత్రుల బుకింగ్ ఉంది.", "hi": "मेरे पास दो रातों का आरक्षण है।"}}],
                "commonMistakes": [{"incorrect": "Yo soy reserva", "correct": "Tengo una reserva", "explanation": {"en": "Use 'tener' (to have) for bookings, not 'ser'.", "te": "బుకింగ్ కోసం 'Tengo' వాడాలి.", "hi": "आरक्षण के लिए हमेशा 'Tengo' कहें।"}}]
            },
            "vocab": [
                {"word": "Reserva", "translit": "Reserva", "pron": "రె-సేర్-వా", "pos": "noun", "meanings": {"en": "Reservation / booking", "te": "రిజర్వేషన్ / బుకింగ్", "hi": "आरक्षण / बुकिंग"}, "exTarget": "Tengo una reserva a mi nombre.", "exTranslit": "Tengo una reserva a mi nombre.", "exNative": {"en": "I have a reservation in my name.", "te": "నా పేరు మీద రిజర్వేషన్ ఉంది.", "hi": "मेरे नाम से आरक्षण है।"}},
                {"word": "Clave del Wi-Fi", "translit": "Klave del Wi-Fi", "pron": "క్లా-వే దెల్ వై-ఫై", "pos": "noun", "meanings": {"en": "Wi-Fi password", "te": "వైఫై పాస్‌వర్డ్", "hi": "वाई-फाई पासवर्ड"}, "exTarget": "¿Cuál es la clave del Wi-Fi?", "exTranslit": "Cual es la clave del Wi-Fi?", "exNative": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}},
                {"word": "La llave", "translit": "La yave", "pron": "లా యా-వే", "pos": "noun", "meanings": {"en": "The room key / card", "te": "గది తాళం / కీ కార్డు", "hi": "कमरे की चाबी"}, "exTarget": "Aquí tiene su llave.", "exTranslit": "Aqui tiene su llave.", "exNative": {"en": "Here is your key.", "te": "ఇదిగోండి మీ తాళం చెవి.", "hi": "यह रही आपकी चाबी।"}},
                {"word": "Equipaje", "translit": "Ekipahe", "pron": "ఎ-కీ-పా-హే", "pos": "noun", "meanings": {"en": "Luggage / baggage", "te": "సామాన్లు / లగేజ్", "hi": "सामान / बैग"}, "exTarget": "¿Puedo dejar mi equipaje aquí?", "exTranslit": "Puedo dejar mi equipaje aqui?", "exNative": {"en": "Can I leave my luggage here?", "te": "నా లగేజ్ ఇక్కడ ఉంచవచ్చా?", "hi": "क्या मैं सामान यहाँ छोड़ सकता हूँ?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for the Wi-Fi password in Spanish?", "te": "'వైఫై పాస్‌వర్డ్ ఏమిటి?' అని ఎలా అడుగుతారు?", "hi": "स्पैनिश में 'वाई-फाई पासवर्ड क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is the Wi-Fi password?", "te": "వైఫై పాస్‌వర్డ్ ఏమిటి?", "hi": "वाई-फाई पासवर्ड क्या है?"}, "correct": "¿Cuál es la clave del Wi-Fi?", "options": ["¿Cuál es la clave del Wi-Fi?", "¿Cuánto cuesta?", "Adiós", "¿Dónde está el baño?"], "expl": {"en": "¿Cuál es la clave del Wi-Fi? is the standard phrase.", "te": "వైఫై పాస్‌వర్డ్ అడిగే సరైన మాట.", "hi": "वाई-फाई पासवर्ड पूछने का वाक्य।"}}
            ]
        }
    ],
    # MODULE 5: Social Fluency & Urgent Help
    [
        {
            "title": {"en": "Making Friends & Contact Info", "te": "స్నేహం చేయడం & నంబర్ అడగడం", "hi": "दोस्त बनाना और फोन नंबर"},
            "objective": {"en": "Ask for phone numbers/WhatsApp and invite someone for coffee.", "te": "వాట్సాప్ నంబర్ అడగడం మరియు కాఫీకి ఆహ్వానించడం నేర్చుకోండి.", "hi": "व्हाट्सएप नंबर मांगना और कॉफ़ी के लिए आमंत्रित करना।"},
            "culturalTip": {"en": "WhatsApp is universally used across Spain and Latin America for communication.", "te": "స్పెయిన్ మరియు లాటిన్ అమెరికాలో వాట్సాప్ అందరూ ఉపయోగిస్తారు.", "hi": "स्पेन और लैटिन अमेरिका में हर कोई व्हाट्सएप का उपयोग करता है।"},
            "grammar": {
                "title": {"en": "Invitations (¿Quieres ir...?)", "te": "ఆహ్వానించడం", "hi": "आमंत्रित करना"},
                "explanation": {"en": "¿Quieres [Verb]? asks 'Do you want to [Verb]?'. ¿Quieres tomar un café? (Do you want to have a coffee?).", "te": "కలిసి వెళ్దామా అని అడగడానికి ¿Quieres... వాడతారు.", "hi": "क्या आप चलना चाहेंगे पूछने के लिए ¿Quieres... का प्रयोग करें।"},
                "ruleSummary": {"en": "¿Quieres + [Verb]? = Do you want to [Verb]?", "te": "నువ్వు [పని] చేయాలనుకుంటున్నావా?", "hi": "क्या तुम [काम] करना चाहते हो?"},
                "examples": [{"target": "¿Quieres tomar un café mañana?", "transliteration": "Quieres tomar un cafe manana?", "native": {"en": "Do you want to grab coffee tomorrow?", "te": "రేపు కాఫీ తాగుదామా?", "hi": "क्या कल कॉफ़ी पिएंगे?"}}],
                "commonMistakes": [{"incorrect": "Tú quieres café conmigo?", "correct": "¿Quieres tomar un café?", "explanation": {"en": "Direct and polite suggestion.", "te": "సరళంగా ¿Quieres tomar un café? అనవచ్చు.", "hi": "¿Quieres tomar un café? बोलें।"}}]
            },
            "vocab": [
                {"word": "Número de teléfono", "translit": "Numero de telefono", "pron": "నూ-మె-రో దే తే-లే-ఫో-నో", "pos": "noun", "meanings": {"en": "Phone number", "te": "ఫోన్ నంబర్", "hi": "फोन नंबर"}, "exTarget": "¿Cuál es tu número de teléfono?", "exTranslit": "Cual es tu numero de telefono?", "exNative": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}},
                {"word": "Mañana", "translit": "Manyana", "pron": "మాన్-యా-నా", "pos": "noun", "meanings": {"en": "Tomorrow / morning", "te": "రేపు / ఉదయం", "hi": "कल (आने वाला) / सुबह"}, "exTarget": "Nos vemos mañana.", "exTranslit": "Nos vemos manana.", "exNative": {"en": "See you tomorrow.", "te": "రేపు కలుద్దాం.", "hi": "कल मिलते हैं।"}},
                {"word": "Tiempo", "translit": "Tyempo", "pron": "త్యెం-పో", "pos": "noun", "meanings": {"en": "Time / weather", "te": "సమయం / కాలం", "hi": "समय"}, "exTarget": "¿Tienes tiempo hoy?", "exTranslit": "Tienes tiempo hoy?", "exNative": {"en": "Do you have time today?", "te": "ఈరోజు మీకు సమయం ఉందా?", "hi": "क्या आपके पास आज समय है?"}},
                {"word": "Juntos", "translit": "Huntos", "pron": "హున్-తోస్", "pos": "adverb", "meanings": {"en": "Together", "te": "కలిసి", "hi": "साथ में"}, "exTarget": "Vamos juntos.", "exTranslit": "Vamos juntos.", "exNative": {"en": "Let's go together.", "te": "కలిసి వెళ్దాం.", "hi": "साथ चलते हैं।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask for someone's phone number in Spanish?", "te": "'మీ ఫోన్ నంబర్ ఏమిటి?' అని ఎలా అడుగుతారు?", "hi": "स्पैनिश में 'आपका फोन नंबर क्या है?' कैसे पूछेंगे?"}, "prompt": {"en": "What is your phone number?", "te": "మీ ఫోన్ నంబర్ ఏమిటి?", "hi": "आपका फोन नंबर क्या है?"}, "correct": "¿Cuál es tu número de teléfono?", "options": ["¿Cuál es tu número de teléfono?", "¿Dónde está el baño?", "¿Cuánto cuesta?", "Muchas gracias"], "expl": {"en": "¿Cuál es tu número de teléfono? is standard.", "te": "ఫోన్ నంబర్ అడిగే స్పష్టమైన మాట.", "hi": "फोन नंबर पूछने का वाक्य।"}}
            ]
        },
        {
            "title": {"en": "Emergencies & Medical Help", "te": "అత్యవసర సహాయం & డాక్టర్", "hi": "आपातकाल और डॉक्टर की सहायता"},
            "objective": {"en": "Shout '¡Ayuda!', locate a pharmacy, and call emergency services (112).", "te": "సహాయం కోరడం (¡Ayuda!), మందుల దుకాణం మరియు ఎమర్జెన్సీ నంబర్ 112.", "hi": "मदद मांगना (¡Ayuda!), फार्मेसी और आपातकालीन 112 पर कॉल करना।"},
            "culturalTip": {"en": "Dial 112 in Spain and the EU for any emergency (police, medical, fire).", "te": "స్పెయిన్ మరియు యూరప్ అంతటా అత్యవసర సహాయం కోసం 112 డయల్ చేయాలి.", "hi": "स्पेन और पूरे यूरोप में किसी भी आपात स्थिति के लिए 112 पर कॉल करें।"},
            "grammar": {
                "title": {"en": "Expressing Need with 'Necesito...'", "te": "నాకు అవసరం (Necesito...)", "hi": "मुझे आवश्यकता है (Necesito...)"},
                "explanation": {"en": "'Necesito un médico' means 'I need a doctor'. 'Necesito ayuda' means 'I need help'.", "te": "నాకు డాక్టర్ అవసరం అంటే Necesito un médico అనాలి.", "hi": "मुझे डॉक्टर की ज़रूरत है कहने के लिए Necesito un médico कहें।"},
                "ruleSummary": {"en": "Necesito + [Noun] = I need [Noun].", "te": "నాకు [వస్తువు/సహాయం] కావాలి.", "hi": "मुझे [वस्तु/सहायता] चाहिए।"},
                "examples": [{"target": "Necesito un médico urgente", "transliteration": "Necesito un medico urgente", "native": {"en": "I need a doctor urgently.", "te": "నాకు అత్యవసరంగా డాక్టర్ కావాలి.", "hi": "मुझे तुरंत डॉक्टर की ज़रूरत है।"}}],
                "commonMistakes": [{"incorrect": "Yo querer doctor", "correct": "Necesito un médico", "explanation": {"en": "Use 'Necesito' for urgency.", "te": "అత్యవసరంలో Necesito అనాలి.", "hi": "हमेशा Necesito का प्रयोग करें।"}}]
            },
            "vocab": [
                {"word": "¡Ayuda!", "translit": "Ayuda!", "pron": "ఆ-యూ-దా!", "pos": "phrase", "meanings": {"en": "Help!", "te": "సహాయం చేయండి!", "hi": "मदद कीजिए!"}, "exTarget": "¡Por favor, ayuda!", "exTranslit": "Por favor, ayuda!", "exNative": {"en": "Please, help!", "te": "దయచేసి సహాయం చేయండి!", "hi": "कृपया मदद कीजिए!"}},
                {"word": "Hospital", "translit": "Hospital", "pron": "ఓస్-పీ-తాల్", "pos": "noun", "meanings": {"en": "Hospital", "te": "ఆసుపత్రి", "hi": "अस्पताल"}, "exTarget": "¿Dónde está el hospital más cercano?", "exTranslit": "Donde esta el hospital mas cercano?", "exNative": {"en": "Where is the nearest hospital?", "te": "దగ్గరలోని ఆసుపత్రి ఎక్కడ ఉంది?", "hi": "सबसे पास का अस्पताल कहाँ है?"}},
                {"word": "Farmacia", "translit": "Farmasia", "pron": "ఫార్-మా-సి-యా", "pos": "noun", "meanings": {"en": "Pharmacy / chemist", "te": "మందుల షాప్", "hi": "दवा की दुकान"}, "exTarget": "Hay una farmacia aquí cerca.", "exTranslit": "Hay una farmacia aqui cerca.", "exNative": {"en": "There is a pharmacy near here.", "te": "ఇక్కడే దగ్గరలో మందుల షాప్ ఉంది.", "hi": "यहाँ पास में एक दवा की दुकान है।"}},
                {"word": "Policía", "translit": "Polisia", "pron": "పో-లి-సీ-యా", "pos": "noun", "meanings": {"en": "Police", "te": "పోలీసులు", "hi": "पुलिस"}, "exTarget": "Llame a la policía.", "exTranslit": "Llame a la policia.", "exNative": {"en": "Call the police.", "te": "పోలీసులను పిలవండి.", "hi": "पुलिस को बुलाइए।"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you shout 'Help!' in Spanish?", "te": "అత్యవసరంలో 'సహాయం చేయండి!' అని ఎలా అంటారు?", "hi": "आपात स्थिति में 'मदद!' कैसे पुकारेंगे?"}, "prompt": {"en": "Help!", "te": "సహాయం చేయండి!", "hi": "मदद कीजिए!"}, "correct": "¡Ayuda!", "options": ["¡Ayuda!", "Hola", "Gracias", "¿Cuánto cuesta?"], "expl": {"en": "¡Ayuda! is the urgent Spanish call for help.", "te": "సహాయం కోసం వాడే అత్యవసర మాట.", "hi": "मदद के लिए मुख्य पुकार।"}}
            ]
        },
        {
            "title": {"en": "Lost Items & Speaking Slowly", "te": "పోగొట్టుకున్న వస్తువులు & మెల్లగా మాట్లాడమనడం", "hi": "खोया सामान और धीरे बोलना"},
            "objective": {"en": "Report a lost wallet/passport and ask 'Hable más despacio, por favor'.", "te": "పర్స్ పోయిందని చెప్పడం మరియు దయచేసి మెల్లగా మాట్లాడమనడం.", "hi": "खोया पर्स बताना और धीरे बोलने का अनुरोध करना।"},
            "culturalTip": {"en": "Locals speak rapidly in Spain; politely saying 'Más despacio, por favor' immediately gets friendly patience.", "te": "స్పెయిన్ లో ప్రజలు వేగంగా మాట్లాడతారు; 'Más despacio, por favor' అంటే నెమ్మదిగా చెబుతారు.", "hi": "स्पेन में लोग तेज़ बोलते हैं; 'Más despacio, por favor' कहने पर वे धीरे बोलेंगे।"},
            "grammar": {
                "title": {"en": "Asking to Slow Down (Hable más despacio)", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి", "hi": "कृपया धीरे बोलिए"},
                "explanation": {"en": "Say 'Más despacio, por favor' (More slowly, please) or 'No entiendo' (I don't understand).", "te": "నెమ్మదిగా చెప్పమనడానికి Más despacio, por favor అనాలి.", "hi": "धीरे बोलने के लिए Más despacio, por favor कहें।"},
                "ruleSummary": {"en": "Más despacio, por favor = Slower, please.", "te": "నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"},
                "examples": [{"target": "No entiendo, hable más despacio por favor", "transliteration": "No entiendo, hable mas despacio por favor", "native": {"en": "I don't understand, please speak slower.", "te": "నాకు అర్థం కాలేదు, కాస్త నెమ్మదిగా మాట్లాడండి.", "hi": "मुझे समझ नहीं आया, कृपया धीरे बोलिए।"}}],
                "commonMistakes": [{"incorrect": "Tú lento", "correct": "Más despacio, por favor", "explanation": {"en": "Always use polite 'Más despacio, por favor'.", "te": "మర్యాదగా చెప్పాలి.", "hi": "हमेशा विनम्रता से बोलें।"}}]
            },
            "vocab": [
                {"word": "Cartera", "translit": "Kartera", "pron": "కార్-తే-రా", "pos": "noun", "meanings": {"en": "Wallet / purse", "te": "పర్స్ / పర్సు", "hi": "बटुआ / पर्स"}, "exTarget": "He perdido mi cartera.", "exTranslit": "He perdido mi cartera.", "exNative": {"en": "I have lost my wallet.", "te": "నా పర్స్ పోయింది.", "hi": "मेरा बटुआ खो गया है।"}},
                {"word": "Móvil", "translit": "Movil", "pron": "మో-విల్", "pos": "noun", "meanings": {"en": "Mobile phone", "te": "మొబైల్ ఫోన్", "hi": "मोबाइल फोन"}, "exTarget": "Olvidé mi móvil.", "exTranslit": "Olvide mi movil.", "exNative": {"en": "I forgot my phone.", "te": "నా ఫోన్ మరిచిపోయాను.", "hi": "मैं अपना फोन भूल गया।"}},
                {"word": "Despacio", "translit": "Despasio", "pron": "దేస్-పా-సి-యో", "pos": "adverb", "meanings": {"en": "Slowly", "te": "నెమ్మదిగా", "hi": "धीरे-धीरे"}, "exTarget": "Hable más despacio, por favor.", "exTranslit": "Hable mas despacio, por favor.", "exNative": {"en": "Please speak more slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया थोड़ा धीरे बोलिए।"}},
                {"word": "Otra vez", "translit": "Otra ves", "pron": "ఓత్-రా వేస్", "pos": "phrase", "meanings": {"en": "Again / once more", "te": "మళ్లీ / మరొక్కసారి", "hi": "दोबारा / फिर से"}, "exTarget": "¿Puede repetir otra vez?", "exTranslit": "Puede repetir otra vez?", "exNative": {"en": "Can you repeat once more?", "te": "మరొక్కసారి చెప్పగలరా?", "hi": "क्या आप एक बार फिर दोहरा सकते हैं?"}}
            ],
            "exercises": [
                {"instruction": {"en": "How do you ask someone to speak more slowly in Spanish?", "te": "'దయచేసి నెమ్మదిగా మాట్లాడండి' అని ఎలా అంటారు?", "hi": "स्पैनिश में 'कृपया धीरे बोलिए' कैसे कहेंगे?"}, "prompt": {"en": "Please speak more slowly.", "te": "దయచేసి నెమ్మదిగా మాట్లాడండి.", "hi": "कृपया धीरे बोलिए।"}, "correct": "Hable más despacio, por favor", "options": ["Hable más despacio, por favor", "¡Ayuda!", "¿Dónde está?", "Muchas gracias"], "expl": {"en": "Hable más despacio, por favor is courteous and effective.", "te": "నెమ్మదిగా చెప్పమని కోరే మర్యాదపూర్వక మాట.", "hi": "धीरे बोलने का विनम्र अनुरोध।"}}
            ]
        }
    ]
]
