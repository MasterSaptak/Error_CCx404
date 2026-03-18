"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Play, ShieldAlert, Code2, Terminal, RefreshCcw, Trophy, Target, MousePointer2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type GameType = 'packet-defender' | 'bit-shooter';

export default function MiniGameZone() {
  const [activeGame, setActiveGame] = useState<GameType>('packet-defender');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Ref to track score to avoid closure issues in the game loop
  const scoreRef = useRef(0);

  // Game Logic
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset score for new session
    scoreRef.current = 0;
    setGameScore(0);
    setGameOver(false);

    let animationFrameId: number;
    let frameCount = 0;
    
    // Game State Variables
    let player = { x: canvas.width / 2, y: canvas.height / 2, radius: 12, color: '#00f5ff' };
    let enemies: any[] = [];
    let bullets: any[] = [];
    let particles: any[] = [];
    
    const spawnEnemy = () => {
      const radius = Math.random() * (20 - 10) + 10;
      let x, y;
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      }
      const angle = Math.atan2(player.y - y, player.x - x);
      const speed = activeGame === 'packet-defender' ? (1 + Math.random() * 2) : (2 + Math.random() * 2);
      enemies.push({ x, y, radius, color: '#ff0055', velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed } });
    };

    const createExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x, y,
          radius: Math.random() * 3,
          color,
          velocity: { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 },
          alpha: 1
        });
      }
    };

    const draw = () => {
      if (!isPlaying) return;
      
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // Motion blur effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines (Aesthetic)
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Update & Draw Particles
      particles.forEach((p, index) => {
        if (p.alpha <= 0) {
          particles.splice(index, 1);
          return;
        }
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.alpha -= 0.02;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });

      // Update & Draw Bullets (for Bit Shooter)
      if (activeGame === 'bit-shooter') {
        bullets.forEach((b, bIndex) => {
          b.x += b.velocity.x;
          b.y += b.velocity.y;
          
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();

          if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
            bullets.splice(bIndex, 1);
          }
        });
      }

      // Update & Draw Enemies
      enemies.forEach((e, eIndex) => {
        if (activeGame === 'packet-defender') {
           const angle = Math.atan2(player.y - e.y, player.x - e.x);
           e.velocity.x = Math.cos(angle) * (1.5 + frameCount / 2000);
           e.velocity.y = Math.sin(angle) * (1.5 + frameCount / 2000);
        }
        
        e.x += e.velocity.x;
        e.y += e.velocity.y;

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = e.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Collision with Player
        const dist = Math.hypot(player.x - e.x, player.y - e.y);
        if (dist < player.radius + e.radius) {
           handleGameOver();
        }

        // Collision with Bullets (Bit Shooter)
        if (activeGame === 'bit-shooter') {
          bullets.forEach((b, bIndex) => {
            const bDist = Math.hypot(b.x - e.x, b.y - e.y);
            if (bDist < 3 + e.radius) {
              createExplosion(e.x, e.y, e.color);
              enemies.splice(eIndex, 1);
              bullets.splice(bIndex, 1);
              scoreRef.current += 100;
              setGameScore(scoreRef.current);
            }
          });
        }
      });

      // Draw Player
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.shadowBlur = 20;
      ctx.shadowColor = player.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Score increment for time survived in Defender
      if (activeGame === 'packet-defender' && frameCount % 60 === 0) {
        scoreRef.current += 10;
        setGameScore(scoreRef.current);
      }

      // Spawn Logic
      if (frameCount % Math.max(20, 60 - Math.floor(frameCount/500)) === 0) {
        spawnEnemy();
      }

      frameCount++;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleGameOver = () => {
      cancelAnimationFrame(animationFrameId);
      setIsPlaying(false);
      setGameOver(true);
      setHighScore(prev => Math.max(prev, scoreRef.current));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      player.x = (e.clientX - rect.left) * scaleX;
      player.y = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (activeGame === 'bit-shooter') {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        
        const angle = Math.atan2(clickY - player.y, clickX - player.x);
        bullets.push({
          x: player.x,
          y: player.y,
          velocity: { x: Math.cos(angle) * 12, y: Math.sin(angle) * 12 }
        });
      }
    };

    draw();
    canvas.addEventListener('mousemove', handleMouseMove);
    if (activeGame === 'bit-shooter') {
      canvas.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isPlaying, activeGame]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
  };

  return (
    <section id="mini-games" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] font-mono uppercase tracking-[0.2em]">
               System Stress Test Required
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-2 leading-none">
              The <span className="text-red-500">Execution</span> Zone
            </h2>
            <div className="flex items-center gap-3 mt-4">
               <button 
                 onClick={() => { setActiveGame('packet-defender'); setIsPlaying(false); setGameOver(false); }}
                 className={`font-mono text-[10px] px-4 py-2 rounded-lg border transition-all ${activeGame === 'packet-defender' ? 'bg-red-500 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-gray-500 border-white/10 hover:border-white/30'}`}
               >
                 [01] PACKET_DEFENDER
               </button>
               <button 
                 onClick={() => { setActiveGame('bit-shooter'); setIsPlaying(false); setGameOver(false); }}
                 className={`font-mono text-[10px] px-4 py-2 rounded-lg border transition-all ${activeGame === 'bit-shooter' ? 'bg-red-500 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-gray-500 border-white/10 hover:border-white/30'}`}
               >
                 [02] BIT_SHOOTER
               </button>
            </div>
          </div>
          
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex items-center gap-6">
             <div>
                <div className="text-[9px] font-mono text-gray-500 mb-1 tracking-widest uppercase">Rank: Engineer</div>
                <div className="text-xs font-bold text-white uppercase tracking-tighter">Authorized User</div>
             </div>
             <div className="w-px h-8 bg-white/10"></div>
             <div>
                <div className="text-[9px] font-mono text-gray-500 mb-1 uppercase tracking-widest">Global_High</div>
                <div className="text-2xl font-black text-red-500 font-mono tracking-tighter">{highScore.toString().padStart(4, '0')}</div>
             </div>
          </div>
        </div>

        {/* Instructions Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-wrap items-center gap-8 justify-center"
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <MousePointer2 className="w-4 h-4 text-red-500" />
             </div>
             <div>
                <div className="text-[10px] text-gray-400 uppercase font-mono">Control</div>
                <div className="text-xs font-bold text-white uppercase">Cursor Movement</div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-xs font-black text-red-500 font-mono">
                {activeGame === 'packet-defender' ? 'X' : 'L1'}
             </div>
             <div>
                <div className="text-[10px] text-gray-400 uppercase font-mono">Action</div>
                <div className="text-xs font-bold text-white uppercase">{activeGame === 'packet-defender' ? 'Dodge Packets' : 'Left Click to Fire'}</div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-xs font-black text-red-500 font-mono">
                S+
             </div>
             <div>
                <div className="text-[10px] text-gray-400 uppercase font-mono">Goal</div>
                <div className="text-xs font-bold text-white uppercase">Achieve High Score</div>
             </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Game Frame */}
          <div className="lg:col-span-8 group relative aspect-video bg-[#050505] border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,0,85,0.1)]">
            
            <AnimatePresence>
              {!isPlaying && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6 p-4 rounded-full bg-red-500/10 border border-red-500/30"
                  >
                    <Gamepad2 className="w-12 h-12 text-red-500" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-black text-white italic mb-2 uppercase tracking-tighter">
                    {gameOver ? 'SYSTEMCRITICAL: FAIL' : `RUNNING: ${activeGame.replace('-', '_').toUpperCase()}`}
                  </h3>
                  
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-8 max-w-xs text-center">
                    <p className="text-gray-400 font-mono text-[11px] leading-relaxed">
                      {activeGame === 'packet-defender' 
                        ? 'Dodge incoming RED packets. The longer you survive, the higher the score. Speed increases every 10 seconds.'
                        : 'Malware nodes are closing in. Use bit-streams [LEFT CLICK] to annihilate them before impact.'}
                    </p>
                  </div>

                  <button 
                    onClick={startGame}
                    className="group relative px-12 py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded transition-all hover:scale-105 hover:shadow-[0_0_30px_#dc2626]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                       {gameOver ? <RefreshCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                       {gameOver ? 'Re-Initialize' : 'Run Binary'}
                    </span>
                  </button>

                  {gameOver && (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-8 text-center"
                    >
                      <div className="text-gray-600 text-[10px] font-mono mb-1 uppercase">LAST_ATTEMPT_SCORE</div>
                      <div className="text-3xl font-black text-white px-8 py-2 border border-red-500/50 rounded-lg bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        {gameScore.toString().padStart(4, '0')}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <canvas 
              ref={canvasRef} 
              width={800} 
              height={450} 
              className={`w-full h-full ${isPlaying ? 'cursor-none' : ''}`}
            />

            {/* In-Game HUD */}
            {isPlaying && (
               <div className="absolute top-6 left-6 z-10 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg font-mono">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                    <span className="text-[10px] text-gray-400 tracking-widest uppercase">Live_Output</span>
                  </div>
                  <div className="flex items-end gap-3">
                     <div className="text-3xl font-black text-white tracking-tighter">{gameScore}</div>
                     <div className="text-[10px] text-red-500 font-bold mb-1">SCORE.exe</div>
                  </div>
               </div>
            )}
            
            <div className="absolute bottom-6 right-6 z-10 flex gap-2">
               <div className="p-2 px-4 bg-black/80 backdrop-blur-md border border-white/10 rounded flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <Target className="w-3 h-3 text-red-500" /> Latency: 0.1ms
               </div>
            </div>
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.025),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          </div>

          {/* Dev Inspection Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             <div className="flex-1 p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Code2 className="w-12 h-12 text-red-500" />
                </div>

                <h4 className="flex items-center gap-2 text-red-500 font-mono text-xs mb-8 uppercase tracking-widest">
                   <Terminal className="w-4 h-4" /> Logic_Inspection
                </h4>
                
                <div className="space-y-8 relative z-10">
                   <div>
                      <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-tighter">Current_Engine</div>
                      <div className="text-base text-white font-bold mb-1">JS Canvas Physics V2.2</div>
                      <p className="text-[11px] text-gray-500 font-mono leading-relaxed">"Dynamic vector calculation for {activeGame === 'packet-defender' ? 'recursive chasing' : 'bit-stream trajectories'}. Zero reliance on external libs."</p>
                   </div>

                   <div className="space-y-2">
                      <div className="text-[10px] font-mono text-gray-500 uppercase mb-3 text-center">Engine_Logic_Flow</div>
                      <div className="p-4 bg-black/60 rounded border border-white/10 font-mono text-[10px]">
                         {activeGame === 'packet-defender' ? (
                           <div className="text-terminal-green space-y-1">
                              <div>{`const angle = Math.atan2(p.y - e.y, p.x - e.x);`}</div>
                              <div>{`e.vel.x = Math.cos(angle) * speed;`}</div>
                              <div>{`e.vel.y = Math.sin(angle) * speed;`}</div>
                              <div className="opacity-40 animate-pulse">// Recursive recalculation per frame</div>
                           </div>
                         ) : (
                           <div className="text-terminal-green space-y-1">
                              <div>{`bullets.push({`}</div>
                              <div>{`  pos: player.pos,`}</div>
                              <div>{`  vel: vector.fromAngle(clickAngle)`}</div>
                              <div>{`});`}</div>
                           </div>
                         )}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 border border-white/5 rounded">
                         <div className="text-[9px] text-gray-500 mb-1 uppercase">Render</div>
                         <div className="text-xs font-bold text-white flex items-center gap-1">
                            <RefreshCcw className="w-3 h-3 text-red-500" /> 60 FPS
                         </div>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5 rounded">
                         <div className="text-[9px] text-gray-500 mb-1 uppercase">Security</div>
                         <div className="text-xs font-bold text-white flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-red-500" /> ACTIVE
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-4 group hover:bg-red-500/10 transition-colors">
                <div className="p-3 bg-red-500/10 rounded-lg group-hover:scale-110 transition-transform">
                   <Trophy className="w-6 h-6 text-red-500" />
                </div>
                <div>
                   <div className="text-xs font-bold text-white uppercase tracking-tight">Proof of Engineering</div>
                   <div className="text-[10px] font-mono text-gray-500">Latency-free execution under 100+ concurrent object renderings.</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
