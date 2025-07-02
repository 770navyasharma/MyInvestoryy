import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import DiversifiedOptions from "../components/DiversifiedOptions";
import LegacyCards from "../components/LegacyCards";
import AwardsSection from "../components/AwardSection";
import CallToAction from "../components/CallToAction";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import JoinCommunity from "../components/JoinCommunity";
import Footer from "../components/Footer";
import Loader  from "../components/Loader";

const Homepage = () => {
  const navLinks = [
    // { title: "Real Estate", href: "/real-estate" },
    // { title: "Insurance", href: "/insurance" },
    // { title: "Mutual Fund", href: "/mutual-fund" },
  ];

  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL; // e.g., http://127.0.0.1:8000

  useEffect(() => {
    const fetchHomepageData = async () => {
      if (!apiUrl) {
        console.error("VITE_API_URL is not set in your .env file.");
        setApiError("API URL not configured.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}api/homepage`);
        if (!response.ok) {
          throw new Error("Failed to fetch homepage data.");
        }
        const data = await response.json();
        console.log("Homepage data:", data);
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

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (apiError) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p>{apiError}</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar links={navLinks} />

      {/* Hero Section */}
      <div className="px-5 pt-8 sm:p-10">
        <HeroSection homepageData={homepageData} />
      </div>

      {/* Other sections */}
     {homepageData.investment_options?.length > 0 && (
  <DiversifiedOptions homepageData={homepageData} />
)}

{homepageData?.legacycards?.length > 0 && (
  <LegacyCards homepageData={homepageData} />
)}

{Array.isArray(homepageData?.awards) && homepageData.awards.length > 0 && (
  <AwardsSection awards={homepageData.awards} />
)}


  <CallToAction homepageData={homepageData} />


{Array.isArray(homepageData?.testimonials) && homepageData.testimonials.length > 0 && (
  <Testimonials testimonialsData={homepageData.testimonials} />
)}

{Array.isArray(homepageData?.faqs) && homepageData.faqs.length > 0 && (
  <FAQ faqs={homepageData.faqs} />
)}

      <JoinCommunity homepageData={homepageData} />
      <Footer />
    </div>
  );
};

export default Homepage;
