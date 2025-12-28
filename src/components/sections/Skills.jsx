import { useRef, useLayoutEffect } from "react";
import AnimatedTextLines from "../ui/AnimatedTextLines";
import Marquee from "../ui/Marquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ data }) => {
  const row1 = [...data.languages, ...data.backend].join(" • ");
  const row2 = [...data.databases, ...data.devops].join(" • ");
  const row3 = data.ml.join(" • ");

  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const headRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Common darkening logic
      const setupScrollDarken = (triggerStart, triggerEnd) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: triggerStart,
            end: triggerEnd,
            toggleActions: "play reverse play reverse",
          }
        });

        tl.to(overlayRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.7,
          ease: "expo.inOut",
          force3D: true
        })
          .to([contentRef.current, headRef.current], {
            color: "#e0dfd5",
            duration: 0.4,
            ease: "power2.inOut",
            force3D: true
          }, "<")
          .to(contentRef.current, {
            opacity: 0.8,
            duration: 0.4,
            ease: "power2.inOut",
            force3D: true
          }, "<")
          .to(".skills-border", {
            borderColor: "rgba(224, 223, 213, 0.1)",
            duration: 0.4,
            ease: "power2.inOut"
          }, "<");
      };

      // Mobile: Darken when centered
      mm.add("(max-width: 767px)", () => {
        setupScrollDarken("top 60%", "bottom 40%");
      });

      // Desktop: Darken when section enters/leaves
      mm.add("(min-width: 768px)", () => {
        setupScrollDarken("top 40%", "bottom 60%");
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative z-10 pointer-events-none py-32 overflow-hidden"
    >
      {/* Black Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-0 pointer-events-none"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          willChange: "clip-path"
        }}
      />

      <div className="pointer-events-auto w-full relative z-10">
        <div ref={headRef} className="px-4 md:px-20 mb-20 text-darkLava">
          <AnimatedTextLines
            text="Capabilities"
            className="section-head-text font-amiamie"
          />
        </div>

        <div
          ref={contentRef}
          className="font-amiamie font-black text-darkLava opacity-10 select-none"
        >
          <Marquee text={`${row1} • ${row1} •`} speed={1.5} className="text-5xl md:text-[8vw] py-12" />
          <Marquee text={`${row2} • ${row2} •`} speed={-1.5} className="text-5xl md:text-[8vw] py-12 border-y border-darkLava/5 skills-border" />
          <Marquee text={`${row3} • ${row3} •`} speed={2} className="text-5xl md:text-[8vw] py-12" />
        </div>
      </div>
    </section>

  );
};

export default Skills;
