'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Message = {
  id: number;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: string;
  read: boolean;
};

const demoMessages: Message[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    projectType: 'Logo Design',
    message:
      'Hi Revaldo, I need a logo for my new coffee shop brand. Can we discuss the project?',
    date: '14 Mei 2026',
    read: false,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@startup.io',
    projectType: 'Brand Identity',
    message:
      'We are looking for a complete brand identity package for our tech startup. Budget is flexible.',
    date: '13 Mei 2026',
    read: true,
  },
];

export default function MessagesInbox() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_auth')) router.push('/admin');
  }, [router]);

  const markRead = (id: number) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b-4 border-[#F5C518] bg-black px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1
            className="text-xl font-bold uppercase"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Messages Inbox
          </h1>
          {unread > 0 && (
            <span className="bg-[#E63329] text-white text-xs font-bold px-2 py-1 rounded-full">
              {unread} new
            </span>
          )}
        </div>
        <Link
          href="/admin/dashboard"
          className="text-xs font-bold uppercase text-gray-400 hover:text-white"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {messages.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-4">✉</p>
            <p
              className="uppercase font-bold tracking-widest text-sm"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              No messages yet
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Message List */}
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelected(msg);
                    markRead(msg.id);
                  }}
                  className={`border-2 px-5 py-4 cursor-pointer transition-all duration-200
                    ${
                      selected?.id === msg.id
                        ? 'border-[#F5C518]'
                        : msg.read
                        ? 'border-gray-800 hover:border-gray-600'
                        : 'border-white hover:border-[#F5C518]'
                    }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      className="font-bold uppercase text-sm"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {msg.name}
                      {!msg.read && (
                        <span className="ml-2 w-2 h-2 bg-[#E63329] rounded-full inline-block" />
                      )}
                    </h3>
                    <span className="text-xs text-gray-400">{msg.date}</span>
                  </div>
                  <p
                    className="text-xs text-[#F5C518] uppercase mb-1"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {msg.projectType}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            {selected ? (
              <div className="border-4 border-[#F5C518] p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2
                      className="font-bold uppercase text-lg"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {selected.name}
                    </h2>
                    <p className="text-gray-400 text-sm">{selected.email}</p>
                  </div>
                  <span
                    className="text-xs bg-[#F5C518] text-black font-bold px-3 py-1 uppercase"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {selected.projectType}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-8">
                  {selected.message}
                </p>
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selected.email}`}
                    className="bg-[#1A4BFF] text-white font-bold uppercase text-xs px-5 py-3 hover:bg-blue-700 transition-colors"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => deleteMessage(selected.id)}
                    className="border-2 border-[#E63329] text-[#E63329] font-bold uppercase text-xs px-5 py-3 hover:bg-[#E63329] hover:text-white transition-all"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-gray-800 flex items-center justify-center text-gray-600 min-h-48">
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Select a message to read
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
