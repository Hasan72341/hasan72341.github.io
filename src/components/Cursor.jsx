import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  const state = useRef({
    targetPos: { x: 0, y: 0 },
    currentPos: { x: 0, y: 0 },
    isHovering: false,
    lastTarget: null,
    targetRect: null,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return () => window.removeEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      if (dotRef.current) dotRef.current.style.opacity = 1;
    }, 200);

    const onMouseMove = (e) => {
      const { clientX, clientY, target } = e;
      const s = state.current;

      const interactiveTarget = target.closest('a, button');
      const isPointer = window.getComputedStyle(target).cursor === "pointer";
      const isClickable = !!interactiveTarget || isPointer;

      if (isClickable && interactiveTarget) {
        if (s.lastTarget !== interactiveTarget) {
          s.lastTarget = interactiveTarget;
          s.targetRect = interactiveTarget.getBoundingClientRect();
        }

        const rect = s.targetRect;
        if (rect) {
          const clickableMidX = rect.left + rect.width / 2;
          const clickableMidY = rect.top + rect.height / 2;
          s.targetPos.x = clientX + (clickableMidX - clientX) * 0.35;
          s.targetPos.y = clientY + (clickableMidY - clientY) * 0.35;
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
            dotRef.current.style.width = '8vh';
            dotRef.current.style.height = '8vh';
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
    const animate = () => {
      const s = state.current;
      s.currentPos.x = s.targetPos.x;
      s.currentPos.y = s.targetPos.y;

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
        className="bg-white rounded-full opacity-0 transition-[width,height] duration-300 ease-out will-change-[transform,width,height]"
        style={{
          width: '8vh',
          height: '8vh',
          position: 'absolute',
          left: 0,
          top: 0
        }}
      />
    </div>
  );
};

export default Cursor;

