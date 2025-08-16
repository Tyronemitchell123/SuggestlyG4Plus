import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Plus,
  Minus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Bell,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  User,
  Star,
  Award,
  Trophy,
  Crown,
  Zap,
  Lightning,
  Rocket,
  Target,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Home,
  Menu,
  X,
  Check,
  Loader2,
  Info,
  HelpCircle,
  FileText,
  Receipt,
  Wallet,
  Banknote,
  Coins,
  PiggyBank,
  Calculator,
  Percent,
  Hash,
  Hash as HashIcon,
  Percent as PercentIcon,
  Calculator as CalculatorIcon,
  PiggyBank as PiggyBankIcon,
  Coins as CoinsIcon,
  Banknote as BanknoteIcon,
  Wallet as WalletIcon,
  Receipt as ReceiptIcon,
  FileText as FileTextIcon,
  HelpCircle as HelpCircleIcon,
  Info as InfoIcon,
  Loader2 as Loader2Icon,
  Check as CheckIcon,
  X as XIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ExternalLink as ExternalLinkIcon,
  MoreHorizontal as MoreHorizontalIcon,
  SortDesc as SortDescIcon,
  SortAsc as SortAscIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Target as TargetIcon,
  Rocket as RocketIcon,
  Lightning as LightningIcon,
  Zap as ZapIcon,
  Crown as CrownIcon,
  Trophy as TrophyIcon,
  Award as AwardIcon,
  Star as StarIcon,
  User as UserIcon,
  Building as BuildingIcon,
  MapPin as MapPinIcon,
  Globe as GlobeIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Bell as BellIcon,
  Key as KeyIcon,
  Unlock as UnlockIcon,
  Lock as LockIcon,
  EyeOff as EyeOffIcon,
  Eye as EyeIcon,
  Trash2 as Trash2Icon,
  Edit as EditIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  Settings as SettingsIcon,
  RefreshCw as RefreshCwIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChart3 as BarChart3Icon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  Shield as ShieldIcon,
  DollarSign as DollarSignIcon,
  CreditCard as CreditCardIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdvancedPaymentSystem = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize data
  useEffect(() => {
    // Payment methods
    setPaymentMethods([
      {
        id: 1,
        type: 'credit_card',
        name: 'Visa ending in 4242',
        last4: '4242',
        brand: 'visa',
        expiry: '12/25',
        isDefault: true,
        status: 'active',
      },
      {
        id: 2,
        type: 'credit_card',
        name: 'Mastercard ending in 5555',
        last4: '5555',
        brand: 'mastercard',
        expiry: '08/26',
        isDefault: false,
        status: 'active',
      },
      {
        id: 3,
        type: 'bank_account',
        name: 'Bank Account ending in 1234',
        last4: '1234',
        brand: 'bank',
        expiry: null,
        isDefault: false,
        status: 'active',
      },
    ]);

    // Transactions
    setTransactions([
      {
        id: 1,
        amount: 99.99,
        currency: 'USD',
        status: 'completed',
        type: 'subscription',
        description: 'Premium Plan - Monthly',
        date: new Date(Date.now() - 86400000),
        paymentMethod: 'Visa ending in 4242',
      },
      {
        id: 2,
        amount: 199.99,
        currency: 'USD',
        status: 'completed',
        type: 'one_time',
        description: 'Enterprise Add-on',
        date: new Date(Date.now() - 172800000),
        paymentMethod: 'Visa ending in 4242',
      },
      {
        id: 3,
        amount: 49.99,
        currency: 'USD',
        status: 'pending',
        type: 'subscription',
        description: 'Basic Plan - Monthly',
        date: new Date(Date.now() - 259200000),
        paymentMethod: 'Mastercard ending in 5555',
      },
      {
        id: 4,
        amount: 299.99,
        currency: 'USD',
        status: 'failed',
        type: 'one_time',
        description: 'Custom Development',
        date: new Date(Date.now() - 345600000),
        paymentMethod: 'Bank Account ending in 1234',
      },
    ]);

    // Subscriptions
    setSubscriptions([
      {
        id: 1,
        name: 'Premium Plan',
        amount: 99.99,
        currency: 'USD',
        interval: 'monthly',
        status: 'active',
        nextBilling: new Date(Date.now() + 2592000000),
        startDate: new Date(Date.now() - 2592000000),
      },
      {
        id: 2,
        name: 'Basic Plan',
        amount: 49.99,
        currency: 'USD',
        interval: 'monthly',
        status: 'active',
        nextBilling: new Date(Date.now() + 2592000000),
        startDate: new Date(Date.now() - 5184000000),
      },
    ]);

    // Analytics
    setAnalytics({
      totalRevenue: 15499.99,
      monthlyGrowth: 23.5,
      activeSubscriptions: 1250,
      conversionRate: 8.7,
      averageOrderValue: 124.5,
      refundRate: 2.1,
    });
  }, []);

  const handleAddPaymentMethod = useCallback(() => {
    toast.success('Add payment method functionality would be implemented here');
  }, []);

  const handleEditPaymentMethod = useCallback(method => {
    toast.success(
      `Edit ${method.name} functionality would be implemented here`
    );
  }, []);

  const handleDeletePaymentMethod = useCallback(methodId => {
    setPaymentMethods(prev => prev.filter(m => m.id !== methodId));
    toast.success('Payment method removed successfully');
  }, []);

  const handleSetDefaultPaymentMethod = useCallback(methodId => {
    setPaymentMethods(prev =>
      prev.map(m => ({
        ...m,
        isDefault: m.id === methodId,
      }))
    );
    toast.success('Default payment method updated');
  }, []);

  const PaymentMethodCard = ({ method }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{method.name}</h3>
            <p className="text-sm text-gray-600">
              {method.brand === 'visa'
                ? 'Visa'
                : method.brand === 'mastercard'
                  ? 'Mastercard'
                  : 'Bank Account'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {method.isDefault && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Default
            </span>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              method.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {method.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Expires: {method.expiry || 'N/A'}
        </div>
        <div className="flex space-x-2">
          {!method.isDefault && (
            <button
              onClick={() => handleSetDefaultPaymentMethod(method.id)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs hover:bg-blue-200 transition-colors"
            >
              Set Default
            </button>
          )}
          <button
            onClick={() => handleEditPaymentMethod(method)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeletePaymentMethod(method.id)}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );

  const TransactionCard = ({ transaction }) => {
    const statusColors = {
      completed: 'green',
      pending: 'yellow',
      failed: 'red',
    };
    const color = statusColors[transaction.status];

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-white rounded-lg p-4 border-l-4 border-${color}-500`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold text-gray-900">
              {transaction.description}
            </h4>
            <p className="text-sm text-gray-600">{transaction.paymentMethod}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              ${transaction.amount.toFixed(2)}
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700`}
            >
              {transaction.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{transaction.date.toLocaleDateString()}</span>
          <span className="capitalize">
            {transaction.type.replace('_', ' ')}
          </span>
        </div>
      </motion.div>
    );
  };

  const SubscriptionCard = ({ subscription }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {subscription.name}
          </h3>
          <p className="text-sm text-gray-600">
            {subscription.interval} billing • ${subscription.amount.toFixed(2)}/
            {subscription.interval}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {subscription.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Next billing:</span>
          <span className="text-gray-900">
            {subscription.nextBilling.toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Started:</span>
          <span className="text-gray-900">
            {subscription.startDate.toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          Manage
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
          Cancel
        </button>
      </div>
    </motion.div>
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <DollarSign className="w-8 h-8 text-green-600" />
                <span>Advanced Payment System</span>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    Secure
                  </span>
                </div>
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive payment management and financial analytics
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>

              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`$${analytics.totalRevenue?.toLocaleString() || '0'}`}
            change={`+${analytics.monthlyGrowth || 0}%`}
            icon={DollarSign}
            color="green"
            trend="up"
          />
          <MetricCard
            title="Active Subscriptions"
            value={analytics.activeSubscriptions?.toLocaleString() || '0'}
            change="+12.5%"
            icon={Users}
            color="blue"
            trend="up"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${analytics.conversionRate || 0}%`}
            change="+2.1%"
            icon={Percent}
            color="purple"
            trend="up"
          />
          <MetricCard
            title="Avg Order Value"
            value={`$${analytics.averageOrderValue || 0}`}
            change="+5.3%"
            icon={Calculator}
            color="orange"
            trend="up"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
          {[
            'overview',
            'payments',
            'transactions',
            'subscriptions',
            'analytics',
          ].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Recent Transactions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Transactions
                </h3>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map(transaction => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </div>
              </div>

              {/* Active Subscriptions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Active Subscriptions
                </h3>
                <div className="space-y-4">
                  {subscriptions.map(subscription => (
                    <SubscriptionCard
                      key={subscription.id}
                      subscription={subscription}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Methods
                </h3>
                <button
                  onClick={handleAddPaymentMethod}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Payment Method</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentMethods.map(method => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'transactions' && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Transaction History
              </h3>
              <div className="space-y-4">
                {transactions.map(transaction => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'subscriptions' && (
            <motion.div
              key="subscriptions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Subscriptions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriptions.map(subscription => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Financial Analytics
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Revenue Trends
                  </h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-gray-400" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Methods Distribution
                  </h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PieChart className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedPaymentSystem;
