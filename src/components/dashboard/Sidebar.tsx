
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText, 
  Menu,
  Bot,
  Settings,
  Database,
  TestTube
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3, badge: null },
  { id: 'users', label: 'Utilisateurs & Clients', icon: Users, badge: 234 },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare, badge: 12 },
  { id: 'documents', label: 'Documents', icon: FileText, badge: 5 },
  { id: 'knowledge', label: 'Base de connaissances', icon: Database, badge: null },
  { id: 'test', label: 'Zone de test', icon: TestTube, badge: null },
  { id: 'settings', label: 'Paramètres', icon: Settings, badge: null },
];

export const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-purple-200/50 shadow-2xl transition-all duration-300 z-40",
      collapsed ? "w-20" : "w-72"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  WhatsApp RAG
                </h2>
                <p className="text-xs text-gray-500 font-medium">Admin Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-3 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 group"
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
                  "w-full flex items-center rounded-2xl transition-all duration-200 group relative overflow-hidden",
                  collapsed ? "p-4 justify-center" : "p-4 space-x-4",
                  isActive 
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 shadow-xl shadow-purple-100/50 scale-105 border-2 border-purple-300/50" 
                    : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-600 hover:text-purple-600 hover:scale-102"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full" />
                )}
                
                <div className="relative flex items-center">
                  <Icon className={cn(
                    "transition-all duration-200 flex-shrink-0",
                    collapsed ? "w-7 h-7" : "w-6 h-6",
                    isActive ? "text-purple-600 drop-shadow-sm" : "group-hover:text-purple-600"
                  )} />
                  
                  {/* Badge for notifications */}
                  {item.badge && !collapsed && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                
                {!collapsed && (
                  <div className="flex-1 text-left flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm block">{item.label}</span>
                      {isActive && (
                        <div className="w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1 opacity-70" />
                      )}
                    </div>
                    {item.badge && (
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-4 px-4 py-2 bg-gray-900/90 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-2xl backdrop-blur-sm">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900/90" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
