import React, { useState } from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube, Send, Check } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  setCurrentCategory: (category: Category) => void;
  onHomeClick: () => void;
}

export default function Footer({ setCurrentCategory, onHomeClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-white/5 text-left pt-14 text-sans relative overflow-hidden">
      {/* Decorative top pink line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
        {/* Column 1: Info and logo */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onHomeClick}>
            <div className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition">
                CuteDrama
              </span>
              <p className="text-[8px] font-bold text-indigo-450 tracking-wider uppercase -mt-0.5 select-none">
                DRAMA REVIEWS &amp; UPDATES ♥
              </p>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            Your ultimate destination for honest, in-depth Asian drama reviews, detailed episode recaps, and cute lifestyle updates. Explore stories that stay in your memory forever!
          </p>

          <div className="flex items-center space-x-3 text-slate-400 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/5 bg-slate-900 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition shadow-sm"><Facebook className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/5 bg-slate-900 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition shadow-sm"><Twitter className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/5 bg-slate-900 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition shadow-sm"><Instagram className="w-4 h-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/5 bg-slate-900 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition shadow-sm"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-black text-slate-100 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-2.5">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
            <li>
              <button onClick={onHomeClick} className="hover:text-indigo-400 transition cursor-pointer text-left">
                Home (Feed Hub)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentCategory('Korean')} className="hover:text-indigo-400 transition cursor-pointer text-left">
                Korean Drama Reviews
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentCategory('Chinese')} className="hover:text-indigo-400 transition cursor-pointer text-left">
                Chinese Drama Reviews
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentCategory('Japanese')} className="hover:text-indigo-400 transition cursor-pointer text-left">
                Japanese Drama Reviews
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentCategory('Movies')} className="hover:text-indigo-400 transition cursor-pointer text-left">
                Movies &amp; Film Analysis
              </button>
            </li>
            <li className="hover:text-indigo-400 cursor-pointer transition">DMCA / Infringement Notices</li>
          </ul>
        </div>

        {/* Column 3: Information */}
        <div>
          <h4 className="text-sm font-black text-slate-100 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-2.5">
            Information
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-semibold font-sans">
            <li className="hover:text-indigo-400 cursor-pointer transition">About Our Critic Team</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">Contact us / Business Inquiries</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">Privacy Policy & Cookies</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">Terms of Use Agreement</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">Content Editorial Guidelines</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">Affiliate Disclosure Statement</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-3.5">
          <h4 className="text-sm font-black text-slate-100 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-2.5">
            Newsletter
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to get direct alerts when we post new episode recaps, rating charts, and emotional reviews!
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-1 font-sans">
            {subscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 text-emerald-400 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 animate-bounce">
                <Check className="w-3.5 h-3.5" />
                <span>Safely registered! Thank you!</span>
              </div>
            ) : (
              <div className="flex bg-slate-900 border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 text-xs focus:outline-none text-slate-200 bg-transparent flex-1 placeholder-slate-500"
                  required
                />
                <button
                  type="submit"
                  className="accent-gradient hover:opacity-95 text-white font-extrabold text-xs px-4 py-2 transition shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="w-full bg-slate-950 py-3.5 text-center border-t border-white/5 text-[11px] text-slate-500 font-extrabold font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1 leading-relaxed">
          <span>© 2026 CuteDrama. All Rights Reserved. Designed for drama lovers.</span>
          <span className="flex items-center gap-0.5 justify-center">
            Crafted with passion and cupcakes <Heart className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse inline" /> by Piku Pandey
          </span>
        </div>
      </div>
    </footer>
  );
}
