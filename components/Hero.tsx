"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Terminal, Code, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: "url('/background.png')" }}
      ></div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-cyber-blue/20 rounded-full blur-[120px]"></div>
        <div className="w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[100px] absolute -top-20 -right-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue text-sm font-mono mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"></span>
          System Status: Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white"
        >
          <span className="glitch-text inline-block" data-text="Error_CCx404">
            Error_CCx404
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-gray-400 font-mono"
        >
          Where Builders <span className="text-terminal-green">Debug</span> the
          Future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/join"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-cyber-black bg-cyber-blue rounded-md overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,245,255,0.6)]"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <Terminal className="w-5 h-5 mr-2" />
            Join Community
          </Link>
          <Link
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-white border border-neon-purple rounded-md overflow-hidden transition-all hover:bg-neon-purple/10 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)]"
          >
            <Code className="w-5 h-5 mr-2 text-neon-purple group-hover:animate-pulse" />
            Explore Projects
          </Link>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8"
        >
          {[
            { label: "Members", value: "500+" },
            { label: "Projects", value: "50+" },
            { label: "Hackathons", value: "12" },
            { label: "Startups", value: "5" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/5 backdrop-blur-sm hover:border-cyber-blue/30 transition-colors"
            >
              <span className="text-3xl font-bold text-white font-mono">
                {stat.value}
              </span>
              <span className="text-sm text-gray-400 font-mono uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
