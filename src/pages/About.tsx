
import { Helmet } from "react-helmet-async";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { NewsletterSection } from "@/components/NewsletterSection";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Thoughts & Analysis</title>
        <meta name="description" content="Learn more about the author behind Thoughts & Analysis." />
        <meta property="og:title" content="About | Thoughts & Analysis" />
        <meta property="og:description" content="Learn more about the author behind Thoughts & Analysis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://example.com/about" />
      </Helmet>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="mb-4">About Me</h1>
            <div className="w-32 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden border-4 border-primary">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80" 
                  alt="Author" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <a 
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-secondary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-secondary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-secondary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:your.email@example.com" 
                  className="bg-secondary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Hi, I'm [Your Name]</h2>
              
              <div className="prose prose-lg dark:prose-invert">
                <p>
                  I'm a writer, thinker, and explorer of ideas. With a background in [your background], 
                  I've always been fascinated by the intersections of philosophy, technology, and human behavior.
                </p>
                
                <p>
                  This website is my digital garden—a space where I cultivate and share thoughts on topics that 
                  matter to me. From the ethics of emerging technologies to timeless philosophical questions, 
                  I aim to explore complex ideas with clarity and nuance.
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3">My Approach</h3>
                
                <p>
                  I believe in slow thinking in a fast-paced world. My writing aims to:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Explore ideas thoughtfully rather than reactively</li>
                  <li>Find connections across disciplines and domains</li>
                  <li>Question assumptions and conventional wisdom</li>
                  <li>Present complex topics in accessible ways</li>
                </ul>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Professional Background</h3>
                
                <p>
                  Currently, I [current work/position]. Previously, I've worked in [previous experience]. 
                  I hold degrees in [education] from [institutions].
                </p>
                
                <p>
                  When I'm not writing, you can find me [personal interests/hobbies].
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Get in Touch</h3>
                
                <p>
                  I love hearing from readers! If you have thoughts, questions, or just want to say hello, 
                  feel free to reach out via <a href="mailto:your.email@example.com" className="text-primary hover:underline">email</a> or 
                  connect with me on social media.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <NewsletterSection />
    </>
  );
};

export default About;
