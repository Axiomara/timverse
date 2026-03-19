// src/pages/ArticleDetail.tsx
import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet untuk SEO

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AudioNewsPlayer from "../components/AudioNewsPlayer";
import GiscusComments from "../components/GiscusComments.tsx";
import NotFound from "./NotFound";

import { BLOG_POSTS } from "../data/posts";
import { TIMIKA_PULSE_POSTS } from '../data/tim_posts';

// Icons
import { 
  Bookmark, 
  Share2, 
  Clock, 
  Calendar, 
  Zap, 
  Check, 
  ArrowRight,
  Type, 
  CaseUpper, 
  CaseLower, 
  ExternalLink,
  TrendingUp,
  Hash
} from "lucide-react";

const ALL_AVAILABLE_POSTS = [...BLOG_POSTS, ...TIMIKA_PULSE_POSTS];

function RelatedPosts({ currentCategory, currentSlug }: { currentCategory: string, currentSlug: string }) {
  const related = useMemo(() => {
    return ALL_AVAILABLE_POSTS.filter(
      (post) => post.category === currentCategory && post.slug !== currentSlug
    ).slice(0, 3);
  }, [currentCategory, currentSlug]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
          More in <span className="text-pink-500">{currentCategory}</span>
        </h3>
        <Link 
          to={`/category/${currentCategory.toLowerCase()}`} 
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-pink-500 transition-colors"
        >
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
  );
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [completion, setCompletion] = useState(0);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(19); 
  const [isSerif, setIsSerif] = useState(false);

  const post = ALL_AVAILABLE_POSTS.find((p) => p.slug === slug);

  // Logic: Post Rekomendasi berdasarkan kemiripan Tags dan Kategori
  const recommendedPosts = useMemo(() => {
    if (!post) return [];
    return ALL_AVAILABLE_POSTS
      .filter((p) => p.slug !== post.slug)
      .map((p) => {
        const sharedTags = p.tags?.filter(tag => post.tags.includes(tag)).length || 0;
        const categoryBonus = p.category === post.category ? 2 : 0;
        return { ...p, score: sharedTags + categoryBonus };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [post, slug]);

  // Logic: Trending Tags Dinamis
  const trendingTags = useMemo(() => {
    const allTags = ALL_AVAILABLE_POSTS.flatMap(p => p.tags || []);
    return Array.from(new Set(allTags)).slice(0, 8);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scroll Progress Indicator
  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: shareUrl,
        });
        return; 
      } catch (err) {
        console.log("Native share failed");
      }
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
  };

  if (!post) return <NotFound />;

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden font-sans selection:bg-pink-500/30">
      
      <Helmet>
        <title>{`${post.title} | Timika Pulse`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      <div className="fixed top-0 left-0 w-full h-1 z-[120] pointer-events-none">
        <div 
          className="h-full bg-pink-500 transition-all duration-150 ease-out" 
          style={{ width: `${completion}%` }} 
        />
      </div>

      <Navbar />

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
              {post.titleAccent || "HAPPENING NOW"}
            </span>
          </h1>

          <div className="flex flex-row items-center justify-between gap-6 pt-10 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-none mb-1">Lead Editorial</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{post.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="relative p-3 md:p-4 rounded-full border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-90 group">
                {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} className="group-hover:text-pink-500 transition-colors" />}
                {copied && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-widest whitespace-nowrap">
                      Link Copied!
                    </div>
                    <div className="w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 mx-auto -mt-1"></div>
                  </div>
                )}
              </button>
              <button className="hidden sm:flex p-4 rounded-full border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-90">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-0 md:px-6 mb-12 md:mb-24">
        <div className="relative aspect-[4/3] md:aspect-[21/9] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-900">
          <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 pb-20">
        <article className="lg:col-span-8">
          <div className="space-y-6 mb-12">
            <AudioNewsPlayer 
                text={post.excerpt + " " + post.content.replace(/<[^>]*>/g, '')} 
                title={post.title} 
            />
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 w-full sm:w-fit overflow-x-auto no-scrollbar">
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
          </div>

          <div 
            className="prose prose-zinc dark:prose-invert prose-lg max-w-none transition-all duration-300"
            style={{ fontSize: `${fontSize}px`, fontFamily: isSerif ? '"Source Serif 4", Georgia, serif' : 'inherit' }}
          >
            <div className="not-prose bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[2rem] md:rounded-[2.5rem] mb-12">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 mb-5 flex items-center gap-2">
                <Zap size={14} fill="currentColor" /> Quick Summary
              </h4>
              <ul className="space-y-4">
                {post.summary?.map((item, i) => (
                  <li key={i} className="flex gap-4 text-sm font-medium">
                    <span className="text-pink-500 font-black">0{i+1}</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 italic mb-12">
              {post.excerpt}
            </p>

            <div className="text-zinc-800 dark:text-zinc-200 leading-relaxed article-content" dangerouslySetInnerHTML={{ __html: post.content }} />

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

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-12">
            
            <div className="space-y-8">
              <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white">Recommended Reading</h4>
                <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Curated stories for you</p>
              </div>
              <div className="space-y-10">
                {recommendedPosts.map((item) => (
                  <Link to={`/article/${item.slug}`} key={item.slug} className="group flex gap-5 items-start">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
                      <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <p className="text-[9px] font-black uppercase text-pink-500 tracking-[0.15em]">{item.category}</p>
                      <h5 className="text-sm font-bold leading-tight text-zinc-900 dark:text-white group-hover:text-pink-500 transition-colors uppercase tracking-tight line-clamp-2">{item.title}</h5>
                      <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">{item.excerpt || "Baca selengkapnya mengenai berita terbaru hari ini."}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* --- REPLACEMENT: TRENDING TOPICS CLOUD --- */}
            <div className="relative p-8 rounded-[2.5rem] bg-zinc-950 text-white overflow-hidden border border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[80px] rounded-full" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-pink-500">
                    <TrendingUp size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Hot Topics</span>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">Explore <br /> Trending</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Link 
                      key={tag} 
                      to={`/tag/${tag.toLowerCase()}`}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:bg-pink-500 hover:border-pink-500 transition-all flex items-center gap-1.5"
                    >
                      <Hash size={10} className="text-pink-500" /> {tag}
                    </Link>
                  ))}
                </div>
                <Link to="/archive" className="flex items-center justify-between group/link pt-4 border-t border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover/link:text-white transition-colors">View All Archives</span>
                  <ArrowRight size={14} className="text-pink-500 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </aside>
      </main>

      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="relative py-16">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-100 dark:border-zinc-900"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-zinc-950 px-6">
              <Share2 size={24} className="text-zinc-200 dark:text-zinc-800" />
            </span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center space-y-2">
            <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Join the Conversation</h3>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Your thoughts matter to the community</p>
          </div>
          <GiscusComments />
        </div>
      </section>

      <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .article-content p { margin-bottom: 1.5rem; line-height: 1.8; }
        .prose h2 { 
          font-size: 1.8em; 
          font-weight: 900; 
          margin-top: 2.5rem; 
          margin-bottom: 1.5rem; 
          text-transform: uppercase; 
          font-style: italic; 
          letter-spacing: -0.02em; 
        }
      `}</style>
    </div>
  );
}