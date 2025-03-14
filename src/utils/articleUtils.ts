export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  language: string;
  image: string;
  content: string;
}

// Sample articles as fallback in case of loading issues
const sampleArticles: Article[] = [
  {
    title: "The Paradox of Choice: Why More Options Lead to Less Happiness",
    excerpt: "An examination of how the abundance of choices in modern society can actually decrease our satisfaction and well-being.",
    category: "Philosophy",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "paradox-of-choice",
    language: "en",
    author: "Alex Johnson",
    readTime: "8 min read",
    tags: ["psychology", "decision-making", "wellbeing"],
    content: "## Introduction\n\nIn modern society, we're constantly bombarded with choices. From the 50+ options of toothpaste at the supermarket to the endless stream of content on streaming platforms, the modern world presents us with more options than ever before. Conventional wisdom suggests that more choice equals more freedom and, therefore, more happiness. But is this really the case?\n\nPsychologist Barry Schwartz challenged this assumption in his seminal work, \"The Paradox of Choice.\" According to Schwartz, while some choice is undoubtedly better than none, more choice is not always better than less."
  },
  {
    title: "Digital Minimalism: Reclaiming Attention in the Age of Distraction",
    excerpt: "How embracing a philosophy of technology use focused on intentionality can improve your digital life and mental health.",
    category: "Technology",
    date: "May 23, 2023",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "digital-minimalism",
    language: "en",
    author: "Emma Thompson",
    readTime: "6 min read",
    tags: ["technology", "productivity", "wellness"],
    content: "## The Problem\n\nIn today's hyperconnected world, we're constantly bombarded with digital distractions. The average person checks their phone 96 times a day—that's once every 10 minutes of waking life. Social media, endless news cycles, and the persistent ping of notifications fragment our attention and leave us feeling exhausted yet somehow still craving more screen time."
  },
  {
    title: "বাংলা সংস্কৃতি এবং ঐতিহ্য",
    excerpt: "বাংলা সংস্কৃতি, ঐতিহ্য এবং এর সৌন্দর্য সম্পর্কে একটি অন্বেষণ।",
    category: "Culture",
    date: "April 3, 2023",
    image: "https://images.unsplash.com/photo-1623775306043-5d496465c31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "bangla-culture",
    language: "bn",
    author: "Rahul Sen",
    readTime: "7 min read",
    tags: ["culture", "history", "traditions", "arts"],
    content: "## সাংস্কৃতিক ঐতি��্য\n\nবাংলা সংস্কৃতি হাজার বছরের ইতিহাস নিয়ে গড়ে উঠেছে। এর সমৃদ্ধ সাহিত্য, সংগীত, নৃত্য, এবং চারুকলা বিশ্বজুড়ে প্রশংসিত। রবীন্দ্রনাথ ঠাকুর, কাজী নজরুল ইসলাম, এবং অন্যান্য মহান শিল্পীদের অবদান বাংলা সংস্কৃতিকে একটি অনন্য পরিচয় দিয়েছে।"
  }
];

// Map of article slugs to their import functions
const articleModules = import.meta.glob('../articles/*.md', { as: 'raw', eager: true });

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    const articles = await getAllArticles();
    return articles.find(article => article.slug === slug);
  } catch (error) {
    console.error('Error fetching article:', error);
    // Fallback to sample articles
    return sampleArticles.find(article => article.slug === slug);
  }
};

export const getAllArticles = async (): Promise<Article[]> => {
  try {
    // First try to parse real articles
    const articles: Article[] = [];
    let hasValidArticles = false;
    
    for (const path in articleModules) {
      try {
        const content = articleModules[path];
        console.log(`Parsing article at ${path}`);
        const article = parseArticleContent(content);
        if (article) {
          console.log(`Successfully parsed article: ${article.title}`);
          articles.push(article);
          hasValidArticles = true;
        }
      } catch (error) {
        console.error(`Error parsing article at ${path}:`, error);
      }
    }
    
    // If no valid articles were found, use sample articles
    if (!hasValidArticles) {
      console.log("No valid articles found, using sample articles");
      return sampleArticles;
    }
    
    // Sort by date, newest first
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching articles:', error);
    return sampleArticles;
  }
};

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  const articles = await getAllArticles();
  return articles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
};

export const getArticlesByTag = async (tag: string): Promise<Article[]> => {
  const articles = await getAllArticles();
  return articles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getArticlesByLanguage = async (language: string): Promise<Article[]> => {
  const articles = await getAllArticles();
  return articles.filter(article => 
    article.language.toLowerCase() === language.toLowerCase()
  );
};

// Helper function to get category counts
export const getCategoryCounts = async (): Promise<Record<string, number>> => {
  const articles = await getAllArticles();
  const counts: Record<string, number> = {};
  
  articles.forEach(article => {
    const category = article.category.toLowerCase();
    counts[category] = (counts[category] || 0) + 1;
  });
  
  return counts;
};

// Completely rewritten parser to handle different markdown formats
function parseArticleContent(fileContent: string): Article | null {
  try {
    // Extract frontmatter and content
    const content = fileContent.trim();
    
    // Try different regex patterns to match frontmatter
    let frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    
    if (!frontmatterMatch) {
      // Try alternate format
      frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
      
      if (!frontmatterMatch) {
        console.error("Could not parse frontmatter format");
        throw new Error('Invalid article format');
      }
    }
    
    const frontmatterStr = frontmatterMatch[1].trim();
    const articleContent = frontmatterMatch[2].trim();
    
    // Parse frontmatter into an object
    const frontmatter: Record<string, any> = {};
    
    // Split by lines and process each key-value pair
    const lines = frontmatterStr.split(/\r?\n/);
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;
      
      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = trimmedLine.slice(0, colonIndex).trim();
      let value = trimmedLine.slice(colonIndex + 1).trim();
      
      // Handle arrays (like tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
        frontmatter[key] = value.split(',').map(item => 
          item.trim().replace(/["']/g, '')  // Remove quotes
        );
      } else {
        frontmatter[key] = value;
      }
    }
    
    // Create the article object
    return {
      title: frontmatter.title || '',
      slug: frontmatter.slug || '',
      excerpt: frontmatter.excerpt || '',
      author: frontmatter.author || '',
      date: frontmatter.date || '',
      readTime: frontmatter.readTime || '',
      category: frontmatter.category || '',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      language: frontmatter.language || 'en',
      image: frontmatter.image || '',
      content: articleContent
    };
  } catch (error) {
    console.error('Error parsing article:', error);
    return null;
  }
}
