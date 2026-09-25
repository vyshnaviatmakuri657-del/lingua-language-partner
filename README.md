# 🌐 LINGUA — Production-Ready AI Language Learning Platform

> **AI-Powered Language Acquisition Engine with Strict Native-Language Instruction Architecture & Klaus AI Tutor**

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2d3748?logo=prisma)](https://www.prisma.io/)
[![Google Gemini API](https://img.shields.io/badge/Gemini_API-gemini--2.5--flash-8e75ff?logo=google)](https://ai.google.dev/)
[![Tests](https://img.shields.io/badge/Tests-58%2F58%20Passing-emerald)](#automated-test-suite)

---

## 📖 Table of Contents
1. [Core Product Architecture](#1-core-product-architecture)
2. [Strict Native-Instructional Architecture](#2-strict-native-instructional-architecture)
3. [Klaus — The AI Language Tutor](#3-klaus--the-ai-language-tutor)
4. [Pedagogical Curriculum Matrix](#4-pedagogical-curriculum-matrix)
5. [NLP Evaluation & Typo Tolerance Engine](#5-nlp-evaluation--typo-tolerance-engine)
6. [Gamification & Leitner Spaced Repetition (SRS)](#6-gamification--leitner-spaced-repetition-srs)
7. [Database Architecture (26 Entities)](#7-database-architecture-26-entities)
8. [Directory Structure](#8-directory-structure)
9. [Local Development & Setup](#9-local-development--setup)
10. [Automated Test Suite](#10-automated-test-suite)
11. [Production Deployment](#11-production-deployment)

---

## 1. Core Product Architecture

**LINGUA** is a full-stack, enterprise-grade language learning application built to solve the universal problem in computerized language education: **Instructional Disconnect**.

Most conventional platforms force learners to navigate menus, parse complex grammatical terminology, and receive diagnostic feedback in English—even when English is not their mother tongue. 

**Lingua enforces an absolute mathematical boundary:**
$$\text{Instruction Language} \equiv \text{Native Language}$$
$$\text{Learning Language} \equiv \text{Target Language}$$
$$\text{Constraint: } \text{Native Language} \neq \text{Target Language}$$

Learners acquire the target language through structured immersion, while every cognitive anchor—grammar rules, mistake explanations, Klaus hints, navigation, and feedback—is grounded firmly in their native language.

---

## 2. Strict Native-Instructional Architecture

### Supported Language Spectrum
* **Native / Instruction Languages:**
  * 🇮🇳 **Telugu** (`te`) — తెలుగు
  * 🇮🇳 **Hindi** (`hi`) — हिन्दी
  * 🇬🇧/🇺🇸 **English** (`en`) — English
* **Target / Learning Languages:**
  * 🇰🇷 **Korean** (`ko`) — 한국어
  * 🇫🇷 **French** (`fr`) — Français
  * 🇪🇸 **Spanish** (`es`) — Español
  * 🇮🇳 **Telugu** (`te`)
  * 🇮🇳 **Hindi** (`hi`)
  * 🇮🇳 **Tamil** (`ta`) — தமிழ்
  * 🇬🇧/🇺🇸 **English** (`en`)

### The Native ≠ Target Invariant
The platform strictly forbids identical language pairs (`te-te`, `hi-hi`, `en-en`). This rule is enforced at three levels:
1. **Client-Side UI**: Target selection actively disables or excludes the chosen native language.
2. **Backend API Middleware**: All onboarding, lesson, and preference endpoints validate that `nativeLanguageCode !== targetLanguageCode`.
3. **Database Constraints**: `LanguagePair` records maintain unique compound indexes and check conditions preventing reflexive pairs.

### Immediate Instructional Switching
As soon as a user selects their native language during onboarding or in settings, **the UI instructions switch immediately**. There is no developer-centric English fallback:
* **Telugu Native**: Buttons say `కొనసాగించండి` (Continue), exercise prompts read `సరైన సమాధానాన్ని ఎంచుకోండి` (Choose correct answer).
* **Hindi Native**: Buttons say `जारी रखें` (Continue), exercise prompts read `सही उत्तर चुनें` (Choose correct answer).
* **English Native**: Buttons say `Continue`, exercise prompts read `Choose the correct answer`.

---

## 3. Klaus — The AI Language Tutor

**Klaus** is Lingua's built-in intelligent language tutor. He is not a generic chatbot; he possesses full pedagogical awareness of the learner's current exercise, module, vocabulary list, and error history.

```
       [ Learner Interaction ]
                 │
                 ▼
  ┌─────────────────────────────┐
  │   Klaus Context Engine      │
  │  - Native: Telugu           │
  │  - Target: Korean           │
  │  - Exercise: Question & Ans │
  │  - Learner Attempt: "안녕"  │
  └──────────────┬──────────────┘
                 ▼
  ┌─────────────────────────────┐
  │  Progressive Hint Generator │
  │  Tier 1: Conceptual Clue    │
  │  Tier 2: Structural Clue    │
  │  Tier 3: Answer + Native Ex │
  └──────────────┬──────────────┘
                 ▼
      [ Native Feedback in Telugu ]
```

### Klaus Capabilities
1. **Progressive 3-Tier Hint Engine**:
   * **Tier 1 (Nudge)**: Conceptual clue without revealing answers.
   * **Tier 2 (Structure)**: Reveals grammatical structure or first letters.
   * **Tier 3 (Reveal)**: Displays target answer accompanied by an in-depth grammatical explanation in the learner's native tongue.
2. **Mistake Explainer**: When a learner answers incorrectly, Klaus breaks down *why* it was incorrect, contrasting target language grammar with the learner's native tongue syntax.
3. **Pedagogical Translation Workbench**: At `/translator`, learners can input any sentence to receive:
   * Target translation
   * Native phonetic transliteration
   * Word-by-word morphological breakdown
   * Grammar & cultural usage notes
4. **Real-Life Roleplay**: At `/roleplay`, learners converse in simulated real-world scenarios (Ordering at a Seoul Café, Checking into a Parisian Hotel, Asking directions in Madrid) with real-time corrections.

---

## 4. Pedagogical Curriculum Matrix

Lingua comes pre-seeded with rich, full-length pedagogical curricula across 3 primary test configurations:

### 1. Telugu ➔ Korean (`te-ko`)
* **Module 1: ప్రాథమిక పరిచయాలు (Basic Greetings)**
  * **Lesson 1: శుభాకాంక్షలు (Greetings)**: `안녕하세요` (నమస్కారం), `감사합니다` (ధన్యవాదాలు), `네` (అవును).
  * **Lesson 2: మర్యాదపూర్వక సంభాషణ (Polite Expressions)**: `죄송합니다` (క్షమించండి), `안녕히 가세요` (వెళ్ళి రండి).
* **Module 2: పరిచయాలు & రోజువారీ పదాలు (Introductions & Daily Words)**
  * Introductions, names, particles `은/는` and `이에요/예요` explained with Telugu postposition analogies.

### 2. Hindi ➔ French (`hi-fr`)
* **Module 1: बुनियादी अभिवादन (Basic Greetings)**
  * **Lesson 1: शिष्टाचार (Polite Greetings)**: `Bonjour` (नमस्ते), `Merci` (धन्यवाद), `S'il vous plaît` (कृपया).
  * **Lesson 2: परिचय (Introductions)**: `Je m'appelle` (मेरा नाम है...), `Comment vous appelez-vous ?`.
* **Module 2: आवश्यक दैनिक शब्द (Essential Words)**
  * Gendered articles (`le`, `la`, `un`, `une`) mapped directly to Hindi masculine/feminine grammatical gender concepts.

### 3. English ➔ Spanish (`en-es`)
* **Module 1: Essential Greetings & Courtesy**
  * **Lesson 1: Greetings**: `Hola`, `Buenos días`, `Por favor`, `Gracias`.
  * **Lesson 2: Introductions**: `¿Cómo te llamas?`, `Me llamo...`, `Mucho gusto`.
* **Module 2: Daily Life & Navigation**
  * `Ser` vs `Estar` verb differences explained with context and memory hooks.

---

## 5. NLP Evaluation & Typo Tolerance Engine

Lingua's NLP evaluation pipeline combines algorithmic speed and deterministic resilience with LLM semantic intelligence:

```
[User Input] ──► [Normalization: Case, Whitespace, Punctuation]
                         │
                         ├─► [Exact Match?] ──► Confidence: 1.0 (Correct)
                         │
                         ├─► [Levenshtein Distance <= 2?] ──► Typo Accepted (Correct + Warning)
                         │
                         ├─► [Gemini 2.5 Flash Evaluation]
                         │         │
                         │         ├─► Semantic Equivalence (Confidence >= 0.85)
                         │         └─► Feedback generated in Native Language
                         │
                         └─► [Algorithmic Fallback] (Resilient offline evaluation)
```

* **Typo Tolerance**: 1–2 character deviations or minor transliteration slips are recognized and accepted with polite native notices (`"దాదాపు సరైనది! చిన్న అక్షరదోషం ఉంది."` / `"लगभग सही! एक छोटी वर्तनी त्रुटि है।"`) rather than penalizing the learner.
* **Instructional Feedback Isolation**: Feedback is always emitted in the learner's native tongue.

---

## 6. Gamification & Leitner Spaced Repetition (SRS)

### Spaced Repetition Leitner System
Vocabulary is scheduled for retention testing across 5 Leitner boxes:
* **Box 1**: Review in 1 day
* **Box 2**: Review in 3 days
* **Box 3**: Review in 7 days
* **Box 4**: Review in 14 days
* **Box 5**: Review in 30 days (Mastered)

*Success promotes the card to the next box; failure immediately demotes it to Box 1.*

### XP & Level Formulas
* **Lesson XP**: $\text{XP} = 20 + \text{round}(\text{Accuracy} \times 15) + \min(\text{Streak} \times 2, 10)$
* **Level Formula**: $\text{Level} = \lfloor\sqrt{\text{Total XP} / 100}\rfloor + 1$
* **Streak System**: Calendar-aware streak increments with streak-freeze protection.

---

## 7. Database Architecture (26 Entities)

The database is built on Prisma ORM with support for both PostgreSQL (Production) and SQLite (Local development zero-friction setup):

```mermaid
erDiagram
    User ||--o{ UserProfile : has
    User ||--o{ UserLanguagePreference : configures
    User ||--o{ UserProgress : tracks
    User ||--o{ Streak : maintains
    User ||--o{ LearningPath : pursues
    User ||--o{ ExerciseAttempt : submits
    User ||--o{ VocabularyProgress : studies
    User ||--o{ Conversation : engages
    User ||--o{ TranslationRequest : requests
    User ||--o{ UserAchievement : earns
    User ||--o{ DailyActivity : logs
    User ||--o{ PlacementAttempt : takes
    User ||--o{ AIInteraction : logs

    Language ||--o{ LanguagePair : native
    Language ||--o{ LanguagePair : target
    LanguagePair ||--o{ Module : contains
    Module ||--o{ Lesson : contains
    Lesson ||--o{ LessonContent : delivers
    Lesson ||--o{ Vocabulary : teaches
    Lesson ||--o{ GrammarTopic : explains
    Lesson ||--o{ Exercise : tests
    Exercise ||--o{ ExerciseAttempt : evaluated
    Vocabulary ||--o{ VocabularyProgress : srs
    PlacementTest ||--o{ PlacementQuestion : contains
    PlacementTest ||--o{ PlacementAttempt : records
    Achievement ||--o{ UserAchievement : grants
```

### Full List of Models:
1. `User` — Authentication and identity
2. `UserProfile` — Preferences, daily goals, theme
3. `Language` — Master language registry (`code`, `name`, `nativeName`, `flag`)
4. `UserLanguagePreference` — User native & target configurations
5. `LearningPath` — User enrolled curriculum tracks
6. `LanguagePair` — Distinct native ➔ target pairings
7. `Module` — Thematic modules within a language pair
8. `Lesson` — Structured sequential lessons
9. `LessonContent` — Rich reading & instruction content
10. `Vocabulary` — Target words with native meanings and audio
11. `GrammarTopic` — Grammatical rules explained in native tongue
12. `Exercise` — Interactive exercises (multiple choice, translation, listening, sentence scramble)
13. `ExerciseAttempt` — Historical user submissions and scores
14. `UserProgress` — Total XP, current level, accuracy aggregates
15. `VocabularyProgress` — Leitner box and SRS scheduling per word
16. `Conversation` — AI roleplay conversation sessions
17. `ConversationMessage` — Turn-by-turn roleplay dialogue
18. `TranslationRequest` — Translation history and morphological analysis
19. `Achievement` — Global badges and milestones
20. `UserAchievement` — Earned user achievements
21. `DailyActivity` — Time-stamped daily XP and practice minute logs
22. `Streak` — Current streak, longest streak, freeze counts
23. `PlacementTest` — Diagnostic tests per language pair
24. `PlacementQuestion` — Diagnostic assessment items
25. `PlacementAttempt` — Learner diagnostic scores and recommended levels
26. `AIInteraction` — Klaus query logs, hints, and token usage

---

## 8. Directory Structure

```
nlp lingua/
├── prisma/
│   ├── schema.prisma            # 26 relational models & indexes
│   └── dev.db                   # Local SQLite database
├── scripts/
│   ├── db-sync.mjs              # Dual PostgreSQL / SQLite schema adapter
│   ├── seed.mjs                 # Full pedagogical seed data for 3 language pairs
│   └── run-tests.mjs            # 58-assertion automated test suite
├── src/
│   ├── app/
│   │   ├── api/                 # 22 RESTful API route handlers
│   │   │   ├── auth/            # Register, Login, Logout
│   │   │   ├── user/            # Profile, Preferences
│   │   │   ├── languages/       # Language registry
│   │   │   ├── onboarding/      # 5-step wizard submission
│   │   │   ├── learning-path/   # Path & module hierarchy
│   │   │   ├── lessons/         # Lesson details & completion
│   │   │   ├── practice/        # Dynamic practice sessions & answer evaluation
│   │   │   ├── review/          # Leitner Spaced Repetition flashcards
│   │   │   ├── placement/       # Diagnostic tests & scoring
│   │   │   ├── progress/        # User analytics & charts
│   │   │   ├── achievements/    # Badges & unlock logic
│   │   │   ├── klaus/           # Chat, Hints, Explanations, Translations, History
│   │   │   └── conversation/    # Multi-turn roleplay dialogue
│   │   ├── dashboard/           # Main user dashboard
│   │   ├── learning-path/       # Visual progression trail
│   │   ├── lessons/[id]/        # Interactive lesson runner
│   │   ├── onboarding/          # First-run onboarding wizard
│   │   ├── placement/           # Level diagnostic test runner
│   │   ├── practice/            # Skill reinforcement arena
│   │   ├── review/              # Spaced repetition flashcards
│   │   ├── roleplay/            # Interactive AI conversation practice
│   │   ├── translator/          # Klaus pedagogical translation tool
│   │   ├── vocabulary/          # Vocabulary notebook & audio
│   │   ├── grammar/             # Grammar encyclopedia
│   │   ├── progress/            # Analytics, XP trends, accuracy
│   │   ├── achievements/        # Badges and rewards showcase
│   │   ├── profile/             # Learner bio & statistics
│   │   ├── settings/            # Native/target switcher & preferences
│   │   ├── login/ & signup/     # Authentication screens
│   │   ├── forgot-password/     # Password recovery flows
│   │   ├── not-found.tsx        # Localized 404 error page
│   │   ├── error.tsx            # Localized application error boundary
│   │   └── page.tsx             # Marketing landing page
│   ├── components/              # UI components
│   │   ├── KlausAvatar.tsx      # Multi-expression SVG avatar for Klaus
│   │   ├── KlausChatModal.tsx   # Context-aware floating AI drawer
│   │   ├── AudioPlayerButton.tsx# Web Speech API multi-lingual TTS
│   │   ├── ConfettiEffect.tsx   # Milestone celebration effects
│   │   ├── Sidebar.tsx          # Desktop navigation
│   │   ├── Header.tsx           # Global header with XP/streak pill
│   │   ├── MobileNav.tsx        # Mobile bottom navigation
│   │   └── AppLayout.tsx        # Unified layout shell
│   ├── context/
│   │   ├── AuthContext.tsx      # User authentication provider
│   │   └── LanguageContext.tsx  # Centralized native & target language state
│   └── lib/
│       ├── prisma.ts            # Prisma client singleton
│       ├── auth.ts              # Password hashing & JWT verification
│       ├── i18n/                # Native dictionaries (en, te, hi) & helpers
│       ├── nlp/evaluator.ts     # NLP answer evaluation engine
│       ├── ai/                  # Klaus engine & Gemini API integration
│       └── gamification/        # XP, Level, Streak & SRS algorithms
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 9. Local Development & Setup

### Prerequisites
* **Node.js** >= 18.18.0 (Node 20+ recommended)
* **npm** >= 9.0.0

### Step 1: Clone & Install Dependencies
```bash
git clone https://github.com/your-username/lingua.git
cd lingua
npm install
```

### Step 2: Environment Variables
Create a `.env` file in the root directory:
```env
# Database (SQLite for local zero-config, or PostgreSQL URL)
DATABASE_URL="file:./dev.db"

# JWT Authentication Secret
JWT_SECRET="lingua_super_secret_jwt_key_2026_production"

# Google Gemini API Key (Optional: NLP evaluator operates with deterministic algorithmic fallbacks if not provided)
GEMINI_API_KEY="your-gemini-api-key-here"

# Application Base URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Initialize Database & Seed Content
```bash
# Push schema to database
npm run db:push

# Seed curriculum data (Telugu->Korean, Hindi->French, English->Spanish + Demo User)
npm run db:seed
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Account Credentials
* **Email:** `demo@lingua.app`
* **Password:** `LinguaDemo2026!`
* **Pre-configured configuration:** **Telugu (తెలుగు)** Native ➔ **Korean (한국어)** Target

---

## 10. Automated Test Suite

Lingua includes an exhaustive automated test suite validating all constraints, algorithms, and database relationships:

```bash
npm test
```

### Test Output:
```
========================================
   LINGUA AUTOMATED TEST SUITE        
========================================

--- SUITE 1: Native != Target Language Rules ---
✔ PASS: Reject Native=Telugu -> Target=Telugu (Strict native!=target constraint)
✔ PASS: Reject Native=English -> Target=English (Strict native!=target constraint)
✔ PASS: Reject Native=Hindi -> Target=Hindi (Strict native!=target constraint)
✔ PASS: Accept Native=Telugu -> Target=Korean (Critical User Story 1)
✔ PASS: Accept Native=Hindi -> Target=French (Critical User Story 2)
✔ PASS: Accept Native=English -> Target=Spanish (Critical User Story 3)
✔ PASS: Accept Native=Telugu -> Target=Hindi (Indic pair)
✔ PASS: Accept Native=Hindi -> Target=Tamil (Indic cross-family pair)
✔ PASS: Reject French as Native (Only Telugu, Hindi, English supported as native)
✔ PASS: Reject invalid native code 
✔ PASS: Reject invalid target code 

--- SUITE 2: Gamification & Leitner SRS Engine ---
✔ PASS: Level calculation at 0 XP = Level 1 
✔ PASS: Level calculation at 99 XP = Level 1 
✔ PASS: Level calculation at 100 XP = Level 2 
✔ PASS: Level calculation at 400 XP = Level 3 
✔ PASS: Level calculation at 900 XP = Level 4 
✔ PASS: Level calculation at 2500 XP = Level 6 
✔ PASS: SRS Success: Box 1 -> Box 2 (3 days interval) 
✔ PASS: SRS Success: Box 2 -> Box 3 (7 days interval) 
✔ PASS: SRS Success: Box 4 -> Box 5 (30 days interval) 
✔ PASS: SRS Success: Box 5 stays at Box 5 (30 days max) 
✔ PASS: SRS Failure: Box 4 drops to Box 1 (1 day interval) 
✔ PASS: SRS Failure: Box 5 drops to Box 1 (1 day interval) 
✔ PASS: Perfect lesson XP with 0 streak = 35 XP 
✔ PASS: Perfect lesson XP with 5 streak = 45 XP 
✔ PASS: 50% accuracy lesson XP = 28 XP 

--- SUITE 3: NLP Evaluator & Typo Tolerance ---
✔ PASS: NLP: Korean exact match with punctuation 
✔ PASS: NLP: French exact match case-insensitive 
✔ PASS: NLP: French 1-char typo accepted (लगभग सही! एक छोटी वर्तनी त्रुटि है।)
✔ PASS: NLP: Typo feedback is in Native Hindi for Hindi user 
✔ PASS: NLP: Spanish phonetic typo accepted (దాదాపు సరైనది! చిన్న అక్షరదోషం ఉంది.)
✔ PASS: NLP: Typo feedback is in Native Telugu for Telugu user 
✔ PASS: NLP: Completely wrong answer rejected 

--- SUITE 4: Klaus 3-Tier Progressive Hint System ---
✔ PASS: Klaus Hint Tier 1: Gives conceptual clue, NEVER reveals answer 
✔ PASS: Klaus Hint Tier 1: Instruction is strictly in Native Telugu 
✔ PASS: Klaus Hint Tier 2: Gives structural clue, does NOT reveal full answer 
✔ PASS: Klaus Hint Tier 3: Reveals answer with native grammatical explanation 

--- SUITE 5: Database Seed & Schema Validation ---
✔ PASS: Database: Seeded 7 languages (>= 7 expected) 
✔ PASS: Database: Contains Telugu language 
✔ PASS: Database: Contains Hindi language 
✔ PASS: Database: Contains English language 
✔ PASS: Database: Contains Korean language 
✔ PASS: Database: Contains French language 
✔ PASS: Database: Contains Spanish language 
✔ PASS: Database: Contains Tamil language 
✔ PASS: Database: Seeded 3 language pairs 
✔ PASS: Database: Contains Telugu -> Korean language pair (Critical Test 1) 
✔ PASS: Database: Contains Hindi -> French language pair (Critical Test 2) 
✔ PASS: Database: Contains English -> Spanish language pair (Critical Test 3) 
✔ PASS: Database: Telugu -> Korean has 2 modules 
✔ PASS: Database: Telugu -> Korean has 2 lessons 
✔ PASS: Database: Telugu -> Korean has 4 interactive exercises 
✔ PASS: Exercise has valid prompt 
✔ PASS: Database: Seed Demo user 'demo@lingua.app' exists 
✔ PASS: Demo user native language is Telugu 
✔ PASS: Demo user target language is Korean 
✔ PASS: Demo user has initial XP 
✔ PASS: Database: Seeded 6 global achievements 

========================================
ALL TESTS COMPLETED!
Passed: 58 | Failed: 0
========================================
```

---

## 11. Production Deployment

### Option A: Vercel Deployment (Recommended)
1. Push this repository to GitHub/GitLab.
2. Link the repository on [Vercel](https://vercel.com).
3. Connect a PostgreSQL database from **Neon**, **Supabase**, or **Vercel Postgres**.
4. Set the environment variables in Vercel:
   * `DATABASE_URL`: `postgresql://user:password@host:5432/lingua?sslmode=require`
   * `JWT_SECRET`: A secure 64-character random string
   * `GEMINI_API_KEY`: Your Google AI Studio Gemini API key
5. Run the DB migration script:
   ```bash
   node scripts/db-sync.mjs
   npx prisma migrate deploy
   node scripts/seed.mjs
   ```

### Option B: Docker Container Deployment
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 📄 License
MIT License. Built for modern, inclusive, native-instructional language acquisition.
