import { ArrowRight, BarChart3, Brain, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="grid items-center gap-8 py-8 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <h1 className="text-4xl font-black tracking-normal sm:text-5xl">FitPredict AI</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">A full-stack machine learning dashboard for predicting fat loss, tracking progress, and explaining health patterns with clean analytics.</p>
          <Link to="/dashboard" className="btn-primary mt-6"><ArrowRight size={18} /> Start Prediction</Link>
        </div>
        <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          {[
            ['Random Forest ML', 'Compares regression models and serves the best model through Flask.', Brain],
            ['Health Analytics', 'Trends, correlations, BMI, confidence score, and goal progress.', BarChart3],
            ['Secure Basics', 'bcrypt password hashing, Sequelize validation, and protected pages.', ShieldCheck]
          ].map(([title, text, Icon]) => (
            <div className="flex gap-3 rounded-md bg-slate-50 p-4 dark:bg-slate-800" key={title}>
              <Icon className="h-6 w-6 shrink-0 text-mint" />
              <div><h3 className="font-bold">{title}</h3><p className="text-sm text-slate-500 dark:text-slate-300">{text}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {['Enter lifestyle metrics', 'Backend stores prediction history', 'ML service returns personalized estimates'].map((item, i) => (
          <div className="panel" key={item}><p className="text-sm font-bold text-coral">Step {i + 1}</p><p className="mt-2 font-semibold">{item}</p></div>
        ))}
      </section>
    </div>
  );
}

