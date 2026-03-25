import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface TrendingFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function TrendingFilter({ categories, activeCategory, setActiveCategory }: TrendingFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative z-40 mb-12 md:mb-16">
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-between w-full md:w-64 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-6 py-4 rounded-2xl shadow-sm hover:border-orange-500 transition-all"
      >
        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
          Filter: <span className="text-orange-500 ml-2">{activeCategory}</span>
        </span>
        <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <>
            {/* Overlay to close dropdown */}
            <div className="fixed inset-0 z-[-1]" onClick={() => setIsDropdownOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 w-full md:w-64 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                    activeCategory === cat 
                      ? "bg-orange-500 text-white" 
                      : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-orange-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
