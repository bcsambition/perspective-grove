
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

// Map of article slugs to their import functions
const articleModules = import.meta.glob('../articles/*.md', { as: 'raw', eager: true });

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    const articles = await getAllArticles();
    return articles.find(article => article.slug === slug);
  } catch (error) {
    console.error('Error fetching article:', error);
    return undefined;
  }
};

export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const articles: Article[] = [];
    
    for (const path in articleModules) {
      const content = articleModules[path];
      const article = parseArticleContent(content);
      if (article) {
        articles.push(article);
      }
    }
    
    // Sort by date, newest first
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
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

// Helper function to parse article content
function parseArticleContent(fileContent: string): Article | null {
  try {
    // Extract frontmatter and content
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = fileContent.match(frontmatterRegex);
    
    if (!match) {
      console.error('Invalid article format');
      return null;
    }
    
    const [, frontmatterStr, content] = match;
    const frontmatter: Record<string, any> = {};
    
    // Parse frontmatter
    const lines = frontmatterStr.split('\n');
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        
        // Handle arrays (tags)
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1);
          frontmatter[key.trim()] = value.split(',').map(item => item.trim().replace(/"/g, '').replace(/'/g, ''));
        } else {
          frontmatter[key.trim()] = value;
        }
      }
    }
    
    return {
      title: frontmatter.title || '',
      slug: frontmatter.slug || '',
      excerpt: frontmatter.excerpt || '',
      author: frontmatter.author || '',
      date: frontmatter.date || '',
      readTime: frontmatter.readTime || '',
      category: frontmatter.category || '',
      tags: frontmatter.tags || [],
      language: frontmatter.language || 'en',
      image: frontmatter.image || '',
      content: content.trim()
    };
  } catch (error) {
    console.error('Error parsing article:', error);
    return null;
  }
}
