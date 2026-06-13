import { motion } from 'motion/react';

interface ChapterBridgeProps {
  text: string;
}

export default function ChapterBridge({ text }: ChapterBridgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        display: 'block',
        width: '100%',
        clear: 'both',
        position: 'relative',
        zIndex: 1
      }}
      className="px-6 md:px-10 py-5 md:py-6"
    >
      <div className="flex items-center gap-4 w-full">
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(0, 242, 255, 0.06)',
          }}
        />
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontStyle: 'italic',
            color: 'rgba(255, 255, 255, 0.25)',
            letterSpacing: '0.02em',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
          className="text-[13px] md:text-[15px]"
        >
          {text}
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(0, 242, 255, 0.06)',
          }}
        />
      </div>
    </motion.div>
  );
}
