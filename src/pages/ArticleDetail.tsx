import { useState, useEffect, useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BLOG_POSTS } from "../data/posts"
import { TIMIKA_PULSE_POSTS } from '../data/timikaPulse'
import NotFound from "./NotFound"
import { 
  ArrowLeft, Bookmark, Share2, Clock, Calendar, 
  Zap, Hash, Check, ArrowRight,
  Type, CaseUpper, CaseLower, ExternalLink
} from "lucide-react"

// --- GABUNGKAN DATA GLOBAL ---
const ALL_AVAILABLE_POSTS = [...BLOG_POSTS, ...TIMIKA_PULSE_POSTS];

// --- SUB-KOMPONEN RELATED POSTS ---
function RelatedPosts({ currentCategory, currentSlug }: { currentCategory: string, currentSlug: string }) {
  const related = ALL_AVAILABLE_POSTS.filter(
    (post) => post.category === currentCategory && post.slug !== currentSlug
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
          More in <span className="text-pink-500">{currentCategory}</span>
        </h3>
        <Link to={`/category/${currentCategory.toLowerCase()}`} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-pink-500 transition-colors">
          View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {related.map((post) => (
          <Link to={`/article/${post.slug}`} key={post.slug} className="group space-y-5">
            <div className="relative aspect-[16/10] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-900">
              <img 
                src={post.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={post.title} 
              />
            </div>
            <div className="space-y-3 px-1">
              <h4 className="font-black text-lg leading-tight group-hover:text-pink-500 transition-colors line-clamp-2 uppercase italic tracking-tighter text-zinc-900 dark:text-white">
                {post.title}
              </h4>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Calendar size={12} className="text-pink-500/50" /> {post.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [completion, setCompletion] = useState(0)
  const [copied, setCopied] = useState(false)
  const [fontSize, setFontSize] = useState(19) 
  const [isSerif, setIsSerif] = useState(false)

  const post = ALL_AVAILABLE_POSTS.find((p) => p.slug === slug)

  const recommendedPosts = useMemo(() => {
    if (!post) return [];
    return ALL_AVAILABLE_POSTS
      .filter((p) => p.slug !== post.slug)
      .map((p) => {
        const sharedTags = p.tags.filter(tag => post.tags.includes(tag)).length;
        const categoryBonus = p.category === post.category ? 2 : 0;
        return { ...p, score: sharedTags + categoryBonus };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [post, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error(err); }
  };

  if (!post) return <NotFound />

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden font-sans selection:bg-pink-500/30">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[120] pointer-events-none">
        <div className="h-full bg-pink-500 transition-all duration-150 ease-out" style={{ width: `${completion}%` }} />
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <header className="relative pt-28 md:pt-48 pb-12 max-w-5xl mx-auto px-6">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex flex-wrap items-center gap-4">
            <Link to={`/category/${post.category.toLowerCase()}`}>
              <span className="px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-pink-500 transition-all shadow-sm">
                {post.category}
              </span>
            </Link>
            <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-pink-500" /> {post.readTime}</span>
              <span className="hidden sm:flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-[90px] font-black leading-[1.1] md:leading-[0.95] tracking-tighter uppercase italic text-zinc-900 dark:text-white">
            {post.title} <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent not-italic block md:inline">
              {post.titleAccent}
            </span>
          </h1>

          <div className="flex flex-row items-center justify-between gap-6 pt-10 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <img src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-none mb-1">Lead Editorial</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{post.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="p-3 md:p-4 rounded-full border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-90">
                {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
              </button>
              <button className="hidden sm:flex p-4 rounded-full border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-90"><Bookmark size={18} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO IMAGE */}
      <section className="max-w-7xl mx-auto px-0 md:px-6 mb-12 md:mb-24">
        <div className="relative aspect-[4/3] md:aspect-[21/9] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-900">
          <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 pb-20">
        <article className="lg:col-span-8">
          
          {/* READING MODE CONTROLS */}
          <div className="flex items-center gap-3 md:gap-4 mb-12 p-3 md:p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 w-full sm:w-fit overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 pr-4 border-r border-zinc-200 dark:border-zinc-800 shrink-0">
              <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg text-zinc-500"><CaseLower size={18}/></button>
              <span className="text-[10px] font-black w-10 text-center text-zinc-400">{fontSize}px</span>
              <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg text-zinc-500"><CaseUpper size={18}/></button>
            </div>
            <button 
              onClick={() => setIsSerif(!isSerif)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${isSerif ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}
            >
              <Type size={14} /> {isSerif ? 'Serif Mode' : 'Sans Mode'}
            </button>
          </div>

          <div 
            className="prose prose-zinc dark:prose-invert prose-lg max-w-none transition-all duration-300"
            style={{ fontSize: `${fontSize}px`, fontFamily: isSerif ? '"Source Serif 4", Georgia, serif' : 'inherit' }}
          >
            {/* Quick Summary */}
            <div className="not-prose bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2rem] md:rounded-[2.5rem] mb-12">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 mb-5 flex items-center gap-2">
                <Zap size={14} fill="currentColor" /> Quick Summary
              </h4>
              <ul className="space-y-4">
                {["Laporan mendalam khas Popverse.", "Informasi resmi dari narasumber terpercaya.", "Dampak signifikan bagi industri lokal."].map((text, i) => (
                  <li key={i} className="flex gap-4 text-sm font-medium">
                    <span className="text-pink-500 font-black">0{i+1}</span> {text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 italic mb-12">
              {post.excerpt}
            </p>

            <div className="text-zinc-800 dark:text-zinc-200 leading-relaxed article-content" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Source Info */}
            {post.source && (
              <div className="not-prose mt-12 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between group">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Original Source</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">{post.source}</p>
                </div>
                <a href={post.sourceUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:text-pink-500 transition-all shadow-sm">
                  <ExternalLink size={18} />
                </a>
              </div>
            )}
          </div>

          <RelatedPosts currentCategory={post.category} currentSlug={post.slug} />

          {/* Tags Section */}
          <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex flex-wrap gap-2 md:gap-3"> 
              {post.tags.map((tag) => (
                <Link to={`/tag/${tag.toLowerCase()}`} key={tag}>
                  <span className="inline-block px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800 hover:border-pink-500 hover:text-pink-500 transition-all">
                    #{tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* SIDEBAR */}
     <aside className="lg:col-span-4">
  <div className="lg:sticky lg:top-32 space-y-12">
    
    {/* --- SECTION: RECOMMENDED --- */}
    <div className="space-y-8">
      {/* Header dengan Judul & Keterangan Singkat */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white">
          Recommended Reading
        </h4>
        <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
          Curated stories you might have missed
        </p>
      </div>

      {/* List Item */}
      <div className="space-y-10">
        {recommendedPosts.map((item) => (
          <Link 
            to={`/article/${item.slug}`} 
            key={item.slug} 
            className="group flex gap-5 items-start"
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
              <img 
                src={item.image} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={item.title} 
              />
            </div>
            
            {/* Text Container - Menambahkan flex-1 agar teks bisa mengambil sisa ruang */}
            <div className="flex-1 space-y-2">
              <p className="text-[9px] font-black uppercase text-pink-500 tracking-[0.15em]">
                {item.category}
              </p>

              {/* Judul: Dipastikan muncul sepenuhnya tanpa line-clamp */}
              <h5 className="text-sm md:text-base font-bold leading-tight text-zinc-900 dark:text-white group-hover:text-pink-500 transition-colors uppercase tracking-tight">
                {item.title}
              </h5>

              {/* Keterangan/Excerpt */}
              {item.excerpt && (
                <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {item.excerpt}
                </p>
              )}

              {/* Metadata */}
              <div className="flex items-center gap-2 pt-1">
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  {item.readTime || '5 min read'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

    {/* --- SECTION: NEWSLETTER --- */}
    <div className="relative p-8 rounded-[2.5rem] bg-zinc-950 text-white overflow-hidden group border border-white/5 shadow-2xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[80px] rounded-full" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-pink-500">
            <Zap size={14} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stay Updated</span>
          </div>
          <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">
            Weekly <br /> Newsletter
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            Dapatkan berita pilihan dari Timika Pulse langsung di email Anda setiap Senin pagi.
          </p>
        </div>
        
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-pink-500 transition-colors text-white placeholder:text-zinc-600" 
          />
          <button className="w-full bg-white text-zinc-950 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-pink-500 hover:text-white transition-all active:scale-[0.98]">
            Join The Tribe
          </button>
        </div>
      </div>
    </div>

  </div>
</aside>
      </main>

      {/* FOOTER */}
      <footer className="relative py-24 text-center border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex flex-col items-center gap-4 transition-all"
          >
            <div className="relative p-5 rounded-full border border-zinc-200 dark:border-zinc-800 group-hover:border-pink-500 group-hover:bg-pink-500/5 transition-all duration-500 shadow-sm group-active:scale-90">
              <ArrowLeft className="rotate-90 text-zinc-400 group-hover:text-pink-500 transition-colors" size={20} />
              <span className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              Back to Top
            </span>
          </button>

          <div className="w-full space-y-10">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-7xl font-black tracking-[0.3em] uppercase opacity-[0.03] dark:opacity-[0.05] italic select-none">Popverse</h2>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase text-zinc-900 dark:text-white italic">Popverse</h2>
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">
              {['Privacy Policy', 'Terms of Service', 'Advertising', 'About'].map((item) => (
                <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-pink-500 transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-pink-500 transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="pt-10 border-t border-zinc-50 dark:border-zinc-900/50">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                © 2026 <span className="text-zinc-900 dark:text-white">Popverse Media Group</span>. 
                <span className="mx-2 opacity-30">|</span> 
                Made with Passion in Timika
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .article-content p { margin-bottom: 1.5rem; line-height: 1.8; }
        .prose blockquote p::before, .prose blockquote p::after { content: none; }
        .prose h2 { font-size: 1.8em; font-weight: 900; margin-top: 2.5rem; margin-bottom: 1.5rem; text-transform: uppercase; font-style: italic; letter-spacing: -0.02em; }
        .prose { transition: font-size 0.3s ease, font-family 0.3s ease; }
      `}</style>
    </div>
  )
}