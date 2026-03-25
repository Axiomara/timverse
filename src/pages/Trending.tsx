import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Newspaper } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { trendingPosts, trendingCategories } from "../data/trending";
import TrendingHeader from "../components/trending/TrendingHeader";
import TrendingFilter from "../components/trending/TrendingFilter";
import TrendingCard from "../components/trending/TrendingCard";

export default function Trending() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return trendingPosts.filter(post => {
      const matchCategory = activeCategory === "All Topics" || post.kategori === activeCategory;
      const matchSearch = post.judul.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans flex flex-col relative overflow-x-hidden selection:bg-orange-500 selection:text-white">
      
      {/* --- ORNAMEN GRADIEN RAPI & SUBTLE --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-full max-w-[1000px] h-[300px] md:h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/15 via-orange-500/0 to-transparent pointer-events-none z-0" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24 flex-grow w-full relative z-10">
        
        {/* --- HEADER --- */}
        <TrendingHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* --- FILTER DROPDOWN --- */}
        <TrendingFilter 
          categories={trendingCategories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* --- BERITA LIST --- */}
        <div className="space-y-12 md:space-y-24">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <TrendingCard key={post.id} post={post} index={idx} />
              ))
            ) : (
              <div className="py-32 text-center opacity-30">
                <Newspaper size={64} className="mx-auto mb-6" />
                <h3 className="text-xl font-black uppercase tracking-widest">No matching news</h3>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
