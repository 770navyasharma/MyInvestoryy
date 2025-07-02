import React from 'react';
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#231F20] text-white text-center">
      <div className="py-4 md:py-6 px-2 md:px-4">
        {/* <div className="flex justify-center flex-wrap gap-x-4 md:gap-x-10 gap-y-2 md:gap-y-3 text-sm md:text-lg mb-3 md:mb-4">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Real Estate</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Insurance</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Mutual Fund</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">About</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Articles</span>
        </div> */}
        <div className="flex justify-center gap-4 md:gap-6">
  <a
    href="https://www.instagram.com/myinvestoryy?utm_source=qr&igsh=MXZ2bHBnODhneDM1Mw=="
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram size={20} className="hover:text-gray-300 cursor-pointer" />
  </a>
  <a
    href="https://www.facebook.com/share/1BN89mefZ4/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaFacebook size={20} className="hover:text-gray-300 cursor-pointer" />
  </a>
</div>

      </div>
      {/* White horizontal line */}
      <div className="border-t border-white w-full"></div>
      
    </div>
  );
};

export default Footer;