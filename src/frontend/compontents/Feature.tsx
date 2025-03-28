import React, { useState, useEffect } from "react";
import Scenario from "./Scenario";

interface FeatureProps {
  title?: string;
}

const Feature: React.FC<FeatureProps> = ({ title = "Feature" }) => {
  const [scenarios, setScenarios] = useState<number[]>([]);
  const [featureName, setFeatureName] = useState<string>("");

  // Initialize with one scenario when the feature loads
  useEffect(() => {
    if (scenarios.length === 0) {
      setScenarios([0]);
    }
  }, [scenarios.length]);

  const addScenario = () => {
    if (scenarios.length < 20) {
      setScenarios([...scenarios, scenarios.length]);
    }
  };

  const removeScenario = (index: number) => {
    // Prevent removing the last scenario
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((_, i) => i !== index));
    }
  };

  const handleFeatureNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureName(event.target.value);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="flex items-center">
          <label htmlFor="featureName" className="mr-2 font-medium">Feature:</label>
          <input
            id="featureName"
            type="text"
            value={featureName}
            onChange={handleFeatureNameChange}
            placeholder="Enter feature name..."
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {scenarios.map((_, index) => (
          <Scenario
            key={index}
            index={index}
            onRemove={removeScenario}
            isRemovable={scenarios.length > 1}
          />
        ))}
      </div>

      {scenarios.length < 20 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={addScenario}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
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
            Add Scenario
          </button>
        </div>
      )}
    </div>
  );
};

export default Feature;
