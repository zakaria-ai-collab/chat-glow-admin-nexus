
import React, { useState } from 'react';
import { Plus, UserPlus, Upload, MessageSquare, X } from 'lucide-react';

interface FloatingActionButtonProps {
  activeSection: string;
}

export const FloatingActionButton = ({ activeSection }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Don't show the FAB on overview section
  if (activeSection === 'overview') {
    return null;
  }

  const getQuickActions = () => {
    switch (activeSection) {
      case 'users':
        return [
          { icon: UserPlus, label: 'Add User', color: 'from-green-400 to-green-500' },
          { icon: Upload, label: 'Import CSV', color: 'from-green-500 to-green-600' },
        ];
      case 'conversations':
        return [
          { icon: MessageSquare, label: 'New Conversation', color: 'from-green-400 to-green-500' },
          { icon: Upload, label: 'Import Data', color: 'from-green-500 to-green-600' },
        ];
      case 'documents':
        return [
          { icon: Upload, label: 'Upload Document', color: 'from-green-400 to-green-500' },
          { icon: Plus, label: 'New Folder', color: 'from-green-500 to-green-600' },
        ];
      default:
        return [
          { icon: UserPlus, label: 'Add User', color: 'from-green-400 to-green-500' },
          { icon: Upload, label: 'Upload Document', color: 'from-green-500 to-green-600' },
        ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Action Buttons */}
      {isOpen && (
        <div className="mb-4 space-y-3 animate-fade-in">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className={`flex items-center justify-end group animate-scale-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity mr-3">
                  {action.label}
                </span>
                <button className={`w-12 h-12 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover-scale flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </div>
  );
};
