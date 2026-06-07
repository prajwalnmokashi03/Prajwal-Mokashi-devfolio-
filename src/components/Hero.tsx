import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import '@fontsource/geist-sans/700.css';

const TERMINAL_LINES = [
  { text: "$ initializing system...", color: "rgba(0,242,255,0.5)" },
  { text: "> user: Prajwal_M", color: "#AAAAAA" },
  { text: "> role: Android Dev + UI/UX", color: "#AAAAAA" },
  { text: "> location: Dharwad, IN", color: "#AAAAAA" },
  { text: "$ loading projects...", color: "rgba(0,242,255,0.5)" },
  { text: "✓ PirateLink [OFFLINE_READY]", color: "#28C840" },
  { text: "✓ Qura [DEPLOYED]", color: "#28C840" },
  { text: "✓ Arcadium AI [LIVE]", color: "#28C840" },
  { text: "✓ Xero Bot [RUNNING]", color: "#28C840" },
  { text: "$ status check...", color: "rgba(0,242,255,0.5)" },
  { text: "✓ Hack Fusion 2.0 [1ST RUNNER-UP 🏆]", color: "#28C840" },
  { text: "$ ready to build.", color: "rgba(0,242,255,0.5)" }
];

function TerminalWindow() {
  const [lines, setLines] = useState<{text: string, color: string}[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentLineText]);

  useEffect(() => {
    let isCancelled = false;
    const typeLines = async () => {
      await new Promise(r => setTimeout(r, 800));
      if (isCancelled) return;
      await new Promise(r => setTimeout(r, 500));
      if (isCancelled) return;
      
      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        const line = TERMINAL_LINES[i];
        setCurrentLineIndex(i);
        setCurrentLineText("");
        
        for (let j = 0; j <= line.text.length; j++) {
          if (isCancelled) return;
          setCurrentLineText(line.text.slice(0, j));
          await new Promise(r => setTimeout(r, 40));
        }
        
        if (isCancelled) return;
        setLines(prev => [...prev, line]);
        setCurrentLineText("");
        
        if (i < TERMINAL_LINES.length - 1) {
          await new Promise(r => setTimeout(r, 200));
        }
      }
      setCurrentLineIndex(TERMINAL_LINES.length);
    };
    
    typeLines();
    return () => { isCancelled = true; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-[320px]"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
        className="w-full rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: 'rgba(5, 15, 15, 0.85)',
          border: '1px solid rgba(0, 242, 255, 0.20)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 242, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.04)'
        }}
      >
        <div className="h-8 flex items-center justify-between px-3" style={{ background: 'rgba(0, 242, 255, 0.05)', borderBottom: '1px solid rgba(0,242,255,0.10)' }}>
          <div className="flex items-center gap-[6px] ml-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]"></div>
          </div>
          <div className="font-mono text-[10px] mr-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            bash — prajwal_m
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="p-4 font-mono text-xs leading-[1.8] bg-transparent overflow-y-auto max-h-[220px]"
          style={{ scrollbarWidth: 'none' }}
        >
          {lines.map((line, i) => (
            <div key={i} style={{ color: line.color }}>{line.text}</div>
          ))}
          {currentLineIndex < TERMINAL_LINES.length && (
            <div style={{ color: TERMINAL_LINES[currentLineIndex].color }}>
              {currentLineText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ color: '#00F2FF', display: 'inline-block' }}
              >
                █
              </motion.span>
            </div>
          )}
          {currentLineIndex >= TERMINAL_LINES.length && (
            <div>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ color: '#00F2FF', display: 'inline-block' }}
              >
                █
              </motion.span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [bootPhase, setBootPhase] = useState('hidden');

  const handleGlitch = () => {
    if (isGlitching || bootPhase !== 'settled') return;
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 800);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setBootPhase('flicker'), 500);
    const t2 = setTimeout(() => setBootPhase('glitch1'), 800);
    const t3 = setTimeout(() => setBootPhase('normal'), 1400);
    const t4 = setTimeout(() => setBootPhase('glitch2'), 1600);
    const t5 = setTimeout(() => setBootPhase('settled'), 1900);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  let bootClass = '';
  if (bootPhase === 'hidden') bootClass = 'name-hidden';
  else if (bootPhase === 'flicker') bootClass = 'flicker-in';
  else if (bootPhase === 'glitch1') bootClass = 'glitch-boot-1';
  else if (bootPhase === 'glitch2') bootClass = 'glitch-boot-2';
  else if (bootPhase === 'settled') bootClass = 'name-settled';

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [text, setText] = useState('');
  const fullText = 'INITIALIZE';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="hero" className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex-grow relative overflow-hidden group min-h-[400px] flex flex-col justify-center">
      <style>
        {`
          @keyframes glitch-anim-1 {
            0% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            5% { transform: translate(-3px, 1px); clip-path: inset(20% 0 60% 0); }
            10% { transform: translate(3px, -1px); clip-path: inset(50% 0 30% 0); }
            15% { transform: translate(-2px, 2px); clip-path: inset(10% 0 80% 0); }
            20% { transform: translate(2px, -2px); clip-path: inset(70% 0 10% 0); }
            25% { transform: translate(-3px, 0px); clip-path: inset(40% 0 40% 0); }
            30% { transform: translate(0px, 1px); clip-path: inset(0 0 100% 0); }
            31% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            50% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            51% { transform: translate(2px, -1px); clip-path: inset(30% 0 50% 0); }
            55% { transform: translate(-2px, 1px); clip-path: inset(60% 0 20% 0); }
            60% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            100% { transform: translate(0); clip-path: inset(0 0 100% 0); }
          }
          @keyframes glitch-anim-2 {
            0% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            5% { transform: translate(3px, 2px); clip-path: inset(15% 0 50% 0); }
            10% { transform: translate(-3px, 1px); clip-path: inset(60% 0 10% 0); }
            15% { transform: translate(2px, -2px); clip-path: inset(25% 0 65% 0); }
            20% { transform: translate(-2px, 2px); clip-path: inset(80% 0 5% 0); }
            25% { transform: translate(3px, 0px); clip-path: inset(45% 0 30% 0); }
            30% { transform: translate(0px, 2px); clip-path: inset(0 0 100% 0); }
            31% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            50% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            51% { transform: translate(-2px, 1px); clip-path: inset(40% 0 40% 0); }
            55% { transform: translate(2px, -1px); clip-path: inset(70% 0 10% 0); }
            60% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            100% { transform: translate(0); clip-path: inset(0 0 100% 0); }
          }
          @keyframes base-shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(2px); }
            50% { transform: translateX(0); }
            75% { transform: translateX(-2px); }
            100% { transform: translateX(0); }
          }
          @keyframes text-flicker {
            0% { text-shadow: 0 0 20px rgba(0,242,255,0.8); }
            50% { text-shadow: 0 0 40px rgba(139,92,246,0.6); }
            100% { text-shadow: 0 0 20px rgba(0,242,255,0.8); }
          }
          .glitch-wrapper {
            cursor: crosshair;
            transition: color 0.3s ease, text-shadow 0.3s ease;
            display: inline-block;
          }
          .glitch-wrapper span {
            transition: color 0.3s ease, filter 0.3s ease, text-shadow 0.3s ease;
          }
          .glitch-wrapper.is-glitching {
            animation: base-shake 0.1s linear 3, text-flicker 0.2s steps(1) 4;
            color: #FFFFFF !important;
          }
          .glitch-wrapper.is-glitching span {
            color: #FFFFFF !important;
            filter: drop-shadow(0 0 0 transparent) !important;
          }
          .glitch-wrapper.is-glitching::before,
          .glitch-wrapper.is-glitching::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            white-space: pre-wrap;
            pointer-events: none;
            z-index: 10;
          }
          .glitch-wrapper.is-glitching::before {
            color: #00F2FF;
            animation: glitch-anim-1 0.8s linear both;
            opacity: 0.8;
          }
          .glitch-wrapper.is-glitching::after {
            color: #8B5CF6;
            animation: glitch-anim-2 0.8s linear both;
            animation-delay: 0.05s;
            opacity: 0.8;
          }

          @keyframes nameFlicker {
            0%   { opacity: 0; }
            15%  { opacity: 1; }
            25%  { opacity: 0; }
            40%  { opacity: 1; }
            50%  { opacity: 0; }
            65%  { opacity: 1; }
            75%  { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes glitch-anim-subtle {
            0% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            5% { transform: translate(-1.5px, 0.5px); clip-path: inset(20% 0 60% 0); }
            10% { transform: translate(1.5px, -0.5px); clip-path: inset(50% 0 30% 0); }
            15% { transform: translate(-1px, 1px); clip-path: inset(10% 0 80% 0); }
            20% { transform: translate(1px, -1px); clip-path: inset(70% 0 10% 0); }
            25% { transform: translate(-1.5px, 0px); clip-path: inset(40% 0 40% 0); }
            30% { transform: translate(0px, 0.5px); clip-path: inset(0 0 100% 0); }
            31% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            50% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            51% { transform: translate(1px, -0.5px); clip-path: inset(30% 0 50% 0); }
            55% { transform: translate(-1px, 0.5px); clip-path: inset(60% 0 20% 0); }
            60% { transform: translate(0); clip-path: inset(0 0 100% 0); }
            100% { transform: translate(0); clip-path: inset(0 0 100% 0); }
          }

          .name-hidden { opacity: 0; }
          .flicker-in {
            color: #00F2FF !important;
            animation: nameFlicker 0.3s steps(1) forwards;
          }
          .flicker-in span {
            color: #00F2FF !important;
            filter: drop-shadow(0 0 0 transparent) !important;
          }
          .glitch-boot-1::before,
          .glitch-boot-1::after,
          .glitch-boot-2::before {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            white-space: pre-wrap;
            pointer-events: none;
            z-index: 10;
          }
          .glitch-boot-1::before {
            color: #00F2FF;
            animation: glitch-anim-1 0.6s linear forwards;
            opacity: 0.8;
          }
          .glitch-boot-1::after {
            color: #8B5CF6;
            animation: glitch-anim-2 0.6s linear forwards;
            animation-delay: 0.05s;
            opacity: 0.8;
          }
          .glitch-boot-2::before {
            color: #00F2FF;
            animation: glitch-anim-subtle 0.3s linear forwards;
            opacity: 0.8;
          }
          .name-settled {
            color: #FFFFFF;
            text-shadow: 0 0 30px rgba(0, 242, 255, 0.12), 0 0 60px rgba(0, 242, 255, 0.06);
            transition: text-shadow 0.4s ease;
          }
          .glitch-wrapper:hover {
            text-shadow: 0 0 40px rgba(0,242,255,0.4);
          }
        `}
      </style>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full h-full gap-6">
        
        {/* Left Column */}
        <div className="flex flex-col items-start text-left w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#00F2FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center"
          >
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="inline-block w-1.5 h-3 bg-[#00F2FF] ml-1"
            />
          </motion.div>

          <h1
            data-text={"Prajwal\nMokashi"}
            onMouseEnter={handleGlitch}
            onTouchStart={handleGlitch}
            style={{ fontFamily: '"Geist Sans", sans-serif' }}
            className={`glitch-wrapper relative text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] ${isGlitching ? 'is-glitching' : ''} ${bootClass}`}
          >
            Prajwal<br/>
            <span className="text-[#00F2FF] drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">Mokashi</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl font-light text-white/80 max-w-[320px] leading-snug"
          >
            Android Dev + UI/UX Designer.<br/>
            I build things that work. <span className="text-[#8B5CF6] italic">Even without the internet.</span>
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={scrollToAbout}
            className="mt-10 px-8 py-4 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#00F2FF]/10 transition-colors flex items-center gap-3 w-max"
          >
            See My Work <ArrowRight className="w-4 h-4 text-[#00F2FF]" />
          </motion.button>
        </div>

        {/* Right Column: Terminal Window */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center lg:justify-end">
          <TerminalWindow />
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#00F2FF]/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
    </div>
  );
}
