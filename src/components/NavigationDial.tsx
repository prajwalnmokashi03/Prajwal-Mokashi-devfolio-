import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SECTIONS = [
  { id: 'hero', label: '00. BOOT' },
  { id: 'manifesto', label: '02. OBSESSION' },
  { id: 'projects', label: '03. ARTIFACTS' },
  { id: 'experience', label: '04. FIELD_NOTES' },
  { id: 'skills', label: '05. ARSENAL' },
  { id: 'contact', label: '06. TRANSMISSION' }
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
  
  const [hoverSection, setHoverSection] = useState<string | null>(null);

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

  // Guard against mouse events firing during touch interaction
  const isTouchInteraction = useRef(false);

  // Mobile Touch System
  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
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

  useEffect(() => {
    const el = dialRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      isTouchInteraction.current = true; // Mark as touch interaction
      e.preventDefault();
      wasExpandedAtTouchStart.current = isExpanded;
      setIsExpanded(true);
      isDragging.current = true;
      dragStartY.current = e.touches[0].clientY;
    };
    
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => el.removeEventListener('touchstart', handleTouchStart);
  }, [isExpanded]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const section = getSectionFromY(e.touches[0].clientY);
      if (section) setHoverSection(section);
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      
      let endY = dragStartY.current || 0;
      if (e.changedTouches && e.changedTouches[0]) {
        endY = e.changedTouches[0].clientY;
      }
      
      let releasedOutside = false;
      if (e.changedTouches && e.changedTouches[0]) {
        const touch = e.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!dialRef.current?.contains(target as Node)) {
          releasedOutside = true;
        }
      }

      if (releasedOutside) {
        setIsExpanded(false);
        setHoverSection(null);
      } else {
        const deltaY = dragStartY.current !== null ? Math.abs(endY - dragStartY.current) : 0;
        
        if (deltaY < 8) {
          if (wasExpandedAtTouchStart.current) {
            const tappedSection = getSectionFromY(endY);
            if (tappedSection) {
              scrollToSection(tappedSection);
              setTimeout(() => { setIsExpanded(false); setHoverSection(null); }, 400);
            }
          }
        } else {
          setHoverSection(currentHover => {
            if (currentHover) {
              scrollToSection(currentHover);
              setTimeout(() => { setIsExpanded(false); setHoverSection(null); }, 400);
            }
            return currentHover;
          });
        }
      }
      
      isDragging.current = false;
      dragStartY.current = null;
      
      // Delay resetting the touch flag to ignore ghost clicks
      setTimeout(() => {
        isTouchInteraction.current = false;
      }, 300);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

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
            z-index: 0;
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
        style={{ userSelect: 'none', touchAction: 'none', WebkitTapHighlightColor: 'transparent', transform: 'translateZ(0)', isolation: 'isolate' }}
      >
        <motion.div
          ref={dialRef}
          onMouseEnter={() => {
            if (isTouchInteraction.current) return;
            setIsExpanded(true);
          }}
          onMouseLeave={() => {
            if (isTouchInteraction.current) return;
            setIsExpanded(false);
            setHoverSection(null);
          }}
          className="relative overflow-hidden flex flex-col justify-center cursor-pointer"
          animate={{
            width: isExpanded ? 150 : 20,
            height: isExpanded ? SECTIONS.length * 40 + 16 : 72,
            borderRadius: isExpanded ? 20 : 12,
            boxShadow: defaultShadow,
          }}
          style={{
            background: 'rgba(13, 21, 21, 0.70)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 242, 255, 0.25)',
            willChange: 'transform',
            transform: 'translateZ(0)',
            isolation: 'isolate'
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
                      onMouseEnter={() => {
                        if (isTouchInteraction.current) return;
                        setHoverSection(section.id);
                      }}
                      onClick={() => {
                        if (isTouchInteraction.current) return;
                        scrollToSection(section.id);
                        setIsExpanded(false);
                      }}
                      className="h-[40px] px-3 flex items-center gap-2 border-b border-[#00F2FF]/[0.08] last:border-b-0 transition-colors duration-200 relative cursor-pointer"
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

