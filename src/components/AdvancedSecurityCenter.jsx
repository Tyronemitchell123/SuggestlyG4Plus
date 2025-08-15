import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Settings,
  Activity,
  Zap,
  Crown,
  Brain,
  Cpu,
  RefreshCw,
  Play,
  Pause,
  StopCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdvancedSecurityCenter = () => {
  const [securityMetrics, setSecurityMetrics] = useState({
    threatLevel: 'low',
    activeThreats: 0,
    blockedAttacks: 1247,
    systemIntegrity: 99.8,
    encryptionStrength: 'AES-256',
    lastScan: new Date().toISOString(),
  });

  const [serviceStatus, setServiceStatus] = useState({
    'ai-strategy': { status: 'operational', health: 98, lastCheck: new Date() },
    quantum: { status: 'operational', health: 97, lastCheck: new Date() },
    neural: { status: 'operational', health: 99, lastCheck: new Date() },
    custom: { status: 'operational', health: 96, lastCheck: new Date() },
    security: { status: 'operational', health: 100, lastCheck: new Date() },
    analytics: { status: 'operational', health: 95, lastCheck: new Date() },
  });

  const [isFixing, setIsFixing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3),
        systemIntegrity: 99.8 + Math.random() * 0.2,
        lastScan: new Date().toISOString(),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleServiceFix = async serviceId => {
    setIsFixing(true);
    setSelectedService(serviceId);

    try {
      // Simulate service fix process
      toast.loading(`🔧 Fixing ${serviceId} service...`, { duration: 3000 });

      // Step 1: Diagnose issue
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.loading(`🔍 Diagnosing ${serviceId} issues...`, { duration: 2000 });

      // Step 2: Apply fixes
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.loading(`⚡ Applying fixes to ${serviceId}...`, { duration: 2000 });

      // Step 3: Verify fix
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update service status
      setServiceStatus(prev => ({
        ...prev,
        [serviceId]: {
          status: 'operational',
          health: 100,
          lastCheck: new Date(),
        },
      }));

      toast.success(`✅ ${serviceId} service fixed successfully!`);
    } catch (error) {
      toast.error(`❌ Failed to fix ${serviceId} service. Please try again.`);
    } finally {
      setIsFixing(false);
      setSelectedService(null);
    }
  };

  const handleServiceRestart = async serviceId => {
    try {
      toast.loading(`🔄 Restarting ${serviceId} service...`, {
        duration: 2000,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      setServiceStatus(prev => ({
        ...prev,
        [serviceId]: {
          ...prev[serviceId],
          lastCheck: new Date(),
        },
      }));

      toast.success(`✅ ${serviceId} service restarted successfully!`);
    } catch (error) {
      toast.error(`❌ Failed to restart ${serviceId} service.`);
    }
  };

  const getServiceStatusIcon = status => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getServiceStatusColor = status => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'maintenance':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  const services = [
    {
      id: 'ai-strategy',
      name: 'AI Strategy Service',
      icon: Crown,
      color: 'from-luxury-gold to-yellow-500',
      description: 'AI strategy consulting and planning services',
    },
    {
      id: 'quantum',
      name: 'Quantum Computing Service',
      icon: Zap,
      color: 'from-purple-600 to-pink-500',
      description: 'Quantum computing and algorithm services',
    },
    {
      id: 'neural',
      name: 'Neural Network Service',
      icon: Brain,
      color: 'from-blue-600 to-cyan-500',
      description: 'Neural network training and optimization',
    },
    {
      id: 'custom',
      name: 'Custom Development Service',
      icon: Cpu,
      color: 'from-indigo-600 to-purple-500',
      description: 'Custom software development services',
    },
    {
      id: 'security',
      name: 'Security Service',
      icon: Shield,
      color: 'from-red-600 to-orange-500',
      description: 'Advanced security and threat detection',
    },
    {
      id: 'analytics',
      name: 'Analytics Service',
      icon: Activity,
      color: 'from-green-600 to-emerald-500',
      description: 'Data analytics and reporting services',
    },
  ];

  return (
    <div className="min-h-screen bg-luxury-gradient p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-luxury-light mb-4">
            Advanced Security Center
          </h1>
          <p className="text-luxury-gray text-lg">
            Comprehensive security monitoring and service management
          </p>
        </motion.div>

        {/* Security Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-luxury-gold" />
              <span className="text-sm text-luxury-gray">Threat Level</span>
            </div>
            <div className="text-2xl font-bold text-luxury-light mb-2">
              {securityMetrics.threatLevel.toUpperCase()}
            </div>
            <div className="w-full bg-luxury-darker rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: '20%' }}
              ></div>
            </div>
          </div>

          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Lock className="w-8 h-8 text-luxury-gold" />
              <span className="text-sm text-luxury-gray">Blocked Attacks</span>
            </div>
            <div className="text-2xl font-bold text-luxury-light mb-2">
              {securityMetrics.blockedAttacks.toLocaleString()}
            </div>
            <div className="text-sm text-luxury-gray">Last 24 hours</div>
          </div>

          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-luxury-gold" />
              <span className="text-sm text-luxury-gray">System Integrity</span>
            </div>
            <div className="text-2xl font-bold text-luxury-light mb-2">
              {securityMetrics.systemIntegrity.toFixed(1)}%
            </div>
            <div className="text-sm text-luxury-gray">Optimal performance</div>
          </div>

          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-luxury-gold" />
              <span className="text-sm text-luxury-gray">Encryption</span>
            </div>
            <div className="text-2xl font-bold text-luxury-light mb-2">
              {securityMetrics.encryptionStrength}
            </div>
            <div className="text-sm text-luxury-gray">Military grade</div>
          </div>
        </motion.div>

        {/* Service Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-luxury-light">
              Service Management
            </h2>
            <button
              onClick={() => {
                toast.success('🔄 All services refreshed');
                setServiceStatus(prev => {
                  const updated = {};
                  Object.keys(prev).forEach(key => {
                    updated[key] = {
                      ...prev[key],
                      lastCheck: new Date(),
                    };
                  });
                  return updated;
                });
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-luxury-gold/10 border border-luxury-gold/30 rounded-lg hover:bg-luxury-gold/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-luxury-gold" />
              <span className="text-luxury-gold">Refresh All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => {
              const status = serviceStatus[service.id];
              return (
                <div
                  key={service.id}
                  className="bg-luxury-darker border border-luxury-gold/20 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}
                    >
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {getServiceStatusIcon(status.status)}
                      <span
                        className={`text-sm ${getServiceStatusColor(status.status)}`}
                      >
                        {status.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-luxury-light font-semibold mb-2">
                    {service.name}
                  </h3>
                  <p className="text-luxury-gray text-sm mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-luxury-gray">Health:</div>
                      <div className="text-sm font-semibold text-luxury-light">
                        {status.health}%
                      </div>
                    </div>
                    <div className="text-xs text-luxury-gray">
                      {new Date(status.lastCheck).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleServiceFix(service.id)}
                      disabled={isFixing}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                    >
                      {isFixing && selectedService === service.id ? (
                        <>
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Fixing...</span>
                        </>
                      ) : (
                        <>
                          <Wrench className="w-3 h-3" />
                          <span>Fix</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleServiceRestart(service.id)}
                      className="py-2 px-3 bg-luxury-gold/10 border border-luxury-gold/30 rounded-lg text-sm font-medium hover:bg-luxury-gold/20 transition-colors flex items-center justify-center"
                      title="Restart Service"
                    >
                      <Play className="w-3 h-3 text-luxury-gold" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* System Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-display font-bold text-luxury-light mb-6">
            System Logs
          </h2>
          <div className="space-y-3">
            {[
              {
                time: '2:45 PM',
                level: 'info',
                message: 'Service fix completed for AI Strategy Service',
              },
              {
                time: '2:42 PM',
                level: 'warning',
                message: 'High memory usage detected on Neural Network Service',
              },
              {
                time: '2:40 PM',
                level: 'info',
                message: 'Security scan completed - no threats detected',
              },
              {
                time: '2:38 PM',
                level: 'error',
                message: 'Connection timeout on Quantum Computing Service',
              },
              {
                time: '2:35 PM',
                level: 'info',
                message: 'All services operational and healthy',
              },
            ].map((log, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-luxury-darker rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    log.level === 'error'
                      ? 'bg-red-500'
                      : log.level === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                ></div>
                <div className="text-sm text-luxury-gray w-20">{log.time}</div>
                <div className="text-sm text-luxury-light flex-1">
                  {log.message}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedSecurityCenter;
