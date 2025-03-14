
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllArticles, Article } from "@/utils/articleUtils";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await getAllArticles();
        // Take the first 3 articles as featured
        setFeaturedPosts(allArticles.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured articles:", error);
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
            <h2>Featured Analysis</h2>
          </div>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <h2>Featured Analysis</h2>
          <Button variant="ghost" asChild>
            <Link to="/articles" className="flex items-center gap-2 group">
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => {
            const isBangla = post.language === 'bn';
            
            return (
              <Card key={post.slug} className="card-hover overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className={`line-clamp-2 ${isBangla ? 'font-bangla' : ''}`}>
                    <Link to={`/article/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className={`line-clamp-3 ${isBangla ? 'font-bangla' : ''}`}>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-0">
                  <Button variant="ghost" asChild className="p-0 h-auto font-semibold">
                    <Link to={`/article/${post.slug}`} className="flex items-center gap-2 group">
                      Read More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
