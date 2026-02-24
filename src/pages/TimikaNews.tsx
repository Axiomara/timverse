import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, Activity, ChevronRight,
  Zap, Flame, Calendar,
  CloudRain, Sun, Cloud, Wind, Droplets
} from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- TYPES ---
interface WeatherState {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  loading: boolean;
}

// --- MOCK DATA ---
const DAFTAR_BERITA = [
  {
    id: 1,
    kategori: "Lingkungan",
    judul: "Restorasi Gletser Carstensz: Harapan Baru di Puncak Tertinggi Papua",
    ringkasan: "Para ahli lingkungan mulai memetakan langkah-langkah darurat untuk menjaga sisa salju abadi yang kian menyusut di pegunungan tengah...",
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    tanggal: "24 Feb 2026",
    isPopular: true
  },
  {
    id: 2,
    kategori: "Ekonomi",
    judul: "Transformasi Grasberg: Menuju Operasi Tambang Bawah Tanah Terbesar Dunia",
    ringkasan: "PT Freeport Indonesia mencatatkan rekor efisiensi baru dalam operasional tambang bawah tanah mereka yang sangat kompleks di Mimika...",
    gambar: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80",
    tanggal: "22 Feb 2026",
    isPopular: true
  },
  {
    id: 3,
    kategori: "Budaya",
    judul: "Festival Budaya Kamoro Kembali Digelar: Merayakan Seni Ukir yang Mendunia",
    ringkasan: "Karya seni ukir kayu yang ikonik akan dipamerkan sepanjang pesisir Mimika dalam perayaan tahunan yang sempat tertunda...",
    gambar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
    tanggal: "20 Feb 2026",
    isNew: true
  },
  {
    id: 4,
    kategori: "Infrastruktur",
    judul: "Perluasan Bandara Mozes Kilangin: Kapasitas Penumpang Naik Dua Lipat",
    ringkasan: "Pemerintah daerah menargetkan penyelesaian terminal baru pada akhir tahun ini untuk mendukung mobilitas udara...",
    gambar: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80",
    tanggal: "19 Feb 2026",
    isNew: true
  }
];

// --- SUB-COMPONENTS ---
const ArrowUpRight = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17"/>
  </svg>
);

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case 'Rain': return <CloudRain className="text-blue-500" size={24} />;
    case 'Clouds': return <Cloud className="text-zinc-400" size={24} />;
    default: return <Sun className="text-amber-500" size={24} />;
  }
};

