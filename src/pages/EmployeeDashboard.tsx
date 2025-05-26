
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
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-white">
      {/* Header with Status Bar */}
      <div className="bg-transparent p-4 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg text-gray-800">Selamat Datang,</h1>
            <p className="text-2xl font-semibold text-gray-900">{user?.name || 'Muhammad'}</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">
              {user?.name?.charAt(0) || 'M'}
            </span>
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
