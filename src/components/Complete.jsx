import React, { useEffect, useState } from 'react';

const CompletionScreen = ({ userName, onComplete }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          onComplete(); // Navigate or trigger next step
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white text-center  space-y-6 mb-150  mt-10">
              <h2 className="text-xl">
        Hi! <span className="font-bold">{userName}</span>
      </h2>

      <h1 className="text-[#54A175] text-3xl font-semibold jaini-regular text-center mb-10">
        Let's create your Investment Storyy
      </h1>

      <h2 className="text-lg font-bold mb-4">Hey {userName}!</h2>
      <p className="text-l mb-2">You are doing great…</p>
      <p className="text-m mb-2">
        You are just few steps behind in finalizing your,<br />Goal Based Personalized Investment Plan.
      </p>
      <p className="text-l mt-4">
        Continuing in <span className="text-[#54A175] font-semibold">{countdown}</span> second
      </p>
    </div>
  );
};

export default CompletionScreen;
