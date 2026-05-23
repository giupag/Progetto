import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Presentation, 
  BookA, 
  HelpCircle, 
  Puzzle, 
  Settings, 
  Home,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MENU_ITEMS = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/tutorial', label: 'Tutorial PDF', icon: FileText },
  { path: '/slides', label: 'Slides', icon: Presentation },
  { path: '/glossario', label: 'Glossario', icon: BookA },
  { path: '/quiz', label: 'Quiz', icon: HelpCircle },
  { path: '/strumenti', label: 'Strumenti Didattici', icon: Puzzle },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { activeSubjectId } = useAppContext();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-lg leading-tight">Centro Studi<br />Agorà</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Spazio Didattico</p>
            </div>
            <button 
              className="lg:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                               (item.path !== '/' && location.pathname.startsWith(item.path));
              
              const isDashboard = item.path === '/';
              const isDisabled = !activeSubjectId && !isDashboard;

              return (
                <Link
                  key={item.path}
                  to={isDisabled ? '#' : item.path}
                  onClick={(e) => {
                    if (isDisabled) {
                      e.preventDefault();
                      return;
                    }
                    handleLinkClick();
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isDisabled
                      ? 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500'
                      : isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/impostazioni"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === '/impostazioni'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Settings size={18} />
              <span>Impostazioni</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button 
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="font-semibold text-lg">Centro Studi Agorà</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
