import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StartAgainBtn = ({ userName, phone }) => {
  const navigate = useNavigate();

  const handleStartAgain = async () => {
    try {
      const response = await axios.post('https://backend.myinvestoryy.com/api/start-again', { phone });
      console.log('Start again triggered:', response.data);
      navigate('/personalize');
    } catch (error) {
      console.error('Error restarting quiz:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 text-white bg-black text-center px-4">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Hey! {userName}</h2>
      <p className="text-xl mb-10">You have already finished and submitted your answers</p>
      
      <button
        onClick={handleStartAgain}
        className="mt-3 text-xl text-white px-8 py-2 rounded-md mb-12"
        style={{
          backgroundColor: "#AC1C30",
          border: "3px solid #ffffff",
          borderRadius: "10px",
          boxShadow: "2px 3px 0px 0px #000000",
        }}
      >
        Start Again
      </button>
      
      <p className="text-lg mb-2">For any query feel free to</p>
      <p className="text-lg mb-1">connect with us on <span className="font-semibold">9811151619</span></p>
      <div className="border-t border-2 border-white w-full max-w-xl my-4 mb-6" />
      <p className="text-3xl text-[#54A176] jaini-regular font-semibold">Find below your Response</p>
    </div>
  );
};

export default StartAgainBtn;
