import React from 'react'
import Navbar from '../components/Navbar';
import JoinCommunity from '../components/JoinCommunity';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import RealEstateListings from '../components/RealEstateListing';

const RealEstate = () => {
    const navLinks = [
        { title: 'Real Estate', href: '/real-estate' },
        { title: 'Insurance', href: '/insurance' },
        { title: 'Mutual Fund', href: '/mutual-fund' },
      ];
  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar links={navLinks}/>
      <RealEstateListings/>
      <CallToAction/>
            <div className='mt-20'>
               
            <JoinCommunity/>
            </div>
            <Footer />
    </div>
  )
}

export default RealEstate