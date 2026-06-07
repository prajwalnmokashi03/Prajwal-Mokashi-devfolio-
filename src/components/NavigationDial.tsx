import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SECTIONS = [
  { id: 'hero', label: 'HERO' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' }
];

export default function NavigationDial() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [show, setShow] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const dialRef = useRef<HTMLDivElement>(null);
  
  // Entrance animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Touch Hint Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll sync
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let maxVisible = 0;
      let mostVisibleId = '';
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxVisible) {
          maxVisible = entry.intersectionRatio;
          mostVisibleId = entry.target.id;
        }
      });
      
      if (mostVisibleId && maxVisible > 0) {
        setActiveSection(mostVisibleId);
      } else {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }
    }, { threshold: 0.4 });
    
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (isExpanded && dialRef.current && !dialRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setHoverSection(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isExpanded]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Drag physics logic
  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [hoverSection, setHoverSection] = useState<string | null>(null);
  const wasExpandedAtTouchStart = useRef(false);

  const getSectionFromY = (clientY: number) => {
    if (!dialRef.current) return null;
    const rect = dialRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    
    // account for py-2 padding (8px)
    const rowIndex = Math.floor((relativeY - 8) / 40);
    const validIndex = Math.max(0, Math.min(SECTIONS.length - 1, rowIndex));
    return SECTIONS[validIndex].id;
  };

  const handleStart = (e: React.TouchEvent | React.MouseEvent, clientY: number) => {
    e.stopPropagation();
    setIsInteracting(true);
    dragStartY.current = clientY;
    isDragging.current = false;
    wasExpandedAtTouchStart.current = isExpanded;

    setIsExpanded(true); // Phase 1: Expand Dial immediately
    setHoverSection(null); // Phase 1: Do NOT highlight any section on start
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent, clientY: number) => {
    e.stopPropagation();
    if (dragStartY.current === null) return;
    
    const deltaY = clientY - dragStartY.current;
    if (Math.abs(deltaY) >= 8) {
      isDragging.current = true;
    }
    
    // Phase 2: Highlight in real-time, no navigation
    const section = getSectionFromY(clientY);
    if (section) {
      setHoverSection(section);
    }
  };

  const handleEnd = (e: TouchEvent | MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isInteracting) return;
    setIsInteracting(false);
    
    let endY = dragStartY.current || 0;
    if ('changedTouches' in e && e.changedTouches) {
      endY = e.changedTouches[0].clientY;
    } else if ('clientY' in e) {
      endY = e.clientY;
    }
    
    const deltaY = dragStartY.current !== null ? Math.abs(endY - dragStartY.current) : 0;
    
    // Check if released OUTSIDE dial
    let releasedOutside = false;
    if ('changedTouches' in e && e.changedTouches) {
      const touch = e.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!dialRef.current?.contains(target)) {
        releasedOutside = true;
      }
    } else if (e.target instanceof Node) {
      if (!dialRef.current?.contains(e.target)) {
        releasedOutside = true;
      }
    }

    if (releasedOutside) {
      setIsExpanded(false);
      setHoverSection(null);
    } else {
      if (deltaY < 8) {
        // Tap
        if (!wasExpandedAtTouchStart.current) {
          // Phase 1: Tapped collapsed pill. Don't navigate, it just expands.
        } else {
          // Tapped an already expanded dial
          const tappedSection = getSectionFromY(endY) || hoverSection;
          if (tappedSection) {
            scrollToSection(tappedSection);
            setTimeout(() => { setIsExpanded(false); setHoverSection(null); }, 600);
          }
        }
      } else {
        // Drag
        if (hoverSection) {
          scrollToSection(hoverSection);
          setTimeout(() => { setIsExpanded(false); setHoverSection(null); }, 800);
        }
      }
    }

    dragStartY.current = null;
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    handleStart(e, e.touches[0].clientY);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    handleMove(e, e.touches[0].clientY);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    handleEnd(e.nativeEvent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e, e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartY.current !== null) {
      handleMove(e, e.clientY);
    }
  };
  const handleMouseUp = (e: React.MouseEvent) => handleEnd(e.nativeEvent);
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (dragStartY.current !== null) handleEnd(e.nativeEvent);
  };

  if (!show) return null;

  const defaultShadow = '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 242, 255, 0.06), inset 0 1px 0 rgba(255,255,255,0.06)';
  const isGlowing = !isExpanded && activeSection !== 'hero';

  return (
    <>
      <style>
        {`
          @keyframes glowOpacity {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .dial-glow-overlay {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            box-shadow: 0 0 12px rgba(0,242,255,0.3);
            animation: glowOpacity 2s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: -1;
          }
        `}
      </style>
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          scale: showHint ? [1, 1.08, 1] : 1,
        }}
        transition={{ 
          x: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.5, ease: "easeOut" },
          scale: { duration: 0.4 } // Hint duration
        }}
        className="fixed right-[14px] top-1/2 -translate-y-1/2 z-[9999]"
        style={{ userSelect: 'none', touchAction: 'none', WebkitTapHighlightColor: 'transparent', transform: 'translateZ(0)' }}
      >
        <motion.div
          ref={dialRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden flex flex-col justify-center cursor-pointer"
          animate={{
            width: isExpanded ? 120 : 20,
            height: isExpanded ? SECTIONS.length * 40 + 16 : 72,
            borderRadius: isExpanded ? 20 : 12,
            boxShadow: defaultShadow,
          }}
          style={{
            background: 'rgba(13, 21, 21, 0.70)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 242, 255, 0.25)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {isGlowing && <div className="dial-glow-overlay" />}
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center w-full h-full relative"
              >
                {/* Top Notch */}
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[8px] h-[2px] bg-[#00F2FF]/30 rounded-[1px]" />
                
                {/* Scroll Thumb */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-[#00F2FF] shadow-[0_0_8px_#00F2FF]"
                  style={{ top: `${14 + scrollProgress * 36}px` }}
                />

                {/* Bottom Notch */}
                <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[8px] h-[2px] bg-[#00F2FF]/30 rounded-[1px]" />
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col py-2"
              >
                {SECTIONS.map((section) => {
                  const isSelected = (hoverSection || activeSection) === section.id;
                  
                  return (
                    <div
                      key={section.id}
                      className="h-[40px] px-3 flex items-center gap-2 border-b border-[#00F2FF]/[0.08] last:border-b-0 transition-colors duration-200 relative"
                      style={{
                        background: isSelected ? 'rgba(0, 242, 255, 0.08)' : 'transparent',
                      }}
                    >
                      {/* Active left border indicator */}
                      <div 
                        className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300 ${isSelected ? 'bg-[#00F2FF]' : 'bg-transparent'}`}
                      />
                      
                      <div 
                        className={`w-[5px] h-[5px] rounded-full transition-all duration-300 ${isSelected ? 'bg-[#00F2FF] shadow-[0_0_6px_#00F2FF]' : 'bg-white/25'}`} 
                      />
                      <span 
                        className={`font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-300 ${isSelected ? 'text-[#00F2FF]' : 'text-white/45'}`}
                      >
                        {section.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

