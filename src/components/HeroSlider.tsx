import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Eye, Calendar, Clock, Star } from 'lucide-react';
import { DramaReview } from '../types';

interface HeroSliderProps {
  reviews: DramaReview[];
  onSelectReview: (review: DramaReview) => void;
}

export default function HeroSlider({ reviews, onSelectReview }: HeroSliderProps) {
  // Use all featured reviews, fallback to first 3 if none
  const featuredReviews = reviews.filter(r => r.isFeatured) || reviews.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredReviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredReviews.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(interval);
  }, [featuredReviews.length]);

  if (featuredReviews.length === 0) return null;

  const current = featuredReviews[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl glass mb-8 border border-white/5">
      {/* Slide Container */}
      <div className="relative min-h-[440px] md:min-h-[480px] lg:min-h-[520px] w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left text block with gradient background on mobile */}
        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-14 flex flex-col justify-center z-10 text-left">
          <div className="flex items-center space-x-2.5 mb-4">
            <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase">
              RECOMMENDED REVIEW
            </span>
            <span className="flex items-center rating-tag px-2.5 py-1 rounded-full text-xs font-semibold gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-400" />
              {current.myScore} / 10 RATING
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 leading-tight tracking-tight mb-4 select-none">
            {current.title}
            <span className="block text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent font-sans mt-2">
              {current.originalTitle}
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl mb-6">
            {current.summary}
          </p>

          <div className="flex items-center space-x-4 mb-8 text-xs text-slate-400 font-medium font-sans">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {current.releaseYear}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {current.episodes}
            </span>
            <span>•</span>
            <span className="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold">
              {current.category}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onSelectReview(current)}
              className="flex items-center space-x-2 accent-gradient hover:opacity-90 text-white font-extrabold text-sm md:text-base px-6 py-3 rounded-full shadow-lg shadow-indigo-500/10 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Play className="w-4.5 h-4.5 fill-current" />
              <span>Read Review Now</span>
            </button>
            <button
              onClick={() => onSelectReview(current)}
              className="px-5 py-3 border border-white/10 text-slate-200 hover:bg-white/5 rounded-full font-bold text-sm md:text-base transition cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>

        {/* Right image block with soft sleek masking */}
        <div className="w-full md:w-1/2 h-64 md:h-[480px] lg:h-[520px] relative shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-transparent to-transparent z-10 hidden md:block" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 md:from-transparent to-transparent h-16 z-10" />
          <img
            src={current.bannerImage || current.coverImage}
            alt={current.title}
            className="w-full h-full object-cover select-none md:rounded-r-3xl"
          />
          {/* Subtle floating heart ornaments matching CuteDrama image */}
          <div className="absolute top-6 right-8 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-indigo-300 font-bold flex items-center space-x-1 shadow-md shrink-0 select-none">
            <span>Episode {current.episodes.split(' ')[0]} Recapped</span>
            <HeartFlame />
          </div>
        </div>
      </div>

      {/* Navigation Arrow buttons */}
      {featuredReviews.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-indigo-500 text-white p-2 rounded-full shadow-md border border-white/5 z-20 text-slate-300 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-indigo-500 text-white p-2 rounded-full shadow-md border border-white/5 z-20 text-slate-300 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Index Dot Indicators */}
      {featuredReviews.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {featuredReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-indigo-400 w-6' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HeartFlame() {
  return (
    <svg
      className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline animate-pulse"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
