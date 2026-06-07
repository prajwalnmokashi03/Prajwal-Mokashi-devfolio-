import { motion } from 'motion/react';

const experiences = [
  {
    title: 'PirateLink',
    role: 'Android Dev & UI/UX Designer',
    date: '2026.03 - PRESENT',
    color: '#00F2FF',
    lineStyle: 'bg-gradient-to-b from-[#00F2FF] to-transparent text-[#00F2FF]',
    desc: 'Built offline-first P2P Android chat app using Google Nearby Connections API — zero internet, zero servers.'
  },
  {
    title: 'Hack Fusion 2.0',
    role: 'frontend developer 🏆',
    date: '2026.05',
    color: '#8B5CF6',
    lineStyle: 'bg-white/20 text-white/40',
    desc: 'Built Health Connect, a real-time healthcare appointment overbooking stabilizer — won 1st Runner-Up 🏆'
  },
  {
    title: 'Xero Bot',
    role: 'AI Developer',
    date: '2025 - PRESENT',
    color: 'white',
    lineStyle: 'bg-white/10 text-white/40',
    desc: 'Built an offline AI chatbot running 100% locally with open-source models.'
  },
  {
    title: 'Cinescope',
    role: 'Full-Stack Developer',
    date: '2024',
    color: 'white',
    lineStyle: 'bg-white/10 text-white/40',
    desc: 'Built a cloud-synced watchlist app using Next.js & Firebase.'
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
      className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl h-full flex flex-col"
    >
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-white/20"></span>
        Experience_Logs
      </h3>
      
      <div className="space-y-6 flex-grow">
        {experiences.map((exp, index) => (
          <div key={exp.title} className="flex gap-6 group">
            {/* Timeline Line & Dot */}
            <div className={`w-[1px] relative flex-shrink-0 ${exp.lineStyle.split(' ')[0]} ${index === experiences.length - 1 ? 'h-full min-h-[40px] opacity-20' : 'h-full min-h-[80px]'}`}>
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ring-4 ring-[#0D1515] transition-transform group-hover:scale-150 duration-300"
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
    </motion.div>
  );
}
