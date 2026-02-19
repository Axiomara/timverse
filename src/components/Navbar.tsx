import { useState, useEffect } from "react"
import { Sun, Moon, Menu, X, ArrowRight, ChevronDown, Search } from "lucide-react"
import { Link } from "react-router-dom"
import useDarkMode from "../hooks/useDarkMode"
import SearchOverlay from "./SearchOverlay"

export default function Navbar() {
  const { dark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Efek scroll untuk merubah tampilan navbar (Blur & Border)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
  }, [open])

  const categories = [
    { name: "Movies", href: "/category/movies" },
    { name: "Games", href: "/category/gaming" },
    { name: "Music", href: "/category/music" },
    { name: "Tech", href: "/category/tech" },
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
          scrolled || open
            ? "py-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center relative z-[110]">
            
            {/* --- LOGO --- */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer" onClick={() => setOpen(false)}>
              <div className="relative overflow-hidden w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg]">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-white dark:text-zinc-900 group-hover:text-white font-black text-xl transition-colors">P</span>
              </div>
              <div className="flex flex-col leading-none">
                <h1 className="text-xl font-black tracking-[0.1em] dark:text-white text-zinc-900 uppercase">POPVERSE</h1>
                <span className="text-[10px] font-bold text-pink-500 tracking-widest uppercase">Magazine</span>
              </div>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <div className="hidden md:flex items-center gap-2 p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl backdrop-blur-md">
              <Link to="/" className="px-5 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800">
                Home
              </Link>

              {/* DROPDOWN CATEGORY (DESKTOP) */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-5 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-all rounded-xl group-hover:bg-white dark:group-hover:bg-zinc-800">
                  Categories <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {/* Dropdown Menu Wrapper */}
                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                  <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.href}
                        className="block px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/about" className="px-5 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800">
                About
              </Link>
              
              <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 opacity-50" />
              
              {/* SEARCH BUTTON */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400 active:scale-90"
              >
                <Search size={18} />
              </button>

              {/* DARK MODE TOGGLE */}
              <button 
                onClick={toggle} 
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-all active:scale-90"
              >
                {dark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-zinc-600" />}
              </button>
            </div>

            {/* JOIN BUTTON (DESKTOP) */}
            <div className="hidden md:block">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all active:scale-95 group border border-transparent dark:border-zinc-800">
                Join Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* MOBILE ACTIONS (SEARCH + MENU) */}
            <div className="flex items-center gap-3 md:hidden">
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

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`fixed inset-0 h-screen w-screen md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl transition-all duration-500 ease-in-out ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}>
          <div className="flex flex-col h-full px-8 pt-32 pb-12 overflow-y-auto">
            <div className="space-y-8">
              <Link to="/" onClick={() => setOpen(false)} className="text-4xl font-black text-zinc-900 dark:text-white block">Home</Link>
              
              {/* MOBILE ACCORDION CATEGORY */}
              <div className="space-y-4">
                <button 
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center justify-between w-full text-4xl font-black text-zinc-900 dark:text-white"
                >
                  Categories 
                  <ChevronDown className={`transition-transform duration-300 ${categoryOpen ? 'rotate-180 text-pink-500' : ''}`} size={32} />
                </button>
                
                <div className={`grid transition-all duration-500 ease-in-out ${categoryOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden flex flex-col gap-5 pl-4 border-l-4 border-pink-500/20">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.name} 
                        to={cat.href} 
                        onClick={() => setOpen(false)}
                        className="text-2xl font-bold text-zinc-500 dark:text-zinc-400 active:text-pink-500 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/about" onClick={() => setOpen(false)} className="text-4xl font-black text-zinc-900 dark:text-white block">About</Link>
            </div>
            
            {/* MOBILE FOOTER */}
            <div className="mt-auto space-y-6">
               <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                 <span className="font-bold dark:text-white">{dark ? 'Light Mode' : 'Dark Mode'}</span>
                 <button 
                   onClick={toggle} 
                   className="px-6 py-2 rounded-xl bg-pink-500 text-white font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform"
                 >
                   Switch
                 </button>
               </div>
               <button className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-pink-500/20 active:scale-95 transition-transform">
                 JOIN POPVERSE <ArrowRight />
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- SEARCH OVERLAY COMPONENT --- */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}