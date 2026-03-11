import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, TrendingUp, DollarSign, Cpu, Briefcase, Share2, BookOpen, Rocket, Coffee } from 'lucide-react';
import { CATEGORIES } from '../types';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to a search results page
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-brand-primary p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif tracking-tighter text-brand-secondary">
                Earners<span className="text-brand-accent">Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Home</Link>
            <Link to="/trending" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors flex items-center gap-1">
              Hot <span className="bg-red-500 text-white text-[8px] px-1 rounded-sm animate-pulse">HOT</span>
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors flex items-center gap-1">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-primary rounded-lg transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors">Contact</Link>
            
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent w-48 lg:w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <div className="py-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              </form>
            </div>
            <div className="space-y-4">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-primary" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/trending" className="flex items-center gap-2 px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-primary" onClick={() => setIsOpen(false)}>
                Hot <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">HOT</span>
              </Link>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3">Categories</p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                  className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {cat}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-4">
                <Link to="/about" className="block px-3 py-2 text-base font-medium text-slate-600" onClick={() => setIsOpen(false)}>About</Link>
                <Link to="/contact" className="block px-3 py-2 text-base font-medium text-slate-600" onClick={() => setIsOpen(false)}>Contact</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-brand-accent p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif tracking-tighter text-white">
                Earners<span className="text-brand-accent">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Your premier destination for discovering legitimate ways to make money online. We provide expert insights on AI tools, freelancing, and passive income strategies.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons would go here */}
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer">
                <Share2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Categories</h3>
            <ul className="space-y-4">
              {CATEGORIES.slice(0, 4).map(cat => (
                <li key={cat}>
                  <Link to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="hover:text-brand-accent transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h3>
            <p className="text-slate-400 mb-4 text-sm">Get the latest income opportunities delivered to your inbox.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-brand-accent text-white"
              />
              <button className="w-full bg-brand-accent hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-slate-500">
          <p>© 2024 Earners Hub. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Designed for Earners</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
