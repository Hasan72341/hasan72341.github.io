import { useEffect } from "react";
import Lenis from "lenis";
import Cursor from "./Cursor";

const Layout = ({ children }) => {
  useEffect(() => {
    // Fix mobile viewport height (100vh issue with address bar)
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false, // Keep native touch scrolling for mobile
        touchMultiplier: isTouchDevice ? 1.5 : 2,
        wheelMultiplier: 1,
        infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <>
      <Cursor />
      <div className="relative w-full min-h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;