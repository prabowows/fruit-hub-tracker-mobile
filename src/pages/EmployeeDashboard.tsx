
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import EmployeeNavigation from '@/components/EmployeeNavigation';
import ClockInOut from '@/components/ClockInOut';
import AttendanceHistory from '@/components/AttendanceHistory';
import LeaveManagement from '@/components/LeaveManagement';
import ProfileSettings from '@/components/ProfileSettings';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('attendance');

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <ClockInOut />;
      case 'history':
        return <AttendanceHistory />;
      case 'leave':
        return <LeaveManagement />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <ClockInOut />;
    }
  };

  return (
    <div className="min-h-screen bg-fruithub-light">
      {/* Header */}
      <div className="bg-fruithub-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Selamat Datang,</h1>
            <p className="text-fruithub-light">{user?.name}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{getCurrentTime()}</div>
            <div className="text-sm text-fruithub-light">{getCurrentDate()}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <EmployeeNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default EmployeeDashboard;
