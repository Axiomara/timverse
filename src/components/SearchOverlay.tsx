// src/components/SearchOverlay.tsx
import { useState, useEffect, useMemo } from "react";
import { Search, X, ArrowRight, Clock, MapPin, TrendingUp, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import dua sumber data berbeda
import { TIMIKA_PULSE_POSTS } from "../data/tim_posts";
import { BLOG_POSTS } from "../data/posts";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const location = useLocation();

  // 1. Deteksi Konteks Halaman
  // Jika path adalah '/timika-news' atau mengandung 'timika', aktifkan mode Highland
  const isTimikaContext = location.pathname.includes("timika");

  // 2. Mengunci scroll body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // 3. Logika Filter Berdasarkan Konteks
  const filteredResults = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    
    // Pilih sumber data berdasarkan lokasi saat ini
    const dataSource = isTimikaContext ? TIMIKA_PULSE_POSTS : BLOG_POSTS;

    return dataSource.filter((post: any) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.category.toLowerCase().includes(lowerQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(lowerQuery)) ||
      (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery)))
    ).slice(0, 8);
  }, [query, isTimikaContext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] bg-white dark:bg-zinc-950 flex flex-col transition-colors duration-700">
      
      {/* --- HEADER DYNAMIS --- */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
            {isTimikaContext ? (
                <>
                    <MapPin size={14} className="text-pink-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Search Highland Pulse</span>
                </>
            ) : (
                <>
                    <Globe size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Search Popverse</span>
                </>
            )}
        </div>
        <button 
          onClick={() => { setQuery(""); onClose(); }} 
          className="group p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-pink-500 hover:text-white transition-all duration-300"
        >
          <X size={20} className="group-active:scale-75 transition-transform" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* --- INPUT AREA --- */}
          <div className="relative mt-12 mb-16">
            <input
              autoFocus
              type="text"
              placeholder={isTimikaContext ? "Cari berita di Mimika..." : "Search stories, movies, & more..."}
              className="w-full bg-transparent border-b-4 border-zinc-100 dark:border-zinc-900 py-6 md:py-12 text-3xl md:text-7xl font-black uppercase italic tracking-tighter focus:outline-none focus:border-pink-500 transition-colors placeholder:text-zinc-200 dark:placeholder:text-zinc-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className={`absolute right-0 top-1/2 -translate-y-1/2 transition-colors duration-500 ${query ? 'text-pink-500' : 'text-zinc-200 dark:text-zinc-800'}`} size={40} />
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="space-y-4">
            {!query ? (
              /* --- SUGGESTIONS BERDASARKAN KONTEKS --- */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10"
              >
                <div className="flex items-center gap-2 mb-8">
                    {isTimikaContext ? <TrendingUp size={16} className="text-pink-500" /> : <Search size={16} />}
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                        {isTimikaContext ? "Topik Terhangat di Mimika" : "Trending Topics"}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {(isTimikaContext 
                    ? ['Freeport', 'Bandara Mozes', 'Kuala Kencana', 'Cuaca Mimika', 'Ekonomi Papua']
                    : ['GTA VI', 'Marvel', 'Anime', 'Cyberpunk', 'Oscars']
                  ).map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => setQuery(tag)}
                      className="px-8 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-xs font-black uppercase tracking-widest hover:border-pink-500 hover:text-pink-500 transition-all active:scale-95"
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* --- HASIL PENCARIAN --- */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                <AnimatePresence mode="popLayout">
                    {filteredResults.map((post: any, idx) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Link 
                            to={`/article/${post.slug}`} 
                            onClick={() => { onClose(); setQuery(""); }}
                            className="group flex gap-6 p-4 rounded-[2rem] bg-zinc-50/50 dark:bg-zinc-900/30 border border-transparent hover:border-pink-500/30 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[1.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="thumb" />
                            </div>

                            <div className="flex flex-col justify-center gap-2 min-w-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black uppercase text-pink-500 tracking-[0.2em]">{post.category}</span>
                                    <span className="text-[9px] text-zinc-400 font-bold uppercase flex items-center gap-1">
                                        <Clock size={10}/> {post.readTime || '5m'}
                                    </span>
                                </div>
                                <h3 className="text-sm md:text-xl font-black uppercase italic leading-tight text-zinc-900 dark:text-white group-hover:text-pink-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-1 text-zinc-400 group-hover:text-pink-500 transition-colors">
                                    <span className="text-[9px] font-black uppercase tracking-widest">Read Article</span>
                                    <ArrowRight size={12} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            )}
            
            {/* --- EMPTY STATE --- */}
            {query && filteredResults.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center"
              >
                <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-zinc-100 dark:border-zinc-800">
                  <Search size={40} className="text-zinc-200" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-zinc-300 dark:text-zinc-800">
                    No results found <br /> for "{query}"
                </h3>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-4">
                    {isTimikaContext ? "Coba cari 'Freeport' atau 'Mimika'" : "Try searching for another keyword"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER HINT */}
      <div className="p-6 text-center border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
         <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800">Esc to close • Enter to search</p>
      </div>
    </div>
  );
}