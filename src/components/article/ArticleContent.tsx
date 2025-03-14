
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

// Helper function to convert markdown to HTML
function formatMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Convert headers (## Header)
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  
  // Convert paragraphs (blank lines between paragraphs)
  html = html.replace(/\n\n(?!<h)/g, '</p><p>');
  
  // Convert line breaks
  html = html.replace(/\n(?!<)/g, '<br>');
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Wrap in paragraph if not already
  if (!html.startsWith('<')) {
    html = '<p>' + html;
  }
  if (!html.endsWith('>')) {
    html = html + '</p>';
  }
  
  return html;
}

export default ArticleContent;
