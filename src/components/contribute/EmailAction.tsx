import { Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function EmailAction() {
  const emailRecipient = "hi@timverse.id";
  const emailSubject = "[KONTRIBUSI ARTIKEL] Judul Artikel Kamu";
  const emailBody = `Article Title: %0D%0AArticle Body: %0D%0AWriter Name: %0D%0AWriter Email: %0D%0A%0D%0A(Silakan lampirkan dokumen naskah dan foto pendukung di sini)`;

  const handleSendEmail = () => {
    window.location.href = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-8 md:p-16 rounded-[3rem] text-center space-y-8 shadow-2xl relative overflow-hidden"
      >
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Mail size={120} />
        </div>

        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
            Siap untuk <br /> Berkontribusi?
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500 font-medium text-sm md:text-base max-w-md mx-auto">
            Klik tombol di bawah untuk membuka draf email dengan format yang sudah kami siapkan.
          </p>
        </div>

        <button 
          onClick={handleSendEmail}
          className="group relative inline-flex items-center gap-4 bg-pink-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-600 transition-all active:scale-95 shadow-xl shadow-pink-500/20"
        >
          Buka Email Sekarang <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
        </button>

        <div className="pt-8 border-t border-white/10 dark:border-zinc-100 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 opacity-60">
          <div className="text-left">
            <p className="text-[8px] font-black uppercase tracking-widest">Recipient</p>
            <p className="text-sm font-bold lowercase">hi@timverse.id</p>
          </div>
          <div className="text-left">
            <p className="text-[8px] font-black uppercase tracking-widest">Format</p>
            <p className="text-sm font-bold uppercase">Standardized Draft</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}