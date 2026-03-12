"use client";

import { motion } from "motion/react";
import { Server, Globe, Smartphone, Shield, Cpu, Trophy } from "lucide-react";

const domains = [
  {
    title: "DevOps",
    icon: <Server className="w-10 h-10" />,
    color: "text-cyber-blue",
    border: "border-cyber-blue/30 hover:border-cyber-blue",
    bg: "hover:bg-cyber-blue/5",
    shadow: "hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]",
    desc: "CI/CD, Cloud Infrastructure, Containerization, and Automation.",
  },
  {
    title: "Web Development",
    icon: <Globe className="w-10 h-10" />,
    color: "text-neon-purple",
    border: "border-neon-purple/30 hover:border-neon-purple",
    bg: "hover:bg-neon-purple/5",
    shadow: "hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]",
    desc: "Modern frontend frameworks, robust backends, and full-stack solutions.",
  },
  {
    title: "App Development",
    icon: <Smartphone className="w-10 h-10" />,
    color: "text-terminal-green",
    border: "border-terminal-green/30 hover:border-terminal-green",
    bg: "hover:bg-terminal-green/5",
    shadow: "hover:shadow-[0_0_20px_rgba(0,255,156,0.4)]",
    desc: "Cross-platform and native mobile applications for iOS and Android.",
  },
  {
    title: "Cyber Security",
    icon: <Shield className="w-10 h-10" />,
    color: "text-red-500",
    border: "border-red-500/30 hover:border-red-500",
    bg: "hover:bg-red-500/5",
    shadow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
    desc: "Ethical hacking, penetration testing, and securing digital assets.",
  },
  {
    title: "Robotics & IoT",
    icon: <Cpu className="w-10 h-10" />,
    color: "text-yellow-400",
    border: "border-yellow-400/30 hover:border-yellow-400",
    bg: "hover:bg-yellow-400/5",
    shadow: "hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]",
    desc: "Hardware programming, sensor networks, and autonomous systems.",
  },
  {
    title: "Hackathons",
    icon: <Trophy className="w-10 h-10" />,
    color: "text-orange-500",
    border: "border-orange-500/30 hover:border-orange-500",
    bg: "hover:bg-orange-500/5",
    shadow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]",
    desc: "Competitive coding, rapid prototyping, and 24-hour innovation sprints.",
  },
];

export default function Domains() {
  return (
    <section
      id="domains"
      className="py-24 relative bg-cyber-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans tracking-tight">
            Core.<span className="text-neon-purple">Domains</span>()
          </h2>
          <div className="w-24 h-1 bg-neon-purple mx-auto rounded-full shadow-[0_0_10px_rgba(108,99,255,0.8)]"></div>
          <p className="mt-6 text-gray-400 font-mono max-w-2xl mx-auto">
            Our community focuses on cutting-edge technologies and disciplines
            to build the future of software and hardware.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl border bg-cyber-black/50 backdrop-blur-sm transition-all duration-300 group cursor-pointer ${domain.border} ${domain.bg} ${domain.shadow}`}
            >
              <div
                className={`mb-6 p-4 inline-block rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300 ${domain.color}`}
              >
                {domain.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-sans tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {domain.title}
              </h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                {domain.desc}
              </p>
              <div className="mt-6 flex items-center text-sm font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className={domain.color}>Explore_Module</span>
                <span className={`ml-2 ${domain.color}`}>&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
