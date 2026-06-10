import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import TrendingList from './components/TrendingList';
import ArticleList from './components/ArticleList';
import DramaDetail from './components/DramaDetail';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { INITIAL_REVIEWS } from './data';
import { DramaReview, Category, ReviewComment } from './types';
import { Sparkles, Heart, Bell, AlertCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'cutedrama_reviews_v1';

export default function App() {
  const [reviews, setReviews] = useState<DramaReview[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<DramaReview | null>(null);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<DramaReview | null>(null);

  // Initialize reviews from localStorage or load seeded default ones
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing stored reviews, resetting to default', e);
        setReviews(INITIAL_REVIEWS);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  // Save reviews whenever they change
  const saveToStorage = (updatedList: DramaReview[]) => {
    setReviews(updatedList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  };

  // 1. Create or Update a review
  const handlePublishReview = (review: DramaReview) => {
    const exists = reviews.some((r) => r.id === review.id);
    let updated: DramaReview[];
    
    if (exists) {
      updated = reviews.map((r) => (r.id === review.id ? review : r));
    } else {
      updated = [review, ...reviews];
    }
    
    saveToStorage(updated);
    
    // If we updated a review currently being read, refresh its detail panel
    if (selectedReview && selectedReview.id === review.id) {
      setSelectedReview(review);
    }
  };

  // 2. Delete a review
  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      const updated = reviews.filter((r) => r.id !== id);
      saveToStorage(updated);
      
      if (selectedReview && selectedReview.id === id) {
        setSelectedReview(null);
      }
      if (editingReview && editingReview.id === id) {
        setEditingReview(null);
      }
    }
  };

  // 3. Edit Review trigger
  const handleEditReviewTrigger = (review: DramaReview) => {
    setEditingReview(review);
    setIsStudioOpen(true);
    setSelectedReview(null); // Close reader during edits
  };

  const handleClearEdit = () => {
    setEditingReview(null);
  };

  // 4. Like review
  const handleLikeReview = (reviewId: string) => {
    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        return { ...r, likes: (r.likes || 0) + 1 };
      }
      return r;
    });
    saveToStorage(updated);
  };

  // 5. Add Comment to review
  const handleAddComment = (reviewId: string, comment: ReviewComment) => {
    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        const comments = r.comments || [];
        return {
          ...r,
          comments: [comment, ...comments]
        };
      }
      return r;
    });
    saveToStorage(updated);
  };

  // 6. Reset reviews data to default presets
  const handleResetData = () => {
    saveToStorage(INITIAL_REVIEWS);
    setEditingReview(null);
    setSelectedReview(null);
  };

  // Quick helper to jump back home
  const handleHomeClick = () => {
    setCurrentCategory('All');
    setSearchQuery('');
    setSelectedReview(null);
    setIsStudioOpen(false);
    setEditingReview(null);
  };

  const handleSelectReview = (review: DramaReview) => {
    setSelectedReview(review);
    
    // Automatically increment a view count of that review to make it dynamic!
    const updated = reviews.map((r) => {
      if (r.id === review.id) {
        return { ...r, views: (r.views || 0) + 1 };
      }
      return r;
    });
    setReviews(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    // Scroll to details panel
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans select-none antialiased">
      {/* Header component */}
      <Header
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenStudio={() => {
          setIsStudioOpen(!isStudioOpen);
          setSelectedReview(null); // Close review panel when entering studio
          setEditingReview(null);  // Reset editing states
        }}
        onHomeClick={handleHomeClick}
        isStudioOpen={isStudioOpen}
      />

      {/* Main Inner Center Space */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex-grow w-full">
        
        {/* Creator Studio is open */}
        {isStudioOpen && (
          <div className="relative">
            <AdminPanel
              onPublish={handlePublishReview}
              onResetData={handleResetData}
              editingReview={editingReview}
              onClearEdit={handleClearEdit}
            />
          </div>
        )}

        {/* Selected detailed page showing review */}
        {selectedReview ? (
          <div className="animate-fade-in">
            <DramaDetail
              review={selectedReview}
              onClose={() => setSelectedReview(null)}
              onAddComment={handleAddComment}
              onLikeReview={handleLikeReview}
            />
          </div>
        ) : (
          /* General Hub (Feed & Widgets) */
          <>
            {/* Top Carousel Banner (Only shown on "All" / Category Home & when not searching) */}
            {!searchQuery && currentCategory === 'All' && (
              <HeroSlider
                reviews={reviews}
                onSelectReview={handleSelectReview}
              />
            )}

            {/* Trending Now Banner Stripes (Only shown on All/Home & when not searching) */}
            {!searchQuery && currentCategory === 'All' && (
              <TrendingList
                reviews={reviews}
                onSelectReview={handleSelectReview}
              />
            )}

            {/* Main Feed Content layout */}
            <ArticleList
              reviews={reviews}
              onSelectReview={handleSelectReview}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              searchQuery={searchQuery}
              isStudioActive={isStudioOpen}
              onEditReview={handleEditReviewTrigger}
              onDeleteReview={handleDeleteReview}
            />
          </>
        )}
      </main>

      {/* Footer view */}
      <Footer
        setCurrentCategory={setCurrentCategory}
        onHomeClick={handleHomeClick}
      />
    </div>
  );
}
