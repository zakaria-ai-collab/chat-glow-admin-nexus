
import React, { useState } from 'react';
import { Download, FileText, Users, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { exportHistory } from '@/data/mockData';

export const ExportSection = () => {
  const [exportTypes, setExportTypes] = useState<string[]>([]);
  const [format, setFormat] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleExport = () => {
    console.log('Export:', { exportTypes, format, selectedDate });
    // Handle export logic here
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setExportTypes([...exportTypes, type]);
    } else {
      setExportTypes(exportTypes.filter(t => t !== type));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Export de données
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuration d'export</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base mb-3 block">Types de données (sélection multiple)</Label>
              <div className="space-y-2">
                {[
                  { id: 'users', label: 'Utilisateurs & Clients' },
                  { id: 'conversations', label: 'Conversations' },
                  { id: 'documents', label: 'Documents' }
                ].map((type) => (
                  <label key={type.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={exportTypes.includes(type.id)}
                      onChange={(e) => handleTypeChange(type.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="format">Format d'export</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button 
              onClick={handleExport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-base h-12"
              disabled={exportTypes.length === 0 || !format}
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter les données
            </Button>
          </div>
        </div>

        {/* Quick Export Options */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export rapide</h3>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start h-12 text-base">
              <Users className="w-4 h-4 mr-3" />
              Tous les utilisateurs (Excel)
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-12 text-base">
              <MessageCircle className="w-4 h-4 mr-3" />
              Conversations (PDF)
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-12 text-base">
              <FileText className="w-4 h-4 mr-3" />
              Liste des documents (Excel)
            </Button>
          </div>
        </div>
      </div>

      {/* Export History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Historique des exports</h3>
        </div>
        
        <div className="p-4">
          {exportHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Nom du fichier</th>
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Type</th>
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Format</th>
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Date d'export</th>
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exportHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-3 text-gray-900 dark:text-white">{item.fileName}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-400">{item.type}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-400">{item.format}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-400">
                        {new Date(item.exportDate).toLocaleDateString('fr-FR')} à {item.time}
                      </td>
                      <td className="p-3">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-base">
                Aucun export disponible.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
