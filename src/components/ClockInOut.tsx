
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, List } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ClockInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClockAction = async () => {
    setIsClockingIn(true);

    try {
      // Simulate GPS and camera verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      const time = currentTime.toLocaleTimeString('id-ID');
      
      if (isClockedIn) {
        // Clock out
        setIsClockedIn(false);
        toast({
          title: "Absen Keluar Berhasil",
          description: `Tercatat pada ${time}`,
        });
      } else {
        // Clock in
        setIsClockedIn(true);
        toast({
          title: "Absen Masuk Berhasil",
          description: `Tercatat pada ${time}`,
        });
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal melakukan absensi",
        variant: "destructive",
      });
    } finally {
      setIsClockingIn(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-white p-6 flex flex-col">
      {/* Time and Date Section */}
      <div className="text-center mt-8 mb-16">
        <div className="text-6xl font-light text-gray-800 mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-gray-500 text-lg">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Main Attendance Button */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <Button
            onClick={handleClockAction}
            disabled={isClockingIn}
            className={`w-64 h-64 rounded-full ${
              isClockedIn 
                ? 'bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800' 
                : 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700'
            } shadow-2xl border-0 transition-all duration-300 transform hover:scale-105`}
          >
            {isClockingIn ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                <span className="text-white font-semibold text-lg">Memverifikasi...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {/* Pointing Hand Icon */}
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-white mb-4"
                >
                  <path 
                    d="M8 11V7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7V11M8 11L8.5 16C8.5 17.3807 9.61929 18.5 11 18.5H13C14.3807 18.5 15.5 17.3807 15.5 16L16 11M8 11H6.5C5.67157 11 5 10.3284 5 9.5C5 8.67157 5.67157 8 6.5 8H8M16 11H17.5C18.3284 11 19 10.3284 19 9.5C19 8.67157 18.3284 8 17.5 8H16M12 11V9C12 7.89543 12.8954 7 14 7C15.1046 7 16 7.89543 16 9V11M10 11V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V11" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-white font-semibold text-xl">
                  {isClockedIn ? 'Absen Keluar' : 'Absen Masuk'}
                </span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-center space-x-8 mb-8">
        <div className="flex flex-col items-center">
          <Button
            variant="outline"
            size="icon"
            className="w-20 h-20 rounded-full bg-white border-red-200 hover:bg-red-50 shadow-lg"
          >
            <Minus className="h-8 w-8 text-red-500" />
          </Button>
          <span className="text-sm text-gray-600 mt-2">Ijin tidak hadir</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Button
            variant="outline"
            size="icon"
            className="w-20 h-20 rounded-full bg-white border-orange-200 hover:bg-orange-50 shadow-lg"
          >
            <List className="h-8 w-8 text-orange-500" />
          </Button>
          <span className="text-sm text-gray-600 mt-2">Lihat History</span>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
