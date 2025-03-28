import React, { useEffect, useState } from "react";
import Step from "./Step";
import { useTheme } from "../context/ThemeContext";

interface ScenarioProps {
  index: number;
  onRemove: (index: number) => void;
  isRemovable?: boolean;
  onStatusChange?: (isComplete: boolean) => void;
}

interface StepData {
  text: string;
  additionalSteps: string[];
}

const Scenario: React.FC<ScenarioProps> = ({ 
  index, 
  onRemove,
  isRemovable = true,
  onStatusChange
}) => {
  const { darkMode } = useTheme();
  const [steps, setSteps] = useState<{[key: string]: StepData}>({
    Given: { text: "", additionalSteps: [] },
    When: { text: "", additionalSteps: [] },
    Then: { text: "", additionalSteps: [] }
  });

  // Check if all required fields are filled
  useEffect(() => {
    const isComplete = 
      steps.Given.text.trim() !== "" && 
      steps.When.text.trim() !== "" && 
      steps.Then.text.trim() !== "";
    
    if (onStatusChange) {
      onStatusChange(isComplete);
    }
  }, [steps, onStatusChange]);

  // Update step data when inputs change
  const handleStepChange = (type: string, text: string) => {
    setSteps(prev => ({
      ...prev,
      [type]: { ...prev[type], text }
    }));
  };

  // Update additional steps
  const handleAdditionalStepsChange = (type: string, additionalSteps: string[]) => {
    setSteps(prev => ({
      ...prev,
      [type]: { ...prev[type], additionalSteps }
    }));
  };

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
      <Step 
        type="Given" 
        onChange={(text) => handleStepChange("Given", text)}
        onAdditionalStepsChange={(steps) => handleAdditionalStepsChange("Given", steps)}
      />
      <Step 
        type="When" 
        onChange={(text) => handleStepChange("When", text)}
        onAdditionalStepsChange={(steps) => handleAdditionalStepsChange("When", steps)}
      />
      <Step 
        type="Then" 
        onChange={(text) => handleStepChange("Then", text)}
        onAdditionalStepsChange={(steps) => handleAdditionalStepsChange("Then", steps)}
      />
    </div>
  );
};

export default Scenario; 