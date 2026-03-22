import { motion } from "framer-motion";
import { PenTool, Sparkles } from "lucide-react";

export default function ContributeHero() {
  return (
    <section className="pt-32 md:pt-48 pb-12 px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 text-[10px] font-black uppercase tracking-[0.2em]">
          <Sparkles size={12} /> Become a Contributor
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
          Suarakan <span className="text-zinc-300 dark:text-zinc-800">Cerita</span> <br /> 
          Papua-mu<span className="text-pink-500">.</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
          Punya artikel, opini, atau liputan menarik seputar Timika? Timverse membuka ruang bagi penulis lokal untuk berkontribusi.
        </p>
      </motion.div>
    </section>
  );
}