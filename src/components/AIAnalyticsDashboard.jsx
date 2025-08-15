import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Target,
  Zap,
  Brain,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Settings,
  Download,
  Share2,
  Filter,
  Search,
  Calendar,
  PieChart,
  LineChart,
  BarChart,
  Scatter,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Network,
  Shield,
  Lock,
  Unlock,
  Bell,
  Star,
  Award,
  Trophy,
  Crown,
  Sparkles,
  Rocket,
  Lightning,
  Cloud,
  Sun,
  Moon,
  Star as StarIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AIAnalyticsDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetrics, setSelectedMetrics] = useState([
    'users',
    'revenue',
    'performance',
  ]);
  const [aiInsights, setAiInsights] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [realTimeData, setRealTimeData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [viewMode, setViewMode] = useState('overview');

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        requestsPerSecond: (Math.random() * 50 + 20).toFixed(2),
        responseTime: (Math.random() * 200 + 50).toFixed(0),
        errorRate: (Math.random() * 2).toFixed(2),
        cpuUsage: (Math.random() * 30 + 40).toFixed(1),
        memoryUsage: (Math.random() * 20 + 60).toFixed(1),
        networkTraffic: (Math.random() * 100 + 200).toFixed(0),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // AI Insights generation
  useEffect(() => {
    const generateInsights = () => {
      const insights = [
        {
          id: 1,
          type: 'performance',
          title: 'Performance Optimization Opportunity',
          description:
            'CPU usage has increased 15% in the last hour. Consider scaling resources.',
          severity: 'warning',
          icon: Cpu,
          timestamp: new Date(),
          action: 'Scale Resources',
        },
        {
          id: 2,
          type: 'revenue',
          title: 'Revenue Growth Trend',
          description:
            'Revenue is trending 23% higher than predicted. AI suggests this will continue.',
          severity: 'success',
          icon: TrendingUp,
          timestamp: new Date(),
          action: 'Analyze Growth',
        },
        {
          id: 3,
          type: 'users',
          title: 'User Engagement Peak',
          description:
            'User engagement is at its highest in 30 days. Peak time: 2:00 PM - 4:00 PM.',
          severity: 'info',
          icon: Users,
          timestamp: new Date(),
          action: 'View Details',
        },
        {
          id: 4,
          type: 'security',
          title: 'Security Alert',
          description:
            'Unusual login pattern detected. 5 failed attempts from new IP.',
          severity: 'error',
          icon: Shield,
          timestamp: new Date(),
          action: 'Investigate',
        },
      ];
      setAiInsights(insights);
    };

    generateInsights();
    const interval = setInterval(generateInsights, 30000);
    return () => clearInterval(interval);
  }, []);

  // Predictions simulation
  useEffect(() => {
    setPredictions({
      nextHour: {
        users: Math.floor(Math.random() * 200) + 800,
        revenue: (Math.random() * 5000 + 15000).toFixed(2),
        performance: (Math.random() * 10 + 90).toFixed(1),
      },
      nextDay: {
        users: Math.floor(Math.random() * 1000) + 5000,
        revenue: (Math.random() * 50000 + 200000).toFixed(2),
        performance: (Math.random() * 15 + 85).toFixed(1),
      },
      nextWeek: {
        users: Math.floor(Math.random() * 5000) + 25000,
        revenue: (Math.random() * 200000 + 1000000).toFixed(2),
        performance: (Math.random() * 20 + 80).toFixed(1),
      },
    });
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    toast.loading('Refreshing analytics data...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    toast.success('Analytics data refreshed!');
  }, []);

  const handleInsightAction = useCallback(insight => {
    toast.success(`Action taken: ${insight.action}`);
  }, []);

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    color = 'blue',
    trend = 'up',
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div
          className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </motion.div>
  );

  const InsightCard = ({ insight }) => {
    const Icon = insight.icon;
    const severityColors = {
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'blue',
    };
    const color = severityColors[insight.severity];

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500`}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">
              {insight.title}
            </h4>
            <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {insight.timestamp.toLocaleTimeString()}
              </span>
              <button
                onClick={() => handleInsightAction(insight)}
                className={`px-3 py-1 rounded-lg text-xs font-medium bg-${color}-100 text-${color}-700 hover:bg-${color}-200 transition-colors`}
              >
                {insight.action}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Brain className="w-8 h-8 text-blue-600" />
                <span>AI Analytics Dashboard</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">
                    Live
                  </span>
                </div>
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time insights powered by artificial intelligence
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>

              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-time Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Users"
            value={realTimeData.activeUsers?.toLocaleString() || '0'}
            change="+12.5%"
            icon={Users}
            color="blue"
            trend="up"
          />
          <MetricCard
            title="Requests/sec"
            value={realTimeData.requestsPerSecond || '0'}
            change="+8.2%"
            icon={Activity}
            color="green"
            trend="up"
          />
          <MetricCard
            title="Response Time"
            value={`${realTimeData.responseTime || '0'}ms`}
            change="-5.1%"
            icon={Clock}
            color="yellow"
            trend="up"
          />
          <MetricCard
            title="Error Rate"
            value={`${realTimeData.errorRate || '0'}%`}
            change="-2.3%"
            icon={AlertTriangle}
            color="red"
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Insights */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>AI Insights</span>
                </h2>
                <span className="text-sm text-gray-500">
                  {aiInsights.length} insights
                </span>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {aiInsights.map(insight => (
                    <InsightCard key={insight.id} insight={insight} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* System Performance */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <span>System Performance</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage</span>
                    <span>{realTimeData.cpuUsage || '0'}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${realTimeData.cpuUsage || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory Usage</span>
                    <span>{realTimeData.memoryUsage || '0'}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${realTimeData.memoryUsage || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Network Traffic</span>
                    <span>{realTimeData.networkTraffic || '0'} MB/s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((realTimeData.networkTraffic || 0) / 3, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Predictions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <CrystalBall className="w-5 h-5 text-purple-600" />
                <span>AI Predictions</span>
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">Next Hour</h4>
                  <p className="text-sm text-gray-600">
                    Users:{' '}
                    {predictions.nextHour?.users?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Revenue: ${predictions.nextHour?.revenue || '0'}
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-900">Next Day</h4>
                  <p className="text-sm text-gray-600">
                    Users: {predictions.nextDay?.users?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Revenue: ${predictions.nextDay?.revenue || '0'}
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-gray-900">Next Week</h4>
                  <p className="text-sm text-gray-600">
                    Users:{' '}
                    {predictions.nextWeek?.users?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Revenue: ${predictions.nextWeek?.revenue || '0'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Crystal Ball icon component
const CrystalBall = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

export default AIAnalyticsDashboard;
