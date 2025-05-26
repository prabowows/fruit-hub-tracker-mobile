
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Calendar, TrendingUp, Settings, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { title: 'Total Karyawan', value: '24', icon: Users, color: 'text-fruithub-primary' },
    { title: 'Hadir Hari Ini', value: '22', icon: Clock, color: 'text-fruithub-accent' },
    { title: 'Pengajuan Cuti', value: '3', icon: Calendar, color: 'text-fruithub-secondary' },
    { title: 'Tingkat Kehadiran', value: '95%', icon: TrendingUp, color: 'text-green-600' },
  ];

  const recentActivities = [
    { employee: 'Sarah Johnson', action: 'Clock In', time: '08:15', status: 'success' },
    { employee: 'John Doe', action: 'Clock Out', time: '17:30', status: 'success' },
    { employee: 'Mike Wilson', action: 'Leave Request', time: '14:20', status: 'pending' },
    { employee: 'Anna Smith', action: 'Clock In', time: '08:45', status: 'late' },
  ];

  return (
    <div className="min-h-screen bg-fruithub-light">
      {/* Header */}
      <div className="bg-fruithub-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <p className="text-fruithub-light">Selamat datang, {user?.name}</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-fruithub-primary"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                    <div>
                      <div className="text-2xl font-bold text-fruithub-primary">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button className="bg-fruithub-primary hover:bg-red-800">
              <Users className="h-4 w-4 mr-2" />
              Kelola Karyawan
            </Button>
            <Button className="bg-fruithub-secondary hover:bg-orange-600">
              <Calendar className="h-4 w-4 mr-2" />
              Approve Cuti
            </Button>
            <Button className="bg-fruithub-accent hover:bg-green-600">
              <Clock className="h-4 w-4 mr-2" />
              Laporan Absen
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Pengaturan
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <div className="font-semibold text-fruithub-primary">{activity.employee}</div>
                  <div className="text-sm text-gray-600">{activity.action}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{activity.time}</div>
                  <Badge 
                    className={
                      activity.status === 'success' ? 'bg-fruithub-accent' :
                      activity.status === 'pending' ? 'bg-fruithub-secondary' :
                      'bg-red-500'
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Sistem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Total Pengguna Aktif</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between">
              <span>Database Status</span>
              <Badge className="bg-fruithub-accent">Online</Badge>
            </div>
            <div className="flex justify-between">
              <span>Last Backup</span>
              <span className="font-semibold">2 jam lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
