import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "Quali sono i vantaggi dell'estetica avanzata?",
    answer: "L'estetica avanzata utilizza tecnologie all'avanguardia per agire in profondità sugli inestetismi. Offre risultati più rapidi e duraturi rispetto all'estetica tradizionale, specialmente in ambiti come il rimodellamento corpo e l'anti-age."
  },
  {
    question: "Cosa si intende per trattamenti personalizzati?",
    answer: "Ogni percorso inizia con una consulenza approfondita. Analizziamo le caratteristiche uniche della tua pelle e del tuo corpo per creare un protocollo di trattamenti specifico che risponda ai tuoi obiettivi reali."
  },
  {
    question: "Quali sono i benefici dei trattamenti anti-age?",
    answer: "I nostri programmi anti-age mirano a stimolare la rigenerazione cellulare e la produzione di collagene. Il risultato è una pelle più compatta, luminosa e visibilmente ringiovanita, nel pieno rispetto dei lineamenti naturali."
  },
  {
    question: "Offrite anche servizi di estetica base?",
    answer: "Certamente. Crediamo che il benessere parta dalle piccole cure quotidiane. Offriamo manicure, pedicure curativa ed estetica, epilazione e trattamenti viso skin care, sempre eseguiti con standard di eccellenza."
  },
  {
    question: "Cosa comprende la vostra consulenza Skin Care?",
    answer: "La consulenza comprende un'analisi dettagliata dello stato della pelle e la prescrizione di una routine quotidiana professionale. Questo garantisce che i risultati ottenuti in cabina vengano mantenuti e potenziati anche a casa."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  // JSON-LD Schema for SEO & AI (ChatGPT/SearchGPT/Perplexity)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="w-full pt-14 pb-20 md:pt-24 md:pb-48 lg:pt-32 lg:pb-56 px-6 lg:px-16" style={{ backgroundColor: '#f7f0e5' }}>
      {/* Schema Markup Injection */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 px-6 py-2 rounded-full mb-8 shadow-sm"
            style={{ backgroundColor: '#fcf7f2', border: '1px solid rgba(138, 120, 93, 0.1)' }}
          >
            <HelpCircle size={14} className="text-[#8a785d]" />
            <span className="text-[11px] md:text-xs font-bold tracking-[0.1em] text-[#8a785d] uppercase">
              Supporto & Informazioni
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-black font-medium mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            Domande frequenti
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-stone-500 text-lg max-w-2xl"
          >
            Tutto quello che c'è da sapere sui nostri trattamenti per la tua bellezza e sicurezza.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-[1.5rem] border border-stone-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-6 text-left cursor-pointer group"
                >
                  <span className="text-black font-medium text-base md:text-xl group-hover:text-[#8a785d] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#8a785d]' : ''}`}>
                    <ChevronDown size={20} className={isOpen ? 'text-white' : 'text-[#8a785d]'} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-stone-600 leading-relaxed text-sm md:text-lg max-w-[95%] md:max-w-[90%]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
