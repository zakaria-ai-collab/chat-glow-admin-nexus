
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { UsersSection } from '@/components/dashboard/UsersSection';
import { ConversationsSection } from '@/components/dashboard/ConversationsSection';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { DocumentsSection } from '@/components/dashboard/DocumentsSection';
import { ExportSection } from '@/components/dashboard/ExportSection';
import { SettingsSection } from '@/components/dashboard/SettingsSection';
import Login from './Login';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'users':
        return <UsersSection />;
      case 'conversations':
        return <ConversationsSection />;
      case 'documents':
        return <DocumentsSection />;
      case 'export':
        return <ExportSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <div className="flex w-full">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <TopNav onLogout={handleLogout} />
          
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Bienvenue sur votre espace de gestion WhatsApp
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez vos conversations, utilisateurs et documents en toute simplicité
              </p>
            </div>
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
