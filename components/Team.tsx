"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const team = [
  {
    name: "Alex Mercer",
    role: "Lead Developer",
    image: "https://picsum.photos/seed/alex/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Sarah Chen",
    role: "Security Analyst",
    image: "https://picsum.photos/seed/sarah/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "David Kim",
    role: "Robotics Engineer",
    image: "https://picsum.photos/seed/david/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Elena Rostova",
    role: "UI/UX Designer",
    image: "https://picsum.photos/seed/elena/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Marcus Johnson",
    role: "DevOps Engineer",
    image: "https://picsum.photos/seed/marcus/400/400",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Priya Patel",
    role: "Community Manager",
    image: "https://picsum.photos/seed/priya/400/400",
    github: "#",
    linkedin: "#",
  },
];

export default function Team() {
  return (
    <section
      id="team"
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
            Users.<span className="text-neon-purple">List</span>()
          </h2>
          <div className="w-24 h-1 bg-neon-purple mx-auto rounded-full shadow-[0_0_10px_rgba(108,99,255,0.8)]"></div>
          <p className="mt-6 text-gray-400 font-mono max-w-2xl mx-auto">
            Meet the core team behind Error_CCx404.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-cyber-black/80 border border-white/10 rounded-2xl p-6 hover:border-neon-purple/50 transition-all duration-300 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-neon-purple/30 group-hover:border-neon-purple transition-colors">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-1 font-sans group-hover:text-neon-purple transition-colors">
                {member.name}
              </h3>
              <p className="text-gray-400 font-mono text-sm mb-6">
                {member.role}
              </p>

              <div className="flex justify-center gap-4">
                <a
                  href={member.github}
                  className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-neon-purple/20 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={member.linkedin}
                  className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-cyber-blue/20 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-terminal-green/20 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
