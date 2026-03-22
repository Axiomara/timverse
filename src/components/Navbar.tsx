import { useState, useEffect, useCallback, useRef } from "react";
import { Sun, Moon, Menu, X, Search, Radio, Edit3, Home as HomeIcon, Info, Phone, LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import SearchOverlay from "./SearchOverlay";

// Categories dan dropdown sudah digantikan route Topics

export default function Navbar() {
  const { dark, toggle } = useDarkMode();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; 
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
  }, [open]);

  // Category array sudah dipindahkan ke data/topics.ts

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav 
        style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
        className={`fixed top-0 z-[100] w-full transition-all duration-500 ease-in-out ${
          scrolled || open
            ? "py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-12 items-center relative z-[110]">
            
            {/* --- 1. LEFT: LOGO --- */}
            <div className="md:col-span-3 flex justify-start">
              <Link to="/" className="flex items-center gap-3 group active:scale-95 transition-transform" onClick={closeMenu}>
                <div className="relative overflow-hidden w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center transition-all group-hover:rotate-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 text-white dark:text-zinc-900 group-hover:text-white font-black text-xl">T</span>
                </div>
                <div className="flex flex-col leading-none">
                  <h1 className="text-lg font-black tracking-tight dark:text-white text-zinc-900 uppercase">TIMVERSE</h1>
                  <span className="text-[9px] font-bold text-pink-500 tracking-widest uppercase italic mt-0.5">Papua Insight</span>
                </div>
              </Link>
            </div>

            {/* --- 2. CENTER: FULL DESKTOP NAVIGATION --- */}
            <div className="hidden md:flex md:col-span-6 justify-center">
              <div className="flex items-center gap-1 p-1 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl backdrop-blur-md">
                <Link to="/" className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 ${isActive('/') ? 'text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}>Home</Link>
                
                <Link to="/timika/news" className={`flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 ${isActive('/timika/news') ? 'text-pink-500' : 'text-zinc-500'}`}>
                  <Radio size={12} className={isActive('/timika/news') ? '' : 'animate-pulse text-pink-500'} /> Timika
                </Link>

                <Link to="/topics" className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 ${isActive('/topics') ? 'text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}>Topics</Link>

                <Link to="/contribute" className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 ${isActive('/contribute') ? 'text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}>Write</Link>
                <Link to="/about" className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 ${isActive('/about') ? 'text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}>About</Link>
              </div>
            </div>

            {/* --- 3. RIGHT: UTILITIES --- */}
            <div className="md:col-span-3 flex justify-end items-center gap-2">
              <button onClick={() => setIsSearchOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400 active:scale-90">
                <Search size={20} />
              </button>
              <button onClick={toggle} className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90">
                {dark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-zinc-600" />}
              </button>
              <button onClick={() => setOpen(!open)} className="md:hidden p-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg active:scale-90 transition-transform">
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY (REFINED FONT & LAYOUT) --- */}
        <div 
          className={`fixed inset-0 h-[100dvh] w-screen md:hidden bg-white dark:bg-zinc-950 transition-all duration-500 ease-out ${
            open ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
          }`}
        >
          <div 
            ref={scrollContainerRef}
            className="flex flex-col h-full overflow-y-auto overscroll-contain px-6 pt-28 pb-10"
          >
            {/* Navigasi Utama (Font Diperkecil & Rapi) */}
            <div className="flex-grow space-y-10">
              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-pink-500/60 ml-1">Explore</p>
                <div className="grid gap-2">
                  <Link to="/" onClick={closeMenu} className="flex items-center justify-between p-5 rounded-[2rem] bg-zinc-50 dark:bg-white/5 group active:bg-pink-500 active:text-white transition-all">
                    <div className="flex items-center gap-4">
                      <HomeIcon size={20} className="text-zinc-400 group-active:text-white" />
                      <span className="text-xl font-black uppercase tracking-tighter italic">Home</span>
                    </div>
                  </Link>
                  <Link to="/timika/news" onClick={closeMenu} className="flex items-center justify-between p-5 rounded-[2rem] bg-pink-500 text-white shadow-lg shadow-pink-500/20 active:scale-95 transition-all">
                    <div className="flex items-center gap-4">
                      <Radio size={20} className="animate-pulse" />
                      <span className="text-xl font-black uppercase tracking-tighter italic">Timika News</span>
                    </div>
                  </Link>
                  <Link to="/topics" onClick={closeMenu} className="flex items-center justify-between p-5 rounded-[2rem] bg-zinc-50 dark:bg-white/5 group active:bg-pink-500 active:text-white transition-all">
                    <div className="flex items-center gap-4">
                      <LayoutGrid size={20} className="text-zinc-400 group-active:text-white" />
                      <span className="text-xl font-black uppercase tracking-tighter italic">Topics</span>
                    </div>
                  </Link>

                  <Link to="/contribute" onClick={closeMenu} className="flex items-center justify-between p-5 rounded-[2rem] bg-zinc-50 dark:bg-white/5 group active:bg-pink-500 active:text-white transition-all">
                    <div className="flex items-center gap-4">
                      <Edit3 size={20} className="text-zinc-400 group-active:text-white" />
                      <span className="text-xl font-black uppercase tracking-tighter italic">Write Story</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Topics Grid Digantikan oleh Link di Atas */}

              {/* Util Grid */}
              <div className="grid grid-cols-2 gap-3">
                <Link to="/about" onClick={closeMenu} className="p-5 rounded-[2rem] bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center gap-3 active:scale-95 transition-all">
                  <Info size={16} className="text-pink-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">About</span>
                </Link>
                <Link to="/contact" onClick={closeMenu} className="p-5 rounded-[2rem] bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center gap-3 active:scale-95 transition-all">
                  <Phone size={16} className="text-pink-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">Contact</span>
                </Link>
              </div>
            </div>
            
            {/* Appearance Footer */}
            <div className="mt-12 pt-6 border-t border-zinc-100 dark:border-white/5">
               <div className="flex items-center justify-between p-5 rounded-[2.5rem] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl">
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40 text-left">Theme Mode</span>
                   <span className="font-black text-sm uppercase italic text-left">{dark ? 'Midnight' : 'Daylight'}</span>
                 </div>
                 <button 
                   onClick={toggle} 
                   className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center active:scale-75 transition-all shadow-lg shadow-pink-500/20"
                 >
                   {dark ? <Sun size={20} /> : <Moon size={20} />}
                 </button>
               </div>
            </div>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}