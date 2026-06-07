import { motion } from 'motion/react';
import { Trophy, User } from 'lucide-react';
import { useState } from 'react';

export default function About() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      id="about" 
      className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative flex flex-col"
    >
      <div className="flex gap-4 items-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00F2FF] to-[#8B5CF6] p-[1px] flex-shrink-0">
          <div className="w-full h-full rounded-2xl bg-[#0D1515] flex items-center justify-center overflow-hidden relative group">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-[#00F2FF]/10 animate-pulse" />
            )}
            {imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0D1515]">
                <User className="w-5 h-5 text-white/20" />
              </div>
            ) : (
              <img 
                src="/images/profile.png" 
                alt="Prajwal Mokashi" 
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-all duration-500 ${imageLoaded ? 'opacity-60' : 'opacity-0'}`}
              />
            )}
            <div className="absolute inset-0 bg-[#00F2FF]/20 pointer-events-none mix-blend-overlay" />
          </div>
        </div>
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Identity</h3>
          <p className="text-sm font-semibold text-white/90">Android Dev & UI/UX Designer</p>
        </div>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed text-white/60 mb-6 space-y-3">
        <p>
          I'm Prajwal, an Android developer and UI/UX designer. While most follow tutorials, I ship real products—from offline P2P chat apps to AI portals.
        </p>
        <p>
          My focus bridges the gap between sleek, "Liquid Glass" interfaces and robust, offline-capable architectures. I care about the craft, the micro-interactions, and the edge cases.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-white/5 border border-white/10 w-max transition-colors hover:bg-white/10">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex-shrink-0">
          <Trophy className="w-4 h-4 text-[#8B5CF6]" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B5CF6] leading-none mb-1">Hack Fusion 2.0</p>
          <p className="text-[11px] font-semibold text-white/90">1st Runner-Up 🏆</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="px-3 py-1.5 bg-[#00F2FF]/10 border border-[#00F2FF]/20 rounded-full text-[9px] font-bold text-[#00F2FF] uppercase tracking-[0.1em]">Android</span>
        <span className="px-3 py-1.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full text-[9px] font-bold text-[#8B5CF6] uppercase tracking-[0.1em]">Full-Stack Web</span>
        <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] text-white/80">Offline-First</span>
        <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] text-white/80">UI/UX</span>
      </div>
    </motion.div>
  );
}
