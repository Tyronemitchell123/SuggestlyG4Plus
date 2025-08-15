import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  X,
  Save,
  RefreshCw,
  Palette,
  Font,
  Eye,
  Shield,
  Globe,
  Database,
  Bell,
  User,
  Lock,
  Key,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPanel = ({
  isOpen,
  onClose,
  settings,
  onSave,
  title = 'Settings',
}) => {
  const [localSettings, setLocalSettings] = useState(settings || {});
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(localSettings);
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLocalSettings(settings || {});
    toast.success('Settings reset to defaults');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Privacy', icon: Database },
    { id: 'advanced', label: 'Advanced', icon: Key },
  ];

  const updateSetting = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNestedSetting = (parent, key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Settings className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex h-[calc(90vh-140px)]">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* General Settings */}
                    {activeTab === 'general' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            General Settings
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                              </label>
                              <select
                                value={localSettings.language || 'en'}
                                onChange={e =>
                                  updateSetting('language', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time Zone
                              </label>
                              <select
                                value={localSettings.timezone || 'UTC'}
                                onChange={e =>
                                  updateSetting('timezone', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">
                                  Eastern Time
                                </option>
                                <option value="America/Chicago">
                                  Central Time
                                </option>
                                <option value="America/Denver">
                                  Mountain Time
                                </option>
                                <option value="America/Los_Angeles">
                                  Pacific Time
                                </option>
                                <option value="Europe/London">London</option>
                                <option value="Europe/Paris">Paris</option>
                                <option value="Asia/Tokyo">Tokyo</option>
                              </select>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="autoSave"
                                checked={localSettings.autoSave ?? true}
                                onChange={e =>
                                  updateSetting('autoSave', e.target.checked)
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="autoSave"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Auto-save changes
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === 'appearance' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Appearance
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Theme
                              </label>
                              <select
                                value={localSettings.theme || 'light'}
                                onChange={e =>
                                  updateSetting('theme', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="auto">Auto (System)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Primary Color
                              </label>
                              <input
                                type="color"
                                value={localSettings.primaryColor || '#3b82f6'}
                                onChange={e =>
                                  updateSetting('primaryColor', e.target.value)
                                }
                                className="w-full h-10 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Font Size
                              </label>
                              <select
                                value={localSettings.fontSize || 'medium'}
                                onChange={e =>
                                  updateSetting('fontSize', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Security
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  Two-Factor Authentication
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Add an extra layer of security to your account
                                </p>
                              </div>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Enable
                              </button>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="sessionTimeout"
                                checked={localSettings.sessionTimeout ?? true}
                                onChange={e =>
                                  updateSetting(
                                    'sessionTimeout',
                                    e.target.checked
                                  )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="sessionTimeout"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Auto-logout after inactivity
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Notifications
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="emailNotifications"
                                checked={
                                  localSettings.emailNotifications ?? true
                                }
                                onChange={e =>
                                  updateSetting(
                                    'emailNotifications',
                                    e.target.checked
                                  )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="emailNotifications"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Email notifications
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="pushNotifications"
                                checked={
                                  localSettings.pushNotifications ?? false
                                }
                                onChange={e =>
                                  updateSetting(
                                    'pushNotifications',
                                    e.target.checked
                                  )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="pushNotifications"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Push notifications
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Data & Privacy Settings */}
                    {activeTab === 'data' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Data & Privacy
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  Export Data
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Download all your data
                                </p>
                              </div>
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  Delete Account
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Permanently delete your account and data
                                </p>
                              </div>
                              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Advanced Settings */}
                    {activeTab === 'advanced' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Advanced
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="debugMode"
                                checked={localSettings.debugMode ?? false}
                                onChange={e =>
                                  updateSetting('debugMode', e.target.checked)
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="debugMode"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Debug mode
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="analytics"
                                checked={localSettings.analytics ?? true}
                                onChange={e =>
                                  updateSetting('analytics', e.target.checked)
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="analytics"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Enable analytics
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;


