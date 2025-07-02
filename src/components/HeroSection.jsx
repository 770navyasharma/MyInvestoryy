import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import FeatureHighlight from "./FeatureHighlight";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ homepageData }) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleClick = () => {
    navigate("/personalize");
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

  return (
    <section className="bg-black text-white w-full">
      {banner && (
     
      <div className="bg-gradient-to-b from-[#AC1C31] to-[#A31C4F] py-8 sm:py-12 w-full sm:px-5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10 px-4 sm:px-8 lg:px-20">
          <div className="w-full max-w-2xl text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-light mb-3 sm:mb-4 leading-snug sm:leading-snug md:leading-tight text-left">
              {banner?.title || "Let us help you. Create your"}
              <br />
              <span className="text-xl sm:text-2xl md:text-4xl font-light">
                {banner?.subtitle || "Goal based investment story"}
              </span>
            </h1>

            <div className="w-[250px] h-[3px] sm:h-[3px] sm:w-[450px] bg-white md:mx-0 my-4 sm:my-6" />

            <p className="text-sm text-left sm:text-base md:text-lg font-light">
              Secure future <span className="text-yellow-400 font-bold">|</span>{" "}
              Invest & Grow{" "}
              <span className="text-yellow-400 font-medium">|</span> Get Wealthy
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0">
            <button
              onClick={handleClick}
              className="bg-gradient-to-r from-[#529F77] to-[#3C8576] text-white px-1 sm:px-1 md:pr-0 md:pl-4 py-2 sm:py-3 md:py-2 rounded-xl flex items-center justify-center gap-2 sm:gap-3 md:gap-4 border-b-2 sm:border-b-3 md:border-b-4 border-r-2 sm:border-r-3 md:border-r-4 border-white font-bold min-w-max hover:scale-[1.03] transition-transform duration-200 shadow-lg relative active:shadow-sm active:border-b-1 sm:active:border-b-2 active:border-r-1 sm:active:border-r-2 w-full md:w-auto"
              style={{
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              <span className="underline text-m sm:text-lg md:text-2xl font-normal whitespace-normal md:whitespace-nowrap text-center md:text-left">
                Get your Free Personalized Plan
              </span>
              <span className="text-yellow-400 text-[16px] md:text-[20px]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right text-yellow-400 w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-12 flex-shrink-0"><path d="m9 18 6-6-6-6"></path></svg></span>

              {/* 3D highlight effect */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none opacity-30"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
                  top: "1px",
                  left: "1px",
                  right: "1px",
                  bottom: "1px",
                }}
              />
            </button>
          </div>
        </div>
      </div>
)}
      {/* Feature Cards */}
      {Array.isArray(homepageData?.why_us) && homepageData.why_us.length > 0 && (
  <FeatureHighlight items={homepageData.why_us} />
)}

      {/* Video Player */}
      {/* Video Player */}
      {video?.video_url && (
      <div className="flex justify-center items-center py-8 sm:py-12 px-4 sm:px-6">
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

    </section>
  );
};

export default HeroSection;