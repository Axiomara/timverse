import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/posts";

export default function NewsCarousel(): React.JSX.Element {
  const [current, setCurrent] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Take latest 5 news
  const featuredNews = BLOG_POSTS.slice(0, 5);

  const nextSlide = useCallback((): void => {
    setCurrent((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1));
  }, [featuredNews.length]);

  const prevSlide = useCallback((): void => {
    setCurrent((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1));
  }, [featuredNews.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSignificantSwipe = Math.abs(distance) > 50;
    
    if (isSignificantSwipe) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      className="relative w-full h-full group overflow-hidden bg-zinc-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* --- SLIDES --- */}
      <div className="relative w-full h-full">
        {featuredNews.map((news, index) => {
          const isActive = index === current;
          return (
            <div
              key={news.slug}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isActive 
                  ? "translate-x-0 opacity-100 z-10 scale-100 pointer-events-auto" 
                  : "translate-x-8 opacity-0 z-0 scale-[1.05] pointer-events-none"
              }`}
            >
              {/* Background Image & Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={news.image} 
                  className={`w-full h-full object-cover transition-transform duration-[6s] linear ${
                    isActive ? "scale-110" : "scale-100"
                  }`} 
                  alt={news.title} 
                />
                {/* Advanced Gradient Overlay: Bottom-heavy for text, subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-zinc-950/20 z-10" />
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end z-20">
                <div className={`p-6 sm:p-10 md:p-20 pb-20 sm:pb-24 transition-all duration-1000 delay-200 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                  
                  {/* Category & Status */}
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <span className="px-3 py-1 bg-pink-500 text-[9px] font-black uppercase tracking-[0.2em] text-white rounded-md shadow-lg shadow-pink-500/20">
                      {news.category}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 backdrop-blur-md border border-white/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_rgba(236,72,153,1)]" />
                        <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Live Now</span>
                    </div>
                  </div>

                  {/* Title: Improved responsiveness and line height */}
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-5 sm:mb-10 max-w-5xl tracking-tighter uppercase italic drop-shadow-2xl">
                    {news.title}
                    <span className="text-pink-500 not-italic block mt-1 sm:mt-2">{news.titleAccent}</span>
                  </h2>

                  {/* Action Button */}
                  <div className="flex items-center gap-4">
                    <Link to={`/article/${news.slug}`}>
                      <button className="group/btn h-12 sm:h-auto inline-flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-5 bg-white text-zinc-900 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-2xl">
                        <span>Full Story</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- DASHBOARD-STYLE CONTROLS (Hidden on small mobile) --- */}
      <div className="absolute bottom-8 right-6 md:right-16 z-30 flex items-center gap-6">
        
        {/* PROGRESS PILLS */}
        <div className="flex items-center gap-1.5">
          {featuredNews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current 
                  ? "w-8 sm:w-12 bg-pink-500" 
                  : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CHEVRON NAV (Hidden on Mobile) */}
        <div className="hidden sm:flex items-center gap-2">
            <button 
                onClick={prevSlide} 
                className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-pink-500 hover:border-pink-500 transition-all active:scale-95"
            >
                <ChevronLeft size={16} />
            </button>
            <button 
                onClick={nextSlide} 
                className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-pink-500 hover:border-pink-500 transition-all active:scale-95"
            >
                <ChevronRight size={16} />
            </button>
        </div>
      </div>

      {/* OVERLAY CORNER TEXT */}
      <div className="absolute top-8 left-8 z-30 hidden md:block">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 vertical-text origin-top-left">Trending / Live</p>
      </div>

      <style>{`
        .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}