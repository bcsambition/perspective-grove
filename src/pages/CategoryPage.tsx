
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Categories data
const categoryData = {
  "philosophy": {
    name: "Philosophy",
    description: "Explorations of meaning, ethics, and the human condition",
    icon: "🧠",
    posts: [
      {
        id: 1,
        title: "The Paradox of Choice: Why More Options Lead to Less Happiness",
        excerpt: "An examination of how the abundance of choices in modern society can actually decrease our satisfaction and well-being.",
        date: "June 15, 2023",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        slug: "paradox-of-choice"
      },
      {
        id: 8,
        title: "The Stoic's Guide to Modern Living",
        excerpt: "How ancient Stoic principles can help us navigate contemporary challenges with resilience and clarity.",
        date: "August 5, 2023",
        image: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        slug: "stoic-guide-modern-living"
      },
      {
        id: 9,
        title: "Existentialism and the Search for Meaning",
        excerpt: "An exploration of how existentialist thinkers approach the quest for meaning in a seemingly indifferent universe.",
        date: "August 18, 2023",
        image: "https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        slug: "existentialism-search-meaning"
      }
    ]
  },
  "technology": {
    name: "Technology",
    description: "Analysis of emerging tech trends and their societal impact",
    icon: "💻",
    posts: [
      {
        id: 2,
        title: "Digital Minimalism: Reclaiming Attention in the Age of Distraction",
        excerpt: "How embracing a philosophy of technology use focused on intentionality can improve your digital life and mental health.",
        date: "May 23, 2023",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        slug: "digital-minimalism"
      },
      {
        id: 3,
        title: "The Ethics of Artificial Intelligence: Navigating the New Frontier",
        excerpt: "Exploring the moral implications of AI development and how we can ensure it benefits humanity.",
        date: "April 10, 2023",
        image: "https://images.unsplash.com/photo-1677442135968-6268ab481c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        slug: "ethics-of-ai"
      }
    ]
  }
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Default to philosophy if category not found
  const category = categoryData[slug as keyof typeof categoryData] || categoryData.philosophy;
  
  return (
    <>
      <Helmet>
        <title>{category.name} | Thoughts & Analysis</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.name} | Thoughts & Analysis`} />
        <meta property="og:description" content={category.description} />
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
            <div className="inline-block text-4xl mb-4">{category.icon}</div>
            <h1 className="mb-4">{category.name}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
          
          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.posts.map((post) => (
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
                    <Badge variant="secondary">{category.name}</Badge>
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
          
          {/* If no posts */}
          {category.posts.length === 0 && (
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
