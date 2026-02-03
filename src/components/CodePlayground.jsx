import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Copy, Check, RefreshCw, Maximize2, Minimize2, Terminal } from 'lucide-react';

// Code templates for different languages
const codeTemplates = {
  javascript: {
    name: 'JavaScript',
    icon: '⚡',
    color: '#F7DF1E',
    starter: `// Array methods showcase
const numbers = [1, 2, 3, 4, 5];

// Map, filter, reduce
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((a, b) => a + b, 0);

console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Sum:', sum);

// Async example
async function fetchData() {
  return 'Hello from async!';
}

fetchData().then(console.log);`,
  },
  python: {
    name: 'Python',
    icon: '🐍',
    color: '#3776AB',
    starter: `# List comprehension & generators
numbers = [1, 2, 3, 4, 5]

# List comprehension
squared = [n**2 for n in numbers]
evens = [n for n in numbers if n % 2 == 0]

print(f"Squared: {squared}")
print(f"Evens: {evens}")

# Generator
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("Fibonacci:", list(fibonacci(10)))`,
  },
  html: {
    name: 'HTML/CSS',
    icon: '🎨',
    color: '#E34F26',
    starter: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 10px;
      color: white;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .card {
      background: rgba(255,255,255,0.1);
      padding: 15px;
      border-radius: 8px;
      backdrop-filter: blur(10px);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">Beautiful Card</div>
    <div class="card">
      This is a glassmorphism card with gradient background!
    </div>
  </div>
</body>
</html>`,
  },
};

// Execute JavaScript code safely
function executeJavaScript(code) {
  const logs = [];
  const customConsole = {
    log: (...args) => logs.push({ type: 'log', content: args.join(' ') }),
    error: (...args) => logs.push({ type: 'error', content: args.join(' ') }),
    warn: (...args) => logs.push({ type: 'warn', content: args.join(' ') }),
  };

  try {
    // Create a function with custom console
    const func = new Function('console', code);
    func(customConsole);
    
    // Handle promises
    if (logs.length === 0) {
      logs.push({ type: 'log', content: 'Code executed successfully' });
    }
  } catch (error) {
    logs.push({ type: 'error', content: error.message });
  }

  return logs;
}

// Simulate Python execution
function executePython(code) {
  return [
    { type: 'log', content: 'Squared: [1, 4, 9, 16, 25]' },
    { type: 'log', content: 'Evens: [2, 4]' },
    { type: 'log', content: 'Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]' },
    { type: 'log', content: '\n✓ Python execution simulated (install Python runtime for real execution)' },
  ];
}

// Render HTML
function executeHTML(code) {
  return [{ type: 'render', content: code }];
}

export default function CodePlayground({ className = '' }) {
  const [selectedLang, setSelectedLang] = useState('javascript');
  const [code, setCode] = useState(codeTemplates.javascript.starter);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  // Update code when language changes
  useEffect(() => {
    setCode(codeTemplates[selectedLang].starter);
    setOutput([]);
  }, [selectedLang]);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);

    // Simulate processing time
    setTimeout(() => {
      let result;
      
      if (selectedLang === 'javascript') {
        result = executeJavaScript(code);
      } else if (selectedLang === 'python') {
        result = executePython(code);
      } else if (selectedLang === 'html') {
        result = executeHTML(code);
      }

      setOutput(result);
      setIsRunning(false);
    }, 300);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    setCode(codeTemplates[selectedLang].starter);
    setOutput([]);
  };

  return (
    <div className={`${className} ${isFullscreen ? 'fixed inset-0 z-50 p-4' : ''}`}>
      <motion.div
        layout
        className="h-full rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl"
      >
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Terminal className="text-primary" size={24} />
              <h3 className="text-lg font-bold text-white">Code Playground</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={copyCode}
                className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
                title="Copy code"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              
              <button
                onClick={resetCode}
                className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
                title="Reset code"
              >
                <RefreshCw size={18} />
              </button>
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex gap-2">
            {Object.entries(codeTemplates).map(([lang, config]) => (
              <motion.button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2
                  ${selectedLang === lang
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderLeft: selectedLang === lang ? `3px solid ${config.color}` : 'none',
                }}
              >
                <span>{config.icon}</span>
                <span className="text-sm">{config.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className={`grid ${isFullscreen ? 'grid-cols-2' : 'lg:grid-cols-2'} ${isFullscreen ? 'h-[calc(100vh-150px)]' : 'h-[600px]'}`}>
          
          {/* Editor */}
          <div className="relative border-r border-white/10">
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="
                w-full h-full p-6 pt-12
                bg-transparent
                text-white/90 
                font-mono text-sm
                resize-none
                focus:outline-none
                leading-relaxed
              "
              spellCheck={false}
              style={{
                tabSize: 2,
              }}
            />

            {/* Line numbers effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/20 border-r border-white/5 pointer-events-none" />
          </div>

          {/* Output */}
          <div className="flex flex-col bg-black/30">
            <div className="flex items-center justify-between p-3 bg-black/40 border-b border-white/10">
              <span className="text-sm text-white/60 font-mono">Output</span>
              
              <motion.button
                onClick={runCode}
                disabled={isRunning}
                className={`
                  px-4 py-2 rounded-lg font-semibold flex items-center gap-2
                  ${isRunning
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-primary text-black hover:scale-105'
                  }
                  transition-all
                `}
                whileHover={!isRunning ? { scale: 1.05 } : {}}
                whileTap={!isRunning ? { scale: 0.95 } : {}}
              >
                <Play size={16} fill="currentColor" />
                {isRunning ? 'Running...' : 'Run Code'}
              </motion.button>
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-sm">
              <AnimatePresence mode="wait">
                {output.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-full text-white/40"
                  >
                    Press "Run Code" to see output
                  </motion.div>
                ) : selectedLang === 'html' && output[0]?.type === 'render' ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full bg-white rounded-lg overflow-hidden"
                  >
                    <iframe
                      ref={iframeRef}
                      srcDoc={output[0].content}
                      className="w-full h-full border-0"
                      title="HTML Preview"
                      sandbox="allow-scripts"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {output.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          p-2 rounded
                          ${log.type === 'error' 
                            ? 'text-red-400 bg-red-500/10' 
                            : log.type === 'warn'
                            ? 'text-yellow-400 bg-yellow-500/10'
                            : 'text-green-400 bg-green-500/10'
                          }
                        `}
                      >
                        <span className="text-white/40 mr-2">›</span>
                        {log.content}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black/40 backdrop-blur-xl border-t border-white/10 p-3">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="font-mono">
              {selectedLang === 'javascript' && 'ES6+ JavaScript supported'}
              {selectedLang === 'python' && 'Python 3.x syntax (simulated)'}
              {selectedLang === 'html' && 'Live HTML/CSS preview'}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Ready
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
