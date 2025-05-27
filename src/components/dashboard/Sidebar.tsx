
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText, 
  Menu,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'users', label: 'Users & Clients', icon: Users },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'documents', label: 'Documents', icon: FileText },
];

export const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white/90 backdrop-blur-xl border-r border-purple-100/50 shadow-xl transition-all duration-300 z-40",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  WhatsApp RAG
                </h2>
                <p className="text-xs text-gray-500 font-medium">Admin Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2.5 hover:bg-purple-50 rounded-xl transition-all duration-200 hover:scale-105 group"
          >
            <Menu className={cn(
              "transition-all duration-200 text-gray-600 group-hover:text-purple-600",
              collapsed ? "w-6 h-6" : "w-5 h-5"
            )} />
          </button>
        </div>

        <nav className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center rounded-xl transition-all duration-200 group relative overflow-hidden",
                  collapsed ? "p-3 justify-center" : "p-3 space-x-4",
                  isActive 
                    ? "bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-purple-700 shadow-lg shadow-purple-100/50 scale-105" 
                    : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50/50 text-gray-600 hover:text-purple-600 hover:scale-102"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
                )}
                
                <Icon className={cn(
                  "transition-all duration-200 flex-shrink-0",
                  collapsed ? "w-7 h-7" : "w-6 h-6",
                  isActive ? "text-purple-600 drop-shadow-sm" : "group-hover:text-purple-600"
                )} />
                
                {!collapsed && (
                  <div className="flex-1 text-left">
                    <span className="font-medium text-sm truncate block">{item.label}</span>
                    {isActive && (
                      <div className="w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-1 opacity-70" />
                    )}
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Status indicator */}
        {!collapsed && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-xs font-medium text-gray-700">System Status</p>
                <p className="text-xs text-green-600 font-semibold">All services online</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
