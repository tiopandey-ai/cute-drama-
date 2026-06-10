export type Category = 'All' | 'Korean' | 'Chinese' | 'Japanese' | 'Movies';

export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

export interface ReviewComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface DramaReview {
  id: string;
  title: string;
  originalTitle?: string;
  category: 'Korean' | 'Chinese' | 'Japanese' | 'Movies';
  episodes: string;
  releaseYear: number;
  genres: string[];
  rating: number; // MDL/MyDramaList or general rating, e.g. 9.6
  myScore: number; // Blogger's personal score (1-10)
  coverImage: string;
  bannerImage: string;
  summary: string;
  content: string; // The article itself
  author: Author;
  publishedAt: string;
  isTrending?: boolean;
  trendingRank?: number; // 1-6 positions
  isFeatured?: boolean; // Appears on the top hero slider
  pros: string[];
  cons: string[];
  verdict: string;
  views: number;
  likes: number;
  comments: ReviewComment[];
}
