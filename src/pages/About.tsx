import { useEffect, useState, useRef } from "react";
import { motion, type Variants, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Newspaper, Users, Zap, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- KOMPONEN ANIMASI ANGKA (COUNTER) ---
function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [motionValue, isInView, numericValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="tabular-nums font-black">0{suffix}</span>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const features = [
  { icon: <Newspaper size={18} />, title: "Editorial", color: "bg-pink-500/10 text-pink-500", desc: "Narasi mendalam yang melampaui sekadar permukaan berita." },
  { icon: <Users size={18} />, title: "Community", color: "bg-purple-500/10 text-purple-500", desc: "Ekosistem inklusif untuk merayakan fandom bersama." },
  { icon: <Zap size={18} />, title: "Velocity", color: "bg-amber-500/10 text-amber-500", desc: "Kecepatan informasi tanpa mengorbankan integritas data." },
  { icon: <Heart size={18} />, title: "Integrity", color: "bg-red-500/10 text-red-500", desc: "Kecintaan murni pada budaya populer di setiap baris kata." }
];

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      initial={false}
      animate={{ 
        backgroundColor: isDarkMode ? "#080808" : "#fafafa",
        color: isDarkMode ? "#f4f4f5" : "#18181b" 
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen w-full relative overflow-x-hidden selection:bg-pink-500/30"
    >
      <Navbar />
      
      {/* --- ELITE AMBIENCE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: isDarkMode ? 0.4 : 0.8 }}
          className="absolute top-[-5%] right-[-10%] w-[80%] md:w-[70%] h-[40%] bg-pink-500/10 dark:bg-pink-600/5 blur-[80px] md:blur-[140px] rounded-full" 
        />
        <motion.div 
          animate={{ opacity: isDarkMode ? 0.4 : 0.8 }}
          className="absolute bottom-[-5%] left-[-10%] w-[80%] md:w-[60%] h-[40%] bg-purple-600/10 dark:bg-purple-700/5 blur-[80px] md:blur-[140px] rounded-full" 
        />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 pt-32 md:pt-52 pb-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 mb-24 md:mb-52">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="h-[1px] w-8 md:w-12 bg-pink-500" />
                <span className="text-pink-500 font-bold tracking-[0.3em] uppercase text-[9px] md:text-[10px]">Manifesto</span>
              </div>
              <h1 className="text-[13vw] sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-10 uppercase">
                Obsessed <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">With Pop</span> <br />
                Culture.
              </h1>
            </motion.div>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
              className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium border-l-2 border-zinc-200 dark:border-zinc-800 pl-6 md:pl-8 max-w-sm"
            >
              Popverse hadir sebagai antitesis dari jurnalisme dangkal. Kami menyelami estetika yang membentuk dunia hari ini.
            </motion.p>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 mb-24 md:mb-52 border-y border-zinc-200 dark:border-zinc-800 py-16 md:py-20"
        >
          {[
            { num: "250K+", label: "Readers" },
            { num: "500+", label: "Articles" },
            { num: "15+", label: "Critics" },
            { num: "100%", label: "Independent" }
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center md:items-start group">
              <div className="text-3xl md:text-5xl font-black tracking-tighter mb-2 flex items-center">
                <Counter value={stat.num} />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 scale-0 group-hover:scale-100 transition-transform duration-300" />
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- FEATURES GRID --- */}
        <section className="mb-24 md:mb-52">
          <div className="flex flex-col mb-12 md:mb-16 gap-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">Why We Are <br className="hidden md:block" /> Different</h2>
            <p className="text-zinc-500 text-xs md:text-sm max-w-xs mx-auto md:mx-0 font-medium">Data analitik bertemu intuisi kreatif.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {features.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-900 dark:hover:bg-zinc-100 transition-all duration-500 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-12 md:mb-20 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-3 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors">{item.title}</h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium group-hover:text-zinc-300 dark:group-hover:text-zinc-600 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* --- CTA SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] md:rounded-[4rem] bg-zinc-900 dark:bg-zinc-100 p-10 md:p-32 overflow-hidden text-center"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             <Star size={400} className="text-white dark:text-zinc-900 animate-[spin_20s_linear_infinite]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <Star className="text-pink-500 mx-auto mb-6 md:mb-8 animate-[spin_8s_linear_infinite]" size={32} />
            <h2 className="text-3xl md:text-7xl font-black text-white dark:text-zinc-900 tracking-tighter mb-8 md:mb-10 uppercase leading-[0.9]">
              Be part of <br className="md:hidden" /> the evolution.
            </h2>
            <Link 
              to="/login"
              className="group inline-flex items-center gap-4 md:gap-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-all duration-500 shadow-2xl"
            >
              Join the club <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}