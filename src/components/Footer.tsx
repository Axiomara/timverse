import { Link } from "react-router-dom"
import { ArrowRight, Instagram, Twitter, Youtube, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="text-3xl font-black tracking-[0.3em] uppercase italic text-zinc-900 dark:text-white">
              Popverse
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-md italic font-medium">
              "Navigasi budaya pop, gaya hidup, dan denyut nadi kota Mimika dalam satu genggaman digital."
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="p-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:text-pink-500 transition-all shadow-sm border border-zinc-100 dark:border-zinc-700 hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:text-pink-500 transition-all shadow-sm border border-zinc-100 dark:border-zinc-700 hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:text-pink-500 transition-all shadow-sm border border-zinc-100 dark:border-zinc-700 hover:scale-110">
                <Youtube size={20} />
              </a>
              <a href="#" className="p-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:text-pink-500 transition-all shadow-sm border border-zinc-100 dark:border-zinc-700 hover:scale-110">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Categories</h4>
              <ul className="space-y-4">
                {['Gaming', 'Movies', 'Tech', 'Music', 'Anime'].map(cat => (
                  <li key={cat}>
                    <Link to={`/category/${cat.toLowerCase()}`} className="text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Timika News</h4>
              <ul className="space-y-4">
                {['Development', 'Culture', 'Sports', 'Local Pulse'].map(item => (
                  <li key={item}>
                    <Link to="/timika-news" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Newsletter</h4>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-loose">
                Dapatkan berita pilihan langsung di inbox kamu.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="EMAIL KAMU..."
                  className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-5 py-4 text-[10px] font-black focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                />
                <button className="absolute right-2 top-2 p-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg hover:scale-105 transition-transform">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white">About</Link>
            <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Contact</Link>
            <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Privacy Policy</Link>
          </div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">
            &copy; 2026 <span className="text-zinc-900 dark:text-white">Popverse Media Group</span> &bull; All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}