import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import Services from './pages/Services';
import CustomCursor from './components/CustomCursor';
import './index.css';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden text-zinc-100 bg-black selection:bg-white selection:text-black">
      {/* Premium Noise Overlay */}
      <div className="noise-overlay"></div>
      
      {showHeader && <Header />}

      {/* Subtle ambient blobs */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      <main className="flex-grow z-10">
        <Routes>
          <Route path="/" element={<Services />} />
        </Routes>
      </main>
      
      <div className="z-10">
        <Footer />
      </div>

      <CustomCursor />
    </div>
  );
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis for perfect synchronization
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    // Ensure all ScrollTriggers are properly calculated once on mount and after a short delay
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    }
  }, []);


  return (
    <Router>
      <AppContent />
    </Router>
  );
}
