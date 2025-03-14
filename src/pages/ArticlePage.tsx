
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Share, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Sample article data - in a real app, this would come from an API or CMS
const articles = {
  "paradox-of-choice": {
    title: "The Paradox of Choice: Why More Options Lead to Less Happiness",
    excerpt: "An examination of how the abundance of choices in modern society can actually decrease our satisfaction and well-being.",
    category: "Philosophy",
    date: "June 15, 2023",
    author: "Your Name",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>In today's world, we're constantly bombarded with options. From the 50 different cereal brands at the grocery store to the endless scroll of shows on streaming platforms, choice has become a defining feature of modern life.</p>
      
      <p>But does this abundance of options actually make us happier? Psychologist Barry Schwartz argues the opposite in his seminal work "The Paradox of Choice." According to Schwartz, while some choice is undoubtedly better than none, more is not always better than less.</p>
      
      <h2>The Psychology Behind Choice Overload</h2>
      
      <p>When faced with too many options, we often experience what psychologists call "choice overload" or "decision paralysis." This phenomenon occurs because:</p>
      
      <ul>
        <li>Each option requires evaluation, consuming mental energy</li>
        <li>More options raise our expectations about finding the "perfect" choice</li>
        <li>Having multiple attractive alternatives increases the opportunity cost of any single choice</li>
        <li>We anticipate potential regret about the options we didn't select</li>
      </ul>
      
      <p>In a famous experiment, researchers set up a jam tasting booth at a grocery store. On some days, they displayed 24 different jams; on others, only 6. While the larger display attracted more initial attention, people were ten times more likely to actually purchase jam when faced with the smaller selection.</p>
      
      <h2>The Freedom Paradox</h2>
      
      <p>We tend to equate freedom with choice, assuming that more options equate to greater autonomy and happiness. However, an overabundance of choice can lead to:</p>
      
      <ul>
        <li><strong>Decision fatigue:</strong> Each decision depletes our mental energy</li>
        <li><strong>Increased anxiety:</strong> More choices mean more potential for regret</li>
        <li><strong>Analysis paralysis:</strong> Overthinking decisions to the point of inaction</li>
        <li><strong>Diminished satisfaction:</strong> Constant questioning if we made the "best" choice</li>
      </ul>
      
      <h2>Practical Solutions</h2>
      
      <p>How can we navigate this paradox in our daily lives? Here are some strategies:</p>
      
      <ul>
        <li><strong>Satisfice, don't maximize:</strong> Aim for "good enough" rather than the absolute best</li>
        <li><strong>Limit your options:</strong> Deliberately constrain choices when possible</li>
        <li><strong>Develop decisive heuristics:</strong> Create personal rules for common decisions</li>
        <li><strong>Practice gratitude:</strong> Focus on the positive aspects of your choices</li>
        <li><strong>Embrace irreversibility:</strong> Make some decisions permanent to prevent endless reconsideration</li>
      </ul>
      
      <h2>The Value of Constraints</h2>
      
      <p>Ironically, we're often at our most creative and content when working within constraints. Limited options force us to be resourceful and can actually increase our appreciation for what we have.</p>
      
      <p>Consider how some of history's greatest innovations and artistic achievements came from periods or circumstances of limitation, not abundance. Constraints focus our attention and energy in ways that boundless choice cannot.</p>
      
      <h2>Conclusion</h2>
      
      <p>The freedom to choose is undoubtedly valuable, but it's worth considering where in our lives an abundance of choice might be hindering rather than helping our happiness. By being more intentional about which choices matter most and limiting options in areas of less importance, we might find ourselves both less stressed and more satisfied with our decisions.</p>
      
      <p>As Barry Schwartz puts it, "Learning to choose is hard. Learning to choose well is harder. And learning to choose well in a world of unlimited possibilities is harder still, perhaps too hard."</p>
    `,
    tags: ["decision-making", "psychology", "well-being", "modern-life", "minimalism"],
    relatedArticles: [
      {
        title: "Digital Minimalism: Reclaiming Attention in the Age of Distraction",
        slug: "digital-minimalism"
      },
      {
        title: "The Value of Boredom in a Hyperstimulated World",
        slug: "value-of-boredom"
      },
      {
        title: "Cognitive Biases: The Hidden Forces That Shape Our Decisions",
        slug: "cognitive-biases"
      }
    ]
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const article = articles[slug as keyof typeof articles];
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!article) {
    return (
      <div className="container-custom py-20 text-center">
        <h1>Article Not Found</h1>
        <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link to="/articles">Browse All Articles</Link>
        </Button>
      </div>
    );
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The article URL has been copied to your clipboard.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Thoughts & Analysis</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://example.com/article/${slug}`} />
        <meta property="og:image" content={article.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />
        <link rel="canonical" href={`https://example.com/article/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.image,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Thoughts & Analysis",
              "logo": {
                "@type": "ImageObject",
                "url": "https://example.com/logo.png"
              }
            },
            "datePublished": article.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://example.com/article/${slug}`
            }
          })}
        </script>
      </Helmet>

      <article className="py-10">
        <div className="container-custom max-w-4xl">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="pl-0 hover:pl-0">
              <Link to="/articles" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Articles
              </Link>
            </Button>
          </div>
          
          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{article.category}</Badge>
              <span className="text-sm text-muted-foreground">{article.date}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{article.readTime}</span>
            </div>
            
            <h1 className="mb-4">{article.title}</h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-bold">{article.author.charAt(0)}</span>
                </div>
                <span className="font-medium">{article.author}</span>
              </div>
              
              <Button onClick={handleShare} variant="ghost" size="sm" className="flex items-center gap-2">
                <Share size={16} />
                Share
              </Button>
            </div>
          </header>
          
          {/* Featured image */}
          <div className="mb-10">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          
          {/* Article content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          <div className="border-t border-border pt-6 mb-12">
            <h3 className="text-lg font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm py-1 px-3">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Share buttons */}
          <div className="border-t border-border pt-6 mb-12">
            <h3 className="text-lg font-medium mb-3">Share this article</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} />
                </a>
              </Button>
              <Button variant="outline" onClick={handleShare}>
                Copy Link
              </Button>
            </div>
          </div>
          
          {/* Related articles */}
          <div className="border-t border-border pt-6 mb-12">
            <h3 className="text-xl font-medium mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {article.relatedArticles.map((related) => (
                <Card key={related.slug} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link to={`/article/${related.slug}`} className="hover:text-primary transition-colors">
                        {related.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ArticlePage;
