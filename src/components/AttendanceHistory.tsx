
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, TrendingUp } from 'lucide-react';

const AttendanceHistory = () => {
  const attendanceData = [
    {
      date: '23 September 2021',
      clockIn: '08:20:31',
      clockOut: '17:40:50',
      status: 'approved',
      workHours: '8 Jam 50 Menit',
      location: 'Store Fruithub'
    },
    {
      date: '22 September 2021',
      clockIn: '08:15:20',
      clockOut: '17:30:15',
      status: 'approved',
      workHours: '8 Jam 45 Menit',
      location: 'Store Fruithub'
    },
    {
      date: '21 September 2021',
      clockIn: '08:25:45',
      clockOut: '17:35:30',
      status: 'approved',
      workHours: '8 Jam 40 Menit',
      location: 'Store Fruithub'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-fruithub-accent text-white">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-fruithub-secondary text-white">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-fruithub-accent mx-auto mb-2" />
            <div className="text-sm text-gray-600">Bulan Ini</div>
            <div className="font-bold text-fruithub-primary">22 Hari</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-fruithub-secondary mx-auto mb-2" />
            <div className="text-sm text-gray-600">Total Jam</div>
            <div className="font-bold text-fruithub-primary">176 Jam</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detail Rekap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {attendanceData.map((record, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-fruithub-primary">{record.date}</div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {record.location}
                  </div>
                </div>
                {getStatusBadge(record.status)}
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Absen Masuk</div>
                  <div className="font-semibold text-fruithub-accent">{record.clockIn}</div>
                </div>
                <div>
                  <div className="text-gray-600">Absen Keluar</div>
                  <div className="font-semibold text-fruithub-primary">{record.clockOut}</div>
                </div>
                <div>
                  <div className="text-gray-600">Jam Kerja</div>
                  <div className="font-semibold">{record.workHours}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ringkasan Bulanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-primary">95%</div>
              <div className="text-sm text-gray-600">Kehadiran</div>
            </div>
            <div className="text-center p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-secondary">2</div>
              <div className="text-sm text-gray-600">Hari Cuti</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceHistory;
