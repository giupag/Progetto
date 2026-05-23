import { useState, useEffect, useMemo } from 'react';
import { Puzzle, ArrowRightLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

// Simple matching games for subjects
const TOOL_GAMES = {
  'inglese-turistico': {
    title: "Vocaboli Turistici",
    description: "Collega le parole in inglese con la traduzione corretta",
    pairs: [
      { id: 1, left: "Check-in", right: "Registrazione" },
      { id: 2, left: "Booking", right: "Prenotazione" },
      { id: 3, left: "Luggage", right: "Bagagli" },
      { id: 4, left: "Tip", right: "Mancia" }
    ]
  },
  'reti-informatiche': {
    title: "Informatica di Base",
    description: "Collega i termini (sinistra) con la definizione corretta (destra)",
    pairs: [
      { id: 1, left: "CPU", right: "Processore Centrale" },
      { id: 2, left: "RAM", right: "Memoria Volatile" },
      { id: 3, left: "Router", right: "Instradatore" },
      { id: 4, left: "IP", right: "Indirizzo Logico" }
    ]
  },
  'igiene': {
    title: "Sicurezza in Cucina",
    description: "Collega i termini normativi (sinistra) con il loro significato (destra)",
    pairs: [
      { id: 1, left: "HACCP", right: "Autocontrollo alimentare" },
      { id: 2, left: "DPI", right: "Dispositivi Protezione" },
      { id: 3, left: "Batterio", right: "Microrganismo" },
      { id: 4, left: "Contaminazione", right: "Trasmissione agenti" }
    ]
  }
};

export default function Tools() {
  const { activeSubjectId } = useAppContext();
  
  const toolData = useMemo(() => {
    return activeSubjectId ? TOOL_GAMES[activeSubjectId as keyof typeof TOOL_GAMES] : null;
  }, [activeSubjectId]);

  const [leftItems, setLeftItems] = useState<{id: number, text: string}[]>([]);
  const [rightItems, setRightItems] = useState<{id: number, text: string}[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);

  useEffect(() => {
    if (!toolData) return;
    
    // Shuffle logic
    const lefts = toolData.pairs.map(m => ({ id: m.id, text: m.left })).sort(() => Math.random() - 0.5);
    const rights = toolData.pairs.map(m => ({ id: m.id, text: m.right })).sort(() => Math.random() - 0.5);
    setLeftItems(lefts);
    setRightItems(rights);
    setMatches([]);
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [toolData]);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      if (selectedLeft === selectedRight) {
        // Match!
        setMatches(prev => [...prev, selectedLeft]);
      }
      // Reset selections after a short delay
      const timer = setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedLeft, selectedRight]);

  const resetGame = () => {
    if (!toolData) return;
    setMatches([]);
    const lefts = toolData.pairs.map(m => ({ id: m.id, text: m.left })).sort(() => Math.random() - 0.5);
    const rights = toolData.pairs.map(m => ({ id: m.id, text: m.right })).sort(() => Math.random() - 0.5);
    setLeftItems(lefts);
    setRightItems(rights);
  };

  if (!toolData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Nessuno Strumento</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Non sono presenti strumenti didattici per questa materia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Strumenti Didattici</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Piccoli strumenti interattivi per memorizzare concetti: <strong>Gioco degli Abbinamenti</strong>.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center">
              <Puzzle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{toolData.title}</h2>
              <p className="text-sm text-gray-500">{toolData.description}</p>
            </div>
          </div>
          
          <button 
            onClick={resetGame}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors border border-blue-100 dark:border-blue-900/30"
          >
            Ricomincia
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
          {/* Middle icon visual separator on desktop */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-700 text-gray-300">
              <ArrowRightLeft size={16} />
            </div>
          </div>

          <div className="space-y-3">
            {leftItems.map((item) => {
              const isMatched = matches.includes(item.id);
              const isSelected = selectedLeft === item.id;
              
              let style = "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300";
              if (isMatched) style = "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 opacity-50 cursor-default";
              else if (isSelected) style = "bg-blue-50 dark:bg-blue-900/20 border-blue-400 ring-2 ring-blue-500/20 text-blue-700";

              return (
                <motion.button
                  key={`l-${item.id}`}
                  onClick={() => !isMatched && setSelectedLeft(item.id)}
                  whileHover={!isMatched ? { scale: 1.02 } : {}}
                  whileTap={!isMatched ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium shadow-sm ${style}`}
                >
                  {item.text}
                </motion.button>
              );
            })}
          </div>

          <div className="space-y-3">
            {rightItems.map((item) => {
              const isMatched = matches.includes(item.id);
              const isSelected = selectedRight === item.id;
              
              let style = "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300";
              if (isMatched) style = "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 opacity-50 cursor-default";
              else if (isSelected) style = "bg-purple-50 dark:bg-purple-900/20 border-purple-400 ring-2 ring-purple-500/20 text-purple-700";

              return (
                <motion.button
                  key={`r-${item.id}`}
                  onClick={() => !isMatched && setSelectedRight(item.id)}
                  whileHover={!isMatched ? { scale: 1.02 } : {}}
                  whileTap={!isMatched ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium shadow-sm ${style}`}
                >
                  {item.text}
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {matches.length === toolData.pairs.length && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-xl text-green-700 dark:text-green-300 text-center font-medium"
          >
            Bravissimo! Hai completato tutti gli abbinamenti.
          </motion.div>
        )}
      </div>
    </div>
  );
}
