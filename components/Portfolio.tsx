'use client';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Visual Identity Carousel',
    client: 'Vat & Volume Distillery',
    category: 'Brand Identity',
    color: '#E63329',
  },
  {
    id: 2,
    title: 'Brand Style Guide',
    client: 'Bright Wheels Mobile Play-Hub',
    category: 'Brand Identity',
    color: '#1A4BFF',
  },
  {
    id: 3,
    title: 'Window Vinyl Graphics',
    client: "The Host's Hookup",
    category: 'Logo & Brand',
    color: '#F5C518',
  },
  {
    id: 4,
    title: 'Maritime Medical Logo',
    client: 'Maritime Medical Concierge',
    category: 'Logo & Brand',
    color: '#E63329',
  },
  {
    id: 5,
    title: 'Insurance Pricing Matrix',
    client: 'Shield & Anchor Insurance',
    category: 'Social Media',
    color: '#1A4BFF',
  },
  {
    id: 6,
    title: 'AI Training Assets Pack',
    client: 'Postwork Labs',
    category: 'AI Training',
    color: '#F5C518',
  },
];

const filters = [
  'All',
  'Logo & Brand',
  'Brand Identity',
  'Social Media',
  'AI Training',
];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-[#F5C518]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#F5C518]"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Portfolio
          </span>
        </div>
        <h2
          className="text-5xl font-bold uppercase mb-10"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          Selected Work
        </h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-xs font-bold uppercase tracking-wider px-5 py-2 border-2 transition-all duration-200
                ${
                  active === f
                    ? 'bg-[#F5C518] text-black border-[#F5C518]'
                    : 'border-white text-white hover:border-[#F5C518] hover:text-[#F5C518]'
                }`}
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative border-2 border-gray-800 hover:border-white transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div
                className="h-52 flex items-center justify-center relative"
                style={{ backgroundColor: project.color + '20' }}
              >
                <div
                  className="w-16 h-16 border-4 transition-transform duration-300 group-hover:rotate-45"
                  style={{ borderColor: project.color }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                  <span
                    className="text-white font-bold uppercase text-sm tracking-widest"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    View Project
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: project.color,
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  {project.category}
                </span>
                <h3
                  className="text-lg font-bold uppercase mt-1"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{project.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
