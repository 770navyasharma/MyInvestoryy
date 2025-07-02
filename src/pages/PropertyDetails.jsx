import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CallToAction from '../components/CallToAction';
import RealEstateComponent from '../components/RealEstateComponent';
import JoinCommunity from '../components/JoinCommunity';
import Footer from '../components/Footer';

const PropertyDetails = () => {
  const { slug } = useParams(); // 👈 Get slug from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navLinks = [
    { title: 'Real Estate', href: '/real-estate' },
    { title: 'Insurance', href: '/insurance' },
    { title: 'Mutual Fund', href: '/mutual-fund' },
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiBase}api/properties/${slug}`);
        if (!response.ok) throw new Error('Property not found');
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar links={navLinks} />
      <RealEstateComponent property={property} /> {/* ✅ Send data to child */}
      <CallToAction />
       <div className='mt-20'>
            <JoinCommunity/>
            </div>
            <Footer />
    </div>
  );
};

export default PropertyDetails;
