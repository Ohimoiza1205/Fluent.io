import React, { useMemo } from "react";
import { motion } from "framer-motion";

const FLAGS = [
  "us.svg", "gb.svg", "fr.svg", "de.svg", "es.svg", "it.svg",
  "cn.svg", "jp.svg", "kr.svg", "ng.svg", "in.svg", "br.svg",
  "ru.svg", "ca.svg", "mx.svg", "za.svg", "ae.svg", "tr.svg"
];

const getRandom = (min, max) => Math.random() * (max - min) + min;

const FloatingFlags = () => {
  // Precompute randomized positions and motion configs
  const flags = useMemo(() =>
    FLAGS.map((flag, index) => ({
      id: index,
      src: `/flags/${flag}`,
      startX: getRandom(0, 100),
      startY: getRandom(0, 100),
      endX: getRandom(0, 100),
      endY: getRandom(0, 100),
      duration: getRandom(25, 55),
      delay: getRandom(0, 10),
      size: getRandom(20, 45),
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {flags.map((flag) => (
        <motion.img
          key={flag.id}
          src={flag.src}
          alt="flag"
          className="absolute opacity-30"
          style={{
            width: `${flag.size}px`,
            height: "auto",
            top: `${flag.startY}vh`,
            left: `${flag.startX}vw`,
            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.2))",
          }}
          animate={{
            x: [`${flag.endX - flag.startX}vw`, `${flag.startX - flag.endX}vw`],
            y: [`${flag.endY - flag.startY}vh`, `${flag.startY - flag.endY}vh`],
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: flag.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: flag.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingFlags;
