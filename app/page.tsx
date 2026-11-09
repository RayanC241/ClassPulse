'use client';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import Link from 'next/link';

const QUIZZES: Record<string, { topic: string; mastery: number }[]> = {
  'Quiz 1': [
    { topic: 'Normalization', mastery: 42 },
    { topic: 'Joins', mastery: 58 },
    { topic: 'Indexing', mastery: 71 },
    { topic: 'Transactions', mastery: 77 },
    { topic: 'Keys', mastery: 86 },
  ],
  'Quiz 2 (after re-teach)': [
    { topic: 'Normalization', mastery: 68 },
    { topic: 'Joins', mastery: 74 },
    { topic: 'Indexing', mastery: 73 },
    { topic: 'Transactions', mastery: 80 },
    { topic: 'Keys', mastery: 88 },
  ],
};

const color = (m: number) => (m < 50 ? '#FF4D6D' : m < 70 ? '#FFB703' : '#06D6A0');

const graphPaper: React.CSSProperties = {
  backgroundColor: '#FFFBEB',
  backgroundImage: [
    'linear-gradient(rgba(59,130,246,0.28) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(59,130,246,0.28) 1px, transparent 1px)',
    'linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)',
  ].join(','),
  backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
};

const card = 'rounded-2xl border-2 bg-white/80 p-5 shadow-[4px_4px_0_rgba(0,0,0,0.12)]';

export default function Dashboard() {
  const [quiz, setQuiz] = useState('Quiz 1');
  const data = QUIZZES[quiz];
  const avg = Math.round(data.reduce((s, d) => s + d.mastery, 0) / data.length);
  const weakest = [...data].sort((a, b) => a.mastery - b.mastery)[0];

  return (
    <main className="min-h-screen p-10 text-slate-900" style={graphPaper}>
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold">
          <span className="text-pink-500">Class</span>
          <span className="text-sky-500">Pulse</span> <span>📈</span>
        </h1>
        <p className="font-medium text-slate-600">CSE 327 · Teacher dashboard · mock data</p>
        <Link href="/quiz" className="mt-2 inline-block font-bold text-violet-600 underline">Open student quiz →</Link>
      </header>

      <div className="mb-6 flex gap-3">
        {Object.keys(QUIZZES).map((q) => (
          <button
            key={q}
            onClick={() => setQuiz(q)}
            className={`rounded-full border-2 px-5 py-2 font-bold transition ${
              quiz === q
                ? 'border-violet-600 bg-violet-500 text-white shadow-[3px_3px_0_rgba(0,0,0,0.2)]'
                : 'border-violet-300 bg-white/80 text-violet-700 hover:bg-violet-100'
            }`}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className={`${card} border-sky-400`}>
          <p className="text-slate-600">Class average</p>
          <p className="text-4xl font-extrabold text-sky-600">{avg}%</p>
        </div>
        <div className={`${card} border-pink-400`}>
          <p className="text-slate-600">Weakest topic</p>
          <p className="text-4xl font-extrabold text-pink-600">{weakest.topic}</p>
        </div>
        <div className={`${card} border-amber-400`}>
          <p className="text-slate-600">Submissions</p>
          <p className="text-4xl font-extrabold text-amber-600">42 / 45</p>
        </div>
      </div>

      <div className={`${card} mb-6 border-emerald-400 !p-6`}>
        <h2 className="mb-4 text-xl font-bold">Topic mastery</h2>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="topic" tick={{ fontWeight: 600 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="mastery" radius={[10, 10, 0, 0]}>
                {data.map((d) => (
                  <Cell key={d.topic} fill={color(d.mastery)} />
                ))}
                <LabelList dataKey="mastery" position="top" formatter={(v: unknown) => `${v}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${card} border-violet-400 !p-6`}>
        <h2 className="mb-1 text-xl font-bold">✨ AI insight (sample)</h2>
        <p className="text-slate-700">
          {weakest.mastery < 60
            ? `Only ${weakest.mastery}% mastery on ${weakest.topic}. Likely cause: confusion with a related concept. Suggest a 5-minute recap and a targeted follow-up quiz.`
            : `All topics are above 60%. Mastery improved after the re-teach; keep ${weakest.topic} in the next review.`}
        </p>
      </div>
    </main>
  );
}