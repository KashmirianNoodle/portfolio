import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Skill data with progression over time
const skillProgressionData = {
  backend: [
    { skill: 'Node.js', levels: [20, 40, 65, 85, 95], color: '#68A063' },
    { skill: 'TypeScript', levels: [10, 30, 60, 80, 90], color: '#3178C6' },
    { skill: 'Express', levels: [30, 50, 70, 85, 92], color: '#000000' },
    { skill: 'NestJS', levels: [0, 20, 45, 70, 85], color: '#E0234E' },
  ],
  databases: [
    { skill: 'PostgreSQL', levels: [15, 35, 60, 80, 90], color: '#336791' },
    { skill: 'MongoDB', levels: [25, 45, 65, 80, 88], color: '#47A248' },
    { skill: 'Redis', levels: [10, 30, 55, 75, 88], color: '#DC382D' },
    { skill: 'DynamoDB', levels: [0, 15, 40, 65, 82], color: '#4053D6' },
  ],
  cloud: [
    { skill: 'AWS Lambda', levels: [0, 25, 50, 75, 88], color: '#FF9900' },
    { skill: 'EC2/ECS', levels: [10, 30, 55, 75, 85], color: '#FF9900' },
    { skill: 'S3', levels: [20, 40, 65, 80, 90], color: '#569A31' },
    { skill: 'API Gateway', levels: [0, 20, 45, 70, 85], color: '#945DF2' },
  ],
  architecture: [
    { skill: 'Microservices', levels: [0, 20, 50, 75, 88], color: '#00D8FF' },
    { skill: 'Event-Driven', levels: [0, 25, 55, 80, 92], color: '#FF6B6B' },
    { skill: 'Caching', levels: [10, 35, 60, 80, 90], color: '#4ECDC4' },
    { skill: 'System Design', levels: [5, 30, 60, 80, 90], color: '#95E1D3' },
  ]
};

const timeLabels = ['2022', '2023 Q2', '2024 Q1', '2024 Q4', '2025'];

// Circular progress indicator
function CircularProgress({ percentage, size = 120, strokeWidth = 8, color = '#00ffc6' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          strokeDasharray: circumference,
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
      />
    </svg>
  );
}

