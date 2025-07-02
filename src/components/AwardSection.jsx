import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AwardsSection({ awards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [slideWidth, setSlideWidth] = useState(320);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const carouselRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isDesktop, setIsDesktop] = useState(false);

  const total = awards.length;
   // Handle responsive behavior
    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };
  
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  // Calculate responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        
        // Determine slides per view and width based on container size
        if (containerWidth >= 1100) {
          // Desktop large - show 4 cards
          setSlidesPerView(4);
          setSlideWidth((containerWidth - 100) / 4); // Adjusted spacing
        } else if (containerWidth >= 768) {
          // Desktop/tablet - show 3 cards
          setSlidesPerView(3);
          setSlideWidth((containerWidth - 80) / 3); // Adjusted spacing
        } else if (containerWidth >= 576) {
          // Small tablet - show 2 cards
          setSlidesPerView(2);
          setSlideWidth((containerWidth - 60) / 2); // Adjusted spacing
        } else {
          // Mobile - show 1 card
          setSlidesPerView(1);
          setSlideWidth(Math.min(320, containerWidth - 40));
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLeft = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex < 0 ? total - 1 : newIndex);
  };

  const handleRight = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex >= total ? 0 : newIndex);
  };

  const handleSwipeStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleSwipeEnd = (e) => {
    if (!isDragging.current) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX.current - endX;

    if (diff > 50) handleRight();
    else if (diff < -50) handleLeft();

    isDragging.current = false;
  };

  // Get the array of visible slides
  const getVisibleSlides = () => {
    const visibleSlides = [];
    
    // Create a circular array for smooth infinite scrolling
    for (let i = 0; i < slidesPerView; i++) {
      const slideIndex = (currentIndex + i) % total;
      visibleSlides.push(awards[slideIndex]);
    }
    
    return visibleSlides;
  };

  // Calculate the translation for smooth animation
  const getTranslateStyle = () => {
    // No translation needed, as we're directly showing the visible slides
    return {
      
      transition: 'all 0.5s ease'
      
    };
  };

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center  mt-25  px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 jaini-regular text-center">
        Awards & Recognition
      </h2>

      <div
        ref={carouselRef}
        className="relative w-full max-w-6xl overflow-hidden"
      >
        {awards.length > slidesPerView && (
          <>
            {/* <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full"
              onClick={handleLeft}
              aria-label="Previous award"
            >
              <ChevronLeft className="text-white" />
            </button> */}

             <button
                      onClick={handleLeft}
                      aria-label="Previous testimonial"
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black text-white rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
                    >
                      <ChevronLeft size={isDesktop ? 24 : 20} />
                    </button>
            <button
                     onClick={handleRight}
                     aria-label="Next testimonial"
                     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black text-white rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
                   >
                     <ChevronRight size={isDesktop ? 24 : 20} />
                   </button>
          </>
        )}

        <div 
          ref={slidesContainerRef}
          className="flex justify-center"
          style={getTranslateStyle()}
          onTouchStart={handleSwipeStart}
          onTouchEnd={handleSwipeEnd}
          onMouseDown={handleSwipeStart}
          onMouseUp={handleSwipeEnd}
        >
          {getVisibleSlides().map((award, i) => (
            <div
              key={`visible-${award.id}-${i}`}
              className="shrink-0 mx-2.5"
              style={{ width: `${slideWidth}px` }}
            >
              <div className="h-[200px] bg-[#221f20] rounded-xl border-2 border-white flex items-center justify-center overflow-hidden">
                <img
                  src={`${apiUrl}backend/storage/app/public/${award.image}`}
                  alt={award.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3 mt-8">
        {awards.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2  md:w-3 md:h-3 rounded-full cursor-pointer transition-all ${
              i === currentIndex ? 'bg-white' : 'border border-white'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}