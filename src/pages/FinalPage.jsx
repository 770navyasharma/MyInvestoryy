import React from 'react'
import Navbar from '../components/Navbar';
import FinalThankYouScreen from '../components/FinalThankYouScreen';
import { useLocation } from 'react-router-dom';
import JoinCommunity from '../components/JoinCommunity';
// FinalPage.js
const FinalPage = () => {
    const location = useLocation();
    const name = location.state?.name || 'User';
    const phone = location.state?.phone || 'phone';

    const navLinks = [
      { title: 'Home', href: '/' },
      { title: 'Real Estate', href: '/real-estate' },
      { title: 'Insurance', href: '/insurance' },
      { title: 'Mutual Fund', href: '/mutual-fund' },
    ];
    return (
        <>
        <div className='bg-black min-h-screen text-white'>
             <Navbar links={navLinks}/>
             <FinalThankYouScreen userName={name} phone={phone} />
            </div>
            <JoinCommunity/>
           </> 
    );
  };
  
  export default FinalPage;
  