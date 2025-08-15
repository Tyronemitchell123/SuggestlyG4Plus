import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Globe,
  Palette,
  FileText,
  ArrowLeft,
  Save,
  X,
  Settings,
} from 'lucide-react';
import { useSiteManager } from '../hooks/useSiteManager';
import toast from 'react-hot-toast';
import SettingsPanel from './SettingsPanel';

const SiteManager = () => {
  const { sites, addSite, updateSite, deleteSite } = useSiteManager();
  const [isAddingSite, setIsAddingSite] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState({
    language: 'en',
    timezone: 'UTC',
    theme: 'light',
    autoSave: true,
    emailNotifications: true,
    pushNotifications: false,
    analytics: true,
    debugMode: false,
  });
  // const navigate = useNavigate();

  const handleAddSite = siteData => {
    try {
      const newSite = addSite(siteData);
      setIsAddingSite(false);
      toast.success(`Site "${newSite.name}" created successfully!`);
    } catch (error) {
      toast.error('Failed to create site');
    }
  };

  const handleUpdateSite = (siteId, updates) => {
    try {
      updateSite(siteId, updates);
      setEditingSite(null);
      toast.success('Site updated successfully!');
    } catch (error) {
      toast.error('Failed to update site');
    }
  };

  const handleDeleteSite = (siteId, siteName) => {
    if (window.confirm(`Are you sure you want to delete "${siteName}"?`)) {
      try {
        deleteSite(siteId);
        toast.success(`Site "${siteName}" deleted successfully!`);
      } catch (error) {
        toast.error('Failed to delete site');
      }
    }
  };

  const handlePreviewSite = site => {
    // Navigate to the site's path for preview
    window.open(site.path, '_blank');
  };

  const handleSaveSettings = async newSettings => {
    setGlobalSettings(newSettings);
    // Save to localStorage
    localStorage.setItem(
      'suggestly_global_settings',
      JSON.stringify(newSettings)
    );
  };

  return (
    <>
      <Helmet>
        <title>Site Manager - SUGGESTLY ELITE</title>
        <meta name="description" content="Manage your hosted websites" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={20} />
                  <span>Back to Platform</span>
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Site Manager
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => setIsAddingSite(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add New Site</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <SitesList
                  sites={sites}
                  onEdit={setEditingSite}
                  onDelete={handleDeleteSite}
                  onPreview={handlePreviewSite}
                />
              }
            />
            <Route
              path="/add"
              element={
                <SiteForm
                  onSubmit={handleAddSite}
                  onCancel={() => setIsAddingSite(false)}
                  mode="add"
                />
              }
            />
            <Route
              path="/edit/:siteId"
              element={
                <SiteForm
                  onSubmit={handleUpdateSite}
                  onCancel={() => setEditingSite(null)}
                  mode="edit"
                  site={editingSite}
                />
              }
            />
          </Routes>

          {/* Add Site Modal */}
          {isAddingSite && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <SiteForm
                  onSubmit={handleAddSite}
                  onCancel={() => setIsAddingSite(false)}
                  mode="add"
                />
              </div>
            </div>
          )}

          {/* Edit Site Modal */}
          {editingSite && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <SiteForm
                  onSubmit={handleUpdateSite}
                  onCancel={() => setEditingSite(null)}
                  mode="edit"
                  site={editingSite}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={globalSettings}
        onSave={handleSaveSettings}
        title="Site Manager Settings"
      />
    </>
  );
};

const SitesList = ({ sites, onEdit, onDelete, onPreview }) => {
  if (sites.length === 0) {
    return (
      <div className="text-center py-12">
        <Globe size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sites yet</h3>
        <p className="text-gray-500 mb-6">
          Create your first website to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map(site => (
        <SiteCard
          key={site.id}
          site={site}
          onEdit={() => onEdit(site)}
          onDelete={() => onDelete(site.id, site.name)}
          onPreview={() => onPreview(site)}
        />
      ))}
    </div>
  );
};

