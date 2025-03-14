
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { Article, getAllArticles } from "@/utils/articleUtils";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [allPosts, setAllPosts] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await getAllArticles();
        setAllPosts(articles);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(articles.map(article => article.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Fallback to sample data if there's an error
        setAllPosts(samplePosts);
        setCategories(["All", ...new Set(samplePosts.map(post => post.category))]);
      }
      setIsLoading(false);
    };
    
    fetchArticles();
  }, []);

  // Filter posts based on search term and active category
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLoadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4 mx-auto"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Articles | Thoughts & Analysis</title>
        <meta name="description" content="Browse all articles on philosophy, technology, and more." />
        <meta property="og:title" content="Articles | Thoughts & Analysis" />
        <meta property="og:description" content="Browse all articles on philosophy, technology, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/articles" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://example.com/articles" />
      </Helmet>

      <section className="py-12">
        <div className="container-custom">
          <h1 className="text-center mb-8">Articles</h1>
          
          {/* Search and filter */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-3"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {/* Articles grid */}
          {filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(0, visiblePosts).map((post, index) => {
                  const isBangla = post.language === 'bn';
                  
                  return (
                    <Card key={index} className="card-hover overflow-hidden h-full flex flex-col">
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
              
              {/* Load more button */}
              {visiblePosts < filteredPosts.length && (
                <div className="flex justify-center mt-10">
                  <Button onClick={handleLoadMore} variant="outline" className="min-w-[200px]">
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// Sample posts for fallback
const samplePosts = [
  {
    id: 1,
    title: "The Paradox of Choice: Why More Options Lead to Less Happiness",
    excerpt: "An examination of how the abundance of choices in modern society can actually decrease our satisfaction and well-being.",
    category: "Philosophy",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "paradox-of-choice",
    language: "en"
  },
  {
    id: 2,
    title: "Digital Minimalism: Reclaiming Attention in the Age of Distraction",
    excerpt: "How embracing a philosophy of technology use focused on intentionality can improve your digital life and mental health.",
    category: "Technology",
    date: "May 23, 2023",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "digital-minimalism",
    language: "en"
  },
  {
    id: 3,
    title: "The Ethics of Artificial Intelligence: Navigating the New Frontier",
    excerpt: "Exploring the moral implications of AI development and how we can ensure it benefits humanity.",
    category: "Ethics",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1677442135968-6268ab481c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "ethics-of-ai",
    language: "en"
  }
];

export default Articles;
