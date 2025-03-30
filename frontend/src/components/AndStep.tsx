import React from "react";
import { useTheme } from "../context/ThemeContext";

interface AndStepProps {
  value: string;
  index: number;
  canAddMore: boolean;
  onChange: (index: number, value: string) => void;
  onAdd: (index: number) => void;
  onRemove: (index: number) => void;
}

const AndStep: React.FC<AndStepProps> = ({
  value,
  index,
  canAddMore,
  onChange,
  onAdd,
  onRemove,
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-row gap-2 items-center ml-4">
      <span className={`step-type ${darkMode ? 'text-green-400' : 'text-gray-600'}`}>And: </span>
      <div className="flex-grow">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder="Enter additional step text here..."
          maxLength={400}
          className={`border ${darkMode ? 'border-gray-600 bg-gray-700 focus:border-blue-400 placeholder-gray-400' : 'border-gray-300 bg-white focus:border-gray-500'} rounded px-2 py-1 w-full transition-colors duration-200`}
        />
      </div>
      <div className="flex items-center">
        {canAddMore && (
          <button
            onClick={() => onAdd(index)}
            className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} ml-2 transition-colors duration-200`}
            title="Add And clause below"
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        )}

        <button
          onClick={() => onRemove(index)}
          className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} ml-2 transition-colors duration-200`}
          title="Remove And clause"
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
      </div>
    </div>
  );
};

export default AndStep; 