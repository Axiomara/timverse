import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom"; // PERBAIKAN: Import Link dari react-router-dom
import { 
  Share2, Bookmark, ArrowUpRight, 
  TrendingUp, CloudSun, 
  Activity, ChevronRight,
  Clock, Zap
} from "lucide-react";
import Navbar from "../components/Navbar";

const daftarBerita = [
  {
    kategori: "Lingkungan",
    judul: "Restorasi Gletser Carstensz: Harapan Baru di Puncak Tertinggi Papua",
    ringkasan: "Para ahli lingkungan mulai memetakan langkah-langkah darurat untuk menjaga sisa salju abadi yang kian menyusut di pegunungan tengah...",
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    tanggal: "24 Feb 2026",
    waktuBaca: "5 menit"
  },
  {
    kategori: "Ekonomi",
    judul: "Transformasi Grasberg: Menuju Operasi Tambang Bawah Tanah Terbesar Dunia",
    ringkasan: "PT Freeport Indonesia mencatatkan rekor efisiensi baru dalam operasional tambang bawah tanah mereka yang sangat kompleks di Mimika...",
    gambar: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80",
    tanggal: "22 Feb 2026",
    waktuBaca: "8 menit"
  },
  {
    kategori: "Budaya",
    judul: "Festival Budaya Kamoro Kembali Digelar: Merayakan Seni Ukir yang Mendunia",
    ringkasan: "Karya seni ukir kayu yang ikonik akan dipamerkan sepanjang pesisir Mimika dalam perayaan tahunan yang sempat tertunda...",
    gambar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
    tanggal: "20 Feb 2026",
    waktuBaca: "4 menit"
  },
  {
    kategori: "Infrastruktur",
    judul: "Perluasan Bandara Mozes Kilangin: Kapasitas Penumpang Naik Dua Lipat",
    ringkasan: "Pemerintah daerah menargetkan penyelesaian terminal baru pada akhir tahun ini untuk mendukung mobilitas udara...",
    gambar: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80",
    tanggal: "19 Feb 2026",
    waktuBaca: "6 menit"
  }
];

