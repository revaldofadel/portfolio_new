'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'revaldo2026') {
      localStorage.setItem('admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Password salah!');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="border-4 border-white p-10 w-full max-w-md">
        <h1
          className="text-4xl font-bold uppercase text-white mb-2"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          Admin<span style={{ color: '#E63329' }}>.</span>
        </h1>
        <p className="text-gray-400 text-sm mb-8 uppercase tracking-widest">
          Dashboard Panel
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-2 border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F5C518]"
          />
          {error && <p className="text-[#E63329] text-sm font-bold">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#F5C518] text-black font-bold uppercase tracking-wider py-4 hover:bg-white transition-colors"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}
