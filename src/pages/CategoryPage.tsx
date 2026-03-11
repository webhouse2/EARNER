import { useParams } from 'react-router-dom';
import { CATEGORIES } from '../types';
import { usePosts } from '../context/PostContext';
import { BlogCard, Sidebar } from '../components/BlogComponents';
import { motion } from 'motion/react';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { posts, loading } = usePosts();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  const categoryName = CATEGORIES.find(
    c => c.toLowerCase().replace(/ /g, '-') === categorySlug
  ) || 'Category';

  const filteredPosts = posts.filter(
    p => p.category.toLowerCase().replace(/ /g, '-') === categorySlug
  );

  const trendingPosts = posts.filter(p => p.trending);
  const popularPosts = posts.filter(p => p.popular);

  return (
    <div className="pb-20">
      <header className="pt-20 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/10 blur-[120px] rounded-full -mr-64" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4 block">Browsing Category</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {categoryName}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              Discover the latest strategies, tools, and insights specifically for {categoryName.toLowerCase()}.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">No articles found yet</h3>
                  <p className="text-slate-500">We're currently crafting new content for this category. Check back soon!</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Sidebar trendingPosts={trendingPosts} popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};
