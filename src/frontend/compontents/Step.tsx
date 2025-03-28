import React, { useState } from "react";
import AndStep from "./AndStep";

type StepType = "Given" | "When" | "Then";

interface StepProps {
  type: StepType;
}

const Step: React.FC<StepProps> = ({ type }) => {
  const [text, setText] = useState<string>("");
  const [additionalSteps, setadditionalSteps] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleAdditionalStepChange = (index: number, value: string) => {
    const newInputs = [...additionalSteps];
    newInputs[index] = value;
    setadditionalSteps(newInputs);
  };

  const addAdditionalStep = (index?: number) => {
    if (additionalSteps.length < 7) {
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center w-full">
        <span className="step-type">{type}: </span>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text here..."
          className="border border-gray-300 focus:border-2 focus:border-gray-500 rounded px-2 py-1 w-full"
        />
        {additionalSteps.length < 7 && (
          <button
            onClick={() => addAdditionalStep()}
            className="text-gray-500 hover:text-gray-700"
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
          canAddMore={additionalSteps.length < 7}
          onChange={handleAdditionalStepChange}
          onAdd={addAdditionalStep}
          onRemove={removeAdditionalStep}
        />
      ))}
    </div>
  );
};

export default Step; 