import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';

const Navbar = ({ links = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const links = ['Real Estate', 'Insurance', 'Mutual Fund'];

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-black px-6 py-4 pt-8 top-0 w-full z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img src={logo} alt="MyInvestoryy Logo" className="h-8 w-auto" />
            </a>
          </div>


          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 text-white text-lg font-light">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-[#54A175] transition"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Hamburger Icon */}
          <button
            className={`md:hidden w-10 h-10 flex items-center justify-center transition-all ${menuOpen ? 'bg-white text-black rounded-sm' : 'text-white'
              }`}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50  bg-opacity-80 flex items-end justify-center">
          <div className="w-full bg-black border border-white rounded-lg p-6 pb-10 animate-slide-up">
            {/* Close Button and Logo */}
            {/* Close Button and Logo */}
            <div className="flex justify-between items-center mb-6">
              <a href="/">
                <img src={logo} alt="MyInvestoryy Logo" className="h-10 w-auto" />
              </a>
              <button onClick={() => setMenuOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>


            {/* Drawer Links */}
            <div className="space-y-6 text-white text-xl font-light">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:text-[#54A175] transition block"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            {/* <div className="mt-10">
              <button className="w-full bg-[#5EB983] text-white py-3 rounded-md text-lg font-medium">
                My Investment
              </button>
            </div> */}
          </div>
        </div>
      )}

      {/* Drawer Animation */}
      <style>
        {`
          @keyframes slide-up {
            0% { transform: translateY(100%); }
            100% { transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out forwards;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
