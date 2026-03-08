import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { Sun, Moon, Menu, X, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import SearchOverlay from "./SearchOverlay";

// --- OPTIMASI: MEMOIZED COMPONENTS ---
// Mencegah re-render daftar kategori yang tidak perlu saat scroll
const CategoryLinks = memo(({ categories, closeMenu }: { categories: any[], closeMenu: () => void }) => (
  <>
    {categories.map((cat) => (
      <Link
        key={cat.name}
        to={cat.href}
        onClick={closeMenu}
        className="block px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors"
      >
        {cat.name}
      </Link>
    ))}
  </>
));

export default function Navbar() {
  const { dark, toggle } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- OPTIMASI: THROTTLED SCROLL ---
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

  // --- OPTIMASI: BODY LOCK ---
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  // --- DATA ---
  const categories = useMemo(() => [
    { name: "Movies", href: "/category/movies" },
    { name: "Games", href: "/category/gaming" },
    { name: "Music", href: "/category/music" },
    { name: "Tech", href: "/category/tech" },
  ], []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setCategoryOpen(false);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
          scrolled || open
            ? "py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center relative z-[110]">
            
            {/* --- 1. LEFT: LOGO --- */}
            <div className="flex justify-start">
              <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
                <div className="relative overflow-hidden w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 text-white dark:text-zinc-900 group-hover:text-white font-black text-xl transition-colors">T</span>
                </div>
                <div className="flex flex-col leading-none">
                  <h1 className="text-lg font-black tracking-[0.1em] dark:text-white text-zinc-900 uppercase">TIMVERSE</h1>
                  <span className="text-[9px] font-bold text-pink-500 tracking-widest uppercase italic">Papua Insight</span>
                </div>
              </Link>
            </div>

            {/* --- 2. CENTER: NAVIGATION (Desktop) --- */}
            <div className="hidden md:flex justify-center">
              <div className="flex items-center gap-1 p-1 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl backdrop-blur-md">
                <Link to="/" className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800">
                  Home
                </Link>

                <div className="relative group">
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-all rounded-xl group-hover:bg-white dark:group-hover:bg-zinc-800">
                    Topics <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                    <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
                      <CategoryLinks categories={categories} closeMenu={closeMenu} />
                    </div>
                  </div>
                </div>

                <Link to="/about" className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800">
                  About
                </Link>
                <Link to="/contact" className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800">
                  Contact
                </Link>
              </div>
            </div>

            {/* --- 3. RIGHT: UTILITIES --- */}
            <div className="flex justify-end items-center gap-3">
              {/* Desktop Icons */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400 active:scale-90"
              >
                <Search size={18} />
              </button>

              <button 
                onClick={toggle} 
                className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90"
              >
                {dark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-zinc-600" />}
              </button>

              {/* Mobile Icons - Ditambah gap-3 untuk jarak antar button */}
              <div className="flex md:hidden items-center gap-3">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white active:scale-90 transition-transform"
                >
                  <Search size={20} />
                </button>
                <button 
                  onClick={() => setOpen(!open)} 
                  className="p-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg active:scale-90 transition-transform"
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`fixed inset-0 h-screen w-screen md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl transition-all duration-500 ease-in-out ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          <div className="flex flex-col h-full px-8 pt-32 pb-12 overflow-y-auto">
            <div className="space-y-8">
              <Link to="/" onClick={closeMenu} className="text-5xl font-black text-zinc-900 dark:text-white block tracking-tighter uppercase">Home.</Link>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center justify-between w-full text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase"
                >
                  Topics.
                  <ChevronDown className={`transition-transform duration-500 ${categoryOpen ? 'rotate-180 text-pink-500' : ''}`} size={40} />
                </button>
                
                <div className={`grid transition-all duration-500 ease-in-out ${categoryOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden flex flex-col gap-6 pl-4 border-l-4 border-pink-500/20">
                    <CategoryLinks categories={categories} closeMenu={closeMenu} />
                  </div>
                </div>
              </div>

              <Link to="/about" onClick={closeMenu} className="text-5xl font-black text-zinc-900 dark:text-white block tracking-tighter uppercase">About.</Link>
              <Link to="/contact" onClick={closeMenu} className="text-5xl font-black text-pink-500 block tracking-tighter uppercase italic">Contact.</Link>
            </div>
            
            {/* Appearance Section - Dioptimasi dengan margin-top lebih besar (mt-12) */}
            <div className="mt-12 mb-8">
               <div className="flex items-center justify-between p-5 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Appearance</span>
                   <span className="font-black text-sm uppercase dark:text-white">{dark ? 'Dark Night' : 'Light Day'}</span>
                 </div>
                 <button 
                   onClick={toggle} 
                   className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-pink-500/20"
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