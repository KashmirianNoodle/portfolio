import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Eye, Globe, TrendingUp } from 'lucide-react';

// Simulated WebSocket connection for demo purposes
// In production, replace this with actual WebSocket connection
class VisitorWebSocket {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.connected = false;
    this.interval = null;
  }

  connect() {
    this.connected = true;
    
    // Simulate initial data
    this.onUpdate({
      totalVisitors: 12847,
      activeUsers: 23,
      pageViews: 45621,
      countries: 47,
      recentActivity: []
    });

    // Simulate real-time updates
    this.interval = setInterval(() => {
      if (this.connected) {
        this.simulateUpdate();
      }
    }, 3000);
  }

  simulateUpdate() {
    const events = ['view', 'join', 'leave'];
    const event = events[Math.floor(Math.random() * events.length)];
    
    this.onUpdate({
      event,
      timestamp: new Date().toISOString(),
      country: this.getRandomCountry(),
      page: this.getRandomPage()
    });
  }

  getRandomCountry() {
    const countries = ['🇺🇸 USA', '🇬🇧 UK', '🇮🇳 India', '🇩🇪 Germany', '🇫🇷 France', '🇨🇦 Canada', '🇦🇺 Australia', '🇯🇵 Japan'];
    return countries[Math.floor(Math.random() * countries.length)];
  }

  getRandomPage() {
    const pages = ['/projects', '/skills', '/experience', '/contact', '/'];
    return pages[Math.floor(Math.random() * pages.length)];
  }

  disconnect() {
    this.connected = false;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Animated digit component
function AnimatedDigit({ value }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

// Animated number counter
function AnimatedNumber({ value, className = '' }) {
  const digits = value.toString().split('');
  
  return (
    <div className={`flex ${className}`}>
      {digits.map((digit, index) => (
        <AnimatedDigit key={`${index}-${digit}`} value={digit} />
      ))}
    </div>
  );
}

// Activity feed item
function ActivityItem({ activity, index }) {
  const getEventColor = (event) => {
    switch (event) {
      case 'join': return 'text-green-400';
      case 'leave': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  const getEventIcon = (event) => {
    switch (event) {
      case 'join': return '→';
      case 'leave': return '←';
      default: return '👁';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <span className={`text-lg ${getEventColor(activity.event)}`}>
        {getEventIcon(activity.event)}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/80 truncate">
          {activity.country}
        </p>
        <p className="text-xs text-white/50">
          {activity.page}
        </p>
      </div>
      <span className="text-xs text-white/40 whitespace-nowrap">
        {new Date(activity.timestamp).toLocaleTimeString()}
      </span>
    </motion.div>
  );
}

// Main component
export default function RealtimeVisitorCounter({ className = '' }) {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    activeUsers: 0,
    pageViews: 0,
    countries: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket
    wsRef.current = new VisitorWebSocket((data) => {
      if (data.event) {
        // Handle real-time event
        setRecentActivity(prev => {
          const newActivity = [data, ...prev].slice(0, 5);
          return newActivity;
        });

        // Update stats based on event
        setStats(prev => {
          const newStats = { ...prev };
          
          if (data.event === 'join') {
            newStats.activeUsers += 1;
            newStats.totalVisitors += 1;
          } else if (data.event === 'leave') {
            newStats.activeUsers = Math.max(0, newStats.activeUsers - 1);
          }
          
          newStats.pageViews += 1;
          
          return newStats;
        });
      } else {
        // Initial data load
        setStats(data);
      }
    });

    wsRef.current.connect();
    setIsConnected(true);

    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
        />
        <span className="text-sm text-white/60 font-mono">
          {isConnected ? 'Live' : 'Disconnected'}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Visitors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-purple-400" size={24} />
            <h3 className="text-sm text-white/60 uppercase tracking-wider">Total Visitors</h3>
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            <AnimatedNumber value={stats.totalVisitors} />
          </div>
        </motion.div>

        {/* Active Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Eye className="text-green-400" size={24} />
            <h3 className="text-sm text-white/60 uppercase tracking-wider">Active Now</h3>
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            <AnimatedNumber value={stats.activeUsers} />
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-2 text-xs text-green-400"
          >
            • Online
          </motion.div>
        </motion.div>

        {/* Page Views */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-blue-400" size={24} />
            <h3 className="text-sm text-white/60 uppercase tracking-wider">Page Views</h3>
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            <AnimatedNumber value={stats.pageViews} />
          </div>
        </motion.div>

        {/* Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Globe className="text-orange-400" size={24} />
            <h3 className="text-sm text-white/60 uppercase tracking-wider">Countries</h3>
          </div>
          <div className="text-3xl font-bold text-white font-mono">
            <AnimatedNumber value={stats.countries} />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Feed */}
      <div className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">Recent Activity</span>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="text-primary"
          >
            ↻
          </motion.span>
        </h3>
        
        <div className="space-y-2">
          <AnimatePresence>
            {recentActivity.length === 0 ? (
              <p className="text-white/40 text-center py-8">Waiting for activity...</p>
            ) : (
              recentActivity.map((activity, index) => (
                <ActivityItem
                  key={`${activity.timestamp}-${index}`}
                  activity={activity}
                  index={index}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Implementation Note */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-xs text-blue-300">
          💡 <strong>Demo Mode:</strong> This uses simulated WebSocket data. 
          In production, connect to your real WebSocket server for live visitor tracking.
        </p>
      </div>
    </div>
  );
}
