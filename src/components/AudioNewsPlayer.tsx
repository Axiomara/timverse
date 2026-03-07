import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, Volume1, VolumeX, AudioLines } from "lucide-react"; 
import { motion } from "framer-motion";

interface AudioNewsProps {
  text: string;
  title: string;
}

export default function AudioNewsPlayer({ text, title }: AudioNewsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); 
  const [isSupported, setIsSupported] = useState(true);
  const [lastCharIndex, setLastCharIndex] = useState(0); 
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }
    synthRef.current = window.speechSynthesis;
    const loadVoices = () => synthRef.current?.getVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => synthRef.current?.cancel();
  }, []);

  const speak = (startIndex: number = 0) => {
    if (!synthRef.current) return;

    synthRef.current.cancel(); 

    const cleanText = text.replace(/<[^>]*>/g, '');
    const remainingText = cleanText.substring(startIndex);
    
    const utterance = new SpeechSynthesisUtterance(remainingText);
    
    // Cari suara Bahasa Indonesia
    const voices = synthRef.current.getVoices();
    const idVoice = voices.find(v => v.lang.includes('id-ID'));
    if (idVoice) utterance.voice = idVoice;

    // Terapkan Pengaturan
    utterance.volume = volume;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onboundary = (event) => {
      const currentPos = startIndex + event.charIndex;
      setLastCharIndex(currentPos);
      setProgress((currentPos / cleanText.length) * 100);
    };

    utterance.onend = () => {
      if (progress > 95) { // Benar-benar selesai
        setIsPlaying(false);
        setProgress(0);
        setLastCharIndex(0);
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused && utteranceRef.current) {
        synthRef.current.resume();
        setIsPlaying(true);
      } else {
        speak(lastCharIndex);
      }
    }
  };

  // Update volume saat user selesai menggeser (onMouseUp)
  // Ini cara paling stabil untuk update volume di browser
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isPlaying) {
      // Restart singkat dari posisi terakhir untuk menerapkan volume baru
      speak(lastCharIndex);
    }
  };

  const handleReset = () => {
    synthRef.current?.cancel();
    setIsPlaying(false);
    setProgress(0);
    setLastCharIndex(0);
    utteranceRef.current = null;
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume < 0.5) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  if (!isSupported) return null;

  return (
    <div className="my-6 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-all shadow-sm">
      <div className="flex flex-col gap-4">
        
        {/* Top Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-pink-600 text-white hover:bg-pink-500 transition-all shadow-lg shadow-pink-500/20 active:scale-90 shrink-0"
          >
            {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="ml-1" />}
            {isPlaying && <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <AudioLines size={12} className="text-pink-500 shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-widest text-pink-500">Audio News Reader</p>
            </div>
            <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">
              {title}
            </h4>
          </div>

          <button 
            onClick={handleReset}
            className="p-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:text-pink-500 border border-zinc-100 dark:border-zinc-700 transition-all shrink-0 shadow-sm"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-pink-500"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'tween', ease: "linear" }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] font-black text-zinc-400 uppercase tracking-widest">
            <span>Progress: {Math.round(progress)}%</span>
            <span className="flex items-center gap-1.5">
               {isPlaying && <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />}
               {isPlaying ? 'Now Reading' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Bottom Section: Visualizer & Volume */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="hidden sm:flex gap-0.5 h-4 items-center flex-1">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [4, 12, 6, 14, 4] } : { height: 4 }}
                transition={{ repeat: Infinity, duration: 0.5 + (i * 0.03), ease: "easeInOut" }}
                className={`w-1 rounded-full ${isPlaying ? 'bg-pink-500/40' : 'bg-zinc-200 dark:bg-zinc-800'}`}
              />
            ))}
          </div>

          {/* Slider Volume Responsive */}
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 px-4 py-2 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 w-full sm:w-auto justify-between">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <VolumeIcon />
              <span className="text-[10px] font-bold tabular-nums w-7">{Math.round(volume * 100)}%</span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              onMouseUp={(e) => handleVolumeChange(parseFloat((e.target as HTMLInputElement).value))}
              onTouchEnd={(e) => handleVolumeChange(parseFloat((e.target as HTMLInputElement).value))}
              className="w-24 md:w-32 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full appearance-none accent-pink-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}