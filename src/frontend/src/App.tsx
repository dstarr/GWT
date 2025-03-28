import Feature from "./components/Feature";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const AppContent = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <ThemeToggle />
        </div>
        <Feature />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 