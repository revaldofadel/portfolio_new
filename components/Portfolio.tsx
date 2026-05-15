'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Project = {
  id: number
  title: string
  client: string
  category: string
  description: string
  thumbnail_url: string
}

const filters = ['All', 'Logo & Brand', 'Brand Identity', 'Social Media', 'AI Training']

const colors: Record<string, string> = {
  'Logo & Brand': '#E63329',
  'Brand Identity': '#1A4BFF',
  'Social Media': '#F5C518',
  'AI Training': '#E63329',
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [active, setActive] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    setProjects(data || [])
    setLoading(false)
  }

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-[#F5C518]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5C518]"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Portfolio</span>
        </div>
        <h2 className="text-5xl font-bold uppercase mb-10"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Selected Work</h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`text-xs font-bold uppercase tracking-wider px-5 py-2 border-2 transition-all duration-200
                ${active === f
                  ? 'bg-[#F5C518] text-black border-[#F5C518]'
                  : 'border-white text-white hover:border-[#F5C518] hover:text-[#F5C518]'}`}
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-2 border-gray-800 animate-pulse">
                <div className="h-52 bg-gray-800" />
                <div className="p-5 space-y-2">
                  <div className="h-3 bg-gray-700 w-1/3 rounded" />
                  <div className="h-4 bg-gray-700 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-4">◈</p>
            <p className="uppercase font-bold tracking-widest text-sm"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>No projects yet</p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <div key={project.id}
                className="group relative border-2 border-gray-800 hover:border-white transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="h-52 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: (colors[project.category] || '#E63329') + '20' }}>
                  {(project as any).image_url ? (
                    <img
                      src={(project as any).image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 border-4 transition-transform duration-300 group-hover:rotate-45"
                      style={{ borderColor: colors[project.category] || '#E63329' }} />
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold uppercase text-sm tracking-widest"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}>View Project</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: colors[project.category] || '#E63329', fontFamily: 'Josefin Sans, sans-serif' }}>
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold uppercase mt-1"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{project.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{project.client}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}