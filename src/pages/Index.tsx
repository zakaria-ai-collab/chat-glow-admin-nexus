
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { UsersSection } from '@/components/dashboard/UsersSection';
import { ConversationsSection } from '@/components/dashboard/ConversationsSection';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { DocumentsSection } from '@/components/dashboard/DocumentsSection';
import { FloatingActionButton } from '@/components/dashboard/FloatingActionButton';

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      case 'knowledge':
        return (
          <div className="p-8 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Base de connaissances
            </h2>
            <p className="text-gray-600">Section en cours de développement...</p>
          </div>
        );
      case 'test':
        return (
          <div className="p-8 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Zone de test
            </h2>
            <p className="text-gray-600">Interface de test des prompts en cours de développement...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Paramètres système
            </h2>
            <p className="text-gray-600">Panel de configuration en cours de développement...</p>
          </div>
        );
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 w-full">
      <div className="flex w-full">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
          <TopNav />
          
          <main className="p-6 animate-fade-in">
            {renderActiveSection()}
          </main>
        </div>
      </div>
      
      <FloatingActionButton activeSection={activeSection} />
    </div>
  );
};

export default Index;
