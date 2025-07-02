import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CallToAction() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/personalize');
  };
  return (
    <div className=" px-2 bg-black text-white text-center  pt-25 pb-10 flex flex-col items-center justify-center space-y-4">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold jaini-regular">Don’t Wait</h2>

      {/* Subheading */}
      <p className="text-[15px] md:text-xl font-semibold">
        Secure future <span className="text-yellow-400 font-medium">|</span> Invest & Grow <span className="text-yellow-400 font-medium">|</span> Get Wealthy
      </p>

      {/* Button */}
      <button
  onClick={handleClick}
  className="bg-gradient-to-r from-[#529F77] to-[#3C8576] text-white text-base md:text-lg px-4 md:pl-6 md:pr-0 py-2.5 md:py-1.5 rounded-xl shadow-md flex items-center gap-1 border-b-[4px] border-r-[4px] border-white hover:scale-[1.03] transition-transform duration-200 relative active:translate-y-1 active:translate-x-1 active:shadow-sm active:border-b-[1px] active:border-r-[1px] w-auto sm:w-auto"
  style={{
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  }}
>
  <span className="underline text-[18px] md:text-[22px] leading-tight text-center">
    Get your Free Personalized Plan
  </span>
  <span className="text-yellow-400 text-[16px] md:text-[20px]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-yellow-400 w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-12 flex-shrink-0"><path d="m9 18 6-6-6-6"></path></svg></span>


  {/* 3D highlight effect */}
  <div
    className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none opacity-30"
    style={{
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
      top: '1px',
      left: '1px',
      right: '1px',
      bottom: '1px',
    }}
  />
</button>

    </div>
  );
}
