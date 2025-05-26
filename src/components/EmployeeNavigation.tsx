
import React from 'react';
import { Clock, Calendar, FileText, MapPin } from 'lucide-react';

interface EmployeeNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const EmployeeNavigation: React.FC<EmployeeNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'attendance', label: 'Absensi', icon: Clock },
    { id: 'history', label: 'Kegiatan', icon: Calendar },
    { id: 'leave', label: 'Problem', icon: FileText },
    { id: 'profile', label: 'Lokasi', icon: MapPin },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 px-4 py-3 rounded-t-3xl">
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
                  ? 'text-orange-400' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeNavigation;
