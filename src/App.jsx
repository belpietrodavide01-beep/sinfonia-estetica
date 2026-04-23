import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IntroductionSection from './components/IntroductionSection'
import TreatmentsSection from './components/TreatmentsSection'
import AboutSection from './components/AboutSection'
import BentoGridSection from './components/BentoGridSection'
import MedicalSection from './components/MedicalSection'
import TestimonialSection from './components/TestimonialSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

gsap.registerPlugin(ScrollTrigger)

// Global GSAP Configuration for Performance
gsap.config({
  force3D: true,
  nullTargetWarn: false,
})

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Più "morbido" per nascondere piccoli drop di frame
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 2.0,
      lerp: 0.15, // Più reattivo
      prevent: (node) => node.nodeName === 'IFRAME', 
    })

    // Sincronizzazione atomica con GSAP
    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(500, 33)

    // Ottimizzazione ScrollTrigger global
    ScrollTrigger.defaults({
      markers: false,
      fastScrollEnd: true,
      onRefreshInit: () => {
        // Forza l'hardware acceleration su elementi critici prima del refresh
        gsap.set(".gpu-layer", { translateZ: 0 });
      }
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden w-full" style={{ backgroundColor: '#f7f0e5' }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Hero isMenuOpen={menuOpen} />
      <IntroductionSection />

      <TreatmentsSection />
      <AboutSection />
      <BentoGridSection />
      <MedicalSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
