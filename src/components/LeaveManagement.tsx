
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LeaveManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const leaveApplications = [
    {
      id: 1,
      type: 'Cuti Sakit',
      startDate: '2021-09-25',
      endDate: '2021-09-26',
      reason: 'Demam dan flu',
      status: 'pending',
      submittedDate: '2021-09-23'
    },
    {
      id: 2,
      type: 'Cuti Tahunan',
      startDate: '2021-09-15',
      endDate: '2021-09-17',
      reason: 'Liburan keluarga',
      status: 'approved',
      submittedDate: '2021-09-10'
    }
  ];

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Harap isi semua field yang required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Pengajuan Cuti Berhasil",
      description: "Pengajuan cuti Anda telah dikirim untuk disetujui",
    });

    // Reset form
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setShowForm(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-fruithub-accent text-white">Disetujui</Badge>;
      case 'pending':
        return <Badge className="bg-fruithub-secondary text-white">Menunggu</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Leave Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Saldo Cuti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-primary">12</div>
              <div className="text-sm text-gray-600">Cuti Tahunan</div>
            </div>
            <div className="p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-secondary">5</div>
              <div className="text-sm text-gray-600">Cuti Sakit</div>
            </div>
            <div className="p-4 bg-fruithub-light rounded-lg">
              <div className="text-2xl font-bold text-fruithub-accent">3</div>
              <div className="text-sm text-gray-600">Cuti Khusus</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => setShowForm(true)}
          className="h-16 bg-fruithub-primary hover:bg-red-800 text-white"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajukan Cuti
        </Button>
        <Button
          variant="outline"
          className="h-16 border-fruithub-secondary text-fruithub-secondary hover:bg-fruithub-light"
        >
          <FileText className="h-5 w-5 mr-2" />
          Koreksi Absen
        </Button>
      </div>

      {/* Leave Application Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pengajuan Cuti</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitLeave} className="space-y-4">
              <div>
                <Label htmlFor="leaveType">Jenis Cuti</Label>
                <Select value={leaveType} onValueChange={setLeaveType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis cuti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Cuti Tahunan</SelectItem>
                    <SelectItem value="sick">Cuti Sakit</SelectItem>
                    <SelectItem value="emergency">Cuti Darurat</SelectItem>
                    <SelectItem value="maternity">Cuti Melahirkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Tanggal Selesai</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Alasan</Label>
                <Textarea
                  id="reason"
                  placeholder="Jelaskan alasan pengajuan cuti..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  type="submit"
                  className="flex-1 bg-fruithub-accent hover:bg-green-600"
                >
                  Submit Pengajuan
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leave Applications History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Riwayat Pengajuan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {leaveApplications.map((application) => (
            <div key={application.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-fruithub-primary">{application.type}</div>
                  <div className="text-sm text-gray-600">
                    {application.startDate} - {application.endDate}
                  </div>
                </div>
                {getStatusBadge(application.status)}
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Alasan:</strong> {application.reason}
              </div>
              
              <div className="text-xs text-gray-500">
                Diajukan: {application.submittedDate}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveManagement;
