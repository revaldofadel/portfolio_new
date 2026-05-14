'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const stats = [
  { label: 'Projects', value: '6', color: '#E63329' },
  { label: 'Blog Posts', value: '3', color: '#1A4BFF' },
  { label: 'Messages', value: '0', color: '#F5C518' },
  { label: 'Years Exp', value: '9', color: '#E63329' },
];

const menuItems = [
  {
    label: 'Portfolio Manager',
    href: '/admin/portfolio',
    icon: '◈',
    color: '#E63329',
  },
  { label: 'Blog Manager', href: '/admin/blog', icon: '▣', color: '#1A4BFF' },
  { label: 'Messages', href: '/admin/messages', icon: '✉', color: '#F5C518' },
  {
    label: 'Profile Settings',
    href: '/admin/profile',
    icon: '◉',
    color: '#E63329',
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) router.push('/admin');
    else setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  if (loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Bar */}
      <div className="border-b-4 border-[#E63329] bg-black px-8 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold uppercase"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          RF<span style={{ color: '#E63329' }}>.</span> Admin
        </h1>
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="text-xs font-bold uppercase text-gray-400 hover:text-white tracking-widest"
          >
            ← View Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs font-bold uppercase bg-[#E63329] px-4 py-2 hover:bg-red-700 transition-colors"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
            Welcome back,
          </p>
          <h2
            className="text-4xl font-bold uppercase"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Revaldo Fadel
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-2 border-gray-800 p-6 hover:border-white transition-colors"
            >
              <div
                className="text-4xl font-bold mb-1"
                style={{
                  color: stat.color,
                  fontFamily: 'Josefin Sans, sans-serif',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs uppercase tracking-widest text-gray-400"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Menu */}
        <h3
          className="text-xs uppercase tracking-widest text-gray-400 mb-6"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          Manage Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="border-4 border-gray-800 p-8 hover:border-white hover:-translate-y-1 transition-all duration-200 group block"
            >
              <div className="text-3xl mb-4" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div
                className="font-bold uppercase text-sm"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {item.label}
              </div>
              <div className="text-gray-600 text-xs mt-1 group-hover:text-gray-400 transition-colors">
                Click to manage →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
