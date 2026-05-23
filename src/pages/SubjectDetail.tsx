import { useParams, Link, useNavigate } from 'react-router-dom';
import { subjects, tutorials, slides as allSlides } from '../data';
import { ArrowLeft, BookOpen, FileText, Presentation, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);
  const { setActiveSubjectId } = useAppContext();

  const subject = subjects.find(s => s.id === id);

  useEffect(() => {
    if (subject) {
      setActiveSubjectId(subject.id);
    }
  }, [subject, setActiveSubjectId]);

  if (!subject) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Materia non trovata</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
          Torna alla dashboard
        </button>
      </div>
    );
  }

  const subjectTutorials = tutorials.filter(t => t.subjectId === id);
  const subjectSlides = allSlides.filter(s => s.subjectId === id);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-4 focus:outline-none"
        >
          <ArrowLeft size={16} /> Torna alla dashboard
        </button>
        <div className="flex items-start gap-4 mb-2">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${subject.color}`}>
            <BookOpen size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{subject.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              {subject.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Main Content (Topics) */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Argomenti del corso
            </h2>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              {subject.topics.map((topic, index) => {
                const isExpanded = expandedTopic === index;
                return (
                  <div 
                    key={index} 
                    className="border-b border-gray-100 dark:border-gray-800/50 last:border-0"
                  >
                    <button
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      onClick={() => setExpandedTopic(isExpanded ? null : index)}
                    >
                      <span className="font-medium">{index + 1}. {topic.title}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-transparent">
                            {topic.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar Data (Objectives & Resources) */}
        <div className="space-y-6 lg:self-start">
          
          <section className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 text-blue-900 dark:text-blue-100">Obiettivi Didattici</h3>
            <ul className="space-y-3">
              {subject.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-blue-800 dark:text-blue-200/80">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              Risorse Rapide
            </h3>
            
            <div className="space-y-3">
              {subjectTutorials.map(tut => (
                <Link 
                  key={tut.id} 
                  to="/tutorial"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">{tut.title}</p>
                    <p className="text-xs text-gray-500">PDF • {tut.size}</p>
                  </div>
                </Link>
              ))}

              {subjectSlides.map(slide => (
                <Link 
                  key={slide.id} 
                  to="/slides"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <Presentation size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">{slide.title}</p>
                    <p className="text-xs text-gray-500">Presentazione</p>
                  </div>
                </Link>
              ))}

              {subjectTutorials.length === 0 && subjectSlides.length === 0 && (
                <p className="text-sm text-gray-500 italic">Nessuna risorsa aggiuntiva.</p>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
