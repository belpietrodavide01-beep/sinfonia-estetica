import React from 'react';
import { Plus, Sun, Sparkles, Droplets, Feather, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const treatments = [
  {
    title: "Estetica Avanzata & Benessere",
    description: "Percorsi innovativi studiati per il tuo riequilibrio psicofisico e risultati visibili fin dalla prima seduta.",
    icon: <Sun size={32} strokeWidth={1.5} className="text-[#8a785d]" />
  },
  {
    title: "Rimodellamento & Anti-age",
    description: "Trattamenti personalizzati per scolpire il corpo e contrastare i segni del tempo con tecnologie di altissima precisione.",
    icon: <Feather size={32} strokeWidth={1.5} className="text-[#8a785d]" />
  },
  {
    title: "Skin Care Specialist",
    description: "Programmi specifici per ogni esigenza cutanea, dalla pulizia profonda ai trattamenti idratanti e liftanti avanzati.",
    icon: <Sparkles size={32} strokeWidth={1.5} className="text-[#8a785d]" />
  },
  {
    title: "Estetica di Base & Cura",
    description: "L'essenziale per la tua bellezza quotidiana: manicure, pedicure, epilazione e molto altro, eseguiti con cura artigianale.",
    icon: <Droplets size={32} strokeWidth={1.5} className="text-[#8a785d]" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
};

export default function TreatmentsSection() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="servizi" className="w-full pt-20 pb-20 md:pb-48 lg:pb-56 px-6 lg:px-16" style={{ backgroundColor: '#f7f0e5' }}>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Badge Top */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 px-4 py-1.5 md:px-6 md:py-2 rounded-full mb-12 shadow-sm"
          style={{ backgroundColor: '#fcf7f2', border: '1px solid rgba(138, 120, 93, 0.15)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8a785d]" />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.1em] text-[#8a785d] uppercase">
            I nostri trattamenti
          </span>
        </motion.div>

        {/* Cards container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full flex flex-col gap-6"
        >
          {treatments.map((t, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              style={{ willChange: 'transform, opacity' }}
              className="w-full border border-stone-200/80 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16 hover:border-[#8a785d]/30 hover:bg-[#fcf7f2] hover:shadow-sm transition-all duration-300 bg-[#fdfbf9]"
            >
              
              {/* Left Side: Icon + Title */}
              <div className="flex items-center gap-6 md:w-1/2">
                <div className={`${isMobile ? 'scale-90' : 'scale-100'} transition-transform duration-300`}>
                  {t.icon}
                </div>
                <h3 
                  className="text-black font-medium"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: isMobile ? '1.85rem' : 'clamp(1.8rem, 4vw, 2.8rem)',
                    lineHeight: isMobile ? 1.1 : 1.2,
                    letterSpacing: isMobile ? '-0.02em' : 'normal'
                  }}
                >
                  {t.title}
                </h3>
              </div>

              {/* Right Side: Desc + Action buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:w-1/2">
                <div className="flex flex-col gap-4 max-w-sm">
                  <p className={`text-black/80 lg:text-[15px] leading-relaxed ${isMobile ? 'text-[15px] leading-[1.6]' : 'text-sm'}`}>
                    {t.description}
                  </p>
                  <div>
                    <a 
                      href="https://wa.me/393759187695"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full bg-[#8a785d] border border-[#8a785d] hover:bg-[#75654d] transition-colors duration-300 w-fit shadow-md decoration-0"
                    >
                      <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm duration-300">
                        <ArrowUpRight size={14} strokeWidth={2.5} color="#8a785d" />
                      </span>
                      <span className="text-[12px] font-bold tracking-wide text-white transition-colors duration-300 uppercase">
                        Scopri i dettagli
                      </span>
                    </a>
                  </div>
                </div>

                {/* Plus Button */}
                <button 
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-stone-200 bg-white hover:bg-[#fcf7f2] hover:border-[#8a785d]/40 transition-colors shadow-sm ml-auto md:ml-0 flex-shrink-0"
                  aria-label="Espandi trattamento"
                >
                  <Plus size={20} className="text-[#8a785d]" />
                </button>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
