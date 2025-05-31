
import React, { useState } from 'react';
import { Bell, Search, User, Moon, Sun, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const TopNav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-purple-200/50 px-6 py-4 sticky top-0 z-30 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Global Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
            <input
              type="text"
              placeholder="Recherche globale..."
              className="pl-10 pr-4 py-2 w-64 bg-white/70 border-2 border-purple-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all shadow-md"
            />
          </div>
          
          {/* Dark Mode Toggle */}
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            size="icon"
            className="relative p-2 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </Button>
          
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative p-2 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Bell className="w-5 h-5 text-purple-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {notifications}
              </span>
            )}
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative p-2 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white/95 backdrop-blur-lg border-2 border-purple-200/50 shadow-2xl rounded-2xl"
            >
              <div className="px-4 py-3 border-b border-purple-200/50">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-600">admin@whatsapp-rag.com</p>
              </div>
              <DropdownMenuItem className="p-3 hover:bg-purple-50 cursor-pointer">
                <User className="w-4 h-4 mr-3 text-purple-600" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 hover:bg-purple-50 cursor-pointer">
                <Settings className="w-4 h-4 mr-3 text-purple-600" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-purple-200/50" />
              <DropdownMenuItem className="p-3 hover:bg-red-50 cursor-pointer text-red-600">
                <LogOut className="w-4 h-4 mr-3" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
