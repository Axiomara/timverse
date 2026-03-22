import { useState } from "react";
import { Send, FileText, Mail, User, ArrowRight } from "lucide-react";

export default function SubmissionForm() {
  const [formData, setFormData] = useState({ name: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:hi@timverse.id?subject=[Kontributor] ${formData.subject}&body=Halo Timverse,%0D%0A%0D%0ANama: ${formData.name}%0D%0A%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-32">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl">
        
        {/* Input Nama */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <User size={12} /> Full Name
          </label>
          <input 
            required
            type="text" 
            placeholder="Siapa namamu?"
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-pink-500 transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* Input Subject */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <FileText size={12} /> Article Topic
          </label>
          <input 
            required
            type="text" 
            placeholder="Contoh: Budaya Amungme"
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-pink-500 transition-all"
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        {/* Textarea Pesan */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Mail size={12} /> Brief Description
          </label>
          <textarea 
            required
            rows={5}
            placeholder="Ceritakan sedikit tentang artikel yang ingin kamu kirim..."
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-3xl p-6 text-sm focus:ring-2 focus:ring-pink-500 transition-all"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="md:col-span-2 group flex items-center justify-between bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-500 hover:text-white transition-all transform active:scale-95"
        >
          Kirim via Email <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>

        <p className="md:col-span-2 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-tight">
          Lampirkan file naskah (Word/PDF) di jendela email yang akan terbuka.
        </p>
      </form>
    </div>
  );
}