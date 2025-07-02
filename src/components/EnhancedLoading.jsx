import { useState, useEffect } from 'react';

export default function EnhancedLoading() {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center mt-20 p-6">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-green-200 border-t-green-500 animate-spin"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="h-8 w-8 bg-black rounded-full"></div>
        </div>
      </div>
      <div className="mt-6 text-green-400 font-semibold text-xl">
        Preparing Your Investment Plan{dots}
      </div>
      <p className="mt-2 text-gray-400 text-center max-w-md">
        We're analyzing the best options to secure your financial future
      </p>
    </div>
  );
}