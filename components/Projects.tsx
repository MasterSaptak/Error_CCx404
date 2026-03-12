"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, Code2 } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Dhopa",
    desc: "A modern laundry management and delivery platform built for scale. Features real-time tracking, automated billing, and a driver app.",
    image: "https://picsum.photos/seed/dhopa/800/600",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    link: "#",
    github: "#",
    status: "Production",
  },
  {
    title: "Saptech Core",
    desc: "Internal community management platform for Saptech. Handles member onboarding, event registration, and project tracking.",
    image: "https://picsum.photos/seed/saptech/800/600",
    tags: ["React", "Firebase", "Tailwind", "Vercel"],
    link: "#",
    github: "#",
    status: "Beta",
  },
  {
    title: "CyberDefend IoT",
    desc: "A lightweight intrusion detection system for IoT networks. Uses machine learning to identify anomalous traffic patterns.",
    image: "https://picsum.photos/seed/cyber/800/600",
    tags: ["Python", "TensorFlow", "Raspberry Pi", "MQTT"],
    link: "#",
    github: "#",
    status: "Research",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 relative bg-cyber-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-green/20 rounded-full blur-[100px]"></div>
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
            Execute.<span className="text-terminal-green">Projects</span>()
          </h2>
          <div className="w-24 h-1 bg-terminal-green mx-auto rounded-full shadow-[0_0_10px_rgba(0,255,156,0.8)]"></div>
          <p className="mt-6 text-gray-400 font-mono max-w-2xl mx-auto">
            Showcasing the innovative solutions and startups built by the
            Error_CCx404 community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-cyber-black/80 border border-white/10 rounded-2xl overflow-hidden group hover:border-terminal-green/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,156,0.15)]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-cyber-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 text-xs font-mono font-bold bg-cyber-black/80 text-terminal-green border border-terminal-green/50 rounded-full backdrop-blur-md">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 font-sans group-hover:text-terminal-green transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm mb-6 line-clamp-3">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-mono text-gray-300 bg-white/5 border border-white/10 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <a
                    href={project.github}
                    className="flex items-center text-gray-400 hover:text-white transition-colors font-mono text-sm"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source
                  </a>
                  <a
                    href={project.link}
                    className="flex items-center text-terminal-green hover:text-white transition-colors font-mono text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 border border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10 rounded-lg font-mono transition-all"
          >
            <Code2 className="w-5 h-5 mr-2" />
            View All Repositories
          </a>
        </motion.div>
      </div>
    </section>
  );
}
