import React, { useState, useEffect } from 'react';
import { Save, Plus, ShieldAlert, Sparkles, Image, Check, AlertCircle, RefreshCw, Layers, Edit } from 'lucide-react';
import { DramaReview, Author } from '../types';

interface AdminPanelProps {
  onPublish: (review: DramaReview) => void;
  onResetData: () => void;
  editingReview: DramaReview | null;
  onClearEdit: () => void;
}

// Preset picture items to let the user easily choose stylish Asian Drama aesthetics!
const PRESET_IMAGES = [
  {
    name: 'Romantic Couple Rain',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000',
    tags: 'Romance, Rain, Melodrama'
  },
  {
    name: 'Cozy Bookstore Vibe',
    url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000',
    tags: 'Slow-burn, Youth, Retro'
  },
  {
    name: 'Seoul Cherry Blossoms / Neon City',
    url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000',
    tags: 'Fantasy, City, Modern'
  },
  {
    name: 'High School Back View Walk',
    url: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1000',
    tags: 'Youth, School, Nostalgia'
  },
  {
    name: 'Corporate Luxury Glass',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000',
    tags: 'Corporate, Mystery, drama'
  },
  {
    name: 'Moody Rain Alley Night',
    url: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=1000',
    tags: 'Fantasy, Thriller, Action'
  }
];

