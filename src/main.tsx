import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { 
  BrowserRouter, 
  useLocation, 
  useNavigationType,
  createRoutesFromChildren, // Gunakan ini (alias dari createRoutesFromElements)
  matchRoutes 
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./index.css";

// --- INISIALISASI SENTRY ---
Sentry.init({
  dsn: "https://71850575a367fa2c9ec9a239ae6ebf3b@o4511010703998976.ingest.us.sentry.io/4511010715074560",
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    
    // Konfigurasi lengkap agar TypeScript tenang
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],

  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0, 
  sendDefaultPii: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Sentry.ErrorBoundary 
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-8 text-center">
              <div className="max-w-md">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Unexpected Error</h2>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest"
                >
                  Reload App
                </button>
              </div>
            </div>
          }
        >
          <App />
        </Sentry.ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);