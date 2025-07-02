import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";

import { FiShare2, FiFacebook, FiTwitter, FiMail } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import SimilarProjects from './SimilarProjects';


import {
  Facebook,
  Twitter,
  Mail,
  Linkedin,
  Instagram,
  Copy,
  Check,
  MessageCircle,
  Share2
} from 'lucide-react';
import { FaArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


// Image Modal Component
// Updated ImageModal Component
// This component should replace the commented-out ImageModal at the bottom of your code

// First, uncomment the ImageModal component at the bottom of your file
// Then, replace it with this updated version

// Image Modal Component
const ImageModal = ({ isOpen, onClose, imageUrl, images, currentIndex, setCurrentIndex }) => {
  if (!isOpen) return null;

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center p-4"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="text-white text-3xl font-bold hover:text-gray-300"
        >
          ×
        </button>
      </div>

      <div className="relative w-full max-w-4xl h-3/4" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt="Full size"
          className="w-full h-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ←
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="flex gap-2 mt-4 overflow-x-auto max-w-full p-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`cursor-pointer transition-all duration-200 ${idx === currentIndex ? 'border-2 border-green-500 scale-110' : 'border border-gray-600'}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="h-16 w-20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function RealEstateComponent({ property }) {
  const { slug } = useParams();
  console.log(slug);
  const [isChargesModalOpen, setIsChargesModalOpen] = useState(false);
  const [selectedExtraCharges, setSelectedExtraCharges] = useState('');

  // These are the necessary code updates to make the image modal functional
  // You'll need to add/update these parts in your component



  // In the return statement, just before the closing </div> tag, add:


  // This replaces the commented out section where the ImageModal was previously referenced

  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  // console.log(data);
  const chargesModalRef = useRef(null);
  const interestModalRef = useRef(null);

  const handleChargesClick = (e) => {
    e.stopPropagation();
    setIsChargesModalOpen(true);
  };

  const handleInterestClick = (e) => {
    e.stopPropagation();
    setIsInterestModalOpen(true);
  };

  const closeChargesModal = () => {
    setIsChargesModalOpen(false);
  };

  const closeInterestModal = () => {
    setIsInterestModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email || '',
      phone_number: formData.phone,
      property_name: property.project_name,
      project_id: property.id
    };

    console.log('Submitting interest with payload:', payload);

    try {
      const response = await fetch('https://backend.myinvestoryy.com/api/real-estate-queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Raw response:', response);

      const responseData = await response.json();
      console.log('Parsed response data:', responseData);

      if (response.ok) {
        toast.success("🎉 Got it! We'll be in touch soon");
        closeInterestModal();
        setFormData({ name: '', email: '', phone: '' });
      } else {
        toast.error('Submission failed: ' + (responseData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting interest:', error);
      toast.error('An error occurred. Please try again.');
    }
  };




  // Close on outside click for charges modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chargesModalRef.current && !chargesModalRef.current.contains(event.target)) {
        closeChargesModal();
      }
    };

    if (isChargesModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChargesModalOpen]);

  // Close on outside click for interest modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (interestModalRef.current && !interestModalRef.current.contains(event.target)) {
        closeInterestModal();
      }
    };

    if (isInterestModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInterestModalOpen]);

  // Disable page scroll when any modal is open
  useEffect(() => {
    document.body.style.overflow = (isChargesModalOpen || isInterestModalOpen) ? 'hidden' : '';
  }, [isChargesModalOpen, isInterestModalOpen]);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  const [copied, setCopied] = useState(false);



  const handleCopyLink = () => {
    navigator.clipboard.writeText((shareUrl));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Current URL to share
  const shareUrl = (window.location.href);
  const text = encodeURIComponent("Check this out!");
  // console.log(property);

  console.log(shareUrl);

  const openGallery = (images, index = 0) => {
    setActiveImages(images);
    setActiveIndex(index);
    setModalOpen(true);
  };

  // Add these state variables in your component (near other useState declarations)
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeImages, setActiveImages] = useState([]);

  // Add these functions in your component
  const handleImageClick = (index) => {
    setActiveImages([]); // Clear any subproperty images
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  const openSubPropertyGallery = (images, index = 0) => {
    // Convert image paths to full URLs
    const imageUrls = images.map(img =>
      `https://backend.myinvestoryy.com/backend/storage/app/public/${img.image_path}`
    );

    // Set these images as active images and open modal
    setActiveImages(imageUrls);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeGallery = () => {
    setModalOpen(false);
    setActiveImages([]);
    setCurrentImageIndex(0);
  };


  const baseURL = "https://backend.myinvestoryy.com/backend/storage/app/public/";

  const dynamicImages = property.property_images.map(img => `${baseURL}${img.image_path}`);

  const images = [...dynamicImages];


  const [isPlaying, setIsPlaying] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const handleImageClick = (index) => {
  //   setCurrentImageIndex(index);
  //   setModalOpen(true);
  // };
  const apiBase = import.meta.env.VITE_API_URL;

  

  return (
    <>
    <div className="bg-black text-white font-sans p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="text-center py-6 sm:py-8 md:py-10 mb-4 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold jaini-regular mb-2 sm:mb-4">Real Estate</h1>
        <a href="#" className="text-sm underline text-white hover:text-green-300">View All Properties</a>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row mt-8 sm:mt-12 lg:mt-20 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {/* Left Image Grid */}
        <div className="w-full lg:w-1/2 p-2 mb-4 lg:mb-0">
          <div className="flex justify-between items-center bg-zinc-900 py-3 px-3 sm:px-5 mb-5 sm:mb-8 flex-wrap gap-3 rounded-xs">
            <button
              onClick={handleInterestClick}
              className="bg-gradient-to-r from-[#529F77] to-[#3C8576] text-white text-base px-4 py-2 rounded-xl shadow-md flex items-center gap-1 border-b-[4px] border-r-[4px] border-white hover:scale-[1.03] transition-transform duration-200 relative active:translate-y-1 active:translate-x-1 active:shadow-sm active:border-b-[1px] active:border-r-[1px] w-auto sm:w-auto"
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >Send Interest
            </button>
            <div className='hidden sm:flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-200'>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold jaini-regular"></h3>
            </div>

            <div className="relative">
              <button
                className="text-gray-200 text-sm flex items-center gap-2"
                onClick={toggleShareOptions}
              >
                <FiShare2 className="text-green-500 rotate-180 w-6 h-6 md:w-8 md:h-8 m-1 md:m-2" />
                <span className="mr-1">Share</span>
              </button>

              {showShareOptions && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 z-10 w-72 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Share this Property</h3>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-blue-600 text-white p-2 rounded-full flex-shrink-0">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">Facebook</span>
                    </a>

                    {/* Twitter/X */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-black text-white p-2 rounded-full flex-shrink-0">
                        <Twitter className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">X.com</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${text}${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-green-500 text-white p-2 rounded-full flex-shrink-0">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">WhatsApp</span>
                    </a>

                    {/* Instagram */}


                    {/* LinkedIn */}
                    {/* <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="bg-blue-700 text-white p-2 rounded-full flex-shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-gray-800 dark:text-gray-200">LinkedIn</span>
            </a> */}

                    {/* Email */}
                    <a
                      href={`mailto:?body=${text}%20${shareUrl}`}
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-red-500 text-white p-2 rounded-full flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">Email</span>
                    </a>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center justify-center gap-2 w-full p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-gray-800 dark:text-gray-200">Link copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-gray-800 dark:text-gray-200">Copy link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Image */}
          <div
            className="bg-zinc-800 h-52 sm:h-64 md:h-80 w-full cursor-pointer overflow-hidden rounded mt-4 mb-3"
            onClick={() => handleImageClick(0)}
          >
            <img
              src={images[0]}
              alt="Property Main View"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3 sm:mt-4 mb-4">
            {images.map((img, i) => (
              <div
                key={i}
                className={`cursor-pointer overflow-hidden ${i === currentImageIndex && modalOpen ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => handleImageClick(i)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Info Section */}
        <div className="w-full lg:w-1/2 p-2 mt-2 sm:mt-0">
          <h2 className="text-2xl sm:text-4xl md:text-4xl font-bold jaini-regular underline mb-4 sm:mb-6">{property.project_name}</h2>

          {/* Brochure + Layout Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 sm:mt-6 mb-4">
            <Link to={`${apiBase}backend/storage/app/public/${property.brochure_url}`} target="_blank" className="flex justify-center items-center gap-2 text-white text-sm sm:text-md">
              <FaArrowDown className="bg-red-600 p-1 text-white w-6 h-6 rounded-full" />
              BROCHURE
            </Link>
            <Link to={`${apiBase}backend/storage/app/public/${property.layout_plan_url}`} target="_blank" className="flex justify-center items-center gap-2 text-white text-sm sm:text-md">
              <FaArrowDown className="bg-red-600 p-1 text-white w-6 h-6 rounded-full" />
              LAYOUT PLAN
            </Link>

          </div>

          {/* Details Section */}
          <div className="border-white border-2 bg-zinc-800 mt-5 sm:mt-6 md:mt-8 rounded-sm p-3 sm:p-4 mb-4">
            <div className="flex justify-between text-xs sm:text-sm md:text-md">
              <span className="underline">{property.type}</span>
              <span>{property.status}</span>
            </div>
            <div className="flex justify-between font-bold text-xs sm:text-sm md:text-md mt-1">
              <span>{property.location}</span>
              <span className="font-normal">Possession in {property.possession}</span>
            </div>
          </div>

          {/* Price Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4  sm:gap-x-8 gap-y-4 sm:gap-y-6 mt-6 sm:mt-8 mb-10">
            {property.sub_properties.map((subProp, i) => {
              const images = property.sub_property_images.filter(
                (img) => img.sub_property_id === subProp.id
              );
              const mainImage = images[0];

              return (
                <div key={i} className="p-0 m-0 flex flex-col items-center sm:items-start mt-2 sm:mt-0">
                  {/* Info Box */}
                  <div className="bg-zinc-800 px-2 sm:px-3 py-2 text-xs sm:text-sm border-white border-2 rounded-sm w-full">
                    <p className="py-1">
                      {subProp.configuration} | {subProp.carpet_area}
                    </p>
                    <hr className="my-1 border-zinc-600" />
                    <p className="flex items-center">
                      <span>₹{(subProp.price)} {' '}</span>
                      <button
                        onClick={() => {
                          setSelectedExtraCharges(subProp.extra_charges);
                          setIsChargesModalOpen(true);
                        }}
                        className="text-blue-800 focus:outline-none"
                      >
                        <span className="text-blue-400">
                           + Charges
                        </span>
                      </button>
                    </p>
                  </div>
                  {/* Sub-property image display */}
                  <div
                    onClick={() => openSubPropertyGallery(images)}
                    className="relative cursor-pointer bg-gray-600 h-40 sm:h-40 flex items-center justify-center mt-2 sm:mt-3 text-xs sm:text-sm w-full"
                  >
                    {mainImage ? (
                      <img
                        src={`https://backend.myinvestoryy.com/backend/storage/app/public/${mainImage.image_path}`}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-white">No Image</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

         


          {/* Modal / Lightbox */}
          {/*  */}


          {/* Why Invest */}
          <div className="mt-5">
            <h3 className="underline text-lg font-bold text-center sm:text-left mb-4 sm:text-lg">Why to Invest?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {property.why_to_invest.map((item) => (
                <div className="bg-zinc-800 h-auto rounded-xs border border-white overflow-auto p-2">
                  <div key={item.id} dangerouslySetInnerHTML={{ __html: item.content }} className="text-white mb-2" />
                </div>
              ))}



            </div>
          </div>
          <div className="mt-5">
            <h3 className="underline text-lg font-bold text-center sm:text-left mb-4 ">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((item) => (
                <div key={item.id} className="bg-zinc-800 h-auto rounded-xs border border-white overflow-auto p-3">
                  <div dangerouslySetInnerHTML={{ __html: item.name }} className="text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* About Builder */}
          <div className="mt-6">
            <h3 className="underline text-lg font-bold text-center sm:text-left mb-4 ">About Builder</h3>
            <div className="bg-zinc-800 rounded p-4 border border-white">
              <div dangerouslySetInnerHTML={{ __html: property.about_builder }} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-8">
            <button
              onClick={handleInterestClick}
              className="bg-gradient-to-r from-[#529F77] to-[#3C8576] text-white text-base px-4 py-2 rounded-xl shadow-md flex items-center gap-1 border-b-[4px] border-r-[4px] border-white hover:scale-[1.03] transition-transform duration-200 relative active:translate-y-1 active:translate-x-1 active:shadow-sm active:border-b-[1px] active:border-r-[1px] w-auto sm:w-auto font-bold"
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              Send Interest
            </button>

            <div className="relative">
              <button
                className="text-white text-sm flex items-center gap-2"
                onClick={toggleShareOptions}
              >
                <FiShare2 className="text-green-500 rotate-180 w-8 h-8 m-2" /> Share
              </button>
              {showShareOptions && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 z-10 w-72 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Share this Property</h3>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-blue-600 text-white p-2 rounded-full flex-shrink-0">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">Facebook</span>
                    </a>

                    {/* Twitter/X */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-black text-white p-2 rounded-full flex-shrink-0">
                        <Twitter className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">X.com</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${text}${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-green-500 text-white p-2 rounded-full flex-shrink-0">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">WhatsApp</span>
                    </a>

                    {/* Instagram */}


                    {/* LinkedIn */}
                    {/* <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="bg-blue-700 text-white p-2 rounded-full flex-shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-gray-800 dark:text-gray-200">LinkedIn</span>
            </a> */}

                    {/* Email */}
                    <a
                      href={`mailto:?body=${text}%20${shareUrl}`}
                      className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="bg-red-500 text-white p-2 rounded-full flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">Email</span>
                    </a>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center justify-center gap-2 w-full p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-gray-800 dark:text-gray-200">Link copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-gray-800 dark:text-gray-200">Copy link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Video Player */}
          <div className="flex justify-center py-4">
            <div className="w-full max-w-[640px] aspect-video bg-[#1D1A1B] shadow-lg rounded-xs overflow-hidden relative">
              {isPlaying ? (
                <iframe
                  className="w-full h-full"
                  src={`${property.video_url}?autoplay=1&mute=1&enablejsapi=1`}
                  title="Video player"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  className="w-full h-full flex justify-center items-center cursor-pointer relative group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src={`${apiBase}backend/storage/app/public/${property.video_thumbnail}`}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[15px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
      {/* Image Modal */}
      {modalOpen && (
        <ImageModal
          isOpen={modalOpen}
          onClose={closeGallery}
          imageUrl={activeImages.length > 0 ? activeImages[currentImageIndex] : images[currentImageIndex]}
          images={activeImages.length > 0 ? activeImages : images}
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
        />
      )}

      {/* Charges Modal */}
      {isChargesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="bg-[#0f1e17] text-white rounded-xl p-6 max-w-md w-full relative shadow-xl border border-green-700"
            ref={chargesModalRef}
          >
            <button className="absolute top-2 right-2 text-white text-xl" onClick={closeChargesModal}>
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4">Additional Charges</h3>
            <div
              className="text-sm space-y-2"
              dangerouslySetInnerHTML={{ __html: selectedExtraCharges || "<p>No additional charges listed.</p>" }}
            />
            <button onClick={closeChargesModal} className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Interest Modal */}
      {isInterestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div
            ref={interestModalRef}
            className="bg-gradient-to-br from-[#1a2e24] to-[#111827] text-white rounded-xl p-6 w-full max-w-md relative shadow-2xl border border-green-600 transform transition-all"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white rounded-full h-8 w-8 flex items-center justify-center bg-gray-800/50 hover:bg-gray-700 transition-colors"
              onClick={closeInterestModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-1 text-white flex items-center">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                  <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                  <path d="M9 22V12h6v10" />
                  <path d="M2 10.6L12 2l10 8.6" />
                </svg>
              </span>
              Express Interest
            </h3>

            <p className="text-green-400 font-medium mb-2">{property.project_name}</p>
            <p className="text-gray-300 text-sm mb-6">Please fill in your details to express interest in this property. Our team will contact you soon.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/30 focus:outline-none text-white placeholder-gray-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/30 focus:outline-none text-white placeholder-gray-500 transition-colors"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500/30 focus:outline-none text-white placeholder-gray-500 transition-colors"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit Interest
                </button>
              </div>
            </form>

            <p className="text-gray-400 text-xs mt-4 text-center">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </div>
      )}
    </div>
    
    {/* Similar Projects - Only include once */}
    <SimilarProjects slug={slug} />
  </>
  );
}
