
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Camera, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ClockInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [lastAction, setLastAction] = useState<'in' | 'out' | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [workingHours, setWorkingHours] = useState('8 Jam 0 Menit');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    return () => clearInterval(timer);
  }, []);

  const handleClockAction = async (action: 'in' | 'out') => {
    setIsClockingIn(true);

    try {
      // Simulate GPS and camera verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      const actionText = action === 'in' ? 'Masuk' : 'Keluar';
      const time = currentTime.toLocaleTimeString('id-ID');
      
      setLastAction(action);
      
      toast({
        title: `Absen ${actionText} Berhasil`,
        description: `Tercatat pada ${time}`,
      });

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

  return (
    <div className="p-4 space-y-6">
      {/* Time Display */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-4xl font-bold text-fruithub-primary">
            {currentTime.toLocaleTimeString('id-ID')}
          </div>
          <div className="text-gray-600 mt-2">
            {currentTime.toLocaleDateString('id-ID', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-fruithub-accent mx-auto mb-2" />
            <div className="text-sm text-gray-600">Absen Masuk</div>
            <div className="font-semibold text-fruithub-primary">08:20:31</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-fruithub-secondary mx-auto mb-2" />
            <div className="text-sm text-gray-600">Absen Keluar</div>
            <div className="font-semibold text-fruithub-primary">17:40:50</div>
          </CardContent>
        </Card>
      </div>

      {/* Clock In/Out Buttons */}
      <div className="space-y-4">
        <Button
          onClick={() => handleClockAction('in')}
          disabled={isClockingIn || lastAction === 'in'}
          className="w-full h-16 bg-fruithub-accent hover:bg-green-600 text-white font-semibold text-lg rounded-full"
        >
          {isClockingIn ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Memverifikasi...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6" />
              <span>Absen Masuk</span>
            </div>
          )}
        </Button>

        <Button
          onClick={() => handleClockAction('out')}
          disabled={isClockingIn || lastAction !== 'in'}
          className="w-full h-16 bg-fruithub-primary hover:bg-red-800 text-white font-semibold text-lg rounded-full"
        >
          {isClockingIn ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Memverifikasi...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6" />
              <span>Absen Keluar</span>
            </div>
          )}
        </Button>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-fruithub-secondary" />
              <div>
                <div className="text-sm text-gray-600">Lokasi</div>
                <div className="font-semibold">Store Fruithub</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-fruithub-accent" />
              <div>
                <div className="text-sm text-gray-600">Jam Kerja</div>
                <div className="font-semibold">{workingHours}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Ijin tidak hadir
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            Lihat History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClockInOut;
