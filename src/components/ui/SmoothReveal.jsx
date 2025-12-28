import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUI } from "../../context/UIContext";

gsap.registerPlugin(ScrollTrigger);

const SmoothReveal = ({ children, className = "", delay = 0, width = "100%" }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const { isLoading } = useUI();

    useLayoutEffect(() => {
        if (isLoading) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                {
                    y: "110%", // Start fully below
                    skewY: 7,
                },
                {
                    y: "0%",
                    skewY: 0,
                    duration: 1.2,
                    ease: "power4.out", // Buttery smooth
                    delay: delay,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    },
                    force3D: true, // GPU
                    willChange: "transform"
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [delay, isLoading]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`} style={{ width }}>
            <div ref={contentRef} className="will-change-transform">
                {children}
            </div>
        </div>
    );
};

export default SmoothReveal;
