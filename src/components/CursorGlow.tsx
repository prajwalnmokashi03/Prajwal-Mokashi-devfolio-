import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-96 h-96 bg-os-cyan/20 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 192,
        y: mousePosition.y - 192,
      }}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 250,
        mass: 0.1,
      }}
    />
  );
}
