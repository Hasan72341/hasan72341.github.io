import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const NetworkCanvas = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-primary pointer-events-auto">
      <Particles
        className="w-full h-full absolute"
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: "#e0dfd5",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 150,
                duration: 0.4,
                speed: 1,
              },
            },
          },
          particles: {
            color: {
              value: "#1a1a1a",
            },
            links: {
              color: "#1a1a1a",
              distance: 150,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 900,
              },
              value: 80,
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default NetworkCanvas;