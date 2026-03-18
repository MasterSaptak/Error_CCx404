"use client";

import { motion } from "framer-motion";
import { Lightbulb, Rocket, Zap, ArrowRight, Code, Terminal } from "lucide-react";

export default function IdeaLab() {
  return (
    <section id="idea-lab" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Lightbulb className="w-3 h-3" /> Idea Fair 2026
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
              From <span className="text-cyan-400">Glitch</span> <br />
              to <span className="text-white">Gold.</span>
            </h2>
            
            <p className="text-gray-400 font-mono text-lg max-w-lg leading-relaxed">
              The Idea Lab is where raw concepts are stress-tested. Whether it's a revolutionary protocol or a recursive neural network, we provide the forge.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all group">
                <Rocket className="w-6 h-6 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold mb-2">Startup Fair</h4>
                <p className="text-gray-500 text-xs font-mono">Pitch, prototype, and pivot your way to a functional MVP with community support.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all group">
                <Zap className="w-6 h-6 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold mb-2">Hackathon Track</h4>
                <p className="text-gray-500 text-xs font-mono">Transform weekend sprints into long-term infrastructure projects.</p>
              </div>
            </div>

            <button className="flex items-center gap-3 px-8 py-4 bg-cyan-400 text-black font-black uppercase tracking-widest text-sm rounded hover:shadow-[0_0_30px_#22d3ee] transition-all">
              Submit Your Concept <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right: Interactive Idea Board / Visualizer */}
          <div className="relative aspect-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite] opacity-20"></div>
              <div className="absolute w-3/4 h-3/4 border border-dashed border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-40"></div>
              
              {/* Floating Cards Mockup */}
              {[
                { title: "Sepsis_V2", x: "-20%", y: "-30%", color: "cyan" },
                { title: "Neural_Link", x: "30%", y: "-10%", color: "purple" },
                { title: "DeFi_Rust", x: "-10%", y: "40%", color: "yellow" },
                { title: "EcoSync_IoT", x: "40%", y: "30%", color: "green" },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 4 + i, 
                    repeat: Infinity,
                    delay: i 
                  }}
                  className="absolute p-4 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl"
                  style={{ left: `calc(50% + ${card.x})`, top: `calc(50% + ${card.y})` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${card.color}-400 animate-pulse`}></div>
                    <span className="text-[10px] font-mono text-gray-500">PROJECT_ID: 0{i+1}</span>
                  </div>
                  <div className="text-white font-bold text-sm tracking-tight mb-3 uppercase">{card.title}</div>
                  <div className="flex gap-1">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                       <div className="w-2/3 h-full bg-cyan-400"></div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="p-8 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 backdrop-blur-xl relative z-10 group cursor-help">
                 <Terminal className="w-12 h-12 text-cyan-400 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                 <div className="text-center">
                    <div className="text-xs font-mono text-cyan-400 mb-1">IDEA_ENGINE</div>
                    <div className="text-2xl font-black text-white italic tracking-tighter">ERROR_404_LAB</div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
