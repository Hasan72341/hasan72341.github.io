import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap m-0 leading-[1.4]">
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        <span className="block mr-[30px] py-6">{children}</span>
        <span className="block mr-[30px] py-6">{children}</span>
        <span className="block mr-[30px] py-6">{children}</span>
        <span className="block mr-[30px] py-6">{children}</span>
      </motion.div>
    </div>
  );
}

const Marquee = ({ text, speed = 5, className = "" }) => {
  return (
    <section className={`py-10 w-full overflow-hidden ${className}`}>
      <ParallaxText baseVelocity={speed}>{text}</ParallaxText>
    </section>
  );
};

export default Marquee;
