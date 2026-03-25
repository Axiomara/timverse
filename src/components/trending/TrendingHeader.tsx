import { Search, Flame, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface TrendingHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function TrendingHeader({ searchQuery, setSearchQuery }: TrendingHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-12 md:mb-20">
      <Link to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 hover:opacity-70 transition-all w-fit">
        <ArrowLeft size={14} /> Back
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] flex items-center gap-4">
            Trendin<span className="text-orange-500">g.</span>
          </h1>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
            <Flame size={14} className="text-orange-500" /> Top Read Stories This Week
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <input 
            type="text"
            placeholder="Search trending..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl md:rounded-full py-4 pl-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium border-none"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500" size={18} />
        </div>
      </div>
    </div>
  );
}
