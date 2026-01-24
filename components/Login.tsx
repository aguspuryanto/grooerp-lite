
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabase';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Hybrid Auth Logic
    if (isSupabaseConfigured) {
      try {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;

        if (data.user) {
          onLoginSuccess({
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.full_name || 'User Supabase',
            role: 'Administrator',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.id}`
          });
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat login.');
        setLoading(false);
        return;
      }
    } else {
      // Dummy Logic for Development
      setTimeout(() => {
        if (email && password) {
          onLoginSuccess({
            id: 'demo-123',
            email: email,
            name: 'Budi Santoso (Demo)',
            role: 'Super Admin',
            avatar: 'https://picsum.photos/seed/admin/100'
          });
        } else {
          setError('Masukkan email dan kata sandi untuk mode demo.');
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md px-6 py-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-blue-500/20 mb-4 ring-4 ring-white/5">G</div>
            <h1 className="text-3xl font-black text-white tracking-tight">Groo<span className="text-blue-500">ERP</span></h1>
            <p className="text-slate-400 text-sm mt-2 text-center">Solusi Manajemen Bisnis Terintegrasi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Bisnis</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600 text-sm"
                placeholder="admin@perusahaan.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kata Sandi</label>
                <a href="#" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Lupa?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600 text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-0" />
              <label htmlFor="remember" className="text-xs text-slate-400 select-none">Ingat saya di perangkat ini</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all transform active:scale-[0.98] uppercase tracking-widest text-xs mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </div>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center">
            <p className="text-xs text-slate-500 mb-4 uppercase tracking-tighter font-bold">Atau gunakan akses demo cepat:</p>
            <div className="flex gap-3">
              <button 
                onClick={() => { setEmail('admin@grooerp.com'); setPassword('password123'); }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] text-slate-300 font-bold hover:bg-white/10 transition-all"
              >
                Super Admin
              </button>
              <button 
                onClick={() => { setEmail('staff@perusahaan.com'); setPassword('staff456'); }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] text-slate-300 font-bold hover:bg-white/10 transition-all"
              >
                Gudang
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          &copy; 2024 Groo Technologies • v2.4.0-Stable
        </p>
      </div>
    </div>
  );
};

export default Login;
