import { Link } from "react-router-dom";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = ['Gaming', 'Movies', 'Tech', 'Music', 'Anime'];
  const timikaNews = ['Development', 'Culture', 'Sports', 'Local Pulse'];
  const socialLinks = [
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
  ];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 mt-32">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        
        {/* --- TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand & Identity (Takes 5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <Link 
              to="/" 
              className="text-4xl font-black tracking-[0.2em] uppercase italic text-zinc-900 dark:text-white transition-opacity hover:opacity-80"
            >
              Popverse
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-md italic font-medium">
              "Navigasi budaya pop, gaya hidup, dan denyut nadi kota Mimika dalam satu genggaman digital."
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={`p-4 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-400 ${social.color} transition-all duration-300 shadow-sm border border-zinc-100 dark:border-zinc-800 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Quick Links (Takes 6 columns) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-12">
            
            {/* Column: Categories */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-pink-500 border-l-2 border-pink-500 pl-4">
                Explore
              </h4>
              <ul className="space-y-5">
                {categories.map(cat => (
                  <li key={cat}>
                    <Link 
                      to={`/category/${cat.toLowerCase()}`} 
                      className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest"
                    >
                      <span className="w-0 group-hover:w-4 h-[2px] bg-pink-500 transition-all duration-300"></span>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column: Timika News */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 border-l-2 border-indigo-500 pl-4">
                Local Pulse
              </h4>
              <ul className="space-y-5">
                {timikaNews.map(item => (
                  <li key={item}>
                    <Link 
                      to="/timika-news" 
                      className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors uppercase tracking-widest"
                    >
                      <span className="w-0 group-hover:w-4 h-[2px] bg-indigo-500 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-12 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {['About', 'Contact', 'Privacy Policy', 'Terms'].map(link => (
              <Link 
                key={link} 
                to={`/${link.toLowerCase().replace(' ', '-')}`} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-500 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-3">
            <div className="h-1 w-1 rounded-full bg-pink-500 animate-pulse"></div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
              &copy; {currentYear} <span className="text-zinc-900 dark:text-white">Popverse Media</span>
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}