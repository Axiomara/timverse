import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// --- IMPORT PAGES ---
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login"; // <-- Tambahkan import Login

// --- IMPORT FRAMER MOTION ---
import { AnimatePresence } from "framer-motion";

// --- IMPORT SMOOTH SCROLL & UI COMPONENTS ---
import SmoothScroll from "./components/SmoothScroll";
import PageTransitionWrapper from "./components/PageTransitionWrapper";


/**
 * ScrollToTop:
 * Memastikan setiap kali user pindah halaman (pathname berubah), 
 * posisi scroll akan kembali ke paling atas secara instan.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll ke atas secara instan agar transisi halaman dimulai dari atas.
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      {/* Komponen Global */}
      <ScrollToTop />
  

      {/* AnimatePresence untuk Transisi Antar Halaman */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* HOME PAGE */}
          <Route 
            path="/" 
            element={
              <PageTransitionWrapper>
                <Home />
              </PageTransitionWrapper>
            } 
          />

          {/* LOGIN PAGE */}
          <Route 
            path="/login" 
            element={
              <PageTransitionWrapper>
                <Login />
              </PageTransitionWrapper>
            } 
          />

          {/* CATEGORY PAGE */}
          <Route 
            path="/category/:categoryName" 
            element={
              <PageTransitionWrapper>
                <CategoryPage />
              </PageTransitionWrapper>
            } 
          />

          {/* TAG PAGE */}
          <Route 
            path="/tag/:tagName" 
            element={
              <PageTransitionWrapper>
                <CategoryPage />
              </PageTransitionWrapper>
            } 
          />

          {/* ARTICLE DETAIL PAGE */}
          <Route 
            path="/article/:slug" 
            element={
              <PageTransitionWrapper>
                <ArticleDetail />
              </PageTransitionWrapper>
            } 
          />

          {/* 404 NOT FOUND PAGE */}
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
  );
}

export default App;