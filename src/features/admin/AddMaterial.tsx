import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import type { Material, Subject } from '../../types';

interface AddMaterialProps {
  onMaterialAdded: (material: Material, subjectId: string) => void;
  onBack: () => void;
  subjects?: Subject[];
}

const AddMaterial: React.FC<AddMaterialProps> = ({ onMaterialAdded, onBack, subjects = [] }) => {
  const [formData, setFormData] = useState({
    subjectId: '',
    title: '',
    type: 'pdf' as Material['type'],
    url: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const materialTypes: { value: Material['type']; label: string }[] = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'youtube', label: 'YouTube Video' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.subjectId || !formData.title || !formData.url) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // URL validation based on type
    if (formData.type === 'youtube' && !formData.url.includes('youtube.com') && !formData.url.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      setIsSubmitting(false);
      return;
    }

    if (formData.type === 'pdf' && !formData.url.endsWith('.pdf')) {
      setError('Please enter a valid PDF URL');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newMaterial: Material = {
        id: Date.now().toString(),
        title: formData.title,
        type: formData.type,
        url: formData.url,
        description: formData.description,
        uploadDate: new Date().toISOString().split('T')[0],
      };

      onMaterialAdded(newMaterial, formData.subjectId);
      setIsSubmitting(false);
    }, 1000);
  };

  const selectedSubject = subjects?.find(s => s.id === formData.subjectId);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mb-4 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Admin Dashboard</span>
        </motion.button>

        <h1 className="text-3xl font-bold text-white mb-2">Add Study Material</h1>
        <p className="text-gray-400">Upload a new study material for a subject</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="subjectId" className="block text-gray-300 text-sm font-medium mb-2">
                Subject *
              </label>
              <select
                id="subjectId"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select a subject</option>
                {subjects?.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
              {selectedSubject && (
                <p className="mt-1 text-xs text-gray-500">
                  Currently has {selectedSubject.materials?.length || 0} materials
                </p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-gray-300 text-sm font-medium mb-2">
                Material Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              >
                {materialTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">
                Material Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Enter material title"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="url" className="block text-gray-300 text-sm font-medium mb-2">
                {formData.type === 'pdf' ? 'PDF URL' : 'YouTube URL'} *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder={
                  formData.type === 'pdf' 
                    ? 'https://example.com/document.pdf' 
                    : 'https://youtube.com/watch?v=example'
                }
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                {formData.type === 'pdf' 
                  ? 'Enter a direct link to the PDF file' 
                  : 'Enter a YouTube video URL'
                }
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
              placeholder="Enter a brief description of the material"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-900 border border-red-800 rounded-lg"
            >
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          <div className="flex space-x-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Material...
                </div>
              ) : (
                'Add Material'
              )}
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </Card>

      {selectedSubject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Subject Preview</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{selectedSubject.name}</h4>
                <p className="text-gray-400 text-sm">{selectedSubject.code}</p>
                <p className="text-gray-500 text-sm mt-1">Instructor: {selectedSubject.instructor}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{selectedSubject.materials.length + 1}</div>
                <p className="text-gray-400 text-sm">Total Materials</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AddMaterial;
