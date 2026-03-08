import { useEffect, useState, useRef } from "react";
// --- IMPORT SENTRY ---
import * as Sentry from "@sentry/react";
import { 
  ArrowRight, 
  Newspaper, 
  Users, 
  Sparkles, 
  Globe, 
  ShieldCheck,
  Cpu,
  Palette,
  Mic2
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- COUNTER COMPONENT ---
function Counter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = numericValue / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  return <div ref={ref} className="font-black tabular-nums">{count.toLocaleString()}{suffix}</div>;
}

// --- ANIMATED SECTION WRAPPER ---
function FadeInSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// --- MAIN COMPONENT ---
function About() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: "250K+", label: "Monthly Readers", icon: <Users size={16} /> },
    { num: "500+", label: "Curated Stories", icon: <Newspaper size={16} /> },
    { num: "15+", label: "Lead Critics", icon: <ShieldCheck size={16} /> },
    { num: "100%", label: "Ad-Free Content", icon: <Sparkles size={16} /> }
  ];

  const categories = [
    { title: "Future Tech", desc: "Menelusuri AI, Web3, dan hardware yang mengubah cara kita hidup.", icon: <Cpu /> },
    { title: "Modern Art", desc: "Kurasi visual, desain kontemporer, dan ekspresi digital.", icon: <Palette /> },
    { title: "Voices", desc: "Interview eksklusif dengan para pemikir dan pionir industri.", icon: <Mic2 /> }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${
      isDarkMode ? "bg-[#050505] text-white" : "bg-[#fcfcfc] text-zinc-900"
    }`}>
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 md:pt-60 pb-32">
        
        {/* HERO */}
        <section className="mb-32 md:mb-56">
          <div className="max-w-5xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-500 text-[10px] font-bold uppercase tracking-widest mb-8">
              About Timverse
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase mb-12">
              The New <br />
              <span className="italic font-light text-zinc-400 dark:text-zinc-600">Standard</span> <br />
              Of Culture.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
              Kami tidak hanya menulis berita. Kami mendokumentasikan evolusi gaya hidup, teknologi, dan seni yang membentuk identitas generasi masa kini.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-32 md:mb-56">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <FadeInSection key={i} className={`delay-${i}`}>
                <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-md transition-all duration-500 group h-full">
                  <div className="text-pink-500 mb-8 transition-transform group-hover:scale-110">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-black tracking-tight mb-2"><Counter value={stat.num} /></div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <FadeInSection className="mb-32 md:mb-56">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
              What We <br /> <span className="text-pink-500">Document.</span>
            </h2>
            <p className="max-w-sm text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Eksplorasi mendalam melalui tiga pilar utama yang mendefinisikan Timverse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1px bg-zinc-200 dark:bg-zinc-800 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800">
            {categories.map((cat, i) => (
              <div key={i} className="bg-[#fcfcfc] dark:bg-[#050505] p-12 md:p-16 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-500 group">
                <div className="text-zinc-300 dark:text-zinc-700 group-hover:text-pink-500 transition-colors duration-500 mb-12">
                  {cat.icon}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{cat.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">{cat.desc}</p>
                <Link to="/archive" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                  Explore Archive <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* PHILOSOPHY */}
        <FadeInSection>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-200 dark:bg-zinc-800 group">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070" 
                alt="Culture" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">More Than <br /> Just a Media.</h2>
              <div className="space-y-8">
                {["Curation", "Perspective", "Quality"].map((t, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-pink-500 font-black">0{idx + 1}</span>
                      <h4 className="font-black uppercase tracking-widest text-sm group-hover:text-pink-500 transition-colors">{t}</h4>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 pl-8 text-sm leading-relaxed">
                      Kami mendefinisikan ulang cara informasi dikonsumsi dengan mengedepankan kualitas daripada kuantitas.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </main>

      <Footer />

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { 
          animation: fade-in-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; 
        }
        .reveal-section {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-0 { transition-delay: 0s; }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
      `}</style>
    </div>
  );
}

// --- WRAP WITH SENTRY ERROR BOUNDARY ---
export default Sentry.withErrorBoundary(About, {
  fallback: (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-12 text-center">
      <div className="max-w-md">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Something went wrong.</h2>
        <p className="text-zinc-500 text-sm mb-8">Our team has been notified. Please try refreshing the page.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-pink-500 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-pink-600 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  ),
  showDialog: true, // Menampilkan popup laporan Sentry jika terjadi error
});