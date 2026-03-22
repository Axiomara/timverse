import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TopicData } from "../data/topics";

interface TopicCardProps {
  topic: TopicData;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const Icon = topic.icon;

  return (
    <article className="group relative w-full h-full flex flex-col">
      <Link to={`/category/${topic.slug}`} className="flex flex-col h-full h-[400px] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg relative isolate">
        
        {/* Background Image with Fallback gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={topic.coverImage} 
            alt={topic.name} 
            loading="lazy" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 dark:opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" />
        </div>

        {/* Card Content - Glassmorphism Layer */}
        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
          
          <div className="w-14 h-14 rounded-[1.5rem] bg-pink-500 text-white flex items-center justify-center mb-6 shadow-xl shadow-pink-500/20 backdrop-blur-md group-hover:-translate-y-2 transition-transform duration-500">
            <Icon size={24} />
          </div>

          <div className="flex items-center gap-3 text-[10px] font-black text-pink-400 uppercase tracking-widest mb-3 opacity-90">
            <span>{topic.postCount} Artikel</span>
          </div>
          
          <h3 className="text-4xl lg:text-5xl font-black leading-none uppercase text-white mb-4 line-clamp-1 group-hover:text-pink-400 transition-colors">
            {topic.name}
          </h3>
          
          <p className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6 italic opacity-0 md:opacity-100 translate-y-4 md:translate-y-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {topic.description}
          </p>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-pink-400 transition-colors">
            Jelajahi <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </div>

        </div>
      </Link>
    </article>
  );
}
