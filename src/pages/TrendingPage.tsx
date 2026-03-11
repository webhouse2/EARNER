import { motion } from 'motion/react';
import { TrendingUp, Zap, Clock, ArrowRight } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import { BlogCard, Sidebar } from '../components/BlogComponents';
import { Link } from 'react-router-dom';

export const TrendingPage = () => {
  const { posts, loading } = usePosts();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  const trendingPosts = posts.filter(p => p.trending);
  const popularPosts = posts.filter(p => p.popular);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-sm mb-2">
            <Zap className="h-4 w-4 fill-current" /> Trending Now
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900">Hot Topics</h1>
        </div>
        <p className="text-slate-500 max-w-md">
          The most discussed and shared articles on Earners Hub right now. Stay ahead of the curve with these trending insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trendingPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
          
          {trendingPosts.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No trending posts at the moment. Check back later!</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <Sidebar trendingPosts={trendingPosts.slice(0, 5)} popularPosts={popularPosts} />
        </div>
      </div>
    </div>
  );
};
