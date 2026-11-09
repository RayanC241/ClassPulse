# ClassPulse

**AI-powered lecture mastery and learning-gap analyzer** · CSE 327: Software Engineering, Fall 2026

Teachers usually find out what students missed only after the exam. ClassPulse turns lecture slides into quizzes, grades answers with explanations, and shows the teacher which topics the class has mastered and where the gaps are.

## Status

Early **frontend prototype with mock data**. The backend, database and AI pipeline are planned (see Roadmap).

## Planned features

1. **Concept graph extraction** from uploaded slides, including prerequisites
2. **Misconception-aware quiz generation** with an AI validation pass
3. **Rubric-based short-answer grading** with explanations and confidence scores
4. **Root-cause insights and adaptive follow-up quizzes** for teachers and students

## Current prototype

- Teacher dashboard: topic mastery bar chart, class average, weakest topic, AI insight card (sample)
- Student quiz page: multiple-choice questions with per-answer AI feedback (sample)

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, Recharts |
| Backend (planned) | FastAPI (Python), PyMuPDF, python-pptx |
| Database and Auth (planned) | PostgreSQL on Supabase, Supabase Auth |
| AI (planned) | Gemini API with structured JSON output, LangGraph |
| Testing and CI (planned) | Pytest, Playwright, GitHub Actions |
| Deployment (planned) | Vercel, Render |

## Run locally

Requires Node.js 18 or higher.

```bash
git clone https://github.com/YOUR_USERNAME/classpulse.git
cd classpulse
npm install
npm run dev
```

Open http://localhost:3000. The quiz page is at http://localhost:3000/quiz.

## Roadmap

| Week | Milestone |
|---|---|
| 1 | Setup, auth, database schema, wireframes |
| 2 | Slide upload, parsing, concept graph |
| 3 | Quiz generation and validation |
| 4 | Grading with explanations |
| 5 | Teacher dashboard with AI insights |
| 6 | Follow-up quizzes, testing, report, final demo |

## Team

- [Rayan CHowdhury]
- [Shihabur Rahman Shihab]