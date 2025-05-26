
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
      "fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-purple-100/50 shadow-xl transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                WhatsApp RAG
              </h2>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 shadow-md" 
                    : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50/30 text-gray-600 hover:text-purple-600"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-purple-600" : "group-hover:text-purple-600"
                )} />
                {!collapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
