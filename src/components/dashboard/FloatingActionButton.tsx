
import React, { useState } from 'react';
import { Plus, Upload, MessageSquare, Settings, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionButtonProps {
  activeSection: string;
}

export const FloatingActionButton = ({ activeSection }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getActions = () => {
    switch (activeSection) {
      case 'documents':
        return [
          { icon: Upload, label: 'Importer document', color: 'from-blue-500 to-blue-600' },
          { icon: FileText, label: 'Nouveau document', color: 'from-green-500 to-green-600' },
        ];
      case 'conversations':
        return [
          { icon: MessageSquare, label: 'Nouveau message', color: 'from-purple-500 to-purple-600' },
          { icon: Users, label: 'Contact utilisateur', color: 'from-pink-500 to-pink-600' },
        ];
      case 'users':
        return [
          { icon: Users, label: 'Ajouter utilisateur', color: 'from-green-500 to-green-600' },
          { icon: MessageSquare, label: 'Envoyer message', color: 'from-blue-500 to-blue-600' },
        ];
      default:
        return [
          { icon: Upload, label: 'Téléchargement rapide', color: 'from-blue-500 to-blue-600' },
          { icon: MessageSquare, label: 'Test message', color: 'from-purple-500 to-purple-600' },
          { icon: Settings, label: 'Paramètres rapides', color: 'from-gray-500 to-gray-600' },
        ];
    }
  };

  const actions = getActions();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-700 border border-gray-200">
                {action.label}
              </span>
              <Button
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} hover:scale-110 transition-all duration-300 shadow-2xl`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <Plus className="w-8 h-8 text-white" />
      </Button>
    </div>
  );
};
