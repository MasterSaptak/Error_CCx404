"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, ShieldAlert, Cpu, Wifi } from "lucide-react";
import Link from "next/link";

type HistoryEntry = {
  id: string;
  command: string;
  output: string | React.ReactNode;
  status: 'success' | 'error';
};

const HighlightedCommand = ({ command, status }: { command: string, status?: 'success' | 'error' }) => {
  if (!command) return null;
  
  const parts = command.split(' ');
  const baseCmd = parts[0];
  const args = parts.slice(1);

  if (status === 'error') {
    return <span className="text-red-400">{command}</span>;
  }

  return (
    <span>
      <span className="text-cyber-blue font-bold">{baseCmd}</span>
      {args.map((arg, i) => {
        if (arg === '') return <span key={i}> </span>;
        const isFlag = arg.startsWith('-');
        return (
          <span key={i} className={isFlag ? 'text-neon-purple' : 'text-white'}>
            {' '}{arg}
          </span>
        );
      })}
    </span>
  );
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [cursorPos, setCursorPos] = useState(0);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const AVAILABLE_COMMANDS = [
    "about",
    "projects",
    "events",
    "team",
    "join",
    "clear",
    "help",
    "sudo",
    "whoami",
    "date"
  ];

  useEffect(() => {
    const logs = [
      "INITIALIZING ERROR_CCX404 KERNEL v1.0.0...",
      "LOADING DEVIANT MODULES: [OK]",
      "MOUNTING ENCRYPTED FILE SYSTEM: [OK]",
      "SCANNING FOR INTRUSIONS: [NONE]",
      "ESTABLISHING DECENTRALIZED NODE...",
      "NODE OPERATIONAL.",
      "WELCOME TO THE ERROR_CCX404 CONSOLE."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooting(false);
          setHistory([
            {
              id: "init",
              command: "help",
              output: getHelpOutput(),
              status: 'success'
            }
          ]);
        }, 800);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const getHelpOutput = () => (
    <div className="text-white">
      <p className="mb-2 font-bold text-cyber-blue">Available modules:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 ml-2">
        <div><span className="text-cyber-blue font-bold">about</span><span className="opacity-30">....</span> Info on Error_CCx404</div>
        <div><span className="text-cyber-blue font-bold">projects</span><span className="opacity-30">.</span> Community repository</div>
        <div><span className="text-cyber-blue font-bold">events</span><span className="opacity-30">...</span> Timeline of operations</div>
        <div><span className="text-cyber-blue font-bold">team</span><span className="opacity-30">.....</span> The collective</div>
        <div><span className="text-cyber-blue font-bold">join</span><span className="opacity-30">.....</span> Protocol onboarding</div>
        <div><span className="text-cyber-blue font-bold">whoami</span><span className="opacity-30">...</span> User identity</div>
        <div><span className="text-cyber-blue font-bold">date</span><span className="opacity-30">.....</span> Temporal sync</div>
        <div><span className="text-cyber-blue font-bold">clear</span><span className="opacity-30">....</span> Wipe buffer</div>
      </div>
    </div>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setCursorPos(e.target.selectionStart || 0);

    if (val.trim() === "") {
      setSuggestion("");
      return;
    }

    const match = AVAILABLE_COMMANDS.find((cmd) =>
      cmd.startsWith(val.toLowerCase())
    );
    setSuggestion(match || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        setCursorPos(suggestion.length);
        setSuggestion("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        const cmd = history[history.length - 1 - nextIndex].command;
        setInput(cmd);
        setCursorPos(cmd.length);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        setHistoryIndex(prevIndex);
        const cmd = history[history.length - 1 - prevIndex].command;
        setInput(cmd);
        setCursorPos(cmd.length);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
        setCursorPos(0);
      }
    }
  };

  useEffect(() => {
    if (bottomRef.current?.parentElement) {
      bottomRef.current.parentElement.scrollTo({
        top: bottomRef.current.parentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, bootLogs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: string | React.ReactNode = "";
    let status: 'success' | 'error' = 'success';

    switch (cmd) {
      case "about":
        output = (
          <div className="border-l-2 border-cyber-blue pl-4 py-2 bg-cyber-blue/5 rounded-r-md">
            <p className="text-white">
              <span className="text-cyber-blue font-bold">Error_CCx404</span> is an independent DevOps and innovation collective focusing on software development, cybersecurity, robotics, and radical tech solutions.
            </p>
          </div>
        );
        break;
      case "projects":
        output = (
          <ul className="space-y-2 text-white">
            <li className="flex items-start"><span className="text-cyber-blue mr-2">►</span> <span><span className="text-white font-bold">Dhopa</span> - Intelligent Laundry Systems</span></li>
            <li className="flex items-start"><span className="text-cyber-blue mr-2">►</span> <span><span className="text-white font-bold">NeuralCore</span> - Decentralized Management</span></li>
            <li className="flex items-start"><span className="text-cyber-blue mr-2">►</span> <span><span className="text-white font-bold">VoidGuard IoT</span> - Perimeter Defense</span></li>
          </ul>
        );
        break;
      case "events":
        output = (
          <div className="space-y-3 text-white">
            <div className="flex justify-between border-b border-cyber-blue/20 pb-1">
              <span className="text-cyber-blue font-bold">Code_Void Hackathon</span>
              <span className="opacity-70">Oct 15-17</span>
            </div>
            <div className="flex justify-between border-b border-cyber-blue/20 pb-1">
              <span className="text-cyber-blue font-bold">Distortion Workshop</span>
              <span className="opacity-70">Nov 05</span>
            </div>
            <div className="flex justify-between border-b border-cyber-blue/20 pb-1">
              <span className="text-cyber-blue font-bold">Robotic Synthesis Expo</span>
              <span className="opacity-70">Dec 12</span>
            </div>
          </div>
        );
        break;
      case "team":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white">
            <div className="bg-white/5 p-3 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/60 transition-colors shadow-sm"><span className="text-cyber-blue font-bold">A. Mercer</span><br/><span className="text-xs text-gray-500">Core Architecture</span></div>
            <div className="bg-white/5 p-3 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/60 transition-colors shadow-sm"><span className="text-cyber-blue font-bold">S. Chen</span><br/><span className="text-xs text-gray-500">Infosec Lead</span></div>
            <div className="bg-white/5 p-3 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/60 transition-colors shadow-sm"><span className="text-cyber-blue font-bold">D. Kim</span><br/><span className="text-xs text-gray-500">Hardware Specialist</span></div>
            <div className="bg-white/5 p-3 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/60 transition-colors shadow-sm"><span className="text-cyber-blue font-bold">E. Rostova</span><br/><span className="text-xs text-gray-500">Visual Lead</span></div>
          </div>
        );
        break;
      case "join":
        output = (
          <div className="p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg inline-block text-white shadow-[0_0_15px_rgba(0,245,255,0.1)]">
            <span className="mr-3">Initiating protocol sequence...</span>
            <Link
              href="/join"
              className="text-black bg-cyber-blue px-4 py-1.5 rounded font-bold hover:bg-white transition-colors animate-pulse inline-block mt-2 sm:mt-0"
            >
              [AUTH_PROCEED]
            </Link>
          </div>
        );
        break;
      case "whoami":
        output = <span>visitor_{Math.floor(Math.random() * 10000)}</span>;
        break;
      case "date":
        output = <span>{new Date().toString()}</span>;
        break;
      case "sudo":
        output = <span className="font-bold text-red-500">PERMISSION DENIED. System alert triggered.</span>;
        status = 'error';
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "help":
        output = getHelpOutput();
        break;
      default:
        output = (
          <span>
            error: {cmd}: command unavailable
          </span>
        );
        status = 'error';
    }

    setHistory((prev) => [...prev, { id: Date.now().toString(), command: input, output, status }]);
    setHistoryIndex(-1);
    setInput("");
    setCursorPos(0);
    setSuggestion("");
  };

  const PromptPrefix = () => (
    <span className="mr-3 flex-shrink-0 select-none">
      <span className="text-cyber-blue font-bold">visitor@error-404</span>
      <span className="text-gray-500">:</span>
      <span className="text-neon-purple">~</span>
      <span className="text-gray-500">$</span>
    </span>
  );

  return (
    <section className="py-24 relative bg-black overflow-hidden">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-blue/10 rounded-full blur-[150px]"></div>
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans tracking-tight flex items-center justify-center gap-3">
            <TerminalIcon className="w-10 h-10 text-cyber-blue" />
            Error_CCx404.<span className="text-cyber-blue">Terminal</span>()
          </h2>
          <div className="w-24 h-1 bg-cyber-blue mx-auto rounded-full shadow-[0_0_15px_rgba(0,245,255,0.8)]"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,245,255,0.05)] overflow-hidden font-mono text-sm sm:text-base relative group"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10 select-none">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-cyber-blue/80 shadow-[0_0_10px_rgba(0,245,255,0.5)]"></div>
            </div>
            <div className="flex items-center text-gray-500 text-xs font-bold tracking-widest uppercase">
              <ShieldAlert className="w-3 h-3 mr-2 text-cyber-blue" /> 
              ERROR_CCX404_VIRTUAL_CONSOLE
            </div>
            <div className="flex space-x-3 text-gray-500">
              <Cpu className="w-4 h-4" />
              <Wifi className="w-4 h-4 text-cyber-blue animate-pulse" />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-blue/20 scrollbar-track-transparent">
            
            {/* Boot Sequence */}
            <AnimatePresence>
              {isBooting && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 space-y-1.5"
                >
                  {bootLogs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-xs sm:text-sm ${log?.includes('[OK]') ? 'text-terminal-green' : log?.includes('ERROR') ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div className="w-2 h-4 bg-cyber-blue animate-pulse mt-2"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History */}
            {!isBooting && (
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {history.map((entry) => (
                    <motion.div 
                      key={entry.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center text-white">
                        <PromptPrefix />
                        <HighlightedCommand command={entry.command} status={entry.status} />
                      </div>
                      <div className={`pl-4 sm:pl-5 border-l-2 py-1 ${
                        entry.status === 'error' 
                          ? 'border-red-500/50 text-red-500' 
                          : 'border-white/10 text-white'
                      }`}>
                        {entry.output}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Active Input Line */}
                <form
                  onSubmit={handleCommand}
                  className="flex items-center text-white mt-4"
                >
                  <PromptPrefix />
                  <div className="relative flex-1 flex items-center">
                    {suggestion && input && suggestion.startsWith(input.toLowerCase()) && (
                      <span className="absolute text-gray-500 pointer-events-none whitespace-pre z-0">
                        <span className="invisible">{input}</span>
                        <span>{suggestion.slice(input.length)}</span>
                      </span>
                    )}
                    <span className="absolute left-0 pointer-events-none whitespace-pre z-0">
                      <HighlightedCommand command={input} />
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onKeyUp={(e) => setCursorPos(e.currentTarget.selectionStart || 0)}
                      onSelect={(e) => setCursorPos(e.currentTarget.selectionStart || 0)}
                      className="relative bg-transparent outline-none text-transparent caret-transparent selection:bg-cyber-blue/30 selection:text-white w-full z-10"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {/* Custom Blinking Cursor */}
                    <span 
                      className="absolute w-[1ch] h-[1.2em] bg-cyber-blue/80 pointer-events-none animate-pulse z-0 shadow-[0_0_8px_rgba(0,245,255,0.6)]"
                      style={{ left: `${cursorPos}ch`, top: '50%', transform: 'translateY(-50%)' }}
                    ></span>
                  </div>
                </form>
              </div>
            )}
            <div ref={bottomRef} className="h-4" />
          </div>
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-10 z-20"></div>
        </motion.div>
      </div>
    </section>
  );
}

