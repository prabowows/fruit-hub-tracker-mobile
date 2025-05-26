
import React from 'react';
import { Clock, Calendar, FileText, User } from 'lucide-react';

interface EmployeeNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const EmployeeNavigation: React.FC<EmployeeNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'attendance', label: 'Absensi', icon: Clock },
    { id: 'history', label: 'Kegiatan', icon: Calendar },
    { id: 'leave', label: 'Problem', icon: FileText },
    { id: 'profile', label: 'Lokasi', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-fruithub-primary bg-fruithub-light' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeNavigation;
