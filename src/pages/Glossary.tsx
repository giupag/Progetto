import { useState, useMemo } from 'react';
import { glossary } from '../data';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const { activeSubjectId } = useAppContext();

  // Group and sort glossary terms
  const groupedTerms = useMemo(() => {
    let sourceTerms = glossary;
    if (activeSubjectId) {
      sourceTerms = glossary.filter(g => g.subjectId === activeSubjectId);
    }

    const filtered = sourceTerms.filter(g => 
      g.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groups: Record<string, typeof glossary> = {};
    
    filtered.forEach(item => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });

    // Sort letters
    return Object.keys(groups).sort().map(letter => ({
      letter,
      items: groups[letter].sort((a, b) => a.term.localeCompare(b.term))
    }));
  }, [searchTerm]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="text-center md:text-left md:flex md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Glossario</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Definizioni e concetti chiave a portata di mano.
          </p>
        </div>
        
        <div className="relative mt-6 md:mt-0 w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
            placeholder="Cerca un termine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {groupedTerms.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Nessun risultato trovato per "{searchTerm}".
        </div>
      ) : (
        <div className="space-y-8">
          {groupedTerms.map((group, groupIndex) => (
            <motion.div 
              key={group.letter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.05 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold font-serif text-blue-600 dark:text-blue-400 w-8">
                  {group.letter}
                </h2>
                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
              </div>
              
              <div className="grid gap-3 pl-0 md:pl-12">
                {group.items.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-sm"
                  >
                    <h3 className="font-semibold text-lg mb-1">{item.term}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
