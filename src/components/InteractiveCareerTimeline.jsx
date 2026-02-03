import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Award, Code, Rocket, Calendar, MapPin, TrendingUp } from 'lucide-react';

// Career journey data
const careerData = [
  {
    id: 1,
    company: 'Growpital',
    role: 'Junior Software Engineer',
    period: 'Sep 2022 – Feb 2024',
    duration: '1 year 6 months',
    location: 'Remote',
    type: 'Full-time',
    color: '#FF6B6B',
    icon: Rocket,
    achievements: [
      'Built event-driven payment system processing 50K+ transactions',
      'Developed admin impersonation reducing support time by 70%',
      'Expanded API test coverage from 15% to 45%',
      'Automated contract workflows (40% time reduction)',
    ],
    skills: ['Node.js', 'PostgreSQL', 'AWS SNS/SQS', 'REST APIs', 'Jest'],
    impact: {
      transactions: '50K+',
      coverage: '+30%',
      automation: '40%',
    }
  },
  {
    id: 2,
    company: 'Zithara',
    role: 'Software Development Engineer',
    period: 'Mar 2024 – Oct 2024',
    duration: '8 months',
    location: 'Bangalore',
    type: 'Full-time',
    color: '#4ECDC4',
    icon: Code,
    achievements: [
      'Built dynamic query builder processing 100K+ records <2s',
      'Designed AWS EventBridge scheduler for 500+ campaigns/month',
      'Implemented WebSocket chat with Redis Pub/Sub',
      'Added Cognito MFA reducing unauthorized access by 85%',
    ],
    skills: ['TypeScript', 'Sequelize', 'DynamoDB', 'EventBridge', 'WebSocket', 'Redis'],
    impact: {
      performance: '<2s',
      campaigns: '500+',
      security: '+85%',
    }
  },
  {
    id: 3,
    company: 'Atomic House',
    role: 'Backend Developer',
    period: 'May 2025 – Nov 2025',
    duration: '7 months',
    location: 'Remote',
    type: 'Full-time',
    color: '#95E1D3',
    icon: Briefcase,
    achievements: [
      'Reduced P95 latency from 180ms to 45ms via DynamoDB migration',
      'Cut database queries by 70% using Redis caching',
      'Improved API performance by 60% for 50K+ daily requests',
      'Refactored monolith reducing complexity by 35%',
    ],
    skills: ['Node.js', 'DynamoDB', 'Redis', 'Lambda', 'Microservices'],
    impact: {
      latency: '-75%',
      queries: '-70%',
      performance: '+60%',
    }
  },
];

