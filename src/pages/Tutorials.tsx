import { useState } from 'react';
import { tutorials, subjects } from '../data';
import { FileText, Download, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function Tutorials() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const { activeSubjectId } = useAppContext();

  const getSubjectColor = (id: string) => {
    return subjects.find(s => s.id === id)?.color || 'bg-gray-500';
  };
  const getSubjectName = (id: string) => {
    return subjects.find(s => s.id === id)?.title || 'Materia Sconosciuta';
  };

  const filteredTutorials = activeSubjectId 
    ? tutorials.filter(t => t.subjectId === activeSubjectId)
    : [];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Tutorial PDF</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Consulta e scarica il materiale didattico (Documenti dimostrativi).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex flex-col h-full"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-medium line-clamp-2 leading-tight">{tutorial.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${getSubjectColor(tutorial.subjectId)}`} />
                  <span className="text-xs text-gray-500 shrink-0 truncate max-w-[120px]">
                    {getSubjectName(tutorial.subjectId)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/50">
              <span className="text-xs text-gray-500 font-mono">{tutorial.size} • {tutorial.pages} pag</span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedPdf(tutorial.title)}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 rounded-lg transition-colors"
                  title="Visualizza"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => alert('Download simulato')}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 rounded-lg transition-colors"
                  title="Scarica"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredTutorials.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            Nessun tutorial disponibile per questa materia.
          </div>
        )}
      </div>

      {/* PDF Modal Simulator */}
      <AnimatePresence>
        {selectedPdf && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedPdf(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
            >
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-red-500" />
                  <h3 className="font-medium truncate pr-4">{selectedPdf}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-gray-200/50 dark:bg-gray-900/50">
                <div className="w-full max-w-2xl bg-white dark:bg-gray-800 aspect-[1/1.4] shadow-lg flex flex-col items-center justify-center text-center p-10 space-y-4">
                  <FileText size={64} className="text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-500 font-medium">Anteprima PDF Dimostrativa</p>
                  <p className="text-sm text-gray-400">Nella versione reale qui verrà caricato il file PDF tramite un visualizzatore (es. pdf.js o iframe).</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
