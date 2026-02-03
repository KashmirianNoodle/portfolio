import { useEffect, useState, useRef } from "react";

const commands = [
  {
    cmd: "whoami",
    output: "Mir Shafeeq",
  },
  {
    cmd: "stack",
    output:
      "Node.js · TypeScript · Express · AWS · DynamoDB · PostgreSQL · Redis · GraphQL · WebSockets",
  },
  {
    cmd: "focus",
    output:
      "Distributed Systems · Event-Driven Architecture · Microservices · Auth · Caching · Serverless",
  },
];

function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString("en-IN", { hour12: false });
}

export default function TerminalTyping({ onGlitch }) {
  const [history, setHistory] = useState([]);
  const [typed, setTyped] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [phase, setPhase] = useState("boot");
  const [glitch, setGlitch] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const containerRef = useRef(null);

  // Auto-scroll inside terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
  }, [history]);

  // Random subtle glitch flicker
  useEffect(() => {
    const interval = setInterval(() => {
      triggerGlitch();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = () => {
    setGlitch(true);
    if (onGlitch) onGlitch(true);

    setTimeout(() => {
      setGlitch(false);
      if (onGlitch) onGlitch(false);
    }, 120);
  };

  useEffect(() => {
    let timeout;

    if (phase === "boot") {
      timeout = setTimeout(() => {
        setHistory([
          {
            timestamp: getTimestamp(),
            cmd: "system",
            output: "Access granted ✔",
          },
        ]);
        setPhase("boot-wait");
      }, 800);
    }

    else if (phase === "boot-wait") {
      timeout = setTimeout(() => {
        setPhase("typing");
      }, 1200);
    }

    else if (phase === "typing") {
      const current = commands[cmdIndex];

      if (typed.length < current.cmd.length) {
        timeout = setTimeout(() => {
          setTyped(current.cmd.slice(0, typed.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => setPhase("output"), 400);
      }
    }

    else if (phase === "output") {
      const current = commands[cmdIndex];

      timeout = setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            timestamp: getTimestamp(),
            cmd: current.cmd,
            output: current.output,
          },
        ]);
        setTyped("");
        setPhase("wait");
      }, 200);
    }

    else if (phase === "wait") {
      timeout = setTimeout(() => {
        if (cmdIndex === commands.length - 1) {
          setPhase("clear-command");
        } else {
          setCmdIndex((prev) => prev + 1);
          setPhase("typing");
        }
      }, 1500);
    }

    else if (phase === "clear-command") {
      const clearCmd = "clear";

      if (typed.length < clearCmd.length) {
        timeout = setTimeout(() => {
          setTyped(clearCmd.slice(0, typed.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            {
              timestamp: getTimestamp(),
              cmd: "clear",
              output: "Resetting session...",
            },
          ]);
          setTyped("");
          setPhase("glitch");
        }, 500);
      }
    }

    else if (phase === "glitch") {
      triggerGlitch();
      timeout = setTimeout(() => {
        setPhase("wipe");
      }, 600);
    }

    else if (phase === "wipe") {
      timeout = setTimeout(() => {
        setHistory([]);
        setCmdIndex(0);
        setPhase("typing");
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [phase, typed, cmdIndex]);

  // 3D Tilt Effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 8;
    const rotateY = ((x / rect.width) - 0.5) * -8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const resetTilt = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={tiltStyle}
      className={`relative bg-black/90 border border-cyan-500/20 rounded-2xl 
      p-6 font-mono backdrop-blur-xl 
      shadow-[0_0_60px_rgba(0,255,255,0.15)] 
      text-[13px] leading-relaxed 
      w-full max-w-xl h-[340px] overflow-hidden
      transition-transform duration-200 ease-out
      ${glitch ? "animate-pulse" : ""}`}
    >

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] 
        bg-[size:100%_3px] opacity-20" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-white/40 text-xs">
          mir@cyber-shell
        </span>
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="space-y-3 relative z-10 h-full overflow-y-auto pr-2"
      >

        {history.map((entry, i) => (
          <div key={i}>
            <p className="text-green-400">
              <span className="text-white/30 mr-2">
                [{entry.timestamp}]
              </span>
              $ {entry.cmd}
            </p>

            <p
              className={`${
                entry.cmd === "system"
                  ? "text-cyan-400"
                  : "text-white/80"
              }`}
            >
              {entry.output}
            </p>
          </div>
        ))}

        {(phase === "typing" || phase === "clear-command") && (
          <p className="text-green-400">
            <span className="text-white/30 mr-2">
              [{getTimestamp()}]
            </span>
            $ {typed}
            {phase === "typing" && (
              <span className="ml-1 text-cyan-400 animate-pulse">
                ▋
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
