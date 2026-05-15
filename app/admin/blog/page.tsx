'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { uploadToCloudinary } from '@/lib/cloudinary'

type Post = {
  id: number
  title: string
  category: string
  excerpt: string
  content: string
  status: 'Published' | 'Draft'
  created_at: string
}

export default function BlogManager() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    category: 'Design Theory',
    excerpt: '',
    content: '',
    status: 'Draft' as 'Published' | 'Draft'
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false) 

  useEffect(() => {
    if (!localStorage.getItem('admin_auth')) router.push('/admin')
    else fetchPosts()
  }, [router])

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const addPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    let thumbnail_url = ''
    if (imageFile) {
      try {
        thumbnail_url = await uploadToCloudinary(imageFile)
      } catch {
        alert('Gagal upload thumbnail!')
        setUploading(false)
        return
      }
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ ...form, thumbnail_url }])
      .select()

    if (!error && data) {
      setPosts([data[0], ...posts])
      setForm({ title: '', category: 'Design Theory', excerpt: '', content: '', status: 'Draft' })
      setImageFile(null)
      setShowForm(false)
    }
    setUploading(false)
  }

  const deletePost = async (id: number) => {
    await supabase.from('blog_posts').delete().eq('id', id)
    setPosts(posts.filter(p => p.id !== id))
  }

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published'
    await supabase.from('blog_posts').update({ status: newStatus }).eq('id', id)
    setPosts(posts.map(p => p.id === id ? { ...p, status: newStatus as 'Published' | 'Draft' } : p))
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-white uppercase tracking-widest text-sm"
        style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b-4 border-[#1A4BFF] bg-black px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
          Blog Manager
        </h1>
        <Link href="/admin/dashboard" className="text-xs font-bold uppercase text-gray-400 hover:text-white">
          ← Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-400 text-sm">{posts.length} posts total</p>
          <button onClick={() => setShowForm(!showForm)}
            className="bg-[#1A4BFF] text-white font-bold uppercase text-sm px-6 py-3 hover:bg-blue-700 transition-colors"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            + New Post
          </button>
        </div>

        {showForm && (
          <form onSubmit={addPost} className="border-4 border-[#1A4BFF] p-6 mb-8 space-y-4">
            <h3 className="font-bold uppercase text-sm mb-2"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>New Blog Post</h3>
            <input required placeholder="Post Title" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#1A4BFF]" />
            <input placeholder="Short Excerpt (ditampilkan di homepage)" value={form.excerpt}
              onChange={e => setForm({...form, excerpt: e.target.value})}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#1A4BFF]" />
            <textarea required placeholder="Isi konten blog post..." value={form.content}
              onChange={e => setForm({...form, content: e.target.value})}
              rows={6}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#1A4BFF] resize-none" />
            <div className="grid grid-cols-2 gap-4">
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-[#0a0a0a] border-2 border-gray-600 px-4 py-2 text-white focus:outline-none">
                <option>Design Theory</option>
                <option>Behind the Work</option>
                <option>Freelance Tips</option>
                <option>Tutorial</option>
                <option>AI & Design</option>
              </select>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value as 'Published' | 'Draft'})}
                className="w-full bg-[#0a0a0a] border-2 border-gray-600 px-4 py-2 text-white focus:outline-none">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit"
                className="bg-[#1A4BFF] text-white font-bold uppercase text-sm px-6 py-2 hover:bg-blue-700"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Save Post</button>
              <button type="button" onClick={() => setShowForm(false)}
                className="border-2 border-gray-600 text-gray-400 font-bold uppercase text-sm px-6 py-2 hover:border-white hover:text-white"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Cancel</button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <p className="text-4xl mb-4">▣</p>
              <p className="uppercase font-bold tracking-widest text-sm"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>No posts yet</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id}
                className="border-2 border-gray-800 px-6 py-4 flex justify-between items-center hover:border-gray-600 transition-colors">
                <div>
                  <h3 className="font-bold uppercase text-sm leading-tight"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{post.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(post.created_at).toLocaleDateString('id-ID')} · <span style={{ color: '#F5C518' }}>{post.category}</span>
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => toggleStatus(post.id, post.status)}
                    className={`text-xs font-bold uppercase px-3 py-1 border transition-all ${
                      post.status === 'Published'
                        ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-black'
                        : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                    }`}
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{post.status}</button>
                  <button onClick={() => deletePost(post.id)}
                    className="text-xs font-bold uppercase text-[#E63329] border border-[#E63329] px-3 py-1 hover:bg-[#E63329] hover:text-white transition-all"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}