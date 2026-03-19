import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Mail, Bell } from "lucide-react";
import { useState } from "react";

export default function NewsletterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // pengiriman data ke API
    setTimeout(() => {
      console.log("terdaftar untuk:", email);
      setStatus("success");
      
      // Tutup otomatis setelah sukses
      setTimeout(() => {
        onClose();
        // Reset state setelah modal benar-benar tertutup
        setTimeout(() => {
          setStatus("idle");
          setEmail("");
        }, 500);
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
          {/* Backdrop (Latar Belakang Gelap) */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl"
          />

          {/* Konten Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[3rem] p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(236,72,153,0.3)] border border-zinc-200 dark:border-zinc-800"
          >
            {/* Tombol Close */}
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 text-zinc-400 hover:text-pink-500 transition-colors"
            >
              <X size={28} />
            </button>

            {status === "success" ? (
              <div className="text-center py-10 space-y-6">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1, rotate: 360 }}
                  className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase tracking-tighter dark:text-white">You're In!</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium">Cek email Anda untuk konfirmasi.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header Modal */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[10px] font-black uppercase tracking-widest">
                    <Bell size={12} /> Newsletter
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none dark:text-white">
                    Mimika <br /> 
                    <span className="text-pink-500 italic">Weekly Digest.</span>
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    Dapatkan update berita Papua terbaru dan konten eksklusif langsung ke email Anda.
                  </p>
                </div>

                {/* Form Input */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@anda.com" 
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 dark:text-white outline-none border-2 border-transparent focus:border-pink-500/50 transition-all font-bold" 
                    />
                  </div>

                  <button 
                    disabled={status === "loading"}
                    className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-all active:scale-95 disabled:opacity-50"
                  >
                    {status === "loading" ? "Mengirim..." : (
                      <>Daftar Sekarang <Send size={16} /></>
                    )}
                  </button>
                </form>

                <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest font-bold">
                  No Spam. Unsubscribe anytime.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}