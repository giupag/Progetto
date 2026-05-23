import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Library, Monitor, Languages } from 'lucide-react';
import { subjects } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { SubjectCategory } from '../types';
import { useAppContext } from '../context/AppContext';

const iconMap: Record<string, any> = {
  Library, Monitor, Languages
};

type FilterOption = 'Alfabetico' | SubjectCategory;

export default function Home() {
  const { setActiveSubjectId } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Alfabetico');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Reset the globally selected subject on the dashboard
    setActiveSubjectId(null);
  }, [setActiveSubjectId]);

  const filteredAndSortedSubjects = useMemo(() => {
    let result = subjects;

    // Filter by category
    if (activeFilter !== 'Alfabetico') {
      result = result.filter(s => s.category === activeFilter);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      );
    }

    // Always sort alphabetically by title
    return result.sort((a, b) => a.title.localeCompare(b.title));
  }, [activeFilter, searchQuery]);

  const filterButtons: FilterOption[] = [
    'Alfabetico',
    'Umanistiche e Comunicative',
    'Scientifiche e Informatiche',
    'Tecnico-Professionali'
  ];

  return (
    <div className="space-y-10">
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Esplora il nostro spazio didattico digitale. Consulta i materiali, mettiti alla prova con i quiz
            ed espandi le tue conoscenze in un ambiente semplice e privo di distrazioni.
          </p>
          
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-950 placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all"
              placeholder="Cerca materie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </motion.section>

      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Materie Disponibili</h2>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filterButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => setActiveFilter(btn)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === btn 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedSubjects.map((subject) => {
              const IconComponent = iconMap[subject.icon] || Library;
              
              return (
                <motion.div
                  key={subject.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={`/materie/${subject.id}`}
                    className="block group h-full bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md"
                  >
                    <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center mb-5 ${subject.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {subject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {subject.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredAndSortedSubjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-12 text-center text-gray-500"
            >
              Nessuna materia trovata per questa categoria o ricerca.
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
