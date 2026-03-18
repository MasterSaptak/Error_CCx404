"use client";

import { motion } from "framer-motion";
import { Gamepad2, Settings, Terminal, Zap, Code2, Cpu, Activity, Play, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy components
const GameLab3D = dynamic(() => import("./GameLab3D"), { ssr: false });

const DOMAINS = [
  {
    id: "web",
    title: "Web Dev",
    tech: "React / Next.js",
    icon: <Code2 className="w-6 h-6" />,
    stats: "20+ Projects",
    color: "cyan",
  },
  {
    id: "app",
    title: "App Dev",
    tech: "Flutter / Native",
    icon: <Settings className="w-6 h-6" />,
    stats: "15+ Builds",
    color: "purple",
  },
  {
    id: "game",
    title: "Game Dev",
    tech: "Unity / Flame",
    icon: <Gamepad2 className="w-6 h-6" />,
    stats: "10+ Engines",
    color: "red",
  },
  {
    id: "hack",
    title: "Hackathons",
    tech: "Rapid Prototyping",
    icon: <Zap className="w-6 h-6" />,
    stats: "12 Events",
    color: "yellow",
  },
];

export default function GameDevExperience() {
  const [activeTab, setActiveTab] = useState<string>("dev");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="game-lab" className="relative py-24 bg-cyber-black text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[140px] animate-pulse delay-700"></div>
        <div className="grid-bg absolute inset-0 opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              <span className="font-mono text-red-500 text-sm tracking-widest uppercase">Live Forge Active</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              The <span className="text-cyber-blue">Creation</span> Engine
            </h2>
            <p className="mt-2 text-gray-400 font-mono max-w-xl">
              We don't just consume experiences. We architect the physics, logic, and infrastructure that power them. 
              Step into the dev warzone.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex gap-4 font-mono text-xs"
          >
            <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg">
              <div className="text-cyber-blue mb-1">FPS_TARGET</div>
              <div className="text-xl font-bold">144</div>
            </div>
            <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg">
              <div className="text-neon-purple mb-1">LATENCY_MS</div>
              <div className="text-xl font-bold">0.02</div>
            </div>
          </motion.div>
        </div>

        {/* Main Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Dev Grid */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Domain Architecture
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {DOMAINS.map((domain) => (
                <motion.div
                  key={domain.id}
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`relative p-6 cursor-pointer border-l-4 transition-all overflow-hidden group ${
                    selectedDomain === domain.id 
                      ? 'bg-cyber-blue/10 border-cyber-blue shadow-[0_0_30px_rgba(0,245,255,0.2)]' 
                      : 'bg-white/5 border-white/10 hover:border-cyber-blue/50'
                  }`}
                >
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30">
                    {domain.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">ID: 00{DOMAINS.indexOf(domain) + 1}</span>
                      <span className={`w-1 h-1 rounded-full bg-${domain.color}-500`}></span>
                    </div>
                    <h4 className="text-2xl font-bold font-mono">{domain.title}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs font-mono text-cyber-blue px-2 py-1 bg-cyber-blue/10 rounded">
                        {domain.tech}
                      </span>
                      <span className="text-xs font-mono text-gray-400">{domain.stats}</span>
                    </div>
                  </div>
                  
                  {/* Glitch Bars */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </motion.div>
              ))}
            </div>

            {/* Live Build Simulation Asset */}
            <div className="mt-8 p-6 border border-white/10 bg-saptech-panel rounded-xl overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyber-blue/30 overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-1/3 h-full bg-cyber-blue shadow-[0_0_15px_#00f5ff]"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10">
                  <Terminal className="w-5 h-5 text-terminal-green" />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-400 tracking-tighter leading-none mb-1">FACTORY_PROCESS: ACTIVE</div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">Compiling Core Assets...</div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-gray-500 leading-tight">
                {`> Initializing Physics Engine... OK`} <br />
                {`> Loading Mech_rig_v2.glbf... 88%`} <br />
                {`> Injecting Shaders [CYBER_GLOW]...`} <br />
                {`> Running Build Script...`}
              </div>
            </div>
          </div>

          {/* Right Column: Game Dev Experience Zone (MAIN HIGHLIGHT) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="relative aspect-video lg:aspect-auto lg:flex-1 rounded-2xl border border-white/20 bg-black overflow-hidden shadow-2xl group">
              
              {/* Main Visualizer / Portal */}
              <div className="absolute inset-0 z-0">
                 <GameLab3D selectedDomain={selectedDomain} />
              </div>

              {/* HUD Overlays */}
              <div className="absolute inset-x-0 top-0 p-6 z-10 flex justify-between pointer-events-none">
                <div className="backdrop-blur-md bg-black/40 p-3 rounded border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Live Connection</span>
                  </div>
                  <div className="text-lg font-black text-white font-mono tracking-tighter">ENGINE_V4.0.2</div>
                </div>

                <div className="backdrop-blur-md bg-black/40 p-3 rounded border border-white/10 text-right">
                  <div className="text-[10px] font-mono text-gray-400 mb-1">BUILD_USER</div>
                  <div className="text-xs font-bold text-cyber-blue font-mono group-hover:animate-pulse">@ERROR_CCX404</div>
                </div>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-4">
                  <div className="bg-black/60 backdrop-blur-xl p-4 rounded-lg border border-white/10 max-w-sm">
                    <h5 className="flex items-center gap-2 text-cyber-blue font-mono text-xs mb-2">
                       <Info className="w-3 h-3" /> DEV_LOG
                    </h5>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed">
                      "We architected this portal using <span className="text-white">Three.js</span> and <span className="text-white">R3F</span>. 
                      Every vertex is calculated in real-time to simulate a neural network of innovation."
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-3 bg-cyber-blue text-black font-bold uppercase tracking-widest text-xs rounded hover:shadow-[0_0_20px_#00f5ff] transition-all">
                      <Play className="w-4 h-4 fill-current" /> Launch Lab
                    </button>
                    <button className="p-3 border border-white/20 text-white rounded hover:bg-white/10 transition-all">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.025),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            </div>

            {/* Random Event System Feed */}
            <div className="h-48 border border-white/10 bg-saptech-panel rounded-xl p-6 relative overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-mono text-xs uppercase tracking-widest text-gray-500">Live Global Feed</h4>
                <div className="flex gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 font-mono text-[11px]">
                  <div className="flex justify-between items-center text-cyber-blue">
                    <span>[HACKATHON] CYBER_FORGE_2026</span>
                    <span className="bg-cyber-blue/10 px-2 py-0.5 rounded">UPCOMING</span>
                  </div>
                  <div className="flex justify-between items-center text-white/60">
                    <span>[EVENT] STARTUP_FAIR_BENGALURU</span>
                    <span>T-MINUS 04:22:10</span>
                  </div>
                  <div className="flex justify-between items-center text-terminal-green">
                    <span>[BUILD] SYSTEM_CORE_REFACTOR</span>
                    <span className="flex items-center gap-2">842 PARTICIPANTS <span className="w-1 h-1 rounded-full bg-terminal-green animate-pulse"></span></span>
                  </div>
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/5 rounded-full blur-[40px] -mr-16 -mt-16"></div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Ticker */}
        <div className="mt-24 border-t border-white/10 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {[
                { label: "Idea Lab", icon: <Activity className="w-5 h-5" /> },
                { label: "Mech Factory", icon: <Cpu className="w-5 h-5" /> },
                { label: "Warzone Dev", icon: <Terminal className="w-5 h-5" /> },
                { label: "Logic Matrix", icon: <Code2 className="w-5 h-5" /> },
                { label: "Core Sync", icon: <Zap className="w-5 h-5" /> },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-cyber-blue group-hover:bg-cyber-blue/10 transition-all border border-transparent group-hover:border-cyber-blue/30">
                    {feature.icon}
                  </div>
                  <span className="font-mono text-sm text-gray-400 group-hover:text-white uppercase tracking-tighter">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
