import { motion } from 'motion/react';
import { Trophy, User } from 'lucide-react';
import ChapterMarker from './ChapterMarker';
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
      <ChapterMarker number="01" label="ORIGIN" />
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
                className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
            {/* Removed the dark mix-blend overlays */}
          </div>
        </div>
        <div>

          <p className="text-sm font-semibold text-white/90">Android Dev & UI/UX Designer</p>
        </div>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed text-white/60 mb-6 space-y-3">
        <p>
          I grew up in Hubli-Dharwad — not a tech hub, not a startup city. Just a kid with a laptop and one question that wouldn't leave me alone: What happens to communication when the internet disappears?
        </p>
        <p>
          That question became an obsession. While everyone else was building apps that needed servers, I wanted to build something that didn't. That obsession became PirateLink. Then it became a hackathon win. Then it became this.
        </p>
        <p>
          I care about the craft. The animation that feels slightly off at 3AM. The edge case nobody thought about. The UI that makes someone say 'wait, how does this even work?' — before they realize there's no internet involved.
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
