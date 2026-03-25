import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Eye, ChevronRight, Flame } from "lucide-react";
import type { TrendingPost } from "../../data/trending";

interface TrendingCardProps {
  post: TrendingPost;
  index: number;
}

export default function TrendingCard({ post, index }: TrendingCardProps) {
  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
    >
      {/* Number - Hidden on mobile */}
      <div className="hidden lg:flex lg:col-span-1 justify-center pt-2">
        <span className="text-6xl font-black text-zinc-100 dark:text-zinc-900 group-hover:text-orange-500 transition-colors duration-500 italic">
          #{index + 1}
        </span>
      </div>

      {/* Image Area */}
      <div className="col-span-1 md:col-span-5 lg:col-span-4 relative">
        <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 aspect-[16/10] md:aspect-[4/3] ring-1 ring-zinc-200 dark:ring-zinc-800">
          <img
            src={post.gambar}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            alt={post.judul}
            loading="lazy"
          />
        </div>
        <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg shadow-orange-500/30 flex items-center gap-2">
          <Flame size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">{post.views}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="col-span-1 md:col-span-7 lg:col-span-6 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[9px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-lg">
            {post.kategori}
          </span>
          <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Clock size={12} /> {post.waktuBaca}
          </span>
          <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 ml-2 border-l border-zinc-200 dark:border-zinc-800 pl-3">
            <Eye size={12} /> {post.views} Views
          </span>
        </div>

        <Link to={`/news/${post.id}`}>
          <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] md:leading-none mb-4 md:mb-6 group-hover:text-orange-500 transition-colors">
            {post.judul}
          </h2>
        </Link>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium line-clamp-2 md:line-clamp-3 mb-6">
          {post.ringkasan}
        </p>

        <div className="flex items-center justify-between md:justify-start md:gap-6 pt-4 border-t border-zinc-50 dark:border-zinc-900">
          <span className="text-[9px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">{post.tanggal}</span>
          <Link to={`/news/${post.id}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 md:hover:translate-x-2 transition-transform">
            Read Story <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
