import * as Sentry from "@sentry/react";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  Zap, 
  Globe, 
  AlertCircle
} from "lucide-react";
import { memo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- OPTIMIZED VARIANTS (Static object to save memory) ---
const FADE_UP: Variants = {
  initial: { opacity: 0, y: 15 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// --- OPTIMIZED MARQUEE ITEM (Memoized) ---
const MarqueeContent = memo(() => (
  <div className="flex animate-marquee gap-12 md:gap-24 items-center py-12 border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-sm select-none">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex gap-12 md:gap-24 items-center shrink-0">
        <span className="text-3xl font-black uppercase italic tracking-tighter opacity-20">Digital Excellence</span>
        <Globe className="text-pink-500 opacity-40" size={24} />
        <span className="text-3xl font-black uppercase italic tracking-tighter opacity-20">Mimika Pulse</span>
        <span className="text-3xl font-black uppercase italic tracking-tighter text-pink-500">2026 Edition</span>
      </div>
    ))}
  </div>
));

function About() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-pink-500/30 overflow-x-hidden">
      <Navbar />
      
      <main className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-56 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            
            <div className="lg:col-span-5 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-pink-500 font-black text-[10px] uppercase tracking-[0.4em]"
              >
                <Zap size={14} fill="currentColor" /> The Platform
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] italic"
              >
                Timverse <br />
                <span className="text-zinc-200 dark:text-zinc-800" style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}>Media</span> Project<span className="text-pink-500">.</span>
              </motion.h1>
            </div>

            <motion.div 
              variants={FADE_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 space-y-8"
            >
              <p className="text-xl md:text-4xl font-medium leading-tight tracking-tight text-zinc-800 dark:text-zinc-200">
                Mendefinisikan ulang jurnalisme digital di Papua melalui standar visual tinggi dan akurasi data yang tajam.
              </p>
              <div className="space-y-6 text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
                <p>
                  Timverse lahir dari kebutuhan akan platform informasi yang tidak hanya cepat, tetapi juga estetik dan kredibel. Kami berfokus pada dokumentasi perkembangan teknologi dan dinamika sosial di Mimika.
                </p>
                <p>
                  Dengan menggabungkan teknologi modern dan narasi mendalam, kami berkomitmen menjadi jendela dunia untuk melihat potensi besar Papua.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- OPTIMIZED MARQUEE --- */}
        <MarqueeContent />

        {/* --- CONTACT BENTO (Optimized Layout) --- */}
        <section className="max-w-7xl mx-auto px-6 py-24 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div 
              variants={FADE_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="md:col-span-2 p-8 md:p-16 rounded-[2.5rem] bg-zinc-900 text-white flex flex-col justify-between relative overflow-hidden group shadow-xl"
            >
              <div className="absolute -top-12 -right-12 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                <Mail size={320} />
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-pink-500 font-black text-[10px] uppercase tracking-[0.3em]">Direct Inquiry</p>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">Let's talk <br /> about it.</h2>
              </div>
              <div className="mt-16 relative z-10">
                <a href="mailto:hi@timverse.id" className="inline-flex items-center gap-4 group/link transition-transform active:scale-95">
                  <span className="text-xl md:text-4xl font-bold border-b border-white/10 group-hover/link:border-pink-500 transition-colors">
                    hi@timverse.id
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center group-hover/link:bg-pink-500 group-hover/link:text-white transition-all transform group-hover/link:rotate-45">
                    <ArrowUpRight size={20} />
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div 
              variants={FADE_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-pink-500 shadow-sm mb-12">
                <MapPin size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Location</p>
                <p className="text-lg md:text-xl font-bold leading-tight italic">
                  Kuala Kencana, <br />
                  Timika, Mimika <br />
                  Papua Tengah.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

// --- ERROR FALLBACK (Lightweight) ---
const ErrorFallback = ({ error, resetError }: { error: unknown; resetError: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-black p-6 text-center">
    <div className="space-y-6">
      <AlertCircle size={48} className="text-red-500 mx-auto" />
      <h2 className="text-white font-black uppercase tracking-tighter italic">Module Error.</h2>
      <button 
        onClick={() => { resetError(); window.location.reload(); }} 
        className="px-8 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-pink-500 transition-colors"
      >
        Reload Page
      </button>
    </div>
  </div>
);

export default Sentry.withProfiler(Sentry.withErrorBoundary(About, {
  fallback: ErrorFallback,
  onMount: () => { Sentry.setTag("ui_mode", "ultra_optimized_v1"); }
}));