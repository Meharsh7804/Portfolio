'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '@/context/ChaosContext';

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
  id: number;
};

// --- DATA ARRAYS ---
const COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'cd', 'clear', 'dsa', 'coffee', 'sudo', 'vibe', 'joke', 'motivation', 'filmy', 'random', 'roast', 'secret'];

const VIBES = ["lowkey productive, highkey confused", "running on chai and bad decisions", "debugging life since 2003", "powered by anxiety and lofi beats", "in my 'it works on my machine' era"];
const JOKES = ["Why do programmers hate nature? Too many bugs.", "I fixed a bug... it created 3 more. Classic.", "How many programmers does it take to change a light bulb? None, that's a hardware problem.", "Hardware: The part of a computer you can kick."];
const MOTIVATIONS = ["Start messy. Improve later.", "Consistency beats motivation.", "Build first. Perfect later.", "It’s not a bug, it’s an undocumented feature.", "The expert in anything was once a beginner."];
const FILMY = ["Picture abhi baaki hai mere dost... deployment ke baad.", "Don’t underestimate the power of a developer with WiFi.", "Mogambo khush hua... code compile hone ke baad.", "Pushpa, I hate tears... and merge conflicts."];
const RANDOMS = ["You were not supposed to see this.", "System thinking... still thinking...", "Somewhere, a div is still not centered.", "Are we in a simulation?", "Error 418: I'm a teapot."];
const ROASTS = ["DSA dekh ke system hang ho gaya.", "Code likhne se zyada time naming variables me gaya.", "My code is like a joke, if I have to explain it, it's bad.", "Copying from StackOverflow since day 1."];
const SECRETS = ["You unlocked something hidden.", "Curiosity detected. Respect +1.", "The cake is a lie.", "I see you inspecting the element."];

const SYSTEM_LOGS_DATA = [
  "Initializing creativity module...",
  "Bypassing sleep requirements...",
  "Bug detected. Ignoring completely...",
  "Injecting caffeine into memory pool...",
  "Recalibrating UI coordinates...",
  "Attempting to center <div>...",
  "Failure: <div> resisted centering.",
  "Overclocking coffee machine..."
];

const QUOTES = [
  "Code is poetry, debugging is the harsh reality.",
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "Experience is the name everyone gives to their mistakes."
];

// Helper to get random item
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Typewriter Component
function Typewriter({ text, speed = 20, delay = 0, onComplete }: { text: string, speed?: number, delay?: number, onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay, onComplete]);

  return <span>{displayed}</span>;
}

