// src/components/SmoothScroll.tsx
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Inisialisasi Lenis dengan durasi yang lebih responsif
    const lenis = new Lenis({
      duration: 1, // Sedikit lebih cepat dari 1.2 untuk rasa responsif
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Tambah sedikit sensitivitas
      touchMultiplier: 1.5, // Kurangi sedikit untuk kontrol sentuh lebih alami
      infinite: false,
    })

    lenisRef.current = lenis

    // Loop animasi menggunakan requestAnimationFrame
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Handle Resize
    const handleResize = () => {
      lenis.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      lenis.destroy()
    }
  }, [])

  // Refresh Lenis setiap kali pindah halaman
  useEffect(() => {
    if (lenisRef.current) {
      // Tunggu sedikit agar DOM selesai dirender/halaman baru masuk
      setTimeout(() => {
        lenisRef.current?.resize()
      }, 50)
    }
  }, [pathname])

  return <>{children}</>
}