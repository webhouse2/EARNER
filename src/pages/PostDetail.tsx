import { useParams, Link } from 'react-router-dom';
import { Clock, User, Share2, MessageSquare, ChevronRight, Facebook, Twitter, Linkedin, Bookmark, Sparkles } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import { Sidebar } from '../components/BlogComponents';
import { motion } from 'motion/react';

export const PostDetail = () => {
  const { id } = useParams();
  const { posts, loading } = usePosts();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h2>
        <p className="text-slate-500 mb-8">We're still updating our database. Please try again in a moment.</p>
        <Link to="/" className="text-brand-accent font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  const post = posts.find(p => p.id === id) || posts[0];
  const trendingPosts = posts.filter(p => p.trending);
  const popularPosts = posts.filter(p => p.popular);

  return (
    <div className="pb-20">
      {/* Article Header */}
      <header className="pt-12 pb-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/category/${post.category.toLowerCase().replace(/ /g, '-')}`}
              className="inline-block px-4 py-1.5 bg-brand-accent/10 text-brand-accent text-sm font-bold uppercase tracking-wider rounded-full mb-6 hover:bg-brand-accent/20 transition-colors"
            >
              {post.category}
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 font-medium">
              <div className="flex items-center">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-sm" />
                <span>By {post.author.name}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" /> {post.date}
              </div>
              <div className="flex items-center">
                <Bookmark className="h-4 w-4 mr-2" /> {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[21/9] object-cover rounded-[2.5rem] shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Social Share Sticky */}
            <div className="flex flex-col md:flex-row gap-12">
              <div className="hidden md:flex flex-col items-center space-y-4 sticky top-32 h-fit">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest vertical-text mb-4">Share</span>
                <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-accent hover:text-white transition-all">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-accent hover:text-white transition-all">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-accent hover:text-white transition-all">
                  <Linkedin className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1">
                {/* Table of Contents */}
                <div className="bg-slate-50 p-8 rounded-2xl mb-12 border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">In this article</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-brand-accent font-medium hover:underline cursor-pointer">
                      <ChevronRight className="h-4 w-4 mr-2" /> Understanding the Online Economy
                    </li>
                    <li className="flex items-center text-slate-600 hover:text-brand-accent transition-colors cursor-pointer">
                      <ChevronRight className="h-4 w-4 mr-2" /> Top 5 AI Tools for Content Creation
                    </li>
                    <li className="flex items-center text-slate-600 hover:text-brand-accent transition-colors cursor-pointer">
                      <ChevronRight className="h-4 w-4 mr-2" /> How to Scale Your Affiliate Business
                    </li>
                    <li className="flex items-center text-slate-600 hover:text-brand-accent transition-colors cursor-pointer">
                      <ChevronRight className="h-4 w-4 mr-2" /> Common Pitfalls to Avoid
                    </li>
                  </ul>
                </div>

                {/* Article Body */}
                <div 
                  className="markdown-body"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Author Section */}
                <div className="mt-16 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                  <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full shadow-lg" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-2 block">Written By</span>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">{post.author.name}</h4>
                    <p className="text-slate-500 mb-4">{post.author.bio}</p>
                    <div className="flex justify-center md:justify-start space-x-4">
                      <Link to="#" className="text-slate-400 hover:text-brand-accent transition-colors">Twitter</Link>
                      <Link to="#" className="text-slate-400 hover:text-brand-accent transition-colors">LinkedIn</Link>
                      <Link to="#" className="text-slate-400 hover:text-brand-accent transition-colors">Website</Link>
                    </div>
                  </div>
                </div>

                {/* Comments Section Placeholder */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-brand-accent" /> Discussion (12)
                  </h3>
                  <div className="space-y-8">
                    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <p className="text-slate-500 italic">Comments are currently being moderated. Join the conversation below.</p>
                      <button className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-lg font-bold text-sm">Post a Comment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar trendingPosts={trendingPosts} popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};
