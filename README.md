# Lingua — Multilingual Language Learning Platform

An AI-powered, immersive language learning application featuring Klaus (an authoritative, disciplined AI language mentor), CEFR-aligned structured curricula, and algorithmic Leitner Spaced Repetition (SRS).

---

## Architecture & Project Structure

This repository is structured as a fullstack monorepo:

```
nlp lingua/
├── backend/                  # Node.js + Express API & AI Mentorship Server
│   ├── prisma/               # Database models & Prisma Client schema
│   │   ├── schema.prisma     # SQLite / PostgreSQL schema
│   │   └── dev.db            # Active SQLite database
│   ├── src/
│   │   ├── lib/              # NLP evaluator, Klaus tutor engine, gamification
│   │   ├── routes/           # Express API routers (auth, curriculum, practice, etc.)
│   │   └── server.ts         # Backend entry point (Port 5000)
│   ├── scripts/              # Database seeding & automated test suite
│   ├── tsconfig.json         # Backend TypeScript configuration
│   └── package.json          # Backend dependencies & scripts
│
├── frontend/                 # Next.js 15 App Router Frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router pages & routes
│   │   ├── components/       # SpotlightCard, AnimatedTabs, AudioPlayerButton, etc.
│   │   └── context/          # LanguageContext, AuthContext
│   ├── next.config.ts        # Next.js configuration & API reverse proxy
│   ├── tailwind.config.ts    # Tailwind styling tokens & theme
│   ├── tsconfig.json         # Frontend TypeScript configuration
│   └── package.json          # Frontend dependencies & scripts
│
├── .env.example              # Sample environment configuration
├── package.json              # Monorepo orchestration scripts
└── tsconfig.json             # Root-level TypeScript workspace resolution
```

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 2. Configure Environment
Copy `.env.example` to `backend/.env`:
```bash
cp .env.example backend/.env
```

### 3. Seed Database (18 Language Pairs, 90 Modules, 1,350 Exercises)
```bash
npm run db:seed
```

### 4. Run Development Servers
```bash
npm run dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## Verification & Testing

- **Run Automated Test Suite (75/75 Tests)**:
  ```bash
  npm test
  ```
- **Typecheck Full Monorepo (Backend + Frontend)**:
  ```bash
  npm run typecheck
  ```
- **Production Build**:
  ```bash
  npm run build
  ```
