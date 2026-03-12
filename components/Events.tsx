"use client";

import { motion } from "motion/react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const events = [
  {
    title: "Saptech Hackathon 2026",
    date: "Oct 15-17, 2026",
    time: "48 Hours",
    location: "Main Campus & Online",
    type: "Hackathon",
    color: "text-cyber-blue",
    border: "border-cyber-blue",
    bg: "bg-cyber-blue/10",
    desc: "Join 500+ developers for a 48-hour coding marathon. Build solutions for smart cities and sustainable tech.",
  },
  {
    title: "Cyber Defense Workshop",
    date: "Nov 05, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Lab 404",
    type: "Workshop",
    color: "text-red-500",
    border: "border-red-500",
    bg: "bg-red-500/10",
    desc: "Hands-on session on network penetration testing and securing web applications against common vulnerabilities.",
  },
  {
    title: "IoT & Robotics Expo",
    date: "Dec 12, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "Innovation Hub",
    type: "Exhibition",
    color: "text-yellow-400",
    border: "border-yellow-400",
    bg: "bg-yellow-400/10",
    desc: "Showcase of community-built autonomous robots, smart home devices, and industrial IoT solutions.",
  },
];

export default function Events() {
  return (
    <section
      id="events"
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
            Schedule.<span className="text-cyber-blue">Events</span>()
          </h2>
          <div className="w-24 h-1 bg-cyber-blue mx-auto rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)]"></div>
          <p className="mt-6 text-gray-400 font-mono max-w-2xl mx-auto">
            Upcoming hackathons, workshops, and meetups.
          </p>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative bg-cyber-black/50 border border-white/10 rounded-xl p-6 md:p-8 hover:border-cyber-blue/50 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-1 h-full ${event.bg} border-l-4 ${event.border}`}
              ></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${event.border} ${event.color} bg-cyber-black/80`}
                    >
                      {event.type}
                    </span>
                    <span className="text-gray-400 font-mono text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> {event.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 font-sans group-hover:text-cyber-blue transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 font-mono text-sm mb-4 max-w-3xl">
                    {event.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-cyber-blue" />{" "}
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-neon-purple" />{" "}
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button className="w-full md:w-auto px-6 py-3 bg-white/5 border border-white/10 hover:border-cyber-blue hover:bg-cyber-blue/10 text-white rounded-lg font-mono transition-all flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                    Register
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
