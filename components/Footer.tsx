export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 border-t-4 border-[#E63329]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span
          className="text-2xl font-bold uppercase tracking-widest"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          RF<span style={{ color: '#E63329' }}>.</span>
        </span>
        <p className="text-gray-400 text-sm">
          © 2026 Revaldo Fadel. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
          <a
            href="mailto:revaldofadel21@gmail.com"
            className="hover:text-[#F5C518]"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/revaldofadel25"
            className="hover:text-[#F5C518]"
          >
            LinkedIn
          </a>
          <a href="/admin" className="hover:text-[#F5C518]">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
