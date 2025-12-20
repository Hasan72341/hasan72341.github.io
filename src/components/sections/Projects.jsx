import { useRef, useLayoutEffect, useState } from "react";
import AnimatedTextLines from "../ui/AnimatedTextLines";
import ProjectPopup from "../ui/ProjectPopup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectItem = ({ project, index, onClick }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const metaRef = useRef(null);
  const githubRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entry Animation
      gsap.from(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
        }
      });
      
      const mm = gsap.matchMedia();

      // Mobile: Darken as it hits focus area (center)
      mm.add("(max-width: 767px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%", 
                end: "bottom 40%", 
                toggleActions: "play reverse play reverse",
            }
          });
          
          tl.to(overlayRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
            duration: 0.5,
            ease: "expo.inOut"
          })
          .to([textRef.current, metaRef.current, githubRef.current], {
            color: "#f5f5f0", 
            duration: 0.3,
            ease: "power2.inOut"
          }, "<");
      });

      // Desktop: Darken on scroll logic (scrolling past) OR Hover
      mm.add("(min-width: 768px)", () => {
           const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                toggleActions: "play reverse play reverse",
            }
          });
          
          tl.to(overlayRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.6,
            ease: "expo.inOut"
          })
          .to([textRef.current, metaRef.current, githubRef.current], {
            color: "#f5f5f0", 
            duration: 0.3,
            ease: "power2.inOut"
          }, "<");
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
        gsap.to(overlayRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.7,
            ease: "expo.out",
            overwrite: "auto"
        });
        gsap.to([textRef.current, metaRef.current, githubRef.current], {
            color: "#f5f5f0",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
        gsap.to(overlayRef.current, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.7,
            ease: "expo.inOut",
            overwrite: "auto"
        });
         gsap.to([textRef.current, metaRef.current, githubRef.current], {
            color: "#000000",
            duration: 0.4,
            ease: "power2.inOut",
            overwrite: "auto"
        });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      className="group relative border-t border-black/10 cursor-pointer overflow-hidden select-none"
    >
        {/* Black Overlay */}
        <div 
            ref={overlayRef}
            className="absolute inset-0 bg-black z-0 clip-path-overlay pointer-events-none" 
            style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
        />

        <div className="relative z-10 py-16 md:py-24 px-4 md:px-20 flex flex-col md:flex-row justify-between items-start md:items-baseline transition-colors">
            <h3 ref={textRef} className="text-4xl md:text-7xl font-black text-darkLava transition-transform duration-500 group-hover:translate-x-4 font-amiamie uppercase tracking-tighter">
                {project.title}
            </h3>
            
            <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-4 md:gap-6 w-full md:w-auto">
                 <span ref={metaRef} className="text-sm font-mono uppercase tracking-widest opacity-70 text-darkLava">
                    {project.tech}
                </span>

                <a 
                    ref={githubRef}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-3 text-lg font-bold text-darkLava group/link"
                >
                    <div className="w-10 h-10 rounded-full border border-darkLava/10 flex items-center justify-center group-hover/link:bg-darkLava group-hover/link:border-darkLava transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:text-white transition-colors">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </div>
                    <span className="font-satoshi font-bold uppercase text-xs tracking-widest">GitHub</span>
                </a>
            </div>
        </div>
    </div>
  );
};

const Projects = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
        <section className="min-h-screen py-20 relative z-10 pointer-events-none bg-primary">
        <div className="pointer-events-auto w-full">
            <div className="px-4 md:px-20 mb-20 md:mb-32">
                <AnimatedTextLines 
                    text="Projects" 
                    className="section-head-text text-black font-amiamie"
                />
            </div>
            
            <div className="flex flex-col border-b border-black/10">
            {data.map((project, index) => (
                <ProjectItem 
                    key={index} 
                    project={project} 
                    index={index} 
                    onClick={setSelectedProject}
                />
            ))}
            </div>
        </div>
        </section>

        {selectedProject && (
            <ProjectPopup 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        )}
    </>
  );
};

export default Projects;
