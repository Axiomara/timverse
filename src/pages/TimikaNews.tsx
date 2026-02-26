import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, Activity, ChevronRight, Zap, Flame, Calendar,
  Sun, Wind, Droplets, MapPin, Clock, Globe, Cloud, Moon
} from "lucide-react";

// Components (Pastikan path sesuai dengan project Anda)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- MOCK DATA ---
const DAFTAR_BERITA = [
  {
    id: 1,
    kategori: "Lingkungan",
    judul: "Restorasi Gletser Carstensz: Harapan Baru di Puncak Tertinggi Papua",
    ringkasan: "Para ahli lingkungan mulai memetakan langkah-langkah darurat untuk menjaga sisa salju abadi yang kian menyusut di pegunungan tengah...",
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    tanggal: "24 Feb 2026",
    readTime: "6 min read",
    isPopular: true
  },
  {
    id: 2,
    kategori: "Ekonomi",
    judul: "Transformasi Grasberg: Menuju Operasi Tambang Bawah Tanah Terbesar Dunia",
    ringkasan: "PT Freeport Indonesia mencatatkan rekor efisiensi baru dalam operasional tambang bawah tanah mereka yang sangat kompleks di Mimika...",
    gambar: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80",
    tanggal: "22 Feb 2026",
    readTime: "8 min read",
    isPopular: true
  },
  {
    id: 3,
    kategori: "Budaya",
    judul: "Festival Budaya Kamoro Kembali Digelar: Merayakan Seni Ukir yang Mendunia",
    ringkasan: "Karya seni ukir kayu yang ikonik akan dipamerkan sepanjang pesisir Mimika dalam perayaan tahunan yang sempat tertunda...",
    gambar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
    tanggal: "20 Feb 2026",
    readTime: "4 min read",
    isNew: true
  },
  {
    id: 4,
    kategori: "Infrastruktur",
    judul: "Perluasan Bandara Mozes Kilangin: Kapasitas Penumpang Naik Dua Lipat",
    ringkasan: "Pemerintah daerah menargetkan penyelesaian terminal baru pada akhir tahun ini untuk mendukung mobilitas udara...",
    gambar: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80",
    tanggal: "19 Feb 2026",
    readTime: "5 min read",
    isNew: true
  }
];

