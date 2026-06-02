import { Gauge, Scale, Target, TrendingDown } from 'lucide-react';

export default function PredictionCard({ result }) {
  if (!result) return null;
  const items = [
    ['BMI', result.bmi, Gauge],
    ['Fat Loss', `${result.predicted_fat_loss} kg`, TrendingDown],
    ['Weight Loss', `${result.predicted_weight_loss} kg`, Scale],
    ['Confidence', `${result.confidence_score}%`, Target]
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(([label, value, Icon]) => (
        <div className="panel" key={label}>
          <Icon className="mb-4 h-6 w-6 text-coral" />
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}

