import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUI } from "../../context/UIContext";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLines = ({ text, className = "", delay = 0, scrub = true }) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const { isLoading } = useUI();

  // Split text into words for more granular animation if it's a single line string
  const isMultiLine = typeof text === "string" && text.includes("\n");
  const items = isMultiLine ? text.split("\n") : (typeof text === "string" ? text.split(" ") : [text]);

  useLayoutEffect(() => {
    if (isLoading) return; // Wait for preloader

    const ctx = gsap.context(() => {
      gsap.from(wordsRef.current, {
        yPercent: 100, // Reduced from 110 to prevent gap delay
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        delay: delay, // Apply delay prop
        force3D: true, // Force GPU acceleration
        willChange: "transform, opacity", // Hint browser
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrub ? "top 95%" : "top 85%",
          end: scrub ? "bottom 70%" : "bottom 60%",
          scrub: scrub ? 1.5 : false, // Smoother scrub
          toggleActions: scrub ? "none" : "play none none reverse",
          invalidateOnRefresh: true, // Handle resize better
        },
      });
    }, containerRef);

    // Force refresh for scroll triggers
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [delay, scrub, isLoading]);

  return (
    <div ref={containerRef} className={`flex flex-wrap ${isMultiLine ? 'flex-col' : 'flex-row'} ${className}`}>
      {items.map((item, i) => (
        <div key={i} className={`overflow-hidden leading-[1.2] ${!isMultiLine ? 'mr-[0.25em] mb-[0.1em]' : ''}`}>
          <div
            ref={(el) => (wordsRef.current[i] = el)}
            className="inline-block transform-gpu will-change-transform py-[0.1em]"
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTextLines;
