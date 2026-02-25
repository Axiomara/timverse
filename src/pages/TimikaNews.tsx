import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, Activity, ChevronRight,
  Zap, Flame, Calendar,
  CloudRain, Sun, Cloud, Wind, Droplets,
  MapPin, Clock, Globe
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
const ArrowUpRight = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17"/>
  </svg>
);

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case 'Rain': return <CloudRain className="text-blue-500" size={20} />;
    case 'Clouds': return <Cloud className="text-zinc-400" size={20} />;
    default: return <Sun className="text-amber-500" size={20} />;
  }
};

export default function TimikaNews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [weather, setWeather] = useState<WeatherState>({ 
    temp: 28, condition: 'Clear', humidity: 80, wind: 5, loading: true 
  });

  const beritaPopuler = useMemo(() => DAFTAR_BERITA.filter(b => b.isPopular), []);
  const beritaTerbaru = useMemo(() => DAFTAR_BERITA.filter(b => b.isNew), []);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=-4.65&lon=136.46&appid=${API_KEY}&units=metric`;

      if (!API_KEY) {
        setTimeout(() => setWeather(prev => ({ ...prev, loading: false })), 1000);
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
        setWeather(prev => ({ ...prev, loading: false }));
      }
    };
    fetchWeather();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#080808] dark:text-zinc-100 text-zinc-900 selection:bg-pink-500 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 origin-left z-[130]" style={{ scaleX }} />
      <Navbar />

      <div className="pt-32 md:pt-44 flex flex-col gap-16">
        
        {/* --- HERO HEADER --- */}
        <header className="px-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Mimika Pulse Live</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-zinc-100 dark:border-zinc-900 pb-12">
              <h1 className="text-[15vw] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.8]">
                MIMIK<span className="text-zinc-200 dark:text-zinc-800 italic">A</span><span className="text-pink-500">.</span>
              </h1>
              
              <div className="flex flex-col items-start lg:items-end gap-2 text-zinc-400">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                  <Calendar size={14} className="text-pink-500"/>
                  {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <p className="text-sm font-medium italic opacity-60">Insight lokal, perspektif global.</p>
              </div>
            </div>
          </div>
        </header>

        {/* --- GRID CONTENT --- */}
        <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          
          {/* Main Stories */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Featured Article */}
            <section>
              <div className="flex items-center gap-3 mb-10">
                <Flame size={20} className="text-orange-500" fill="currentColor" />
                <h2 className="text-xl font-black uppercase tracking-widest">Top Stories</h2>
              </div>
              
              <div className="grid gap-20">
                {beritaPopuler.map((berita) => (
                  <motion.article 
                    key={berita.id} 
                    className="group grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="md:col-span-6 overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 aspect-[16/10]">
                      <img src={berita.gambar} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={berita.judul} />
                    </div>
                    <div className="md:col-span-6 space-y-4">
                      <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{berita.kategori}</span>
                      <h3 className="text-3xl font-black leading-tight group-hover:underline decoration-pink-500 underline-offset-8 transition-all">
                        <Link to={`/news/${berita.id}`}>{berita.judul}</Link>
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
                        {berita.ringkasan}
                      </p>
                      <Link to={`/news/${berita.id}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:text-pink-500 transition-colors">
                        Read Story <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Visual Break / Banner */}
            <section className="relative h-[400px] rounded-[3rem] overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt="Banner" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 space-y-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-black uppercase text-white tracking-widest">Deep Dive</span>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none max-w-xl">
                    Jantung Papua: Menjaga Keseimbangan Mimika
                  </h3>
               </div>
            </section>

            {/* Latest Grid */}
            <section className="space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-pink-500" fill="currentColor" />
                  <h2 className="text-xl font-black uppercase tracking-widest">Latest</h2>
                </div>
                <Link to="/news" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-500 transition-colors">See all</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {beritaTerbaru.map((berita) => (
                  <Link to={`/news/${berita.id}`} key={berita.id} className="group space-y-5">
                    <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      <img src={berita.gambar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={berita.judul} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <span>{berita.tanggal}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-800" />
                        <span>5 min read</span>
                      </div>
                      <h4 className="text-lg font-black leading-snug group-hover:text-pink-500 transition-colors uppercase">
                        {berita.judul}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              
              {/* Bento Card: Weather */}
              <div className="p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 overflow-hidden relative group">
                <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-pink-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Timika, Papua</span>
                    </div>
                    {weather.loading ? (
                      <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">via: geo.com</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-6xl font-black tracking-tighter">{weather.temp}°</span>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{weather.condition}</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm">
                      <WeatherIcon condition={weather.condition} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Droplets size={16} className="text-blue-500" />
                      <div>
                        <p className="text-[8px] font-black text-zinc-400 uppercase">Humidity</p>
                        <p className="text-xs font-bold">{weather.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wind size={16} className="text-teal-500" />
                      <div>
                        <p className="text-[8px] font-black text-zinc-400 uppercase">Wind</p>
                        <p className="text-xs font-bold">{weather.wind} m/s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Card: Trending List */}
              <div className="p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-900">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-2">
                  <TrendingUp size={14} /> Trending Topics
                </h3>
                <div className="space-y-6">
                  {['Pembangunan Smelter', 'Pariwisata Lorentz', 'Grasberg Update'].map((topic, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <span className="text-xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-pink-500 transition-colors">0{i+1}</span>
                      <p className="text-[11px] font-black uppercase leading-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {topic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento Card: Tag Cloud */}
              <div className="p-8 rounded-[2.5rem] bg-zinc-950 text-white">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Popular Tags</h3>
                 <div className="flex flex-wrap gap-2">
                    {['Freeport', 'Papua', 'Kuala Kencana', 'Kamoro'].map(tag => (
                       <button key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                          #{tag}
                       </button>
                    ))}
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