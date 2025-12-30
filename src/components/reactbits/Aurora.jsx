'use client';

import { useEffect, useRef } from 'react';

// Aurora background component from ReactBits - https://www.reactbits.dev/
export default function Aurora({
  className = '',
  colorStops = ['#3A29FF', '#FF94B4', '#FF3232'],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    const animate = () => {
      time += 0.01 * speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create multiple aurora waves
      for (let i = 0; i < colorStops.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 5) {
          const normalizedX = x / canvas.width;
          const wave1 = Math.sin(normalizedX * 4 + time + i * 0.5) * amplitude * 50;
          const wave2 = Math.sin(normalizedX * 2 + time * 0.7 + i * 0.3) * amplitude * 30;
          const wave3 = Math.sin(normalizedX * 6 + time * 1.3 + i * 0.7) * amplitude * 20;
          
          const y = canvas.height * (0.3 + i * 0.15) + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `${colorStops[i]}${Math.floor(blend * 100).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${colorStops[(i + 1) % colorStops.length]}${Math.floor(blend * 80).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${colorStops[(i + 2) % colorStops.length]}${Math.floor(blend * 60).toString(16).padStart(2, '0')}`);

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}

