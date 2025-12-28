import { useRef, useLayoutEffect } from "react";
import SmoothReveal from "../ui/SmoothReveal";
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
            className="min-h-screen py-32 md:py-32 pt-0 md:pt-32 -mt-[150px] md:mt-0 px-4 md:px-20 relative z-10 pointer-events-none will-change-transform"
        >
            <div className="pointer-events-auto max-w-[1920px] mx-auto">

                {/* Section Header */}
                <div className="mb-32">
                    <SmoothReveal>
                        <h2 className="text-[12vw] md:text-[8vw] font-black text-darkLava leading-[0.9] uppercase tracking-tighter font-amiamie">
                            Background
                        </h2>
                    </SmoothReveal>
                </div>

                {/* Layout: Two Column but staggered */}
                <div className="flex flex-col gap-32">

                    {/* EDUCATION SUB-SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-3 md:sticky md:top-32 mb-8 md:mb-0">
                            <span className="label-text-premium block">01 / Education</span>
                        </div>

                        <div className="md:col-span-9">
                            <div ref={(el) => (lineRefs.current[0] = el)} className="h-[1px] w-full bg-darkLava/10 mb-12" />

                            <div className="max-w-4xl">
                                <SmoothReveal>
                                    <h3 className="text-4xl md:text-7xl font-bold text-darkLava mb-8 leading-tight tracking-tight">
                                        {education.institute}
                                    </h3>
                                </SmoothReveal>

                                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
                                    <SmoothReveal delay={0.2}>
                                        <p className="text-2xl text-darkLava/70 font-light italic">{education.degree}</p>
                                        <p className="text-lg text-darkLava/50 mt-2">{education.location}</p>
                                    </SmoothReveal>
                                    <SmoothReveal delay={0.3}>
                                        <span className="text-2xl font-medium text-darkLava/20 tracking-tighter">{education.period}</span>
                                    </SmoothReveal>
                                </div>

                                {/* Coursework as an elegant list */}
                                <div className="mt-20">
                                    <h5 className="label-text-premium mb-8 italic">Key Coursework</h5>
                                    <div className="flex flex-wrap gap-x-12 gap-y-6">
                                        {education.coursework.map((course, i) => (
                                            <div key={i} className="group overflow-hidden">
                                                <div className="flex items-baseline gap-4">
                                                    <span className="text-xs font-medium text-darkLava/30">0{i + 1}</span>
                                                    <span className="text-xl md:text-2xl text-darkLava hover:text-darkLava/50 transition-colors duration-300 cursor-default font-satoshi">
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
                        <div className="md:col-span-3 md:sticky md:top-32 mb-8 md:mb-0">
                            <span className="label-text-premium block">02 / Responsibility</span>
                        </div>

                        <div className="md:col-span-9">
                            <div ref={(el) => (lineRefs.current[1] = el)} className="h-[1px] w-full bg-darkLava/10 mb-12" />

                            <div className="space-y-32 max-w-4xl">
                                {responsibilities.map((resp, i) => (
                                    <div key={i} className="group">
                                        <SmoothReveal>
                                            <h3 className="text-2xl md:text-4xl font-bold text-darkLava mb-6 leading-tight tracking-tight">
                                                {resp.role}
                                            </h3>
                                        </SmoothReveal>
                                        <SmoothReveal delay={0.1}>
                                            <p className="text-lg md:text-xl text-darkLava/60 leading-relaxed max-w-2xl border-l-2 border-darkLava/5 pl-8 ml-2">
                                                {resp.desc}
                                            </p>
                                        </SmoothReveal>
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