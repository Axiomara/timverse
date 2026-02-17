import { useState, useEffect } from "react"
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom" // Pastikan import Link
import useDarkMode from "../hooks/useDarkMode"

export default function Navbar() {
  const { dark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const navLinks = [
    { name: "Movies", href: "/category/movies" },
    { name: "Games", href: "/category/gaming" },
    { name: "Music", href: "/category/music" },
  ]

  return (
    <nav 
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled || open
          ? "py-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center relative z-[110]">
          
          {/* --- LOGO SECTION (DIPERBAIKI) --- */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => setOpen(false)}
          >
            <div className="relative overflow-hidden w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg]">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-white dark:text-zinc-900 group-hover:text-white font-black text-xl transition-colors">P</span>
            </div>
            <div className="flex flex-col leading-none">
              <h1 className="text-xl font-black tracking-[0.1em] dark:text-white text-zinc-900 uppercase">
                POPVERSE
              </h1>
              <span className={`text-[10px] font-bold text-pink-500 tracking-widest uppercase transition-all transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                Magazine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative px-6 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 group/link"
              >
                {link.name}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-pink-500 rounded-full transition-all group-hover/link:w-4" />
              </Link>
            ))}
            
            <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 opacity-50" />
            
            <button
              onClick={toggle}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400 active:scale-90"
              aria-label="Toggle Dark Mode"
            >
              <div className="relative w-5 h-5">
                <Sun className={`absolute inset-0 transform transition-all duration-500 ${dark ? 'scale-100 rotate-0 opacity-100 text-yellow-500' : 'scale-0 -rotate-90 opacity-0'}`} />
                <Moon className={`absolute inset-0 transform transition-all duration-500 ${!dark ? 'scale-100 rotate-0 opacity-100 text-zinc-600' : 'scale-0 rotate-90 opacity-0'}`} />
              </div>
            </button>
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:block">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all active:scale-95 group">
              Join Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-all active:scale-90 shadow-lg"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Menu Dropdown */}
      <div
        className={`fixed inset-0 h-screen w-screen md:hidden transition-all duration-500 ease-in-out ${
          open 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl flex flex-col justify-between px-8 pt-32 pb-12">
          <div className="space-y-6">
            <p className="text-[10px] font-black underline decoration-pink-500 decoration-2 underline-offset-8 tracking-[0.3em] text-zinc-400 uppercase mb-10">Main Navigation</p>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="group flex items-center justify-between"
                  onClick={() => setOpen(false)}
                >
                  <span 
                    className={`text-5xl font-black transition-all duration-700 ${
                      open ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span className="text-zinc-900 dark:text-white group-hover:text-pink-500 transition-colors">
                      {link.name}
                    </span>
                  </span>
                  <ArrowRight 
                    className={`text-pink-500 transition-all duration-700 opacity-0 group-hover:opacity-100 -translate-x-5 group-hover:translate-x-0`} 
                    size={32}
                  />
                </Link>
              ))}
            </div>
          </div>
          
          <div className={`space-y-6 transition-all duration-700 delay-300 ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                   {dark ? <Sun size={18}/> : <Moon size={18}/>}
                 </div>
                 <span className="font-bold text-sm dark:text-white">{dark ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
              <button 
                onClick={toggle}
                className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold active:scale-95 transition-transform"
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
  )
}