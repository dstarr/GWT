import React, { useState, useEffect } from "react";
import Scenario from "./Scenario";

const MAX_SCENARIOS = 10;

interface RuleProps {
  index: number;
  onRemove: (index: number) => void;
  isRemovable?: boolean;
}

const Rule: React.FC<RuleProps> = ({ 
  index, 
  onRemove,
  isRemovable = true 
}) => {
  const [ruleName, setRuleName] = useState<string>("");
  const [scenarios, setScenarios] = useState<number[]>([]);

  // Initialize with one scenario when the rule loads
  useEffect(() => {
    if (scenarios.length === 0) {
      setScenarios([0]);
    }
  }, []);

  const addScenario = () => {
    if (scenarios.length < MAX_SCENARIOS) {
      setScenarios([...scenarios, scenarios.length]);
    }
  };

  const removeScenario = (scenarioIndex: number) => {
    // Prevent removing the last scenario
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((_, i) => i !== scenarioIndex));
    }
  };

  const handleRuleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRuleName(event.target.value);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex-grow flex items-center">
          <label htmlFor={`ruleName-${index}`} className="font-medium mr-2">Rule:</label>
          <input
            id={`ruleName-${index}`}
            type="text"
            value={ruleName}
            onChange={handleRuleNameChange}
            placeholder="Enter rule description..."
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-2 w-full"
          />
        </div>
        {isRemovable && (
          <button
            onClick={() => onRemove(index)}
            className="text-gray-500 hover:text-gray-700 ml-4"
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
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        {scenarios.length > 0 && (
          <div className="text-sm text-gray-500">
            {scenarios.length} of {MAX_SCENARIOS} scenarios
          </div>
        )}

        {scenarios.length < MAX_SCENARIOS && (
          <div className="ml-auto">
            <button
              onClick={addScenario}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
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