import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import quantumService from '../services/quantumService';

const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 68,
    network: 32,
    disk: 23,
    responseTime: 120,
    uptime: 99.8,
    quantumStatus: 'connected',
    activeConnections: 156,
    errorRate: 0.2,
    throughput: 2.4,
  });

  const [quantumMetrics, setQuantumMetrics] = useState({
    providerStatus: 'connected',
    circuitExecution: 85,
    qubitUtilization: 72,
    errorCorrection: 98.5,
    coherenceTime: 45,
    gateFidelity: 99.2,
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Memory usage approaching threshold',
      time: '2 min ago',
    },
    {
      id: 2,
      type: 'info',
      message: 'Quantum circuit optimization completed',
      time: '5 min ago',
    },
  ]);

  const [timeRange, setTimeRange] = useState('1h');
  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(
          20,
          Math.min(90, prev.memory + (Math.random() - 0.5) * 5)
        ),
        network: Math.max(
          15,
          Math.min(80, prev.network + (Math.random() - 0.5) * 8)
        ),
        responseTime: Math.max(
          50,
          Math.min(300, prev.responseTime + (Math.random() - 0.5) * 20)
        ),
        activeConnections: Math.max(
          100,
          Math.min(200, prev.activeConnections + (Math.random() - 0.5) * 10)
        ),
      }));

      setQuantumMetrics(prev => ({
        ...prev,
        circuitExecution: Math.max(
          60,
          Math.min(95, prev.circuitExecution + (Math.random() - 0.5) * 5)
        ),
        qubitUtilization: Math.max(
          50,
          Math.min(85, prev.qubitUtilization + (Math.random() - 0.5) * 3)
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get status color based on metric value
  const getStatusColor = (
    value,
    thresholds = { low: 30, medium: 70, high: 90 }
  ) => {
    if (value <= thresholds.low) return 'text-green-500';
    if (value <= thresholds.medium) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get quantum status color
  const getQuantumStatusColor = status => {
    switch (status) {
      case 'connected':
        return 'text-green-500';
      case 'connecting':
        return 'text-yellow-500';
      case 'disconnected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Performance Gauge Component
  const PerformanceGauge = ({
    value,
    max = 100,
    label,
    icon: Icon,
    color = 'blue',
  }) => {
    const percentage = (value / max) * 100;
    const strokeDasharray = `${percentage}, 100`;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <div className="flex items-center space-x-2 mb-3">
          <Icon className={`w-5 h-5 text-${color}-500`} />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>

        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={`var(--color-${color})`}
              strokeWidth="3"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${getStatusColor(value)}`}>
              {Math.round(value)}%
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Status Light Component
  const StatusLight = ({ status, label, description }) => {
    const getLightColor = () => {
      switch (status) {
        case 'online':
          return 'bg-green-500';
        case 'warning':
          return 'bg-yellow-500';
        case 'error':
          return 'bg-red-500';
        case 'offline':
          return 'bg-gray-400';
        default:
          return 'bg-gray-400';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div
          className={`w-3 h-3 rounded-full ${getLightColor()} animate-pulse`}
        />
        <div>
          <div className="text-sm font-medium text-gray-900">{label}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </motion.div>
    );
  };

  // Chart Component (simplified)
  const PerformanceChart = ({ data, title, color = 'blue' }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <BarChart3 className={`w-4 h-4 text-${color}-500`} />
        </div>

        <div className="flex items-end space-x-1 h-20">
          {data.map((value, index) => {
            const height = ((value - minValue) / (maxValue - minValue)) * 100;
            return (
              <div
                key={index}
                className={`flex-1 bg-${color}-500 rounded-t transition-all duration-300`}
                style={{ height: `${Math.max(10, height)}%` }}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{minValue}</span>
          <span>{maxValue}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Loader2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Performance Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Real-time system monitoring & quantum computing status
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Status Lights Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatusLight
          status={
            metrics.cpu > 80 ? 'error' : metrics.cpu > 60 ? 'warning' : 'online'
          }
          label="CPU Usage"
          description={`${Math.round(metrics.cpu)}% utilization`}
        />
        <StatusLight
          status={
            metrics.memory > 85
              ? 'error'
              : metrics.memory > 70
                ? 'warning'
                : 'online'
          }
          label="Memory Usage"
          description={`${Math.round(metrics.memory)}% utilization`}
        />
        <StatusLight
          status={
            quantumMetrics.providerStatus === 'connected' ? 'online' : 'error'
          }
          label="Quantum Provider"
          description={quantumMetrics.providerStatus}
        />
        <StatusLight
          status={
            metrics.responseTime > 200
              ? 'error'
              : metrics.responseTime > 150
                ? 'warning'
                : 'online'
          }
          label="Response Time"
          description={`${Math.round(metrics.responseTime)}ms`}
        />
      </div>

      {/* Performance Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <PerformanceGauge
          value={metrics.cpu}
          label="CPU"
          icon={Loader2}
          color="blue"
        />
        <PerformanceGauge
          value={metrics.memory}
          label="Memory"
          icon={Loader2}
          color="green"
        />
        <PerformanceGauge
          value={metrics.network}
          label="Network"
          icon={Loader2}
          color="purple"
        />
        <PerformanceGauge
          value={quantumMetrics.circuitExecution}
          label="Quantum Circuits"
          icon={Loader2}
          color="orange"
        />
      </div>

      {/* Charts and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PerformanceChart
          data={[65, 72, 68, 75, 82, 78, 85, 79, 83, 76]}
          title="CPU Usage Trend"
          color="blue"
        />
        <PerformanceChart
          data={[45, 52, 48, 55, 62, 58, 65, 59, 63, 56]}
          title="Memory Usage Trend"
          color="green"
        />
      </div>

      {/* Quantum Computing Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6 border border-purple-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Loader2 className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Quantum Computing Metrics
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {quantumMetrics.qubitUtilization}%
            </div>
            <div className="text-sm text-gray-600">Qubit Utilization</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {quantumMetrics.gateFidelity}%
            </div>
            <div className="text-sm text-gray-600">Gate Fidelity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {quantumMetrics.coherenceTime}μs
            </div>
            <div className="text-sm text-gray-600">Coherence Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {quantumMetrics.errorCorrection}%
            </div>
            <div className="text-sm text-gray-600">Error Correction</div>
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      <AnimatePresence>
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Recent Alerts
            </h3>
            <div className="space-y-2">
              {alerts.map(alert => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  {alert.type === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                  {alert.type === 'error' && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  {alert.type === 'info' && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}

                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{alert.message}</div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PerformanceDashboard;
