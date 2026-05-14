const skills = [
  { name: 'Logo & Brand Identity', level: 95, color: '#E63329' },
  { name: 'CorelDRAW / Illustrator', level: 92, color: '#1A4BFF' },
  { name: 'Social Media Design', level: 88, color: '#F5C518' },
  { name: 'AI Training Assets', level: 85, color: '#E63329' },
  { name: 'Motion Graphics', level: 75, color: '#1A4BFF' },
  { name: 'UI/UX & Figma', level: 70, color: '#F5C518' },
];

const tools = [
  'CorelDRAW',
  'Adobe Illustrator',
  'Affinity Designer',
  'Figma',
  'Canva',
  'Photoshop',
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-[#E63329]" />
              <span
                className="text-xs font-bold uppercase tracking-widest text-[#E63329]"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                About Me
              </span>
            </div>
            <h2
              className="text-5xl font-bold uppercase mb-6 leading-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Design That
              <br />
              <span style={{ color: '#1A4BFF' }}>Speaks</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Freelance Graphic Designer sejak 2017 dengan pengalaman 9 tahun di
              brand identity, vector logo, dan AI training design. Saya juga
              aktif sebagai AI Training Design Contributor di Postwork Labs,
              membantu melatih model generatif dengan aset visual berkualitas
              tinggi.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Lulusan Sistem Informasi UBSI, aktif di platform internasional
              seperti 99designs dan Postwork. Siap untuk proyek freelance maupun
              posisi full-time.
            </p>
            {/* Tools */}
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="border-2 border-black text-xs font-bold uppercase px-3 py-1"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          {/* Right - Skills */}
          <div>
            <div className="w-full h-64 bg-gray-100 border-4 border-black flex items-center justify-center mb-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-16 h-16 bg-[#F5C518]" />
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-[#E63329]" />
              <span
                className="text-6xl font-bold text-gray-300"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                RF
              </span>
            </div>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div
                    className="flex justify-between text-xs font-bold uppercase mb-1"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 border border-black">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
