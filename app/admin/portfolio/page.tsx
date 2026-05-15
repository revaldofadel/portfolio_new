'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { uploadToCloudinary } from '@/lib/cloudinary'

type Project = {
  id: number
  title: string
  client: string
  category: string
  description: string
}

export default function PortfolioManager() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', client: '', category: 'Logo & Brand', description: '' })

  useEffect(() => {
    if (!localStorage.getItem('admin_auth')) router.push('/admin')
    else fetchProjects()
  }, [router])

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    setProjects(data || [])
    setLoading(false)
  }

 const addProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    let image_url = ''
    if (imageFile) {
      try {
        image_url = await uploadToCloudinary(imageFile)
      } catch (err) {
        alert('Gagal upload gambar, coba lagi!')
        setUploading(false)
        return
      }
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([{ ...form, image_url }])
      .select()

    if (!error && data) {
      setProjects([data[0], ...projects])
      setForm({ title: '', client: '', category: 'Logo & Brand', description: '' })
      setImageFile(null)
      setPreview('')
      setShowForm(false)
    }
    setUploading(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file)) // preview lokal
    }
  } 

  const deleteProject = async (id: number) => {
    await supabase.from('projects').delete().eq('id', id)
    setProjects(projects.filter(p => p.id !== id))
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-white uppercase tracking-widest text-sm"
        style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b-4 border-[#E63329] bg-black px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold uppercase" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
          Portfolio Manager
        </h1>
        <Link href="/admin/dashboard" className="text-xs font-bold uppercase text-gray-400 hover:text-white">
          ← Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-400 text-sm">{projects.length} projects total</p>
          <button onClick={() => setShowForm(!showForm)}
            className="bg-[#F5C518] text-black font-bold uppercase text-sm px-6 py-3 hover:bg-white transition-colors"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            + Add Project
          </button>
        </div>

        {showForm && (
          <form onSubmit={addProject} className="border-4 border-[#F5C518] p-6 mb-8 space-y-4">
            <h3 className="font-bold uppercase text-sm mb-4"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>New Project</h3>
            <input required placeholder="Project Title" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518]" />
            <input placeholder="Client Name" value={form.client}
              onChange={e => setForm({...form, client: e.target.value})}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518]" />
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
              className="w-full bg-[#0a0a0a] border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518]">
              <option>Logo & Brand</option>
              <option>Brand Identity</option>
              <option>Social Media</option>
              <option>AI Training</option>
            </select>
            <textarea placeholder="Project Description" value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={3}
              className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518] resize-none" />
            <div>
              <label className="text-xs uppercase text-gray-400 mb-2 block"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                Project Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full bg-transparent border-2 border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-[#F5C518] file:mr-4 file:bg-[#F5C518] file:text-black file:font-bold file:border-0 file:px-4 file:py-1 file:uppercase file:text-xs file:cursor-pointer"/>
              {preview && (
                <div className="mt-3 border-2 border-gray-600 overflow-hidden">
                  <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={uploading}
                className="bg-[#E63329] text-white font-bold uppercase text-sm px-6 py-2 hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                {uploading ? (
                  <>
                    <span className="animate-spin">◈</span>
                    Uploading...
                  </>
                ) : 'Save Project'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {projects.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <p className="text-4xl mb-4">◈</p>
              <p className="uppercase font-bold tracking-widest text-sm"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>No projects yet</p>
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id}
                className="border-2 border-gray-800 px-6 py-4 flex justify-between items-center hover:border-gray-600 transition-colors">
                <div>
                  <h3 className="font-bold uppercase text-sm"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{project.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {project.client} · <span style={{ color: '#F5C518' }}>{project.category}</span>
                  </p>
                </div>
                <button onClick={() => deleteProject(project.id)}
                  className="text-xs font-bold uppercase text-[#E63329] border border-[#E63329] px-3 py-1 hover:bg-[#E63329] hover:text-white transition-all"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}