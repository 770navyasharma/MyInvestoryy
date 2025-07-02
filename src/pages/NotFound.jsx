import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Modern404Page = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center px-4 select-none relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full bg-pink-500 opacity-10 blur-3xl"
          style={{
            top: '10%',
            left: '60%',
            transform: `translate(${position.x * 20}px, ${position.y * 20}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"
          style={{
            top: '60%',
            left: '20%',
            transform: `translate(${-position.x * 30}px, ${-position.y * 30}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* Card */}
      <div className="relative z-10 max-w-xl w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
        <div className="flex justify-center mb-6 relative">
          <svg 
            viewBox="0 0 400 120" 
            className="w-full h-auto max-w-md"
            style={{
              transform: `rotate(${position.x * 2}deg) translateY(${position.y * 5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle"
              fill="url(#gradient)"
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.3"
              fontSize="80"
              fontWeight="bold"
              letterSpacing="2"
            >
              404
            </text>
            <text 
              x="50%" 
              y="85" 
              dominantBaseline="middle" 
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              letterSpacing="3"
            >
              PAGE NOT FOUND
            </text>
          </svg>

          {/* Decoration */}
          <div className="absolute -top-4 -right-4 w-16 h-16">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-70">
              <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 3" fill="none" />
              <circle cx="50" cy="50" r="20" stroke="#ffffff" strokeWidth="1" fill="none" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -left-4 w-12 h-12">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-70">
              <rect x="20" y="20" width="60" height="60" stroke="#ffffff" strokeWidth="1" fill="none" transform="rotate(45 50 50)" />
            </svg>
          </div>
        </div>

        <div className="text-center text-white mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Looks like you're lost</h1>
          <p className="text-white/70 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 backdrop-blur-sm"
            onClick={() => navigate(-1)} // 🔙 Go Back
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
          <button 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all shadow-lg shadow-purple-500/20"
            onClick={() => navigate("/")} // 🏠 Go Home
          >
            <Home size={18} />
            <span>Home Page</span>
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} • Investoryy
        </div>
      </div>
    </div>
  );
};

export default Modern404Page;
