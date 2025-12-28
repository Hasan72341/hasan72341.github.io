import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useUI } from "../../context/UIContext";
import { content } from "../../constants/data";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isPopupOpen, lenis } = useUI();
    const menuRef = useRef(null);
    const bgRef = useRef(null);
    const linksRef = useRef([]);
    const [activeImage, setActiveImage] = useState(null);

    // Menu Items with Images
    const menuItems = [
        { label: "Home", href: "#hero", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" },
        { label: "About", href: "#about", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2000&auto=format&fit=crop" },
        { label: "Work", href: "#projects", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop" },
        { label: "Skills", href: "#skills", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop" },
        { label: "Contact", href: "#contact", image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2000&auto=format&fit=crop" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isOpen) {
                // Open Animation
                gsap.to(bgRef.current, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.8,
                    ease: "power4.inOut",
                    force3D: true
                });

                gsap.fromTo(linksRef.current,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        delay: 0.2,
                        force3D: true
                    }
                );
            } else {
                // Close Animation
                gsap.to(bgRef.current, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    duration: 0.8,
                    ease: "power4.inOut",
                    force3D: true
                });
            }
        }, menuRef);

        if (lenis) {
            if (isOpen) {
                lenis.stop();
                document.body.style.overflow = 'hidden';
            } else {
                lenis.start();
                document.body.style.overflow = '';
            }
        }

        return () => {
            ctx.revert();
            if (lenis) {
                lenis.start();
                document.body.style.overflow = '';
            }
        };
    }, [isOpen, lenis]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLinkClick = (href) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                disabled={isPopupOpen}
                className={`fixed top-5 right-5 md:top-8 md:right-8 z-[100] w-12 h-12 md:w-16 md:h-16 bg-[#e0dfd5] mix-blend-difference rounded-full flex items-center justify-center cursor-pointer group hover:scale-110 transition-all duration-500 will-change-transform ${isPopupOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="relative w-6 h-4 overflow-hidden">
                    <span className={`absolute top-0 left-0 w-full h-[2px] bg-black transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-black transition-transform duration-500 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
            </button>

            {/* Menu Overlay */}
            {createPortal(
                <div ref={menuRef} className="fixed inset-0 z-[90] pointer-events-none">
                    <div
                        ref={bgRef}
                        className="absolute inset-0 bg-[#0a0a09] pointer-events-auto flex flex-col justify-between p-8 md:p-16"
                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", willChange: "clip-path" }}
                    >
                        {/* Background Image Reveal */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-700 ease-in-out">
                            {activeImage && (
                                <img
                                    src={activeImage}
                                    alt="Menu Background"
                                    className="w-full h-full object-cover grayscale animate-in fade-in zoom-in duration-700"
                                />
                            )}
                        </div>

                        {/* Top Bar */}
                        <div className="w-full flex justify-between items-start text-[#e0dfd5] relative z-10 border-b border-[#e0dfd5]/10 pb-8">
                            <span className="font-amiamie font-black text-xl tracking-tighter uppercase">Md Hasan Raza</span>
                            {/* Removed © 2025 as requested */}
                        </div>

                        {/* Main Navigation */}
                        <nav className="flex flex-col items-start justify-center relative z-10 py-10">
                            {menuItems.map((item, index) => (
                                <div key={index} className="overflow-hidden group">
                                    <button
                                        ref={el => linksRef.current[index] = el}
                                        onClick={() => handleLinkClick(item.href)}
                                        onMouseEnter={() => setActiveImage(item.image)}
                                        onMouseLeave={() => setActiveImage(null)}
                                        className="text-[12vw] md:text-[7vw] leading-[0.85] font-amiamie font-black text-[#e0dfd5] hover:text-white transition-colors duration-300 uppercase tracking-[-0.04em] flex items-center gap-4 group-hover:translate-x-4 transition-transform ease-out will-change-transform"
                                    >
                                        <span className="text-2xl md:text-4xl font-satoshi font-light opacity-30 group-hover:opacity-100 transition-opacity duration-300 -mt-4 md:-mt-8">0{index + 1}</span>
                                        {item.label}
                                    </button>
                                </div>
                            ))}
                        </nav>

                        {/* Awwwards Footer */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-[#e0dfd5] relative z-10 border-t border-[#e0dfd5]/10 pt-8">

                            {/* Socials Column - Proper Icons + Text */}
                            <div className="flex flex-col gap-4">
                                <h3 className="font-satoshi text-xs uppercase tracking-widest text-[#e0dfd5]/50 mb-2">Socials</h3>
                                <div className="flex gap-8">
                                    <a href={`https://${content.contact.linkedin}`} target="_blank" rel="noreferrer" className="group flex items-center gap-3 hover:text-white transition-colors">
                                        <div className="w-8 h-8 rounded-full border border-[#e0dfd5]/20 flex items-center justify-center group-hover:bg-[#e0dfd5] group-hover:border-[#e0dfd5] transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-black transition-colors">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                        </div>
                                        <span className="font-satoshi text-sm uppercase tracking-widest font-bold">LinkedIn</span>
                                    </a>
                                    <a href={`https://${content.contact.github}`} target="_blank" rel="noreferrer" className="group flex items-center gap-3 hover:text-white transition-colors">
                                        <div className="w-8 h-8 rounded-full border border-[#e0dfd5]/20 flex items-center justify-center group-hover:bg-[#e0dfd5] group-hover:border-[#e0dfd5] transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-black transition-colors">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </div>
                                        <span className="font-satoshi text-sm uppercase tracking-widest font-bold">GitHub</span>
                                    </a>
                                </div>
                            </div>

                            {/* Contact Column - Animated Like Contact Page */}
                            <div className="flex flex-col md:items-end gap-2">
                                <h3 className="font-satoshi text-xs uppercase tracking-widest text-[#e0dfd5]/50 mb-2">Get in touch</h3>
                                <div className="relative group inline-block">
                                    <a
                                        href={`mailto:${content.contact.email.trim()}`}
                                        className="text-xl md:text-3xl font-amiamie font-black hover:text-[#e0dfd5]/70 transition-colors duration-500 block w-fit"
                                    >
                                        {content.contact.email}
                                    </a>
                                    <div className="h-0.5 w-0 bg-[#e0dfd5] group-hover:w-full transition-all duration-700 ease-in-out mt-1"></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default Menu;
