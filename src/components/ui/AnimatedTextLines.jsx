import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLines = ({ text, className = "", delay = 0, scrub = true }) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  // Split text into words for more granular animation if it's a single line string
  const isMultiLine = typeof text === "string" && text.includes("\n");
  const items = isMultiLine ? text.split("\n") : (typeof text === "string" ? text.split(" ") : [text]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wordsRef.current, {
        yPercent: 100,
        opacity: 0,
        rotateX: -10,
        stagger: 0.03,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrub ? "top 95%" : "top 85%",
          end: scrub ? "bottom 70%" : "bottom 60%",
          scrub: scrub ? 1 : false,
          toggleActions: scrub ? "none" : "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [delay, scrub]);

  return (
    <div ref={containerRef} className={`flex flex-wrap ${isMultiLine ? 'flex-col' : 'flex-row'} ${className}`}>
      {items.map((item, i) => (
        <div key={i} className={`overflow-hidden leading-[1.4] ${!isMultiLine ? 'mr-[0.25em] mb-[0.1em]' : ''}`}>
          <div
            ref={(el) => (wordsRef.current[i] = el)}
            className="inline-block transform-gpu py-[0.3em]"
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTextLines;
