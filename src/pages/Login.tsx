import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] dark:bg-[#050505] px-4 sm:px-6 py-10 sm:py-24 overflow-hidden relative">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 dark:bg-pink-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 dark:bg-purple-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* --- BRAND LOGO --- */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="group flex flex-col items-center gap-2 interactive text-center">
            <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white dark:text-zinc-900 font-black text-2xl">P</span>
            </div>
            <div>
              <h1 className="text-xs font-black tracking-[0.3em] uppercase dark:text-white text-zinc-900">Popverse</h1>
            </div>
          </Link>
        </div>

        {/* --- MAIN CARD --- */}
        <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 sm:p-10 rounded-[2rem] shadow-sm">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Welcome Back</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 ml-1 uppercase tracking-wider">Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-pink-500 transition-colors duration-300">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-100/50 dark:bg-zinc-800/30 border border-zinc-200/50 dark:border-zinc-700/30 focus:border-pink-500/50 focus:bg-white dark:focus:bg-zinc-800/60 rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all dark:text-white text-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-pink-500 hover:text-pink-600 transition-colors interactive">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-pink-500 transition-colors duration-300">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-100/50 dark:bg-zinc-800/30 border border-zinc-200/50 dark:border-zinc-700/30 focus:border-pink-500/50 focus:bg-white dark:focus:bg-zinc-800/60 rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all dark:text-white text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98] interactive shadow-lg shadow-zinc-900/10 dark:shadow-none"
              >
                Sign In
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {/* --- DIVIDER --- */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800"></span>
            </div>
            <span className="relative bg-[#fdfdfd] dark:bg-[#121212] px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">OR</span>
          </div>

          {/* --- SOCIAL BUTTONS --- */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-[0.98] interactive">
              <Github size={16} /> GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-[0.98] interactive">
              <Chrome size={16} /> Google
            </button>
          </div>
        </div>

        {/* --- FOOTER LINK --- */}
        <p className="text-center mt-8 text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
          New to Popverse?{" "}
          <Link to="/register" className="text-pink-500 font-bold hover:underline interactive decoration-2 underline-offset-4">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}