import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Crown, 
  Activity, 
  BarChart3, 
  PieChart, 
  Mail,
  Phone,
  MessageSquare,
  Star,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats] = useState({
    totalRevenue: 2847500,
    activeSubscriptions: 47,
    conversionRate: 23.4,
    hotLeads: 12,
    monthlyGrowth: 18.7,
    avgDealSize: 60500,
    responseTime: 1.2,
    satisfactionScore: 98.5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const recentLeads = [
    {
      id: 1,
      name: "Alexander Chen",
      company: "Quantum Capital",
      revenue: "$500M+",
      status: "hot",
      lastContact: "2 hours ago",
      priority: "Critical",
      value: "$75,000"
    },
    {
      id: 2,
      name: "Isabella Rodriguez",
      company: "Global Tech Solutions",
      revenue: "$200M+",
      status: "warm",
      lastContact: "4 hours ago",
      priority: "High",
      value: "$25,000"
    },
    {
      id: 3,
      name: "Marcus Thompson",
      company: "Elite Investments",
      revenue: "$1B+",
      status: "hot",
      lastContact: "6 hours ago",
      priority: "Critical",
      value: "$150,000"
    },
    {
      id: 4,
      name: "Sophia Williams",
      company: "Innovation Labs",
      revenue: "$100M+",
      status: "warm",
      lastContact: "1 day ago",
      priority: "High",
      value: "$50,000"
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 1800000 },
    { month: 'Feb', revenue: 2100000 },
    { month: 'Mar', revenue: 1950000 },
    { month: 'Apr', revenue: 2400000 },
    { month: 'May', revenue: 2650000 },
    { month: 'Jun', revenue: 2847500 }
  ];

  const leadSources = [
    { source: 'Direct Referrals', percentage: 45, color: 'from-luxury-gold to-yellow-500' },
    { source: 'Executive Network', percentage: 28, color: 'from-purple-600 to-pink-500' },
    { source: 'Industry Events', percentage: 15, color: 'from-blue-600 to-cyan-500' },
    { source: 'Digital Marketing', percentage: 12, color: 'from-green-600 to-emerald-500' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6 hover:border-luxury-gold/40 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-2xl font-display font-bold text-luxury-light mb-1">
        {typeof value === 'number' && value >= 1000000 
          ? `$${(value / 1000000).toFixed(1)}M` 
          : typeof value === 'number' && value >= 1000
          ? `$${(value / 1000).toFixed(0)}K`
          : value}
      </h3>
      <p className="text-luxury-gray text-sm">{title}</p>
    </motion.div>
  );

  const LeadCard = ({ lead }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-xl p-4 hover:border-luxury-gold/40 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${lead.status === 'hot' ? 'bg-red-500' : 'bg-yellow-500'}`} />
          <div>
            <h4 className="font-semibold text-luxury-light">{lead.name}</h4>
            <p className="text-sm text-luxury-gray">{lead.company}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-luxury-gold font-bold">{lead.value}</p>
          <p className="text-xs text-luxury-gray">{lead.revenue}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-luxury-gray">
        <span className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {lead.lastContact}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          lead.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
          lead.priority === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {lead.priority}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-luxury-gradient p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-display font-bold text-luxury-light mb-2">
              Executive Dashboard
            </h1>
            <p className="text-luxury-gray">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-luxury-gold" />
                <span className="text-luxury-light font-semibold">SUGGESTLY ELITE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            change={18.7}
            icon={DollarSign}
            color="from-green-600 to-emerald-500"
          />
          <StatCard
            title="Active Subscriptions"
            value={stats.activeSubscriptions}
            change={12.3}
            icon={Users}
            color="from-blue-600 to-cyan-500"
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            change={5.2}
            icon={Target}
            color="from-purple-600 to-pink-500"
          />
          <StatCard
            title="Hot Leads"
            value={stats.hotLeads}
            change={-2.1}
            icon={TrendingUp}
            color="from-red-600 to-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-luxury-light">Revenue Trends</h3>
              <div className="flex items-center space-x-2 text-luxury-gold">
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm">Last 6 Months</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {revenueData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-luxury-darker rounded-t-lg relative">
                    <div
                      className="bg-gradient-to-t from-luxury-gold to-yellow-500 rounded-t-lg transition-all duration-500"
                      style={{ 
                        height: `${(data.revenue / 3000000) * 100}%`,
                        minHeight: '20px'
                      }}
                    />
                  </div>
                  <span className="text-xs text-luxury-gray mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lead Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-luxury-light">Lead Sources</h3>
              <PieChart className="w-5 h-5 text-luxury-gold" />
            </div>
            <div className="space-y-4">
              {leadSources.map((source, index) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 bg-gradient-to-r ${source.color} rounded-full`} />
                    <span className="text-luxury-gray text-sm">{source.source}</span>
                  </div>
                  <span className="text-luxury-light font-semibold">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Hot Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-display font-bold text-luxury-light">Recent Hot Leads</h3>
            <div className="flex items-center space-x-2 text-luxury-gold">
              <Activity className="w-5 h-5" />
              <span className="text-sm">Live Updates</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentLeads.map((lead, index) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-display font-bold text-luxury-light mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: Mail, label: 'Send Follow-up', color: 'from-blue-600 to-cyan-500' },
              { icon: Phone, label: 'Schedule Call', color: 'from-green-600 to-emerald-500' },
              { icon: MessageSquare, label: 'Create Proposal', color: 'from-purple-600 to-pink-500' },
              { icon: Star, label: 'Mark Priority', color: 'from-yellow-500 to-orange-500' }
            ].map((action, index) => (
              <button
                key={action.label}
                className="flex items-center space-x-3 p-4 bg-luxury-darker border border-luxury-gold/20 rounded-xl hover:border-luxury-gold/40 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-luxury-light font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
