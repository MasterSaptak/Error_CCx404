"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const founders = [
  {
    name: "Saptak Roy",
    role: "Founder & Core Team Member",
    image: "https://picsum.photos/seed/saptak/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Saikat Majumder",
    role: "Founder",
    image: "https://picsum.photos/seed/saikat/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Fatima Begam",
    role: "Founding Member",
    image: "https://picsum.photos/seed/fatima/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Rupesh Sardar",
    role: "Founding Member",
    image: "https://picsum.photos/seed/rupesh/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Dibbokanti",
    role: "Founding Member",
    image: "https://picsum.photos/seed/dibbokanti/400/400",
    github: "#",
    linkedin: "#",
  },
];

const leadTeam = [
  {
    name: "Subarna Das",
    role: "Lead Role Member",
    image: "https://picsum.photos/seed/subarna/400/400",
  },
  {
    name: "Mahaveer",
    role: "Lead Role Member",
    image: "https://picsum.photos/seed/mahaveer/400/400",
  },
  {
    name: "Madhu Kumar",
    role: "Lead Role Member",
    image: "https://picsum.photos/seed/madhu/400/400",
  },
  {
    name: "Rahul Lohra",
    role: "Lead Role Member",
    image: "https://picsum.photos/seed/rahul/400/400",
  },
  {
    name: "Joy Datta",
    role: "Lead Role Member",
    image: "https://picsum.photos/seed/joy/400/400",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-[10px] font-mono uppercase tracking-[0.2em]">
             The Architects
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-2">
            Founding <span className="text-neon-purple">Command</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm">The collective intelligence that breathed life into Error_CCx404.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
          {founders.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 text-center hover:border-neon-purple/40 transition-all shadow-2xl"
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{member.name}</h3>
              <p className="text-[10px] font-mono text-neon-purple uppercase tracking-tight mb-4">{member.role}</p>
              
              <div className="flex justify-center gap-3">
                 <a href="#" className="p-1.5 bg-white/5 rounded border border-white/10 text-gray-400 hover:text-neon-purple hover:border-neon-purple/40 transition-all"><Github className="w-3.5 h-3.5" /></a>
                 <a href="#" className="p-1.5 bg-white/5 rounded border border-white/10 text-gray-400 hover:text-neon-purple hover:border-neon-purple/40 transition-all"><Linkedin className="w-3.5 h-3.5" /></a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lead Members Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue text-[10px] font-mono uppercase tracking-[0.2em]">
             Network Leads
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
            The <span className="text-cyber-blue">Core</span> Vanguard
          </h2>
          <p className="text-gray-500 font-mono text-sm">Engineers and visionaries driving the ecosystem forward.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {leadTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-[#0a0a0a]/50 border border-white/5 rounded-xl p-4 text-center hover:border-cyber-blue/30 transition-all"
            >
              <div className="relative w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-white font-bold text-xs mb-1">{member.name}</h3>
              <div className="text-[9px] font-mono text-gray-500 uppercase">{member.role}</div>
            </motion.div>
          ))}
        </div>

        {/* Impact Stat */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-neon-purple" />
              <span className="font-mono text-[10px] text-white tracking-widest uppercase">Verified Builders</span>
           </div>
           <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyber-blue" />
              <span className="font-mono text-[10px] text-white tracking-widest uppercase">Rapid Execution</span>
           </div>
        </div>
      </div>
    </section>
  );
}
