'use client';
import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  {
    q: 'Which normal form removes partial dependencies on a composite key?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correct: 1,
    why: [
      '1NF only requires atomic values. It does not deal with partial dependencies.',
      'Correct. 2NF removes attributes that depend on only part of a composite key.',
      'Mixed up with 2NF: 3NF removes transitive dependencies, not partial ones.',
      'BCNF is stricter than 3NF, but partial dependencies are already handled in 2NF.',
    ],
  },
  {
    q: 'What does an INNER JOIN return?',
    options: ['All rows from the left table', 'Only rows with matches in both tables', 'All rows from both tables', 'The cross product'],
    correct: 1,
    why: [
      'That describes a LEFT JOIN, which keeps unmatched left rows.',
      'Correct. INNER JOIN keeps only rows that match on the join condition.',
      'That describes a FULL OUTER JOIN.',
      'A cross product has no join condition. It pairs every row with every row.',
    ],
  },
  {
    q: 'Why add an index to a column?',
    options: ['To save disk space', 'To speed up lookups on that column', 'To enforce foreign keys', 'To normalize the table'],
    correct: 1,
    why: [
      'Indexes use extra space, they do not save it.',
      'Correct. An index lets the database find rows without scanning the whole table.',
      'Foreign keys are constraints. An index is a separate structure.',
      'Normalization is about schema design, not performance structures.',
    ],
  },
];

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

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUESTIONS.filter((q, i) => answers[i] === q.correct).length;

  return (
    <main className="min-h-screen p-10 text-slate-900" style={graphPaper}>
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-bold text-sky-600 underline">← Teacher dashboard</Link>
        <h1 className="mb-1 mt-4 text-4xl font-extrabold">
          <span className="text-pink-500">Class</span><span className="text-sky-500">Pulse</span> Quiz 1
        </h1>
        <p className="mb-6 font-medium text-slate-600">Student view · Databases · mock questions</p>

        {QUESTIONS.map((item, qi) => (
          <div key={qi} className="mb-5 rounded-2xl border-2 border-violet-300 bg-white/80 p-6 shadow-[4px_4px_0_rgba(0,0,0,0.12)]">
            <p className="mb-3 text-lg font-bold">{qi + 1}. {item.q}</p>
            <div className="flex flex-col gap-2">
              {item.options.map((opt, oi) => {
                const chosen = answers[qi] === oi;
                const isRight = oi === item.correct;
                let style = chosen ? 'border-violet-500 bg-violet-100' : 'border-slate-300 bg-white';
                if (submitted && isRight) style = 'border-emerald-500 bg-emerald-100';
                if (submitted && chosen && !isRight) style = 'border-rose-500 bg-rose-100';
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers({ ...answers, [qi]: oi })}
                    className={`rounded-xl border-2 px-4 py-2 text-left font-medium ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && answers[qi] !== undefined && (
              <p className="mt-3 rounded-lg bg-white p-3 text-slate-700">
                ✨ <b>AI feedback:</b> {item.why[answers[qi]]}
              </p>
            )}
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="rounded-full border-2 border-violet-600 bg-violet-500 px-8 py-3 text-lg font-bold text-white shadow-[3px_3px_0_rgba(0,0,0,0.2)]"
          >
            Submit quiz
          </button>
        ) : (
          <p className="text-3xl font-extrabold text-emerald-600">Score: {score} / {QUESTIONS.length}</p>
        )}
      </div>
    </main>
  );
}