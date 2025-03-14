
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-2/5">
            <div className="rounded-full overflow-hidden w-64 h-64 border-4 border-primary mx-auto lg:mx-0">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Author" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:w-3/5 text-center lg:text-left">
            <h2 className="mb-4">About the Author</h2>
            <p className="text-lg mb-4">
              Hi, I'm [Your Name]. I'm a thinker, writer, and explorer of ideas at the intersection of philosophy, 
              technology, and human behavior.
            </p>
            <p className="text-muted-foreground mb-6">
              Through this platform, I share my thoughts and analyses on topics that matter—from the ethics of 
              emerging technologies to timeless philosophical questions. My goal is to explore complex ideas with 
              clarity and nuance, inviting readers to think deeply about the world we live in.
            </p>
            <Button asChild>
              <Link to="/about" className="flex items-center gap-2 group">
                Learn More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
