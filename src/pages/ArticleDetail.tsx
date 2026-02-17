import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BLOG_POSTS } from "../data/posts"
import NotFound from "./NotFound"
import { 
  ArrowLeft, Bookmark, Share2, Clock, Calendar, 
  MessageCircle, Heart, Twitter, Facebook, 
  Link as LinkIcon, Zap, Hash 
} from "lucide-react"

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [completion, setCompletion] = useState(0)

  // Cari data berita berdasarkan slug di URL
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  // Progress Bar Logic
  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }
    window.addEventListener("scroll", updateScrollCompletion)
    return () => window.removeEventListener("scroll", updateScrollCompletion)
  }, [])

  // Jika berita tidak ditemukan, tampilkan 404
  if (!post) return <NotFound />

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden font-sans selection:bg-pink-500/30">
      
      {/* --- READING PROGRESS BAR --- */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <div 
          className="h-full bg-pink-500 transition-all duration-150 ease-out"
          style={{ width: `${completion}%` }}
        />
      </div>

      <Navbar />

      {/* --- ARTICLE HEADER --- */}
      <header className="relative pt-32 md:pt-48 pb-12 max-w-5xl mx-auto px-6">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <div className="flex flex-wrap items-center gap-4">
            {/* PERBAIKAN: Link ke Halaman Kategori */}
            <Link to={`/category/${post.category.toLowerCase()}`}>
              <span className="px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-pink-500 dark:hover:bg-pink-500 transition-all">
                {post.category}
              </span>
            </Link>
            
            <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-pink-500" /> {post.readTime}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-[90px] font-black leading-[0.95] tracking-tighter uppercase italic drop-shadow-sm text-zinc-900 dark:text-white">
            {post.title} <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent not-italic">
              {post.titleAccent}
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-10 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-inner">
                <img src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} className="w-full h-full object-cover transition-all duration-500" />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-none mb-1">Lead Editorial</p>
                <p className="text-sm font-bold hover:text-pink-500 cursor-pointer transition-colors text-zinc-900 dark:text-white">{post.author}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="p-4 rounded-full border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-90 group"><Share2 size={18} /></button>
              <button className="p-4 rounded-full border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-90 group"><Bookmark size={18} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* --- FEATURED IMAGE --- */}
      <section className="max-w-7xl mx-auto px-0 md:px-6 mb-12 md:mb-24">
        <div className="relative aspect-[16/10] md:aspect-[21/9] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-900">
          <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* --- CONTENT & SIDEBAR --- */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 pb-32">
        
        {/* LEFT: Article Body */}
        <article className="lg:col-span-8">
          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:italic prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-blockquote:border-pink-500">
            
            <div className="not-prose bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2.5rem] mb-12 text-zinc-900 dark:text-white">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 mb-4 flex items-center gap-2">
                <Zap size={14} fill="currentColor" /> Quick Summary
              </h4>
              <ul className="space-y-3">
                {["Informasi resmi dari narasumber terpercaya.", "Dampak signifikan bagi industri terkait.", "Prediksi tren untuk masa depan."].map((text, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium">
                    <span className="text-zinc-300 dark:text-zinc-700 font-black">0{i+1}</span> {text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 italic mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-zinc-900 dark:first-letter:text-white first-letter:mr-3 first-letter:float-left first-letter:mt-2">
              {post.excerpt}
            </p>

            <div 
              className="text-zinc-800 dark:text-zinc-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>

          {/* --- TAGS SECTION --- */}
          <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
              <Hash size={12} /> Related Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link to={`/tag/${tag.toLowerCase()}`} key={tag}>
                  <span className="px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800 hover:border-pink-500 hover:text-pink-500 transition-all cursor-pointer active:scale-95">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Interactions */}
          <div className="mt-16 pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-12 text-zinc-900 dark:text-white">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <button className="flex items-center gap-2 font-bold text-sm hover:text-pink-500 transition-colors"><Heart size={20} /> 1.2k</button>
                   <button className="flex items-center gap-2 font-bold text-sm hover:text-indigo-500 transition-colors"><MessageCircle size={20} /> 84</button>
                </div>
                <div className="flex gap-4">
                   <Twitter size={18} className="cursor-pointer hover:text-blue-400 transition-colors" />
                   <Facebook size={18} className="cursor-pointer hover:text-blue-600 transition-colors" />
                   <LinkIcon size={18} className="cursor-pointer hover:text-pink-500 transition-colors" />
                </div>
             </div>
          </div>
        </article>

        {/* RIGHT: Sidebar */}
        <aside className="lg:col-span-4 space-y-16">
          <div className="sticky top-32 space-y-16">
            <div className="space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                Recommended
              </h4>
              <div className="space-y-10">
                {BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3).map((item) => (
                  <Link to={`/article/${item.slug}`} key={item.slug} className="group flex gap-5 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0 shadow-sm border border-zinc-200 dark:border-zinc-800">
                      <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Thumb" />
                    </div>
                    <div className="space-y-1 text-zinc-900 dark:text-white">
                      <h5 className="text-sm font-bold leading-tight group-hover:text-pink-500 transition-colors line-clamp-2">{item.title} {item.titleAccent}</h5>
                      <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">{item.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-950 text-white relative overflow-hidden shadow-2xl">
                <Zap className="absolute -right-4 -top-4 w-24 h-24 text-zinc-900 opacity-50 rotate-12" />
                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2 relative z-10">Newsletter</h4>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed relative z-10">Dapatkan berita eksklusif Popverse langsung di inbox kamu setiap pekan.</p>
                <div className="flex flex-col gap-3 relative z-10">
                   <input type="text" placeholder="Email Address" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-pink-500 transition-colors text-white" />
                   <button className="w-full bg-white text-zinc-950 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">Join The Tribe</button>
                </div>
            </div>
          </div>
        </aside>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-24 text-center border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 pb-32 lg:pb-24">
        <div className="flex flex-col items-center gap-12">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex flex-col items-center gap-4">
            <div className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 group-hover:border-pink-500 group-hover:-translate-y-2 transition-all shadow-sm">
              <ArrowLeft className="rotate-90 text-zinc-400 group-hover:text-pink-500" size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Top of Page</span>
          </button>
          
          <div className="space-y-6 text-zinc-900 dark:text-white">
            <h2 className="text-3xl font-black tracking-[0.4em] uppercase opacity-10">Popverse</h2>
            <div className="flex gap-8 justify-center text-[9px] font-black uppercase tracking-widest text-zinc-400">
               <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
               <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
               <a href="#" className="hover:text-pink-500 transition-colors">Copyright 2026</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- REPAIR STYLE TAGS --- */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .prose blockquote p::before, .prose blockquote p::after { content: none; }
        .prose h3 { margin-top: 2.5rem; margin-bottom: 1.25rem; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -0.05em; font-size: 1.875rem; }
        
        iframe {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform;
          background-color: transparent !important;
        }

        .prose {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  )
}