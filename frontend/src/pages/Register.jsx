import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserPlus } from 'lucide-react';
import { authApi } from '../services/api.js';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    try {
      await authApi.register({ username: form.username, password: form.password });
      toast.success('Account created');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };
  
  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={submit} className="panel">
        <h1 className="mb-5 text-2xl font-bold">Register</h1>
        <label className="text-sm font-medium">Username<input className="field mt-1" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></label>
        <label className="mt-4 block text-sm font-medium">Password<input className="field mt-1" type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <label className="mt-4 block text-sm font-medium">Confirm Password<input className="field mt-1" type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required /></label>
        <button className="btn-primary mt-5 w-full"><UserPlus size={18} /> Register</button>
        <p className="mt-4 text-center text-sm">Already registered? <Link className="font-semibold text-mint" to="/login">Login</Link></p>
      </form>
    </div>
  );
}

