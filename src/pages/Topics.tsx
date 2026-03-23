import { useEffect } from "react";
import { Layers, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopicCard from "../components/TopicCard";
import { TOPICS_DATA } from "../data/topics";
import * as Sentry from "@sentry/react";
import { motion } from "framer-motion";

function TopicsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans flex flex-col relative overflow-x-hidden">
      
      {/* --- ORNAMEN GRADIEN RAPI & SUBTLE --- */}
      {/* Di HP, gradient dilebarkan sedikit (w-[150%]) agar blur-nya tidak terpotong kaku */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-full max-w-[1000px] h-[300px] md:h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-pink-500/0 to-transparent pointer-events-none z-0" />
      
      <Navbar />

      {/* Padding di HP dikurangi (px-5, pt-28) agar konten lebih lega */}
      <main className="max-w-7xl mx-auto px-5 md:px-6 pt-28 md:pt-40 pb-20 md:pb-24 flex-grow w-full relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-12 md:mb-24 space-y-5 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-pink-500"
          >
            <Layers size={14} />
            <span>Curated Directory</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10">
            {/* Tipografi Bersih & Tegas (Disesuaikan untuk HP menjadi text-[4.5rem]) */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[4.5rem] sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.85] select-none"
            >
              Topi<span className="text-zinc-300 dark:text-zinc-800">cs</span><span className="text-pink-500">.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-md space-y-4 lg:pb-2"
            >
              {/* Teks paragraf di HP sedikit dikecilkan (text-[13px]) */}
              <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-base leading-relaxed italic border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 md:pl-6">
                Jelajahi berbagai pilihan artikel dalam kategori yang sesuai dengan minat Anda. Dari pembaruan teknologi terkini hingga ulasan mendalam.
              </p>
              <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 pt-1 md:pt-0">
                 <Sparkles size={12} className="text-amber-500" /> 
                 <span>{TOPICS_DATA.length} Topik Tersedia</span>
              </div>
            </motion.div>
          </div>
        </header>

        {/* --- GRID TOPIK --- */}
        {/* Di HP, jarak antar card dikurangi (gap-5) agar user tidak terlalu banyak scroll kosong */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 mb-20 md:mb-32">
          {TOPICS_DATA.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="w-full"
            >
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Sentry.withErrorBoundary(TopicsPage, {
  fallback: (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#050505] p-6 text-center">
      <h2 className="text-2xl md:text-4xl font-black uppercase italic mb-4 text-zinc-900 dark:text-white">Gangguan Sistem</h2>
      <p className="text-zinc-500 text-sm mb-6">Gagal memuat direktori topik.</p>
      <button onClick={() => window.location.reload()} className="bg-pink-500 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 transition-colors">
        Muat Ulang
      </button>
    </div>
  ),
});