import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from './DynamicQuiz';
import LegacyCards from './LegacyCards';
import AwardsSection from './AwardSection';

import FeatureHighlight from './FeatureHighlight';
import FAQ from './FAQ';
import EnhancedLoading from './EnhancedLoading';
import Loader from './Loader';


const InvestmentForm = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [homepageData, setHomepageData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const savedPhone = localStorage.getItem('investment_user_phone');
    const savedName = localStorage.getItem('investment_user_name');
    if (savedPhone) setPhone(savedPhone);
    if (savedName) setName(savedName);
  }, []);

  useEffect(() => {
    const fetchHomepageData = async () => {
      if (!apiUrl) {
        console.error("VITE_API_URL is not set.");
        setApiError("API URL not configured.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}api/homepage`);
        if (!response.ok) throw new Error("Failed to fetch homepage data.");
        const data = await response.json();
        setHomepageData(data);
      } catch (err) {
        console.error("Error fetching homepage:", err);
        setApiError("Something went wrong while loading the homepage.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be 10 digits');
      return;
    }

    setIsSubmitting(true); // Start loading

    try {
      const response = await axios.post('https://backend.myinvestoryy.com/api/check-user', { phone });

      if (response.data.exists) {
        const user = response.data.user;
        setName(user.name);
        if (user.current_question_index) {
          try {
            const currentQuestionObj = JSON.parse(user.current_question_index);
            const questionKey = currentQuestionObj.key;
            setCurrentQuestionIndex(questionKey);
          } catch (e) {
            console.warn("Invalid current_question_index format:", e);
            setCurrentQuestionIndex(0);
          }
        } else {
          setCurrentQuestionIndex(0);
        }
      } else {
        if (!name.trim()) {
          setError('Name is required');
          setIsSubmitting(false); // Stop loading on error
          return;
        }
        await axios.post('https://backend.myinvestoryy.com/api/register', { name, phone });
        setCurrentQuestionIndex(0);
      }

      localStorage.setItem('investment_user_phone', phone);
      localStorage.setItem('investment_user_name', name);

      setError('');
      setShowQuiz(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };
  const handlePlay = () => {
    setIsPlaying(true);
  };
  const extractYouTubeId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const banner = homepageData?.banners?.[0];
  const video = homepageData?.videos?.[0];
  if (isSubmitting) {
    return (
      <div className="text-center py-10">
        <div className="mx-auto h-16 w-16 mb-6">
          <div className="h-full w-full rounded-full border-4 border-gray-700 border-t-green-500 animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold text-green-400">Processing Your Information...</h3>
        <p className="text-gray-400 mt-2">Creating your personalized investment plan</p>
      </div>
    );
  }

  if (showQuiz) return <Quiz name={name} phone={phone} startKey={currentQuestionIndex} />;
  if (loading) return <Loader />;
  if (apiError) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p>{apiError}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center text-center space-y-4 px-4 mt-10 mb-5">
        <h1 className="text-[#54A175] text-3xl md:text-4xl font-semibold jaini-regular">
          Get your Free Personalized Investment Plan
        </h1>
        <p className="text-[#FFFFFF] text-[18px] font-[sans-serif]">
          Secure future <span className="text-[#FFCC4D] font-bold">|</span> Invest & Grow{' '}
          <span className="text-[#FFCC4D] font-bold">|</span> Get Wealthy
        </p>
        <h2 className="text-white text-[28px] font-semibold jaini-regular mt-6 underline underline-offset-[6px]">
          Let us know your interest in detail
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center w-full">
          <div className="flex flex-col space-y-4 w-[300px]">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 px-4 rounded-full bg-white text-black placeholder-gray-500 text-lg outline-none"
            />
            <input
              type="text"
              placeholder="WhatsApp #"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="py-2 px-4 rounded-full bg-white text-black placeholder-gray-500 text-lg outline-none"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-[#529F77] to-[#3C8576] text-white text-xl px-8 py-2 rounded-xl shadow-md flex items-center border-b-[4px] border-r-[4px] border-white justify-center  transition-transform duration-200 relative active:translate-y-1 active:translate-x-1 active:shadow-sm active:border-b-[1px] active:border-r-[1px]"
          >
            Start Questions
          </button>
        </form>
        <h3 className='mb-0 pb-0 mt-3.5 ' >It will take just 1 min.<br></br>5 Sections with Multiple choice Questions </h3>


        <p className="text-[#9CA3AF] mt-1.5 text-sm  max-w-[400px]">
          No Spam calls, we promise, We are taking details so that you can continue with your journey if left in middle
        </p>
      </div>
      {video?.video_url && (
        <div className="flex justify-center items-center py-8 sm:py-12 px-4 sm:px-6 mb-10">
          <div className="w-full max-w-[640px] aspect-video bg-[#1D1A1B] shadow-lg relative rounded-lg overflow-hidden">
            {video?.video_url && !isPlaying ? (
              <div
                className="w-full h-full bg-cover bg-center cursor-pointer relative"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${extractYouTubeId(video.video_url)}/hqdefault.jpg)`,
                }}
                onClick={handlePlay}
              >
                <div className="absolute inset-0  flex items-center justify-center transition hover:bg-black/40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${extractYouTubeId(video.video_url)}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            )}
          </div>
        </div>
      )}
      <h2 className="jaini-regular text-center text-3xl md:text-4xl font-bold text-[#54A175]">
        Why Us!
      </h2>
      <FeatureHighlight items={homepageData?.why_us || []} />

      <LegacyCards homepageData={homepageData} />
      {Array.isArray(homepageData?.awards) && homepageData.awards.length > 0 && (
        <AwardsSection awards={homepageData.awards} />
      )}


      {Array.isArray(homepageData?.faqs) && homepageData.faqs.length > 0 && (
        <FAQ faqs={homepageData.faqs} />
      )}

    </>
  );
};

export default InvestmentForm;
