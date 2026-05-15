'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', project_type: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('messages').insert([form])
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', email: '', project_type: '', message: '' })
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#1A4BFF] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-[#F5C518]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5C518]"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Contact</span>
            </div>
            <h2 className="text-5xl font-bold uppercase mb-6 leading-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Let's Work<br />Together</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Butuh designer untuk proyek brand identity, logo, atau konten sosial media?
              Atau sedang membuka lowongan? Hubungi saya!
            </p>
            <div className="space-y-3">
              <a href="mailto:revaldofadel21@gmail.com"
                className="flex items-center gap-3 text-sm font-bold hover:text-[#F5C518] transition-colors"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                ✉ revaldofadel21@gmail.com
              </a>
              <a href="https://linkedin.com/in/revaldofadel25" target="_blank"
                className="flex items-center gap-3 text-sm font-bold hover:text-[#F5C518] transition-colors"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                ⟐ linkedin.com/in/revaldofadel25
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text" placeholder="Your Name" required
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-transparent border-2 border-white px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-[#F5C518]"
            />
            <input
              type="email" placeholder="Your Email" required
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full bg-transparent border-2 border-white px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-[#F5C518]"
            />
            <select
              value={form.project_type}
              onChange={e => setForm({...form, project_type: e.target.value})}
              className="w-full bg-[#1A4BFF] border-2 border-white px-4 py-3 text-white focus:outline-none focus:border-[#F5C518]">
              <option value="">Project Type</option>
              <option>Logo Design</option>
              <option>Brand Identity</option>
              <option>Social Media Design</option>
              <option>AI Training Assets</option>
              <option>Job Opportunity</option>
            </select>
            <textarea
              rows={4} placeholder="Tell me about your project..."
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              className="w-full bg-transparent border-2 border-white px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-[#F5C518] resize-none"
            />

            {/* Status Messages */}
            {status === 'success' && (
              <div className="bg-green-500 text-white px-4 py-3 font-bold text-sm uppercase"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                ✓ Pesan terkirim! Saya akan segera menghubungi kamu.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-[#E63329] text-white px-4 py-3 font-bold text-sm uppercase"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                ✗ Gagal kirim pesan. Coba lagi ya!
              </div>
            )}

            <button type="submit" disabled={status === 'loading'}
              className="w-full bg-[#F5C518] text-black font-bold uppercase tracking-wider py-4 hover:bg-white transition-colors duration-200 disabled:opacity-50"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              {status === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}