
import React, { useState } from 'react';
import { FileText, Upload, Eye, Trash2, RefreshCw, Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const documents = [
  {
    id: 1,
    name: 'Catalogue_Produits_2024.pdf',
    type: 'PDF',
    uploadDate: '2024-01-15',
    chunks: 45,
    status: 'indexed',
    origin: 'manual',
    size: '2.4 MB',
    content: 'Catalogue complet des produits 2024 incluant les nouveautés, les prix et les spécifications techniques...'
  },
  {
    id: 2,
    name: 'Politique_Retours.pdf',
    type: 'PDF',
    uploadDate: '2024-01-10',
    chunks: 12,
    status: 'processing',
    origin: 'email',
    size: '856 KB',
    content: 'Politique de retours et d\'échanges de la société. Conditions générales, délais et procédures...'
  }
];

const statusColors = {
  indexed: 'bg-green-500 text-white',
  processing: 'bg-yellow-500 text-white',
  error: 'bg-red-500 text-white',
  pending: 'bg-gray-500 text-white'
};

const originColors = {
  manual: 'bg-blue-100 text-blue-700 border-blue-300',
  email: 'bg-purple-100 text-purple-700 border-purple-300',
  api: 'bg-green-100 text-green-700 border-green-300'
};

export const DocumentsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
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
      console.log('File dropped:', e.dataTransfer.files[0]);
      // Handle file upload logic here
    }
  };

  const toggleExpanded = (docId: number) => {
    setExpandedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Gestion des Documents
        </h2>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative p-12 border-4 border-dashed rounded-3xl transition-all duration-300 ${
          dragActive 
            ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 scale-105' 
            : 'border-gray-300 bg-white/70 hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
        }`}
      >
        <div className="text-center">
          <Upload className="w-16 h-16 mx-auto mb-6 text-purple-500" />
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Glissez et déposez vos documents ici
          </h3>
          <p className="text-gray-500 mb-6">ou cliquez pour sélectionner des fichiers</p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl">
            <Upload className="w-5 h-5 mr-3" />
            Choisir des fichiers
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            Formats supportés: PDF, DOCX, TXT, Images (PNG, JPG)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-purple-200/50">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative flex-1">
            <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
            <input
              type="text"
              placeholder="Rechercher des documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-4 py-4 w-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all shadow-lg"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="w-6 h-6 text-purple-600" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-lg">
                <SelectValue placeholder="Type de fichier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="docx">Word</SelectItem>
                <SelectItem value="txt">Texte</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="text-left p-6 font-bold">Document</th>
                <th className="text-left p-6 font-bold">Type</th>
                <th className="text-left p-6 font-bold">Date</th>
                <th className="text-left p-6 font-bold">Chunks</th>
                <th className="text-left p-6 font-bold">Statut</th>
                <th className="text-left p-6 font-bold">Origine</th>
                <th className="text-left p-6 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <React.Fragment key={doc.id}>
                  <tr className="border-b border-purple-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleExpanded(doc.id)}
                          className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                          {expandedDocs.includes(doc.id) ? (
                            <ChevronDown className="w-4 h-4 text-purple-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-purple-600" />
                          )}
                        </button>
                        <FileText className="w-8 h-8 text-purple-600" />
                        <div>
                          <div className="font-bold text-gray-800">{doc.name}</div>
                          <div className="text-sm text-gray-500">{doc.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-semibold">
                        {doc.type}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="text-gray-700 font-semibold">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </td>
                    <td className="p-6">
                      <span className="font-bold text-purple-600">{doc.chunks}</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${statusColors[doc.status]}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${originColors[doc.origin]}`}>
                        {doc.origin === 'manual' ? 'Manuel' : doc.origin === 'email' ? 'Email' : 'API'}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {expandedDocs.includes(doc.id) && (
                    <tr>
                      <td colSpan={7} className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-200">
                          <h4 className="font-bold text-gray-800 mb-3">Contenu extrait:</h4>
                          <div className="max-h-40 overflow-y-auto text-gray-700 text-sm leading-relaxed">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-3xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">98</div>
            <div className="text-blue-200">Total Documents</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">1,247</div>
            <div className="text-green-200">Chunks Indexés</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-3xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">5</div>
            <div className="text-purple-200">En traitement</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-3xl shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300 transform text-white">
          <div className="text-center">
            <div className="text-3xl font-bold">2</div>
            <div className="text-orange-200">Erreurs</div>
          </div>
        </div>
      </div>
    </div>
  );
};
