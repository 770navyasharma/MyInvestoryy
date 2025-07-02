import { useState, useEffect } from 'react';

export default function InvestmentLoader() {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-gray-800 border-t-green-500 animate-spin"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="h-10 w-10 bg-black rounded-full"></div>
        </div>
      </div>
      <div className="mt-6 text-green-400 font-semibold text-xl">
        Loading{dots}
      </div>
    </div>
  );
}