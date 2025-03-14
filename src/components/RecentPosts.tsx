
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample recent posts data
const recentPosts = [
  {
    id: 4,
    title: "The Illusion of Productivity: Quality vs. Quantity in Work",
    excerpt: "Why focusing on the quality of our efforts often yields better results than maximizing our output.",
    category: "Productivity",
    date: "July 5, 2023",
    slug: "illusion-of-productivity"
  },
  {
    id: 5,
    title: "Digital Gardens: A New Framework for Personal Knowledge Management",
    excerpt: "How the concept of digital gardens is changing how we collect, nurture, and share ideas online.",
    category: "Knowledge",
    date: "July 12, 2023",
    slug: "digital-gardens"
  },
  {
    id: 6,
    title: "Cognitive Biases: The Hidden Forces That Shape Our Decisions",
    excerpt: "An exploration of how systematic errors in thinking influence our judgment and decision-making processes.",
    category: "Psychology",
    date: "July 22, 2023",
    slug: "cognitive-biases"
  },
  {
    id: 7,
    title: "The Value of Boredom in a Hyperstimulated World",
    excerpt: "Examining how embracing moments of boredom can enhance creativity and mental well-being.",
    category: "Mindfulness",
    date: "July 29, 2023",
    slug: "value-of-boredom"
  }
];

export function RecentPosts() {
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
          {recentPosts.map((post) => (
            <div key={post.id} className="flex flex-col sm:flex-row gap-4 p-6 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
              <div className="sm:w-3/4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl mb-2">
                  <Link to={`/article/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <Button variant="ghost" asChild className="p-0 h-auto font-semibold">
                  <Link to={`/article/${post.slug}`} className="flex items-center gap-2 group">
                    Read Article
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="hidden sm:block sm:w-1/4">
                <div className="flex justify-end h-full items-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-3xl">✏️</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
