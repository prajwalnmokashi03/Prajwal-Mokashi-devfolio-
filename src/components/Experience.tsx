import { motion } from 'motion/react';
import ChapterMarker from './ChapterMarker';
import BorderGlow from './BorderGlow';

const experiences = [
  {
    title: 'PirateLink',
    role: 'Android Developer & UI/UX Designer',
    date: '2026.03 - PRESENT',
    color: '#00F2FF',
    lineStyle: 'bg-gradient-to-b from-[#00F2FF] to-transparent text-[#00F2FF]',
    desc: 'Started with a question nobody was asking: what if the internet just stopped? Built PirateLink to answer it — an Android app using Google Nearby Connections API that lets people communicate with zero internet, zero servers, and zero cloud costs. Designed every screen from scratch.'
  },
  {
    title: 'Hack Fusion 2.0',
    role: 'Product Designer & Developer',
    date: '2026.05',
    color: '#8B5CF6',
    lineStyle: 'bg-white/20 text-white/40',
    desc: 'Walked in with a team of four and an idea. Walked out 24 hours later with Health Connect — a real-time healthcare overbooking stabilizer — and a 1st Runner-Up trophy 🏆. The pressure revealed how well we actually worked together.'
  },
  {
    title: 'Xero Bot',
    role: 'AI Developer',
    date: '2025 - PRESENT',
    color: 'white',
    lineStyle: 'bg-white/10 text-white/40',
    desc: 'Asked the same question I always ask: does this need the internet? Xero Bot runs 100% locally using Ollama and open-source models. No API keys. No subscriptions. Your conversations stay on your device.'
  },
  {
    title: 'Cinescope',
    role: 'Full-Stack Developer',
    date: '2024',
    color: 'white',
    lineStyle: 'bg-white/10 text-white/40',
    desc: 'Built a full-stack streaming discovery and watchlist platform with Next.js, Firebase Auth, and Firestore. The real challenge wasn\'t the features — it was migrating user data from localStorage to cloud sync without breaking anything.'
  }
];

export default function Experience() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      id="experience"
      className="h-full flex flex-col"
    >
      <BorderGlow
        glowColor="186 100 80"
        backgroundColor="#000000"
        borderRadius={24}
        glowRadius={40}
        glowIntensity={0.8}
        coneSpread={25}
        animated={true}
        colors={['#00F2FF', '#8B5CF6', '#00F2FF']}
        className="w-full h-full backdrop-blur-xl"
      >
        <div className="p-6 md:p-8 flex flex-col h-full relative">
          <ChapterMarker number="04" label="FIELD_NOTES" />

      
      <div className="space-y-6 flex-grow">
        {experiences.map((exp, index) => (
          <div key={exp.title} className="flex gap-6 group">
            {/* Timeline Line & Dot */}
            <div className={`w-[1px] relative flex-shrink-0 ${exp.lineStyle.split(' ')[0]} ${index === experiences.length - 1 ? 'h-full min-h-[40px] opacity-20' : 'h-full min-h-[80px]'}`}>
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ring-4 ring-black transition-transform group-hover:scale-150 duration-300"
                style={{ 
                  backgroundColor: index === 0 ? exp.color : 'rgba(255,255,255,0.4)',
                  boxShadow: index === 0 ? `0 0 10px ${exp.color}` : 'none'
                }}
              ></div>
            </div>
            
            {/* Content */}
            <div className="pb-4">
              <p className={`text-[10px] font-mono mb-1.5 ${exp.lineStyle.split(' ')[1]}`}>
                {exp.date}
              </p>
              <p className="text-sm font-bold text-white/90 group-hover:text-white transition-colors mb-1">{exp.role}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-2">{exp.title}</p>
              <p className="text-[11px] text-white/50 leading-relaxed font-light">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      </BorderGlow>
    </motion.div>
  );
}
