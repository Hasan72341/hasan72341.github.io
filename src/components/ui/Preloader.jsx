import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const obj = { value: 0 };
    
    // Smooth GSAP counter
    gsap.to(obj, {
      value: 100,
      duration: 0.8, // Faster duration
      ease: "power2.inOut",
      onUpdate: () => {
        setDisplayProgress(Math.round(obj.value));
      },
      onComplete: () => {
        finishLoading();
      }
    });

    const finishLoading = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.to(counterRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: "expo.inOut",
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut"
      }, "-=0.2");
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-black flex flex-col justify-center items-center overflow-hidden"
    >
      <div 
        ref={counterRef}
        className="relative"
      >
        <div className="text-[15vw] md:text-[10vw] font-black text-white leading-none tracking-tighter flex items-baseline font-amiamie">
          <span>{displayProgress}</span>
          <span className="text-[5vw] md:text-[3vw] ml-2">%</span>
        </div>
        <div className="mt-4 w-full h-[2px] bg-white/10 relative overflow-hidden">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-white"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 overflow-hidden">
        <div className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] flex gap-4">
          <span>Md Hasan Raza</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
