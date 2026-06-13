import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ChapterMarker from './ChapterMarker';
import BorderGlow from './BorderGlow';

const projects = [
  {
    id: 'piratelink',
    name: 'PirateLink',
    tag: 'Android / P2P',
    desc: 'Offline-first peer-to-peer chat app using Nearby Connections API. Zero internet, zero servers.',
    tech: ['Kotlin', 'Nearby API', 'Figma'],
    color: '#00F2FF',
    link: 'https://piratelink.vercel.app',
    github: 'https://github.com/prajwalnmokashi03/piratelink.app',
    images: [
      '/images/projects/piratelink/piratelink-1.png',
      '/images/projects/piratelink/piratelink-2.png',
      '/images/projects/piratelink/piratelink-3.png'
    ]
  },
  {
    id: 'qura',
    name: 'Health Connect',
    tag: 'MedTech',
    desc: 'Real-time healthcare appointment overbooking stabilizer. Built in 24 hours for Hack Fusion 2.0.',
    tech: ['React 18', 'Node.js', 'PostgreSQL'],
    color: '#8B5CF6',
    link: 'https://healthconnect-8lzi.vercel.app',
    github: 'https://github.com/abhiyaligar/healthconnect',
    images: [
      '/images/projects/healthconnect/healthconnect-1.png',
      '/images/projects/healthconnect/healthconnect-2.png'
    ]
  },
  {
    id: 'cinescope',
    name: 'CineScope',
    tag: 'Web / Media',
    desc: 'Full-stack streaming discovery and watchlist app leveraging TMDB API for real-time data.',
    tech: ['Next.js', 'Firebase', 'TMDB'],
    color: '#8B5CF6',
    link: 'https://cinescope-chi.vercel.app',
    github: 'https://github.com/prajwalnmokashi03/cinescope',
    images: [
      '/images/projects/cinescope/cinescope-1.png',
      '/images/projects/cinescope/cinescope-2.png'
    ]
  },
  {
    id: 'xerobot',
    name: 'Xero Bot',
    tag: 'AI / Local',
    desc: 'Offline AI chatbot running 100% locally using Ollama and open-source models.',
    tech: ['Python', 'Ollama', 'Docker'],
    color: '#00F2FF',
    link: '#',
    github: 'https://github.com/prajwalnmokashi03/XER0-bot',
    images: [
      '/images/projects/xerobot/xerobot-1.png',
      '/images/projects/xerobot/xerobot-2.png'
    ]
  }
];

function ProjectCarousel({ 
  images, 
  color, 
  projectName, 
  link, 
  github 
}: { 
  images: string[], 
  color: string, 
  projectName: string,
  link: string,
  github: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isHovered || isInteracting) return;
    
    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      
      intervalId = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 3000);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, isInteracting, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 40) {
      setCurrentIndex(prev => (prev + 1) % images.length);
    } else if (diff < -40) {
      setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    }
    
    setTouchStart(null);
    setTimeout(() => setIsInteracting(false), 500);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="relative w-full aspect-video rounded-[8px] bg-[rgba(0,0,0,0.3)] overflow-hidden group/carousel border border-white/5 group-hover:border-white/20 transition-colors mt-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <div 
        className="flex w-full h-full transition-transform duration-400 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, transitionDuration: '0.4s' }}
      >
        {images.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full relative">
            {!imagesLoaded[i] && !imageErrors[i] && (
              <div className="absolute inset-0 bg-[#00F2FF]/5 animate-pulse" />
            )}
            
            {imageErrors[i] ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <span className="text-white/40 text-xs font-mono uppercase tracking-widest">{projectName}</span>
              </div>
            ) : (
              <img 
                src={img} 
                alt={`${projectName} ${i + 1}`}
                onLoad={() => setImagesLoaded(prev => ({ ...prev, [i]: true }))}
                onError={() => setImageErrors(prev => ({ ...prev, [i]: true }))}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded[i] ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
            
            {/* Color tint matching old style */}
            <div 
              className="absolute inset-0 z-10 transition-opacity duration-500 opacity-60 group-hover/carousel:opacity-30 pointer-events-none mix-blend-overlay"
              style={{ backgroundImage: `linear-gradient(to top right, #000000, ${color}40)` }}
            />
          </div>
        ))}
      </div>

      {/* Arrows (Desktop) */}
      <button 
        onClick={goToPrev}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-[28px] h-[28px] rounded-full items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-30 pointer-events-auto"
        style={{ background: 'rgba(13,21,21,0.7)', border: '1px solid rgba(0,242,255,0.2)' }}
      >
        <ChevronLeft className="w-4 h-4 text-[#00F2FF]" />
      </button>
      <button 
        onClick={goToNext}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-[28px] h-[28px] rounded-full items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-30 pointer-events-auto"
        style={{ background: 'rgba(13,21,21,0.7)', border: '1px solid rgba(0,242,255,0.2)' }}
      >
        <ChevronRight className="w-4 h-4 text-[#00F2FF]" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-[6px] z-30 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity pointer-events-none">
        {images.map((_, i) => (
          <div 
            key={i} 
            className="rounded-full transition-all duration-300"
            style={{
              width: currentIndex === i ? '7px' : '5px',
              height: currentIndex === i ? '7px' : '5px',
              backgroundColor: currentIndex === i ? '#00F2FF' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full">
      <ChapterMarker number="03" label="ARTIFACTS" />
      <div className="mb-4 flex justify-between items-end px-2">
        <div>

          <p className="text-xs text-white/50 tracking-widest uppercase">Artifacts of the Build</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group h-full"
          >
            <BorderGlow
              glowColor="186 100 80"
              backgroundColor="#000000"
              borderRadius={16}
              glowRadius={40}
              glowIntensity={0.8}
              coneSpread={25}
              animated={true}
              colors={['#00F2FF', '#8B5CF6', '#00F2FF']}
              className="w-full h-full"
            >
              <div className="p-5 flex flex-col h-full flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-bold px-2 py-1 bg-white/10 rounded uppercase tracking-widest flex items-center gap-2 text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ backgroundColor: project.color, boxShadow: `0 0 5px ${project.color}` }}></span>
                    {project.tag}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold mb-2 text-white/90">{project.name}</h4>
                <p className="text-[10px] sm:text-[11px] text-white/50 mb-4 leading-relaxed flex-grow">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{t}</span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3 mb-5 mt-auto">
                  {project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[10px] font-bold tracking-widest uppercase flex-1 justify-center sm:flex-none">
                      <ExternalLink className="w-3.5 h-3.5" style={{ color: project.color }} />
                      <span className="text-white/80">Website</span>
                    </a>
                  )}
                  {project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[10px] font-bold tracking-widest uppercase flex-1 justify-center sm:flex-none">
                      <Github className="w-3.5 h-3.5" style={{ color: project.color }} />
                      <span className="text-white/80">GitHub</span>
                    </a>
                  )}
                </div>

                <ProjectCarousel 
                  images={project.images}
                  color={project.color}
                  projectName={project.name}
                  link={project.link}
                  github={project.github}
                />
              </div>
            </BorderGlow>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
