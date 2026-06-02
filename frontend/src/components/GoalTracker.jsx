import { Target } from 'lucide-react';

export default function GoalTracker({ latest }) {
  const target = 4;
  const current = Number(latest?.predicted_fat_loss || 0);
  const percent = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="panel">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Goal Tracker</h2>
        <Target className="h-5 w-5 text-berry" />
      </div>
      <p className="text-sm text-slate-500">Monthly fat loss goal: {target} kg</p>
      <div className="mt-4 h-3 rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-3 rounded-full bg-mint" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-sm font-semibold">{percent}% estimated achievement from latest prediction</p>
    </div>
  );
}

