import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TopicData } from "../data/topics";

interface TopicCardProps {
  topic: TopicData;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const Icon = topic.icon;

  return (
    <article className="group relative w-full flex flex-col h-full">
      <Link 
        to={`/category/${topic.slug}`} 
        // Tinggi card di HP 240px, di Desktop 400px. Radius di HP diperkecil.
        className="flex flex-col min-h-[220px] md:min-h-[400px] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl relative isolate transition-all duration-700"
      >
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={topic.coverImage} 
            alt={topic.name} 
            loading="lazy" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 dark:opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Content Layer (Padding di HP dikurangi jadi p-5) */}
        <div className="absolute inset-0 z-10 p-5 md:p-10 flex flex-col justify-end">
          
          {/* Icon Box: Di HP lebih kecil (w-10), di Desktop besar (w-14) */}
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-pink-500 text-white flex items-center justify-center mb-3 md:mb-6 shadow-2xl shadow-pink-500/40 backdrop-blur-md group-hover:-translate-y-2 transition-transform duration-500">
            <Icon className="w-5 h-5 md:w-7 md:h-7" />
          </div>

          <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-3">
            <span className="bg-pink-500/10 px-2 py-1 rounded-md">{topic.postCount} Artikel</span>
          </div>
          
          {/* Judul: Di HP text-xl, di Desktop text-4xl */}
          <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black leading-none md:leading-[0.9] uppercase text-white mb-2 md:mb-4 transition-colors group-hover:text-pink-400 tracking-tighter italic">
            {topic.name}
          </h3>
          
          {/* Deskripsi: Disembunyikan di HP agar tidak sesak, muncul saat hover di Desktop */}
          <p className="hidden md:block text-sm text-zinc-300 line-clamp-2 leading-relaxed mb-6 italic opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
            {topic.description}
          </p>
          
          {/* Explore Link: Di HP ukurannya lebih kecil */}
          <div className="flex items-center gap-1 md:gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-pink-400 transition-colors mt-auto md:mt-0">
            Jelajahi <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform md:w-3.5 md:h-3.5" />
          </div>
        </div>
      </Link>
    </article>
  );
}