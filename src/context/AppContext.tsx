import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  activeSubjectId: string | null;
  setActiveSubjectId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  
  return (
    <AppContext.Provider value={{ activeSubjectId, setActiveSubjectId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
