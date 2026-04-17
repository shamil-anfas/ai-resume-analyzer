import React from 'react';
import { Sun, Moon, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <div className="bg-primary p-2 rounded-lg text-primary-foreground">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Resume Optimizer</h1>
          <p className="text-xs text-muted-foreground">AI-powered ATS analysis</p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors border"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
