import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, Activity, ChevronRight, Zap, Flame, Calendar,
  Sun, Wind, Droplets, MapPin, Clock, Globe, Cloud, Moon, ArrowRight, Filter
} from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { TIMIKA_PULSE_POSTS } from "../data/tim_posts";

// --- WIDGETS (Memoized untuk Performa) ---
const WeatherWidget = memo(({ weather }: any) => {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;

  const getWeatherIcon = () => {
    if (weather.loading) return <Sun className="text-zinc-300 animate-pulse" size={32} />;
    if (isNight) return <Moon className="text-indigo-400" size={32} />;
    if (weather.condition.toLowerCase().includes('cloud')) return <Cloud className="text-zinc-400" size={32} />;
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
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Live Data</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-6xl font-black tracking-tighter tabular-nums leading-none">
              {weather.loading ? "--" : `${weather.temp}°`}
            </span>
            <p className="text-[10px] font-black uppercase text-zinc-500 mt-2 tracking-[0.2em]">{weather.condition}</p>
          </div>
          <div className={`p-4 rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-inner ${isNight ? 'bg-indigo-500/10' : 'bg-amber-500/10'}`}>
            {getWeatherIcon()}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-50 dark:border-zinc-800">
          <div className="space-y-1">
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Humidity</p>
            <p className="text-xs font-bold flex items-center gap-1"><Droplets size={10} className="text-blue-500" /> {weather.humidity}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Wind Speed</p>
            <p className="text-xs font-bold flex items-center gap-1"><Wind size={10} className="text-teal-500" /> {weather.wind} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function TimikaNews() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [weather, setWeather] = useState({ temp: 28, condition: 'Clear', humidity: 80, wind: 5, loading: true });
  
  // --- STATE FILTER ---
  const [activeCategory, setActiveCategory] = useState("All");

  // Mendapatkan kategori unik secara dinamis dari data
  const categories = useMemo(() => {
    return ["All", ...new Set(TIMIKA_PULSE_POSTS.map(post => post.category))];
  }, []);

  // Filter Postingan berdasarkan kategori
  const filteredPosts = useMemo(() => {
    return activeCategory === "All" 
      ? TIMIKA_PULSE_POSTS 
      : TIMIKA_PULSE_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  const heroPost = useMemo(() => filteredPosts.length > 0 ? filteredPosts[0] : null, [filteredPosts]);
  const featuredPosts = useMemo(() => filteredPosts.slice(1, 3), [filteredPosts]);
  const gridPosts = useMemo(() => filteredPosts.slice(3, 6), [filteredPosts]);
  const listPosts = useMemo(() => filteredPosts.slice(6), [filteredPosts]);
  useEffect(() => {
    const timer = setTimeout(() => setWeather(prev => ({ ...prev, loading: false })), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-pink-500 selection:text-white overflow-x-hidden transition-colors duration-700">
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-pink-500 origin-left z-[200]" style={{ scaleX }} />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-32 md:pt-48 px-6 max-w-7xl mx-auto"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-[10px] uppercase tracking-[0.4em]">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            Mimika Local Pulse
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-zinc-200 dark:border-zinc-800 pb-16">
            <h1 className="text-[14vw] lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase select-none">
              TIMIK<span className="text-zinc-200 dark:text-zinc-800">A</span><span className="text-pink-500">.</span>
            </h1>
            <div className="lg:mb-4 space-y-2 lg:text-right">
              <div className="flex items-center lg:justify-end gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                <Calendar size={14} className="text-pink-500" /> 
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <p className="text-sm opacity-50 font-medium tracking-tight">Highlighting the spirit of the highlands.</p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* --- CATEGORY FILTER BAR --- */}
      <nav className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 mr-4 text-zinc-400">
            <Filter size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat 
                ? "bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-500/20" 
                : "bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-pink-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* --- MAIN FEED --- */}
          <div className="lg:col-span-8 space-y-24">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredPosts.length > 0 ? (
                  <div className="space-y-24">
                    
                    {/* --- 1. HERO HIGHLIGHT --- */}
                    {heroPost && (
                      <section className="relative rounded-[3rem] overflow-hidden aspect-[4/5] md:aspect-[21/9] group shadow-2xl">
                        <img src={heroPost.image} alt={heroPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-pink-500 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-xl shadow-pink-500/20">Sorotan Utama</span>
                            <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest">{heroPost.category}</span>
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight line-clamp-3">
                            <Link to={`/article/${heroPost.slug}`} className="hover:text-pink-400 transition-colors">
                              {heroPost.title} {heroPost.titleAccent}
                            </Link>
                          </h2>
                          <p className="text-sm md:text-base text-zinc-300 line-clamp-2 max-w-2xl font-medium">{heroPost.excerpt}</p>
                        </div>
                      </section>
                    )}

                    {/* --- 2. EDITOR'S CHOICE --- */}
                    {featuredPosts.length > 0 && (
                      <section className="space-y-12">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500/10 rounded-lg"><Flame size={18} className="text-orange-500" /></div>
                          <h2 className="text-xs font-black uppercase tracking-[0.3em]">
                            {activeCategory === "All" ? "Pilihan Redaksi" : `Top in ${activeCategory}`}
                          </h2>
                        </div>

                        <div className="space-y-16">
                          {featuredPosts.map((post) => (
                            <motion.article 
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              key={post.slug} 
                              className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
                            >
                              <Link to={`/article/${post.slug}`} className="md:col-span-7 block overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 aspect-video relative shadow-2xl shadow-black/5">
                                <img src={post.image} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title} />
                                <div className="absolute top-6 left-6">
                                  <span className="px-4 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[9px] font-black uppercase rounded-full tracking-widest text-zinc-900 dark:text-white border border-white/20">
                                    {post.category}
                                  </span>
                                </div>
                              </Link>
                              <div className="md:col-span-5 space-y-4 pt-2">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                  <Clock size={12} className="text-pink-500" /> {post.readTime}
                                </div>
                                <h3 className="text-3xl font-black leading-[1.1] group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors uppercase tracking-tight">
                                  <Link to={`/article/${post.slug}`}>
                                    {post.title} <br />
                                    <span className="text-zinc-300 dark:text-zinc-700">{post.titleAccent}</span>
                                  </Link>
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed font-medium">
                                  {post.excerpt}
                                </p>
                              </div>
                            </motion.article>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* --- 3. KILAS MIMIKA (GRID) --- */}
                    {gridPosts.length > 0 && (
                      <section className="space-y-12">
                        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-500/10 rounded-lg"><Zap size={18} className="text-pink-500" /></div>
                            <h2 className="text-xs font-black uppercase tracking-[0.3em]">Kilas Mimika</h2>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {gridPosts.map((post) => (
                            <Link to={`/article/${post.slug}`} key={post.slug} className="group space-y-6 flex flex-col h-full">
                              <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-transparent dark:border-zinc-800/50 shadow-sm relative">
                                <img src={post.image} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                              </div>
                              <div className="space-y-3 flex-grow">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">{post.category}</span>
                                </div>
                                <h4 className="text-xl font-black leading-snug group-hover:text-pink-500 transition-colors uppercase tracking-tight line-clamp-3">
                                  {post.title} {post.titleAccent}
                                </h4>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* --- 4. TERBARU POPULER (LIST) --- */}
                    {listPosts.length > 0 && (
                      <section className="space-y-8 pt-12 border-t border-zinc-100 dark:border-zinc-800">
                         <div className="flex items-center gap-3 mb-8">
                            <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Terbaru Mingguan</h2>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {listPosts.map((post) => (
                              <Link to={`/article/${post.slug}`} key={post.slug} className="group flex items-center gap-6 p-4 -mx-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 shadow-sm">
                                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">{post.category}</span>
                                  <h4 className="text-lg font-black leading-tight uppercase group-hover:text-pink-500 transition-colors line-clamp-2">
                                     {post.title} {post.titleAccent}
                                  </h4>
                                  <span className="text-[10px] text-zinc-400 font-bold uppercase">{post.date}</span>
                                </div>
                              </Link>
                            ))}
                         </div>
                      </section>
                    )}

                  </div>
                ) : (
                  /* --- EMPTY STATE --- */
                  <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-zinc-50 dark:bg-zinc-900/30 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-full shadow-xl">
                      <Globe size={48} className="text-zinc-200 dark:text-zinc-700 animate-spin-slow" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tighter">No Articles Found</h3>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Kategori {activeCategory} sedang dalam tahap liputan.</p>
                    </div>
                    <button 
                      onClick={() => setActiveCategory("All")}
                      className="text-pink-500 text-[10px] font-black uppercase tracking-widest hover:underline"
                    >
                      Kembali ke Semua Berita
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <WeatherWidget weather={weather} />
              
              {/* Trending Widget */}
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8 group transition-all duration-500 hover:shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-50 dark:border-zinc-800 pb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-pink-500/10 rounded-lg"><TrendingUp size={14} className="text-pink-500" /></div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Trending Now</h3>
                  </div>
                  <Activity size={12} className="text-zinc-300 animate-pulse" />
                </div>
                <div className="space-y-1">
                  {['Info Bandara Mozes', 'Karya Ukir Kamoro', 'Harga Pasar Sentral', 'Festival Budaya 2026'].map((item, i) => (
                    <div key={i} className="group/item cursor-pointer flex items-center gap-5 p-3 -mx-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300">
                      <span className="text-2xl font-black text-zinc-100 dark:text-zinc-800 group-hover/item:text-pink-500 transition-colors tracking-tighter">0{i + 1}</span>
                      <p className="text-[11px] font-bold uppercase leading-tight text-zinc-700 dark:text-zinc-300 group-hover/item:translate-x-1 transition-transform truncate">{item}</p>
                      <ChevronRight size={14} className="ml-auto opacity-0 group-hover/item:opacity-100 text-pink-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Flash News Widget */}
              <div className="p-8 rounded-[2.5rem] bg-zinc-950 text-white overflow-hidden relative group transition-all duration-500 shadow-2xl shadow-pink-500/5">
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center border-b border-white/10 pb-5">
                    <div className="flex items-center gap-2 text-pink-500">
                      <Zap size={14} fill="currentColor" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Flash News</h3>
                    </div>
                    <div className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
                  </div>
                  <div className="space-y-6">
                    {[{ jam: "14:20", teks: "Pawai budaya di Jalan Cenderawasih dimulai sore ini." }, { jam: "12:05", teks: "Stok sagu di Pasar Sentral dilaporkan melimpah." }].map((item, i) => (
                      <div key={i} className="flex gap-4 group/news cursor-pointer">
                        <span className="text-[10px] font-black opacity-30 tabular-nums">{item.jam}</span>
                        <p className="text-[11px] font-bold leading-relaxed opacity-80 group-hover/news:opacity-100 group-hover/news:text-pink-500 transition-all">{item.teks}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Globe size={180} className="absolute -right-12 -bottom-12 opacity-[0.05] animate-spin-slow pointer-events-none" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
}