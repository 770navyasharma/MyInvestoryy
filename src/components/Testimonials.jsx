import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function Testimonials({ testimonialsData = [] }) {
  const [current, setCurrent] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  
  // Auto-scroll interval in milliseconds (5 seconds)
  const scrollInterval = 3000;

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused && testimonialsData.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
      }, scrollInterval);
    }
    
    // Cleanup on unmount or when paused state changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, testimonialsData.length]);

  // Pause auto-scroll when user interacts with controls
  const pauseAutoScroll = () => {
    setIsPaused(true);
  };

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Number of items to show based on screen size
  const visibleItems = isDesktop ? 3 : 1;

  const handlePrev = () => {
    pauseAutoScroll();
    setCurrent((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    pauseAutoScroll();
    setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  // Function to get carousel items with proper wrapping
  const getCarouselItems = () => {
    if (!testimonialsData || testimonialsData.length === 0) {
      return [];
    }

    const items = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (current + i) % testimonialsData.length;
      items.push(testimonialsData[index]);
    }
    return items;
  };

  const carouselItems = getCarouselItems();

  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <div className="bg-black text-white py-8 md:py-16 px-4">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl jaini-regular font-bold mb-6 md:mb-12 text-center max-w-6xl mx-auto">
        Client's Testimony
      </h2>

      <div className="max-w-6xl mx-auto relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black text-white rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
        >
          <ChevronLeft size={isDesktop ? 24 : 20} />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black text-white rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
        >
          <ChevronRight size={isDesktop ? 24 : 20} />
        </button>

        {/* Carousel */}
        <div className="flex justify-center overflow-hidden px-2 md:px-8">
          <div className="flex gap-4 transition-transform duration-500 ease-in-out w-full">
            {carouselItems.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="bg-[#231f20] w-full max-w-full md:max-w-sm h-auto flex flex-col justify-between shadow-lg transform transition-all duration-300"
              >
                <div className="flex-1 flex flex-col items-start justify-center p-4 md:p-6">
                  <p className="text-base md:text-lg italic leading-relaxed text-left">
                    "{testimonial.message}"
                  </p>
                </div>
                <div className="border-t border-white py-2 md:py-3 px-4 md:px-6 text-left w-full">
                  <span className="text-sm md:text-base font-normal">
                    {testimonial.client_name}{" "}
                    <span className="italic font-normal text-gray-300">
                      {testimonial.client_position}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots and Play/Pause Control */}
        <div className="mt-6 md:mt-8 flex flex-col items-center">
          <div className="flex justify-center space-x-2 md:space-x-3">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  pauseAutoScroll();
                  setCurrent(idx);
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 focus:outline-none ${
                  idx === current
                    ? "bg-white"
                    : "bg-transparent border border-white"
                }`}
              />
            ))}
          </div>
          
          
        </div>
      </div>
    </div>
  );
}