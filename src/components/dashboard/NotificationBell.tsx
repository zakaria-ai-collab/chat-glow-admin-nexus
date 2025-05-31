
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const notifications = [
  { id: 1, message: 'New document uploaded: Manual_2024.pdf', time: '2 min ago', type: 'upload' },
  { id: 2, message: 'Fallback response triggered for user +33612345678', time: '5 min ago', type: 'error' },
  { id: 3, message: 'User Ahmed Bennani sent 5 new messages', time: '10 min ago', type: 'message' },
  { id: 4, message: 'Document processing completed', time: '15 min ago', type: 'success' },
];

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800">
              <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
        <div className="p-3 border-t">
          <Button variant="outline" size="sm" className="w-full">
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
