import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import ArticleDetail from "./pages/ArticleDetail"
import NotFound from "./pages/NotFound"

// Komponen pembantu agar setiap pindah halaman, scroll otomatis ke atas
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function App() {
  return (
    <>
      {/* Menangani reset scroll otomatis */}
      <ScrollToTop />
      
      <Routes>
        {/* 1. Halaman Beranda */}
        <Route path="/" element={<Home />} />
        
        {/* 2. Halaman Detail Berita 
            ":slug" berfungsi menangkap judul berita di URL secara dinamis 
        */}
        <Route path="/article/:slug" element={<ArticleDetail />} />
        
        {/* 3. Halaman 404 (Jika path tidak ditemukan) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App