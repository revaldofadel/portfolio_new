'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Message = {
  id: number
  name: string
  email: string
  project_type: string
  message: string
  created_at: string
  is_read: boolean
}

export default function MessagesInbox() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('admin_auth')) router.push('/admin')
    else fetchMessages()
  }, [router])

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(data || [])
    setLoading(false)
  }

  const markRead = async (id: number) => {
    await supabase.from('messages').update({ is_read: true }).eq('id', id)
    setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m))
  }

  const deleteMessage = async (id: number) => {
    await supabase.from('messages').delete().eq('id', id)
    setMessages(messages.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const unread = messages.filter(m => !m.is_read).length

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-white uppercase tracking-widest text-sm"
        style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b-4 border-[#F5C518] bg-black px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold uppercase" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            Messages Inbox
          </h1>
          {unread > 0 && (
            <span className="bg-[#E63329] text-white text-xs font-bold px-2 py-1 rounded-full">
              {unread} new
            </span>
          )}
        </div>
        <Link href="/admin/dashboard" className="text-xs font-bold uppercase text-gray-400 hover:text-white">
          ← Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {messages.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-4">✉</p>
            <p className="uppercase font-bold tracking-widest text-sm"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>No messages yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {messages.map(msg => (
                <div key={msg.id}
                  onClick={() => { setSelected(msg); markRead(msg.id) }}
                  className={`border-2 px-5 py-4 cursor-pointer transition-all duration-200
                    ${selected?.id === msg.id ? 'border-[#F5C518]' : msg.is_read ? 'border-gray-800 hover:border-gray-600' : 'border-white hover:border-[#F5C518]'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold uppercase text-sm" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      {msg.name}
                      {!msg.is_read && <span className="ml-2 w-2 h-2 bg-[#E63329] rounded-full inline-block" />}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-[#F5C518] uppercase mb-1"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{msg.project_type}</p>
                  <p className="text-gray-400 text-xs truncate">{msg.message}</p>
                </div>
              ))}
            </div>

            {selected ? (
              <div className="border-4 border-[#F5C518] p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-bold uppercase text-lg"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{selected.name}</h2>
                    <p className="text-gray-400 text-sm">{selected.email}</p>
                  </div>
                  <span className="text-xs bg-[#F5C518] text-black font-bold px-3 py-1 uppercase"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{selected.project_type}</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-8">{selected.message}</p>
                <div className="flex gap-3">
                  <a href={`mailto:${selected.email}`}
                    className="bg-[#1A4BFF] text-white font-bold uppercase text-xs px-5 py-3 hover:bg-blue-700 transition-colors"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Reply via Email</a>
                  <button onClick={() => deleteMessage(selected.id)}
                    className="border-2 border-[#E63329] text-[#E63329] font-bold uppercase text-xs px-5 py-3 hover:bg-[#E63329] hover:text-white transition-all"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Delete</button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-gray-800 flex items-center justify-center min-h-48">
                <p className="text-xs uppercase tracking-widest text-gray-600"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Select a message to read</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}