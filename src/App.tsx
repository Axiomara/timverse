import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import ArticleDetail from "./pages/ArticleDetail"
import NotFound from "./pages/NotFound"
import CategoryPage from "./pages/CategoryPage"

// --- IMPORT FRAMER MOTION ---
import { AnimatePresence } from "framer-motion"

// --- IMPORT SMOOTH SCROLL & PAGE TRANSITION WRAPPER ---
import SmoothScroll from "./components/SmoothScroll"
import PageTransitionWrapper from "./components/PageTransitionWrapper" // <-- Import baru

/**
 * ScrollToTop:
 * Memastikan setiap kali user pindah halaman (pathname berubah), 
 * posisi scroll akan kembali ke paling atas secara instan.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    // Scroll ke atas secara instan (tanpa smooth scroll Lenis)
    // agar transisi halaman dimulai dari atas.
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function App() {
  const location = useLocation(); // <-- Dapatkan objek lokasi saat ini

  return (
    <SmoothScroll>
      <ScrollToTop />
      
      {/* AnimatePresence memungkinkan komponen untuk dianimasikan saat dihapus dari DOM */}
      <AnimatePresence mode="wait"> {/* 'wait' akan menunggu animasi keluar selesai sebelum animasi masuk dimulai */}
        <Routes location={location} key={location.pathname}> {/* Penting: berikan location & key */}
          {/* Bungkus setiap Route dengan PageTransitionWrapper */}
          <Route 
            path="/" 
            element={
              <PageTransitionWrapper>
                <Home />
              </PageTransitionWrapper>
            } 
          />
          <Route 
            path="/category/:categoryName" 
            element={
              <PageTransitionWrapper>
                <CategoryPage />
              </PageTransitionWrapper>
            } 
          />
          <Route 
            path="/tag/:tagName" 
            element={
              <PageTransitionWrapper>
                <CategoryPage />
              </PageTransitionWrapper>
            } 
          />
          <Route 
            path="/article/:slug" 
            element={
              <PageTransitionWrapper>
                <ArticleDetail />
              </PageTransitionWrapper>
            } 
          />
          <Route 
            path="*" 
            element={
              <PageTransitionWrapper>
                <NotFound />
              </PageTransitionWrapper>
            } 
          />
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  )
}

export default App