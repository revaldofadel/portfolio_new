'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
      className="fixed top-0 w-full z-50 bg-white border-b-4 border-black"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-widest uppercase">
          RF<span style={{ color: '#E63329' }}>.</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-wider">
          {['About', 'Portfolio', 'Services', 'Blog', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#E63329] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <a
            href="/admin"
            className="bg-black text-white px-4 py-1 hover:bg-[#E63329] transition-colors duration-200"
          >
            Admin
          </a>
        </div>
        <button
          className="md:hidden font-bold text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t-2 border-black px-6 py-4 flex flex-col gap-4 text-sm font-semibold uppercase">
          {['About', 'Portfolio', 'Services', 'Blog', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
