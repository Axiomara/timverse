import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { BLOG_POSTS } from "../data/posts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import * as Sentry from "@sentry/react";
import { ArrowRight, Hash, Layers, Clock, TrendingUp } from "lucide-react";

function CategoryPage() {
  const { categoryName, tagName } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName, tagName]);

  // 1. Filter konten utama
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (categoryName) return post.category.toLowerCase() === categoryName.toLowerCase();
      if (tagName) return post.tags.some(t => t.toLowerCase() === tagName.toLowerCase());
      return false;
    });
  }, [categoryName, tagName]);

  // 2. DINAMIS: Ambil tag yang relevan dengan konten yang sedang ditampilkan saja
  const relevantTags = useMemo(() => {
    const allTagsFromFiltered = filteredPosts.flatMap(p => p.tags);
    // Hilangkan duplikat dan hilangkan tag yang sedang aktif (jika sedang di halaman tag)
    const uniqueTags = Array.from(new Set(allTagsFromFiltered)).filter(
      tag => tag.toLowerCase() !== tagName?.toLowerCase()
    );
    
    // Jika tag relevan sedikit, ambil 6 saja. Jika kosong, baru ambil dari seluruh post sebagai fallback.
    if (uniqueTags.length > 0) return uniqueTags.slice(0, 6);
    
    const fallbackTags = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)));
    return fallbackTags.slice(0, 6);
  }, [filteredPosts, tagName]);

  const mustReadPosts = useMemo(() => {
    return [...BLOG_POSTS].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, []);

  const title = categoryName ? categoryName : `#${tagName}`;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 flex-grow w-full">
        {/* --- HEADER --- */}
        <header className="mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">
            {categoryName ? <Layers size={14} /> : <Hash size={14} />}
            <span>Arsip {categoryName ? "Kategori" : "Topik"}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.85] break-words">
            {title}
          </h1>
        </header>

        {/* --- DYNAMIC TRENDING BAR --- */}
        <section className="mb-16 pb-8 border-b border-zinc-100 dark:border-zinc-900 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <TrendingUp size={14} /> Topik Terkait:
          </div>
          {relevantTags.map((tag) => (
            <Link
              key={tag}
              to={`/tag/${tag.toLowerCase()}`}
              className="px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50/50 dark:hover:bg-pink-500/10 transition-all"
            >
              #{tag}
            </Link>
          ))}
        </section>

        {/* --- GRID BERITA UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 mb-32">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link to={`/article/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 mb-8 border border-zinc-100 dark:border-zinc-800">
                    <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-pink-500 uppercase tracking-widest mb-4">
                    <span>{post.category}</span>
                    <span className="text-zinc-400 flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-black leading-tight uppercase mb-4 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6 italic">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-6 border-t border-zinc-100 dark:border-zinc-900 group-hover:text-pink-500 transition-colors">
                    Baca Selengkapnya <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-zinc-400 italic">Belum ada konten untuk topik ini.</p>
            </div>
          )}
        </div>

        {/* --- SECTION: PILIHAN REDAKSI --- */}
        <section className="pt-20 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12 flex items-center gap-4">
               Pilihan Redaksi 
            </h2>
            
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {mustReadPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  to={`/article/${post.slug}`}
                  className="group flex gap-6 md:gap-10 py-10 first:pt-0 items-start"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 shadow-sm">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>

                  <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-3 text-[8px] font-black text-pink-500 uppercase tracking-[0.2em]">
                      <span>{post.category}</span>
                      <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                      <span className="text-zinc-400">{post.readTime} baca</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-black uppercase leading-tight group-hover:text-pink-500 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="hidden md:flex self-center">
                    <ArrowRight size={20} className="text-zinc-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Sentry.withErrorBoundary(CategoryPage, {
  fallback: (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-6 text-center">
      <h2 className="text-4xl font-black uppercase italic mb-4">Ada Masalah Teknis</h2>
      <button onClick={() => window.location.reload()} className="bg-pink-500 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest">Muat Ulang</button>
    </div>
  ),
});