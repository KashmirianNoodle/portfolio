export const personalInfo = {
  name: "Mir Shafeeq",
  title: "Backend Engineer | Node.js • TypeScript • AWS Serverless",
  summary: "Backend engineer with 3+ years building high-performance, cloud-native systems processing millions of requests. Specialized in AWS serverless, event-driven systems, database migrations, and large-scale optimizations.",
  email: "xackfaizu@gmail.com",
  linkedin: "https://linkedin.com/in/kashmirinoodle",
  github: "https://github.com/KashmirianNoodle",
};

export const metrics = [
  { label: "Latency Reduced", value: 60 },
  { label: "Monthly Transactions", value: 2000000 },
  { label: "Cost Savings ($/mo)", value: 800 },
  { label: "Query Latency Drop (ms)", value: 135 },
];

export const experiences = [
  {
    company: "Atomic House",
    role: "Backend Developer",
    period: "May 2025 – Nov 2025",
    highlights: ["Reduced P95 latency from 180ms → 45ms via DynamoDB migration", "Cut database queries by 70% using Redis caching", "Improved API performance by 60% for 50K+ daily requests", "Refactored monolith into modular services (35% complexity reduction)"],
  },
  {
    company: "Zithara",
    role: "Software Development Engineer",
    period: "Mar 2024 – Oct 2024",
    highlights: ["Built dynamic query builder processing 100K+ records <2s", "Designed AWS EventBridge scheduler for 500+ campaigns/month", "WebSocket chat with Redis Pub/Sub (<200ms latency)", "Implemented Cognito MFA reducing unauthorized access by 85%"],
  },
  {
    company: "Growpital",
    role: "Junior Software Engineer",
    period: "Sep 2022 – Feb 2024",
    highlights: ["Event-driven payment system (50K+ transactions)", "Admin impersonation tool reducing support time by 70%", "Automated contract workflow reducing processing time by 40%", "Expanded API test coverage from 15% → 45%"],
  },
];

export const systemDesigns = [
  {
    title: "High-Performance Caching Layer",
    stack: "Node.js + Redis + DynamoDB",
    description: "Designed a multi-tier caching architecture reducing DB load by 70%. Implemented TTL-based invalidation and write-through strategies.",
  },
  {
    title: "Event-Driven Payment Architecture",
    stack: "AWS SNS + SQS + Lambda",
    description: "Built scalable async processing pipeline handling 50K+ transactions with retry mechanisms and idempotency safeguards.",
  },
  {
    title: "Dynamic Query Builder Engine",
    stack: "Node.js + Sequelize + PostgreSQL",
    description: "Built flexible filter engine supporting 15+ operators, nested conditions, and dynamic joins for real-time segmentation.",
  },
];

export const projects = [
  {
    title: "Dynamic Query Builder Engine",
    description: "Flexible segmentation engine enabling real-time filtering of 100K+ records using 15+ operators with nested AND/OR conditions.",
    tech: ["Node.js", "Sequelize", "PostgreSQL"],
    impact: "Reduced segmentation time to <2 seconds",
    details: "Built an extensible query parser that dynamically constructed SQL conditions. Implemented operator mapping, safe validation, and optimized indexing strategy for performance.",
  },
  {
    title: "High-Performance Caching Layer",
    description: "Redis-based multi-tier caching system reducing DB load by 70%.",
    tech: ["Node.js", "Redis", "DynamoDB"],
    impact: "Improved API response time by 60%",
    details: "Designed TTL-based cache invalidation and write-through mechanisms. Optimized key strategy to prevent hot partition issues.",
  },
  {
    title: "Event-Driven Payment Processing",
    description: "Scalable async payment architecture handling 50K+ transactions.",
    tech: ["AWS SNS", "SQS", "Lambda"],
    impact: "Supported Rs 100Cr+ investment volume",
    details: "Implemented idempotent consumers with retry strategies and dead-letter queues. Ensured fault tolerance across distributed services.",
  },
  {
    title: "WebSocket Real-Time Chat System",
    description: "Low-latency messaging system with Redis Pub/Sub.",
    tech: ["Node.js", "WebSocket", "Redis"],
    impact: "<200ms message delivery latency",
    details: "Engineered scalable pub/sub pattern for multi-instance deployments with connection state synchronization.",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "Tailwind", "Framer Motion"]
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"]
  },
  {
    title: "System Design",
    icon: "🧠",
    skills: ["Scalability", "Caching", "Load Balancing", "Microservices"]
  },
  {
    title: "DevOps",
    icon: "🚀",
    skills: ["Docker", "CI/CD", "AWS", "Nginx"]
  }
];
