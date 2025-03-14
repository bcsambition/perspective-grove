
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    const articlesDirectory = path.join(process.cwd(), 'src/articles');
    const filenames = fs.readdirSync(articlesDirectory);
    
    for (const filename of filenames) {
      if (filename.endsWith('.md')) {
        const filePath = path.join(articlesDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        if (data.slug === slug) {
          return {
            ...data,
            content,
            slug: data.slug,
            tags: data.tags || [],
          } as Article;
        }
      }
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching article:', error);
    return undefined;
  }
};

export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const articlesDirectory = path.join(process.cwd(), 'src/articles');
    const filenames = fs.readdirSync(articlesDirectory);
    
    const articles = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(articlesDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          ...data,
          content,
          slug: data.slug,
          tags: data.tags || [],
        } as Article;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return articles;
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
