import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn } from 'lucide-react';
import { authApi } from '../services/api.js';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await authApi.login(form);
      localStorage.setItem('fitpredict_user', JSON.stringify(data));
      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={submit} className="panel">
        <h1 className="mb-5 text-2xl font-bold">Login</h1>
        <label className="text-sm font-medium">Username<input className="field mt-1" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></label>
        <label className="mt-4 block text-sm font-medium">Password<input className="field mt-1" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <button className="btn-primary mt-5 w-full"><LogIn size={18} /> Login</button>
        <p className="mt-4 text-center text-sm">New here? <Link className="font-semibold text-mint" to="/register">Register</Link></p>
      </form>
    </div>
  );
}