export default function Terminal() {
  const { isChaos } = useChaos();
  
  // Terminal States
  const [history, setHistory] = useState<HistoryEntry[]>([{
    id: 0,
    command: '',
    output: (
      <div className="text-white/70 mb-4 font-mono leading-relaxed">
        <p className="mb-2 text-amber-500 font-bold">Meharsh OS [Version 2.0.0]</p>
        <p>Type <span className="text-amber-500 font-bold">'help'</span> to see available commands. Press TAB for autocomplete.</p>
      </div>
    )
  }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Dashboard States
  const [activeQuote, setActiveQuote] = useState(QUOTES[0]);
  const [logs, setLogs] = useState<string[]>([]);
  const [focusLevel, setFocusLevel] = useState(72);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const historyCounter = useRef(1);

  // Auto-scroll terminal
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isProcessing]);

  // Dashboard Rotations
  useEffect(() => {
    // Rotate quotes
    const quoteInterval = setInterval(() => {
      setActiveQuote(getRandom(QUOTES));
    }, 8000);

    // Rotate focus level slightly
    const focusInterval = setInterval(() => {
      setFocusLevel(prev => Math.min(100, Math.max(10, prev + (Math.floor(Math.random() * 11) - 5))));
    }, 3000);

    // Add random logs
    const logInterval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, getRandom(SYSTEM_LOGS_DATA)].slice(-5);
        return newLogs;
      });
    }, 2500);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(focusInterval);
      clearInterval(logInterval);
    };
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === '') return;
    
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    // Simulate thinking delay
    setIsProcessing(true);
    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);

    setTimeout(() => {
      let outputNode: React.ReactNode = null;
      const id = historyCounter.current++;

      switch (trimmed) {
        case 'help':
          outputNode = (
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4 text-white/80 py-2 space-y-1">
              <li><span className="text-amber-500 w-28 inline-block">about</span>    - A short intro about me</li>
              <li><span className="text-amber-500 w-28 inline-block">skills</span>   - My technical arsenal</li>
              <li><span className="text-amber-500 w-28 inline-block">projects</span> - View my work multiverse</li>
              <li><span className="text-amber-500 w-28 inline-block">contact</span>  - Establish a connection</li>
              <li><span className="text-green-400 w-28 inline-block">vibe</span>     - Current mood check</li>
              <li><span className="text-green-400 w-28 inline-block">joke</span>     - Dev humor</li>
              <li><span className="text-green-400 w-28 inline-block">filmy</span>    - Bollywood x Code</li>
              <li><span className="text-green-400 w-28 inline-block">roast</span>    - Self inflicted damage</li>
              <li><span className="text-green-400 w-28 inline-block">motivation</span> - Because debugging is hard</li>
              <li><span className="text-purple-400 w-28 inline-block">random</span>   - Roll the dice</li>
              <li><span className="text-purple-400 w-28 inline-block">cd</span>       - Change directory</li>
              <li><span className="text-purple-400 w-28 inline-block">clear</span>    - Wipe terminal</li>
            </motion.ul>
          );
          break;
        case 'about':
          outputNode = <div className="text-white/80 py-2"><Typewriter text="Hi, I'm Meharsh. I build scalable web apps and cinematic experiences. I specialize in turning complex problems into elegant interfaces." /></div>;
          break;
        case 'skills':
          outputNode = (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 py-2 space-y-2">
              <p><span className="text-amber-500 font-bold">» React/Next.js:</span> Making the DOM do backflips.</p>
              <p><span className="text-amber-500 font-bold">» Tailwind CSS:</span> Styling faster than light.</p>
              <p><span className="text-amber-500 font-bold">» Framer Motion:</span> Adding the "wow" factor.</p>
              <p><span className="text-amber-500 font-bold">» Node/Express:</span> The invisible heavy lifters.</p>
            </motion.div>
          );
          break;
        case 'projects':
          outputNode = (
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 list-none py-2 space-y-2">
              <li><a href="#projects" className="text-amber-500 hover:underline hover:text-white transition-colors">[1] Neural Dashboard</a></li>
              <li><a href="#projects" className="text-amber-500 hover:underline hover:text-white transition-colors">[2] E-Commerce Core</a></li>
              <li><a href="#projects" className="text-amber-500 hover:underline hover:text-white transition-colors">[3] Portfolio v3</a></li>
            </motion.ul>
          );
          break;
        case 'contact':
          outputNode = <div className="text-white/80 py-2"><Typewriter text="Type 'cd #contact' or scroll to the bottom to access the secure transmission channel." /></div>;
          break;
        case 'vibe':
          outputNode = <div className="text-green-400 py-2 font-bold"><Typewriter text={`[VIBE CHECK]: ${getRandom(VIBES)}`} /></div>;
          break;
        case 'joke':
          outputNode = <div className="text-yellow-400 py-2 italic"><Typewriter text={getRandom(JOKES)} /></div>;
          break;
        case 'motivation':
          outputNode = <div className="text-blue-400 py-2 uppercase tracking-wider"><Typewriter text={getRandom(MOTIVATIONS)} /></div>;
          break;
        case 'filmy':
          outputNode = <div className="text-pink-400 py-2"><Typewriter text={`🎬 ${getRandom(FILMY)}`} /></div>;
          break;
        case 'random':
          outputNode = <div className="text-white/80 py-2"><Typewriter text={getRandom(RANDOMS)} /></div>;
          break;
        case 'roast':
          outputNode = <div className="text-orange-500 py-2 line-through opacity-80"><Typewriter text={getRandom(ROASTS)} /></div>;
          break;
        case 'secret':
          const msg = Math.random() > 0.8 ? "You found the master key. 🗝️" : getRandom(SECRETS);
          outputNode = <div className="text-purple-500 py-2 font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"><Typewriter text={`[HIDDEN DATA]: ${msg}`} speed={40} /></div>;
          break;
        case 'dsa':
          outputNode = <div className="text-red-400 py-2"><Typewriter text="Still under construction 😄" /></div>;
          break;
        case 'coffee':
          outputNode = <div className="text-amber-500 animate-pulse py-2">System refueling... ☕ [██████████░] 90%</div>;
          break;
        case 'sudo':
          outputNode = <div className="text-red-500 py-2 font-black"><Typewriter text="Nice try. This incident will be reported." speed={50}/></div>;
          break;
        case 'cd #contact':
        case 'cd contact':
          outputNode = <div className="text-green-400 py-2"><Typewriter text="Establishing secure connection to contact module... Access granted." /></div>;
          setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }, 1000);
          break;
        case 'cd':
          outputNode = <div className="text-white/60 py-2"><Typewriter text="Usage: cd [directory]. Try 'cd #contact'" /></div>;
          break;
        default:
          outputNode = <div className="text-red-400 py-2"><Typewriter text={`Command not found: ${trimmed}. Try 'help'`} /></div>;
      }

      setHistory(prev => [...prev, { id, command: trimmed, output: outputNode }]);
      setIsProcessing(false);
    }, Math.random() * 400 + 300); // Random delay 300-700ms
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isProcessing) {
        executeCommand(input);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section id="terminal-section" className="min-h-screen w-full bg-[#020202] py-20 px-4 md:px-10 relative z-20 flex flex-col items-center">
      
      {/* Section Header */}
      <div className="mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.6em] text-amber-500 mb-4 block font-bold font-sans drop-shadow-lg">
          Interactive Shell
        </span>
        <h2 className="movie-title text-5xl md:text-7xl text-white tracking-widest uppercase drop-shadow-2xl">
          Command <span className="text-amber-500 font-bold">Center</span>
        </h2>
      </div>

      {/* Main Layout: Split Dashboard */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[70vh]">
        
        {/* LEFT PANEL: Dashboard UI */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Status Card */}
          <div className={`p-5 rounded-lg border backdrop-blur-md transition-all duration-500 ${isChaos ? 'bg-red-950/20 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 font-mono flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isChaos ? 'bg-red-500' : 'bg-green-500'}`}></span>
              System Status
            </h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Focus Level</span>
                <span className={isChaos ? 'text-red-400' : 'text-amber-400'}>{focusLevel}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${focusLevel}%` }}
                  className={`h-full ${isChaos ? 'bg-red-500' : 'bg-amber-500'}`} 
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-white/60">Coffee Intake</span>
                <span className="text-red-400 animate-pulse uppercase text-xs">Critical</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Chaos Mode</span>
                <span className={isChaos ? 'text-red-500 font-bold' : 'text-white/30'}>{isChaos ? 'ACTIVE' : 'OFF'}</span>
              </div>
            </div>
          </div>

          {/* Rotating Quote Card */}
          <div className="p-5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md flex-1 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors" />
            <span className="text-[10px] uppercase tracking-widest text-amber-500/50 mb-2 font-mono">Random Thought</span>
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeQuote}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-white/80 font-serif italic text-lg leading-relaxed"
              >
                "{activeQuote}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Live System Logs */}
          <div className="p-5 rounded-lg bg-[#050505] border border-white/5 font-mono text-xs overflow-hidden h-40 flex flex-col justify-end">
            <div className="text-white/30 mb-2 border-b border-white/5 pb-2 uppercase tracking-widest">Live Logs</div>
            <div className="space-y-1 flex-1 flex flex-col justify-end">
              <AnimatePresence>
                {logs.map((log, idx) => (
                  <motion.div 
                    key={idx + log}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-white/40 truncate"
                  >
                    <span className="text-amber-500/50 mr-2">{'>'}</span>{log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Terminal Window */}
        <div className={`lg:col-span-8 flex flex-col rounded-lg border shadow-2xl overflow-hidden font-mono text-sm transition-all duration-500 h-[60vh] lg:h-full ${isChaos ? 'bg-[#0a0000] border-red-500/30 shadow-[0_0_50px_rgba(255,0,0,0.1)]' : 'bg-[#050505] border-white/10'}`}>
          
          {/* Terminal Header */}
          <div className={`flex items-center px-4 py-3 border-b sticky top-0 z-10 ${isChaos ? 'bg-red-950/20 border-red-500/20' : 'bg-[#0a0a0a] border-white/10'}`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors" />
            </div>
            <p className="flex-1 text-center text-xs text-white/30 uppercase tracking-widest font-sans">
              {isChaos ? 'root@chaos-system:~' : 'guest@meharsh-portfolio:~'}
            </p>
          </div>

          {/* Terminal Body */}
          <div 
            ref={containerRef}
            className="flex-1 p-4 md:p-6 overflow-y-auto scroll-smooth custom-scrollbar relative"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Scanlines inside terminal */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />

            {history.map((entry) => (
              <div key={entry.id} className="mb-4 relative z-10">
                {entry.command && (
                  <div className={`flex flex-wrap items-center gap-2 mb-1 ${isChaos ? 'text-red-500' : 'text-amber-500'}`}>
                    <span className={isChaos ? 'text-red-600 font-bold' : 'text-green-500 font-bold'}>{isChaos ? 'root@chaos' : 'guest@meharsh'}</span>
                    <span className="text-white/30">in</span>
                    <span className="text-blue-400 font-bold">~/sys</span>
                    <span className="text-white/50">λ</span>
                    <span className="text-white ml-1">{entry.command}</span>
                  </div>
                )}
                <div className="pl-2 border-l-2 border-white/5 mt-2 min-h-[1.5rem]">
                  {entry.output}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-white/50 mt-2 z-10 relative">
                <span className="animate-pulse">Processing request...</span>
              </div>
            )}

            {/* Current Input */}
            {!isProcessing && (
              <div className={`flex flex-wrap items-center gap-2 mt-4 relative z-10 ${isChaos ? 'text-red-500' : 'text-amber-500'}`}>
                <span className={isChaos ? 'text-red-600 font-bold' : 'text-green-500 font-bold'}>{isChaos ? 'root@chaos' : 'guest@meharsh'}</span>
                <span className="text-white/30">in</span>
                <span className="text-blue-400 font-bold">~/sys</span>
                <span className="text-white/50">λ</span>
                <div className="relative flex-1 flex items-center min-w-[200px]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-white caret-transparent z-10 pl-1"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {/* Fake Blinking Cursor */}
                  <span 
                    className={`absolute left-1 top-0 bottom-0 w-2.5 animate-[pulse_1s_ease-in-out_infinite] -z-0 pointer-events-none ${isChaos ? 'bg-red-500' : 'bg-amber-500'}`}
                    style={{ 
                      transform: `translateX(${input.length}ch)`,
                      transition: 'transform 0.05s' 
                    }}
                  />
                </div>
              </div>
            )}
            <div className="h-8" /> {/* Bottom Padding */}
          </div>
        </div>
      </div>
    </section>
  );
}
