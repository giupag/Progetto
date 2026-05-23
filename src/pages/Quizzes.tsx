import { useState } from 'react';
import { quizzes } from '../data';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function Quizzes() {
  const { activeSubjectId } = useAppContext();
  
  const filteredQuizzes = activeSubjectId 
    ? quizzes.filter(q => q.subjectId === activeSubjectId)
    : [];

  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setIsActive(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === filteredQuizzes[currentIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuizzes.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setIsActive(false);
    }
  };

  if (!isActive && score > 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 max-w-lg mx-auto text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">Esercitazione Completata</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Hai totalizzato <strong>{score}</strong> su <strong>{filteredQuizzes.length}</strong> risposte corrette.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl text-sm italic">
          Nota: I risultati non vengono salvati. Questo strumento è solo dimostrativo.
        </div>
        <button 
          onClick={startQuiz}
          className="mt-4 flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <RotateCcw size={18} /> Riprova Esercitazione
        </button>
      </div>
    );
  }

  if (filteredQuizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Nessun Quiz</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Non sono presenti quiz per questa materia.
        </p>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="space-y-8 max-w-2xl mx-auto text-center py-10">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <HelpCircle size={40} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Quiz Dimostrativi</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Mettiti alla prova con alcune domande a risposta multipla.
          Non è necessaria alcuna registrazione e i dati non verranno memorizzati.
        </p>
        <button 
          onClick={startQuiz}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Inizia Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = filteredQuizzes[currentIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      
      {/* Progress */}
      <div className="flex items-center justify-between text-sm font-medium text-gray-500 mb-2">
        <span>Domanda {currentIndex + 1} di {filteredQuizzes.length}</span>
        <span>Punteggio: {score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / filteredQuizzes.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-sm"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-8 leading-snug text-gray-900 dark:text-gray-100">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              
              let buttonStyle = "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20";
              let icon = null;

              if (isAnswered) {
                if (index === currentQuestion.correctIndex) {
                  // Correct answer
                  buttonStyle = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 z-10";
                  icon = <CheckCircle2 className="text-green-500" size={20} />;
                } else if (index === selectedOption) {
                  // Wrong selected answer
                  buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 z-10";
                  icon = <XCircle className="text-red-500" size={20} />;
                } else {
                  // Other ignored options
                  buttonStyle = "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between font-medium ${buttonStyle}`}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
                isAnswered 
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentIndex === filteredQuizzes.length - 1 ? 'Termina Quiz' : 'Prossima Domanda'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
