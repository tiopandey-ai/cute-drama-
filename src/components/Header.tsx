import React, { useState } from 'react';
import { Heart, Search, Menu, X, PenTool, Flame, Facebook, Twitter, Instagram, Youtube, HelpCircle } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category;
  setCurrentCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenStudio: () => void;
  onHomeClick: () => void;
  isStudioOpen: boolean;
}

export default function Header({
  currentCategory,
  setCurrentCategory,
  searchQuery,
  setSearchQuery,
  onOpenStudio,
  onHomeClick,
  isStudioOpen
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const categoriesList: { name: string; value: Category }[] = [
    { name: 'KOREAN DRAMA', value: 'Korean' },
    { name: 'CHINESE DRAMA', value: 'Chinese' },
    { name: 'JAPANESE DRAMA', value: 'Japanese' },
    { name: 'MOVIES', value: 'Movies' },
  ];

  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 transition-all duration-300">
      {/* Top Ticker and Info Bar */}
      <div className="w-full bg-slate-900/60 border-b border-white/5 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1 shrink-0 animate-pulse uppercase tracking-wider">
              <Flame className="w-3 h-3 text-emerald-400 fill-emerald-500/20" /> Trending
            </span>
            <span className="truncate font-medium text-slate-300">
              Lovely Runner Episode 10 Special Recap & Complete Final Thoughts Posted!
            </span>
          </div>
          
          <div className="flex items-center space-x-6 shrink-0">
            <span className="hover:text-indigo-400 cursor-pointer transition">About</span>
            <span className="hover:text-indigo-400 cursor-pointer transition">Contact</span>
            <span className="hover:text-indigo-400 cursor-pointer transition">Privacy Policy</span>
            <span className="text-white/10">|</span>
            <div className="flex items-center space-x-3 text-slate-500">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          id="logo-button"
          onClick={onHomeClick}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center shadow-lg cursor-pointer transform group-hover:scale-105 transition-all">
            <Heart className="w-5.5 h-5.5 text-white fill-white/20" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CuteDrama
              </span>
            </div>
            <span className="text-[9px] font-bold text-indigo-400 tracking-wider uppercase -mt-1 select-none">
              DRAMA REVIEWS &amp; UPDATES ♥
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans">
          <button
            id="nav-home"
            onClick={onHomeClick}
            className={`text-xs font-bold tracking-widest transition-all uppercase py-1 border-b-2 ${
              currentCategory === 'All' && !isStudioOpen
                ? 'text-indigo-400 border-indigo-400 font-extrabold'
                : 'text-slate-400 hover:text-slate-100 border-transparent hover:border-slate-700'
            }`}
          >
            HOME
          </button>
          
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              id={`nav-category-${cat.value.toLowerCase()}`}
              onClick={() => {
                setCurrentCategory(cat.value);
                if (isStudioOpen) onOpenStudio(); // Close studio if we navigate
              }}
              className={`text-xs font-bold tracking-widest transition-all uppercase py-1 border-b-2 ${
                currentCategory === cat.value && !isStudioOpen
                  ? 'text-indigo-400 border-indigo-400 font-extrabold'
                  : 'text-slate-400 hover:text-slate-100 border-transparent hover:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Right Interactions */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Action search bar */}
          <div className="relative flex items-center">
            {showSearch ? (
              <div className="flex items-center mr-1">
                <input
                  type="text"
                  placeholder="Search drama reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 md:w-56 px-4 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white/10 text-slate-100 placeholder-slate-500"
                  autoFocus
                />
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearch(false);
                  }}
                  className="text-slate-500 hover:text-slate-300 ml-1.5 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="search-toggle"
                onClick={() => setShowSearch(true)}
                className="p-2 text-slate-400 hover:text-indigo-400 rounded-full hover:bg-white/5 transition"
                title="Search Articles"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* CREATOR STUDIO BUTTON */}
          <button
            id="studio-button"
            onClick={onOpenStudio}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all shadow-md shrink-0 border ${
              isStudioOpen
                ? 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700'
                : 'accent-gradient text-white border-transparent hover:opacity-90 hover:scale-102 hover:shadow-indigo-500/10'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{isStudioOpen ? 'CLOSE STUDIO' : 'CREATOR STUDIO'}</span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-indigo-400 hover:bg-white/5 rounded-full transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-white/5 p-4 transition-all duration-300 shadow-xl absolute w-full left-0 right-0 z-50">
          <div className="flex flex-col space-y-3 font-semibold pb-4">
            <button
              onClick={() => {
                onHomeClick();
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm ${
                currentCategory === 'All' && !isStudioOpen ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              HOME
            </button>
            
            {categoriesList.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setCurrentCategory(cat.value);
                  setMobileMenuOpen(false);
                  if (isStudioOpen) onOpenStudio();
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-sm uppercase ${
                  currentCategory === cat.value && !isStudioOpen ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}

            <div className="border-t border-white/5 pt-3">
              <button
                onClick={() => {
                  onOpenStudio();
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-center py-2.5 rounded-lg text-sm flex items-center justify-center space-x-2 ${
                  isStudioOpen ? 'bg-slate-800 text-slate-100 border border-slate-700' : 'accent-gradient text-white hover:opacity-90'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>{isStudioOpen ? 'EXIT CREATOR STUDIO' : 'WRITE NEW ARTICLE'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
