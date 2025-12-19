import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Zap, ChevronRight, Shield, Globe } from 'lucide-react';

export default function Home() {
  return (
    // MAIN CONTAINER: Midnight Blue Background
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-[#6366f1] selection:text-white">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          
          {/* Logo (Left) */}
          <div className="text-2xl font-bold tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity">
            CREEL<span className="text-[#6366f1]">.LIVE</span>
          </div>

          {/* Navigation Links (Dead Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-[#6366f1] transition-colors">Home</Link>
            <Link href="/products" className="hover:text-[#6366f1] transition-colors">Products</Link>
            <Link href="/status" className="hover:text-[#6366f1] transition-colors">Status</Link>
            <a href="https://discord.gg/valacc" target="_blank" className="hover:text-[#6366f1] transition-colors">Support</a>
          </div>

          {/* Cart Button (Right) */}
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative group">
            <ShoppingCart className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#6366f1] rounded-full shadow-[0_0_10px_#6366f1]"></span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6366f1] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 text-[#6366f1] text-xs font-bold mb-8 tracking-wide uppercase">
          <Zap className="w-3 h-3 mr-2" /> Instant Delivery
        </div>

        {/* Main Title */}
        <h1 className="relative z-10 text-5xl md:text-8xl font-extrabold text-white mb-8 tracking-tight leading-tight">
          Unfair <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-cyan-400">
            Advantage
          </span>
        </h1>

        {/* Subtitle */}
        <p className="relative z-10 text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Premium external enhancements for competitive gaming. <br/>
          Secure. Undetected. Reliable.
        </p>

        {/* Call to Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/products">
            <button className="px-8 py-4 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_#6366f1] hover:shadow-[0_0_30px_-5px_#6366f1] flex items-center justify-center w-full sm:w-auto">
              View Products <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </Link>
          
          <a href="https://discord.gg/valacc" target="_blank">
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 hover:border-white/20 w-full sm:w-auto">
              Join Discord
            </button>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500 text-sm font-medium">
          <div className="flex items-center justify-center gap-2 hover:text-slate-300 transition-colors cursor-default">
            <Shield className="w-5 h-5 text-[#6366f1]" /> 100% Undetected Status
          </div>
          <div className="flex items-center justify-center gap-2 hover:text-slate-300 transition-colors cursor-default">
            <Zap className="w-5 h-5 text-[#6366f1]" /> Instant Key Delivery
          </div>
          <div className="flex items-center justify-center gap-2 hover:text-slate-300 transition-colors cursor-default">
            <Globe className="w-5 h-5 text-[#6366f1]" /> 24/7 Global Support
          </div>
        </div>

      </main>
    </div>
  );
}