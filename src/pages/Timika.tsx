import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Mountain, MapPin, Wind, Zap, ArrowDown, Globe, Compass, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

export default function Timika() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax & Transform Effects
  const yText = useTransform(scrollYProgress, [0, 0.2], [0, 250]);
  const opacityText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-500 dark:bg-[#050505] bg-zinc-50 dark:text-zinc-100 text-zinc-900 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Overlay Texture (Film Grain) */}
      <div className="fixed inset-0 pointer-events-none z-[99] dark:opacity-[0.03] opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div style={{ rotate: rotateValue }} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] dark:bg-amber-600/10 bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] dark:bg-amber-900/10 bg-amber-200/20 blur-[100px] rounded-full" />

        <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border dark:border-amber-500/20 border-amber-500/40 dark:bg-amber-500/5 bg-amber-500/10 mb-8"
          >
            <Compass size={14} className="text-amber-500 animate-spin-slow" />
            <span className="tracking-[0.4em] uppercase text-[9px] font-black text-amber-600 dark:text-amber-500">Deep in Central Papua</span>
          </motion.div>
          
          <h1 className="text-[22vw] md:text-[18rem] font-black leading-[0.8] tracking-tighter uppercase italic select-none drop-shadow-2xl">
            TIMI<span className="text-amber-500">KA</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <motion.p className="max-w-xs dark:text-zinc-500 text-zinc-400 text-xs md:text-sm leading-relaxed uppercase tracking-widest font-bold">
              Kordinat <br /> <span className="dark:text-zinc-200 text-zinc-800">4.3317° S, 136.8904° E</span>
            </motion.p>
            <div className="h-[1px] w-12 dark:bg-zinc-800 bg-zinc-300 hidden md:block" />
            <motion.p className="max-w-sm dark:text-zinc-400 text-zinc-600 font-medium md:text-lg italic">
              "Di mana salju abadi menyentuh urat emas bumi."
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold dark:text-zinc-500 text-zinc-400">Explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>

        {/* --- FIXED PARALLAX IMAGE --- */}
        <motion.div style={{ scale: scaleImage }} className="absolute inset-0 z-0">

          <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-[#050505]/60 dark:via-transparent dark:to-[#050505] from-zinc-50/80 via-transparent to-zinc-50 z-10" />
          
          <img 
            src="https://hubud.kemenhub.go.id/hubud/website//assets/file/bandara/f75b2f268ce01aea5a6a44155b2fa560.jpeg" 
            className="w-full h-full object-cover dark:opacity-50 opacity-40 transition-opacity duration-500 saturate-[1.2] brightness-[0.8] dark:brightness-[0.7]"
            alt="Mountains"
          />
        </motion.div>
      </section>

      {/* --- RUNNING TEXT MARQUEE --- */}
      <div className="bg-amber-500 py-6 overflow-hidden whitespace-nowrap flex border-y-2 border-black dark:border-white/10">
        {[1, 2, 3, 4].map((i) => (
          <motion.div 
            key={i}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex items-center gap-20 pr-20"
          >
            <span className="text-black font-black text-4xl italic uppercase tracking-tighter">Amungme & Kamoro Heritage</span>
            <Star className="text-black fill-black" size={24} />
            <span className="text-black font-black text-4xl italic uppercase tracking-tighter">Grasberg Mining Power</span>
            <Globe className="text-black" size={24} />
          </motion.div>
        ))}
      </div>

      {/* --- CONTENT GRID --- */}
      <section className="max-w-[1400px] mx-auto px-6 py-40">
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Card 1: Carstensz */}
          <motion.div 
            variants={fadeUp}
            className="md:col-span-7 h-[600px] rounded-[2.5rem] dark:bg-zinc-900 bg-white border dark:border-transparent border-zinc-200 overflow-hidden relative group cursor-crosshair shadow-xl dark:shadow-none"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 dark:opacity-60 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute top-10 right-10 flex gap-2">
                <span className="px-3 py-1 rounded-full border border-white/20 text-[10px] uppercase font-bold backdrop-blur-md text-white">7 Summits</span>
                <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] uppercase font-bold">Summit</span>
            </div>
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <Mountain className="text-amber-500 mb-6" size={48} />
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">Carstensz<br/>Pyramid</h3>
              <div className="flex items-center gap-4 text-zinc-300 group-hover:text-white transition-colors">
                <p className="max-w-xs text-sm font-medium italic">Puncak tertinggi di Oseania dengan gletser abadi yang langka.</p>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Mining Info */}
          <motion.div variants={fadeUp} className="md:col-span-5 flex flex-col gap-8">
            <div className="h-full rounded-[2.5rem] border dark:border-zinc-800 border-zinc-200 p-12 dark:bg-gradient-to-br dark:from-zinc-900/50 from-white to-transparent flex flex-col justify-between shadow-xl dark:shadow-none">
              <Zap className="text-amber-500 fill-amber-500" size={40} />
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 italic dark:text-white text-zinc-900">The Golden Pulse</h3>
                <p className="dark:text-zinc-500 text-zinc-600 leading-relaxed font-medium mb-8">
                  Mengelola tambang Grasberg yang ikonik. Bukan sekadar mineral, ini adalah denyut ekonomi yang menghubungkan Papua dengan pasar global.
                </p>
                <div className="pt-8 border-t dark:border-zinc-800 border-zinc-200 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-black dark:text-white text-zinc-900">#1</p>
                    <p className="text-[10px] uppercase dark:text-zinc-500 text-zinc-400 font-bold tracking-widest">Gold Reserve</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black dark:text-white text-zinc-900">30K+</p>
                    <p className="text-[10px] uppercase dark:text-zinc-500 text-zinc-400 font-bold tracking-widest">Workforce</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Culture Heritage */}
          <motion.div 
            variants={fadeUp}
            className="md:col-span-12 group relative rounded-[2.5rem] dark:bg-zinc-900/20 bg-white border dark:border-zinc-800 border-zinc-200 p-12 md:p-24 overflow-hidden shadow-xl dark:shadow-none"
          >
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Wind className="text-amber-500 mb-8" size={32} />
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8 dark:text-white text-zinc-900">
                  Kamoro <br /> <span className="dark:text-zinc-700 text-zinc-300">&</span> Amungme
                </h2>
                <p className="dark:text-zinc-400 text-zinc-600 max-w-md italic text-lg leading-relaxed">
                  "Menjaga harmoni antara gunung dan pantai melalui kearifan yang diwariskan lewat ukiran dan ritual leluhur."
                </p>
              </div>
              <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-zinc-100 dark:border-transparent">
                <img 
                   src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80" 
                   className="w-full h-full object-cover shadow-2xl"
                   alt="Culture"
                />
              </div>
            </div>
            <h4 className="absolute bottom-[-10%] right-[-5%] text-[20rem] font-black dark:text-white/[0.02] text-zinc-900/[0.03] pointer-events-none select-none">MIMIKA</h4>
          </motion.div>
        </motion.div>
      </section>

      {/* --- FEATURED STATS --- */}
      <section className="dark:bg-white bg-zinc-900 py-32 transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
          {[
            { label: "Altitude", val: "4,884m", desc: "Puncak Jayawijaya" },
            { label: "Territory", val: "21,693", desc: "Kilometer Persegi" },
            { label: "Establish", val: "1999", desc: "Tahun Pemekaran" }
          ].map((stat, i) => (
            <div key={i} className="dark:text-black text-white flex flex-col items-center text-center">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 text-amber-500">{stat.label}</span>
              <h2 className="text-7xl font-black tracking-tighter mb-2 italic">{stat.val}</h2>
              <p className="font-bold dark:text-zinc-500 text-zinc-400 uppercase text-xs">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="relative py-60 flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center"
        >
          <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-16 italic dark:text-white text-zinc-900">
            Witness the <br /> Greatness.
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/about" 
              className="px-16 py-6 dark:bg-white bg-zinc-900 dark:text-black text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-500 shadow-2xl"
            >
              Our Vision
            </Link>
            <button className="px-16 py-6 border dark:border-zinc-700 border-zinc-300 rounded-full font-black text-xs uppercase tracking-[0.2em] dark:hover:bg-zinc-800 hover:bg-zinc-100 transition-all dark:text-white text-zinc-900">
              Watch Documentary
            </button>
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}