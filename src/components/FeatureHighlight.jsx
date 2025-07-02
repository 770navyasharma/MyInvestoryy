import React from 'react';

const FeatureHighlight = ({ items = [] }) => {
  console.log("FeatureHighlight items:", items);
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-6 gap-10 py-12 px-6 sm:px-10 lg:px-20 text-center">
      {items.map((item, index) => (
        <div className="text-white flex flex-col items-center" key={item.id || index}>
          <div className="h-[5px] w-30 sm:w-40 sm:h-[5px] bg-[#AC1C30] mb-4" />
          <div
            className="text-[15px] lg:text-lg leading-snug"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlight;