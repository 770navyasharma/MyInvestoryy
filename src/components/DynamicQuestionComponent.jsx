import React, { useState, useEffect } from 'react';

const DynamicQuestionComponent = ({
  userName,
  question,
  options,
  onSelectOption,
  onBack,
  showBack,
  multiple = false,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]); // Reset selection when question changes
  }, [question]);

  const toggleOption = (option, e) => {
    if (multiple) {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    } else {
      setSelected([option]);
      e.target.blur(); // 💥 Remove focus IMMEDIATELY

      setTimeout(() => {
        setSelected([]); // Clear selected
        onSelectOption(option);
      }, 100); // Small delay
    }
  };

  const handleNext = () => {
    if (multiple && selected.length > 0) {
      onSelectOption(selected);
    }
  };

  const isSelected = (option) => selected.includes(option);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 space-y-6 max-w-3xl mx-auto mb-80 ">
      {/* Greeting */}
      <h2 className="text-xl text-center">
        Hi! <span className="font-bold">{userName}</span>
      </h2>

      {/* Heading */}
      <h1 className="text-[#54A175] text-2xl sm:text-3xl font-semibold jaini-regular text-center">
        Let's create your Investment Storyy
      </h1>

      {/* Question */}
      <h3 className="text-lg sm:text-xl font-bold underline text-center px-4 break-words">
        {question}
      </h3>

      {/* Options */}
      <div className="flex flex-col space-y-3 w-full max-w-xs px-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={(e) => toggleOption(option, e)} // ⬅️ Pass event here
            className={`border rounded-full py-2 px-4 text-base sm:text-lg transition-all duration-200 ease-in-out text-center break-words ${
              isSelected(option)
                ? 'bg-white text-black border-white'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Next button only for multi-select */}
      {multiple && (
        <button
          onClick={handleNext}
          disabled={selected.length === 0}
          className={`mt-4 ${
            selected.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#54A175] hover:opacity-90'
          } text-white py-2 px-6 rounded-full text-lg transition`}
        >
          Next
        </button>
      )}

      {/* Back button */}
      {showBack && (
        <button
          onClick={onBack}
          className="mt-4 text-white text-base sm:text-lg hover:underline"
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default DynamicQuestionComponent;
