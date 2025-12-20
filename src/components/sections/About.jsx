import { useRef, useLayoutEffect } from "react";
import AnimatedTextLines from "../ui/AnimatedTextLines";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = ({ education, responsibilities }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.from(lineRefs.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen py-32 px-4 md:px-20 relative z-10 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-[1920px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-32">
            <AnimatedTextLines 
                text="Background" 
                className="text-[12vw] md:text-[8vw] font-black text-black leading-[0.9] uppercase tracking-tighter font-amiamie"
                scrub={false}
            />
        </div>

        {/* Layout: Two Column but staggered */}
        <div className="flex flex-col gap-32">
            
            {/* EDUCATION SUB-SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 sticky top-32">
                    <span className="label-text-premium block">01 / Education</span>
                </div>
                
                <div className="md:col-span-9">
                    <div ref={(el) => (lineRefs.current[0] = el)} className="h-[1px] w-full bg-black/10 mb-12" />
                    
                    <div className="max-w-4xl">
                        <AnimatedTextLines 
                            text={education.institute} 
                            className="text-4xl md:text-7xl font-bold text-black mb-8 leading-tight tracking-tight"
                            scrub={true}
                        />
                        
                        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
                            <div>
                                <p className="text-2xl text-gray-600 font-light italic">{education.degree}</p>
                                <p className="text-lg text-gray-400 mt-2">{education.location}</p>
                            </div>
                            <span className="text-2xl font-medium text-black/20 tracking-tighter">{education.period}</span>
                        </div>

                        {/* Coursework as an elegant list */}
                        <div className="mt-20">
                            <h5 className="label-text-premium mb-8 italic">Key Coursework</h5>
                            <div className="flex flex-wrap gap-x-12 gap-y-6">
                                {education.coursework.map((course, i) => (
                                    <div key={i} className="group overflow-hidden">
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-xs font-medium text-gray-300">0{i+1}</span>
                                            <span className="text-xl md:text-2xl text-black hover:text-gray-500 transition-colors duration-300 cursor-default font-satoshi">
                                                {course}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESPONSIBILITY SUB-SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 sticky top-32">
                    <span className="label-text-premium block">02 / Responsibility</span>
                </div>
                
                <div className="md:col-span-9">
                    <div ref={(el) => (lineRefs.current[1] = el)} className="h-[1px] w-full bg-black/10 mb-12" />
                    
                    <div className="space-y-32 max-w-4xl">
                        {responsibilities.map((resp, i) => (
                            <div key={i} className="group">
                                <AnimatedTextLines 
                                    text={resp.role}
                                    className="text-3xl md:text-5xl font-bold text-black mb-6 leading-none tracking-tight"
                                    scrub={true}
                                />
                                <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl border-l-2 border-black/5 pl-8 ml-2">
                                    {resp.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default About;