import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';

export default function AnalyticsCharts({ history }) {
  const data = [...history].reverse().map((row, index) => ({
    name: `#${index + 1}`,
    fat: row.predicted_fat_loss,
    weight: row.predicted_weight_loss,
    calories: row.calories,
    sleep: row.sleep_hours,
    activity: row.activity_level
  }));
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Chart title="Fat Loss and Weight Loss Trend">
        <LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line dataKey="fat" stroke="#14b8a6" /><Line dataKey="weight" stroke="#f97316" /></LineChart>
      </Chart>
      <Chart title="Calories vs Fat Loss">
        <ScatterChart><CartesianGrid /><XAxis dataKey="calories" name="Calories" /><YAxis dataKey="fat" name="Fat Loss" /><Tooltip cursor={{ strokeDasharray: '3 3' }} /><Scatter data={data} fill="#be123c" /></ScatterChart>
      </Chart>
      <Chart title="Sleep vs Fat Loss">
        <ScatterChart><CartesianGrid /><XAxis dataKey="sleep" name="Sleep" /><YAxis dataKey="fat" name="Fat Loss" /><Tooltip /><Scatter data={data} fill="#14b8a6" /></ScatterChart>
      </Chart>
      <Chart title="Activity Comparison">
        <BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="activity" /><YAxis /><Tooltip /><Bar dataKey="fat" fill="#f97316" /></BarChart>
      </Chart>
    </div>
  );
}

function Chart({ title, children }) {
  return (
    <div className="panel">
      <h3 className="mb-4 text-base font-bold">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </div>
  );
}