export default function TimikaNews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-500 dark:bg-zinc-950 bg-white dark:text-zinc-100 text-zinc-900 overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 to-purple-600 origin-left z-[120]" style={{ scaleX }} />
      
      <Navbar />

      <div className="pt-32 lg:pt-48 flex flex-col gap-16">
        {/* --- HERO HEADER --- */}
        <header className="px-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-6 border-b-2 border-zinc-100 dark:border-zinc-900 pb-12">
            <div className="flex items-center gap-3">
               <div className="px-3 py-1 bg-pink-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-pink-500/20">
                 Exclusive Update
               </div>
               <div className="flex items-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-widest">
                 <Activity size={14} className="text-purple-500 animate-pulse" /> Timika, Papua Tengah
               </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h1 className="text-[13vw] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-2 group">
                POP <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600 italic group-hover:from-purple-500 group-hover:to-pink-600 transition-all duration-500">NEWS.</span>
              </h1>

              <div className="flex gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
                <div className="pr-6 border-r border-zinc-200 dark:border-zinc-800">
                  <span className="block text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Mimika Weather</span>
                  <div className="flex items-center gap-2 font-black text-xl text-zinc-800 dark:text-white">
                    <CloudSun className="text-pink-500" size={20} /> 28°C
                  </div>
                </div>
                <div>
                  <span className="block text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Market Rate</span>
                  <div className="font-black text-xl text-green-500 flex items-center gap-1">
                    15.740 <Zap size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- CONTENT GRID --- */}
        <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-24">
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] mb-10 shadow-2xl shadow-purple-500/5">
                <img src={daftarBerita[0].gambar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Headline" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="flex items-center gap-2 mb-4">
                     <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase rounded-full tracking-widest">
                       {daftarBerita[0].kategori}
                     </span>
                     <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                       <Clock size={12} /> {daftarBerita[0].waktuBaca}
                     </span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-pink-400 transition-colors">
                     {daftarBerita[0].judul}
                   </h2>
                </div>
              </div>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mb-8">
                {daftarBerita[0].ringkasan}
              </p>
              <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest group-hover:gap-5 transition-all">
                Read Full Story <ArrowUpRight className="text-pink-500" />
              </button>
            </motion.article>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {daftarBerita.slice(1).map((berita, i) => (
                <div key={i} className="group cursor-pointer space-y-6">
                  <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <img src={berita.gambar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={berita.judul} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">{berita.kategori}</span>
                      <span className="text-[10px] font-bold text-zinc-400">{berita.tanggal}</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase leading-tight tracking-tighter group-hover:underline decoration-pink-500 underline-offset-4">
                      {berita.judul}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 blur-[80px] group-hover:bg-purple-500/30 transition-colors" />
               <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3 text-pink-500 border-b border-white/5 pb-4">
                 <TrendingUp size={18} /> Pop Trending
               </h3>
               <div className="space-y-10 relative z-10">
                 {[1, 2, 3].map((num) => (
                   <div key={num} className="flex gap-6 group/item cursor-pointer">
                     <span className="text-4xl font-black text-white/10 italic group-hover/item:text-pink-500/50 transition-colors">0{num}</span>
                     <h4 className="text-sm font-bold uppercase leading-tight group-hover/item:text-pink-300 transition-colors">
                       Update Rekrutmen Freeport 2026: Prioritas Tenaga Kerja Lokal Mimika
                     </h4>
                   </div>
                 ))}
               </div>
            </div>

            <div className="p-8 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-transparent">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Newsletter</h3>
               <p className="text-sm font-bold mb-6 italic">Dapatkan update POP VERSE langsung di email kamu.</p>
               <div className="relative">
                 <input type="text" placeholder="your@email.com" className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"/>
                 <button className="absolute right-2 top-2 bottom-2 px-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 transition-colors">
                   Join
                 </button>
               </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 pl-2">
                <Zap size={14} className="text-pink-500" fill="currentColor" /> Browse Topics
              </h3>
              <div className="flex flex-col gap-2">
                {["Regional Mimika", "Politik Papua", "Ekonomi Tambang", "Seni & Budaya", "Infrastruktur"].map((topic) => (
                  <button key={topic} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-transparent hover:border-pink-500/30 hover:bg-white dark:hover:bg-zinc-800 transition-all group">
                    <span className="text-sm font-black uppercase italic tracking-tighter">{topic}</span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:text-pink-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* --- FOOTER --- */}
      <footer className="relative mt-20 pt-24 pb-12 overflow-hidden border-t-2 border-zinc-100 dark:border-zinc-900 bg-white dark:bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            {/* Logo Section */}
            <div className="lg:col-span-2 space-y-8">
              <Link to="/" className="flex items-center gap-3 group cursor-pointer w-fit">
                <div className="relative w-14 h-14 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 shadow-xl">
                   <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                   <span className="relative z-10 text-white dark:text-zinc-900 group-hover:text-white font-black text-2xl">P</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black uppercase tracking-tighter leading-none dark:text-white text-zinc-900">
                    Pop <span className="text-pink-500 italic">Verse.</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Multiverse of Content</span>
                </div>
              </Link>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                Menghubungkan dinamika Papua Tengah dengan perspektif global. Wadah informasi, kreativitas, dan suara dari jantung timur Indonesia.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Navigation</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Movies", path: "/category/movies" },
                  { name: "Games", path: "/category/gaming" },
                  { name: "Tech", path: "/category/tech" },
                  { name: "About", path: "/about" }
                ].map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className="text-sm font-black uppercase italic text-zinc-600 dark:text-zinc-400 hover:text-pink-500 transition-all w-fit flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-pink-500 transition-all" /> 
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect Section */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Connect</h4>
              <div className="flex gap-4">
                {[Share2, Bookmark, Activity].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all shadow-lg text-zinc-600 dark:text-zinc-400">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Editorial Inquiry</span>
                <a href="mailto:hello@popverse.id" className="text-sm font-bold underline decoration-pink-500 underline-offset-4 hover:text-pink-500 transition-colors">
                  hello@popverse.id
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t dark:border-zinc-800 border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
              © 2026 POP VERSE MEDIA GROUP — ALL RIGHTS RESERVED
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <Link to="/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-pink-500 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Decorative Background Text */}
        <div className="absolute -bottom-10 left-0 right-0 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05]">
          <h2 className="text-[20vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap dark:text-white">
            POPVERSE POPVERSE POPVERSE
          </h2>
        </div>
      </footer>
    </div>
  );
}