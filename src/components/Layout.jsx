import { useEffect } from "react";
import Cursor from "./Cursor";
import Menu from "./ui/Menu";

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

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <>
      <Cursor />
      <Menu />
      <div className="relative w-full min-h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;