import React from "react";
import Step from "./Step";

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
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="text-lg font-semibold">Scenario {index + 1}</h3>
        {isRemovable && (
          <button
            onClick={() => onRemove(index)}
            className="text-gray-500 hover:text-gray-700"
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