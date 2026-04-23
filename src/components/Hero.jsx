import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import Logo from './Logo'

// ─── Lista servizi con immagini Unsplash affidabili e stabili ───────────────────────────
const SERVICES = [
  { name: 'Laser Diodo', img: 'https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=200&h=200&q=80&auto=format&fit=crop' },
  { name: 'Rimodellamento', img: 'https://images.unsplash.com/photo-1544161515-4af6b1d46afb?w=200&h=200&q=80&auto=format&fit=crop' },
  { name: 'Anti-age', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?w=200&h=200&q=80&auto=format&fit=crop' },
  { name: 'Skin care', img: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=200&h=200&q=80&auto=format&fit=crop' },
  { name: 'Benessere', img: 'https://images.unsplash.com/photo-1570172619114-d101797e8f10?w=200&h=200&q=80&auto=format&fit=crop' },
  { name: 'Nail design', img: 'https://images.unsplash.com/photo-1610992015732-2449b0deec5d?w=200&h=200&q=80&auto=format&fit=crop' },
  { name: 'Viso detox', img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=200&h=200&q=80&auto=format&fit=crop' },
  { name: 'Massaggio', img: 'https://images.unsplash.com/photo-1604654894610-df49065027ae?w=200&h=200&q=80&auto=format&fit=crop' },
]

const DURATION = 120

function useResponsive() {
  const [values, setValues] = React.useState({
    radius: 250,
    notchW: 220,
    isMobile: false,
    pillScale: 1,
    titleScale: 1
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setValues({
        radius: mobile ? 180 : 225,
        notchW: mobile ? 170 : 205,
        isMobile: mobile,
        pillScale: mobile ? 0.72 : 0.88,
        titleScale: mobile ? 0.8 : 0.95
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return values;
}

function ServicePill({ name, img, scale }) {
  const [hasError, setHasError] = useState(false);
  const isMobileScale = scale < 1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isMobileScale ? `${10 * scale}px ${8 * scale}px ${16 * scale}px` : `${12 * scale}px ${8 * scale}px ${18 * scale}px`,
        gap: isMobileScale ? `${10 * scale}px` : `${12 * scale}px`,
        width: `${50 * scale}px`,
        height: isMobileScale ? `${210 * scale}px` : `${215 * scale}px`,
        background: isMobileScale ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255,255,255,0.65)',
        border: isMobileScale ? '1px solid rgba(255, 255, 255, 0.8)' : '0.8px solid rgba(255,255,255,0.7)',
        borderRadius: '999px',
        boxShadow: isMobileScale ? '0 4px 15px rgba(0,0,0,0.03)' : '0 10px 25px rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
        transform: `translateZ(0) scale(${scale})`,
        transformOrigin: 'bottom center'
      }}
    >
      <div
        style={{
          width: isMobileScale ? `${34 * scale}px` : `${36 * scale}px`,
          height: isMobileScale ? `${34 * scale}px` : `${36 * scale}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          border: isMobileScale ? '1.5px solid rgba(255, 255, 255, 0.9)' : '1.5px solid rgba(255,255,255,0.8)',
          flexShrink: 0,
          backgroundColor: isMobileScale ? '#fcf7f2' : '#faf5ef', // Fallback background color
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!hasError ? (
          <img
            src={img}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <span style={{
            fontSize: isMobileScale ? `${12 * scale}px` : `${14 * scale}px`,
            fontWeight: 700,
            color: '#8a785d',
            fontFamily: 'Cormorant Garamond, serif'
          }}>
            {name.charAt(0)}
          </span>
        )}
      </div>
      <span
        style={{
          color: isMobileScale ? 'rgba(60, 50, 40, 0.9)' : 'rgba(74, 68, 63, 0.85)',
          fontSize: isMobileScale ? '10px' : '11px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          letterSpacing: isMobileScale ? '0.1em' : '0.1em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {name}
      </span>
    </div>
  )
}

export default function Hero({ isMenuOpen }) {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const rotateTween = useRef(null);
  const { radius, notchW, isMobile, pillScale, titleScale } = useResponsive();

  // Optimized pill count for mobile performance
  const displayServices = isMobile ? SERVICES.slice(0, 10) : SERVICES;

  useEffect(() => {
    rotateTween.current = gsap.to(carouselRef.current, {
      rotate: 360,
      duration: DURATION,
      ease: "none",
      repeat: -1,
      force3D: true,
    });

    return () => {
      if (rotateTween.current) rotateTween.current.kill();
    }
  }, []);

  useEffect(() => {
    if (rotateTween.current) {
      if (isInView && !isMenuOpen) rotateTween.current.play();
      else rotateTween.current.pause();
    }
  }, [isInView, isMenuOpen]);



  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-start px-6 lg:px-16 pt-24 md:pt-32 pb-0"
      style={{ backgroundColor: '#f7f0e5', contain: 'paint layout' }}
    >
      <div className="relative w-full" style={{ 
        height: isMobile ? '72vh' : '78vh', 
        minHeight: isMobile ? '500px' : '620px', 
      }}>

        {/* OMBRA E FORMA DELLA HERO */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="w-full h-full bg-stone-100"
            style={{
              borderRadius: isMobile ? '32px' : '44px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
              WebkitMaskImage: `radial-gradient(circle at 50% 100%, transparent ${notchW / 2 + 4}px, black ${notchW / 2 + 4.5}px)`,
              maskImage: `radial-gradient(circle at 50% 100%, transparent ${notchW / 2 + 4}px, black ${notchW / 2 + 4.5}px)`,
            }}
          />
        </div>

        {/* CONTENUTO HERO */}
        <div
          className="relative w-full h-full overflow-hidden gpu-layer"
          style={{
            zIndex: 10,
            borderRadius: isMobile ? '32px' : '44px',
            transform: 'translateZ(0)',
            WebkitMaskImage: `radial-gradient(circle at 50% 100%, transparent ${notchW / 2 + 4}px, black ${notchW / 2 + 4.5}px)`,
            maskImage: `radial-gradient(circle at 50% 100%, transparent ${notchW / 2 + 4}px, black ${notchW / 2 + 4.5}px)`,
          }}
        >
          <img
            src="/hero-sinfonia.png"
            alt="Sinfonia Estetica"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />

          <div
            className={`absolute inset-x-0 flex flex-col items-center text-center px-6 z-30 ${isMobile ? 'top-[14%]' : 'top-[10%]'}`}
            style={{ pointerEvents: 'none', willChange: 'transform, opacity' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-black font-medium tracking-tight leading-[1.1] gpu-layer"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: `clamp(2.5rem, ${8.5 * titleScale}vw, ${8 * titleScale}rem)`,
                textShadow: '0 4px 30px rgba(255,255,255,0.8)',
                maxWidth: isMobile ? '350px' : 'none',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                lineHeight: isMobile ? 1.05 : 1.1,
                letterSpacing: isMobile ? '-0.02em' : '-0.02em'
              }}
            >
              L'Armonia della tua Bellezza
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`text-black/90 max-w-xl font-medium gpu-layer ${isMobile ? 'mt-8' : 'mt-5'}`}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: isMobile ? '0.75rem' : 'clamp(0.85rem, 2vw, 1.15rem)',
                letterSpacing: '0.03em',
                textShadow: '0 0 20px rgba(255,255,255,0.6)',
              }}
            >
              Trattamenti viso e corpo personalizzati <br className="hidden md:block" />
              rimodellamento, anti-age e skin care specialist
            </motion.p>
          </div>

          <div
            ref={carouselRef}
            className="absolute"
            style={{
              bottom: 0,
              left: '50%',
              width: 0,
              height: 0,
              transformOrigin: '0 0',
              zIndex: 20,
              willChange: 'transform',
              transform: 'translateZ(0)',
              contain: 'none' // Ensure children aren't clipped
            }}
          >
            {displayServices.map((item, i) => {
              const angleDeg = (i / displayServices.length) * 360
              const angleRad = (angleDeg * Math.PI) / 180
              const dx = Math.sin(angleRad) * radius
              const dy = -Math.cos(angleRad) * radius

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${dx}px`,
                    bottom: `${-dy}px`,
                    transform: `translateX(-50%) translateY(50%) rotate(${angleDeg}deg)`,
                    transformOrigin: 'center center',
                    pointerEvents: 'none',
                  }}
                >
                  <ServicePill name={item.name} img={item.img} scale={isMobile ? 0.7 : 1} />
                </div>
              )
            })}
          </div>
        </div>

        {/* NOTCH BASE OVERLAY (For background consistency) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: `${notchW}px`,
            height: `${notchW / 2}px`,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        <div
          className="absolute z-50 flex flex-col items-center justify-center pt-2 pb-0"
          style={{
            width: `${notchW}px`,
            bottom: isMobile ? '8px' : '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <Logo className="scale-[0.7] md:scale-[0.85] pointer-events-auto" />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: isMobile ? '8px' : '10px',
              fontWeight: 700,
              letterSpacing: isMobile ? '0.15em' : '0.2em',
              textTransform: 'uppercase',
              color: '#222',
              textAlign: 'center',
              pointerEvents: 'auto',
              marginTop: isMobile ? '4px' : '6px',
              lineHeight: '1.4',
              maxWidth: isMobile ? '120px' : '180px'
            }}
          >
            Esplora i nostri servizi
          </span>
        </div>
      </div>
    </section>
  )
}
