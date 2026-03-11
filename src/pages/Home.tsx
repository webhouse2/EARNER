import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Target, Globe, Briefcase } from 'lucide-react';
import { CATEGORIES } from '../types';
import { usePosts } from '../context/PostContext';
import { BlogCard, Sidebar, TrendingMarquee } from '../components/BlogComponents';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { posts, loading, updating, error } = usePosts();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-slate-600 mb-8">
            We're having trouble connecting to the Earners Hub server. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <Sparkles className="h-16 w-16 text-brand-accent mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Initializing Earners Hub...</h2>
        <p className="text-slate-500 max-w-md mb-8">
          We're currently fetching the latest online income opportunities and generating fresh content for you. This usually takes about 30 seconds.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  const featuredPost = posts[0];
  const trendingPosts = posts.filter(p => p.trending);
  const latestPosts = posts.slice(1);
  const popularPosts = posts.filter(p => p.popular);
  const marqueePosts = trendingPosts.length > 0 ? trendingPosts : posts.slice(0, 5);

  return (
    <div className="space-y-0 pb-20 relative">
      {updating && (
        <div className="fixed top-20 right-8 z-[60] bg-brand-accent text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest">Updating Feeds...</span>
        </div>
      )}
      <TrendingMarquee posts={marqueePosts} />
      
      <div className="space-y-20">
        {/* Hero Section */}
      <section className="relative pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-bold uppercase tracking-wider mb-6">
                  <Sparkles className="h-4 w-4 mr-2" /> The Future of Work is Here
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                  Earners Hub – Your Gateway to <span className="text-brand-accent">Online Income</span> Opportunities.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
                  Discover legitimate ways to make money online using modern digital tools, AI technology, and internet opportunities. We cut through the noise to bring you what actually works.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-lg hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 flex items-center">
                    Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                    Browse Categories
                  </button>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-brand-accent/20 blur-3xl rounded-full" />
                <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100">
                  <img
                    src="https://picsum.photos/seed/earning/800/1000"
                    alt="Online Income"
                    className="rounded-[2rem] w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 max-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Zap className="h-5 w-5 text-emerald-600" />
                      </div>
                      <span className="font-bold text-slate-900">Fast Growth</span>
                    </div>
                    <p className="text-xs text-slate-500">AI tools are increasing productivity by 40% in 2024.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-900">Featured Trending</h2>
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">HOT</span>
          </div>
          <Link to="/trending" className="text-brand-accent font-bold flex items-center hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <BlogCard post={featuredPost} variant="featured" />
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Latest Posts */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-10 pb-4 border-b border-slate-100">Latest Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {latestPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <button className="px-8 py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                  Load More Articles
                </button>
              </div>
            </div>

            {/* Category Grid Section */}
            <div className="bg-brand-secondary rounded-[2.5rem] p-8 md:p-12 text-white">
              <div className="max-w-2xl mb-12">
                <h2 className="text-4xl font-bold mb-4">Explore by Category</h2>
                <p className="text-slate-400 text-lg">Find the specific niche that matches your skills and interests.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat, idx) => (
                  <Link
                    key={cat}
                    to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                    className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-brand-accent transition-all duration-300"
                  >
                    <div className="mb-4 text-brand-accent group-hover:text-white transition-colors">
                      {idx % 3 === 0 ? <Globe className="h-8 w-8" /> : idx % 3 === 1 ? <Target className="h-8 w-8" /> : <Briefcase className="h-8 w-8" />}
                    </div>
                    <h3 className="font-bold text-lg leading-tight">{cat}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar trendingPosts={trendingPosts} popularPosts={popularPosts} />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-accent rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl mb-4">
              <Sparkles className="h-10 w-10 text-brand-accent" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Ready to start your journey to financial freedom?
            </h2>
            <p className="text-xl text-blue-100">
              Get our exclusive "Online Income Blueprint" for free when you join our newsletter today.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/20 text-lg"
              />
              <button className="px-8 py-4 bg-brand-secondary text-white rounded-xl font-bold text-lg hover:bg-slate-900 transition-all shadow-xl">
                Join Now
              </button>
            </form>
            <p className="text-blue-200 text-sm">Join 50,000+ others. No spam, ever.</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
