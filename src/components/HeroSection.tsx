
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-custom space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="animate-fade-in">
            <span className="text-gradient">Exploring Ideas,</span><br />
            One Thought at a Time
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: "150ms" }}>
            Thoughtful analysis on philosophy, technology, and the human experience
          </p>
          <div className="pt-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg">
              <Link to="/articles">
                Explore Articles
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-100/20 to-transparent -z-10 dark:from-purple-900/20"></div>
    </section>
  );
}
