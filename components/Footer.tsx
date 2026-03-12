"use client";

import {
  Terminal as TerminalIcon,
  Github,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cyber-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <TerminalIcon className="w-8 h-8 text-cyber-blue group-hover:text-neon-purple transition-colors" />
              <span className="font-mono font-bold text-2xl text-white tracking-tighter">
                Error_<span className="text-cyber-blue">CCx404</span>
              </span>
            </Link>
            <p className="text-gray-400 font-mono text-sm max-w-md leading-relaxed mb-6">
              A premier DevOps and innovation community operating under Saptech.
              We build the future through software development, cybersecurity,
              robotics, and IoT.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-cyber-blue transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-purple transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-terminal-green transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold font-sans mb-6">Quick Links</h4>
            <ul className="space-y-3 font-mono text-sm text-gray-400">
              <li>
                <Link
                  href="#about"
                  className="hover:text-cyber-blue transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#domains"
                  className="hover:text-cyber-blue transition-colors"
                >
                  Domains
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="hover:text-cyber-blue transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className="hover:text-cyber-blue transition-colors"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold font-sans mb-6">Resources</h4>
            <ul className="space-y-3 font-mono text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-neon-purple transition-colors"
                >
                  Saptech Platform
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-purple transition-colors"
                >
                  Community Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-purple transition-colors"
                >
                  Open Source
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-purple transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 font-mono text-xs">
            &copy; {new Date().getFullYear()} Error_CCx404 Community. All rights
            reserved.
          </p>
          <p className="text-gray-500 font-mono text-xs flex items-center">
            Built with <Heart className="w-3 h-3 mx-1 text-red-500" /> by
            Builders.
          </p>
        </div>
      </div>
    </footer>
  );
}
