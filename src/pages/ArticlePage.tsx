
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article, getArticleBySlug } from "@/utils/articleUtils";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleContent from "@/components/article/ArticleContent";
import ShareSection from "@/components/article/ShareSection";
import NotFound from "./NotFound";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      
      if (slug) {
        try {
          const fetchedArticle = await getArticleBySlug(slug);
          
          if (fetchedArticle) {
            console.log("Article loaded:", fetchedArticle.title);
            console.log("Content length:", fetchedArticle.content.length);
            setArticle(fetchedArticle);
          } else {
            console.error("Article not found for slug:", slug);
            setError("Article not found");
          }
        } catch (error) {
          console.error("Error fetching article:", error);
          setError("Error loading article");
        }
      }
      
      setIsLoading(false);
    };
    
    fetchArticle();
  }, [slug]);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error || !article) {
    return <NotFound />;
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | Thoughts & Analysis</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} | Thoughts & Analysis`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://example.com/article/${slug}`} />
        <meta property="og:image" content={article.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />
        <link rel="canonical" href={`https://example.com/article/${slug}`} />
      </Helmet>

      <article className="py-12">
        <div className="container-custom max-w-4xl">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="pl-0 hover:pl-0">
              <Link to="/articles" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                All Articles
              </Link>
            </Button>
          </div>
          
          <ArticleHeader article={article} />
          <ArticleContent article={article} />
          <ShareSection />
        </div>
      </article>
    </>
  );
};

export default ArticlePage;
