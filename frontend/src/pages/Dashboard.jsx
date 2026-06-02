import { useEffect, useState } from 'react';
import PredictionForm from '../components/PredictionForm.jsx';
import PredictionCard from '../components/PredictionCard.jsx';
import GoalTracker from '../components/GoalTracker.jsx';
import AnalyticsCharts from '../components/AnalyticsCharts.jsx';
import { dashboardApi, historyApi } from '../services/api.js';

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total_predictions: 0, average_fat_loss: 0, average_weight_loss: 0 });
  const user = JSON.parse(localStorage.getItem('fitpredict_user') || '{}');

  const load = async () => {
    const [historyRes, statsRes] = await Promise.all([historyApi.list(user.id), dashboardApi.stats(user.id)]);
    setHistory(historyRes.data);
    setStats(statsRes.data);
  };

  useEffect(() => { load().catch(() => {}); }, []);

  const handleResult = (prediction) => {
    setResult(prediction);
    load().catch(() => {});
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Total Predictions" value={stats.total_predictions} />
        <Stat label="Average Fat Loss" value={`${stats.average_fat_loss} kg`} />
        <Stat label="Average Weight Loss" value={`${stats.average_weight_loss} kg`} />
      </div>
      <PredictionForm onResult={handleResult} />
      <PredictionCard result={result} />
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <GoalTracker latest={result || history[0]} />
        <div className="panel"><h2 className="mb-2 text-xl font-bold">BMI Calculator</h2><p className="text-sm text-slate-500">BMI is calculated automatically from height and weight with every prediction.</p></div>
      </div>
      <AnalyticsCharts history={history} />
    </div>
  );
}

function Stat({ label, value }) {
  return <div className="panel"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>;
}

