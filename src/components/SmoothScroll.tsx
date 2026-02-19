// src/components/SmoothScroll.tsx
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2, // Durasi scroll (semakin besar semakin lambat/halus)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fungsi pelambatan
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Loop animasi menggunakan requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy() // Bersihkan saat komponen tidak digunakan
    }
  }, [])

  return <>{children}</>
}