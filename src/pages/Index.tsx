
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
        
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
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
