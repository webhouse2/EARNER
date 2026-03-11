import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import Parser from "rss-parser";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { ALL_POSTS } from "./src/data/posts.js"; // Use .js for ESM compatibility in some environments or just let tsx handle it

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("blog.db");
const parser = new Parser();
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) {
  console.warn("WARNING: No Gemini API key found in environment variables.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    author_name TEXT,
    author_role TEXT,
    author_avatar TEXT,
    author_bio TEXT,
    date TEXT,
    readTime TEXT,
    image TEXT,
    trending INTEGER,
    popular INTEGER,
    source_url TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const RSS_FEEDS = [
  "https://www.entrepreneur.com/rss/starting-a-business.rss",
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://problogger.com/feed/",
  "https://www.smartpassiveincome.com/feed/"
];

async function updateBlogFromRSS() {
  console.log("Starting RSS update...");
  let addedCount = 0;
  for (const url of RSS_FEEDS) {
    try {
      console.log(`Fetching feed: ${url}`);
      const feed = await parser.parseURL(url);
      console.log(`Found ${feed.items.length} items in ${url}`);
      for (const item of feed.items.slice(0, 3)) {
        const existing = db.prepare("SELECT id FROM posts WHERE source_url = ?").get(item.link);
        if (existing) {
          console.log(`Item already exists: ${item.link}`);
          continue;
        }

        console.log(`Processing new item: ${item.title}`);
        
        // Use Gemini to generate a full post based on the RSS item
        const prompt = `
          You are an expert content creator for "Earners Hub", a blog about making money online, AI tools, and freelancing.
          Based on the following news item, write a high-quality blog post.
          
          Title: ${item.title}
          Summary: ${item.contentSnippet || item.content || ""}
          Source: ${item.link}
          
          Requirements:
          1. The writer's name MUST be BABATUNDE.
          2. The post MUST have 2 to 5 paragraphs.
          3. The tone should be professional, encouraging, and actionable.
          4. Assign it to one of these categories: 'Make Money Online', 'AI Tools for Income', 'Freelancing', 'Affiliate Marketing', 'Blogging & SEO', 'Online Business Ideas', 'Passive Income'.
          5. Generate a catchy title and a short excerpt.
          6. Estimate a read time (e.g., "5 min read").
          7. The response MUST be in JSON format.
        `;

        try {
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  excerpt: { type: Type.STRING },
                  content: { type: Type.STRING, description: "HTML content with p and h3 tags" },
                  category: { type: Type.STRING },
                  readTime: { type: Type.STRING }
                },
                required: ["title", "excerpt", "content", "category", "readTime"]
              }
            }
          });

          const data = JSON.parse(response.text);
          const id = item.title?.toLowerCase().replace(/[^a-z0-9]/g, "-") || Math.random().toString(36).substring(7);
          const image = `https://picsum.photos/seed/${id}/1200/800`;

          db.prepare(`
            INSERT INTO posts (
              id, title, excerpt, content, category, 
              author_name, author_role, author_avatar, author_bio,
              date, readTime, image, trending, popular, source_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            id, data.title, data.excerpt, data.content, data.category,
            "BABATUNDE", "Senior Editor", "https://i.pravatar.cc/150?u=babatunde", "Expert in digital entrepreneurship and online income strategies.",
            new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            data.readTime, image, 0, 0, item.link
          );
          
          console.log(`Successfully added post: ${data.title}`);
          addedCount++;
        } catch (aiError) {
          console.error(`Gemini API error for ${item.title}:`, aiError);
        }
      }
    } catch (error) {
      console.error(`Error processing feed ${url}:`, error);
    }
  }
  
  if (addedCount === 0) {
    const count = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
    if (count.count === 0) {
      console.log("No posts found after RSS update, adding fallback post...");
      db.prepare(`
        INSERT INTO posts (
          id, title, excerpt, content, category, 
          author_name, author_role, author_avatar, author_bio,
          date, readTime, image, trending, popular, source_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        "welcome-to-earners-hub", "Welcome to Earners Hub – Your Guide to Financial Freedom", 
        "Discover the best ways to make money online with our expert guides and insights.",
        "<p>Welcome to Earners Hub! We are dedicated to providing you with the most up-to-date and actionable information on making money online.</p><p>Our team of experts, led by BABATUNDE, works tirelessly to bring you the latest trends in AI tools, freelancing, and online business strategies.</p>",
        "Make Money Online", "BABATUNDE", "Senior Editor", "https://i.pravatar.cc/150?u=babatunde", "Expert in digital entrepreneurship and online income strategies.",
        new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        "3 min read", "https://picsum.photos/seed/welcome/1200/800", 1, 1, "https://earnershub.com/welcome"
      );
    }
  }
  console.log("RSS update finished.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    // Map DB fields to Post interface
    const formattedPosts = posts.map(p => ({
      ...p,
      author: {
        name: p.author_name,
        role: p.author_role,
        avatar: p.author_avatar,
        bio: p.author_bio
      },
      trending: !!p.trending,
      popular: !!p.popular
    }));
    res.json(formattedPosts);
  });

  app.post("/api/update-feeds", async (req, res) => {
    try {
      await updateBlogFromRSS();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Seed initial data if empty
  const count = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
  if (count.count === 0) {
    console.log("Seeding initial posts from data/posts.ts...");
    for (const post of ALL_POSTS) {
      db.prepare(`
        INSERT INTO posts (
          id, title, excerpt, content, category, 
          author_name, author_role, author_avatar, author_bio,
          date, readTime, image, trending, popular, source_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        post.id, post.title, post.excerpt, post.content, post.category,
        post.author.name, post.author.role, post.author.avatar, post.author.bio,
        post.date, post.readTime, post.image, post.trending ? 1 : 0, post.popular ? 1 : 0, `internal://${post.id}`
      );
    }
    
    console.log("Triggering initial RSS update...");
    updateBlogFromRSS().catch(err => console.error("Initial seeding failed:", err));
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    // Schedule hourly update (every 1 hour)
    setInterval(updateBlogFromRSS, 60 * 60 * 1000);
  });
}

startServer();
