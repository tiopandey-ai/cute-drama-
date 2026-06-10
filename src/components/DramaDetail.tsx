import React, { useState } from 'react';
import { X, Calendar, Clock, Heart, Star, Send, ThumbsUp, Eye, MessageSquare, Plus, Minus, ArrowLeft } from 'lucide-react';
import { DramaReview, ReviewComment } from '../types';

interface DramaDetailProps {
  review: DramaReview;
  onClose: () => void;
  onAddComment: (reviewId: string, comment: ReviewComment) => void;
  onLikeReview: (reviewId: string) => void;
}

export default function DramaDetail({ review, onClose, onAddComment, onLikeReview }: DramaDetailProps) {
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentList, setCommentList] = useState<ReviewComment[]>(review.comments || []);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(review.likes || 120);

  // Parse custom styled text: translates basic Markdown like `### Heading` or `**bold**` into beautiful HTML elements
  const renderFormattedContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // Check for headings
      if (paragraph.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg md:text-xl font-bold text-slate-100 mt-6 mb-3 flex items-center">
            <span className="w-1.5 h-4 accent-gradient rounded-full mr-2 inline-block shrink-0" />
            {paragraph.replace('### ', '')}
          </h4>
        );
      }
      
      // Parse Bold text inside standard paragraphs
      let renderedText: React.ReactNode = paragraph;
      if (paragraph.includes('**')) {
        const parts = paragraph.split('**');
        renderedText = parts.map((part, i) => {
          // Odd indices are between asterisks
          if (i % 2 === 1) {
            return <strong key={i} className="font-extrabold text-indigo-400">{part}</strong>;
          }
          return part;
        });
      }

      // Check if it's a bullet item starting with '-'
      if (paragraph.startsWith('- ')) {
        return (
          <ul key={index} className="list-disc pl-5 my-2 text-slate-305 text-sm md:text-base leading-relaxed space-y-1">
            {paragraph.split('\n').map((bulletLine, bIdx) => (
              <li key={bIdx} className="text-slate-300">{bulletLine.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="text-sm md:text-base text-slate-300 leading-relaxed my-3">
          {renderedText}
        </p>
      );
    });
  };

  // Submit comment handler
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    const newComment: ReviewComment = {
      id: `comment-${Date.now()}`,
      authorName: commentName.trim() || 'Anonymous Reader',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150', // standard avatar icon placeholder
      content: commentContent.trim(),
      createdAt: 'Just now'
    };

    onAddComment(review.id, newComment);
    setCommentList([newComment, ...commentList]);
    setCommentName('');
    setCommentContent('');
  };

  const handleLike = () => {
    if (liked) return; // Prevent double like in the same view
    setLiked(true);
    setLikesCount(prev => prev + 1);
    onLikeReview(review.id);
  };

  return (
    <div className="bg-slate-900 border border-white/5 min-h-screen rounded-3xl overflow-hidden shadow-xl flex flex-col text-left">
      {/* Banner / Poster Hero Block */}
      <div className="relative h-60 sm:h-80 md:h-[380px] w-full bg-slate-850 select-none">
        <img
          src={review.bannerImage || review.coverImage}
          alt={review.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        
        {/* Floating Quick Back Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-slate-950/80 hover:bg-slate-800 hover:text-white backdrop-blur-md p-2 rounded-full cursor-pointer transition shadow-md flex items-center space-x-1.5 text-xs font-bold text-slate-300 border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="pr-1">Back to Feed</span>
        </button>

        {/* Floating Close Action */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-950/80 hover:bg-rose-500 text-white p-2.5 rounded-full cursor-pointer transition shadow-md border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Title details inside banner */}
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="accent-gradient text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
              {review.category} Drama
            </span>
            <span className="bg-slate-950/80 border border-white/5 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {review.releaseYear}
            </span>
            <span className="bg-slate-950/80 border border-white/5 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {review.episodes}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-sm">
            {review.title}
          </h2>
          {review.originalTitle && (
            <p className="text-md sm:text-lg font-bold text-indigo-400 font-sans mt-1">
              {review.originalTitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Grid Content Panels */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Columns - Detailed Review and Comments */}
        <div className="lg:col-span-8 space-y-6">
          {/* Synopsis short summary banner */}
          <div className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/10">
            <h3 className="font-extrabold text-sm text-indigo-400 uppercase tracking-wider mb-2">SYNOPSIS</h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-medium">
              "{review.summary}"
            </p>
          </div>

          {/* Actual Article content parsed */}
          <article className="prose prose-invert max-w-none border-b border-white/5 pb-8 font-sans text-slate-300">
            {renderFormattedContent(review.content)}
          </article>

          {/* Pros & Cons Bento Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Pros box */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
              <h4 className="font-extrabold text-sm text-emerald-400 tracking-wider flex items-center gap-1.5 mb-3.5">
                <span className="p-1 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center">
                  <Plus className="w-4.5 h-4.5" />
                </span>
                WHAT I LOVED (PROS)
              </h4>
              <ul className="space-y-3">
                {review.pros.map((pro, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm text-slate-300 font-medium">
                    <span className="mr-2 text-emerald-400 font-bold text-sm shrink-0">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons box */}
            <div className="bg-rose-500/5 border border-rose-500/10 p-5 rounded-2xl">
              <h4 className="font-extrabold text-sm text-rose-400 tracking-wider flex items-center gap-1.5 mb-3.5">
                <span className="p-1 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center">
                  <Minus className="w-4.5 h-4.5" />
                </span>
                MINOR CRITIQUES (CONS)
              </h4>
              <ul className="space-y-3">
                {review.cons.map((con, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm text-slate-300 font-medium">
                    <span className="mr-2 text-rose-400 font-bold text-sm shrink-0">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-slate-950/85 border border-white/5 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full filter blur-xl" />
            <h4 className="font-black text-sm text-indigo-400 uppercase tracking-wider mb-2">FINAL VERDICT</h4>
            <p className="text-slate-200 text-sm md:text-base font-extrabold leading-relaxed font-sans">
              " {review.verdict} "
            </p>
          </div>

          {/* Social interactivity toolbar */}
          <div className="flex items-center justify-between py-4 border-t border-b border-white/5 mt-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-md border cursor-pointer ${
                liked
                  ? 'accent-gradient text-white border-transparent'
                  : 'bg-slate-800 text-slate-300 border-white/10 hover:border-indigo-400 hover:bg-slate-700/80'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{liked ? 'Liked!' : 'Helpful Review'} ({likesCount})</span>
            </button>

            <div className="flex items-center space-x-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1"><Eye className="w-4 h-4 text-slate-500" /> {review.views.toLocaleString()} Views</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-slate-500" /> {commentList.length} Comments</span>
            </div>
          </div>

          {/* COMMENTS MODULE */}
          <div className="space-y-6 pt-2">
            <h3 className="text-lg font-extrabold text-slate-50 tracking-tight flex items-center">
              <MessageSquare className="w-5 h-5 text-indigo-400 mr-2" />
              Discussion ({commentList.length})
            </h3>

            {/* List of comments */}
            <div className="space-y-4">
              {commentList.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No comments yet. Be the first to share your thoughts on this drama!</p>
              ) : (
                commentList.map((comment) => (
                  <div key={comment.id} className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex items-start space-x-3.5">
                    <img
                      src={comment.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'}
                      alt={comment.authorName}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/10 bg-slate-800"
                    />
                    <div className="min-w-0 flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-extrabold text-xs text-slate-200">{comment.authorName}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{comment.createdAt}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Write a comment form */}
            <form onSubmit={handleSubmitComment} className="bg-slate-950/60 border border-white/5 p-4 rounded-2xl space-y-3">
              <h4 className="font-extrabold text-xs text-slate-200">Have something to add? Share your comment below!</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-900 border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100 placeholder-slate-500 sm:col-span-1"
                />
                <input
                  type="text"
                  placeholder="Add your review thoughts or questions..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-900 border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100 placeholder-slate-500 sm:col-span-2"
                  required
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 accent-gradient hover:opacity-95 text-white font-extrabold text-xs px-4 py-2 rounded-lg transition shrink-0 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Recommendation Card Metric Panels */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Rating / Review Score Card Widget */}
          <div className="bg-slate-950/80 border border-white/5 p-6 shadow-sm rounded-3xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-3xl opacity-30" />
            
            <div className="text-center relative">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-2">My Score Recommendation</span>
              <div className="inline-flex items-center justify-center space-x-1.5 bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl">
                <Heart className="w-8 h-8 text-emerald-400 fill-emerald-500 animate-pulse shrink-0" />
                <span className="text-4xl font-black text-slate-100 tracking-tight">{review.myScore}</span>
                <span className="text-sm font-bold text-slate-500 self-end -mb-0.5">/ 10</span>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-5">
              {/* Genre Pills */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">GENRES</span>
                <div className="flex flex-wrap gap-1.5">
                  {review.genres.map((g, idx) => (
                    <span key={idx} className="bg-indigo-500/10 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-lg">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* General details list */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between font-semibold border-b border-white/5 pb-2">
                  <span className="text-slate-400">MDL Platform Rating</span>
                  <span className="text-slate-100 flex items-center font-bold gap-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {review.rating} / 10
                  </span>
                </div>
                
                <div className="flex justify-between font-semibold border-b border-white/5 pb-2">
                  <span className="text-slate-400">Total Run Time</span>
                  <span className="text-slate-100 font-bold">{review.episodes}</span>
                </div>

                <div className="flex justify-between font-semibold border-b border-white/5 pb-2">
                  <span className="text-slate-400">Release Year</span>
                  <span className="text-slate-100 font-bold">{review.releaseYear}</span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span className="text-slate-400">Review Author</span>
                  <span className="text-slate-100 font-bold">{review.author?.name || 'Piku Pandey'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick guide warning */}
          <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl">
            <h5 className="font-extrabold text-xs text-slate-100 mb-1">Fan Discord & Discussion</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Join the official Discord channel to coordinate live streams, subtitles, merchandise buying, and group chats for {review.title}!
            </p>
            <button className="w-full accent-gradient hover:opacity-90 text-white font-extrabold text-[11px] py-2.5 rounded-lg mt-3 transition select-none cursor-pointer uppercase tracking-wider shadow">
              Join Drama Channel
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
