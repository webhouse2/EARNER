import { Link } from 'react-router-dom';
import { Clock, User, ChevronRight, TrendingUp, Zap } from 'lucide-react';
import { Post } from '../types';
import { cn } from '../lib/utils';

interface BlogCardProps {
  post: Post;
  variant?: 'default' | 'horizontal' | 'featured';
  key?: string | number;
}

export const TrendingMarquee = ({ posts }: { posts: Post[] }) => {
  if (posts.length === 0) return null;
  
  return (
    <div className="bg-slate-900 text-white py-3 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 bg-brand-accent px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter mr-6 whitespace-nowrap">
          <Zap className="h-3 w-3 fill-current" /> Breaking Now
        </div>
        <div className="relative flex-1 overflow-hidden h-6">
          <div className="absolute flex whitespace-nowrap animate-marquee hover:pause">
            {posts.concat(posts).map((post, idx) => (
              <Link 
                key={`${post.id}-${idx}`} 
                to={`/post/${post.id}`}
                className="inline-flex items-center mx-8 text-sm font-medium hover:text-brand-accent transition-colors"
              >
                <span className="text-brand-accent/50 mr-2 font-mono">#{idx % posts.length + 1}</span>
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogCard = ({ post, variant = 'default' }: BlogCardProps) => {
  if (!post) return null;
  
  if (variant === 'featured') {
    return (
      <Link to={`/post/${post.id}`} className="group relative block overflow-hidden rounded-3xl bg-slate-900 aspect-[16/9] md:aspect-[21/9]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-3xl">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-brand-accent text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-slate-300 text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1" /> {post.readTime}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-brand-accent transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-300 text-lg line-clamp-2 md:line-clamp-none mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center space-x-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-white/20" />
            <span className="text-white font-medium">{post.author.name}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/post/${post.id}`} className="group flex flex-col sm:flex-row gap-6 items-start py-6 border-b border-slate-100 last:border-0">
        <div className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2 block">
            {post.category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors leading-snug">
            {post.title}
          </h3>
          <div className="flex items-center text-slate-500 text-xs space-x-4">
            <span className="flex items-center"><User className="h-3 w-3 mr-1" /> {post.author.name}</span>
            <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {post.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="group block space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-brand-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

import { usePosts } from '../context/PostContext';

export const Sidebar = ({ trendingPosts, popularPosts }: { trendingPosts: Post[], popularPosts: Post[] }) => {
  const { triggerUpdate, updating } = usePosts();
  
  return (
    <aside className="space-y-12">
      {/* Search Widget */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Newsletter</h4>
        <p className="text-slate-600 text-sm mb-4">Join 50,000+ earners receiving our weekly income reports.</p>
        <form className="space-y-2">
          <input type="email" placeholder="Email address" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20" />
          <button className="w-full bg-brand-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-brand-secondary transition-colors">Subscribe</button>
        </form>
      </div>

      {/* Trending Widget */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-accent" /> Trending Now
          </h4>
        </div>
        <div className="space-y-6">
          {trendingPosts.map((post, idx) => (
            <Link key={post.id} to={`/post/${post.id}`} className="group flex gap-4">
              <span className="text-3xl font-serif font-bold text-slate-100 group-hover:text-brand-accent transition-colors">0{idx + 1}</span>
              <div>
                <h5 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-snug">
                  {post.title}
                </h5>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Space */}
      <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 p-8 text-center">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Advertisement</p>
          <p className="text-slate-500 text-sm italic">Your Product Banner Here</p>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-slate-900 p-6 rounded-2xl text-white">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Feed Management</h4>
        <button 
          onClick={() => triggerUpdate()}
          disabled={updating}
          className={cn(
            "w-full py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2",
            updating ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-brand-accent text-white hover:bg-blue-600"
          )}
        >
          {updating ? (
            <>
              <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Zap className="h-3 w-3 fill-current" />
              Refresh RSS Feeds
            </>
          )}
        </button>
        <p className="text-[10px] text-slate-500 mt-3 text-center italic">
          Fetching latest online income opportunities...
        </p>
      </div>

      {/* Popular Posts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900">Popular Guides</h4>
        </div>
        <div className="space-y-4">
          {popularPosts.map(post => (
            <BlogCard key={post.id} post={post} variant="horizontal" />
          ))}
        </div>
      </div>
    </aside>
  );
};
