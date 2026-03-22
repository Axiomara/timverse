import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContributeHero from "../components/contribute/ContributeHero";
import EmailAction from "../components/contribute/EmailAction";
import PageTransitionWrapper from "../components/PageTransitionWrapper";
import { CheckCircle2 } from "lucide-react";

export default function Contribute() {
  const guidelines = [
    "Format judul harus jelas dan menarik.",
    "Isi artikel minimal 300-500 kata.",
    "Sertakan nama lengkap dan email aktif.",
    "Lampirkan foto pendukung asli (bukan dari Google)."
  ];

  return (
    <PageTransitionWrapper>
      {/* Container utama dengan transisi warna halus */}
      <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-pink-500/30 transition-colors duration-500">
        <Navbar />
        
        <main className="relative overflow-hidden">
          {/* Efek gradien dekoratif di background (Optional - untuk estetika dark mode) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none" />

          <ContributeHero />
          
          {/* Section Panduan */}
          <section className="max-w-3xl mx-auto px-6 py-12 relative z-10">
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-sm space-y-8 transition-colors">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-pink-600 dark:text-pink-400">
                Submission Guidelines
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guidelines.map((text, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-500 mt-0.5 shrink-0 transition-colors" />
                    <p className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 leading-relaxed uppercase tracking-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Action Button Section */}
          <EmailAction />
        </main>

        <Footer />
      </div>
    </PageTransitionWrapper>
  );
}