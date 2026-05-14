const services = [
  {
    icon: '◈',
    title: 'Logo Design',
    desc: 'Custom vector logo dengan konsep unik, scalable untuk semua media.',
    price: 'From Rp 150.000',
    color: '#E63329',
  },
  {
    icon: '◉',
    title: 'Brand Identity',
    desc: 'Sistem identitas brand lengkap: logo, warna, tipografi, panduan penggunaan.',
    price: 'From Rp 500.000',
    color: '#1A4BFF',
  },
  {
    icon: '▣',
    title: 'Social Media Design',
    desc: 'Template feed, story, carousel Instagram/LinkedIn yang konsisten dan menarik.',
    price: 'From Rp 100.000',
    color: '#F5C518',
  },
  {
    icon: '◆',
    title: 'AI Training Assets',
    desc: 'Aset visual berkualitas untuk training model AI generatif.',
    price: 'Custom Quote',
    color: '#E63329',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-[#1A4BFF]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#1A4BFF]"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Services
          </span>
        </div>
        <h2
          className="text-5xl font-bold uppercase mb-12"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          What I Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="border-4 border-black p-6 hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="text-4xl mb-4" style={{ color: s.color }}>
                {s.icon}
              </div>
              <h3
                className="text-lg font-bold uppercase mb-3"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {s.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {s.desc}
              </p>
              <div className="border-t-2 border-black pt-4">
                <span
                  className="font-bold text-sm uppercase"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {s.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