export default function TimikaNews() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [weather, setWeather] = useState({ temp: 28, condition: 'Clear', humidity: 80, wind: 5, loading: true });

  const beritaPopuler = useMemo(() => DAFTAR_BERITA.filter(b => b.isPopular), []);
  const beritaTerbaru = useMemo(() => DAFTAR_BERITA.filter(b => b.isNew), []);

  useEffect(() => {
    const timer = setTimeout(() => setWeather(prev => ({ ...prev, loading: false })), 1000);
    return () => clearTimeout(timer);
  }, []);

  

  const WeatherWidget = () => {

  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;

  
  const getWeatherIcon = () => {
    if (weather.loading) return <Sun className="text-zinc-300 animate-pulse" size={32} />;
    
    
    if (isNight) {
      return <Moon className="text-indigo-400" size={32} />;
    }
    
    
    if (weather.condition.toLowerCase().includes('cloud')) {
      return <Cloud className="text-zinc-400" size={32} />;
    }
    
    return <Sun className="text-amber-500" size={32} />;
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm group transition-all duration-500 hover:shadow-xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <MapPin size={12} className="text-pink-500" /> Timika, ID
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
              {isNight ? "Night Mode" : "Live Data"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-6xl font-black tracking-tighter tabular-nums leading-none">
              {weather.loading ? "--" : `${weather.temp}°`}
            </span>
            <p className="text-[10px] font-black uppercase text-zinc-500 mt-2 tracking-[0.2em]">
              {weather.condition}
            </p>
          </div>
          
          {/* Container Ikon dengan warna background yang menyesuaikan waktu */}
          <div className={`p-4 rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-inner ${
            isNight ? 'bg-indigo-500/10' : 'bg-amber-500/10'
          }`}>
            {getWeatherIcon()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800">
          <div className="space-y-1">
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Humidity</p>
            <p className="text-xs font-bold flex items-center gap-1">
              <Droplets size={10} className="text-blue-500" /> {weather.humidity}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Wind Speed</p>
            <p className="text-xs font-bold flex items-center gap-1">
              <Wind size={10} className="text-teal-500" /> {weather.wind} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

  const TrendingWidget = () => (
    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8 group transition-all duration-500 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-50 dark:border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-pink-500/10 rounded-lg">
            <TrendingUp size={14} className="text-pink-500" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Trending Now</h3>
        </div>
        <Activity size={12} className="text-zinc-300 animate-pulse" />
      </div>
      <div className="space-y-1">
        {['Jadwal Penerbangan Kilangin', 'Harga Sagu Mimika', 'Loker Freeport 2026', 'Info Pemadaman PLN'].map((item, i) => (
          <div key={i} className="group/item cursor-pointer flex items-center gap-5 p-3 -mx-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300">
            <span className="text-2xl font-black text-zinc-100 dark:text-zinc-800 group-hover/item:text-pink-500 transition-colors italic tracking-tighter">0{i + 1}</span>
            <p className="text-[11px] font-bold uppercase leading-tight text-zinc-700 dark:text-zinc-300 group-hover/item:translate-x-1 transition-transform truncate">{item}</p>
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover/item:opacity-100 text-pink-500 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );

  const FlashNewsWidget = () => (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900 dark:bg-white text-white dark:text-black border border-zinc-800 dark:border-zinc-100 shadow-sm relative overflow-hidden group transition-all duration-500 hover:shadow-xl">
      <div className="relative z-10 space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 dark:border-black/5 pb-5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-pink-500 rounded-lg">
              <Zap size={14} fill="currentColor" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Flash News</h3>
          </div>
          <div className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
        </div>
        <div className="space-y-6">
          {[
            { jam: "14:20", teks: "Pawai budaya di Jalan Cenderawasih dimulai sore ini." },
            { jam: "12:05", teks: "Stok sagu di Pasar Sentral dilaporkan melimpah." },
            { jam: "09:45", teks: "Perbaikan pipa air di area SP2 selesai tepat waktu." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 group/news cursor-pointer">
              <span className="text-[10px] font-black opacity-30 tabular-nums">{item.jam}</span>
              <p className="text-[11px] font-bold leading-relaxed opacity-80 group-hover/news:opacity-100 group-hover/news:text-pink-500 transition-all">{item.teks}</p>
            </div>
          ))}
        </div>
        <button className="w-full py-4 bg-white/5 dark:bg-black/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 dark:border-black/5 hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all">
          View Live Feed
        </button>
      </div>
      <Globe size={180} className="absolute -right-12 -bottom-12 opacity-[0.05] dark:opacity-[0.03] animate-spin-slow pointer-events-none" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 selection:bg-pink-500 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-pink-500 origin-left z-[200]" style={{ scaleX }} />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <header className="pt-32 md:pt-48 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-[10px] uppercase tracking-[0.4em]">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            Suara Akar Rumput Mimika
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-zinc-200 dark:border-zinc-800 pb-16">
            <h1 className="text-[15vw] lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase select-none">
              MIMIK<span className="italic text-zinc-200 dark:text-zinc-800 transition-colors duration-700">A</span><span className="text-pink-500">.</span>
            </h1>
            <div className="lg:mb-4 space-y-2 lg:text-right">
              <div className="flex items-center lg:justify-end gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                <Calendar size={14} className="text-pink-500" /> {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <p className="text-sm italic opacity-50 font-medium tracking-tight italic">Highlighting the spirit of the highlands.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-12">
        
        {/* --- MOBILE WEATHER --- */}
        <div className="lg:hidden">
          <WeatherWidget />
        </div>

        {/* --- LEFT: MAIN FEED --- */}
        <div className="lg:col-span-8 space-y-24">
          <section className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg"><Flame size={18} className="text-orange-500" /></div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em]">Editor's Choice</h2>
            </div>

            <div className="space-y-20">
              {beritaPopuler.map((berita) => (
                <article key={berita.id} className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 aspect-video relative shadow-2xl shadow-black/5">
                    <img src={berita.gambar} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={berita.judul} />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[9px] font-black uppercase rounded-full tracking-widest">{berita.kategori}</span>
                    </div>
                  </div>
                  <div className="md:col-span-5 space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      <Clock size={12} className="text-pink-500" /> {berita.readTime}
                    </div>
                    <h3 className="text-3xl font-black leading-[1.1] group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors uppercase tracking-tight">
                      <Link to={`/news/${berita.id}`}>{berita.judul}</Link>
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed font-medium">{berita.ringkasan}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Immersive Banner */}
                  <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] group shadow-2xl">
          {/* Image dengan Zoom Effect */}
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
            alt="banner" 
          />

          {/* Gradient Overlay: Di mobile lebih gelap di bawah, di desktop lebih gelap di kiri */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/20 md:to-transparent" />

          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-8 md:p-16 gap-4 md:gap-6">
            
            {/* Label */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-pink-500/20 backdrop-blur-md rounded-lg">
                <Globe size={12} className="text-pink-500 animate-spin-slow" />
              </div>
              <span className="text-pink-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                Discovery Series
              </span>
            </div>

            {/* Title: Ukuran menyesuaikan layar */}
            <h4 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] md:leading-none uppercase tracking-tighter max-w-sm md:max-w-xl">
              Lorentz: <br className="hidden md:block" /> 
              The Hidden <span className="text-pink-500">Emerald</span>
            </h4>

            {/* Button: Full width di mobile kecil, fit content di desktop */}
            <button className="w-full md:w-fit px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl md:rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-500 shadow-xl active:scale-95">
              Explore Story
            </button>
          </div>
        </div>

          {/* Latest Feed */}
          <section className="space-y-12">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/10 rounded-lg"><Zap size={18} className="text-pink-500" /></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em]">Fresh Updates</h2>
              </div>
              <Link to="/news" className="text-[10px] font-bold uppercase text-zinc-400 hover:text-pink-500 transition-colors flex items-center gap-1 tracking-widest">All Stories <ChevronRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {beritaTerbaru.map((berita) => (
                <Link to={`/news/${berita.id}`} key={berita.id} className="group space-y-6">
                  <div className="aspect-[16/10] overflow-hidden rounded-[2rem] border border-transparent dark:border-zinc-800/50">
                    <img src={berita.gambar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={berita.judul} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">{berita.tanggal}</span>
                       <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                       <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Mimika</span>
                    </div>
                    <h4 className="text-xl font-black leading-snug group-hover:text-pink-500 transition-colors uppercase tracking-tight">{berita.judul}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* --- RIGHT: SIDEBAR (BENTO) --- */}
        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-8">
            <div className="hidden lg:block"><WeatherWidget /></div>
            <TrendingWidget />
            <FlashNewsWidget />
          </div>
        </aside>
      </main>

      <Footer />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}