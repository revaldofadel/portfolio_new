'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  category: string;
  date: string;
  status: 'Published' | 'Draft';
};

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Bauhaus & Desain Modern: Warisan yang Tetap Relevan',
    category: 'Design Theory',
    date: '12 Mei 2026',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Workflow AI Training: Dari CorelDRAW ke Postwork',
    category: 'Behind the Work',
    date: '5 Mei 2026',
    status: 'Published',
  },
  {
    id: 3,
    title: 'Tips Freelance Graphic Designer untuk Klien Internasional',
    category: 'Freelance Tips',
    date: '28 Apr 2026',
    status: 'Draft',
  },
];

export default function BlogManager() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Design Theory',
    status: 'Draft' as 'Published' | 'Draft',
  });

  useEffect(() => {
    if (!localStorage.getItem('admin_auth')) router.push('/admin');
  }, [router]);

  const addPost = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setPosts([...posts, { ...form, id: Date.now(), date: today }]);
    setForm({ title: '', category: 'Design Theory', status: 'Draft' });
    setShowForm(false);
  };

  const deletePost = (id: number) => setPosts(posts.filter((p) => p.id !== id));

  const toggleStatus = (id: number) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b-4 border-[#1A4BFF] bg-black px-8 py-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold uppercase"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          Blog Manager
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
          <p className="text-gray-400 text-sm">{posts.length} posts total</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#1A4BFF] text-white font-bold uppercase text-sm px-6 py-3 hover:bg-blue-700 transition-colors"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            + New Post
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={addPost}
            className="border-4 border-[#1A4BFF] p-6 mb-8 space-y-4"
          >
            <h3
              className="font-bold uppercase text-sm mb-2"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              New Blog Post
            </h3>
            <input
              required
              placeholder="Post Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#1A4BFF]"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#0a0a0a] border-2 border-gray-600 px-4 py-2 text-white focus:outline-none"
              >
                <option>Design Theory</option>
                <option>Behind the Work</option>
                <option>Freelance Tips</option>
                <option>Tutorial</option>
              </select>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as 'Published' | 'Draft',
                  })
                }
                className="w-full bg-[#0a0a0a] border-2 border-gray-600 px-4 py-2 text-white focus:outline-none"
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#1A4BFF] text-white font-bold uppercase text-sm px-6 py-2 hover:bg-blue-700"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Save Post
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

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-2 border-gray-800 px-6 py-4 flex justify-between items-center hover:border-gray-600 transition-colors"
            >
              <div>
                <h3
                  className="font-bold uppercase text-sm leading-tight"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  {post.date} ·{' '}
                  <span style={{ color: '#F5C518' }}>{post.category}</span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => toggleStatus(post.id)}
                  className={`text-xs font-bold uppercase px-3 py-1 border transition-all ${
                    post.status === 'Published'
                      ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-black'
                      : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                  }`}
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {post.status}
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-xs font-bold uppercase text-[#E63329] border border-[#E63329] px-3 py-1 hover:bg-[#E63329] hover:text-white transition-all"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
