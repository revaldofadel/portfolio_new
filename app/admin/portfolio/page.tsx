'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Visual Identity Carousel',
    client: 'Vat & Volume Distillery',
    category: 'Brand Identity',
  },
  {
    id: 2,
    title: 'Brand Style Guide',
    client: 'Bright Wheels Mobile Play-Hub',
    category: 'Brand Identity',
  },
  {
    id: 3,
    title: 'Window Vinyl Graphics',
    client: "The Host's Hookup",
    category: 'Logo & Brand',
  },
  {
    id: 4,
    title: 'Maritime Medical Logo',
    client: 'Maritime Medical Concierge',
    category: 'Logo & Brand',
  },
  {
    id: 5,
    title: 'Insurance Pricing Matrix',
    client: 'Shield & Anchor Insurance',
    category: 'Social Media',
  },
  {
    id: 6,
    title: 'AI Training Assets Pack',
    client: 'Postwork Labs',
    category: 'AI Training',
  },
];

export default function PortfolioManager() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    client: '',
    category: 'Logo & Brand',
  });

  useEffect(() => {
    if (!localStorage.getItem('admin_auth')) router.push('/admin');
  }, [router]);

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    setProjects([...projects, { ...form, id: Date.now() }]);
    setForm({ title: '', client: '', category: 'Logo & Brand' });
    setShowForm(false);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b-4 border-[#E63329] bg-black px-8 py-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold uppercase"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          Portfolio Manager
        </h1>
        <Link
          href="/admin/dashboard"
          className="text-xs font-bold uppercase text-gray-400 hover:text-white"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-400 text-sm">
            {projects.length} projects total
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#F5C518] text-black font-bold uppercase text-sm px-6 py-3 hover:bg-white transition-colors"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            + Add Project
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <form
            onSubmit={addProject}
            className="border-4 border-[#F5C518] p-6 mb-8 space-y-4"
          >
            <h3
              className="font-bold uppercase text-sm mb-4"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              New Project
            </h3>
            <input
              required
              placeholder="Project Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518]"
            />
            <input
              required
              placeholder="Client Name"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518]"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-[#0a0a0a] border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518]"
            >
              <option>Logo & Brand</option>
              <option>Brand Identity</option>
              <option>Social Media</option>
              <option>AI Training</option>
            </select>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#E63329] text-white font-bold uppercase text-sm px-6 py-2 hover:bg-red-700"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border-2 border-gray-600 text-gray-400 font-bold uppercase text-sm px-6 py-2 hover:border-white hover:text-white"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Project List */}
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-2 border-gray-800 px-6 py-4 flex justify-between items-center hover:border-gray-600 transition-colors"
            >
              <div>
                <h3
                  className="font-bold uppercase text-sm"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  {project.client} ·{' '}
                  <span style={{ color: '#F5C518' }}>{project.category}</span>
                </p>
              </div>
              <button
                onClick={() => deleteProject(project.id)}
                className="text-xs font-bold uppercase text-[#E63329] hover:text-red-400 border border-[#E63329] px-3 py-1 hover:bg-[#E63329] hover:text-white transition-all"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
