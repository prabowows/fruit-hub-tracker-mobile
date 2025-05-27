
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, MapPin, Phone, Settings, LogOut } from 'lucide-react';

const ProfileSettings = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-fruithub-primary text-white text-xl">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-fruithub-primary">{user?.name}</h2>
              <p className="text-gray-600">{user?.department}</p>
              <Badge className="mt-1 bg-fruithub-accent text-white">
                {user?.role === 'admin' ? 'Administrator' : 'Karyawan'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-fruithub-secondary" />
            <div>
              <div className="text-sm text-gray-600">ID Karyawan</div>
              <div className="font-semibold">{user?.employee_id}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-fruithub-secondary" />
            <div>
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-semibold">{user?.email}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-fruithub-secondary" />
            <div>
              <div className="text-sm text-gray-600">Telepon</div>
              <div className="font-semibold">{user?.phone || '+62 812-3456-7890'}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-fruithub-secondary" />
            <div>
              <div className="text-sm text-gray-600">Alamat</div>
              <div className="font-semibold">{user?.address || 'Jakarta, Indonesia'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ringkasan Kehadiran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-primary">22</div>
              <div className="text-sm text-gray-600">Hari Hadir</div>
            </div>
            <div className="text-center p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-secondary">2</div>
              <div className="text-sm text-gray-600">Hari Cuti</div>
            </div>
            <div className="text-center p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-accent">176</div>
              <div className="text-sm text-gray-600">Total Jam</div>
            </div>
            <div className="text-center p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Kehadiran</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pengaturan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Pengaturan Akun
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
