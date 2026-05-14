const posts = [
  {
    id: 1,
    title: 'Bauhaus & Desain Modern: Warisan yang Tetap Relevan',
    date: '12 Mei 2026',
    category: 'Design Theory',
    excerpt:
      'Bagaimana prinsip Bauhaus mempengaruhi UI/UX dan branding di era digital 2026.',
  },
  {
    id: 2,
    title: 'Workflow AI Training: Dari CorelDRAW ke Postwork',
    date: '5 Mei 2026',
    category: 'Behind the Work',
    excerpt: 'Proses lengkap membuat aset training AI yang berkualitas tinggi.',
  },
  {
    id: 3,
    title: 'Tips Freelance Graphic Designer untuk Klien Internasional',
    date: '28 Apr 2026',
    category: 'Freelance Tips',
    excerpt:
      'Cara mendapatkan klien dari 99designs dan platform global lainnya.',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-gray-50 border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-[#E63329]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#E63329]"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Blog
          </span>
        </div>
        <div className="flex justify-between items-end mb-12">
          <h2
            className="text-5xl font-bold uppercase"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Latest Posts
          </h2>
          <a
            href="/blog"
            className="text-sm font-bold uppercase underline hover:text-[#E63329]"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white border-4 border-black group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="h-40 bg-black flex items-center justify-center relative overflow-hidden">
                <div className="w-12 h-12 border-4 border-[#F5C518] rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 items-center mb-3">
                  <span
                    className="text-xs font-bold uppercase bg-[#F5C518] px-2 py-1"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3
                  className="font-bold uppercase text-base leading-tight mb-3"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
