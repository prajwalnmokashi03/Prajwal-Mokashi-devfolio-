import { motion } from 'motion/react';
import ChapterMarker from './ChapterMarker';
import BorderGlow from './BorderGlow';

const skillGroups = [
  {
    category: 'Android',
    color: '#00F2FF',
    skills: ['Kotlin', 'XML Layouts', 'Jetpack', 'Nearby API'],
    score: '88%'
  },
  {
    category: 'Web',
    color: '#8B5CF6',
    skills: ['Next.js', 'React.js', 'Firebase', 'Tailwind'],
    score: '82%'
  },
  {
    category: 'Design',
    color: '#FFFFFF',
    skills: ['Figma', 'Liquid Glass', 'Material You', 'UI/UX'],
    score: '87%'
  },
  {
    category: 'AI Tools',
    color: '#00F2FF',
    skills: ['Ollama', 'Prompt Eng', 'Local LLMs', 'Docker'],
    score: '84%'
  }
];

export default function Skills() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      id="skills"
      className="flex-grow h-full flex flex-col"
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
        <div className="p-6 flex flex-col h-full relative">
          <ChapterMarker number="05" label="ARSENAL" />

      
      <div className="space-y-6 flex-grow flex flex-col justify-center">
        {skillGroups.map((group, index) => (
          <div key={group.category} className="group">
            <div className="flex justify-between text-[10px] font-bold mb-1.5 text-white/60 group-hover:text-white/90 transition-colors uppercase tracking-widest">
              <span>{group.category}</span>
              <span style={{ color: group.color }} className="opacity-80">{group.score}</span>
            </div>
            <div className="text-[9px] text-white/40 mb-2.5 uppercase tracking-wider leading-relaxed">
              {group.skills.join(' • ')}
            </div>
            <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: group.score }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: group.color }}
              />
            </div>
          </div>
        ))}
      </div>
      </div>
      </BorderGlow>
    </motion.div>
  );
}
