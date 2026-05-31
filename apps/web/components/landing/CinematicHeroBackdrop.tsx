'use client';

import * as React from 'react';

export interface CinematicHeroBackdropProps {
  desktopSrc: string;
  mobileSrc: string;
  /** Subtiles Parallax (max. 8px), respektiert prefers-reduced-motion */
  enableParallax?: boolean;
}

export function CinematicHeroBackdrop({
  desktopSrc,
  mobileSrc,
  enableParallax = true,
}: CinematicHeroBackdropProps) {
  const [parallaxY, setParallaxY] = React.useState(0);

  React.useEffect(() => {
    if (!enableParallax || typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setParallaxY(Math.min(8, window.scrollY * 0.02));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [enableParallax]);

  return (
    <>
      <div
        className="absolute inset-0 -z-20 overflow-hidden pointer-events-none"
        style={
          enableParallax ? { transform: `translate3d(0, ${parallaxY}px, 0)` } : undefined
        }
        aria-hidden
      >
        <div
          className="hero-bg-layer absolute inset-0 md:hidden"
          style={{ backgroundImage: `url(${mobileSrc})` }}
        />
        <div
          className="hero-bg-layer absolute inset-0 hidden md:block"
          style={{ backgroundImage: `url(${desktopSrc})` }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 hero-glow-atmosphere"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10 hero-overlay-readability hidden md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hero-overlay-depth hidden md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hero-overlay-mobile"
        aria-hidden
      />
    </>
  );
}
