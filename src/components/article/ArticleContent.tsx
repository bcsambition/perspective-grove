import React from "react";
import { Article } from "@/utils/articleUtils";

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const isBangla = article.language === 'bn';
  const contentClass = isBangla ? 'font-bangla' : '';
  
  // Process markdown content
  const processedContent = formatMarkdownToHtml(article.content);
  
  return (
    <>
      {/* Featured image */}
      <div className="mb-10 rounded-lg overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-auto"
        />
      </div>
      
      {/* Article content */}
      <div 
        className={`prose prose-lg dark:prose-invert max-w-none mb-10 ${contentClass}`} 
        dangerouslySetInnerHTML={{ __html: processedContent }}>
      </div>
    </>
  );
};

// Helper function to convert markdown to HTML with improved handling
function formatMarkdownToHtml(markdown: string): string {
  if (!markdown) return '<p>No content available</p>';
  
  // Check if content is already in HTML format (from the fallback in ArticlePage.tsx)
  if (markdown.trim().startsWith('<')) {
    return markdown;
  }
  
  let html = markdown;

  // Process headers
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>'); // Add h1 support
  
  // Handle lists before paragraphs to avoid incorrect nesting
  // Unordered lists
  let listItems = html.match(/^- (.*?)$/gm);
  if (listItems) {
    listItems.forEach(item => {
      html = html.replace(item, `<li>${item.substring(2)}</li>`);
    });
    html = html.replace(/<li>.*?(<li>.*?)+/g, '<ul>$&</ul>');
  }
  
  // Ordered lists
  let orderedItems = html.match(/^(\d+)\. (.*?)$/gm);
  if (orderedItems) {
    orderedItems.forEach(item => {
      const content = item.replace(/^\d+\.\s/, '');
      html = html.replace(item, `<li>${content}</li>`);
    });
    html = html.replace(/<li>.*?(<li>.*?)+/g, '<ol>$&</ol>');
  }
  
  // Handle paragraphs
  // Split by double newlines and wrap each in paragraph tags if not already wrapped
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs.map(p => {
    p = p.trim();
    // Skip if already a HTML tag
    if (p.startsWith('<') && p.endsWith('>')) return p;
    // Skip if it's a list item that was already processed
    if (p.includes('<li>')) return p;
    // Otherwise wrap in paragraph tags
    return `<p>${p}</p>`;
  }).join('\n\n');
  
  // Convert line breaks within paragraphs
  html = html.replace(/\n(?!<)/g, '<br>');
  
  // Process inline formatting
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
  html = html.replace(/`(.*?)`/g, '<code>$1</code>'); // Inline code
  
  // Process links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
  
  // Clean up any potential double paragraph wrapping
  html = html.replace(/<p><p>/g, '<p>');
  html = html.replace(/<\/p><\/p>/g, '</p>');
  
  return html;
}

export default ArticleContent;
