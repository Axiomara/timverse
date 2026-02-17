import React, { useState, useEffect, useCallback } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom" // Tambahkan Link untuk navigasi
import { BLOG_POSTS } from "../data/posts" // Import data asli

export default function NewsCarousel(): React.JSX.Element {
  const [current, setCurrent] = useState<number>(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Kita ambil 3-5 berita terbaru saja untuk carousel agar tidak terlalu penuh
  const featuredNews = BLOG_POSTS.slice(0, 5)

  const nextSlide = useCallback((): void => {
    setCurrent((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1))
  }, [featuredNews.length])

  const prevSlide = (): void => {
    setCurrent((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touchEnd = e.targetTouches[0].clientX
    const distance = touchStart - touchEnd
    if (distance > 70) { nextSlide(); setTouchStart(null); }
    if (distance < -70) { prevSlide(); setTouchStart(null); }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20 relative z-10 overflow-hidden group">
      <div 
        className="relative h-[550px] md:h-[650px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-900"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="relative w-full h-full">
          {featuredNews.map((news, index) => (
            <div
              key={news.slug}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                index === current 
                  ? "translate-x-0 opacity-100 z-10 scale-100" 
                  : index < current 
                    ? "-translate-x-full opacity-0 z-0" 
                    : "translate-x-full opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
              <img src={news.image} className="w-full h-full object-cover" alt={news.title} />

              {index === current && (
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 pb-24 md:pb-28 z-20">
                  <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-pink-600 text-[10px] font-black uppercase tracking-widest text-white">
                        {news.category}
                      </span>
                      <div className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
                    </div>

                    <h2 className="text-3xl md:text-6xl font-black text-white leading-[1.1] mb-8 max-w-4xl tracking-tight drop-shadow-xl uppercase italic">
                      {news.title} <span className="text-pink-500 not-italic">{news.titleAccent}</span>
                    </h2>

                    {/* Menggunakan Link agar tombol mengarah ke halaman detail artikel */}
                    <Link to={`/article/${news.slug}`}>
                      <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-pink-500 hover:text-white transition-all active:scale-95 shadow-2xl">
                        Read Story <ArrowRight size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- NAVIGATION BUTTONS --- */}
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex pointer-events-none">
          <button onClick={prevSlide} className="p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-pink-500 transition-all pointer-events-auto shadow-xl"><ChevronLeft size={24} /></button>
          <button onClick={nextSlide} className="p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-pink-500 transition-all pointer-events-auto shadow-xl"><ChevronRight size={24} /></button>
        </div>

        {/* --- PAGINATION BAR --- */}
        <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center gap-2 px-8 md:justify-end md:right-12 md:left-auto">
          {featuredNews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === current 
                  ? "w-16 bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)]" 
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}