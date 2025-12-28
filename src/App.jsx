import { useState, useLayoutEffect } from "react";
import Layout from "./components/Layout";
import NetworkCanvas from "./components/canvas/NetworkCanvas";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { content } from "./constants/data";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { UIProvider, useUI } from "./context/UIContext";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
};

function AppContent() {
  const { isLoading } = useUI();

  return (
    <SmoothScroll>
      <div>
        <Layout>
          <NetworkCanvas />

          <main className="relative z-10 w-full">
            <div id="hero">
              <Hero data={content.hero} />
            </div>

            <div id="about">
              <About
                education={content.education}
                responsibilities={content.responsibilities}
              />
            </div>

            <div id="skills">
              <Skills data={content.skills} />
            </div>

            <div id="projects">
              <Projects data={content.projects} />
            </div>

            <div id="contact">
              <Contact data={content.contact} />
            </div>
          </main>
        </Layout>
      </div>
    </SmoothScroll>
  );
}

function App() {
  return (
    <UIProvider>
      <AppContent />
    </UIProvider>
  );
}

export default App;
