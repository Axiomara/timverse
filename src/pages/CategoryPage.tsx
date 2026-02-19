import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/posts";
import Navbar from "../components/Navbar";
import { ArrowRight, Hash, Layers, Calendar, Clock } from "lucide-react";

export default function CategoryPage() {
  const { categoryName, tagName } = useParams();

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (categoryName) {
      return post.category.toLowerCase() === categoryName.toLowerCase();
    }
    if (tagName) {
      return post.tags.some(t => t.toLowerCase() === tagName.toLowerCase());
    }
    return false;
  });

  const title = categoryName ? categoryName : `#${tagName}`;
  const typeLabel = categoryName ? "Category" : "Tag Topic";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* --- HEADER HALAMAN --- */}
        <header className="mb-20 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">
            {categoryName ? <Layers size={14} /> : <Hash size={14} />}
            <span>{typeLabel}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">
            {title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium text-lg leading-relaxed">
            Eksplorasi koleksi laporan eksklusif dan kurasi berita terbaru dalam topik <span className="text-zinc-900 dark:text-white border-b-2 border-pink-500">{title}</span>.
          </p>
        </header>

        {/* --- GRID DAFTAR BERITA (SIMETRIS) --- */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredPosts.map((post) => (
              <Link 
                to={`/article/${post.slug}`} 
                key={post.slug}
                className="group flex flex-col h-full"
              >
                {/* 1. Image Container (Fixed Aspect Ratio) */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 rounded-full bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-zinc-900 text-[8px] font-black uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* 2. Content Wrapper (Flex Grow agar simetris) */}
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex items-center gap-3 text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                    <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                  </div>

                  {/* Judul dengan Line Clamp (Maksimal 3 baris agar tinggi seragam) */}
                  <h3 className="text-2xl font-black leading-[1.15] tracking-tight uppercase group-hover:text-pink-500 transition-colors mb-4 line-clamp-3 min-h-[3.45rem] md:min-h-[4rem]">
                    {post.title} <span className="text-zinc-400 italic dark:text-zinc-600">{post.titleAccent}</span>
                  </h3>

                  {/* Excerpt dengan Line Clamp (Maksimal 3 baris) */}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Read More Button (Selalu di paling bawah kotak) */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white group-hover:gap-4 transition-all">
                    Explore Story <ArrowRight size={14} className="text-pink-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-4 border-dotted border-zinc-100 dark:border-zinc-900 rounded-[4rem]">
            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hash size={32} className="text-zinc-300" />
            </div>
            <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-sm">No coverage found in this section.</p>
          </div>
        )}
      </main>

      <footer className="py-20 text-center border-t border-zinc-50 dark:border-zinc-900">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">Popverse Editorial Archive 2026</p>
      </footer>
    </div>
  );
}