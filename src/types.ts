export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  date: string;
  readTime: string;
  image: string;
  trending?: boolean;
  popular?: boolean;
}

export type Category = 
  | 'Make Money Online'
  | 'AI Tools for Income'
  | 'Freelancing'
  | 'Affiliate Marketing'
  | 'Blogging & SEO'
  | 'Online Business Ideas'
  | 'Passive Income';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export const CATEGORIES: Category[] = [
  'Make Money Online',
  'AI Tools for Income',
  'Freelancing',
  'Affiliate Marketing',
  'Blogging & SEO',
  'Online Business Ideas',
  'Passive Income'
];
