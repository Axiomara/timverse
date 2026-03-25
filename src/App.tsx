import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// --- IMPORT PAGES ---
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import About from "./pages/About"; 
import Topics from "./pages/Topics";
import Timika from "./pages/Timika"; 
import TimikaNews from "./pages/TimikaNews"; 
import TerbaruPage from "./pages/TerbaruPage";
import Contribute from "./pages/Contribute";
import Trending from "./pages/Trending";

// --- IMPORT FRAMER MOTION ---
import { AnimatePresence } from "framer-motion";

// --- IMPORT SMOOTH SCROLL & UI COMPONENTS ---
import SmoothScroll from "./components/SmoothScroll";
import PageTransitionWrapper from "./components/PageTransitionWrapper";

/**
 * ScrollToTop:
 * Memastikan setiap kali user pindah halaman, posisi scroll kembali ke atas.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      {/* Helper untuk scroll reset */}
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

          {/* ABOUT PAGE */}
          <Route 
            path="/about" 
            element={
              <PageTransitionWrapper>
                <About />
              </PageTransitionWrapper>
            } 
          />

          {/* TOPICS PAGE */}
          <Route 
            path="/topics" 
            element={
              <PageTransitionWrapper>
                <Topics />
              </PageTransitionWrapper>
            } 
          />

          {/* CONTRIBUTE / KIRIM ARTIKEL PAGE */}
          <Route 
            path="/contribute" 
            element={
              <PageTransitionWrapper>
                <Contribute />
              </PageTransitionWrapper>
            } 
          />

          {/* TIMIKA LANDING PAGE */}
          <Route 
            path="/timika" 
            element={
              <PageTransitionWrapper>
                <Timika />
              </PageTransitionWrapper>
            } 
          />

          {/* TIMIKA NEWS MAIN PAGE */}
          <Route 
            path="/timika/news" 
            element={
              <PageTransitionWrapper>
                <TimikaNews />
              </PageTransitionWrapper>
            } 
          />

          {/* TIMIKA LATEST NEWS (LIHAT SEMUA) */}
          <Route 
            path="/timika/news/latest" 
            element={
              <PageTransitionWrapper>
                <TerbaruPage />
              </PageTransitionWrapper>
            } 
          />

          {/* TRENDING PAGE */}
          <Route 
            path="/trending" 
            element={
              <PageTransitionWrapper>
                <Trending />
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