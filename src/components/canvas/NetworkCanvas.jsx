import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Preload } from "@react-three/drei";

const Network = () => {
  const { viewport, mouse } = useThree();
  
  const isMobile = viewport.width < 7;
  const count = isMobile ? 60 : 120; // Slightly more for fluid texture
  const connectionDistance = 3.2;
  
  const particleColor = new THREE.Color("#000000"); 

  // Organic Distribution (Not a grid)
  const [currentPositions, homePositions, velocities, offsets] = useMemo(() => {
    const current = new Float32Array(count * 3);
    const home = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const off = new Float32Array(count); // Random offsets for noise
    
    for (let i = 0; i < count; i++) {
      // Random spread instead of rigid grid
      const x = (Math.random() - 0.5) * viewport.width * 1.2;
      const y = (Math.random() - 0.5) * viewport.height * 1.2;
      const z = (Math.random() - 0.5) * 3; 

      home[i * 3] = x;
      home[i * 3 + 1] = y;
      home[i * 3 + 2] = z;

      current[i * 3] = x;
      current[i * 3 + 1] = y;
      current[i * 3 + 2] = z;

      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
      
      off[i] = Math.random() * 100;
    }
    return [current, home, vel, off];
  }, [viewport, count]);

  const maxLines = count * 12;
  const linesGeometry = useMemo(() => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
      return geo;
  }, [maxLines]);

  const linesRef = useRef();

  useFrame((state) => {
    if (!linesRef.current) return;

    const t = state.clock.elapsedTime * 0.3; // Slow, harmonious speed
    const springStrength = 0.015;
    const damping = 0.93;
    const mouseRadius = 3.5;
    const mouseStrength = 0.06;

    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
        const px = currentPositions[i*3];
        const py = currentPositions[i*3+1];
        const pz = currentPositions[i*3+2];
        const o = offsets[i];

        // 1. Organic Noise-like Drift (FBM approximation)
        // home position drifts in a fluid, non-linear way
        const driftX = Math.sin(t + o) * 0.5 + Math.cos(t * 0.5 + px * 0.2) * 0.3;
        const driftY = Math.cos(t * 0.8 + o) * 0.5 + Math.sin(t * 0.4 + py * 0.2) * 0.3;
        
        const hx = homePositions[i*3] + driftX;
        const hy = homePositions[i*3+1] + driftY;
        const hz = homePositions[i*3+2];

        // 2. Physics Forces
        velocities[i*3] += (hx - px) * springStrength;
        velocities[i*3+1] += (hy - py) * springStrength;
        velocities[i*3+2] += (hz - pz) * springStrength;

        // Mouse Disruption
        const dx = px - mx;
        const dy = py - my;
        const distSq = dx*dx + dy*dy;

        if (distSq < mouseRadius * mouseRadius) {
            const dist = Math.sqrt(distSq);
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            velocities[i*3] += Math.cos(angle) * force * mouseStrength;
            velocities[i*3+1] += Math.sin(angle) * force * mouseStrength;
        }

        currentPositions[i*3] += velocities[i*3];
        currentPositions[i*3+1] += velocities[i*3+1];
        currentPositions[i*3+2] += velocities[i*3+2];

        velocities[i*3] *= damping;
        velocities[i*3+1] *= damping;
        velocities[i*3+2] *= damping;
    }

    const positionsBuffer = linesGeometry.attributes.position.array;
    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            const dx = currentPositions[i*3] - currentPositions[j*3];
            const dy = currentPositions[i*3+1] - currentPositions[j*3+1];
            const dz = currentPositions[i*3+2] - currentPositions[j*3+2];
            
            // Squared distance check for performance
            const distSq = dx*dx + dy*dy + dz*dz;

            if (distSq < connectionDistance * connectionDistance) {
                 if (lineIndex >= maxLines) break;
                 
                 // Apply distance-based opacity calculation (simulated via vertex logic or just global)
                 // For now, simple black lines
                 positionsBuffer[lineIndex * 6] = currentPositions[i*3];
                 positionsBuffer[lineIndex * 6 + 1] = currentPositions[i*3+1];
                 positionsBuffer[lineIndex * 6 + 2] = currentPositions[i*3+2];
                 positionsBuffer[lineIndex * 6 + 3] = currentPositions[j*3];
                 positionsBuffer[lineIndex * 6 + 4] = currentPositions[j*3+1];
                 positionsBuffer[lineIndex * 6 + 5] = currentPositions[j*3+2];
                 lineIndex++;
            }
        }
    }
    
    linesGeometry.setDrawRange(0, lineIndex * 2);
    linesGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial 
            color={particleColor} 
            transparent 
            opacity={0.1} // More subtle, texture-like
            depthWrite={false}
        />
    </lineSegments>
  );
};

  const particleColor = new THREE.Color("#000000"); 

  const NetworkCanvas = () => {
  return (
    <div className="fixed inset-0 z-0 bg-primary pointer-events-none touch-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        eventSource={document.body}
        eventPrefix="client"
      >
        <color attach="background" args={['#f5f5f0']} />
        <fog attach="fog" args={['#f5f5f0', 5, 15]} /> 
        <Network />
        <Preload all />
      </Canvas>
    </div>
  );
};
export default NetworkCanvas;