export default function TimikaNews() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Weather State
  const [weather, setWeather] = useState<WeatherState>({ 
    temp: 28, condition: 'Clear', humidity: 80, wind: 5, loading: true 
  });

  // Filter Berita (Memoized for performance)
  const beritaPopuler = useMemo(() => DAFTAR_BERITA.filter(b => b.isPopular), []);
  const beritaTerbaru = useMemo(() => DAFTAR_BERITA.filter(b => b.isNew), []);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=-4.65&lon=136.46&appid=${API_KEY}&units=metric`;

      if (!API_KEY) {
        setWeather(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const response = await fetch(URL);
        const data = await response.json();
        if (response.ok) {
          setWeather({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            loading: false
          });
        }
      } catch (error) {
        console.error("Weather error:", error);
        setWeather(prev => ({ ...prev, loading: false }));
      }
    };
    fetchWeather();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#050505] dark:text-zinc-100 text-zinc-900 selection:bg-pink-500 selection:text-white transition-colors duration-500">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-pink-500 origin-left z-[130]" style={{ scaleX }} />
      <Navbar />

      <div className="pt-32 md:pt-48 flex flex-col gap-20">
        
        {/* --- HEADER --- */}
        <header className="px-6 max-w-7xl mx-auto w-full">
          <div className="border-b-2 border-zinc-100 dark:border-zinc-900 pb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-3 py-1 bg-pink-500 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-lg shadow-pink-500/20">
                    Live Update
                  </span>
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-[11px] uppercase tracking-widest">
                    <Activity size={14} className="text-pink-500 animate-pulse" /> Mimika Reg.
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-zinc-400 font-bold text-[11px] uppercase tracking-widest border-l pl-4 border-zinc-200 dark:border-zinc-800">
                    <Calendar size={14} /> {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </div>
                </div>
                <h1 className="text-[16vw] lg:text-[11rem] font-black tracking-tighter uppercase leading-[0.75] transition-all">
                  MIMIK<span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600 italic">A.</span>
                </h1>
              </div>

              {/* Weather Widget */}
              <div className="flex items-center gap-6 p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl hover:border-pink-500/30 transition-all duration-500 group">
                <div className="pr-6 border-r border-zinc-200 dark:border-zinc-800">
                  <span className="block text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">Local Temp</span>
                  <div className="flex items-center gap-3 font-black text-3xl">
                    {weather.loading ? (
                      <div className="w-16 h-8 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-lg" />
                    ) : (
                      <>
                        <WeatherIcon condition={weather.condition} />
                        <span>{weather.temp}°C</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="block text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">Atmosphere</span>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-600 dark:text-zinc-400">
                      <Droplets size={14} className="text-blue-500"/> {weather.humidity}%
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-600 dark:text-zinc-400">
                      <Wind size={14} className="text-teal-500"/> {weather.wind}m/s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- CONTENT --- */}
        <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          <div className="lg:col-span-8 space-y-24">
            {/* Trending Section */}
            <section className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-pink-500/10 rounded-xl">
                  <Flame className="text-pink-500" size={26} fill="currentColor" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Trending Now</h2>
              </div>

              <div className="grid gap-16">
                {beritaPopuler.map((berita) => (
                  <motion.article 
                    key={berita.id} 
                    className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="md:col-span-5 aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 shadow-2xl">
                      <img src={berita.gambar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={berita.judul} />
                    </div>
                    <div className="md:col-span-7 space-y-5">
                      <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em]">{berita.kategori}</span>
                      <h3 className="text-3xl font-black uppercase leading-[1.1] group-hover:text-pink-500 transition-colors duration-300">
                        <Link to={`/news/${berita.id}`}>{berita.judul}</Link>
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                        {berita.ringkasan}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Editorial Banner */}
            <section className="bg-zinc-950 text-white rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden group">
               <div className="relative z-10 space-y-8 max-w-2xl">
                  <span className="text-pink-500 font-black text-[11px] uppercase tracking-[0.4em]">Feature Story</span>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                    Menelusuri Jejak Karbon di Hutan Tropis Mimika
                  </h3>
                  <button className="flex items-center gap-4 bg-white text-black px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all duration-500 shadow-xl shadow-black/20">
                    Explore Deep Dive <ArrowUpRight size={18}/>
                  </button>
               </div>
               <div className="absolute top-0 right-0 w-full md:w-3/4 h-full opacity-30 md:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Editorial" />
               </div>
            </section>

            {/* Latest Stories */}
            <section className="space-y-12">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-pink-500/10 rounded-xl">
                    <Zap className="text-pink-500" size={26} fill="currentColor" />
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Latest Stories</h2>
                </div>
                <Link to="/terbaru" className="group text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-pink-500 flex items-center gap-2 transition-all">
                  View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {beritaTerbaru.map((berita) => (
                  <div key={berita.id} className="group cursor-pointer">
                    <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-6 border border-zinc-100 dark:border-zinc-900">
                      <img src={berita.gambar} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={berita.judul} />
                    </div>
                    <div className="space-y-3 px-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{berita.tanggal}</span>
                      <h4 className="text-xl font-black uppercase leading-tight group-hover:text-pink-500 transition-colors">
                        <Link to={`/news/${berita.id}`}>{berita.judul}</Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-12">
              
              {/* Hot Topics */}
              <div className="p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3 text-zinc-400">
                  <TrendingUp size={18} className="text-pink-500" /> Hot Topics
                </h3>
                <div className="space-y-10">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex gap-6 group cursor-pointer items-start">
                        <span className="text-4xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-pink-500 transition-colors italic leading-none">0{i}</span>
                        <p className="text-xs font-black uppercase leading-snug group-hover:text-pink-500 transition-colors">
                          Pembangunan Smelter Baru di Kawasan Industri Manyar Mimika
                        </p>
                     </div>
                   ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-10 rounded-[3rem] bg-pink-500 text-white shadow-3xl shadow-pink-500/30 relative overflow-hidden group">
                <Zap className="absolute -right-6 -top-6 w-40 h-40 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 relative z-10">Mimika Daily</h3>
                <p className="text-lg font-bold mb-8 leading-tight relative z-10">
                  Dapatkan ringkasan berita terpenting langsung ke email Anda.
                </p>
                <div className="space-y-4 relative z-10">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full px-7 py-5 rounded-2xl bg-white/10 border border-white/20 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all backdrop-blur-md" 
                  />
                  <button className="w-full py-5 bg-white text-pink-500 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all duration-300">
                    Subscribe Now
                  </button>
                </div>
              </div>

            </div>
          </aside>
        </main>
      </div>
      <Footer />
    </div>
  );
}