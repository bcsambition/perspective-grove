
import React from "react";
import { Article } from "@/utils/articleUtils";

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const isBangla = article.language === 'bn';
  const contentClass = isBangla ? 'font-bangla' : '';
  
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
        dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}>
      </div>
    </>
  );
};

export default ArticleContent;
