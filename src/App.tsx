/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import CursorGlow from './components/CursorGlow';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';

import NavigationDial from './components/NavigationDial';

export default function App() {
  const [timeString, setTimeString] = useState('');
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      setTimeString(`${hours}:${minutes}:${seconds} LOCAL`);
    };
    
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const latencyInterval = setInterval(() => {
      const nextLatency = Math.floor(Math.random() * (24 - 12 + 1)) + 12;
      setLatency(nextLatency);
    }, 2500); // Fluctuates every 2.5 seconds
    
    return () => clearInterval(latencyInterval);
  }, []);

  return (
    <div className="bg-[#0D1515] text-white font-sans min-h-screen relative overflow-x-hidden selection:bg-os-cyan/30 selection:text-white flex flex-col">
      <CursorGlow />
      
      {/* Ambient Background Elements */}
      <div className="fixed top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#00F2FF] opacity-10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-50px] right-[-50px] w-[350px] h-[350px] bg-[#8B5CF6] opacity-10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F2FF] opacity-[0.03] rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Top Navigation / OS Bar */}
      <nav className="h-14 border-b border-white/5 flex items-center justify-between px-4 md:px-8 backdrop-blur-md bg-black/20 z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
          <span className="md:ml-4 text-xs font-mono tracking-widest text-[#00F2FF] uppercase opacity-70">system.active_user: prajwal_mokashi</span>
        </div>
        <div className="text-xs font-mono text-[#8B5CF6] opacity-80">{timeString || '00:00:00 LOCAL'}</div>
      </nav>

      <NavigationDial />

      <main className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow z-10 relative max-w-[1600px] mx-auto w-full">
        {/* Column 1: Hero & About */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Hero />
          <About />
        </div>

        {/* Column 2: Projects & Experience */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Projects />
          
          {/* Bottom Row: Experience & Skills/Contact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-grow">
            <div className="md:col-span-7 flex flex-col h-full">
              <Experience />
            </div>
            
            <div className="md:col-span-5 flex flex-col gap-6 h-full">
              <Skills />
              <Contact />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-auto md:h-8 py-3 md:py-0 border-t border-white/5 flex flex-wrap items-center justify-between px-4 md:px-8 text-[9px] font-mono text-white/30 z-20 bg-[#0D1515] relative mt-auto">
        <div className="flex gap-6 uppercase">
          <span>Latency: {latency}ms</span>
          <span className="text-[#27C93F]">Status: Online</span>
        </div>
        <div className="uppercase tracking-widest hidden md:block opacity-60">
          Built with Next.js & Liquid Glass Engine
        </div>
        <div className="flex gap-4">
          <span>LN: 102</span>
          <span>COL: 45</span>
          <span>UTF-8</span>
        </div>
      </footer>
      
      {/* Global Grain Overlay for texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-screen"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />
    </div>
  );
}
