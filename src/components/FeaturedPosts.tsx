
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample featured posts data
const featuredPosts = [
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
  }
];

export function FeaturedPosts() {
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
          {featuredPosts.map((post) => (
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
      </div>
    </section>
  );
}
