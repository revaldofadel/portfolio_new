export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center relative overflow-hidden pt-20">
      {/* Bauhaus geometric shapes */}
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full border-8 border-[#F5C518] opacity-60" />
      <div className="absolute bottom-32 right-40 w-24 h-24 bg-[#E63329] opacity-80" />
      <div
        className="absolute top-1/2 right-10 w-0 h-0 
        border-l-[60px] border-l-transparent 
        border-r-[60px] border-r-transparent 
        border-b-[100px] border-b-[#1A4BFF] opacity-50"
      />
      <div className="absolute bottom-10 left-1/3 w-32 h-2 bg-[#F5C518]" />

      <div className="max-w-6xl mx-auto px-6 z-10">
        <div className="inline-block bg-[#E63329] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
          ✦ Available for Freelance
        </div>
        <h1
          className="text-6xl md:text-8xl font-bold uppercase leading-none mb-2"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          Revaldo
        </h1>
        <h1
          className="text-6xl md:text-8xl font-bold uppercase leading-none mb-6"
          style={{ fontFamily: 'Josefin Sans, sans-serif', color: '#F5C518' }}
        >
          Fadel
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-4 leading-relaxed">
          Graphic Designer · Logo & Brand Identity · AI Training Contributor
        </p>
        <p className="text-sm text-gray-400 mb-10 uppercase tracking-widest">
          9 Years Experience · 100+ Projects · Banyumas, Indonesia
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#portfolio"
            className="bg-[#F5C518] text-black font-bold uppercase tracking-wider px-8 py-4 hover:bg-white transition-colors duration-200"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border-2 border-white text-white font-bold uppercase tracking-wider px-8 py-4 hover:bg-white hover:text-black transition-colors duration-200"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
}
