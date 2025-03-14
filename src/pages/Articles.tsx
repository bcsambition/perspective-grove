
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";

// Combine featured and recent posts for the articles page
const allPosts = [
  {
    id: 1,
    title: "The Paradox of Choice: Why More Options Lead to Less Happiness",
    excerpt: "An examination of how the abundance of choices in modern society can actually decrease our satisfaction and well-being.",
    category: "Philosophy",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "paradox-of-choice"
  },
  {
    id: 2,
    title: "Digital Minimalism: Reclaiming Attention in the Age of Distraction",
    excerpt: "How embracing a philosophy of technology use focused on intentionality can improve your digital life and mental health.",
    category: "Technology",
    date: "May 23, 2023",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "digital-minimalism"
  },
  {
    id: 3,
    title: "The Ethics of Artificial Intelligence: Navigating the New Frontier",
    excerpt: "Exploring the moral implications of AI development and how we can ensure it benefits humanity.",
    category: "Ethics",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1677442135968-6268ab481c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "ethics-of-ai"
  },
  {
    id: 4,
    title: "The Illusion of Productivity: Quality vs. Quantity in Work",
    excerpt: "Why focusing on the quality of our efforts often yields better results than maximizing our output.",
    category: "Productivity",
    date: "July 5, 2023",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "illusion-of-productivity"
  },
  {
    id: 5,
    title: "Digital Gardens: A New Framework for Personal Knowledge Management",
    excerpt: "How the concept of digital gardens is changing how we collect, nurture, and share ideas online.",
    category: "Knowledge",
    date: "July 12, 2023",
    image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "digital-gardens"
  },
  {
    id: 6,
    title: "Cognitive Biases: The Hidden Forces That Shape Our Decisions",
    excerpt: "An exploration of how systematic errors in thinking influence our judgment and decision-making processes.",
    category: "Psychology",
    date: "July 22, 2023",
    image: "https://images.unsplash.com/photo-1579447167782-51d662a9a720?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "cognitive-biases"
  },
  {
    id: 7,
    title: "The Value of Boredom in a Hyperstimulated World",
    excerpt: "Examining how embracing moments of boredom can enhance creativity and mental well-being.",
    category: "Mindfulness",
    date: "July 29, 2023",
    image: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    slug: "value-of-boredom"
  }
];

const categories = ["All", "Philosophy", "Technology", "Ethics", "Productivity", "Knowledge", "Psychology", "Mindfulness"];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);

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
                {filteredPosts.slice(0, visiblePosts).map((post) => (
                  <Card key={post.id} className="card-hover overflow-hidden h-full flex flex-col">
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
                      <CardTitle className="line-clamp-2">
                        <Link to={`/article/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
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
                ))}
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

export default Articles;
