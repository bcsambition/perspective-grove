
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Article, getArticlesByCategory } from "@/utils/articleUtils";

// Default categories data for fallback
const categoryDefaultData = {
  "philosophy": {
    name: "Philosophy",
    description: "Explorations of meaning, ethics, and the human condition",
    icon: "🧠"
  },
  "technology": {
    name: "Technology",
    description: "Analysis of emerging tech trends and their societal impact",
    icon: "💻"
  },
  "culture": {
    name: "Culture",
    description: "Exploring cultural traditions, history, and expressions",
    icon: "🎭"
  }
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      if (slug) {
        try {
          const fetchedArticles = await getArticlesByCategory(slug);
          setArticles(fetchedArticles);
        } catch (error) {
          console.error("Error fetching articles for category:", error);
          setArticles([]);
        }
      }
      setIsLoading(false);
    };
    
    fetchArticles();
  }, [slug]);
  
  // Get the category info
  const categoryName = slug ? (
    categoryDefaultData[slug as keyof typeof categoryDefaultData]?.name || 
    slug.charAt(0).toUpperCase() + slug.slice(1)
  ) : "Category";
  
  const categoryDescription = slug ? (
    categoryDefaultData[slug as keyof typeof categoryDefaultData]?.description || 
    `Articles in the ${categoryName} category`
  ) : "";
  
  const categoryIcon = slug ? (
    categoryDefaultData[slug as keyof typeof categoryDefaultData]?.icon || 
    "📝"
  ) : "📝";
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4 mx-auto"></div>
          <p className="text-muted-foreground">Loading category...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{categoryName} | Thoughts & Analysis</title>
        <meta name="description" content={categoryDescription} />
        <meta property="og:title" content={`${categoryName} | Thoughts & Analysis`} />
        <meta property="og:description" content={categoryDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://example.com/category/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://example.com/category/${slug}`} />
      </Helmet>

      <section className="py-12">
        <div className="container-custom">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="pl-0 hover:pl-0">
              <Link to="/categories" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                All Categories
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-12">
            <div className="inline-block text-4xl mb-4">{categoryIcon}</div>
            <h1 className="mb-4">{categoryName}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {categoryDescription}
            </p>
          </div>
          
          {/* Articles grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => {
                const isBangla = article.language === 'bn';
                
                return (
                  <Card key={index} className="card-hover overflow-hidden h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                      </div>
                      <CardTitle className={`line-clamp-2 ${isBangla ? 'font-bangla' : ''}`}>
                        <Link to={`/article/${article.slug}`} className="hover:text-primary transition-colors">
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className={`line-clamp-3 ${isBangla ? 'font-bangla' : ''}`}>
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-0">
                      <Button variant="ghost" asChild className="p-0 h-auto font-semibold">
                        <Link to={`/article/${article.slug}`} className="flex items-center gap-2 group">
                          Read More
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">There are no articles in this category yet.</p>
              <Button asChild>
                <Link to="/articles">Browse All Articles</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
