import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import LegacyCards from '../components/LegacyCards'
import AwardsSection from '../components/AwardSection'
import JoinCommunity from '../components/JoinCommunity'
import Navbar from '../components/Navbar'
import InvestmentForm from '../components/InvestmentForm'

const Personalized = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navLinks = [
    { title: 'Home', href: '/' },
    // { title: 'Real Estate', href: '/real-estate' },
    // { title: 'Insurance', href: '/insurance' },
    // { title: 'Mutual Fund', href: '/mutual-fund' },
  ];


  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar links={navLinks}/>
      <InvestmentForm/>
           
            <div className='mt-20'>
            <JoinCommunity/>
            </div>
            <Footer />



    </div>
  )
}

export default Personalized