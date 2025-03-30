import React, { useState, useEffect } from "react";
import Scenario from "./Scenario";
import { useTheme } from "../context/ThemeContext";

const MAX_SCENARIOS = 10;

interface RuleProps {
  index: number;
  onRemove: (index: number) => void;
  isRemovable?: boolean;
  onStatusChange?: (isComplete: boolean) => void;
}

// Interface for storing scenario data and validation status
interface ScenarioData {
  id: number;
  isComplete: boolean;
}

const Rule: React.FC<RuleProps> = ({ 
  index, 
  onRemove,
  isRemovable = true,
  onStatusChange
}) => {
  const [ruleName, setRuleName] = useState<string>("");
  const [scenarios, setScenarios] = useState<number[]>([]);
  const [scenariosData, setScenariosData] = useState<ScenarioData[]>([]);
  const { darkMode } = useTheme();

  // Initialize with one scenario when the rule loads
  useEffect(() => {
    if (scenarios.length === 0) {
      setScenarios([0]);
      setScenariosData([{ id: 0, isComplete: false }]);
    }
  }, []);

  // Check if the rule is complete (rule name and at least one complete scenario)
  useEffect(() => {
    // Rule is complete if it has a name and at least one complete scenario
    const hasName = ruleName.trim() !== "";
    const hasCompleteScenario = scenariosData.some(scenario => scenario.isComplete);
    const isComplete = hasName && hasCompleteScenario;

    if (onStatusChange) {
      onStatusChange(isComplete);
    }
  }, [ruleName, scenariosData, onStatusChange]);

  const addScenario = () => {
    if (scenarios.length < MAX_SCENARIOS) {
      const newId = scenarios.length;
      setScenarios([...scenarios, newId]);
      setScenariosData([...scenariosData, { id: newId, isComplete: false }]);
    }
  };

  const removeScenario = (scenarioIndex: number) => {
    // Prevent removing the last scenario
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((_, i) => i !== scenarioIndex));
      setScenariosData(scenariosData.filter((_, i) => i !== scenarioIndex));
    }
  };

  const handleRuleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRuleName(event.target.value);
  };

  // Function to update the completion status of a scenario
  const updateScenarioStatus = (scenarioIndex: number, isComplete: boolean) => {
    setScenariosData(prevData => {
      const newData = [...prevData];
      if (newData[scenarioIndex]) {
        newData[scenarioIndex].isComplete = isComplete;
      }
      return newData;
    });
  };

  // Determine if the "Add Scenario" button should be enabled
  const isAddScenarioEnabled = () => {
    if (scenarios.length === 0) return true;
    // Check if the last scenario is complete
    const lastScenarioIndex = scenarios.length - 1;
    return scenariosData[lastScenarioIndex]?.isComplete === true;
  };

  return (
    <div className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} rounded-lg p-4 mb-4 transition-colors duration-200`}>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex-grow flex items-center">
          <label htmlFor={`ruleName-${index}`} className="font-medium mr-2">Rule:</label>
          <input
            id={`ruleName-${index}`}
            type="text"
            value={ruleName}
            onChange={handleRuleNameChange}
            placeholder="Enter rule description..."
            maxLength={400}
            className={`border ${darkMode ? 'border-gray-600 bg-gray-700 focus:border-blue-400 placeholder-gray-400' : 'border-gray-300 bg-white focus:border-blue-500 placeholder-gray-500'} focus:ring-1 focus:ring-blue-500 rounded px-3 py-2 w-full transition-colors duration-200`}
          />
        </div>
        {isRemovable && (
          <button
            onClick={() => onRemove(index)}
            className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} ml-4 transition-colors duration-200`}
            title="Remove rule"
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
      
      <div className="flex flex-col gap-4 pl-4">
        {scenarios.map((_, scenarioIndex) => (
          <Scenario
            key={scenarioIndex}
            index={scenarioIndex}
            onRemove={removeScenario}
            isRemovable={scenarios.length > 1}
            onStatusChange={(isComplete) => updateScenarioStatus(scenarioIndex, isComplete)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        {scenarios.length > 0 && (
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {scenarios.length} of {MAX_SCENARIOS} scenarios
          </div>
        )}

        {scenarios.length < MAX_SCENARIOS && (
          <div className="ml-auto">
            <button
              onClick={addScenario}
              disabled={!isAddScenarioEnabled()}
              className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} 
              ${!isAddScenarioEnabled() ? 'opacity-50 cursor-not-allowed' : ''} 
              text-white px-4 py-2 rounded flex items-center gap-2 transition-colors duration-200`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              Add Scenario
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rule; 