const SiteCard = ({ site, onEdit, onDelete, onPreview }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {site.name}
            </h3>
            <p className="text-sm text-gray-500">{site.theme} theme</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onPreview}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Preview site"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
              title="Edit site"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete site"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe size={14} />
            <span>{site.subdomain}.suggestlyg4plus.io</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText size={14} />
            <span>{site.path}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Palette size={14} />
            <span>Primary: {site.settings?.primaryColor}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Created: {new Date(site.createdAt).toLocaleDateString()}
            </span>
            <span>
              Updated: {new Date(site.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SiteForm = ({ onSubmit, onCancel, mode, site }) => {
  const [formData, setFormData] = useState({
    name: site?.name || '',
    subdomain: site?.subdomain || '',
    path: site?.path || '',
    theme: site?.theme || 'modern',
    content: {
      title: site?.content?.title || '',
      description: site?.content?.description || '',
      sections: site?.content?.sections || [],
    },
    settings: {
      primaryColor: site?.settings?.primaryColor || '#3b82f6',
      secondaryColor: site?.settings?.secondaryColor || '#1e40af',
      fontFamily: site?.settings?.fontFamily || 'Inter',
      enableAnalytics: site?.settings?.enableAnalytics ?? true,
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (mode === 'edit') {
      onSubmit(site.id, formData);
    } else {
      onSubmit(formData);
    }
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [
          ...prev.content.sections,
          {
            type: 'hero',
            title: '',
            subtitle: '',
            content: '',
          },
        ],
      },
    }));
  };

  const updateSection = (index, updates) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map((section, i) =>
          i === index ? { ...section, ...updates } : section
        ),
      },
    }));
  };

  const removeSection = index => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {mode === 'add' ? 'Add New Site' : 'Edit Site'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subdomain
          </label>
          <input
            type="text"
            value={formData.subdomain}
            onChange={e =>
              setFormData(prev => ({ ...prev, subdomain: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="my-site"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Path
          </label>
          <input
            type="text"
            value={formData.path}
            onChange={e =>
              setFormData(prev => ({ ...prev, path: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/my-site"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={formData.theme}
            onChange={e =>
              setFormData(prev => ({ ...prev, theme: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="classic">Classic</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Title
        </label>
        <input
          type="text"
          value={formData.content.title}
          onChange={e =>
            setFormData(prev => ({
              ...prev,
              content: { ...prev.content, title: e.target.value },
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.content.description}
          onChange={e =>
            setFormData(prev => ({
              ...prev,
              content: { ...prev.content, description: e.target.value },
            }))
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Page Sections
          </label>
          <button
            type="button"
            onClick={addSection}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus size={16} />
            <span>Add Section</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.content.sections.map((section, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">
                  Section {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={section.type}
                    onChange={e =>
                      updateSection(index, { type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="hero">Hero</option>
                    <option value="about">About</option>
                    <option value="projects">Projects</option>
                    <option value="posts">Posts</option>
                    <option value="contact">Contact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={e =>
                      updateSection(index, { title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={section.subtitle}
                    onChange={e =>
                      updateSection(index, { subtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={section.content}
                    onChange={e =>
                      updateSection(index, { content: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Site Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={formData.settings.primaryColor}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, primaryColor: e.target.value },
                }))
              }
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <input
              type="color"
              value={formData.settings.secondaryColor}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    secondaryColor: e.target.value,
                  },
                }))
              }
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={formData.settings.fontFamily}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, fontFamily: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Playfair Display">Playfair Display</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableAnalytics"
              checked={formData.settings.enableAnalytics}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  settings: {
                    ...prev.settings,
                    enableAnalytics: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="enableAnalytics"
              className="ml-2 block text-sm text-gray-900"
            >
              Enable Analytics
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save size={16} />
          <span>{mode === 'add' ? 'Create Site' : 'Update Site'}</span>
        </button>
      </div>
    </form>
  );
};

export default SiteManager;
