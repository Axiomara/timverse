// src/components/SearchOverlay.tsx
import { useState, useEffect } from "react"
import { Search, X, ArrowRight, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { BLOG_POSTS } from "../data/posts"

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("")

  // Mengunci scroll saat overlay terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const filteredResults = BLOG_POSTS.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.category.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[300] bg-white dark:bg-zinc-950 flex flex-col animate-in fade-in duration-300">
      
      {/* --- HEADER (STICKY ON TOP) --- */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Search Popverse</span>
        <button 
          onClick={() => { setQuery(""); onClose(); }} 
          className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <div className="max-w-4xl mx-auto w-full">
          
          {/* --- INPUT AREA --- */}
          <div className="relative mb-12">
            <input
              autoFocus
              type="text"
              placeholder="What are you looking for?"
              className="w-full bg-transparent border-b-2 border-zinc-100 dark:border-zinc-900 py-4 md:py-8 text-2xl md:text-6xl font-black uppercase italic tracking-tighter focus:outline-none focus:border-pink-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-200 dark:text-zinc-800" size={28} />
          </div>

          {/* --- RESULTS SECTION --- */}
          <div className="space-y-2">
            {!query && (
              <div className="py-10 text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Trending Topics</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {['GTA VI', 'Marvel', 'X-Men', 'Anime'].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => setQuery(tag)}
                      className="px-5 py-2 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest"
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && filteredResults.map((post) => (
              <Link 
                to={`/article/${post.slug}`} 
                key={post.slug} 
                onClick={() => { onClose(); setQuery(""); }}
                className="group flex items-center gap-4 py-5 border-b border-zinc-50 dark:border-zinc-900/50 active:bg-zinc-50 dark:active:bg-zinc-900/30 transition-all rounded-xl px-2"
              >
                {/* Thumbnail Mini untuk Mobile agar lebih rapi */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0 border border-zinc-200 dark:border-zinc-800">
                   <img src={post.image} className="w-full h-full object-cover" alt="thumb" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black uppercase text-pink-500 tracking-widest">{post.category}</span>
                    <span className="text-[8px] text-zinc-400 uppercase flex items-center gap-1"><Clock size={10}/> {post.readTime}</span>
                  </div>
                  <h3 className="text-sm md:text-2xl font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug group-hover:text-pink-500 transition-colors">
                    {post.title}
                  </h3>
                </div>
                
                <ArrowRight className="text-zinc-300 dark:text-zinc-700 shrink-0" size={18} />
              </Link>
            ))}
            
            {query && filteredResults.length === 0 && (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-zinc-300" />
                </div>
                <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-tighter">No stories found for "{query}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}