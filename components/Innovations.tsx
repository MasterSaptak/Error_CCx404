"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Droplets, 
  Thermometer, 
  Cloud, 
  Smartphone, 
  Scan, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Eye, 
  Layout, 
  Globe,
  Camera,
  Layers,
  CheckCircle2,
  Terminal as TerminalIcon,
  Power,
  Play
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type ProjectId = 'iobotanica' | 'glamora';

export default function Innovations() {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  const [moisture, setMoisture] = useState(42);
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simulation Data Logic
  useEffect(() => {
    let interval: any;
    if (simulationActive && activeProject === 'iobotanica') {
        interval = setInterval(() => {
            setMoisture(prev => {
                if (pumpOn) return Math.min(prev + 1.2, 85);
                return Math.max(prev - 0.5, 20);
            });
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [simulationActive, activeProject, pumpOn]);

  // AI Log Logic
  const startAiScan = () => {
    setActiveProject('glamora');
    setSimulationActive(true);
    setAiLogs([]);
    const logs = [
        "[SYSTEM] Initializing OpenCV Vision Core...",
        "[AUTH] API Key Verified: SAPTECH_AI_09x",
        "[INFO] Camera stream active (virtualized)",
        "[SEARCHING] Scanning for face geometry...",
        "[DETECTED] Landmark points: 128/128",
        "[ANALYZE] Geometry: Oval",
        "[AI] Calculating hairstyle probability vectors...",
        "[COMPLETE] Top matches: Undercut, Messy Fringe",
        "[READY] Awaiting user booking input."
    ];
    
    logs.forEach((log, index) => {
        setTimeout(() => {
            setAiLogs(prev => [...prev, log]);
            if (logContainerRef.current) {
               logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
            }
        }, index * 800);
    });
  };

  return (
    <section id="innovations" className="py-24 relative bg-[#050505] text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saptech-cyan/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-saptech-cyan/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 1. 🔥 Hero Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-saptech-cyan/30 bg-saptech-cyan/10 text-saptech-cyan text-[10px] font-mono tracking-[0.3em] uppercase">
             Product_Lab_v2.1
          </div>
          <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none">
            Our <span className="text-saptech-cyan text-glow">Innovations</span>
          </h2>
          <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto">
             Where AI meets Reality. Where <span className="text-white">Ideas</span> become <span className="text-saptech-cyan underline underline-offset-4 decoration-1">Systems</span>.
          </p>
        </motion.div>

        <div className="space-y-48">
          
          {/* 2. 🌱 Project 1 – IoBotanica */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="space-y-8"
             >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                    <Droplets className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">IoBotanica</h3>
                    <p className="text-green-500 font-mono text-xs uppercase tracking-widest">IoT Smart Garden System</p>
                  </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                   <h4 className="text-gray-500 font-mono text-[10px] uppercase mb-4 tracking-widest">System Architecture</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Cpu className="w-4 h-4 text-green-400" /></div>
                         <div className="text-xs font-bold text-white uppercase">ESP8266 NodeMCU</div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Smartphone className="w-4 h-4 text-green-400" /></div>
                         <div className="text-xs font-bold text-white uppercase">Blynk IoT SDK</div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Thermometer className="w-4 h-4 text-green-400" /></div>
                         <div className="text-xs font-bold text-white uppercase">DHT11 / Moisture</div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Cloud className="w-4 h-4 text-green-400" /></div>
                         <div className="text-xs font-bold text-white uppercase">Real-time Sync</div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                      <p className="text-sm text-gray-400"><span className="text-white font-bold">Precision Irrigation:</span> Automatically triggers water pump based on real-time soil moisture thresholds.</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                      <p className="text-sm text-gray-400"><span className="text-white font-bold">Secure Ecosystem:</span> Integrated PIR motion sensors provide environmental security alerts.</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                      <p className="text-sm text-gray-400"><span className="text-white font-bold">Remote Forge:</span> Complete mobile app integration for monitoring and manual override.</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={() => { setActiveProject('iobotanica'); setSimulationActive(true); }}
                     className="px-8 py-4 bg-green-600 text-white font-black uppercase tracking-widest text-sm rounded-lg hover:shadow-[0_0_30px_rgba(22,163,74,0.4)] transition-all flex items-center gap-3 group"
                   >
                     <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" /> Simulate System
                   </button>
                   <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-lg hover:bg-white/5 transition-all">
                      Project Docs
                   </button>
                </div>
             </motion.div>

             {/* IoBotanica Visualizer */}
             <div className="relative aspect-square lg:aspect-auto h-[500px] lg:h-[650px] border border-white/5 bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-[inset_0_0_50px_rgba(34,197,94,0.05)]">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                   <div className="grid-bg absolute inset-0"></div>
                </div>
                
                <div className="absolute inset-x-8 top-8 bottom-8 flex flex-col gap-6">
                   {/* Header Stats */}
                   <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl">
                         <div className="text-[10px] text-gray-500 mb-1 font-mono uppercase tracking-tighter">Moisture</div>
                         <div className={`text-2xl font-black font-mono tracking-tighter ${moisture < 30 ? 'text-red-500' : 'text-green-400'}`}>
                            {moisture.toFixed(1)}%
                         </div>
                      </div>
                      <div className="p-4 bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl">
                         <div className="text-[10px] text-gray-500 mb-1 font-mono uppercase tracking-tighter">Temp</div>
                         <div className="text-2xl font-black text-white font-mono tracking-tighter">24.2°C</div>
                      </div>
                      <div className="p-4 bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl">
                         <div className="text-[10px] text-gray-500 mb-1 font-mono uppercase tracking-tighter">Humidity</div>
                         <div className="text-2xl font-black text-white font-mono tracking-tighter">62%</div>
                      </div>
                   </div>

                   {/* Main Visualizer Area */}
                   <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 p-8 flex flex-col items-center justify-center relative">
                      <AnimatePresence mode="wait">
                         {simulationActive && activeProject === 'iobotanica' ? (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="w-full h-full flex flex-col items-center justify-center gap-12"
                            >
                               {/* Flow Nodes */}
                               <div className="flex justify-between items-center w-full px-4 relative">
                                  {/* Node 1: Sensor */}
                                  <div className="flex flex-col items-center gap-2">
                                     <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                        <Activity className="w-6 h-6 text-green-400 animate-pulse" />
                                     </div>
                                     <span className="text-[9px] font-mono text-gray-500 uppercase">Input</span>
                                  </div>

                                  <div className="flex-1 h-[2px] mx-4 relative overflow-hidden bg-white/5">
                                     <motion.div 
                                       animate={{ x: [-100, 200] }}
                                       transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                       className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent w-full"
                                     />
                                  </div>

                                  {/* Node 2: MCU */}
                                  <div className="flex flex-col items-center gap-2">
                                     <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                                        <Cpu className="w-6 h-6 text-blue-400" />
                                     </div>
                                     <span className="text-[9px] font-mono text-gray-500 uppercase">Main_Frame</span>
                                  </div>

                                  <div className="flex-1 h-[2px] mx-4 relative overflow-hidden bg-white/5">
                                     <motion.div 
                                       animate={{ x: [-100, 200] }}
                                       transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                                       className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full"
                                     />
                                  </div>

                                  {/* Node 3: Actuator */}
                                  <div className="flex flex-col items-center gap-2">
                                     <div className={`w-14 h-14 rounded-full border transition-all duration-500 flex items-center justify-center ${pumpOn ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)]' : 'bg-white/5 border-white/10'}`}>
                                        <Droplets className={`w-6 h-6 ${pumpOn ? 'text-orange-400 animate-bounce' : 'text-gray-600'}`} />
                                     </div>
                                     <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">Output_Pump</span>
                                  </div>
                               </div>

                               {/* Manual Override Control */}
                               <div className="p-6 bg-black/80 border border-white/10 rounded-2xl w-full max-w-xs text-center space-y-4">
                                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Manual_Override</div>
                                  <button 
                                    onClick={() => setPumpOn(!pumpOn)}
                                    className={`w-full py-3 rounded-lg border font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all ${pumpOn ? 'bg-orange-500 border-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                  >
                                    <Power className="w-4 h-4" /> {pumpOn ? 'Disable Pump' : 'Enable Pump'}
                                  </button>
                                  <div className="text-[9px] text-gray-600 font-mono italic">
                                     {pumpOn ? 'Critical flow enabled. Hydrating system...' : 'System in standby mode. Monitoring active.'}
                                  </div>
                               </div>
                            </motion.div>
                         ) : (
                            <div className="text-center space-y-4 relative group cursor-pointer" onClick={() => { setActiveProject('iobotanica'); setSimulationActive(true); }}>
                               <div className="relative w-64 h-48 rounded-2xl overflow-hidden border border-white/10">
                                  <Image 
                                    src="https://images.unsplash.com/photo-1585336139118-89c15310f282?auto=format&fit=crop&q=80&w=600" 
                                    alt="IoBotanica"
                                    fill
                                    className="object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-700"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-white fill-current" />
                                     </div>
                                  </div>
                               </div>
                               <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.3em] group-hover:text-green-500 transition-colors underline underline-offset-8 decoration-white/10">Run_Binary: Initialize_Garden</p>
                            </div>
                         )}
                      </AnimatePresence>
                   </div>
                </div>
             </div>
          </div>

          {/* 💇 Project 2 – Glamora */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             {/* Glamora Visualizer (Order reversed for layout) */}
             <div className="order-2 lg:order-1 relative aspect-square lg:aspect-auto h-[500px] lg:h-[650px] border border-white/5 bg-[#0a0a0a] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                   <div className="grid-bg absolute inset-0"></div>
                </div>
                
                <div className="absolute inset-x-8 top-8 bottom-8 flex flex-col gap-6">
                   {/* AI Console Display */}
                   <div className="flex-1 bg-black/60 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-saptech-cyan/30"></div>
                      
                      <div className="flex-1 relative mb-6">
                         <AnimatePresence mode="wait">
                            {simulationActive && activeProject === 'glamora' ? (
                               <motion.div 
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 className="w-full h-full flex items-center justify-center"
                               >
                                  <div className="relative w-72 h-72 border-2 border-saptech-cyan/20 rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.05)]">
                                     <Scan className="absolute inset-0 w-full h-full text-saptech-cyan/20 p-12" />
                                     <motion.div 
                                       animate={{ y: [-150, 150, -150] }}
                                       transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                       className="absolute top-0 left-0 w-full h-px bg-saptech-cyan shadow-[0_0_20px_#00e5ff] z-10"
                                     />
                                     <Image 
                                       src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400" 
                                       alt="AI Scan"
                                       fill
                                       className="object-cover opacity-70 grayscale-[0.5]"
                                     />
                                  </div>
                                  
                                  <div className="absolute bottom-4 right-4 animate-bounce">
                                     <Sparkles className="w-8 h-8 text-saptech-cyan drop-shadow-[0_0_10px_#00e5ff]" />
                                  </div>
                               </motion.div>
                            ) : (
                               <div className="w-full h-full flex flex-col items-center justify-center gap-6 group cursor-pointer" onClick={startAiScan}>
                                  <div className="p-6 rounded-full bg-saptech-cyan/5 border border-saptech-cyan/20 text-saptech-cyan group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(0,229,255,0.1)]">
                                     <Camera className="w-12 h-12" />
                                  </div>
                                  <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em] group-hover:text-saptech-cyan transition-colors">Awaiting Camera Interface Init...</p>
                               </div>
                            )}
                         </AnimatePresence>
                      </div>

                      {/* AI Logs Terminal */}
                      <div className="h-40 bg-black/80 rounded-xl border border-white/5 p-4 font-mono text-[10px] overflow-hidden flex flex-col">
                         <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5 text-gray-500">
                            <TerminalIcon className="w-3 h-3" />
                            <span>AI_CORE_OUTPUT</span>
                         </div>
                         <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-1.5 scrollbar-hide">
                            {aiLogs.length === 0 && <span className="text-gray-700 italic">SYSTEM IDLE... Click 'Start AI Scan' to begin.</span>}
                            {aiLogs.map((log, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 className={`${log.includes('[SUCCESS]') || log.includes('[AI]') || log.includes('[READY]') ? 'text-saptech-cyan' : 'text-gray-400'}`}
                               >
                                  {log}
                               </motion.div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Footer Info */}
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                         <div className="text-[10px] text-gray-500 font-mono italic">Result: <span className="text-saptech-cyan font-bold uppercase tracking-tighter">Geometric Oval_4x</span></div>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-right">
                         <div className="text-[10px] text-gray-500 font-mono italic">Engine: <span className="text-white font-bold uppercase tracking-tighter">PyTorch Vision</span></div>
                      </div>
                   </div>
                </div>
             </div>

             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="order-1 lg:order-2 space-y-8"
             >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-saptech-cyan/10 border border-saptech-cyan/20 flex items-center justify-center text-saptech-cyan shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                    <Scan className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">Glamora</h3>
                    <p className="text-saptech-cyan font-mono text-xs uppercase tracking-widest">AI Personalization Engine</p>
                  </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                   <h4 className="text-gray-500 font-mono text-[10px] uppercase mb-4 tracking-widest">Technological Stack</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Layout className="w-4 h-4 text-saptech-cyan" /></div>
                         <div className="text-xs font-bold text-white uppercase">Next.js 15</div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Globe className="w-4 h-4 text-saptech-cyan" /></div>
                         <div className="text-xs font-bold text-white uppercase">Python Backend</div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Sparkles className="w-4 h-4 text-saptech-cyan" /></div>
                         <div className="text-xs font-bold text-white uppercase">PyTorch Models</div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-white/5 border border-white/10"><Camera className="w-4 h-4 text-saptech-cyan" /></div>
                         <div className="text-xs font-bold text-white uppercase">OpenCV Vision</div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-saptech-cyan mt-1 shrink-0" />
                      <p className="text-sm text-gray-400"><span className="text-white font-bold">Biometric Analysis:</span> Real-time face shape detection using advanced computer vision models.</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-saptech-cyan mt-1 shrink-0" />
                      <p className="text-sm text-gray-400"><span className="text-white font-bold">Styling Engine:</span> AI-driven hairstyle recommendations tailored to individual biometric data.</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-saptech-cyan mt-1 shrink-0" />
                      <p className="text-sm text-gray-400"><span className="text-white font-bold">Booking System:</span> Integrated end-to-end appointment scheduling for professionals.</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={startAiScan}
                     className="px-8 py-4 bg-saptech-cyan text-black font-black uppercase tracking-widest text-sm rounded-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all flex items-center gap-3"
                   >
                     <Scan className="w-4 h-4" /> Start AI Scan
                   </button>
                   <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-lg hover:bg-white/5 transition-all">
                      Case Study
                   </button>
                </div>
             </motion.div>
          </div>
        </div>

        {/* 4. 🧠 FINAL IMPACT SECTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-48 p-16 border border-white/10 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent text-center relative overflow-hidden shadow-[0_0_100px_rgba(0,229,255,0.02)]"
        >
          <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-saptech-cyan to-transparent"></div>
          
          <Layers className="w-12 h-12 text-saptech-cyan mx-auto mb-8 opacity-40" />
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-white mb-6">
            We Don’t Build Projects. <br />
            We Build <span className="text-saptech-cyan text-glow">Systems</span>.
          </h2>
          <p className="text-gray-400 font-mono text-lg max-w-3xl mx-auto leading-relaxed">
            At its core, SAPTECH is about the intersection of <span className="text-white">Applied AI</span>, <span className="text-white">Autonomous IoT</span>, and <span className="text-white">Human-Centric Automation</span>. 
            We engineer the infrastructure that powers the future.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
             {[
               { icon: <Activity className="w-6 h-6" />, label: "Applied AI" },
               { icon: <Globe className="w-6 h-6" />, label: "Global IoT" },
               { icon: <Zap className="w-6 h-6" />, label: "Automation" },
               { icon: <ShieldCheck className="w-6 h-6" />, label: "UX Integrity" },
             ].map((item, i) => (
                <div key={i} className="space-y-3">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-saptech-cyan mx-auto">{item.icon}</div>
                   <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{item.label}</div>
                </div>
             ))}
          </div>
        </motion.div>

      </div>
      
      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
        }
        .grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
