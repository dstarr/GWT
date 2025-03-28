import React, { useState, useEffect } from "react";
import Rule from "./Rule";

const MAX_RULES = 10;

interface FeatureProps {
  title?: string;
}

const Feature: React.FC<FeatureProps> = ({ title = "Feature" }) => {
  const [rules, setRules] = useState<number[]>([]);
  const [featureName, setFeatureName] = useState<string>("");

  // Initialize with one rule when the feature loads
  useEffect(() => {
    if (rules.length === 0) {
      setRules([0]);
    }
  }, [rules.length]);

  const addRule = () => {
    if (rules.length < MAX_RULES) {
      setRules([...rules, rules.length]);
    }
  };

  const removeRule = (index: number) => {
    // Prevent removing the last rule
    if (rules.length > 1) {
      setRules(rules.filter((_, i) => i !== index));
    }
  };

  const handleFeatureNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFeatureName(event.target.value);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Feature Specification</h1>
      <div className="border border-gray-300 rounded-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex items-center">
            <label htmlFor="featureName" className="mr-2 font-medium">
              Feature:
            </label>
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
          {rules.map((_, index) => (
            <Rule
              key={index}
              index={index}
              onRemove={removeRule}
              isRemovable={rules.length > 1}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          {rules.length > 0 && (
            <div className="text-sm text-gray-500">
              {rules.length} of {MAX_RULES} rules
            </div>
          )}

          {rules.length < MAX_RULES && (
            <div className="ml-auto">
              <button
                onClick={addRule}
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
                Add Rule
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feature;
