
import React from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/utils/articleUtils";

interface ArticleHeaderProps {
  article: Article;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  const isBangla = article.language === 'bn';
  
  return (
    <header className={`mb-10 ${isBangla ? 'font-bangla' : ''}`}>
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary">
          <Link to={`/category/${article.category.toLowerCase()}`}>{article.category}</Link>
        </Badge>
        {article.tags.map(tag => (
          <Badge variant="outline" key={tag}>{tag}</Badge>
        ))}
      </div>
      
      <h1 className="mb-6">{article.title}</h1>
      
      <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <User size={16} />
          {article.author}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {article.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          {article.readTime}
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
