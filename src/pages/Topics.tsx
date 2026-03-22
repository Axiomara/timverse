import { useEffect } from "react";
import { Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopicCard from "../components/TopicCard";
import { TOPICS_DATA } from "../data/topics";
import * as Sentry from "@sentry/react";

function TopicsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 flex-grow w-full">
        {/* --- HEADER --- */}
        <header className="mb-16 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">
            <Layers size={14} />
            <span>Semua Topik</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.85] break-words">
            Topics
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg italic leading-relaxed pt-4 border-t border-zinc-100 dark:border-zinc-900">
            Jelajahi berbagai pilihan artikel pilihan kami dalam kategori yang sesuai dengan minat Anda. 
            Dari pembaruan teknologi terkini hingga ulasan mendalam.
          </p>
        </header>

        {/* --- GRID TOPIK --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-32 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-150 fill-mode-both">
          {TOPICS_DATA.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Sentry.withErrorBoundary(TopicsPage, {
  fallback: (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-6 text-center">
      <h2 className="text-4xl font-black uppercase italic mb-4">Ada Masalah Teknis</h2>
      <button onClick={() => window.location.reload()} className="bg-pink-500 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest">Muat Ulang</button>
    </div>
  ),
});
