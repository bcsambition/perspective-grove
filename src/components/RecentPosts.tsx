
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllArticles, Article } from "@/utils/articleUtils";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await getAllArticles();
        // Take the first 4 articles as recent posts (or fewer if not enough articles)
        setRecentPosts(allArticles.slice(0, 4));
      } catch (error) {
        console.error("Error fetching recent articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <h2>Latest Thoughts</h2>
          </div>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  // If no posts are available
  if (recentPosts.length === 0) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <h2>Latest Thoughts</h2>
            <Button variant="ghost" asChild>
              <Link to="/articles" className="flex items-center gap-2 group">
                View All
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <h2>Latest Thoughts</h2>
          <Button variant="ghost" asChild>
            <Link to="/articles" className="flex items-center gap-2 group">
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="space-y-6">
          {recentPosts.map((post) => {
            const isBangla = post.language === 'bn';
            
            return (
              <div key={post.slug} className="flex flex-col sm:flex-row gap-4 p-6 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                <div className="sm:w-3/4">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className={`text-xl mb-2 ${isBangla ? 'font-bangla' : ''}`}>
                    <Link to={`/article/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className={`text-muted-foreground line-clamp-2 mb-4 ${isBangla ? 'font-bangla' : ''}`}>
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" asChild className="p-0 h-auto font-semibold">
                    <Link to={`/article/${post.slug}`} className="flex items-center gap-2 group">
                      Read Article
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div className="hidden sm:block sm:w-1/4">
                  <div className="flex justify-end h-full items-center">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-3xl">✏️</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
