
import React, { useState } from 'react';
import { FileText, Upload, Eye, Trash2, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { documents } from '@/data/mockData';

export const DocumentsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDocs, setExpandedDocs] = useState<number[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Fichier déposé:', e.dataTransfer.files[0]);
      // Handle file upload logic here
    }
  };

  const handleFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.txt,.png,.jpg,.jpeg';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Fichier sélectionné:', file);
        // Handle file upload logic here
      }
    };
    input.click();
  };

  const toggleExpanded = (docId: number) => {
    setExpandedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gestion des documents
        </h2>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleFileInput}
        className={`p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10'
        }`}
      >
        <div className="text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Glissez-déposez vos documents ici
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">ou cliquez pour sélectionner des fichiers</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-base h-12 px-6">
            <Upload className="w-4 h-4 mr-2" />
            Choisir des fichiers
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Formats supportés: PDF, DOCX, TXT, Images (PNG, JPG)
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher des documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Nom</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Date d'upload</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Détails</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <React.Fragment key={doc.id}>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white text-base">{doc.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{doc.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                        {doc.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleExpanded(doc.id)}
                        className="text-base"
                      >
                        {expandedDocs.includes(doc.id) ? (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-1" />
                        )}
                        Détails
                      </Button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {expandedDocs.includes(doc.id) && (
                    <tr>
                      <td colSpan={5} className="p-4 bg-gray-50 dark:bg-gray-900">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contenu extrait:</h4>
                          <div className="max-h-32 overflow-y-auto text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {doc.content}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{documents.length}</div>
          <div className="text-gray-600 dark:text-gray-400">Documents au total</div>
        </div>
      </div>
    </div>
  );
};
