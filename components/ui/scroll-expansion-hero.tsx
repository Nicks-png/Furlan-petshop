'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandColorProps {
  /** Cor do fundo da página (fades out conforme rola) */
  bgColor?: string;
  /** Cor do painel central que se expande */
  mediaColor?: string;
  /** Título dividido em duas metades que se afastam */
  title?: string;
  /** Texto de instrução abaixo do painel */
  scrollToExpand?: string;
  /** mix-blend-difference no título */
  textBlend?: boolean;
  /** Conteúdo que aparece após a expansão completa */
  children?: ReactNode;
}

const ScrollExpandColor = ({
  bgColor    = '#ffffff',
  mediaColor = '#2c1a0a',
  title,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandColorProps) => {
  const [scrollProgress,    setScrollProgress]    = useState(0);
  const [showContent,       setShowContent]        = useState(false);
  const [mediaFullyExpanded,setMediaFullyExpanded] = useState(false);
  const [touchStartY,       setTouchStartY]        = useState(0);
  const [isMobile,          setIsMobile]            = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Reset on mount
  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, []);

  // Scroll / touch intercept
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as unknown as WheelEvent;
      if (mediaFullyExpanded && we.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        we.preventDefault();
      } else if (!mediaFullyExpanded) {
        we.preventDefault();
        const delta = we.deltaY * 0.00038;
        setScrollProgress(prev => {
          const next = Math.min(Math.max(prev + delta, 0), 1);
          if (next >= 1)  { setMediaFullyExpanded(true); setShowContent(true); }
          else if (next < 0.75) setShowContent(false);
          return next;
        });
      }
    };

    const handleTouchStart = (e: Event) => {
      setTouchStartY((e as TouchEvent).touches[0].clientY);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      if (!touchStartY) return;
      const deltaY = touchStartY - te.touches[0].clientY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        te.preventDefault();
      } else if (!mediaFullyExpanded) {
        te.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        setScrollProgress(prev => {
          const next = Math.min(Math.max(prev + deltaY * factor, 0), 1);
          if (next >= 1)  { setMediaFullyExpanded(true); setShowContent(true); }
          else if (next < 0.75) setShowContent(false);
          return next;
        });
        setTouchStartY(te.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel',      handleWheel,      { passive: false });
    window.addEventListener('scroll',     handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove',  handleTouchMove,  { passive: false });
    window.addEventListener('touchend',   handleTouchEnd);

    return () => {
      window.removeEventListener('wheel',      handleWheel);
      window.removeEventListener('scroll',     handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove',  handleTouchMove);
      window.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Dimensions
  const boxW = 300 + scrollProgress * (isMobile ? 650  : 1250);
  const boxH = 400 + scrollProgress * (isMobile ? 200  :  400);
  const slideX = scrollProgress * (isMobile ? 180 : 150); // vw units

  const [firstWord, ...rest] = title ? title.split(' ') : ['', ''];
  const restWords = rest.join(' ');

  return (
    <div
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      className="overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Background colour layer — fades as box expands ── */}
          <motion.div
            className="absolute inset-0 z-0 h-full pointer-events-none"
            animate={{ opacity: 1 - scrollProgress * 1.4 }}
            transition={{ duration: 0.1 }}
            style={{ backgroundColor: bgColor }}
          />

          {/* ── Background decoration: warm bokeh blobs + centre glow ── */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}>
            {/* centre warm glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70vw', height: '70vw', maxWidth: 700, maxHeight: 700,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,146,10,0.07) 0%, transparent 70%)',
            }} />
            {/* top-right blob */}
            <div style={{
              position: 'absolute', top: '-8%', right: '-5%',
              width: 340, height: 340, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(191,114,9,0.08) 0%, transparent 65%)',
            }} />
            {/* bottom-left blob */}
            <div style={{
              position: 'absolute', bottom: '5%', left: '-4%',
              width: 280, height: 280, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,146,10,0.06) 0%, transparent 65%)',
            }} />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── Expanding colour box — z-0, BEHIND text ── */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width:     `${boxW}px`,
                  height:    `${boxH}px`,
                  maxWidth:  '95vw',
                  maxHeight: '85vh',
                  backgroundColor: mediaColor,
                  boxShadow: `0 0 60px rgba(0,0,0,0.25)`,
                  zIndex: 0,
                }}
              />

              {/* ── "Scroll to expand" hint — slides right, z-10 ── */}
              {scrollToExpand && (
                <p
                  className="absolute bottom-[18%] text-xs font-bold tracking-widest uppercase select-none"
                  style={{
                    color:     'rgba(154,114,80,0.7)',
                    transform: `translateX(${slideX}vw)`,
                    zIndex: 10,
                  }}
                >
                  {scrollToExpand}
                </p>
              )}

              {/* ── Title — two halves slide apart, z-10, NEVER covered ── */}
              <div
                className={`flex items-center justify-center gap-4 w-full flex-col select-none ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
                style={{ position: 'relative', zIndex: 10 }}
              >
                <span
                  className="font-black leading-none"
                  style={{
                    fontFamily:  'var(--font-head, serif)',
                    fontSize:    'clamp(2.8rem, 8vw, 6rem)',
                    color:       '#fdf9f4',
                    transform:   `translateX(-${slideX}vw)`,
                    display:     'block',
                    whiteSpace:  'nowrap',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {firstWord}
                </span>
                <span
                  className="font-black leading-none"
                  style={{
                    fontFamily:  'var(--font-head, serif)',
                    fontSize:    'clamp(2.8rem, 8vw, 6rem)',
                    color:       'var(--brand, #e8920a)',
                    transform:   `translateX(${slideX}vw)`,
                    display:     'block',
                    whiteSpace:  'nowrap',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {restWords}
                </span>
              </div>

            </div>

            {/* ── Children — appear after full expansion ── */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandColor;
