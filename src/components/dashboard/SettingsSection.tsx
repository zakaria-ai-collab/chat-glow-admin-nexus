
import React, { useState } from 'react';
import { User, Globe, Bell, Monitor, RotateCcw, Shield, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DarkModeToggle } from './DarkModeToggle';

export const SettingsSection = () => {
  const [displayName, setDisplayName] = useState('Administrator');
  const [language, setLanguage] = useState('fr');
  const [notifications, setNotifications] = useState(true);
  const [defaultView, setDefaultView] = useState('overview');
  const [userRole, setUserRole] = useState('admin');

  const handleSaveSettings = () => {
    const settings = {
      displayName,
      language,
      notifications,
      defaultView,
      userRole
    };
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    console.log('Settings saved:', settings);
  };

  const handleResetSettings = () => {
    localStorage.removeItem('adminSettings');
    localStorage.removeItem('darkMode');
    setDisplayName('Administrator');
    setLanguage('fr');
    setNotifications(true);
    setDefaultView('overview');
    setUserRole('admin');
    console.log('Settings reset');
  };

  const handleExportSettings = () => {
    const settings = {
      displayName,
      language,
      notifications,
      defaultView,
      userRole,
      darkMode: localStorage.getItem('darkMode')
    };
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admin-settings.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
              />
            </div>

            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="readonly">Read-only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Application Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <DarkModeToggle />
            </div>

            <div>
              <Label htmlFor="default-view">Default View</Label>
              <Select value={defaultView} onValueChange={setDefaultView}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="conversations">Conversations</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="users">Users & Clients</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* API Keys Management */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-..."
                defaultValue="••••••••••••••••"
              />
            </div>

            <div>
              <Label htmlFor="twilio-key">Twilio API Key</Label>
              <Input
                id="twilio-key"
                type="password"
                placeholder="AC..."
                defaultValue="••••••••••••••••"
              />
            </div>

            <Button variant="outline" className="w-full">
              Update API Keys
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actions</h3>
          </div>
          
          <div className="space-y-3">
            <Button onClick={handleSaveSettings} className="w-full bg-blue-600 hover:bg-blue-700">
              Save Settings
            </Button>
            
            <Button onClick={handleExportSettings} variant="outline" className="w-full">
              Export Settings (JSON)
            </Button>
            
            <Button 
              onClick={handleResetSettings} 
              variant="outline" 
              className="w-full text-red-600 hover:text-red-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
