import { ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-500 overflow-hidden flex flex-col justify-between p-8 sm:p-16 font-sans selection:bg-pink-500/30">
      
      {/* --- BACKGROUND ACCENT (Ultra Subtle) --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[50%] bg-pink-500/[0.03] dark:bg-pink-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[0%] left-[-10%] w-[50%] h-[40%] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

      {/* --- HEADER LOGO --- */}
      <header className="relative z-20 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => window.location.href = '/'}
        >
          <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg">
            <span className="text-white dark:text-zinc-900 font-black text-lg italic">P</span>
          </div>
          <span className="font-black tracking-[0.2em] text-sm uppercase italic opacity-80 group-hover:opacity-100 transition-opacity">Popverse</span>
        </div>
        <div className="text-[9px] font-black text-zinc-300 dark:text-zinc-700 tracking-[0.4em] uppercase border-l border-zinc-100 dark:border-zinc-900 pl-4">
          Error Log / 404
        </div>
      </header>

      {/* --- CONTENT UTAMA --- */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="space-y-2">
          
          {/* Angka 404 Besar dengan Zap Icon */}
          <div className="relative inline-block animate-in fade-in zoom-in duration-1000">
            <h1 className="text-[140px] md:text-[280px] font-black leading-none tracking-tighter inline-flex items-center text-zinc-100 dark:text-zinc-900/50 transition-colors">
              4<Zap className="w-16 h-16 md:w-32 md:h-32 text-pink-500 fill-pink-500 animate-pulse mx-[-10px] md:mx-[-20px]" />4
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase italic text-zinc-900 dark:text-zinc-100 drop-shadow-sm">
                    WADUH. <span className="text-pink-500">KOSONG.</span>
                </h2>
            </div>
          </div>

          <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <p className="text-zinc-400 dark:text-zinc-500 text-base md:text-lg font-medium leading-relaxed px-4">
              Halaman yang kamu cari mungkin sudah masuk <span className="text-zinc-900 dark:text-zinc-300 italic font-bold underline decoration-pink-500/30 underline-offset-4">archive</span> atau kamu typo ngetik URL-nya. Tenang, belum kiamat kok.
            </p>
            
            {/* Navigasi Minimalis */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a 
                href="/"
                className="group flex items-center justify-center gap-3 py-4 px-10 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
              >
                Balik Beranda
                <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </a>

              <button 
                onClick={() => window.history.back()}
                className="py-4 px-10 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-full font-black text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all active:scale-95"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER MINIMALIS --- */}
      <footer className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 pt-12">
        <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700">
          <a href="#" className="hover:text-pink-500 transition-colors">Movies</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Games</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Music</a>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest opacity-40">
                &copy; 2026 Popverse Magazine
            </p>
            <div className="h-px w-12 bg-zinc-100 dark:bg-zinc-900" />
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}