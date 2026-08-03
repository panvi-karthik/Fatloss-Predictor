import { Download, Trash2 } from 'lucide-react';


export default function HistoryTable({ rows, onDelete }) {
  const exportCsv = () => {
    const headers = Object.keys(rows[0] || {});
    const csv = [headers.join(','), ...rows.map((row) => headers.map((key) => JSON.stringify(row[key] ?? '')).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    
    link.href = url;
    link.download = 'fitpredict-history.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  
  return (
    <div className="panel overflow-x-auto">
      
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Prediction History</h2>
        <button className="btn-secondary" onClick={exportCsv} disabled={!rows.length}><Download size={16} /> Export CSV</button>
      </div>
      
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <tr>{['Date', 'BMI', 'Fat Loss', 'Weight Loss', 'Calories', 'Sleep', 'Activity', ''].map((h) => <th className="px-3 py-2" key={h}>{h}</th>)}</tr>
        </thead>
        
        <tbody>
          {rows.map((row) => (
            <tr className="border-b border-slate-100 dark:border-slate-800" key={row.id}>
              <td className="px-3 py-2">{new Date(row.created_at).toLocaleDateString()}</td>
              <td className="px-3 py-2">{row.bmi}</td>
              <td className="px-3 py-2">{row.predicted_fat_loss} kg</td>
              <td className="px-3 py-2">{row.predicted_weight_loss} kg</td>
              <td className="px-3 py-2">{row.calories}</td>
              <td className="px-3 py-2">{row.sleep_hours} h</td>
              <td className="px-3 py-2">{row.activity_level}</td>
              <td className="px-3 py-2"><button className="btn-secondary !px-2" onClick={() => onDelete(row.id)} title="Delete"><Trash2 size={16} /></button></td>
            </tr>
          ))}
        </tbody>
        
      </table>
      
      {!rows.length && <p className="py-8 text-center text-slate-500">No predictions yet.</p>}
      
    </div>
  );
}

