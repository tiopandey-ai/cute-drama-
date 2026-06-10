import React from 'react';
import { Calendar, Eye, Heart, Flame, MessageSquare, ChevronRight, CornerDownRight, Play, Trash2, Edit3, Send, Instagram, Youtube, UserCheck } from 'lucide-react';
import { DramaReview, Category } from '../types';

interface ArticleListProps {
  reviews: DramaReview[];
  onSelectReview: (review: DramaReview) => void;
  currentCategory: Category;
  setCurrentCategory: (category: Category) => void;
  searchQuery: string;
  isStudioActive: boolean;
  onEditReview?: (review: DramaReview) => void;
  onDeleteReview?: (id: string) => void;
}

export default function ArticleList({
  reviews,
  onSelectReview,
  currentCategory,
  setCurrentCategory,
  searchQuery,
  isStudioActive,
  onEditReview,
  onDeleteReview
}: ArticleListProps) {
  
  // 1. Filter implementation based on Category Tab and Search Query
  const filteredReviews = reviews.filter((review) => {
    const matchesCategory = currentCategory === 'All' || review.category === currentCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.originalTitle && review.originalTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      review.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Calculate top popular reviews by mock views
  const popularReviews = [...reviews]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const filterTabs: Category[] = ['All', 'Korean', 'Chinese', 'Japanese', 'Movies'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT 2 COLUMNS: Latest Updates & Reviews */}
      <div className="lg:col-span-2 text-left">
        {/* Section Header & Sub-Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-6 accent-gradient rounded-full inline-block" />
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-50 tracking-tight">
              {searchQuery ? `Search Results: "${searchQuery}"` : 'Latest Updates & Reviews'}
            </h2>
          </div>

          {/* Quick Subcategory Filters pill row */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/5 self-start shrink-0">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentCategory(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                  currentCategory === tab
                    ? 'accent-gradient text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List of articles */}
        {filteredReviews.length === 0 ? (
          <div className="bg-slate-900/40 border border-dashed border-slate-800 p-12 rounded-3xl text-center">
            <p className="text-slate-400 font-medium font-sans">No reviews found matching that criteria.</p>
            {isStudioActive ? (
              <p className="text-indigo-400 font-extrabold text-sm mt-2 cursor-pointer">
                Be the first to write a review inside the Creator Studio!
              </p>
            ) : null}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => {
              const mainEpCode = review.episodes ? review.episodes.split(' ')[0] : '16';
              return (
                <div
                  key={review.id}
                  className="bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden shadow-sm hover:border-indigo-500/30 hover:shadow-indigo-500/5 transition duration-300 grid grid-cols-1 md:grid-cols-12 group cursor-pointer relative"
                  onClick={() => onSelectReview(review)}
                >
                  {/* Creator Quick Actions Overlays inside Studio Mode */}
                  {isStudioActive && onEditReview && onDeleteReview && (
                    <div className="absolute top-2.5 right-2.5 z-25 flex items-center space-x-1.5 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-lg border border-white/10 shadow-lg" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onEditReview(review)}
                        className="p-1 px-2.5 bg-amber-500/10 border border-amber-500/20 rounded text-amber-400 hover:bg-amber-500 hover:text-slate-900 text-xs font-bold flex items-center gap-1 transition"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => onDeleteReview(review.id)}
                        className="p-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded hover:bg-rose-500 hover:text-white transition animate-pulse"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Left Column Image layout */}
                  <div className="md:col-span-4 relative aspect-[16/10] md:aspect-auto w-full bg-slate-800 md:min-h-[170px]">
                    <img
                      src={review.coverImage}
                      alt={review.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider select-none">
                      NEW
                    </div>
                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold rounded px-1.5 py-0.5 select-none font-mono tracking-tight border border-white/5">
                      EP {mainEpCode}
                    </div>
                  </div>

                  {/* Right Column details layout */}
                  <div className="md:col-span-8 p-5 flex flex-col justify-between">
                    <div>
                      {/* Meta Date & Categories Row */}
                      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-1.5 font-sans">
                        <span>{review.publishedAt}</span>
                        <span>•</span>
                        <span className="text-indigo-400 font-extrabold uppercase">
                          {review.category} Drama
                        </span>
                      </div>

                      {/* Heading */}
                      <h3 className="text-lg font-extrabold text-slate-100 group-hover:text-indigo-400 transition leading-snug">
                        {review.title} Episode {mainEpCode} English Sub Recap &amp; Review
                      </h3>

                      {/* Summary */}
                      <p className="text-xs md:text-sm text-slate-300 font-normal leading-relaxed mt-2 line-clamp-2 md:line-clamp-3">
                        {review.summary}
                      </p>
                    </div>

                    {/* Bottom stats and action line */}
                    <div className="flex items-center justify-between mt-4 md:mt-0 pt-3 border-t border-white/5">
                      <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 font-sans">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          {review.views.toLocaleString()}
                        </span>
                        <span className="flex items-center rating-tag px-1.5 py-0.5 rounded text-emerald-400 text-[11px] font-bold">
                          <Heart className="w-3 h-3 fill-emerald-500 text-emerald-400" />
                          {review.myScore} / 10
                        </span>
                        {review.comments.length > 0 && (
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                            {review.comments.length}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-extrabold text-indigo-400 group-hover:text-white flex items-center gap-0.5 bg-indigo-500/10 px-3 py-1.5 rounded-full transition group-hover:translate-x-1 border border-indigo-500/10 group-hover:bg-indigo-500">
                        Read Review
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Sidebar (Popular, Join Community, About Author) */}
      <div className="space-y-8 text-left font-sans">
        
        {/* 1. About Chief Editor Widget */}
        <div className="glass rounded-3xl border border-white/5 p-5 shadow-sm relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-3xl opacity-60" />
          <div className="flex items-center space-x-3 mb-3.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
                alt="Piku Pandey"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-indigo-500 to-pink-500 text-white p-0.5 rounded-full border border-slate-900 shadow">
                <UserCheck className="w-2.5 h-2.5" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-100">Piku Pandey</h3>
              <p className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">Chief Drama Critic</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Welcome to my Asian drama paradise! I write honest, exhaustive recap articles and reviews covering Korean, Chinese, and Japanese series. Grab some snacks and enjoy! ♥
          </p>
          {isStudioActive && (
            <div className="bg-emerald-500/10 border border-emerald-500/10 p-2 rounded-lg mt-3 text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Studio Mode: You are logged in!</span>
            </div>
          )}
        </div>

        {/* 2. Popular This Week widget */}
        <div className="glass rounded-3xl border border-white/5 p-5 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3.5 mb-4">
            <Flame className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
            <h3 className="text-md font-extrabold text-slate-100">Popular This Week</h3>
          </div>

          <div className="space-y-4">
            {popularReviews.map((review, idx) => {
              const num = idx + 1;
              return (
                <div
                  key={review.id}
                  onClick={() => onSelectReview(review)}
                  className="flex items-center space-x-3.5 cursor-pointer group"
                >
                  {/* Circle number */}
                  <div className="text-sm font-black text-slate-500 w-5 text-center group-hover:text-indigo-400 transition">
                    {num.toString().padStart(2, '0')}
                  </div>
                  
                  {/* Thumbnail */}
                  <img
                    src={review.coverImage}
                    alt={review.title}
                    className="w-11 h-11 rounded-lg cover object-cover shrink-0 border border-white/10 group-hover:scale-105 transition"
                  />

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-xs text-slate-200 group-hover:text-indigo-300 transition truncate leading-relaxed">
                      {review.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold">
                      {review.category} Drama • <span className="text-emerald-400 font-extrabold">★ {review.myScore}</span>
                    </p>
                  </div>

                  {/* Traffic count */}
                  <div className="shrink-0 text-[10px] text-slate-500 font-mono tracking-tight text-right flex items-center gap-0.5">
                    <Flame className="w-3 h-3 text-indigo-400" />
                    <span>{(review.views / 2.1).toFixed(0)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Join Our Community Socials widget */}
        <div className="glass rounded-3xl border border-white/5 p-5 shadow-sm">
          <h3 className="text-md font-extrabold text-slate-100 mb-1">Join Our Community</h3>
          <p className="text-[11px] text-slate-400 font-medium mb-4">Stay updated with latest dramas and series recaps!</p>
          
          <div className="space-y-3 font-semibold text-xs text-white">
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-sky-600/20 text-sky-400 border border-sky-500/20 hover:bg-sky-500 hover:text-white rounded-2xl transition cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Send className="w-4 h-4 fill-current transform rotate-[-25deg]" />
                <span className="font-extrabold tracking-wide">Join Telegram</span>
              </div>
              <span className="bg-sky-500/15 text-sky-400 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-sky-500/10">Free</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white rounded-2xl transition cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Instagram className="w-4 h-4" />
                <span className="font-extrabold tracking-wide">Follow Instagram</span>
              </div>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-indigo-500/10">Follows</span>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-red-650/10 text-red-400 border border-red-500/20 hover:bg-red-650 hover:text-white rounded-2xl transition cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Youtube className="w-4 h-4" />
                <span className="font-extrabold tracking-wide">Subscribe YouTube</span>
              </div>
              <span className="bg-red-500/20 text-red-400 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-red-500/10">Watch</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
