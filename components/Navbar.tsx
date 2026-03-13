"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Domains", href: "#domains" },
  { name: "Projects", href: "#projects" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <TerminalIcon className="w-6 h-6 text-cyber-blue group-hover:text-neon-purple transition-colors" />
              <span className="font-mono font-bold text-xl text-white tracking-tighter">
                Error_<span className="text-cyber-blue">CCx404</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-cyber-blue font-mono text-sm transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-blue transition-all group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/join"
                className="border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black px-4 py-2 rounded-md font-mono text-sm transition-all shadow-[0_0_10px_rgba(0,245,255,0.2)] hover:shadow-[0_0_20px_rgba(0,245,255,0.6)]"
              >
                [Join_Us]
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cyber-black border-b border-cyber-blue/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-cyber-blue block px-3 py-2 rounded-md text-base font-mono"
              >
                &gt; {link.name}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="text-cyber-blue block px-3 py-2 rounded-md text-base font-mono font-bold"
            >
              &gt; Join_Us
            </Link>
          </div>
        </div>
      </motion.div>
    )}
    </nav>
  );
}
