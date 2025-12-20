import { useRef, useLayoutEffect } from "react";
import AnimatedTextLines from "../ui/AnimatedTextLines";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ data }) => {
  const containerRef = useRef(null);
  const emailRef = useRef(null);
  const infoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(infoRef.current.children, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: infoRef.current,
                start: "top 90%",
            }
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
        ref={containerRef}
        className="min-h-[85vh] flex flex-col justify-between pt-20 pb-10 px-4 md:px-20 relative z-20 pointer-events-auto bg-darkLava text-primary overflow-hidden transition-colors duration-500"
    >
      <div className="mt-10 md:mt-20">
        <div className="overflow-hidden mb-2">
            <AnimatedTextLines 
                text="Got a project?" 
                className="label-text-premium !text-sageGray"
            />
        </div>
        
        <div className="relative group inline-block">
             <a 
                ref={emailRef}
                href={`mailto:${data.email}`}
                className="text-6xl sm:text-7xl md:text-[8vw] leading-[0.9] font-black tracking-tighter text-primary hover:text-sageGray transition-colors duration-500 block w-fit break-words max-w-full font-amiamie uppercase"
             >
                LET'S TALK
             </a>
             <div className="h-1 md:h-2 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-in-out mt-4"></div>
        </div>
      </div>

      <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-16 md:mt-0 border-t border-primary/10 pt-10">
            <div className="col-span-1 md:col-span-2">
                <h3 className="label-text-premium mb-4 md:mb-6">Contact Details</h3>
                <a href={`mailto:${data.email}`} className="text-xl md:text-3xl font-bold block w-fit hover:underline decoration-1 underline-offset-4 break-all transition-colors">{data.email}</a>
                <p className="text-lg md:text-xl text-sageGray mt-2">{data.phone}</p>
            </div>

            <div>
                <h3 className="label-text-premium mb-4 md:mb-6">Socials</h3>
                <div className="flex flex-col gap-4 text-lg">
                     <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-sageGray transition-colors flex items-center gap-3 group w-max">
                        <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-darkLava transition-colors">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </div>
                        <span className="font-satoshi font-medium">LinkedIn</span>
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sm">→</span>
                     </a>
                     <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="hover:text-sageGray transition-colors flex items-center gap-3 group w-max">
                        <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-darkLava transition-colors">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </div>
                        <span className="font-satoshi font-medium">GitHub</span>
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sm">→</span>
                     </a>
                </div>
            </div>

            <div>
                <h3 className="label-text-premium mb-4 md:mb-6">Status</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-lg text-sageGray">Open for opportunities</span>
                </div>
            </div>
      </div>

      <div className="flex justify-between items-end mt-16 md:mt-0">
         <span className="text-xs text-sageGray font-mono whitespace-nowrap">
             © 2025 MD HASAN RAZA
         </span>
         <span className="text-[15vw] md:text-[12vw] font-black text-primary/5 leading-none -mb-[4vw] -mr-[2vw] select-none pointer-events-none uppercase font-amiamie">
            HASAN
         </span>
      </div>
    </section>
  );
};

export default Contact;
