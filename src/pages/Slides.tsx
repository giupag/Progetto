import { useState } from 'react';
import { slides } from '../data';
import { Presentation, ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function Slides() {
  const [activePresentation, setActivePresentation] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { activeSubjectId } = useAppContext();

  const presentation = slides.find(s => s.id === activePresentation);
  
  const filteredSlides = activeSubjectId 
    ? slides.filter(t => t.subjectId === activeSubjectId)
    : [];

  const handleNext = () => {
    if (presentation && currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const openPresentation = (id: string) => {
    setActivePresentation(id);
    setCurrentSlideIndex(0);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Slides Didattiche</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Presentazioni riassuntive e materiale visivo da scorrere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSlides.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => openPresentation(item.id)}
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center p-6 text-center">
                <Presentation size={48} className="text-gray-300 dark:text-gray-600 absolute" />
                <h3 className="relative z-10 font-semibold text-lg max-w-[80%] line-clamp-2">
                  {item.title}
                </h3>
              </div>
              <div className="p-4 flex items-center justify-between bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.slides.length} Slides
                </span>
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                  Avvia
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredSlides.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            Nessuna presentazione disponibile per questa materia.
          </div>
        )}
      </div>

      {/* Presentation Viewer Modal */}
      <AnimatePresence>
        {activePresentation && presentation && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md">
            
            {/* Header Toolbar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-white z-10 bg-gradient-to-b from-black/50 to-transparent">
              <h2 className="font-medium px-2">{presentation.title}</h2>
              <button 
                onClick={() => setActivePresentation(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Chiudi"
              >
                <X size={24} />
              </button>
            </div>

            {/* Slide Content Area */}
            <div className="relative w-full max-w-5xl aspect-video mx-4 flex items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 flex items-center justify-center p-12 lg:p-20 text-center ${presentation.slides[currentSlideIndex].image}`}
                  >
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
                      {presentation.slides[currentSlideIndex].text}
                    </h2>
                  </motion.div>
                </AnimatePresence>

            </div>

            {/* Navigation Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center gap-4 z-10">
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={handlePrev}
                  disabled={currentSlideIndex === 0}
                  className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <span className="text-white/80 font-mono text-sm tracking-widest">
                  {currentSlideIndex + 1} / {presentation.slides.length}
                </span>

                <button 
                  onClick={handleNext}
                  disabled={currentSlideIndex === presentation.slides.length - 1}
                  className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
