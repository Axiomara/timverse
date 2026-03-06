import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/posts";

export default function NewsCarousel(): React.JSX.Element {
  const [current, setCurrent] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Ambil 5 berita terbaru
  const featuredNews = BLOG_POSTS.slice(0, 5);

  const nextSlide = useCallback((): void => {
    setCurrent((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1));
  }, [featuredNews.length]);

  const prevSlide = (): void => {
    setCurrent((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.targetTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 70) { nextSlide(); setTouchStart(null); }
    if (distance < -70) { prevSlide(); setTouchStart(null); }
  };

  return (
    /* h-full memastikan carousel mengikuti tinggi parent (min-h-550px atau h-600px) */
    <div 
      className="relative w-full h-full group overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* --- SLIDES --- */}
      <div className="relative w-full h-full">
        {featuredNews.map((news, index) => (
          <div
            key={news.slug}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              index === current 
                ? "translate-x-0 opacity-100 z-10 scale-100" 
                : "translate-x-full opacity-0 z-0 scale-105"
            }`}
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={news.image} 
                className="w-full h-full object-cover" 
                alt={news.title} 
              />
              {/* Gradient lebih tinggi di mobile (via-50%) agar teks terbaca jelas */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
            </div>

            {/* Content Container: Flexbox justify-end memaksa konten ke bawah */}
            <div className="absolute inset-0 flex flex-col justify-end z-20">
              <div className={`p-8 md:p-16 pb-20 md:pb-24 w-full transition-all duration-700 delay-300 ${
                index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                
                {/* Category Tag */}
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="px-3 py-1 bg-pink-600 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-lg shadow-lg">
                    {news.category}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                </div>

                {/* Title: Ukuran font responsif adalah kunci */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 md:mb-10 max-w-4xl tracking-tighter uppercase italic drop-shadow-2xl">
                  {news.title} <br className="hidden md:block" />
                  <span className="text-pink-500 not-italic block md:inline">{news.titleAccent}</span>
                </h2>

                {/* Action Button */}
                <div className="flex items-center gap-4">
                  <Link to={`/article/${news.slug}`}>
                    <button className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-2xl overflow-hidden">
                      <span className="relative z-10">Read Full Story</span>
                      <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- NAVIGATION BUTTONS (Hidden on Mobile) --- */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex pointer-events-none">
        <button 
          onClick={prevSlide} 
          className="p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 text-white hover:bg-pink-500 transition-all pointer-events-auto"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide} 
          className="p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 text-white hover:bg-pink-500 transition-all pointer-events-auto"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* --- SLIM PAGINATION BAR --- */}
      <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center gap-2 px-8 md:justify-end md:right-16">
        {featuredNews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === current 
                ? "w-12 bg-pink-500" 
                : "w-3 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}