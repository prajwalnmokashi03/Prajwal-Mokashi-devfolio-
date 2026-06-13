import { motion } from 'motion/react';
import ChapterMarker from './ChapterMarker';

export default function Contact() {
  return (
    <div id="contact" className="flex flex-col gap-4 mt-auto">
      <ChapterMarker number="06" label="TRANSMISSION" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex flex-col p-8 rounded-[16px] border border-[#00F2FF]/15 bg-[#0D1515]/60 backdrop-blur-[16px]"
      >


        <h2 className="text-[24px] font-semibold text-white mb-2">End of Log.</h2>
        <h3 className="text-[16px] text-[#00F2FF]/60 mt-1 mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>But not the end of the story.</h3>
        
        <div className="text-[13px] text-white/50 mb-7 font-sans space-y-4">
          <p>
            You've seen the projects. You've read the journey. If something here made you think 'I want to work with this person' — that feeling is mutual.
          </p>
          <p>
            Open to Android internships, UI/UX roles, and hackathon teams that ship.
          </p>
        </div>

        <a 
          href="mailto:prajwalmokashi03@gmail.com"
          className="w-fit mx-auto max-w-[280px] inline-block px-6 py-3 rounded-[10px] bg-[#00F2FF]/[0.06] border border-[#00F2FF]/[0.35] hover:bg-[#00F2FF]/[0.12] hover:border-[#00F2FF]/60 hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] transition-all duration-300 group"
        >
          <span className="text-[#00F2FF] font-mono text-[12px] uppercase tracking-[0.1em] flex items-center justify-center gap-2">
            <span className="text-sm transform group-hover:translate-x-1 transition-transform">→</span> 
            INITIALIZE_CONTACT
          </span>
        </a>

        <div className="flex items-center justify-center w-full text-center gap-4 mt-4">
          <a href="https://github.com/prajwalnmokashi03" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase text-white/35 hover:text-[#00F2FF] transition-colors duration-200">
            GitHub
          </a>
          <span className="text-[#00F2FF]/30 font-mono text-[10px]">·</span>
          <a href="https://linkedin.com/in/prajwalmokashi" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase text-white/35 hover:text-[#00F2FF] transition-colors duration-200">
            LinkedIn
          </a>
          <span className="text-[#00F2FF]/30 font-mono text-[10px]">·</span>
          <a href="mailto:prajwalmokashi03@gmail.com" className="font-mono text-[10px] uppercase text-white/35 hover:text-[#00F2FF] transition-colors duration-200">
            Email
          </a>
        </div>

        <div className="text-center mt-8 text-[11px] text-[#00F2FF]/30" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          &gt; the next chapter is unwritten. <span className="animate-pulse">_</span>
        </div>
      </motion.div>
    </div>
  );
}
