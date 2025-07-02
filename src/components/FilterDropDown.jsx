import React, { useRef, useEffect, useState } from "react";

const FilterDropdown = ({ selected, onChange, options }) => {
  const [width, setWidth] = useState('auto');
  const selectedOptionRef = useRef(null);
  
  // Calculate width based on selected option
  useEffect(() => {
    if (selectedOptionRef.current) {
      // Create temporary span to measure text width
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.fontSize = window.innerWidth < 640 ? '0.875rem' : 
                              window.innerWidth < 768 ? '1rem' : 
                              window.innerWidth < 1024 ? '1.125rem' : '1.25rem';
      tempSpan.style.fontFamily = window.getComputedStyle(selectedOptionRef.current).fontFamily;
      tempSpan.style.fontWeight = window.getComputedStyle(selectedOptionRef.current).fontWeight;
      tempSpan.innerText = selected;
      document.body.appendChild(tempSpan);
      
      // Set width based on text width plus padding for the arrow and spacing
      const textWidth = tempSpan.getBoundingClientRect().width;
      const paddingWidth = window.innerWidth < 640 ? 48 : 
                         window.innerWidth < 768 ? 56 : 
                         window.innerWidth < 1024 ? 70 : 80;
      
      setWidth(`${textWidth + paddingWidth}px`);
      document.body.removeChild(tempSpan);
    }
  }, [selected]);

  return (
    <div className="relative inline-block" style={{ width }}>
      <select
        ref={selectedOptionRef}
        className="bg-black border-2 border-white text-sm sm:text-base md:text-lg lg:text-xl text-white px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl pr-8 sm:pr-10 md:pr-12 appearance-none w-full"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="white" 
          stroke="white" 
          strokeWidth="0" 
          className="transform rotate-180"
        >
          <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        </svg>
      </div>
    </div>
  );
};

export default FilterDropdown;