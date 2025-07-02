import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);
  console.log("FAQ data:", faqs);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-8 md:py-16 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-12 jaini-regular">FAQ</h2>
      
      <div className="max-w-3xl mx-auto space-y-3 md:space-y-4 px-4 md:px-2">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-white rounded-xl overflow-hidden transition-all duration-300"
          >
            <div
              className="px-4 md:px-6 py-2 md:py-3 flex items-center justify-between cursor-pointer"
              onClick={() => toggle(idx)}
            >
              <span className="text-left text-white text-base md:text-lg font-medium pr-2">
                {faq.question}
              </span>
              {openIndex === idx ? (
                <Minus className="text-white flex-shrink-0" size={18} />
              ) : (
                <Plus className="text-white flex-shrink-0" size={18} />
              )}
            </div>
            
            {openIndex === idx && (
              <div className="px-4 md:px-6 pb-3 md:pb-4 text-left text-gray-300 text-sm md:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;