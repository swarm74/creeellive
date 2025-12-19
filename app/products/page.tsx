'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Check, X, Zap, Shield, ExternalLink, MessageCircle } from 'lucide-react';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // 1. LIVE STATUS STATE (Default to Undetected while loading)
  const [statuses, setStatuses] = useState<any>({
    valorant: "Undetected",
    fortnite: "Undetected",
    rust: "Undetected"
  });

  // 2. FETCH REAL STATUS FROM API
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status', { cache: 'no-store' });
        const data = await res.json();
        if (data) setStatuses((prev: any) => ({ ...prev, ...data }));
      } catch (error) {
        console.error("Failed to load status");
      }
    };
    fetchStatus();
  }, []);

  // 3. HELPER FOR BADGE COLORS
  const getStatusStyle = (statusText: string) => {
    const s = (statusText || "undetected").toLowerCase();
    if (s.includes("undetected")) return 'text-green-400 border-green-400/20 bg-green-400/10';
    if (s.includes("detected")) return 'text-red-400 border-red-400/20 bg-red-400/10';
    return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10'; // Updating/Maintenance
  };

  // =========================================================================
  // DYNAMIC SCRIPT LOADER (For Sell.App)
  // =========================================================================
  useEffect(() => {
    if (selectedProduct) {
      const oldScript = document.querySelector('script[src="https://cdn.sell.app/embed/script.js"]');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.src = "https://cdn.sell.app/embed/script.js";
      script.type = "module";
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) document.body.removeChild(script);
      };
    }
  }, [selectedProduct]);

  // =========================================================================
  // PRODUCT CONFIGURATION
  // =========================================================================
  const products = [
    {
      id: 1,
      game: "VALORANT",
      key: "valorant", // LINKS TO API STATUS
      title: "Valorant External",
      features: ["Aimbot", "ESP", "MISC"],
      prices: { day: "$8.99", week: "$34.99", month: "$69.99", life: "$249.99" },
      storeId: "70364", 
      ids: { day: "340959", week: "340965", month: "340967", life: "" }
    },
    {
      id: 2,
      game: "FORTNITE",
      key: "fortnite", // LINKS TO API STATUS
      title: "Fortnite External",
      features: ["Aimbot", "ESP", "NISC"],
      prices: { day: "$7.99", week: "$27.99", month: "$54.99", life: "$200.00" },
      storeId: "70364", 
      ids: { day: "340960", week: "340964", month: "340966", life: "" }
    },
    {
      id: 3,
      game: "RUST",
      key: "rust", // LINKS TO API STATUS
      title: "Rust External",
      features: ["Aimbot/Silent", "ESP", "Recoil/Troll"],
      prices: { day: "$8.99", week: "$24.99", month: "$59.99", life: "$199.99" },
      storeId: "70364", 
      ids: { day: "340968", week: "340969", month: "340970", life: "" }
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-[#6366f1] selection:text-white pb-20 relative">
      
      <link href="https://cdn.sell.app/embed/style.css" rel="stylesheet"/>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <div className="text-2xl font-bold tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity">
            CREEL<span className="text-[#6366f1]">.LIVE</span>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex space-x-8 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-[#6366f1] transition-colors">Home</Link>
            <Link href="/products" className="text-white font-semibold">Products</Link>
            <Link href="/status" className="hover:text-[#6366f1] transition-colors">Status</Link>
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
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Choose Your <span className="text-[#6366f1]">Weapon</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Select a game below to view pricing plans. Instant delivery via Sell.app.
        </p>
      </header>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {products.map((product) => {
          // GET CURRENT STATUS
          const currentStatus = statuses[product.key] || "Undetected";

          return (
            <div key={product.id} className="bg-[#1e293b]/50 rounded-3xl p-1 border border-white/5 hover:border-[#6366f1]/50 transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-[#0f172a] rounded-[22px] p-6 h-full flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold text-[#6366f1] tracking-wider bg-[#6366f1]/10 px-3 py-1 rounded-full">
                    {product.game}
                  </span>
                  {/* DYNAMIC STATUS BADGE */}
                  <div className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(currentStatus)}`}>
                    {currentStatus}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{product.title}</h3>
                <ul className="space-y-3 mb-8 flex-1">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-400">
                      <Check className="w-4 h-4 text-[#6366f1] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full py-4 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#6366f1]/20"
                >
                  View Options
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PRICING MODAL (Pop-up) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-white/10 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl shadow-black/50 scale-100 animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.title}</h2>
            <p className="text-slate-400 mb-8 text-sm">Select a plan to purchase securely.</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "1 Day", price: selectedProduct.prices.day, id: selectedProduct.ids.day },
                { label: "1 Week", price: selectedProduct.prices.week, id: selectedProduct.ids.week },
                { label: "1 Month", price: selectedProduct.prices.month, id: selectedProduct.ids.month },
                { label: "Lifetime", price: selectedProduct.prices.life, id: selectedProduct.ids.life },
              ].map((tier, idx) => {
                
                if (tier.label === "Lifetime") {
                  return (
                    <a
                      key={idx}
                      href="https://discord.gg/valacc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#6366f1]/10 border border-[#6366f1]/30 hover:bg-[#6366f1]/20 hover:border-[#6366f1] transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#6366f1] text-sm font-bold group-hover:text-white transition-colors">{tier.label}</span>
                        <MessageCircle className="w-3 h-3 text-[#6366f1] group-hover:text-white" />
                      </div>
                      <span className="text-xl font-bold text-white">{tier.price}</span>
                    </a>
                  );
                }

                return tier.id ? (
                  <button
                    key={idx}
                    data-sell-store={selectedProduct.storeId}
                    data-sell-product={tier.id}
                    data-sell-darkmode="true"
                    data-sell-theme=""
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#1e293b] border border-white/5 hover:border-[#6366f1] hover:bg-[#1e293b]/80 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-400 text-sm font-medium group-hover:text-[#6366f1] transition-colors">{tier.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-[#6366f1]" />
                    </div>
                    <span className="text-xl font-bold text-white">{tier.price}</span>
                  </button>
                ) : (
                  <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#1e293b]/30 border border-white/5 opacity-50 cursor-not-allowed">
                     <span className="text-slate-500 text-sm font-medium">{tier.label}</span>
                     <span className="text-lg font-bold text-slate-500">N/A</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center text-xs text-slate-500 gap-4">
               <span className="flex items-center"><Shield className="w-3 h-3 mr-1" /> Secure Payment</span>
               <span className="flex items-center"><Zap className="w-3 h-3 mr-1" /> Instant Delivery</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}