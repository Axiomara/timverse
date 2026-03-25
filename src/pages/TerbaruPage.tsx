import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { 
  ArrowLeft, 
  Search, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Newspaper,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import TimikaNavbar from "../components/timika/TimikaNavbar";
import Footer from "../components/Footer";

const semuaBerita = [
  {
    id: 1,
    kategori: "Budaya",
    judul: "Festival Budaya Kamoro Kembali Digelar: Merayakan Seni Ukir yang Mendunia",
    ringkasan: "Karya seni ukir kayu yang ikonik akan dipamerkan sepanjang pesisir Mimika dalam perayaan tahunan yang sempat tertunda...",
    gambar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
    tanggal: "20 Feb 2026",
    waktuBaca: "4 menit",
    hot: true
  },
  {
    id: 2,
    kategori: "Infrastruktur",
    judul: "Perluasan Bandara Mozes Kilangin: Kapasitas Penumpang Naik Dua Lipat",
    ringkasan: "Pemerintah daerah menargetkan penyelesaian terminal baru pada akhir tahun ini untuk mendukung mobilitas udara...",
    gambar: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80",
    tanggal: "19 Feb 2026",
    waktuBaca: "6 menit",
    hot: false
  },
  {
    id: 3,
    kategori: "Ekonomi",
    judul: "Harga Pangan di Pasar Sentral Timika Stabil Menjelang Ramadhan",
    ringkasan: "Dinas Ketahanan Pangan memastikan stok beras dan minyak goreng mencukupi untuk kebutuhan warga Mimika hingga tiga bulan ke depan...",
    gambar: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80",
    tanggal: "18 Feb 2026",
    waktuBaca: "3 menit",
    hot: true
  }
];

const categories = ["Semua", "Ekonomi", "Budaya", "Infrastruktur", "Lingkungan", "Olahraga", "Regional"];

export default function TerbaruPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredBerita = useMemo(() => {
    return semuaBerita.filter(berita => {
      const matchCategory = activeCategory === "Semua" || berita.kategori === activeCategory;
      const matchSearch = berita.judul.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen relative flex flex-col bg-[#fafafa] dark:bg-[#050505] dark:text-zinc-100 text-zinc-900 transition-colors duration-500 selection:bg-pink-500 selection:text-white overflow-x-hidden">
      
      {/* --- ORNAMEN GRADIEN RAPI & SUBTLE --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-full max-w-[1000px] h-[300px] md:h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/15 via-pink-500/0 to-transparent pointer-events-none z-0" />

      <TimikaNavbar />

      <main className="relative z-10 w-full flex-grow max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col gap-6 mb-12 md:mb-20">
          <Link to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 hover:opacity-70 transition-all w-fit">
            <ArrowLeft size={14} /> Back
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
                Lates<span className="text-pink-500">t.</span>
              </h1>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Mimika Daily News Feed</p>
            </div>

            <div className="relative w-full md:w-80 group">
              <input 
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl md:rounded-full py-4 pl-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all font-medium border-none"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-pink-500" size={18} />
            </div>
          </div>
        </div>

        <div className="relative z-40 mb-12 md:mb-16">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full md:w-64 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-6 py-4 rounded-2xl shadow-sm hover:border-pink-500 transition-all"
          >
            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
              Category: <span className="text-pink-500 ml-2">{activeCategory}</span>
            </span>
            <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <>
                {/* Overlay to close dropdown */}
                <div className="fixed inset-0 z-[-1]" onClick={() => setIsDropdownOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 w-full md:w-64 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                        activeCategory === cat 
                          ? "bg-pink-500 text-white" 
                          : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-pink-500"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* --- BERITA LIST --- */}
        <div className="space-y-12 md:space-y-24">
          <AnimatePresence mode="popLayout">
            {filteredBerita.length > 0 ? (
              filteredBerita.map((berita, idx) => (
                <motion.article
                  key={berita.id}
                  layout="position"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
                >
                  {/* Number - Hidden on mobile */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center pt-2">
                    <span className="text-6xl font-black text-zinc-100 dark:text-zinc-900 group-hover:text-pink-500 transition-colors duration-500 italic">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Image Area */}
                  <div className="col-span-1 md:col-span-5 lg:col-span-4 relative">
                    <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 aspect-[16/10] md:aspect-[4/3]">
                      <img 
                        src={berita.gambar} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        alt={berita.judul}
                        loading="lazy"
                      />
                    </div>
                    {berita.hot && (
                      <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-pink-500 text-white p-3 md:p-4 rounded-full shadow-lg shadow-pink-500/30">
                        <TrendingUp size={14} className="md:hidden" />
                        <TrendingUp size={18} className="hidden md:block" />
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="col-span-1 md:col-span-7 lg:col-span-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-pink-500 bg-pink-50 dark:bg-pink-500/10 px-3 py-1 rounded-lg">
                        {berita.kategori}
                      </span>
                      <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={12} /> {berita.waktuBaca}
                      </span>
                    </div>

                    <Link to={`/news/${berita.id}`}>
                      <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] md:leading-none mb-4 md:mb-6 group-hover:text-pink-500 transition-colors">
                        {berita.judul}
                      </h2>
                    </Link>

                    <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium line-clamp-2 md:line-clamp-3 mb-6">
                      {berita.ringkasan}
                    </p>

                    <div className="flex items-center justify-between md:justify-start md:gap-6 pt-4 border-t border-zinc-50 dark:border-zinc-900">
                        <span className="text-[9px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">{berita.tanggal}</span>
                        <Link to={`/news/${berita.id}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 md:hover:translate-x-2 transition-transform">
                            Read More <ChevronRight size={14} />
                        </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="py-32 text-center opacity-30">
                <Newspaper size={64} className="mx-auto mb-6" />
                <h3 className="text-xl font-black uppercase tracking-widest">No matching news</h3>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* --- MOBILE OPTIMIZED PAGINATION --- */}
        <div className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-3">
                {[1, 2, 3].map(n => (
                    <button key={n} className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-black text-[10px] transition-all ${n === 1 ? 'bg-pink-500 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400'}`}>
                        {n}
                    </button>
                ))}
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-pink-500 dark:hover:bg-pink-500 hover:text-white transition-all">
                Next Archive
            </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}