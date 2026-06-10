import React from 'react';
import { Flame, Heart, Star, Sparkles } from 'lucide-react';
import { DramaReview } from '../types';

interface TrendingListProps {
  reviews: DramaReview[];
  onSelectReview: (review: DramaReview) => void;
}

export default function TrendingList({ reviews, onSelectReview }: TrendingListProps) {
  // Sort reviews by trendingRank (or check if designated isTrending) and limit to top 6
  const trendingReviews = [...reviews]
    .filter(r => r.isTrending)
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
    .slice(0, 6);

  if (trendingReviews.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Flame className="w-5.5 h-5.5 text-indigo-400 fill-indigo-400/20" />
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-50 tracking-tight">
            Trending Now
          </h2>
        </div>
        <div className="flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer transition">
          <span>View All Trending</span>
          <Sparkles className="w-4 h-4 ml-1" />
        </div>
      </div>

      {/* Grid containing 6 cards to mimic CuteDrama image style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {trendingReviews.map((review, index) => {
          // Serial count
          const rank = review.trendingRank || (index + 1);
          // Episode short code e.g. "EP 12" from "12 Episodes", default to "EP 16"
          const epCount = review.episodes ? review.episodes.split(' ')[0] : '16';

          return (
            <div
              key={review.id}
              onClick={() => onSelectReview(review)}
              className="group cursor-pointer flex flex-col glass rounded-2xl border border-white/5 overflow-hidden shadow-md hover:border-indigo-500/30 hover:shadow-indigo-500/5 hover:-translate-y-1 transition duration-300 relative"
            >
              {/* Image Section */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-800">
                <img
                  src={review.coverImage}
                  alt={review.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                
                {/* Numbered Rank Tag - Left Corner */}
                <div className="absolute top-2.5 left-2.5 w-7 h-7 accent-gradient text-white font-extrabold text-sm rounded-full flex items-center justify-center shadow-md border-2 border-slate-900 select-none">
                  {rank}
                </div>

                {/* Episode Status Tag - Right Corner */}
                <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-[10px] font-extrabold text-indigo-300 px-2 py-0.5 rounded-md select-none tracking-wider font-mono border border-white/5">
                  EP {epCount}
                </div>

                {/* Bottom shading overlay */}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/75 to-transparent pointer-events-none" />
              </div>

              {/* Text / Stats Section */}
              <div className="p-3 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-100 group-hover:text-indigo-300 transition truncate leading-relaxed">
                    {review.title}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                    {review.category} Drama
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 border-t border-white/5 pt-2 text-xs">
                  <div className="flex items-center rating-tag px-1.5 py-0.5 rounded text-[11px] font-bold gap-1">
                    <Heart className="w-3 h-3 fill-emerald-500 text-emerald-400" />
                    <span>{review.myScore}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tight">
                    {review.releaseYear}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
