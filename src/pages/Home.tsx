import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsCarousel from "../components/NewsCarousel";
import { BLOG_POSTS } from "../data/posts";
import { 
  ArrowRight, ArrowLeft, Sparkles, MapPin, 
  TrendingUp, Zap, Clock, ChevronRight 
} from "lucide-react";

export default function Home() {
  const [topicIndex, setTopicIndex] = useState(0);
  
  // Data Logic
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

  const timikaTrends = [
    { id: 1, title: "Pembangunan Infrastruktur Digital di Mimika Capai Target Utama", tag: "Development", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Festival Budaya Amungme & Kamoro Tarik Ribuan Wisatawan", tag: "Culture", img: "https://images.unsplash.com/photo-1523050335102-c32c7503122b?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Talenta Muda Sepak Bola Timika Siap Dilirik Klub Liga 1", tag: "Sports", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800" }
  ];

  const nextTopic = () => setTopicIndex((prev) => (prev + 1) % categories.length);
  const prevTopic = () => setTopicIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 selection:bg-pink-500/30 overflow-x-hidden font-sans">
      
      <Navbar />

      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-32 pb-16 mb-16 md:mb-24">
        <div className="absolute inset-0 z-0">
          <img src={heroPost.image} className="w-full h-full object-cover opacity-50 dark:opacity-40 animate-in fade-in duration-1000" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white dark:from-zinc-950/80 dark:via-transparent dark:to-zinc-950 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase border border-zinc-200 dark:border-zinc-800 text-pink-500 rounded-full mx-auto bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
              <Sparkles size={12} /> <span>Trending Now</span>
            </div>
            
            <h1 className="text-4xl md:text-[115px] font-black leading-[0.9] tracking-tighter uppercase">
              {heroPost.title.split(':')[0]} <br className="hidden md:block" /> 
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-2">
                {heroPost.titleAccent}
              </span>
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-medium px-4">
              {heroPost.excerpt}
            </p>
            
            <div className="flex justify-center pt-6">
              <Link to={`/article/${heroPost.slug}`}>
                <button className="group px-12 py-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 shadow-2xl hover:shadow-pink-500/20">
                  <span>Read Article</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 space-y-32 md:space-y-48 pb-24">
        
        {/* --- SECTION 2: HOT FEED --- */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-500">
                <Zap size={18} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Latest Buzz</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Hot Feed</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
               <NewsCarousel />
            </div>

            <div className="lg:col-span-4 w-full">
              <div className="space-y-8">
                <div className="flex items-center gap-2 text-zinc-400 px-1">
                  <Clock size={16} className="text-pink-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Must Read</span>
                </div>
                
                <div className="flex flex-col gap-0 divide-y divide-zinc-100 dark:divide-zinc-900">
                  {mustReadPosts.map((item, index) => (
                    <Link to={`/article/${item.slug}`} key={item.slug} className="group py-7 first:pt-0 block transition-all">
                      <div className="flex gap-6 items-start">
                        <span className="text-xl font-black text-zinc-200 dark:text-zinc-800 leading-none group-hover:text-pink-500 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase text-pink-500 tracking-widest">{item.category}</p>
                          <h4 className="text-base font-bold leading-tight group-hover:text-pink-500 transition-colors italic">
                            {item.title} {item.titleAccent}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TIMIKA PULSE --- */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="mb-16 border-b border-zinc-100 dark:border-zinc-900 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-4 mb-3 text-pink-500">
                  <MapPin size={18} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Local Pulse</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Timika Pulse</h2>
            </div>
            <Link to="/timika/news/" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-pink-500 transition-colors">
              Lihat Semua <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {timikaTrends.map((trend) => (
              <article key={trend.id} className="group cursor-pointer">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                  <img src={trend.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={trend.title} />
                </div>
                <div className="mt-8 space-y-3 px-1">
                  <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{trend.tag}</span>
                  <h3 className="text-xl font-black leading-tight group-hover:text-pink-500 transition-colors">{trend.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: TOPICS --- */}
        <section className="max-w-7xl mx-auto px-6">
          <header className="mb-16 border-b border-zinc-100 dark:border-zinc-900 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-500">
                <TrendingUp size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Topics</h2>
            </div>
            <div className="flex gap-4 md:hidden">
              <button onClick={prevTopic} className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-pink-500 active:scale-90 transition-transform"><ArrowLeft size={20} /></button>
              <button onClick={nextTopic} className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-pink-500 active:scale-90 transition-transform"><ArrowRight size={20} /></button>
            </div>
          </header>
          
          <div className="grid md:grid-cols-3 gap-10 hidden md:grid">
            {categories.map((item) => <TopicCard key={item.cat} item={item} />)}
          </div>
          <div className="md:hidden">
            <TopicCard item={categories[topicIndex]} />
          </div>
        </section>

        {/* --- SECTION 5: LATEST STORIES --- */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="mb-16 border-b border-zinc-100 dark:border-zinc-900 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Latest Stories</h2>
            <Link to="/archive" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-pink-500 transition-colors">
              Buka Arsip <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {latestPosts.map((item) => (
              <Link to={`/article/${item.slug}`} key={item.slug} className="group block space-y-6">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm transition-all duration-500 group-hover:shadow-lg">
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                    <span className="text-pink-500">{item.category}</span>
                    <span className="text-zinc-400 opacity-60">{item.readTime} Read</span>
                  </div>
                  <h3 className="text-xl font-black leading-tight uppercase italic group-hover:text-pink-500 transition-colors line-clamp-2">
                    {item.title} {item.titleAccent}
                  </h3>
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

// Sub-component TopicCard dirapikan
function TopicCard({ item }: { item: any }) {
  return (
    <Link to={`/category/${item.slug}`} className="group block p-12 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 hover:shadow-xl transition-all duration-500 h-full">
      <h3 className="text-3xl font-black mb-6 tracking-tight uppercase italic transition-colors group-hover:text-pink-500">
        {item.cat}
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10 text-base leading-relaxed line-clamp-3">
        {item.desc}
      </p>
      <div className={`flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] ${item.text} group-hover:gap-6 transition-all`}>
        Explore <ArrowRight size={16} />
      </div>
    </Link>
  );
}