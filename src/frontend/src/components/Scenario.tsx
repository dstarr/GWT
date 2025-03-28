import React from "react";
import Step from "./Step";
import { useTheme } from "../context/ThemeContext";

interface ScenarioProps {
  index: number;
  onRemove: (index: number) => void;
  isRemovable?: boolean;
}

const Scenario: React.FC<ScenarioProps> = ({ 
  index, 
  onRemove,
  isRemovable = true 
}) => {
  const { darkMode } = useTheme();

  return (
    <div className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg p-4 transition-colors duration-200`}>
      <div className="flex flex-row justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Scenario {index + 1}</h3>
        {isRemovable && (
          <button
            onClick={() => onRemove(index)}
            className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
            title="Remove scenario"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      <Step type="Given" />
      <Step type="When" />
      <Step type="Then" />
    </div>
  );
};

export default Scenario; 