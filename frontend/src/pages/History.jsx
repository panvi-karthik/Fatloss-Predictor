import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import HistoryTable from '../components/HistoryTable.jsx';
import { historyApi } from '../services/api.js';

export default function History() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('created_at');
  const user = JSON.parse(localStorage.getItem('fitpredict_user') || '{}');

  const load = async () => {
    const { data } = await historyApi.list(user.id);
    setRows(data);
  };

  useEffect(() => { load().catch(() => toast.error('Unable to load history')); }, []);

  const filtered = useMemo(() => rows
    .filter((row) => `${row.activity_level} ${row.gender}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(b[sort] || 0) - Number(a[sort] || 0)), [rows, search, sort]);

  const remove = async (id) => {
    await historyApi.remove(id, user.id);
    toast.success('Prediction deleted');
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className="field" placeholder="Search by gender or activity level" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="field sm:max-w-56" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="predicted_fat_loss">Fat Loss</option>
          <option value="predicted_weight_loss">Weight Loss</option>
          <option value="calories">Calories</option>
        </select>
      </div>
      <HistoryTable rows={filtered} onDelete={remove} />
    </div>
  );
}

