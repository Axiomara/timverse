import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsCarousel from "../components/NewsCarousel";

// PERBAIKAN: Ambil BLOG_POSTS dan tipe Post dari sumber aslinya (posts.ts)
import { BLOG_POSTS, type Post } from "../data/posts";

// PERBAIKAN: Ambil data lokal saja dari timikaPulse (tanpa tipe Post di sini)
import { TIMIKA_PULSE_POSTS } from '../data/tim_posts';

import { 
  ArrowRight, ArrowLeft, Sparkles, MapPin, 
  TrendingUp, Zap, Clock, ChevronRight,
  Trophy, Activity, Medal, Calendar
} from "lucide-react";

export default function Home() {
  const [topicIndex, setTopicIndex] = useState(0);
  
  const heroPost = BLOG_POSTS[0];
  const mustReadPosts = BLOG_POSTS.slice(0, 4);
  const latestPosts = BLOG_POSTS.slice(0, 6);

  const categories = [
    { cat: "Gaming", slug: "gaming", text: "text-orange-500", desc: "Info terbaru mengenai gear, review game, dan turnamen e-sports." },
    { cat: "Music", slug: "music", text: "text-blue-500", desc: "Tangga lagu, rilis album baru, dan wawancara eksklusif musisi." },
    { cat: "Movies", slug: "movies", text: "text-red-500", desc: "Review film box office, jadwal rilis, dan rumor casting aktor." },
    { cat: "Tech", slug: "tech", text: "text-purple-500", desc: "Gadget terbaru, inovasi AI, dan tren teknologi masa depan." },
    { cat: "Sports", slug: "sports", text: "text-emerald-500", desc: "Analisis pertandingan, bursa transfer pemain, dan update liga top dunia." },
    { cat: "Anime", slug: "anime", text: "text-green-500", desc: "Panduan musiman, rekomendasi tontonan, dan berita industri." }
  ];

  const nextTopic = () => setTopicIndex((prev) => (prev + 1) % categories.length);
  const prevTopic = () => setTopicIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 selection:bg-pink-500/30 overflow-x-hidden font-sans">
      
      <Navbar />

      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 mb-12 md:mb-20">
        <div className="absolute inset-0 z-0" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
          <img src={heroPost.image} className="w-full h-full object-cover opacity-30 md:opacity-50 animate-in fade-in duration-1000" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/40 to-white dark:from-zinc-950/95 dark:via-zinc-950/40 dark:to-zinc-950 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase border border-zinc-200 dark:border-zinc-800 text-pink-500 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm">
              <Sparkles size={14} /> <span>Trending Now</span>
            </div>
            
            <h1 className="text-5xl md:text-[110px] font-black leading-[1.1] md:leading-[0.9] tracking-tighter uppercase">
              {heroPost.title.split(':')[0]} <br className="hidden md:block" /> 
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent block mt-2">
                {heroPost.titleAccent}
              </span>
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium px-4">
              {heroPost.excerpt}
            </p>
            
            <div className="flex justify-center pt-4">
              <Link to={`/article/${heroPost.slug}`} className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl">
                  <span>Start Reading</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 space-y-24 md:space-y-40 pb-20 px-6">
        
        {/* --- SECTION 2: HOT FEED --- */}
        <section className="max-w-7xl mx-auto px-1">
          <div className="mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-500">
                <Zap size={18} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Latest Buzz</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Hot Feed</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 xl:col-span-8 rounded-[2.5rem] overflow-hidden shadow-2xl relative min-h-[520px] sm:min-h-[600px] md:h-[600px] bg-zinc-900 flex">
              <NewsCarousel /> 
            </div>
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
              <div className="flex items-center gap-2 text-zinc-500 mb-6 px-1">
                <Clock size={16} className="text-pink-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Don't Miss</span>
              </div>
              <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-900">
                {mustReadPosts.map((item, index) => (
                  <Link to={`/article/${item.slug}`} key={item.slug} className="group py-6 first:pt-0 transition-all active:opacity-60">
                    <div className="flex gap-5 items-start">
                      <span className="text-2xl md:text-3xl font-black text-zinc-200 dark:text-zinc-800 leading-none group-hover:text-pink-500/30 transition-colors shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-[9px] font-black uppercase text-pink-500 tracking-widest">{item.category}</p>
                          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                          <p className="text-[9px] font-medium text-zinc-400 uppercase italic">Trending</p>
                        </div>
                        <h4 className="text-base md:text-lg font-bold leading-snug group-hover:text-pink-500 transition-colors italic tracking-tight">
                          {item.title} <span className="text-pink-500 ml-1.5">{item.titleAccent}</span>
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TIMIKA PULSE --- */}
        <section className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-8 flex flex-row items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-pink-500">
                <MapPin size={18} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Local Pulse</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Timika Pulse</h2>
            </div>
            <Link to="/timika/news/" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-pink-500 transition-colors shrink-0">
              See All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14">
            {TIMIKA_PULSE_POSTS.slice(0, 3).map((trend: Post) => (
              <Link to={`/article/${trend.slug}`} key={trend.slug} className="group cursor-pointer flex flex-col h-full">
                <article className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-md">
                    <img src={trend.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={trend.title} />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-pink-500 shadow-sm border border-zinc-100 dark:border-zinc-800">
                        {trend.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col flex-grow space-y-3">
                    <h3 className="text-xl md:text-2xl font-black leading-tight group-hover:text-pink-500 transition-colors uppercase italic tracking-tight line-clamp-2">
                      {trend.title} <span className="text-pink-500 not-italic">{trend.titleAccent}</span>
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 font-medium">
                      {trend.excerpt}
                    </p>
                    <div className="pt-2 mt-auto flex items-center justify-between border-t border-zinc-50 dark:border-zinc-900 pt-4">
                       <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-zinc-400" />
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                             {trend.date}
                          </span>
                       </div>
                       <div className="text-[10px] font-black text-pink-500 uppercase tracking-widest group-hover:underline underline-offset-4">
                          Read More +
                       </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: STADIUM VISION --- */}
        <section className="-mx-6 bg-zinc-950 py-24 md:py-36 overflow-hidden border-y border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-emerald-500">
                            <Trophy size={24} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Arena Highlights</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">Stadium <span className="text-emerald-500">Vision</span></h2>
                    </div>
                    <p className="text-zinc-500 max-w-sm text-base font-medium leading-relaxed">
                        Analisis eksklusif dari lapangan hijau hingga lintasan balap nasional.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden aspect-[4/5] md:aspect-auto md:h-[550px] group">
                        <img src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-50" alt="Stadium" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                        <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end gap-6">
                            <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                                <Activity size={18} /> Live Update
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase italic tracking-tighter max-w-xl">
                                Dominasi Tak Terbendung di Musim Turnamen Nasional
                            </h3>
                            <button className="w-full md:w-fit px-10 py-5 bg-emerald-500 text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all">
                                Baca Analisis
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between group hover:bg-emerald-500 transition-all duration-500 cursor-pointer min-h-[200px]">
                            <Medal size={40} className="text-emerald-500 group-hover:text-black transition-colors" />
                            <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-black leading-tight uppercase italic transition-colors mt-6">
                                Bursa Transfer: Pemain Muda Timika Menuju Eropa?
                            </h4>
                        </div>
                        <div className="relative rounded-[2.5rem] overflow-hidden group min-h-[200px]">
                            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Strategy" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                                <h4 className="text-xl font-black text-white uppercase italic tracking-tight leading-tight">Strategi Baru di Liga Musim Depan</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- SECTION 5: TOPICS --- */}
        <section className="max-w-7xl mx-auto">
          <header className="mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-8 flex flex-row items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-500">
                <TrendingUp size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Topics</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={prevTopic} className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-pink-500 active:scale-90 transition-transform"><ArrowLeft size={18} /></button>
              <button onClick={nextTopic} className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-pink-500 active:scale-90 transition-transform"><ArrowRight size={18} /></button>
            </div>
          </header>
          
          <div className="grid md:grid-cols-3 gap-8 hidden md:grid">
            {categories.map((item) => <TopicCard key={item.cat} item={item} />)}
          </div>
          <div className="md:hidden">
            <TopicCard item={categories[topicIndex]} />
          </div>
        </section>

      {/* --- SECTION 6: LATEST STORIES --- */}
<section className="max-w-7xl mx-auto">
  <div className="mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-8 flex flex-row items-end justify-between gap-4">
    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Latest Stories</h2>
    <Link to="/archive" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-pink-500 transition-colors">
      Archive <ChevronRight size={16} />
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
    {latestPosts.map((item) => (
      <Link to={`/article/${item.slug}`} key={item.slug} className="group block space-y-6">
        {/* Image Container */}
        <div className="relative aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-pink-500/10">
          <img 
            src={item.image} 
            className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110" 
            alt={item.title} 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Info Container */}
        <div className="space-y-4 px-1">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <span className="text-pink-500 px-2 py-1 bg-pink-500/5 rounded-md">{item.category}</span>
            {/* PENGGANTI MIN READ: TANGGAL UPLOAD */}
            <span className="text-zinc-400 opacity-60 flex items-center gap-1.5">
              <Calendar size={12} className="text-zinc-300 dark:text-zinc-700" />
              {item.date}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-black leading-tight uppercase italic group-hover:text-pink-500 transition-colors line-clamp-2 tracking-tight">
              {item.title} {item.titleAccent}
            </h3>
            
            {/* KETERANGAN BERITA (Excerpt) */}
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {item.excerpt}
            </p>
          </div>

          {/* Micro Action */}
          <div className="pt-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700 group-hover:text-pink-500 transition-colors">
            Read Full Story <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

      </main>

      <Footer />
    </div>
  );
}

function TopicCard({ item }: { item: any }) {
  return (
    <Link to={`/category/${item.slug}`} className="group block p-10 md:p-14 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-500 h-full shadow-sm">
      <h3 className="text-3xl font-black mb-6 tracking-tight uppercase italic transition-colors group-hover:text-pink-500">
        {item.cat}
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10 text-base leading-relaxed line-clamp-3">
        {item.desc}
      </p>
      <div className={`flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] ${item.text} group-hover:gap-5 transition-all`}>
        Explore <ArrowRight size={18} />
      </div>
    </Link>
  );
}