import { motion } from 'motion/react';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div id="contact" className="flex flex-col gap-4 mt-auto">
      <motion.a 
        href="mailto:prajwalmokashi03@gmail.com"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-[#00F2FF] to-[#8B5CF6] rounded-full p-4 flex items-center justify-between group overflow-hidden relative shadow-[0_0_15px_rgba(0,242,255,0.2)]"
      >
        {/* Animated gradient shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-0 pointer-events-none"></div>

        <span className="relative z-10 text-white font-bold text-xs uppercase tracking-[0.15em] whitespace-nowrap pl-2">Let's Build Something</span>
        <ArrowRight className="relative z-10 w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform mr-2" />
      </motion.a>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-end gap-3"
      >
        <a href="https://github.com/prajwalnmokashi03" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-[#00F2FF]/30 flex items-center justify-center hover:bg-[#00F2FF]/20 hover:border-[#00F2FF] hover:scale-105 transition-all text-white/80 hover:text-white backdrop-blur-md">
          <Github className="w-4 h-4" />
        </a>
        <a href="https://linkedin.com/in/prajwalmokashi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-[#00F2FF]/30 flex items-center justify-center hover:bg-[#00F2FF]/20 hover:border-[#00F2FF] hover:scale-105 transition-all text-white/80 hover:text-white backdrop-blur-md">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="mailto:prajwalmokashi03@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-[#00F2FF]/30 flex items-center justify-center hover:bg-[#00F2FF]/20 hover:border-[#00F2FF] hover:scale-105 transition-all text-white/80 hover:text-white backdrop-blur-md">
          <Mail className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
