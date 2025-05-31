
import React, { useState } from 'react';
import { FileText, Upload, Eye, Trash2, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const documents = [
  {
    id: 1,
    name: 'Product_Catalog_2024.pdf',
    type: 'PDF',
    uploadDate: '2024-01-15',
    origin: 'manual',
    size: '2.4 MB',
    content: 'Complete product catalog for 2024 including new products, prices and technical specifications...'
  },
  {
    id: 2,
    name: 'Return_Policy.pdf',
    type: 'PDF',
    uploadDate: '2024-01-10',
    origin: 'email',
    size: '856 KB',
    content: 'Company return and exchange policy. General conditions, deadlines and procedures...'
  },
  {
    id: 3,
    name: 'User_Manual.docx',
    type: 'DOCX',
    uploadDate: '2024-01-08',
    origin: 'manual',
    size: '1.2 MB',
    content: 'Comprehensive user manual with step-by-step instructions...'
  }
];

const originColors = {
  manual: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  email: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

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
      console.log('File dropped:', e.dataTransfer.files[0]);
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
        console.log('File selected:', file);
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
          Document Management
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
            Drag and drop your documents here
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">or click to select files</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Supported formats: PDF, DOCX, TXT, Images (PNG, JPG)
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search documents..."
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
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Document</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Upload Date</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Origin</th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Details</th>
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
                          <div className="font-semibold text-gray-900 dark:text-white">{doc.name}</div>
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
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${originColors[doc.origin]}`}>
                        {doc.origin === 'manual' ? 'Manual' : 'Email'}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleExpanded(doc.id)}
                      >
                        {expandedDocs.includes(doc.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        Details
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
                      <td colSpan={6} className="p-4 bg-gray-50 dark:bg-gray-900">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Extracted Content:</h4>
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
          <div className="text-gray-600 dark:text-gray-400">Total Documents</div>
        </div>
      </div>
    </div>
  );
};
