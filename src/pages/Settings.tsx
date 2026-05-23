import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Check current theme on mount
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Impostazioni</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personalizza la tua esperienza di visualizzazione sulla piattaforma.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg flex items-center justify-center">
            <SettingsIcon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-medium">Aspetto</h2>
            <p className="text-sm text-gray-500">Seleziona il tema visivo dell'applicazione</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => toggleTheme('light')}
            className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all ${
              theme === 'light' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {theme === 'light' && (
              <CheckCircle2 size={18} className="absolute top-3 right-3 text-blue-500" />
            )}
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
              <Sun size={24} className="text-amber-500" />
            </div>
            <span className="font-medium">Tema Chiaro</span>
          </button>

          <button
            onClick={() => toggleTheme('dark')}
            className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all ${
              theme === 'dark' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-500'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-700 bg-gray-900 text-gray-400'
            }`}
          >
            {theme === 'dark' && (
              <CheckCircle2 size={18} className="absolute top-3 right-3 text-blue-500" />
            )}
            <div className="w-12 h-12 rounded-full bg-gray-800 shadow-sm flex items-center justify-center">
              <Moon size={24} className="text-blue-300" />
            </div>
            <span className="font-medium">Tema Scuro</span>
          </button>
        </div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5 text-amber-800 dark:text-amber-300/80 text-sm flex gap-3">
        <div className="shrink-0 mt-0.5">💡</div>
        <p>
          Essendo uno spazio didattico dimostrativo senza login, le preferenze visive sono applicate solo alla sessione corrente e non verranno salvate permanentemente.
        </p>
      </div>

    </div>
  );
}
