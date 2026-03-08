import { motion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
}

export default function Magnetic({ children }: MagneticProps) {

  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // x * 0.5 dan y * 0.5 menentukan seberapa jauh elemen "tertarik" kursor
    setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
  };

  const handleMouseLeave = () => {
    // Mengembalikan elemen ke posisi semula saat kursor keluar
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: "relative", display: "inline-block" }} // inline-block agar lebar div mengikuti isi
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.1 
      }}
    >
      {children}
    </motion.div>
  );
}