import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div id="contact" className="flex flex-col gap-4 mt-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex flex-col p-8 rounded-[16px] border border-[#00F2FF]/15 bg-[#0D1515]/60 backdrop-blur-[16px]"
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF]/50"></span>
          <h3 className="text-[11px] font-mono text-white/40 uppercase tracking-[0.15em]">CONTACT_PROTOCOL</h3>
        </div>

        <h2 className="text-[24px] font-semibold text-white mb-2">Let's Build Something</h2>
        
        <p className="text-[13px] text-white/50 mb-7 font-sans">
          Open to Android internships, UI/UX roles, and hackathon teams that ship.
        </p>

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
      </motion.div>
    </div>
  );
}
