'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Post = {
  id: number
  title: string
  category: string
  excerpt: string
  status: string
  created_at: string
  thumbnail_url: string
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false })
      .limit(3)
    setPosts(data || [])
    setLoading(false)
  }

  return (
    <section id="blog" className="py-24 bg-gray-50 border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-[#E63329]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#E63329]"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Blog</span>
        </div>
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-5xl font-bold uppercase"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Latest Posts</h2>
          <a href="/blog" className="text-sm font-bold uppercase underline hover:text-[#E63329]"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}>View All →</a>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border-4 border-black animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-200 w-1/2 rounded" />
                  <div className="h-4 bg-gray-200 w-full rounded" />
                  <div className="h-3 bg-gray-200 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">▣</p>
            <p className="uppercase font-bold tracking-widest text-sm"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}>No published posts yet</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
              <article key={post.id}
                className="bg-white border-4 border-black group hover:-translate-y-1 transition-transform duration-300">
                <div className="h-40 bg-black flex items-center justify-center relative overflow-hidden">
                  {post.thumbnail_url ? (
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 border-4 border-[#F5C518] rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex gap-2 items-center mb-3">
                    <span className="text-xs font-bold uppercase bg-[#F5C518] px-2 py-1"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{post.category}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="font-bold uppercase text-base leading-tight mb-3"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}