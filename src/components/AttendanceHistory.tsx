
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, TrendingUp } from 'lucide-react';
import { useAttendance } from '@/hooks/useAttendance';

const AttendanceHistory = () => {
  const { attendanceHistory, isLoading } = useAttendance();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-fruithub-accent text-white">Hadir</Badge>;
      case 'late':
        return <Badge className="bg-fruithub-secondary text-white">Terlambat</Badge>;
      case 'absent':
        return <Badge variant="destructive">Tidak Hadir</Badge>;
      case 'early_leave':
        return <Badge variant="secondary">Pulang Awal</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '-';
    const time = new Date(timeString);
    return time.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateWorkHours = (clockIn: string | null, clockOut: string | null) => {
    if (!clockIn || !clockOut) return '-';
    
    const start = new Date(clockIn);
    const end = new Date(clockOut);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours} Jam ${diffMinutes} Menit`;
  };

  const getTotalWorkingDays = () => {
    return attendanceHistory.filter(record => record.status === 'present' || record.status === 'late').length;
  };

  const getTotalWorkingHours = () => {
    let totalMinutes = 0;
    attendanceHistory.forEach(record => {
      if (record.clock_in_time && record.clock_out_time) {
        const start = new Date(record.clock_in_time);
        const end = new Date(record.clock_out_time);
        const diffMs = end.getTime() - start.getTime();
        totalMinutes += Math.floor(diffMs / (1000 * 60));
      }
    });
    
    const hours = Math.floor(totalMinutes / 60);
    return `${hours} Jam`;
  };

  const getAttendancePercentage = () => {
    const totalDays = attendanceHistory.length;
    const presentDays = getTotalWorkingDays();
    return totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-fruithub-accent mx-auto mb-2" />
            <div className="text-sm text-gray-600">Bulan Ini</div>
            <div className="font-bold text-fruithub-primary">{getTotalWorkingDays()} Hari</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-fruithub-secondary mx-auto mb-2" />
            <div className="text-sm text-gray-600">Total Jam</div>
            <div className="font-bold text-fruithub-primary">{getTotalWorkingHours()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detail Rekap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {attendanceHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada data absensi
            </div>
          ) : (
            attendanceHistory.map((record) => (
              <div key={record.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-fruithub-primary">
                      {formatDate(record.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      Store Fruithub
                    </div>
                  </div>
                  {getStatusBadge(record.status)}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Absen Masuk</div>
                    <div className="font-semibold text-fruithub-accent">
                      {formatTime(record.clock_in_time)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Absen Keluar</div>
                    <div className="font-semibold text-fruithub-primary">
                      {formatTime(record.clock_out_time)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Jam Kerja</div>
                    <div className="font-semibold">
                      {calculateWorkHours(record.clock_in_time, record.clock_out_time)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
              <div className="text-2xl font-bold text-fruithub-primary">{getAttendancePercentage()}%</div>
              <div className="text-sm text-gray-600">Kehadiran</div>
            </div>
            <div className="text-center p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-secondary">
                {attendanceHistory.filter(r => r.status === 'absent').length}
              </div>
              <div className="text-sm text-gray-600">Hari Tidak Hadir</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceHistory;
