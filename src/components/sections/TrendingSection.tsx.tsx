import { Link } from "react-router-dom";
import { TrendingUp, BarChart2, Flame, ArrowUpRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { TOPICS_DATA } from "../../data/topics"; // Pastikan path ../../ benar sesuai struktur folder Anda

// --- DUMMY DATA UNTUK ARTIKEL POPULER ---
const POPULAR_POSTS = [
  { slug: "masa-depan-ai-papua", title: "Masa Depan Kecerdasan Buatan di Tanah Papua", category: "Tech", views: "45.2k", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop" },
  { slug: "esports-lokal-timika", title: "Perkembangan Pesat Ekosistem E-Sports Timika", category: "Games", views: "32.8k", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop" },
  { slug: "budaya-ukir-kamoro", title: "Mengenal Lebih Dekat Filosofi Ukiran Kamoro", category: "Culture", views: "28.5k", image: "https://images.unsplash.com/photo-1523733230460-149793df4a45?q=80&w=400&auto=format&fit=crop" },
  { slug: "rekomendasi-kuliner", title: "Rekomendasi Kuliner Malam Terbaik di Pusat Kota", category: "Culinary", views: "21.1k", image: "https://picsum.photos/seed/foody/400/400" }
];

export default function TrendingSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="pt-16 border-t border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex items-center gap-3 mb-10 md:mb-12">
        <div className="p-2 bg-pink-500/10 rounded-lg"><TrendingUp size={18} className="text-pink-500" /></div>
        <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
          Sedang Tren & Populer
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        
        {/* 1. Kategori Paling Sering Dikunjungi */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <BarChart2 size={14} className="text-purple-500" /> Kategori Terpopuler
          </div>
          <div className="flex flex-col gap-3">
            {TOPICS_DATA.slice(0, 4).map((topic) => {
              const Icon = topic.icon;
              return (
                <Link 
                  key={topic.id} 
                  to={`/category/${topic.slug}`} 
                  className="group flex items-center justify-between p-3 md:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-pink-500 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-pink-500 group-hover:bg-pink-500/10 transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest group-hover:text-pink-500 transition-colors">{topic.name}</h4>
                      <span className="text-[9px] font-bold text-zinc-400">{topic.postCount} Artikel</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-pink-500 flex items-center gap-1">
                    <Eye size={12}/> {Math.floor(Math.random() * 50 + 50)}k
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2. Kumpulan Tagar (Tags) Trending */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <Flame size={14} className="text-orange-500" /> Tagar (Tags) Populer
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { tag: "TeknologiTerkini", rank: 1, up: true },
              { tag: "ReviewGame", rank: 2, up: true },
              { tag: "BudayaLokal", rank: 3, up: false },
              { tag: "GayaHidup", rank: 4, up: true },
              { tag: "KesehatanMental", rank: 5, up: true },
              { tag: "EventTimika", rank: 6, up: false },
            ].map((item) => (
              <Link 
                key={item.tag} 
                to={`/tag/${item.tag.toLowerCase()}`} 
                className="group flex items-center gap-3 p-1 pr-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-pink-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover:text-pink-500 transition-colors">
                  {item.rank}
                </div>
                <span className="text-xs font-bold tracking-wide">#{item.tag}</span>
                {item.up ? (
                  <ArrowUpRight size={14} className="text-green-500" />
                ) : (
                  <TrendingUp size={14} className="text-zinc-400" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Artikel Paling Banyak Dikunjungi */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <Eye size={14} className="text-blue-500" /> Artikel Terpopuler
          </div>
          <div className="space-y-4">
            {POPULAR_POSTS.map((post) => (
              <Link 
                key={post.slug} 
                to={`/article/${post.slug}`} 
                className="group flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-pink-500 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex-grow space-y-1.5">
                  <h4 className="text-[11px] md:text-xs font-black uppercase leading-tight line-clamp-2 group-hover:text-pink-500 transition-colors tracking-tight">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span className="text-pink-500">{post.category}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {post.views}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}