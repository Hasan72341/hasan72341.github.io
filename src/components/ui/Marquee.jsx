import { useRef, useEffect } from "react";

const Marquee = ({ text, speed = 5, className = "" }) => {
  const trackRef = useRef(null);
  const lastScrollY = useRef(0);
  const currentDirection = useRef(speed > 0 ? "normal" : "reverse");

  // Calculate animation duration based on speed
  const duration = Math.abs(30 / speed);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame for smooth 120fps updates
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const newDirection = currentScrollY > lastScrollY.current
            ? (speed > 0 ? "normal" : "reverse")
            : (speed > 0 ? "reverse" : "normal");

          // Only update DOM if direction actually changed
          if (newDirection !== currentDirection.current && trackRef.current) {
            currentDirection.current = newDirection;
            const children = trackRef.current.children;
            for (let i = 0; i < children.length; i++) {
              children[i].style.animationDirection = newDirection;
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const initialDirection = speed > 0 ? "normal" : "reverse";

  return (
    <section className={`w-full overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 px-4 marquee-item"
            style={{
              animation: `marquee-scroll ${duration}s linear infinite`,
              animationDirection: initialDirection,
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {text}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-100%, 0, 0); }
        }
        .marquee-item {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Marquee;
