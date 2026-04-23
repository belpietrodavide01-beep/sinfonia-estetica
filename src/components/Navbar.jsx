import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import SplitText from './react-bits/SplitText'
import Logo from './Logo'

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize() 
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleLinkClick = (id) => {
    setMenuOpen(false)
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Servizi', href: '#servizi' },
    { label: 'Contatti', href: '#contatti' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute top-0 left-0 w-full z-50 transition-all duration-300 ${menuOpen ? 'bg-[#f7f0e5]/95 backdrop-blur-md border-b border-stone-200/50 shadow-sm' : 'bg-transparent'} py-2`}
      >
        <nav className="w-full px-6 md:px-6 lg:px-16 h-20 flex items-center justify-between md:grid md:grid-cols-3">

          {/* ── Logo Container ── */}
          <div className="flex justify-start">
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleLinkClick('#home') }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0"
            >
              <Logo className="scale-[0.8] md:scale-100 origin-left" />
            </motion.a>
          </div>

          {/* ── Links Desktop (Perfectly Centered via Grid) ── */}
          <ul className="hidden md:flex items-center justify-center gap-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className="text-[13px] font-medium tracking-wide text-stone-700 hover:text-[#8a785d] transition-colors duration-200 py-1"
                >
                  <SplitText text={link.label} />
                </button>
              </li>
            ))}
          </ul>

          {/* ── Right Section (CTA & Hamburger) ── */}
          <div className="flex justify-end items-center gap-2">
            <motion.a
              href="https://wa.me/393759187695"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex group items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full bg-[#8a785d] border border-[#8a785d] hover:bg-[#75654d] transition-colors duration-300 shadow-md decoration-0"
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white shadow-sm transition-colors duration-300">
                <ArrowUpRight size={14} strokeWidth={2.5} color="#8a785d" />
              </span>
              <span className="text-[13px] font-semibold tracking-wide text-white transition-colors duration-300">
                Prenota Ora
              </span>
            </motion.a>

            <button
              className="md:hidden flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#8a785d] text-white hover:bg-[#75654d] transition-colors flex-shrink-0 shadow-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Apri menu"
            >
              {menuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed top-20 left-0 right-0 z-40 border-b border-stone-100/80 shadow-sm md:hidden"
            style={{ background: 'rgba(247, 240, 229, 0.98)', backdropFilter: 'blur(10px)' }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full text-left px-4 py-3 rounded-xl text-[13px] font-medium text-stone-700 hover:bg-stone-100/70 transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
