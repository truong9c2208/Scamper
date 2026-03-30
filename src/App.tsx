import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Dashboard from './pages/Dashboard';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background-main text-foreground transition-colors duration-200">
      <Dashboard />
    </div>
  );
}

export default App;
