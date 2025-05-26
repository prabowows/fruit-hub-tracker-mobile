
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Show content with animation after component mounts
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Auto-navigate after 5 seconds
    const autoTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(contentTimer);
      clearTimeout(autoTimer);
    };
  }, [onComplete]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Status Bar */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-12 pb-4">
        <span className="text-white font-medium text-lg">
          {formatTime(currentTime)}
        </span>
        <div className="flex items-center space-x-1">
          {/* Signal Icon */}
          <div className="flex space-x-1">
            <div className="w-1 h-2 bg-white rounded"></div>
            <div className="w-1 h-3 bg-white rounded"></div>
            <div className="w-1 h-4 bg-white rounded"></div>
            <div className="w-1 h-5 bg-white rounded"></div>
          </div>
          {/* WiFi Icon */}
          <svg className="w-5 h-5 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          {/* Battery Icon */}
          <svg className="w-6 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.67 4H14V2c0-0.55-0.45-1-1-1s-1 0.45-1 1v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c0.74 0 1.34-0.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8">
        {/* Logo Container */}
        <div className={`transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="w-32 h-32 mx-auto mb-8 relative">
            {/* Circular Background */}
            <div className="w-full h-full bg-gray-800/50 rounded-full flex items-center justify-center backdrop-blur-sm">
              {/* Construction Helmet Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center relative">
                {/* Helmet Shape */}
                <div className="w-16 h-12 bg-gradient-to-b from-orange-300 to-orange-500 rounded-t-full relative">
                  {/* Helmet Band */}
                  <div className="absolute bottom-0 w-full h-3 bg-yellow-400 rounded-sm"></div>
                  {/* Antenna */}
                  <div className="absolute -top-2 left-3 w-1 h-4 bg-yellow-300 rounded-full"></div>
                  <div className="absolute -top-2 right-3 w-1 h-4 bg-yellow-300 rounded-full"></div>
                  {/* Signal Waves */}
                  <div className="absolute -top-1 left-2 w-2 h-1 bg-yellow-200 rounded-full opacity-75"></div>
                  <div className="absolute -top-1 right-2 w-2 h-1 bg-yellow-200 rounded-full opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Title */}
        <div className={`text-center transform transition-all duration-1000 delay-300 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-white text-3xl font-bold mb-4 leading-tight">
            Aplikasi Pengawasan<br />Konstruksi
          </h1>
          <p className="text-gray-300 text-lg mb-16">
            Direktorat Jendral Bina Marga
          </p>
        </div>

        {/* Start Button */}
        <div className={`w-full max-w-sm transform transition-all duration-1000 delay-500 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Button
            onClick={onComplete}
            className="w-full bg-white hover:bg-gray-100 text-orange-500 font-semibold py-4 text-lg rounded-2xl shadow-lg transition-all duration-200 hover:scale-105"
          >
            Mulai Sekarang
          </Button>
        </div>

        {/* Version */}
        <div className={`mt-8 transform transition-all duration-1000 delay-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-gray-400 text-sm">Versi 2.0.4</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
