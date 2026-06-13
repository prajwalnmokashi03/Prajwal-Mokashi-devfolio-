import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: -100, y: -100 }; // start off-screen
    const numPoints = 20;
    const points = Array(numPoints).fill(0).map(() => ({ x: -100, y: -100 }));

    const updateMousePosition = (e: MouseEvent) => {
      // If points are way offscreen (initial state), snap them to the mouse
      if (points[0].x === -100) {
        for (let i = 0; i < numPoints; i++) {
          points[i].x = e.clientX;
          points[i].y = e.clientY;
        }
      }
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', updateMousePosition);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Physics: head point follows mouse
      points[0].x += (mouse.x - points[0].x) * 0.6;
      points[0].y += (mouse.y - points[0].y) * 0.6;

      // Each subsequent point follows the one before it smoothly
      for (let i = 1; i < numPoints; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.4;
        points[i].y += (points[i - 1].y - points[i].y) * 0.4;
      }

      // Draw the fluid trail
      for (let i = 0; i < numPoints - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        
        // progress from 0 (tail tip) to 1 (head)
        const progress = 1 - (i / numPoints); 
        
        // Outer cyan fluid
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = 20 * Math.pow(progress, 1.5);
        ctx.strokeStyle = `rgba(0, 242, 255, ${0.4 * progress})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        // Inner bright reflection
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = 8 * Math.pow(progress, 1.5);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * progress})`;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Draw the main bubble head
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 255, 0.6)`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] mix-blend-screen"
    />
  );
}
