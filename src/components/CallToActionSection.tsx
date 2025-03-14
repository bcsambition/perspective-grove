
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="py-16 bg-accent">
      <div className="container-custom text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-accent-foreground">Ready to Explore More?</h2>
        <p className="text-muted-foreground text-lg">
          Dive deeper into a world of thoughtful analysis and perspectives across philosophy, technology, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link to="/articles" className="flex items-center gap-2 group">
              Browse All Articles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/categories">
              Explore by Topic
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
