import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import ArticleDetail from "./pages/ArticleDetail"
import NotFound from "./pages/NotFound"
import CategoryPage from "./pages/CategoryPage"

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
      <ScrollToTop />
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/tag/:tagName" element={<CategoryPage />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App