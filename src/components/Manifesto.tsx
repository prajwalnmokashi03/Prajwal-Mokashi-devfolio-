import React from 'react';
import { motion } from 'motion/react';
import ChapterMarker from './ChapterMarker';

const lines = [
  {
    text: "I don't build for the cloud.",
    style: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      color: '#FFFFFF',
      marginBottom: '8px',
    } as React.CSSProperties,
    className: 'text-[22px] md:text-[32px]',
  },
  {
    text: 'I build for the edge.',
    style: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      color: '#00F2FF',
      marginBottom: '48px',
    } as React.CSSProperties,
    className: 'text-[22px] md:text-[32px]',
  },
  {
    text: 'Most developers assume the internet exists.',
    style: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.6)',
      marginBottom: '8px',
    } as React.CSSProperties,
    className: 'text-[15px] md:text-[18px]',
  },
  {
    text: "I assume it doesn't.",
    style: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.85)',
      marginBottom: '48px',
    } as React.CSSProperties,
    className: 'text-[15px] md:text-[18px]',
  },
  {
    text: 'Every project I build starts with one question:',
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '13px',
      color: 'rgba(255,255,255,0.35)',
      letterSpacing: '0.05em',
      marginBottom: '16px',
    } as React.CSSProperties,
    className: '',
  },
  {
    text: '"What if the internet just... stopped?"',
    style: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      color: 'rgba(0, 242, 255, 0.8)',
      fontStyle: 'italic',
      paddingLeft: '16px',
      borderLeft: '3px solid rgba(0,242,255,0.4)',
    } as React.CSSProperties,
    className: 'text-[16px] md:text-[20px]',
  },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="w-full px-6 md:px-10 py-[60px] md:py-[80px]"
    >
      <div className="max-w-[800px] mx-auto">
        <ChapterMarker number="02" label="THE_OBSESSION" />

        <div>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.15,
              }}
              className={line.className}
              style={line.style}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
