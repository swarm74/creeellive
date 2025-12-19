'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Activity, Server, Shield } from 'lucide-react';

export default function Status() {
  // Default State
  const [statuses, setStatuses] = useState({
    valorant: "Loading...",
    fortnite: "Loading...",
    rust: "Loading...",
    spoofer: "Loading..."
  });

  // Fetch status from API on load
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status', { cache: 'no-store' });
        const data = await res.json();
        setStatuses(data);
      } catch (error) {
        console.error("Failed to fetch status");
      }
    };

    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const systems = [
    { id: 1, key: "valorant", name: "Valorant External", uptime: "99.9%" },
    { id: 2, key: "fortnite", name: "Fortnite External", uptime: "99.9%" },
    { id: 3, key: "rust", name: "Rust External", uptime: "99.9%" },
    { id: 4, key: "spoofer", name: "HWID Spoofer", uptime: "100%" }
  ];

  // Helper to choose color based on status text
  const getStatusColor = (statusText: string) => {
    const s = statusText.toLowerCase();
    if (s.includes("undetected") || s.includes("working")) return "text-green-400 border-green-500/20 bg-green-500/10";
    if (s.includes("detected") || s.includes("down")) return "text-red-400 border-red-500/20 bg-red-500/10";
    if (s.includes("update") || s.includes("maintenance")) return "text-yellow-400 border-yellow-500/20 bg-yellow-500/10";
    return "text-slate-400 border-slate-500/20 bg-slate-500/10";
  };

  const getIndicatorColor = (statusText: string) => {
    const s = statusText.toLowerCase();
    if (s.includes("undetected")) return "bg-green-500";
    if (s.includes("detected")) return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-[#6366f1] selection:text-white pb-20">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <div className="text-2xl font-bold tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity">
            CREEL<span className="text-[#6366f1]">.LIVE</span>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-[#6366f1] transition-colors">Home</Link>
            <Link href="/products" className="hover:text-[#6366f1] transition-colors">Products</Link>
            <Link href="/status" className="text-white font-semibold">Status</Link>
            <a href="https://discord.gg/valacc" target="_blank" className="hover:text-[#6366f1] transition-colors">Support</a>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative group">
            <ShoppingCart className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#6366f1] rounded-full shadow-[0_0_10px_#6366f1]"></span>
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <header className="pt-40 pb-16 px-6 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-bold mb-8 tracking-wide">
          <Activity className="w-4 h-4 mr-2" /> Live Status
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          System <span className="text-[#6366f1]">Status</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Real-time status updates for all Creel products.
        </p>
      </header>

      {/* STATUS GRID */}
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {systems.map((system) => {
          // Get the current status for this specific game
          const currentStatus = statuses[system.key as keyof typeof statuses] || "Loading...";
          
          return (
            <div key={system.id} className="bg-[#1e293b]/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between hover:border-[#6366f1]/30 transition-all group">
              
              <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                <div className="p-3 bg-[#0f172a] rounded-xl border border-white/5 group-hover:border-[#6366f1]/50 transition-colors">
                  <Server className="w-6 h-6 text-[#6366f1]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{system.name}</h3>
                  <span className="text-xs text-slate-500">Live API Check</span>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right hidden md:block">
                  <div className="text-xs text-slate-500 mb-1">Uptime</div>
                  <div className="text-sm font-bold text-white">{system.uptime}</div>
                </div>
                
                <div className={`flex items-center px-4 py-2 border rounded-full ${getStatusColor(currentStatus)}`}>
                  <div className="relative w-2 h-2 mr-3">
                      <div className={`absolute w-full h-full rounded-full animate-ping opacity-75 ${getIndicatorColor(currentStatus)}`}></div>
                      <div className={`relative w-full h-full rounded-full ${getIndicatorColor(currentStatus)}`}></div>
                  </div>
                  <span className="text-sm font-bold capitalize">{currentStatus}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}