import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/posts";
import Navbar from "../components/Navbar";
import { ArrowRight, Hash, Layers } from "lucide-react";

export default function CategoryPage() {
  const { categoryName, tagName } = useParams();

  // Logika Filter: Mencari berdasarkan kategori ATAU tag
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
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">
            {categoryName ? <Layers size={14} /> : <Hash size={14} />}
            <span>{typeLabel}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic italic">
            {title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl font-medium">
            Menampilkan semua laporan eksklusif dan berita terbaru yang dikurasi dalam topik <span className="text-zinc-900 dark:text-zinc-100">{title}</span>.
          </p>
        </header>

        {/* --- GRID DAFTAR BERITA --- */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredPosts.map((post) => (
              <Link 
                to={`/article/${post.slug}`} 
                key={post.slug}
                className="group space-y-6 block"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-[8px] font-black uppercase tracking-widest shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    <span>{post.readTime} Read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight uppercase group-hover:text-pink-500 transition-colors">
                    {post.title} <span className="opacity-50">{post.titleAccent}</span>
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white group-hover:gap-4 transition-all">
                    Read Story <ArrowRight size={14} className="text-pink-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* --- STATE JIKA KOSONG --- */
          <div className="py-24 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[3rem]">
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Belum ada berita di topik ini.</p>
          </div>
        )}
      </main>

      {/* --- FOOTER MINIMALIS --- */}
      <footer className="py-12 text-center border-t border-zinc-50 dark:border-zinc-900">
         <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">Popverse Archive</p>
      </footer>
    </div>
  );
}