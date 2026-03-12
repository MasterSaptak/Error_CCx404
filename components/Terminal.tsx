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
      <span className="text-saptech-cyan font-bold">{baseCmd}</span>
      {args.map((arg, i) => {
        if (arg === '') return <span key={i}> </span>;
        const isFlag = arg.startsWith('-');
        return (
          <span key={i} className={isFlag ? 'text-saptech-blue' : 'text-saptech-white'}>
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
      "INITIALIZING SYSTEM KERNEL v4.0.4...",
      "LOADING NEURAL MODULES: [OK]",
      "MOUNTING VIRTUAL FILE SYSTEM: [OK]",
      "BYPASSING SECURITY PROTOCOLS: [OK]",
      "ESTABLISHING SECURE CONNECTION...",
      "CONNECTION ESTABLISHED.",
      "WELCOME TO ERROR_CCX404 MAINFRAME."
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
    <div className="text-saptech-white">
      <p className="mb-2 font-bold text-saptech-cyan">Available commands:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 ml-2">
        <div><span className="text-saptech-cyan font-bold">about</span><span className="opacity-30">....</span> Learn about Error_CCx404</div>
        <div><span className="text-saptech-cyan font-bold">projects</span><span className="opacity-30">.</span> List community projects</div>
        <div><span className="text-saptech-cyan font-bold">events</span><span className="opacity-30">...</span> View upcoming events</div>
        <div><span className="text-saptech-cyan font-bold">team</span><span className="opacity-30">.....</span> List team members</div>
        <div><span className="text-saptech-cyan font-bold">join</span><span className="opacity-30">.....</span> Initiate onboarding</div>
        <div><span className="text-saptech-cyan font-bold">whoami</span><span className="opacity-30">...</span> Print current user</div>
        <div><span className="text-saptech-cyan font-bold">date</span><span className="opacity-30">.....</span> Print system date</div>
        <div><span className="text-saptech-cyan font-bold">clear</span><span className="opacity-30">....</span> Clear terminal output</div>
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
          <div className="border-l-2 border-saptech-cyan pl-4 py-2 bg-saptech-cyan/5 rounded-r-md">
            <p className="text-saptech-white">
              <span className="text-saptech-cyan font-bold">Error_CCx404</span> is a DevOps and innovation community under Saptech, focusing on software development, cybersecurity, robotics, IoT, hackathons, and startup innovation.
            </p>
          </div>
        );
        break;
      case "projects":
        output = (
          <ul className="space-y-2 text-saptech-white">
            <li className="flex items-start"><span className="text-saptech-cyan mr-2">►</span> <span><span className="text-white font-bold">Dhopa</span> - Laundry Management Platform</span></li>
            <li className="flex items-start"><span className="text-saptech-cyan mr-2">►</span> <span><span className="text-white font-bold">Saptech Core</span> - Community Management</span></li>
            <li className="flex items-start"><span className="text-saptech-cyan mr-2">►</span> <span><span className="text-white font-bold">CyberDefend IoT</span> - Intrusion Detection System</span></li>
          </ul>
        );
        break;
      case "events":
        output = (
          <div className="space-y-3 text-saptech-white">
            <div className="flex justify-between border-b border-saptech-cyan/20 pb-1">
              <span className="text-saptech-cyan font-bold">Saptech Hackathon 2026</span>
              <span className="opacity-70">Oct 15-17</span>
            </div>
            <div className="flex justify-between border-b border-saptech-cyan/20 pb-1">
              <span className="text-saptech-cyan font-bold">Cyber Defense Workshop</span>
              <span className="opacity-70">Nov 05</span>
            </div>
            <div className="flex justify-between border-b border-saptech-cyan/20 pb-1">
              <span className="text-saptech-cyan font-bold">IoT & Robotics Expo</span>
              <span className="opacity-70">Dec 12</span>
            </div>
          </div>
        );
        break;
      case "team":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-saptech-white">
            <div className="bg-saptech-panel/50 p-3 rounded-lg border border-saptech-cyan/20 hover:border-saptech-cyan/60 transition-colors shadow-sm"><span className="text-saptech-cyan font-bold">Alex Mercer</span><br/><span className="text-xs text-saptech-muted">Lead Developer</span></div>
            <div className="bg-saptech-panel/50 p-3 rounded-lg border border-saptech-cyan/20 hover:border-saptech-cyan/60 transition-colors shadow-sm"><span className="text-saptech-cyan font-bold">Sarah Chen</span><br/><span className="text-xs text-saptech-muted">Security Analyst</span></div>
            <div className="bg-saptech-panel/50 p-3 rounded-lg border border-saptech-cyan/20 hover:border-saptech-cyan/60 transition-colors shadow-sm"><span className="text-saptech-cyan font-bold">David Kim</span><br/><span className="text-xs text-saptech-muted">Robotics Engineer</span></div>
            <div className="bg-saptech-panel/50 p-3 rounded-lg border border-saptech-cyan/20 hover:border-saptech-cyan/60 transition-colors shadow-sm"><span className="text-saptech-cyan font-bold">Elena Rostova</span><br/><span className="text-xs text-saptech-muted">UI/UX Designer</span></div>
          </div>
        );
        break;
      case "join":
        output = (
          <div className="p-4 bg-saptech-blue/10 border border-saptech-blue/30 rounded-lg inline-block text-saptech-white shadow-[0_0_15px_rgba(0,112,242,0.1)]">
            <span className="mr-3">Initiating onboarding sequence...</span>
            <Link
              href="/join"
              className="text-saptech-dark bg-saptech-cyan px-4 py-1.5 rounded font-bold hover:bg-white transition-colors animate-pulse inline-block mt-2 sm:mt-0"
            >
              [CLICK_TO_PROCEED]
            </Link>
          </div>
        );
        break;
      case "whoami":
        output = <span>guest_user_{Math.floor(Math.random() * 10000)}</span>;
        break;
      case "date":
        output = <span>{new Date().toString()}</span>;
        break;
      case "sudo":
        output = <span className="font-bold">ACCESS DENIED. This incident will be reported.</span>;
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
            bash: {cmd}: command not found
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
      <span className="text-saptech-cyan font-bold">guest@saptech-core</span>
      <span className="text-saptech-muted">:</span>
      <span className="text-saptech-blue">~</span>
      <span className="text-saptech-muted">$</span>
    </span>
  );

  return (
    <section className="py-24 relative bg-saptech-dark overflow-hidden">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-saptech-blue/20 rounded-full blur-[150px]"></div>
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
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
            <TerminalIcon className="w-10 h-10 text-saptech-cyan" />
            Saptech.<span className="text-saptech-cyan">Terminal</span>()
          </h2>
          <div className="w-24 h-1 bg-saptech-cyan mx-auto rounded-full shadow-[0_0_15px_rgba(0,229,255,0.8)]"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-saptech-panel/80 backdrop-blur-2xl border border-saptech-cyan/20 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.1)] overflow-hidden font-mono text-sm sm:text-base relative group"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-saptech-dark/50 border-b border-saptech-cyan/20 select-none">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-saptech-cyan/80 shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
            </div>
            <div className="flex items-center text-saptech-muted text-xs font-bold tracking-widest uppercase">
              <ShieldAlert className="w-3 h-3 mr-2 text-saptech-cyan" /> 
              Saptech_Core_Console
            </div>
            <div className="flex space-x-3 text-saptech-muted">
              <Cpu className="w-4 h-4" />
              <Wifi className="w-4 h-4 text-saptech-cyan animate-pulse" />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-saptech-cyan/20 scrollbar-track-transparent">
            
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
                      className={`text-xs sm:text-sm ${log?.includes('[OK]') ? 'text-saptech-cyan' : log?.includes('ERROR') ? 'text-red-500' : 'text-saptech-muted'}`}
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div className="w-2 h-4 bg-saptech-cyan animate-pulse mt-2"></div>
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
                      <div className="flex items-center text-saptech-white">
                        <PromptPrefix />
                        <HighlightedCommand command={entry.command} status={entry.status} />
                      </div>
                      <div className={`pl-4 sm:pl-5 border-l-2 py-1 ${
                        entry.status === 'error' 
                          ? 'border-red-500/50 text-red-500' 
                          : 'border-saptech-cyan/40 text-saptech-white'
                      }`}>
                        {entry.output}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Active Input Line */}
                <form
                  onSubmit={handleCommand}
                  className="flex items-center text-saptech-white mt-4"
                >
                  <PromptPrefix />
                  <div className="relative flex-1 flex items-center">
                    {suggestion && input && suggestion.startsWith(input.toLowerCase()) && (
                      <span className="absolute text-saptech-muted pointer-events-none whitespace-pre z-0">
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
                      className="relative bg-transparent outline-none text-transparent caret-transparent selection:bg-saptech-cyan/30 selection:text-white w-full z-10"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {/* Custom Blinking Cursor */}
                    <span 
                      className="absolute w-[1ch] h-[1.2em] bg-saptech-cyan/80 pointer-events-none animate-pulse z-0 shadow-[0_0_8px_rgba(0,229,255,0.6)]"
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

