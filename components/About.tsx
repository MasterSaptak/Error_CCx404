"use client";

import { motion } from "motion/react";
import { Cpu, Network, ShieldAlert } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 relative bg-cyber-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans tracking-tight">
            System.<span className="text-cyber-blue">About</span>()
          </h2>
          <div className="w-24 h-1 bg-cyber-blue mx-auto rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)]"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-gray-300 font-mono leading-relaxed"
          >
            <p>
              <span className="text-terminal-green font-bold">&gt;</span>{" "}
              Error_CCx404 is a premier DevOps and innovation community
              operating under{" "}
              <span className="text-neon-purple font-bold">Saptech</span>.
            </p>
            <p>
              <span className="text-terminal-green font-bold">&gt;</span> We are
              a collective of developers, hackers, engineers, and creators
              dedicated to pushing the boundaries of technology. From software
              development to cybersecurity, robotics, and IoT, we build the
              future.
            </p>
            <p>
              <span className="text-terminal-green font-bold">&gt;</span> Our
              mission is to foster a culture of continuous learning,
              collaboration, and startup innovation through hackathons,
              workshops, and real-world projects.
            </p>

            <div className="pt-6 flex items-center gap-4">
              <div className="px-4 py-2 border border-cyber-blue/30 bg-cyber-blue/5 rounded text-cyber-blue font-mono text-sm">
                Status: Active
              </div>
              <div className="px-4 py-2 border border-neon-purple/30 bg-neon-purple/5 rounded text-neon-purple font-mono text-sm">
                Parent: Saptech
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyber-blue/20 to-neon-purple/20 blur-3xl rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Cpu className="w-8 h-8 text-cyber-blue" />,
                  title: "Innovation",
                  desc: "Building next-gen tech",
                },
                {
                  icon: <Network className="w-8 h-8 text-neon-purple" />,
                  title: "Community",
                  desc: "Collaborative growth",
                },
                {
                  icon: <ShieldAlert className="w-8 h-8 text-terminal-green" />,
                  title: "Security",
                  desc: "Cyber defense focus",
                },
                {
                  icon: <Terminal className="w-8 h-8 text-white" />,
                  title: "Development",
                  desc: "Full-stack mastery",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-cyber-black/80 border border-white/10 p-6 rounded-xl backdrop-blur-sm hover:border-cyber-blue/50 transition-all group"
                >
                  <div className="mb-4 p-3 bg-white/5 inline-block rounded-lg group-hover:bg-cyber-blue/10 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold font-sans text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Need to import Terminal icon since it was used but not imported
import { Terminal } from "lucide-react";
