import React from "react";

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
  return (
    <div className="flex flex-row gap-2 items-center ml-4">
      <span className="step-type">And: </span>
      <div className="flex-grow">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder="Enter additional step text here..."
          className="border border-gray-300 focus:border-2 focus:border-gray-500 rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex items-center">
        {canAddMore && (
          <button
            onClick={() => onAdd(index)}
            className="text-gray-500 hover:text-gray-700 ml-2"
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
          className="text-gray-500 hover:text-gray-700 ml-2"
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