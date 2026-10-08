import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Send,
  Download,
  Repeat,
  CreditCard,
  Layers,
  Eye,
  Bell,
  TrendingUp,
  LayoutDashboard,
  PieChart,
  History,
  Settings,
  Copy,
  ChevronRight,
  Wifi,
  Sparkles,
} from 'lucide-react';
import { EthereumIcon, SolanaIcon, BaseIcon, CircleIcon, ArbitrumIcon, HybitMark } from './icons/NetworkIcons';

export const PhoneMockup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mouse tilt physics for 3D realism
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring smoothed motion values for tactile, physical 3D weight
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // iPhone 17 Pro Max 3D angles:
  // Base natural 3D isometric view (rotateY: -12°, rotateX: 9°)
  // Smoothly responds to user cursor interaction
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-19, -5]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14, 4]);
  const rotateZ = useTransform(smoothMouseX, [-0.5, 0.5], [-2.5, 1]);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['-35%', '135%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const walletAddress = '0x7F2...8b1e';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('0x7F2a8934C31952eB101569421A4B0224b8b1e');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const assets = [
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      chain: 'Ethereum',
      amount: '7.12 ETH',
      change: '+4.25%',
      isPos: true,
      val: '$24,353.96',
      icon: <EthereumIcon className="w-5 h-5 text-indigo-400" />,
    },
    {
      id: 'sol',
      symbol: 'SOL',
      name: 'Solana',
      chain: 'Solana',
      amount: '62.15 SOL',
      change: '+7.82%',
      isPos: true,
      val: '$11,448.03',
      icon: <SolanaIcon className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      chain: 'Base',
      amount: '5116.25 USDC',
      change: '+0.01%',
      isPos: true,
      val: '$5,116.25',
      icon: <CircleIcon className="w-5 h-5 text-sky-400" />,
    },
    {
      id: 'arb',
      symbol: 'ARB',
      name: 'Arbitrum',
      chain: 'Arbitrum',
      amount: '1785.7 ARB',
      change: '-1.45%',
      isPos: false,
      val: '$2,000.00',
      icon: <ArbitrumIcon className="w-5 h-5 text-blue-400" />,
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-[340px] sm:max-w-[365px] py-4 select-none group cursor-grab active:cursor-grabbing"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Realistic Smartphone Body - iPhone 17 Pro Max (Grade 5 Titanium & 6.9" Display) */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          rotateZ,
          transformStyle: 'preserve-3d',
        }}
        animate={!isHovered ? {
          y: [-4, 4, -4],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        } : { y: 0 }}
        className="relative transition-shadow duration-300"
      >
        {/* ========================================================= */}
        {/* PHYSICAL HARDWARE: 3D EXTRUDED TITANIUM CHASSIS & BUTTONS */}
        {/* ========================================================= */}

        {/* 1. Realistic 3D Ground & Contact Shadow */}
        <div 
          className="absolute -bottom-10 left-6 right-6 h-12 rounded-[50%] bg-black/80 blur-xl pointer-events-none -z-30 transform translate-y-6 scale-90 transition-all duration-300 group-hover:scale-100 group-hover:blur-2xl group-hover:bg-black/90"
          style={{ transform: 'translateZ(-60px) rotateX(90deg)' }}
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-8 left-12 right-12 h-6 rounded-[50%] bg-black/95 blur-md pointer-events-none -z-20 transform translate-y-3"
          style={{ transform: 'translateZ(-30px)' }}
          aria-hidden="true"
        />

        {/* 2. Left Edge Hardware: Antenna Bands, Action Button, Volume Up, Volume Down */}
        {/* Upper Antenna Isolation Band (Left) */}
        <div 
          className="absolute -left-[3.5px] top-[54px] w-[3px] h-[3.5px] bg-[#121216] border-y border-[#3A3A44] z-10 rounded-l-[1px]"
          title="Antenna Band"
        />
        {/* Action Button (Tactile Titanium Pill) */}
        <div 
          className="absolute -left-[4.5px] top-[86px] w-[4.5px] h-[26px] bg-gradient-to-r from-[#222228] via-[#484852] to-[#2E2E36] rounded-l-[2.5px] border-l border-y border-white/30 shadow-[-3px_0_6px_rgba(0,0,0,0.85)] z-20 flex items-center justify-center transition-transform"
          title="Action Button"
        >
          {/* Subtle tactile grip center groove */}
          <div className="w-[1.5px] h-[14px] bg-white/20 rounded-full" />
        </div>
        {/* Volume Up Button */}
        <div 
          className="absolute -left-[4.5px] top-[124px] w-[4.5px] h-[48px] bg-gradient-to-r from-[#202026] via-[#454550] to-[#2A2A32] rounded-l-[2.5px] border-l border-y border-white/25 shadow-[-3px_0_6px_rgba(0,0,0,0.8)] z-20"
          title="Volume Up"
        />
        {/* Volume Down Button */}
        <div 
          className="absolute -left-[4.5px] top-[182px] w-[4.5px] h-[48px] bg-gradient-to-r from-[#202026] via-[#454550] to-[#2A2A32] rounded-l-[2.5px] border-l border-y border-white/25 shadow-[-3px_0_6px_rgba(0,0,0,0.8)] z-20"
          title="Volume Down"
        />
        {/* Lower Antenna Isolation Band (Left) */}
        <div 
          className="absolute -left-[3.5px] bottom-[110px] w-[3px] h-[3.5px] bg-[#121216] border-y border-[#3A3A44] z-10 rounded-l-[1px]"
          title="Antenna Band"
        />

        {/* 3. Right Edge Hardware: Antenna Bands, Side/Power Button, Camera Control Button */}
        {/* Upper Antenna Isolation Band (Right) */}
        <div 
          className="absolute -right-[3.5px] top-[54px] w-[3px] h-[3.5px] bg-[#121216] border-y border-[#3A3A44] z-10 rounded-r-[1px]"
          title="Antenna Band"
        />
        {/* Side / Power Button (Lock) */}
        <div 
          className="absolute -right-[4.5px] top-[120px] w-[4.5px] h-[64px] bg-gradient-to-l from-[#202026] via-[#454550] to-[#2A2A32] rounded-r-[2.5px] border-r border-y border-white/25 shadow-[3px_0_6px_rgba(0,0,0,0.8)] z-20"
          title="Side Button (Siri / Power)"
        />
        {/* Camera Control Button (Signature iPhone 17 Pro Max Capacitive Sapphire Sensor) */}
        <div 
          className="absolute -right-[3px] bottom-[145px] w-[4px] h-[52px] rounded-r-[2px] z-20 overflow-hidden shadow-[2px_0_5px_rgba(0,0,0,0.7)]"
          title="Camera Control (Sapphire Capacitive Sensor)"
        >
          {/* Flush capacitive touch surface with micro stainless/titanium rim */}
          <div className="w-full h-full bg-gradient-to-l from-[#181820] via-[#2F2F38] to-[#1E1E24] border-r border-y border-white/35 flex items-center justify-center">
            {/* Sapphire crystal center strip */}
            <div className="w-[1.5px] h-[36px] bg-white/25 rounded-full" />
          </div>
        </div>
        {/* Lower Antenna Isolation Band (Right) */}
        <div 
          className="absolute -right-[3.5px] bottom-[110px] w-[3px] h-[3.5px] bg-[#121216] border-y border-[#3A3A44] z-10 rounded-r-[1px]"
          title="Antenna Band"
        />

        {/* ========================================================= */}
        {/* 4. SOLID 3D TITANIUM CHASSIS FRAME (Extrusion & Bevels) */}
        {/* ========================================================= */}
        {/* Backplate / Extrusion Depth Layer (visible at 3D tilt angles) */}
        <div 
          className="absolute inset-0 rounded-[54px] bg-[#0C0C10] border border-white/10 -z-10"
          style={{
            transform: 'translateZ(-14px)',
            boxShadow: `
              -1px 1px 0 #2E2E38,
              -2px 2px 0 #282832,
              -3px 3px 0 #22222A,
              -4px 4px 0 #1D1D24,
              -5px 5px 0 #181820,
              -6px 6px 0 #14141A,
              -7px 7px 0 #101014,
              -8px 8px 0 #0D0D10,
              -10px 10px 0 #09090C,
              -12px 14px 22px rgba(0,0,0,0.9),
              -24px 32px 55px rgba(0,0,0,0.85)
            `,
          }}
          aria-hidden="true"
        />

        {/* Outer Grade 5 Titanium Band Chassis (Precision Satin Brushed Texture) */}
        <div 
          className="relative rounded-[54px] p-[3.5px] bg-gradient-to-b from-[#4A4A56] via-[#24242C] to-[#141418] border border-white/30 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.95)]"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Metallic Inner Chamfer Rim (Highlight on top-left, Shadow on bottom-right) */}
          <div className="rounded-[51px] p-[2.5px] bg-gradient-to-br from-[#3E3E48] via-[#1C1C22] to-[#0E0E12] shadow-inner">
            
            {/* Ultra-Thin OLED Bezel Ring (Apple's thinnest border ~1.15mm) */}
            <div className="rounded-[49px] p-[2.5px] bg-[#000000] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]">
              
              {/* ===================================================== */}
              {/* 5. 6.9" SUPER RETINA XDR DISPLAY (All-Screen OLED)   */}
              {/* ===================================================== */}
              <div 
                className="relative rounded-[46px] bg-[#09090B] overflow-hidden text-white font-sans flex flex-col h-[648px] sm:h-[662px] shadow-2xl"
                style={{ transform: 'translateZ(1px)' }}
              >
                {/* Micro-Aperture Ear Speaker Slit (Laser-etched into top bezel seam) */}
                <div 
                  className="absolute top-[3px] left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#16161C] rounded-full border-t border-white/10 z-50 flex items-center justify-center pointer-events-none"
                  title="Receiver / Ear Speaker Micro-slit"
                >
                  <div className="w-8 h-[1px] bg-black/80 rounded-full" />
                </div>

                {/* Ceramic Shield 2.0 Glass: Dynamic 3D Specular Light Glare */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-tr from-transparent via-white/[0.045] to-transparent opacity-80"
                  style={{ x: glareX }}
                  aria-hidden="true" 
                />

                {/* Ambient Subtle Edge Vignette for True OLED Realism */}
                <div 
                  className="absolute inset-0 pointer-events-none z-35 shadow-[inset_0_0_16px_rgba(0,0,0,0.6)]" 
                  aria-hidden="true" 
                />

                {/* ===================================================== */}
                {/* 6. STATUS BAR & DYNAMIC ISLAND                       */}
                {/* ===================================================== */}
                <div className="px-5 pt-3 pb-1.5 flex items-center justify-between text-xs text-neutral-300 font-medium z-30 shrink-0 select-none">
                  
                  {/* Left: Time (9:41 Pro Typographic Alignment) */}
                  <div className="w-12 text-left pl-1">
                    <span className="font-semibold text-[13px] tracking-tight text-white font-sans">
                      9:41
                    </span>
                  </div>

                  {/* Center: Dynamic Island (True Pro Max Cutout with 24MP Camera Lens Glint & FaceID) */}
                  <div 
                    className="bg-black rounded-full flex items-center justify-between px-2.8 w-[108px] h-[27px] border border-white/[0.12] shadow-inner relative group/island cursor-pointer transition-all duration-300 hover:w-[120px]"
                    title="iPhone 17 Pro Max Dynamic Island"
                  >
                    {/* Camera & Sensor Cluster */}
                    <div className="flex items-center gap-1.5 pl-0.5">
                      {/* 24MP TrueDepth Camera with multi-layer anti-reflective cyan/blue optical glint */}
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0E0E14] border border-white/15 relative flex items-center justify-center shadow-inner">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0095FF]/70 shadow-[0_0_2px_#0095FF]" />
                        <div className="w-0.5 h-0.5 rounded-full bg-white/90 absolute top-0.5 right-0.5" />
                      </div>
                      
                      {/* Face ID Flood Illuminator / Proximity Sensor */}
                      <div className="w-1.5 h-1.5 rounded-full bg-[#16161E] border border-white/5" />
                    </div>

                    {/* Subtle Live Activity Indicator / Privacy Mic dot */}
                    <div className="flex items-center gap-1 pr-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_4px_rgba(52,211,153,0.8)] animate-pulse" />
                      <div className="w-1 h-2 rounded-full bg-[#0095FF]/60 flex items-center justify-center">
                        <div className="w-0.5 h-1 bg-[#0095FF] rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Cellular 5G Signal, WiFi, Battery Pill */}
                  <div className="flex items-center gap-1.5 w-14 justify-end pr-1">
                    {/* 5G Signal Bars */}
                    <svg className="w-3.5 h-2.5 text-white" viewBox="0 0 17 12" fill="currentColor">
                      <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                      <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.5" />
                      <rect x="9" y="3" width="2.5" height="9" rx="0.5" />
                      <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
                    </svg>

                    {/* WiFi Icon */}
                    <Wifi className="w-3 h-3 text-white" />

                    {/* Pro Battery Pill with Level */}
                    <div className="flex items-center gap-0.5">
                      <div className="w-[21px] h-[10.5px] rounded-[4px] border border-neutral-300 p-[1.5px] flex items-center relative">
                        <div className="h-full w-[90%] bg-emerald-400 rounded-[1.5px]" />
                        <div className="w-[1.5px] h-1.5 bg-neutral-300 rounded-r-[1px] absolute -right-[2.5px] top-[1.5px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===================================================== */}
                {/* 7. APP TOP BAR: WALLET ADDRESS & NETWORK BADGE       */}
                {/* ===================================================== */}
                <div className="px-3.5 pt-1.5 pb-2 flex items-center justify-between shrink-0 z-20">
                  {/* Wallet Address Interactive Card */}
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#141419]/90 border border-white/10 shadow-md shadow-black/40 hover:bg-[#1A1A22] active:scale-95 transition-all cursor-pointer"
                    title="Click to copy wallet address"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                    <span className="text-xs font-mono font-medium text-neutral-200">
                      {copied ? 'Copied!' : walletAddress}
                    </span>
                    <div className="text-neutral-400 p-0.5 ml-0.5">
                      <Copy className="w-3 h-3" />
                    </div>
                  </button>

                  {/* Network Indicator & Notification Bell */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-[#141419]/90 border border-white/10 shadow-md shadow-black/40">
                      <BaseIcon className="w-3.5 h-3.5 text-[#0095FF]" />
                      <span className="text-[11px] font-medium text-neutral-200">Base</span>
                    </div>

                    <div className="p-2 rounded-2xl bg-[#141419]/90 border border-white/10 shadow-md shadow-black/40 relative">
                      <Bell className="w-3.5 h-3.5 text-neutral-300" />
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#0095FF] rounded-full shadow-[0_0_4px_#0095FF]" />
                    </div>
                  </div>
                </div>

                {/* ===================================================== */}
                {/* 8. MAIN CONTENT SCROLL AREA                          */}
                {/* ===================================================== */}
                <div className="px-3.5 flex-1 overflow-y-auto space-y-3 pb-24 scrollbar-none z-10">
                  
                  {/* Hybit Electric Blue Balance Card */}
                  <div className="relative rounded-3xl bg-gradient-to-br from-[#0095FF] via-[#0082E6] to-[#006ACC] p-4 text-white shadow-xl shadow-black/50 border border-white/20 overflow-hidden shrink-0">
                    {/* Hybit Brand Mark Watermark */}
                    <div 
                      className="absolute -right-6 -bottom-6 w-32 h-32 pointer-events-none select-none opacity-[0.16] text-white transform -rotate-12"
                      aria-hidden="true"
                    >
                      <HybitMark size="100%" className="w-full h-full" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between text-xs text-white/90 mb-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <span className="font-chinese text-base sm:text-lg text-white font-normal select-none">Hybit</span>
                          <span className="text-white/70">~</span>
                          <span className="text-white/90 font-medium">Balance</span>
                        </div>
                        
                        <div className="p-1 rounded-full bg-white/15">
                          <Eye className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      <div className="my-1.5">
                        <div className="text-3xl font-extrabold tracking-tight font-mono text-white">
                          $42,918.24
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 pt-0.5">
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/95 font-mono">
                          <TrendingUp className="w-3 h-3 text-white" />
                          <span>+$1,142.30 (+8.4%) Today</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Five Quick Action Buttons */}
                  <div className="grid grid-cols-5 gap-1.5 pt-0.5 shrink-0">
                    {[
                      { id: 'send', label: 'Send', icon: Send },
                      { id: 'receive', label: 'Receive', icon: Download },
                      { id: 'swap', label: 'Swap', icon: Repeat },
                      { id: 'buy', label: 'Buy', icon: CreditCard },
                      { id: 'bridge', label: 'Bridge', icon: Layers },
                    ].map((action) => {
                      const Icon = action.icon;
                      return (
                        <div
                          key={action.id}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-[#141419] border border-white/10 flex items-center justify-center shadow-md shadow-black/40 hover:border-white/25 active:scale-95 transition-all">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-medium text-neutral-300">
                            {action.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Portfolio Assets Section */}
                  <div className="pt-1 shrink-0">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-tight">Portfolio Assets</h3>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          Assets held directly in your self-custody vault
                        </p>
                      </div>

                      <div className="text-[11px] font-semibold text-[#0095FF] flex items-center gap-0.5 hover:underline cursor-pointer">
                        <span>View All</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Asset List Rows */}
                    <div className="divide-y divide-white/[0.05]">
                      {assets.map((asset) => (
                        <div
                          key={asset.id}
                          className="flex items-center justify-between py-2.5 px-1 rounded-xl hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                              {asset.icon}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">
                                {asset.symbol}
                              </div>
                              <div className="text-[10px] text-neutral-400 font-mono">
                                {asset.name} · {asset.chain}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-bold text-white font-mono">
                              {asset.val}
                            </div>
                            <div className="text-[10px] font-mono flex items-center justify-end gap-1">
                              <span className="text-neutral-400">{asset.amount}</span>
                              <span className={`font-semibold ${asset.isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {asset.change}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* ===================================================== */}
                {/* 9. CAPSULE BOTTOM FLOATING BAR & HOME INDICATOR      */}
                {/* ===================================================== */}
                <div className="absolute bottom-2 left-3 right-3 z-30 flex flex-col items-center gap-1.5 pointer-events-auto">
                  {/* Floating Capsule Bar */}
                  <div className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-full bg-[#141419]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/90">
                    
                    {/* Item 1: Dashboard (Active Illuminated Lens) */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center relative cursor-pointer"
                      aria-label="Dashboard"
                    >
                      <div className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20 shadow-inner" />
                      <LayoutDashboard className="w-4 h-4 relative z-10 text-[#0095FF]" />
                    </div>

                    {/* Item 2: Portfolio */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer transition-colors"
                      aria-label="Portfolio"
                    >
                      <PieChart className="w-4 h-4" />
                    </div>

                    {/* Item 3: Center Elevated Floating SWAP Button */}
                    <div className="relative -translate-y-2 shrink-0">
                      <div
                        className="w-10 h-10 rounded-2xl bg-[#0095FF] hover:bg-[#0080E0] text-white shadow-lg shadow-black/60 border border-white/20 flex flex-col items-center justify-center p-0.5 cursor-pointer active:scale-95 transition-all"
                        aria-label="Swap"
                      >
                        <Repeat className="w-4 h-4 text-white" />
                        <span className="text-[7px] font-bold uppercase tracking-wider text-white font-mono">
                          SWAP
                        </span>
                      </div>
                    </div>

                    {/* Item 4: Activity / History */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer transition-colors"
                      aria-label="Activity"
                    >
                      <History className="w-4 h-4" />
                    </div>

                    {/* Item 5: Settings */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer transition-colors"
                      aria-label="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </div>

                  </div>

                  {/* Apple iOS Home Bar Indicator (Signature Pro Max detail) */}
                  <div className="w-32 h-[3.5px] bg-white/40 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* iPhone 17 Pro Max 3D Model Spec Indicator Badge (Clean unboxed metadata) */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-medium text-neutral-400 tracking-wide select-none">
        <span className="text-neutral-200">iPhone 17 Pro Max</span>
        <span className="text-neutral-600">·</span>
        <span>Grade 5 Titanium</span>
        <span className="text-neutral-600">·</span>
        <span>6.9″ Super Retina XDR</span>
      </div>
    </div>
  );
};
