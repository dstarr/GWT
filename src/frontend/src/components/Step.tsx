import React, { useState } from "react";
import AndStep from "./AndStep";
import { useTheme } from "../context/ThemeContext";

const MAX_ADDITIONAL_STEPS = 7;

type StepType = "Given" | "When" | "Then";

interface StepProps {
  type: StepType;
}

const Step: React.FC<StepProps> = ({ type }) => {
  const [text, setText] = useState<string>("");
  const [additionalSteps, setadditionalSteps] = useState<string[]>([]);
  const { darkMode } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleAdditionalStepChange = (index: number, value: string) => {
    const newInputs = [...additionalSteps];
    newInputs[index] = value;
    setadditionalSteps(newInputs);
  };

  const addAdditionalStep = (index?: number) => {
    if (additionalSteps.length < MAX_ADDITIONAL_STEPS) {
      if (index !== undefined) {
        // Insert at specific position
        const newInputs = [...additionalSteps];
        newInputs.splice(index + 1, 0, "");
        setadditionalSteps(newInputs);
      } else {
        // Add to end
        setadditionalSteps([...additionalSteps, ""]);
      }
    }
  };

  const removeAdditionalStep = (index: number) => {
    setadditionalSteps(additionalSteps.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center w-full">
          <span className={`step-type ${darkMode ? 'text-green-400' : 'text-gray-600'}`}>{type}: </span>
          <div className="flex-grow">
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Enter text here..."
              className={`border ${darkMode ? 'border-gray-600 bg-gray-700 focus:border-blue-400 placeholder-gray-400' : 'border-gray-300 bg-white focus:border-gray-500'} rounded px-2 py-1 w-full transition-colors duration-200`}
            />
          </div>
          {additionalSteps.length < MAX_ADDITIONAL_STEPS && (
            <button
              onClick={() => addAdditionalStep()}
              className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} ml-2 transition-colors duration-200`}
              title="Add And clause"
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
        </div>

        {additionalSteps.map((input, index) => (
          <AndStep
            key={index}
            value={input}
            index={index}
            canAddMore={additionalSteps.length < MAX_ADDITIONAL_STEPS}
            onChange={handleAdditionalStepChange}
            onAdd={addAdditionalStep}
            onRemove={removeAdditionalStep}
          />
        ))}
        
        {additionalSteps.length > 0 && (
          <div className={`text-right text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-200`}>
            {additionalSteps.length} of {MAX_ADDITIONAL_STEPS} additional steps
          </div>
        )}
      </div>
    </>
  );
};

export default Step; 