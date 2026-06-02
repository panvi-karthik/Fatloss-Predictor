import { Activity, LogOut, Moon, Sun } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(localStorage.getItem('fitpredict_theme') === 'dark');
  const user = JSON.parse(localStorage.getItem('fitpredict_user') || 'null');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('fitpredict_theme', dark ? 'dark' : 'light');
  }, [dark]);

  const logout = () => {
    localStorage.removeItem('fitpredict_user');
    navigate('/login');
  };

  const linkClass = ({ isActive }) => `text-sm font-medium ${isActive ? 'text-mint' : 'text-slate-700 dark:text-slate-200'}`;

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <Activity className="h-6 w-6 text-mint" /> FitPredict AI
        </Link>
        <div className="flex items-center gap-4">
          <NavLink className={linkClass} to="/">Home</NavLink>
          {user && <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>}
          {user && <NavLink className={linkClass} to="/history">History</NavLink>}
          <NavLink className={linkClass} to="/about">About</NavLink>
          {!user && <NavLink className={linkClass} to="/login">Login</NavLink>}
          <button className="btn-secondary !px-2" onClick={() => setDark(!dark)} title="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user && <button className="btn-secondary !px-2" onClick={logout} title="Logout"><LogOut size={18} /></button>}
        </div>
      </nav>
    </header>
  );
}

