import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function LegacyCards({ homepageData }) {
  const legacyCards = homepageData?.legacycards || [];
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeDescription, setActiveDescription] = useState("");
  const [activeName, setActiveName] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  const handleOpenModal = (description, name) => {
    setActiveDescription(description);
    setActiveName(name);
    setShowModal(true);
    // Add small delay before setting visible to ensure the modal is in the DOM first
    setTimeout(() => {
      setModalVisible(true);
    }, 10);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // Wait for the animation to complete before removing from DOM
    setTimeout(() => {
      setShowModal(false);
      setActiveDescription("");
      setActiveName("");
    }, 300); // Match this with your CSS transition duration
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setScrollPosition(carouselRef.current.scrollLeft - 200);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setScrollPosition(carouselRef.current.scrollLeft + 200);
    }
  };

  // Toggle body scroll lock when modal opens/closes
  useEffect(() => {
    let scrollPosition = 0;
    
    if (showModal) {
      // Store current scroll position
      scrollPosition = window.pageYOffset;
      // Apply styles to prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup function to ensure scroll is re-enabled if component unmounts
      document.body.style.overflow = '';
    };
  }, [showModal]);

  // Update scroll position when carousel scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        setScrollPosition(carouselRef.current.scrollLeft);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const showLeftArrow = scrollPosition > 0;
  const showRightArrow = carouselRef.current
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
    : true;

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center mt-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 jaini-regular text-center">
        35+ Years Legacy of
      </h1>
    
      {/* Responsive layout: stacked on mobile, grid on desktop */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 lg:gap-14">
        {legacyCards.map((card) => (
          <div key={card.id} onClick={() => handleOpenModal(card.description, card.name)} className="flex flex-col items-center w-[140px] sm:w-[160px]">
            <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] bg-[#221f20] rounded-4xl border-2 border-white flex items-center justify-center overflow-visible">
              <div className="w-full h-full rounded-4xl overflow-hidden">
                <img
                  src={`${apiUrl}backend/storage/app/public/${card.image}`}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <button
                onClick={() => handleOpenModal(card.description, card.name)}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white border-2 border-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg z-20"
                title="View Description"
              >
                i
              </button>
            </div>
            <a onClick={() => handleOpenModal(card.description, card.name)} className="mt-4 text-base underline text-white text-center">
              {card.name}
            </a>
          </div>
        ))}
      </div>
    
      {/* Modal with animation */}
      {showModal && (
        <div 
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out ${
            modalVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`bg-black text-gray-200 p-6 rounded-lg max-w-md w-full relative border border-gray-700 shadow-xl transition-all duration-300 ease-in-out ${
              modalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-white">{activeName}</h2>
            <div
              className="text-gray-300 space-y-2 prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: activeDescription }}
            />
          </div>
        </div>
      )}
    </div>
  );
}