// Line chart component
function SkillLineChart({ data, category }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const width = 600;
  const height = 300;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const xStep = chartWidth / (timeLabels.length - 1);
  const yMax = 100;
  
  const getPath = (levels) => {
    return levels.map((level, i) => {
      const x = padding.left + i * xStep;
      const y = padding.top + chartHeight - (level / yMax) * chartHeight;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
  };
  
  return (
    <div ref={ref} className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ maxHeight: '400px' }}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => {
          const y = padding.top + chartHeight - (value / yMax) * chartHeight;
          return (
            <g key={value}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fill="rgba(255, 255, 255, 0.5)"
                fontSize="12"
              >
                {value}%
              </text>
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {timeLabels.map((label, i) => {
          const x = padding.left + i * xStep;
          return (
            <text
              key={i}
              x={x}
              y={height - padding.bottom + 25}
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.5)"
              fontSize="12"
            >
              {label}
            </text>
          );
        })}
        
        {/* Skill lines */}
        {data.map((skillData, index) => {
          const path = getPath(skillData.levels);
          const isHovered = hoveredSkill === skillData.skill;
          
          return (
            <g key={skillData.skill}>
              {/* Gradient definition */}
              <defs>
                <linearGradient id={`gradient-${category}-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={skillData.color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={skillData.color} stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area under line */}
              <motion.path
                d={`${path} L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`}
                fill={`url(#gradient-${category}-${index})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 0.3 : 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
              
              {/* Line */}
              <motion.path
                d={path}
                stroke={skillData.color}
                strokeWidth={isHovered ? 4 : 2}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isInView ? 1 : 0, 
                  opacity: isInView ? 1 : 0 
                }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                style={{
                  filter: isHovered ? `drop-shadow(0 0 8px ${skillData.color})` : 'none',
                }}
                onMouseEnter={() => setHoveredSkill(skillData.skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              />
              
              {/* Data points */}
              {skillData.levels.map((level, i) => {
                const x = padding.left + i * xStep;
                const y = padding.top + chartHeight - (level / yMax) * chartHeight;
                
                return (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={skillData.color}
                    initial={{ scale: 0 }}
                    animate={{ scale: isInView ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 1.5 + index * 0.1 + i * 0.05 }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${skillData.color})`,
                    }}
                    onMouseEnter={() => setHoveredSkill(skillData.skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        {data.map((skillData) => (
          <motion.button
            key={skillData.skill}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              hoveredSkill === skillData.skill
                ? 'bg-white/20 scale-105'
                : 'bg-white/5'
            }`}
            onMouseEnter={() => setHoveredSkill(skillData.skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: skillData.color,
                boxShadow: `0 0 8px ${skillData.color}`
              }}
            />
            <span className="text-sm text-white/80">{skillData.skill}</span>
            <span className="text-xs text-white/50 font-mono">
              {skillData.levels[skillData.levels.length - 1]}%
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Radial progress bars
function RadialSkillBars({ skills }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {skills.map((skill, index) => {
        const currentLevel = skill.levels[skill.levels.length - 1];
        
        return (
          <motion.div
            key={skill.skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              scale: isInView ? 1 : 0.8 
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative">
              <CircularProgress
                percentage={currentLevel}
                size={100}
                strokeWidth={8}
                color={skill.color}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {currentLevel}%
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{skill.skill}</p>
              <p className="text-xs text-white/50">Current Level</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Main component
export default function AnimatedSkillCharts({ className = '' }) {
  const [selectedCategory, setSelectedCategory] = useState('backend');
  const [viewMode, setViewMode] = useState('line'); // 'line' or 'radial'
  
  const categories = [
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'databases', label: 'Databases', icon: '💾' },
    { id: 'cloud', label: 'Cloud & AWS', icon: '☁️' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  ];
  
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Skill Progression Over Time
          </h2>
          <p className="text-white/60">
            Track my technical growth from 2022 to present
          </p>
        </div>
        
        {/* View mode toggle */}
        <div className="flex gap-2 p-1 bg-black/40 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('line')}
            className={`px-4 py-2 rounded-md transition-all ${
              viewMode === 'line'
                ? 'bg-primary text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            📈 Timeline
          </button>
          <button
            onClick={() => setViewMode('radial')}
            className={`px-4 py-2 rounded-md transition-all ${
              viewMode === 'radial'
                ? 'bg-primary text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ⭕ Current
          </button>
        </div>
      </div>
      
      {/* Category tabs */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === category.id
                ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,255,198,0.3)]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </motion.button>
        ))}
      </div>
      
      {/* Chart display */}
      <motion.div
        key={`${selectedCategory}-${viewMode}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10"
      >
        {viewMode === 'line' ? (
          <SkillLineChart
            data={skillProgressionData[selectedCategory]}
            category={selectedCategory}
          />
        ) : (
          <RadialSkillBars skills={skillProgressionData[selectedCategory]} />
        )}
      </motion.div>
      
      {/* Stats summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10">
          <p className="text-sm text-white/60 mb-2">Average Growth</p>
          <p className="text-3xl font-bold text-white">+68%</p>
          <p className="text-xs text-white/40 mt-1">Since 2022</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10">
          <p className="text-sm text-white/60 mb-2">Skills Mastered</p>
          <p className="text-3xl font-bold text-white">16</p>
          <p className="text-xs text-white/40 mt-1">Technical competencies</p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10">
          <p className="text-sm text-white/60 mb-2">Latest Skill</p>
          <p className="text-3xl font-bold text-white">NestJS</p>
          <p className="text-xs text-white/40 mt-1">Added 2024</p>
        </div>
      </div>
    </div>
  );
}
