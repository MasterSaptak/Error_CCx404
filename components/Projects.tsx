"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Cpu, Database, Globe, Shield, Sparkles } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "SepsisAlert",
    desc: "AI-powered early sepsis screening system for rural healthcare workers. Integrated heart rate, SpO2, and temperature sensors with AWS IoT for real-time risk prediction using MIMIC-IV datasets.",
    image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800",
    tags: ["AI/ML", "AWS IoT", "MIMIC-IV", "Healthcare"],
    link: "#",
    github: "#",
    status: "2025",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "We People",
    desc: "Community-driven humanitarian safety platform for emergency response. Supports SOS alerts, location sharing, and nearby assistance discovery to enhance public safety.",
    image: "https://images.unsplash.com/photo-1582213726892-25b399479b63?auto=format&fit=crop&q=80&w=800",
    tags: ["Safety Tech", "Geolocation", "Social Impact"],
    link: "#",
    github: "#",
    status: "2025",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    title: "GLAMORA",
    desc: "AI-driven hairstyling platform using computer vision to analyze facial features. Features real-time face shape detection, personalized recommendations, and a full booking workflow.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "PyTorch", "OpenCV", "Computer Vision"],
    link: "#",
    github: "#",
    status: "Ongoing",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "IOBOTANICA",
    desc: "IoT-driven smart gardening system with ESP8266 automation. Features soil moisture sensing, DHT11 feedback, relay-controlled irrigation, and Blynk mobile integration.",
    image: "/background.png",
    tags: ["ESP8266", "IoT", "Automation", "Embedded"],
    link: "#",
    github: "#",
    status: "2023-Present",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "WashOut (Dhopa)",
    desc: "Full-stack online laundry booking platform with real-time tracking, user dashboards, and automated service workflows. Streamlining laundry services via modern web tech.",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    link: "#",
    github: "#",
    status: "2023-Present",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "RBSAPS Cipher",
    desc: "Experimental cryptographic system generating multiple ciphertext outputs for a single plaintext. Designed for multi-layered security and data obfuscation research.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    tags: ["Cryptography", "C++", "Security"],
    link: "#",
    github: "#",
    status: "2023-Present",
    icon: <Shield className="w-5 h-5" />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-cyber-black overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-cyber-blue border border-cyber-blue/30 rounded bg-cyber-blue/5">
             FORGED_IN_THE_WARZONE
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-2">
            The <span className="text-cyber-blue">Project</span> Vault
          </h2>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            A comprehensive list of systems, platforms, and engines engineered by the 
            <span className="text-white"> Error_404</span> ecosystem. Not just apps—infrastructures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden hover:border-cyber-blue/40 transition-all shadow-2xl"
            >
              {/* Image Container with Glitch Overlay */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-cyber-blue/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                   <div className="p-2 bg-black/80 backdrop-blur-md rounded border border-white/10 text-cyber-blue group-hover:shadow-[0_0_15px_#00f5ff] transition-all">
                      {project.icon}
                   </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black to-transparent">
                   <span className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest bg-cyber-blue/10 px-2 py-0.5 rounded">
                      {project.status}
                   </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-mono text-xs leading-relaxed mb-6 h-12 line-clamp-3">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-gray-500 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                   <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-cyber-blue/20 border border-white/10 hover:border-cyber-blue/40 text-xs font-mono text-white transition-all rounded">
                      <Github className="w-3 h-3" /> [SOURCE]
                   </button>
                   <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyber-blue text-black font-bold text-xs font-mono transition-all rounded hover:shadow-[0_0_15px_#00f5ff]">
                      <ExternalLink className="w-3 h-3" /> [LIVE]
                   </button>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                 <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-white/20 group-hover:border-cyber-blue group-hover:animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 border border-dashed border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02]"
        >
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold mb-1">Building the Future of Saptak?</h4>
            <p className="text-gray-500 text-sm font-mono">Our innovation lab is always looking for new ideas to forge.</p>
          </div>
          <button className="px-8 py-3 border border-cyber-blue text-cyber-blue font-mono text-sm hover:bg-cyber-blue hover:text-black transition-all rounded-lg uppercase tracking-widest font-bold">
            Submit Your Idea
          </button>
        </motion.div>
      </div>
    </section>
  );
}