export default function AdminPanel({ onPublish, onResetData, editingReview, onClearEdit }: AdminPanelProps) {
  // Form States
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [category, setCategory] = useState<'Korean' | 'Chinese' | 'Japanese' | 'Movies'>('Korean');
  const [episodes, setEpisodes] = useState('16 Episodes');
  const [releaseYear, setReleaseYear] = useState(2024);
  const [genresInput, setGenresInput] = useState('Romance, Comedy, Drama');
  const [rating, setRating] = useState(9.0);
  const [myScore, setMyScore] = useState(9.5);
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [bannerImage, setBannerImage] = useState(PRESET_IMAGES[0].url);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [prosInput, setProsInput] = useState('Great main actor, Phenomenal OST');
  const [consInput, setConsInput] = useState('Slightly slow secondary subplots');
  const [verdict, setVerdict] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [trendingRank, setTrendingRank] = useState(5);
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync editing item if loaded
  useEffect(() => {
    if (editingReview) {
      setTitle(editingReview.title);
      setOriginalTitle(editingReview.originalTitle || '');
      setCategory(editingReview.category);
      setEpisodes(editingReview.episodes);
      setReleaseYear(editingReview.releaseYear);
      setGenresInput(editingReview.genres.join(', '));
      setRating(editingReview.rating);
      setMyScore(editingReview.myScore);
      setCoverImage(editingReview.coverImage);
      setBannerImage(editingReview.bannerImage || editingReview.coverImage);
      setSummary(editingReview.summary);
      setContent(editingReview.content);
      setProsInput(editingReview.pros.join(', '));
      setConsInput(editingReview.cons.join(', '));
      setVerdict(editingReview.verdict);
      setIsFeatured(editingReview.isFeatured || false);
      setIsTrending(editingReview.isTrending || false);
      setTrendingRank(editingReview.trendingRank || 5);
      
      // Scroll to top of editor panel
      const element = document.getElementById('studio-panel-header');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Clear to defaults
      handleResetForm();
    }
  }, [editingReview]);

  const handleResetForm = () => {
    setTitle('');
    setOriginalTitle('');
    setCategory('Korean');
    setEpisodes('16 Episodes');
    setReleaseYear(new Date().getFullYear());
    setGenresInput('Romance, Slice-of-Life, Comedy');
    setRating(9.0);
    setMyScore(9.2);
    setCoverImage(PRESET_IMAGES[0].url);
    setBannerImage(PRESET_IMAGES[0].url);
    setSummary('');
    setContent('');
    setProsInput('Splendid acting, Nostalgic background score');
    setConsInput('Slow pace in intermediate episodes');
    setVerdict('');
    setIsFeatured(false);
    setIsTrending(false);
    setTrendingRank(5);
  };

  const selectPresetImage = (url: string) => {
    setCoverImage(url);
    setBannerImage(url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !content.trim() || !verdict.trim()) {
      setErrorMsg('Please write a Title, Summary, Review article content, and Final Verdict to publish!');
      setTimeout(() => setErrorMsg(''), 6000);
      return;
    }

    // Parse Genres
    const genresList = genresInput
      .split(',')
      .map((g) => g.trim())
      .filter((g) => g.length > 0);

    // Parse Pros
    const prosList = prosInput
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    // Parse Cons
    const consList = consInput
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const author: Author = {
      name: 'Piku Pandey',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
      role: 'Chief Editor'
    };

    const reviewPayload: DramaReview = {
      id: editingReview ? editingReview.id : `drama-review-${Date.now()}`,
      title: title.trim(),
      originalTitle: originalTitle.trim() || undefined,
      category,
      episodes: episodes.trim() || '16 Episodes',
      releaseYear: Number(releaseYear) || 2024,
      genres: genresList.length > 0 ? genresList : ['Romance'],
      rating: Number(rating) || 9.0,
      myScore: Number(myScore) || 9.2,
      coverImage: coverImage.trim() || PRESET_IMAGES[0].url,
      bannerImage: bannerImage.trim() || coverImage.trim() || PRESET_IMAGES[0].url,
      summary: summary.trim(),
      content: content.trim(),
      pros: prosList.length > 0 ? prosList : ['Incredible storyline'],
      cons: consList.length > 0 ? consList : ['Minor script pacing issues'],
      verdict: verdict.trim(),
      author,
      views: editingReview ? editingReview.views : Math.floor(Math.random() * 500) + 100,
      likes: editingReview ? editingReview.likes : Math.floor(Math.random() * 30) + 5,
      comments: editingReview ? editingReview.comments : [],
      publishedAt: editingReview ? editingReview.publishedAt : formatDate(new Date()),
      isFeatured,
      isTrending,
      trendingRank: isTrending ? Number(trendingRank) : undefined
    };

    onPublish(reviewPayload);
    setSuccessMsg(editingReview ? 'Article successfullly updated!' : 'Congratulations! Your new Asian drama review article is published live on your website!');
    
    if (editingReview) {
      onClearEdit();
    } else {
      handleResetForm();
    }
    
    setTimeout(() => {
      setSuccessMsg('');
    }, 6000);
  };

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="bg-slate-900/80 border border-white/5 shadow-xl rounded-3xl p-6 md:p-8 mb-12 relative text-left">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      
      {/* Studio Header block */}
      <div id="studio-panel-header" className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Sparkles className="w-5 h-5 fill-indigo-950/20 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest">Writers Workspace</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
            CuteDrama Creator Studio
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 font-sans">
            Draft, style, and instantly publish stunning review articles for your Asian dramas.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Do you want to reset your reviews back to the elegant pre-seeded default list? This will replace your current modifications.')) {
                onResetData();
                setSuccessMsg('Database safely reset to gorgeous pre-seeded articles!');
                setTimeout(() => setSuccessMsg(''), 5000);
              }
            }}
            className="flex items-center space-x-1.5 bg-slate-950/60 text-slate-300 hover:text-indigo-405 border border-white/10 hover:border-indigo-400/30 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            title="Reset default reviews"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default Content</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs md:text-sm font-bold flex items-center space-x-2 mb-6 animate-fade-in">
          <span className="text-base">🎉</span>
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-305 p-4 rounded-xl text-xs md:text-sm font-bold flex items-center space-x-2 mb-6">
          <AlertCircle className="w-4 h-4 text-rose-450 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Column Forms */}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        
        {/* Row 1: Core details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Drama Title */}
          <div className="md:col-span-4 flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-350 uppercase tracking-wider">Drama/Movie Name *</label>
            <input
              type="text"
              placeholder="e.g., Crash Landing on You"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent font-medium placeholder-slate-550"
              required
            />
          </div>

          {/* Original / Secondary Title */}
          <div className="md:col-span-4 flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Original Title (Korean/Chinese/Japanese)</label>
            <input
              type="text"
              placeholder="e.g., 사랑의 불시착"
              value={originalTitle}
              onChange={(e) => setOriginalTitle(e.target.value)}
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent font-sans placeholder-slate-550"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4 flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Drama Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
            >
              <option className="bg-slate-950" value="Korean">Korean Drama (KDrama)</option>
              <option className="bg-slate-950" value="Chinese">Chinese Drama (CDrama)</option>
              <option className="bg-slate-950" value="Japanese">Japanese Drama (JDrama)</option>
              <option className="bg-slate-950" value="Movies">Movies (Filipino / Asian Movies)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Metadata stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Year */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Release Year *</label>
            <input
              type="number"
              placeholder="e.g., 2024"
              value={releaseYear}
              onChange={(e) => setReleaseYear(Number(e.target.value))}
              min="1990"
              max="2030"
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-left font-mono placeholder-slate-550"
              required
            />
          </div>

          {/* Episode Counts */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Run Duration (Episodes) *</label>
            <input
              type="text"
              placeholder="e.g., 16 Episodes, or Movie"
              value={episodes}
              onChange={(e) => setEpisodes(e.target.value)}
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium placeholder-slate-550"
              required
            />
          </div>

          {/* MDL General Score */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">MDL Public Rating (1-10) *</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="10.0"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full font-mono font-bold placeholder-slate-550"
              />
            </div>
          </div>

          {/* Blogger My Score */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-indigo-405 uppercase tracking-wider font-extrabold">Your Personal Score (1-10) *</label>
            <input
              type="number"
              step="0.1"
              min="1.0"
              max="10.0"
              value={myScore}
              onChange={(e) => setMyScore(Number(e.target.value))}
              className="px-4 py-2.5 bg-slate-950 border border-white/15 text-indigo-300 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none w-full font-mono font-bold"
            />
          </div>
        </div>

        {/* Row 3: Genres & Image Presets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Genres */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Genres (Comma separated)</label>
            <input
              type="text"
              placeholder="e.g., Romance, Comedy, Time-slip, Fantasy"
              value={genresInput}
              onChange={(e) => setGenresInput(e.target.value)}
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium placeholder-slate-550"
            />
          </div>

          {/* Image preset picker */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider flex items-center gap-1">
              <Image className="w-3.5 h-3.5 text-indigo-405" />
              <span>Aesthetic Theme Cover Presets</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {PRESET_IMAGES.map((img, i) => {
                const isSelected = coverImage === img.url;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectPresetImage(img.url)}
                    className={`relative aspect-[3/2] rounded-lg overflow-hidden border-2 transition ${
                      isSelected
                        ? 'border-indigo-505 shadow-md'
                        : 'border-transparent hover:border-indigo-400/30'
                    }`}
                  >
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover animate-fade-in" />
                    <div className="absolute inset-0 bg-slate-950/50 hover:bg-slate-900/10 transition" />
                    <span className="absolute bottom-1 right-1 text-[8px] bg-slate-950/75 text-slate-200 font-bold px-1 rounded">
                      Preset {i+1}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1 left-1 bg-indigo-500 rounded-full p-0.5 text-white">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic manual Cover URL fallback if they don't want a preset */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Or Custom Image URL</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/your-custom-url-path"
            value={coverImage}
            onChange={(e) => {
              setCoverImage(e.target.value);
              setBannerImage(e.target.value);
            }}
            className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono placeholder-slate-550"
          />
        </div>

        {/* Row 4: Summary Tagline */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Synopsis / Short Tagline *</label>
          <input
            type="text"
            placeholder="Write a catchy 1-2 sentence preview to engage drama fans on the feed list..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium placeholder-slate-550"
            required
          />
        </div>

        {/* Row 5: Detailed Review Word counts */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-extrabold text-slate-355 uppercase tracking-wider">Detailed Review Article Body *</label>
            <span className="text-[10px] text-indigo-305 font-bold bg-indigo-505/10 px-2 py-0.5 rounded border border-indigo-505/10">
              Tip: Use ### Heading to declare subheaders, and **text** for bold highlights!
            </span>
          </div>
          <textarea
            rows={10}
            placeholder={`### 🌟 Storyline & Theme
Tell your readers what the story represents and the emotional stakes.

### 🎭 Superb Chemistry and Performance
Explain what made the actors and their pairing so outstanding!

### 💬 Overall Recommendation
Summarize if they should binge it or skip it.`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-4 bg-slate-950/80 border border-white/10 rounded-xl text-slate-150 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed placeholder-slate-550"
            required
          />
        </div>

        {/* Row 6: Pros & Cons Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pros */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-emerald-450 uppercase tracking-wider">What I Loved (Pros, comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Masterclass chemistry, Gorgeous clothing choices, Warm nostalgic ost"
              value={prosInput}
              onChange={(e) => setProsInput(e.target.value)}
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Cons */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-extrabold text-rose-450 uppercase tracking-wider">Minor Critiques (Cons, comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Villain plans felt routine, A few secondary high school cliché tropes"
              value={consInput}
              onChange={(e) => setConsInput(e.target.value)}
              className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Row 7: Final Verdict */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-extrabold text-amber-500 uppercase tracking-wider">Ultimate Final Verdict *</label>
          <input
            type="text"
            placeholder="e.g. An absolute masterpiece of emotional pining, time travel, and heart-fluttering comedy. A gold standard!"
            value={verdict}
            onChange={(e) => setVerdict(e.target.value)}
            className="px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-amber-400 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-amber-550 placeholder-slate-550"
            required
          />
        </div>

        {/* Row 8: Layout visibility check boxes */}
        <div className="bg-slate-950 p-4 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Featured on slider switch */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4.5 h-4.5 text-indigo-500 accent-indigo-500 rounded focus:ring-indigo-400 border-slate-700 bg-slate-900"
            />
            <div>
              <label htmlFor="isFeatured" className="text-xs font-extrabold text-slate-300 block cursor-pointer">
                Feature on Top Slider Hero Banner
              </label>
              <span className="text-[10px] text-slate-500 font-semibold">
                This adds the drama to the animated carousel at the top of the homepage.
              </span>
            </div>
          </div>

          {/* Trending now switch */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isTrending"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
              className="w-4.5 h-4.5 text-indigo-500 accent-indigo-500 rounded focus:ring-indigo-400 border-slate-700 bg-slate-900"
            />
            <div>
              <label htmlFor="isTrending" className="text-xs font-extrabold text-slate-300 block cursor-pointer">
                Place inside the "Trending Now" 1-6 Strip
              </label>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-[10px] text-slate-500 font-semibold mr-1">
                  Shows in the top mini-strip grid.
                </span>
                {isTrending && (
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] font-bold text-slate-400">Position:</span>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={trendingRank}
                      onChange={(e) => setTrendingRank(Number(e.target.value))}
                      className="w-10 px-1 py-0.5 text-xs bg-slate-900 border border-white/10 rounded font-mono font-bold text-slate-200 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* FORM ACTIONS FOOTER ROW */}
        <div className="flex justify-end space-x-3 border-t border-white/5 pt-5">
          {editingReview && (
            <button
              type="button"
              onClick={onClearEdit}
              className="px-5 py-2.5 bg-slate-950/50 text-slate-300 hover:bg-slate-800 rounded-xl text-xs font-extrabold transition border border-white/10 cursor-pointer shadow"
            >
              Cancel Edit
            </button>
          )}
          
          <button
            type="submit"
            className="flex items-center space-x-2 accent-gradient hover:opacity-95 text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Save className="w-4 h-4 fill-current" />
            <span>{editingReview ? 'UPDATE ARTICLE DATA' : 'PUBLISH ARTICLE LIVE!'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