// Milestone component
function TimelineMilestone({ data, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        x: isInView ? 0 : (isLeft ? -50 : 50) 
      }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Content card */}
        <motion.div
          className="flex-1 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="p-6 rounded-2xl backdrop-blur-xl border-2 transition-all"
            style={{
              background: `linear-gradient(135deg, ${data.color}20, ${data.color}10)`,
              borderColor: data.color,
            }}
            animate={{
              boxShadow: isExpanded 
                ? `0 0 30px ${data.color}40`
                : `0 0 10px ${data.color}20`,
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${data.color}30` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <data.icon size={24} style={{ color: data.color }} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">{data.company}</h3>
                  <p className="text-sm" style={{ color: data.color }}>{data.role}</p>
                </div>
              </div>
              
              <motion.button
                className="text-white/60 hover:text-white"
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                ▼
              </motion.button>
            </div>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {data.period}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {data.location}
              </span>
              <span className="px-2 py-1 rounded-full bg-white/10 text-xs">
                {data.duration}
              </span>
            </div>
            
            {/* Impact metrics */}
            <div className="flex gap-3 mb-4">
              {Object.entries(data.impact).map(([key, value]) => (
                <div
                  key={key}
                  className="flex-1 p-3 rounded-lg bg-black/40 border border-white/10"
                >
                  <p className="text-xs text-white/50 capitalize mb-1">{key}</p>
                  <p className="text-lg font-bold" style={{ color: data.color }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Expanded content */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Achievements */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {data.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <span style={{ color: data.color }}>▸</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Skills */}
              <div>
                <h4 className="text-sm font-semibold text-white/80 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0 }}
                      animate={{ scale: isExpanded ? 1 : 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="px-3 py-1 text-xs rounded-full border"
                      style={{
                        backgroundColor: `${data.color}20`,
                        borderColor: data.color,
                        color: data.color,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Timeline node */}
        <div className="relative flex flex-col items-center">
          {/* Connector line */}
          {!isLast && (
            <motion.div
              className="absolute top-12 w-0.5 h-full"
              // style={{ backgroundColor: data.color }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              style={{
                transformOrigin: 'top',
                backgroundColor: data.color,
              }}
            />
          )}
          
          {/* Node circle */}
          <motion.div
            className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: data.color }}
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            whileHover={{ scale: 1.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: data.color }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            <span className="text-white font-bold relative z-10">{index + 1}</span>
          </motion.div>
        </div>
        
        {/* Empty space for alternating layout */}
        <div className="flex-1" />
      </div>
    </motion.div>
  );
}

// Stats overview
function JourneyStats() {
  const stats = [
    { label: 'Years Experience', value: '3+', icon: Calendar, color: '#FF6B6B' },
    { label: 'Companies', value: '3', icon: Briefcase, color: '#4ECDC4' },
    { label: 'Projects Shipped', value: '15+', icon: Rocket, color: '#95E1D3' },
    { label: 'Skills Acquired', value: '20+', icon: Award, color: '#FFE66D' },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-xl backdrop-blur-xl border border-white/10 text-center"
          style={{
            background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
          }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{ backgroundColor: `${stat.color}30` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <stat.icon size={24} style={{ color: stat.color }} />
          </motion.div>
          <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-white/60">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Career progression chart
function ProgressionChart() {
  const progression = [
    { year: '2022', level: 20, label: 'Junior' },
    { year: '2023', level: 45, label: 'Mid-level' },
    { year: '2024', level: 75, label: 'Senior' },
    { year: '2025', level: 90, label: 'Lead-ready' },
  ];
  
  return (
    <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 mb-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-primary" size={24} />
        <h3 className="text-xl font-bold text-white">Career Growth Trajectory</h3>
      </div>
      
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-white/50">
          <span>Expert</span>
          <span>Senior</span>
          <span>Mid</span>
          <span>Junior</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-12 h-full relative">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <div
              key={value}
              className="absolute w-full border-t border-white/10"
              style={{ bottom: `${value}%` }}
            />
          ))}
          
          {/* Progress line */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="50%" stopColor="#4ECDC4" />
                <stop offset="100%" stopColor="#95E1D3" />
              </linearGradient>
            </defs>
            <motion.path
              d={`M 0 ${100 - progression[0].level}% ${progression.map((p, i) => 
                `L ${(i / (progression.length - 1)) * 100}% ${100 - p.level}%`
              ).join(' ')}`}
              stroke="url(#progressGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </svg>
          
          {/* Data points */}
          {progression.map((point, index) => (
            <motion.div
              key={point.year}
              className="absolute"
              style={{
                left: `${(index / (progression.length - 1)) * 100}%`,
                bottom: `${point.level}%`,
                transform: 'translate(-50%, 50%)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + index * 0.1 }}
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-primary" 
                  style={{ boxShadow: '0 0 10px #00ffc6' }} 
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs font-bold text-white">{point.year}</div>
                  <div className="text-xs text-white/50">{point.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main component
export default function InteractiveCareerTimeline({ className = '' }) {
  return (
    <div className={`space-y-12 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Career Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg"
        >
          From Junior Engineer to Backend Specialist • 2022 – Present
        </motion.p>
      </div>
      
      {/* Stats overview */}
      <JourneyStats />
      
      {/* Progression chart */}
      <ProgressionChart />
      
      {/* Timeline */}
      <div className="relative space-y-24 py-12">
        {careerData.map((data, index) => (
          <TimelineMilestone
            key={data.id}
            data={data}
            index={index}
            isLast={index === careerData.length - 1}
          />
        ))}
      </div>
      
      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="p-8 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-xl border border-primary/30 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-3">Ready for the Next Challenge</h3>
        <p className="text-white/70 mb-6">
          Looking for opportunities to architect scalable systems and lead technical initiatives
        </p>
        <motion.button
          className="px-8 py-3 rounded-xl bg-primary text-black font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Connect
        </motion.button>
      </motion.div>
    </div>
  );
}
