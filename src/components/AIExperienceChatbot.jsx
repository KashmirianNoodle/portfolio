import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageCircle, X, Minimize2, Zap } from 'lucide-react';

// Knowledge base about the portfolio owner
const knowledgeBase = `
# About Mir Shafeeq

## Professional Summary
Backend Engineer with 3+ years of experience building high-performance, cloud-native systems. Specialized in Node.js, TypeScript, AWS serverless architecture, and event-driven systems.

## Current Role
Backend Developer at Atomic House (May 2025 – Nov 2025)
- Reduced P95 latency from 180ms to 45ms via DynamoDB migration
- Cut database queries by 70% using Redis caching
- Improved API performance by 60% for 50K+ daily requests
- Refactored monolith reducing complexity by 35%

## Previous Experience
1. Software Development Engineer at Zithara (Mar 2024 – Oct 2024)
   - Built dynamic query builder processing 100K+ records in <2s
   - Designed AWS EventBridge scheduler for 500+ campaigns/month
   - Implemented WebSocket chat with Redis Pub/Sub (<200ms latency)
   - Added Cognito MFA reducing unauthorized access by 85%

2. Junior Software Engineer at Growpital (Sep 2022 – Feb 2024)
   - Built event-driven payment system processing 50K+ transactions
   - Developed admin impersonation tool reducing support time by 70%
   - Automated contract workflow reducing processing time by 40%
   - Expanded API test coverage from 15% to 45%

## Technical Skills
- Backend: Node.js, TypeScript, Express, NestJS
- Databases: PostgreSQL, DynamoDB, MongoDB, Redis
- Cloud: AWS Lambda, EC2, S3, API Gateway, EventBridge, SNS, SQS
- Architecture: Microservices, Event-Driven, Caching Strategies, System Design
- Tools: Docker, Git, Jest, Sequelize, Prisma

## Key Achievements
- Processed Rs 100Cr+ in investment transactions
- Reduced latency by 75% through optimization
- Improved test coverage by 30%
- Built systems handling 2M+ requests daily

## Contact
Email: xackfaizu@gmail.com
LinkedIn: linkedin.com/in/kashmirinoodle
GitHub: github.com/KashmirianNoodle
`;

// Suggested questions
const suggestedQuestions = [
  "What's your experience with AWS?",
  "Tell me about your recent projects",
  "What databases have you worked with?",
  "How did you improve API performance?",
  "What's your tech stack?",
  "Can you explain your event-driven architecture experience?",
];

// FREE AI OPTIONS - No API key needed!

// Option 1: Use Hugging Face Inference API (FREE - No API key required)
async function getHuggingFaceResponse(message, context) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are a helpful assistant answering questions about Mir Shafeeq's professional background. Use this context to answer questions accurately and concisely.

Context:
${context}

Question: ${message}

