import { useState } from "react";
import Layout from "./components/Layout";
import NetworkCanvas from "./components/canvas/NetworkCanvas";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { content } from "./constants/data";

import { UIProvider, useUI } from "./context/UIContext";

function AppContent() {
  const { isLoading } = useUI();

  return (
    <>
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
    </>
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
