import { useState } from 'react';
import { toast } from 'react-toastify';
import { Calculator } from 'lucide-react';
import Loader from './Loader.jsx';
import { predictionApi } from '../services/api.js';

const initial = {
  age: 25, gender: 'Male', height: 175, weight: 80, calories: 2200,
  workout_duration: 60, steps: 10000, sleep_hours: 8, water_intake: 3, activity_level: 'High'
};

export default function PredictionForm({ onResult }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('fitpredict_user') || '{}');

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, userId: user.id };
      const { data } = await predictionApi.create(payload);
      onResult(data.prediction);
      toast.success('Prediction saved');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Prediction Inputs</h2>
        <Calculator className="h-5 w-5 text-mint" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NumberField label="Age" value={form.age} min="16" max="80" onChange={(v) => update('age', v)} />
        <SelectField label="Gender" value={form.gender} options={['Male', 'Female', 'Other']} onChange={(v) => update('gender', v)} />
        <NumberField label="Height (cm)" value={form.height} min="120" max="230" onChange={(v) => update('height', v)} />
        <NumberField label="Weight (kg)" value={form.weight} min="35" max="220" onChange={(v) => update('weight', v)} />
        <NumberField label="Daily Calories" value={form.calories} min="1000" max="5000" onChange={(v) => update('calories', v)} />
        <NumberField label="Workout Duration (min)" value={form.workout_duration} min="0" max="240" onChange={(v) => update('workout_duration', v)} />
        <NumberField label="Daily Steps" value={form.steps} min="0" max="40000" onChange={(v) => update('steps', v)} />
        <NumberField label="Sleep Hours" value={form.sleep_hours} min="3" max="12" step="0.1" onChange={(v) => update('sleep_hours', v)} />
        <NumberField label="Water Intake (L)" value={form.water_intake} min="0.5" max="8" step="0.1" onChange={(v) => update('water_intake', v)} />
        <SelectField label="Activity Level" value={form.activity_level} options={['Low', 'Moderate', 'High']} onChange={(v) => update('activity_level', v)} />
      </div>
      <button disabled={loading} className="btn-primary mt-5">{loading ? <Loader /> : <Calculator size={18} />} Predict Fat Loss</button>
    </form>
  );
}

function NumberField({ label, value, onChange, ...props }) {
  return <label className="text-sm font-medium">{label}<input className="field mt-1" type="number" required value={value} onChange={(e) => onChange(Number(e.target.value))} {...props} /></label>;
}

function SelectField({ label, value, options, onChange }) {
  return <label className="text-sm font-medium">{label}<select className="field mt-1" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