Answer (be concise and friendly):`,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error('AI service temporarily unavailable');
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      // Extract just the answer part
      const fullText = data[0].generated_text;
      const answerStart = fullText.indexOf('Answer (be concise and friendly):') + 'Answer (be concise and friendly):'.length;
      const answer = fullText.substring(answerStart).trim();
      return answer || "I can help you learn more about Mir's experience! What would you like to know?";
    }
    
    throw new Error('Unexpected response format');
  } catch (error) {
    console.error('Hugging Face error:', error);
    // Fallback to pattern matching
    return null;
  }
}

// Option 2: Use Web LLM (Runs locally in browser - completely free!)
// This uses WebGPU to run models locally
async function getWebLLMResponse(message, context) {
  // Note: This requires @mlc-ai/web-llm package
  // For now, we'll return null and use pattern matching
  // Uncomment and install the package to enable:
  
  /*
  try {
    const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
    
    if (!window.mlcEngine) {
      window.mlcEngine = await CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC");
    }
    
    const prompt = `Based on this professional background:\n\n${context}\n\nAnswer this question: ${message}`;
    const response = await window.mlcEngine.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Web LLM error:', error);
    return null;
  }
  */
  return null;
}

// Pattern matching fallback (no AI needed)
function getPatternMatchResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('experience') || lowerMessage.includes('years')) {
    return "I have 3+ years of professional experience as a Backend Engineer. I've worked at Atomic House, Zithara, and Growpital, progressively taking on more complex challenges. My experience spans from building payment systems processing Rs 100Cr+ to optimizing high-traffic APIs handling 50K+ daily requests.";
  }

  if (lowerMessage.includes('aws') || lowerMessage.includes('cloud')) {
    return "I have extensive AWS experience! I've worked with Lambda for serverless functions, DynamoDB for NoSQL storage, EventBridge for event scheduling, SNS/SQS for messaging, API Gateway for REST APIs, and EC2/ECS for compute. At Atomic House, I reduced P95 latency from 180ms to 45ms by migrating to DynamoDB with optimized partition keys.";
  }

  if (lowerMessage.includes('database') || lowerMessage.includes('db')) {
    return "I've worked with multiple databases: PostgreSQL for relational data with complex queries, DynamoDB for high-scale NoSQL workloads, MongoDB for flexible document storage, and Redis for caching and pub/sub. I reduced database queries by 70% using Redis caching strategies at Atomic House.";
  }

  if (lowerMessage.includes('project')) {
    return "Some notable projects: (1) Event-Driven Payment System - processed 50K+ transactions supporting Rs 100Cr+ investment volume using AWS SNS/SQS/Lambda. (2) Dynamic Query Builder - processes 100K+ records in <2s with 15+ operators and nested conditions. (3) High-Performance Caching Layer - Redis-based system reducing DB load by 70%. (4) WebSocket Chat - real-time messaging with <200ms latency using Redis Pub/Sub.";
  }

  if (lowerMessage.includes('performance') || lowerMessage.includes('optimize')) {
    return "I've achieved significant performance improvements: reduced P95 latency from 180ms to 45ms through DynamoDB migration and query optimization, cut database queries by 70% using strategic Redis caching, and improved API performance by 60% for 50K+ daily requests. I focus on identifying bottlenecks through profiling and implementing targeted optimizations.";
  }

  if (lowerMessage.includes('stack') || lowerMessage.includes('technologies')) {
    return "My tech stack: Backend - Node.js, TypeScript, Express, NestJS. Databases - PostgreSQL, DynamoDB, MongoDB, Redis. Cloud - AWS (Lambda, EC2, S3, EventBridge, SNS, SQS). Architecture - Microservices, Event-Driven patterns. I'm always learning and recently added NestJS to my toolkit for building scalable server-side applications.";
  }

  if (lowerMessage.includes('event') || lowerMessage.includes('async')) {
    return "I specialize in event-driven architecture! I've built systems using AWS SNS/SQS for asynchronous message processing, EventBridge for scheduled campaigns (500+/month), and implemented idempotent consumers with retry strategies. This architecture pattern is great for decoupling services and handling high-scale workloads reliably.";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('hire')) {
    return "I'd love to connect! You can reach me at xackfaizu@gmail.com or find me on LinkedIn at linkedin.com/in/kashmirinoodle. I'm also active on GitHub as KashmirianNoodle. Feel free to reach out about opportunities or just to chat about backend architecture!";
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! 👋 I'm an AI assistant that can answer questions about Mir Shafeeq's professional background. I can tell you about his experience, skills, projects, and achievements. What would you like to know?";
  }

  return "That's a great question! Based on Mir's experience as a Backend Engineer with 3+ years in Node.js, AWS, and distributed systems, I can help you learn more about his technical skills, projects, or achievements. Could you be more specific about what you'd like to know?";
}

// Main AI response function
async function getAIResponse(message, history, aiMode = 'huggingface') {
  // Simulate typing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let aiResponse = null;

  // Try AI first (if enabled)
  if (aiMode === 'huggingface') {
    aiResponse = await getHuggingFaceResponse(message, knowledgeBase);
  } else if (aiMode === 'webllm') {
    aiResponse = await getWebLLMResponse(message, knowledgeBase);
  }

  // Fallback to pattern matching if AI fails or is disabled
  if (!aiResponse) {
    return getPatternMatchResponse(message);
  }

  return aiResponse;
}

export default function AIExperienceChatbot({ className = '', minimal = false }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm an AI assistant trained on Mir Shafeeq's professional experience. Ask me anything about his background, skills, projects, or achievements!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!minimal);
  const [isMinimized, setIsMinimized] = useState(false);
  const [aiMode, setAiMode] = useState('huggingface'); // 'huggingface', 'webllm', or 'pattern'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(input, messages, aiMode);
      
      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  if (minimal && !isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-primary to-blue-500 text-black shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <MessageCircle size={28} />
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>
    );
  }

  return (
    <motion.div
      layout
      className={`
        ${minimal 
          ? 'fixed bottom-6 right-6 z-50 w-96 h-[600px]' 
          : className
        }
        flex flex-col
        rounded-2xl overflow-hidden
        bg-gradient-to-br from-slate-900 to-slate-800
        border-2 border-primary/30
        shadow-2xl
      `}
      initial={minimal ? { scale: 0, opacity: 0 } : {}}
      animate={minimal ? { scale: 1, opacity: 1 } : {}}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center"
            >
              <Bot className="text-black" size={20} />
            </motion.div>
            <div>
              <h3 className="text-white font-bold flex items-center gap-2">
                AI Assistant
                {aiMode === 'huggingface' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    AI Powered
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <span>
                  {aiMode === 'huggingface' ? 'AI Active' : 'Smart Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {/* AI Mode Toggle */}
            <button
              onClick={() => setAiMode(aiMode === 'huggingface' ? 'pattern' : 'huggingface')}
              className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
              title={aiMode === 'huggingface' ? 'Using Free AI' : 'Using Pattern Matching'}
            >
              <Zap size={18} className={aiMode === 'huggingface' ? 'text-purple-400' : 'text-white/40'} />
            </button>

            {minimal && (
              <>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
                >
                  <Minimize2 size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
                >
                  <X size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${message.role === 'user'
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-br from-primary to-blue-500'
                      }
                    `}
                  >
                    {message.role === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-black" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`
                      flex-1 p-3 rounded-2xl
                      ${message.role === 'user'
                        ? 'bg-blue-500/20 border border-blue-500/30 ml-12'
                        : 'bg-white/5 border border-white/10 mr-12'
                      }
                    `}
                  >
                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span className="text-xs text-white/40 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <Bot size={16} className="text-black" />
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white/60"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white/60"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white/60"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-white/40 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/10 p-4 bg-black/20">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="
                  flex-1 px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white placeholder-white/40
                  focus:outline-none focus:border-primary/50
                  transition
                "
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`
                  p-3 rounded-xl
                  ${input.trim() && !isLoading
                    ? 'bg-gradient-to-br from-primary to-blue-500 text-black'
                    : 'bg-white/5 text-white/40 cursor-not-allowed'
                  }
                  transition-all
                `}
                whileHover={input.trim() && !isLoading ? { scale: 1.05 } : {}}
                whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
              >
                <Send size={20} />
              </motion.button>
            </div>

            <p className="text-xs text-white/30 mt-2 flex items-center gap-1">
              <Sparkles size={12} />
              {aiMode === 'huggingface' 
                ? 'Powered by Free AI (Hugging Face) • No API key needed'
                : 'Smart Pattern Matching • Fast & Reliable'
              }
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}
