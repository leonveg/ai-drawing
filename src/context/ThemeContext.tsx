import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const themes = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8f9fa',
    '--text-primary': '#1a202c',
    '--text-secondary': '#4a5568',
    '--border-color': '#e2e8f0',
    '--card-bg': '#ffffff',
    '--accent-bg':
      'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
    '--accent-text': 'linear-gradient(135deg, #6366f1, #a855f7)',
    '--accent-border': 'rgba(139, 92, 246, 0.2)',
    '--accent-primary': '#f59e0b',
    '--accent-secondary': '#d97706',
    '--accent-shadow': '245, 158, 11',
    '--orange-primary': '#FF6B00', // 明亮的橙色
    '--orange-secondary': '#FF8534', // 较浅的橙色
    '--orange-shadow': '255, 107, 0', // RGB values for orange-primary
  },
  dark: {
    '--bg-primary': '#1a202c',
    '--bg-secondary': '#2d3748',
    '--text-primary': '#f7fafc',
    '--text-secondary': '#cbd5e0',
    '--border-color': '#4a5568',
    '--card-bg': '#2d3748',
    '--accent-bg':
      'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
    '--accent-text': 'linear-gradient(135deg, #818cf8, #c084fc)',
    '--accent-border': 'rgba(139, 92, 246, 0.3)',
    '--accent-primary': '#f59e0b',
    '--accent-secondary': '#fbbf24',
    '--accent-shadow': '245, 158, 11',
    '--orange-primary': '#FF6B00', // 保持相同的橙色
    '--orange-secondary': '#FF8534', // 较浅的橙色
    '--orange-shadow': '255, 107, 0', // RGB values for orange-primary
  },
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};