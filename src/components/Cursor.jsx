import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  // Optimization: Don't render cursor logic on mobile
  const [isMobile, setIsMobile] = useState(true); // Default true to prevent flash

  // Mutable state to avoid React renders
  const state = useRef({
    targetPos: { x: 0, y: 0 },
    currentPos: { x: 0, y: 0 },
    isHovering: false,
    lastTarget: null,
    targetRect: null,
    isVisible: false
  });

  useEffect(() => {
    // Check mobile once
    const checkMobile = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return () => window.removeEventListener("resize", checkMobile);

    // Reveal cursor
    const timer = setTimeout(() => {
        if (dotRef.current) dotRef.current.style.opacity = 1;
        state.current.isVisible = true;
    }, 200);

    const onMouseMove = (e) => {
      const { clientX, clientY, target } = e;
      const s = state.current;

      const interactiveTarget = target.closest('a, button');
      const isPointer = window.getComputedStyle(target).cursor === "pointer";
      let isClickable = !!interactiveTarget || isPointer;
      
      const activeTarget = interactiveTarget || target;
      const shouldMagnet = !!interactiveTarget; // Only magnet to links and buttons, not large panes with cursor-pointer
      
      if (isClickable) {
        if (s.lastTarget !== activeTarget) {
            s.lastTarget = activeTarget;
            s.targetRect = activeTarget.getBoundingClientRect();
        }

        const rect = s.targetRect;
        if (rect && shouldMagnet) {
            const clickableMidX = rect.left + rect.width / 2;
            const clickableMidY = rect.top + rect.height / 2;

            s.targetPos.x = clientX + (clickableMidX - clientX) * 0.35;
            s.targetPos.y = clientY + (clickableMidY - clientY) * 0.35;
        } else {
             s.targetPos.x = clientX;
             s.targetPos.y = clientY;
        }

        if (!s.isHovering) {
            s.isHovering = true;
            if (dotRef.current) {
                dotRef.current.style.width = '10vh';
                dotRef.current.style.height = '10vh';
            }
        }

      } else {
        s.lastTarget = null;
        s.targetRect = null;
        s.targetPos.x = clientX;
        s.targetPos.y = clientY;

        if (s.isHovering) {
            s.isHovering = false;
            if (dotRef.current) {
                dotRef.current.style.width = '6vh';
                dotRef.current.style.height = '6vh';
            }
        }
      }
    };

    const onScroll = () => {
        state.current.lastTarget = null;
        state.current.targetRect = null;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let animationFrameId;
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = () => {
      const s = state.current;
      const t = 0.4;
      const ease = easeInOutQuad(t);

      s.currentPos.x += (s.targetPos.x - s.currentPos.x) * ease;
      s.currentPos.y += (s.targetPos.y - s.currentPos.y) * ease;

      s.currentPos.x = Math.round(s.currentPos.x * 100) / 100;
      s.currentPos.y = Math.round(s.currentPos.y * 100) / 100;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.currentPos.x}px, ${s.currentPos.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-exclusion">
      <div
        ref={dotRef}
        className="bg-white rounded-full opacity-0 transition-[width,height] duration-500 ease-out will-change-[transform,width,height]"
        style={{
            width: '6vh',
            height: '6vh',
            position: 'absolute',
            left: 0,
            top: 0
        }}
      />
    </div>
  );
};

export default Cursor;
