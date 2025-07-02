import React, { useState } from 'react';
import FinalThankYouScreen from './FinalThankYouScreen';
import axios from 'axios';
import { toast } from 'react-toastify'; // 👈 Add this at the top of your file

const CityEmailForm = ({ userName, phone, onComplete }) => {
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit clicked');
    console.log('City:', city);
    console.log('Email:', email);
    console.log('Phone:', phone);
  
    if (!city.trim() && !email.trim()) {
      console.log('No city and email provided, skipping API call.');
      setSubmitted(true);
      onComplete(); // Inform parent
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post('https://backend.myinvestoryy.com/api/update-city-email', {
        phone,
        city,
        email,
      });
  
      console.log('API Response:', response.data);
  
      if (response.data?.message === "Phone number not found") {
        toast.error("Phone number not found. Please check and try again.");
        console.warn('Phone number not found');
      } else if (response.data?.message === "City and Email updated successfully") {
        toast.success("City and Email updated successfully!");
        console.log('City and Email updated:', response.data.user);
      }
  
      setSubmitted(true);
      onComplete(); // Inform parent
    } catch (err) {
      console.error('API call failed:', err);
      toast.error("Something went wrong. Please try again later.");
      setSubmitted(true);
      onComplete(); // Even if API fails, proceed
    } finally {
      setLoading(false);
    }
  };
  

  const handleSkip = () => {
    console.log('Skip clicked');
    setSubmitted(true);
    onComplete(); // Tell parent we are done
  };

  console.log('Submitted state:', submitted);

  if (submitted) {
    console.log('Rendering FinalThankYouScreen...');
    return <div>Loading...</div>; // Temporary loader, because parent will replace the screen
  }

  return (
    <div className="flex flex-col items-center text-center space-y-4 px-4 mt-10 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
        One Last Step!
      </h2>
      <p className="text-white text-lg mb-6">
        Share your city and email to personalize your experience even more (optional).
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center w-80 max-w-sm">
        <input
          type="text"
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="py-2 px-4 rounded-full bg-white text-black placeholder-gray-500 text-lg outline-none w-full"
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-2 px-4 rounded-full bg-white text-black placeholder-gray-500 text-lg outline-none w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-[#529F77] to-[#3C8576] text-white text-xl px-8 py-2 rounded-xl shadow-md flex items-center border-b-[4px] border-r-[4px] border-white justify-center w-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          disabled={loading}
          className="mt-2 text-gray-300 underline text-sm"
        >
          Skip for now
        </button>
      </form>
    </div>
  );
};

export default CityEmailForm;
