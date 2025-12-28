import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const ProjectPopup = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [project]);

  if (!project) return null;

  const containerVariants = {
    hidden: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    },
    visible: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Custom easing for buttery smooth wipe
    },
    exit: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const modalVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.2 // Delayed start after wipe begins
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-md p-0 md:p-6"
        onClick={onClose}
        style={{ willChange: "clip-path" }}
      >
        <motion.div
          variants={modalVariants}
          className="bg-[#e0dfd5] w-full max-w-7xl h-full md:h-[90vh] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col relative border border-white/5"
          onClick={(e) => e.stopPropagation()}
          style={{ willChange: "transform, opacity" }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[1100] w-14 h-14 bg-black rounded-full text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide"
            style={{ overscrollBehavior: 'contain' }}
          >
            <div className="flex flex-col md:flex-row min-h-full">

              {/* LEFT PANEL - Sidebar Info */}
              <div className="w-full md:w-[42%] bg-black text-[#e0dfd5] p-8 md:p-16 flex flex-col justify-between relative min-h-[50vh] md:min-h-full overflow-hidden">
                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_20%,_#222_0%,_transparent_50%)] opacity-40 pointer-events-none"></div>

                <div className="relative z-10">
                  <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                    <span className="label-text-premium mb-6 block text-gray-500">2025</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] font-amiamie uppercase mb-8">
                      {project.title}
                    </h2>
                  </motion.div>

                  <motion.div custom={1} variants={contentVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-3 mt-4">
                    {(project.details?.stack || project.tech.split("•")).map((tech, i) => (
                      <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] font-satoshi bg-white/5 backdrop-blur-sm">
                        {tech.trim()}
                      </span>
                    ))}
                  </motion.div>
                </div>

                <motion.div custom={2} variants={contentVariants} initial="hidden" animate="visible" className="relative z-10 mt-12">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-4 py-5 px-8 bg-[#e0dfd5] text-black rounded-2xl hover:bg-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover/btn:rotate-[360deg] transition-transform duration-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </div>
                    <span className="font-amiamie font-black text-xs uppercase tracking-[0.15em]">View on GitHub</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0 group-hover/btn:translate-x-1 transition-transform">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* RIGHT PANEL - Content */}
              <div className="w-full md:w-[58%] p-8 md:p-20 bg-[#e0dfd5] text-black overflow-hidden">
                <div className="space-y-20 max-w-2xl">
                  <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible">
                    <h3 className="label-text-premium mb-8 text-black/30 flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-black/10"></span>
                      The Challenge
                    </h3>
                    <p className="text-2xl md:text-4xl leading-[1.1] font-bold tracking-tight font-satoshi text-black">
                      {project.details?.problem || project.desc}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-16 pt-16 border-t border-black/5">
                    <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible">
                      <h3 className="label-text-premium mb-6 text-black/30 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-black/10"></span>
                        The Solution
                      </h3>
                      <p className="text-lg md:text-xl leading-relaxed text-gray-800 body-text-premium">
                        {project.details?.solution}
                      </p>
                    </motion.div>

                    <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible">
                      <h3 className="label-text-premium mb-6 text-black/30 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-black/10"></span>
                        The Impact
                      </h3>
                      <p className="text-lg md:text-xl leading-relaxed text-gray-800 body-text-premium">
                        {project.details?.outcome}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectPopup;