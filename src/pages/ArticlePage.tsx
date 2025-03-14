
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, User, Tag, Share2, Twitter, Facebook, Linkedin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for a single article
const articleData = {
  "paradox-of-choice": {
    title: "The Paradox of Choice: Why More Options Lead to Less Happiness",
    excerpt: "An examination of how the abundance of choices in modern society can actually decrease our satisfaction and well-being.",
    content: `
      <h2>Introduction</h2>
      <p>
        In modern society, we're constantly bombarded with choices. From the 50+ options of toothpaste at the supermarket to the endless stream of content on streaming platforms, the modern world presents us with more options than ever before. Conventional wisdom suggests that more choice equals more freedom and, therefore, more happiness. But is this really the case?
      </p>
      <p>
        Psychologist Barry Schwartz challenged this assumption in his seminal work, "The Paradox of Choice." According to Schwartz, while some choice is undoubtedly better than none, more choice is not always better than less.
      </p>
      
      <h2>The Burden of Too Many Choices</h2>
      <p>
        When faced with too many options, several psychological phenomena occur:
      </p>
      <ul>
        <li><strong>Decision Paralysis:</strong> Too many choices can lead to decision fatigue, making it difficult to choose anything at all.</li>
        <li><strong>Increased Expectations:</strong> More options raise our expectations, making it harder to be satisfied with our eventual choice.</li>
        <li><strong>Anticipated Regret:</strong> The more alternatives available, the more we anticipate regretting the options we didn't choose.</li>
        <li><strong>Self-Blame:</strong> With many options, we blame ourselves more when outcomes are less than perfect, reasoning that with so many choices, we should have found the perfect one.</li>
      </ul>
      
      <h2>The Psychology Behind Choice Overload</h2>
      <p>
        One of the most fascinating experiments demonstrating this paradox was conducted at a high-end grocery store. Researchers set up a tasting booth with either 6 or 24 varieties of jam. While the larger display attracted more initial attention, the smaller display resulted in ten times more purchases. This suggests that while variety might attract us, it can also overwhelm our decision-making capacity.
      </p>
      <p>
        This phenomenon isn't limited to consumer goods. Studies have shown similar effects in retirement planning, healthcare options, and even dating preferences. In each case, more options led to decision avoidance or decreased satisfaction with the eventual choice.
      </p>
      
      <h2>Strategies for Navigating a World of Endless Choices</h2>
      <p>
        So, how do we navigate a world filled with overwhelming choice? Here are some strategies:
      </p>
      <ol>
        <li><strong>Satisfice, Don't Maximize:</strong> Instead of seeking the "perfect" option (maximizing), aim for "good enough" (satisficing). Establish criteria for what counts as acceptable, and choose the first option that meets them.</li>
        <li><strong>Limit Self-Imposed Choices:</strong> Create personal rules that eliminate the need for case-by-case decisions. For example, "I only check email twice a day" or "I don't shop for non-essentials more than once a month."</li>
        <li><strong>Practice Gratitude:</strong> Regularly expressing gratitude for what you have can counteract the tendency to imagine how things could have been better with a different choice.</li>
        <li><strong>Embrace Constraints:</strong> Sometimes, external constraints can be liberating. Consider how creative work often flourishes under limitations.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>
        The paradox of choice reveals a fundamental tension in modern life: we value freedom and autonomy, yet too much choice can undermine our well-being. The key is finding a balance—having enough options to exercise meaningful choice, but not so many that we're paralyzed or perpetually dissatisfied.
      </p>
      <p>
        As Schwartz puts it, "Learning to choose is hard. Learning to choose well is harder. And learning to choose well in a world of unlimited possibilities is harder still, perhaps too hard."
      </p>
      <p>
        By understanding the psychological impact of excessive choice, we can develop strategies to make decisions more effectively and find greater satisfaction in the choices we make. In doing so, we might discover that less really is more.
      </p>
    `,
    author: "Alex Johnson",
    date: "June 15, 2023",
    readTime: "8 min read",
    category: "Philosophy",
    tags: ["psychology", "decision-making", "wellbeing", "modern life"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Check if article exists, otherwise use a default
  const article = articleData[slug as keyof typeof articleData] || articleData["paradox-of-choice"];
  
  return (
    <>
      <Helmet>
        <title>{article.title} | Thoughts & Analysis</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} | Thoughts & Analysis`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://example.com/article/${slug}`} />
        <meta property="og:image" content={article.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />
        <link rel="canonical" href={`https://example.com/article/${slug}`} />
      </Helmet>

      <article className="py-12">
        <div className="container-custom max-w-4xl">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="pl-0 hover:pl-0">
              <Link to="/articles" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                All Articles
              </Link>
            </Button>
          </div>
          
          {/* Article header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">
                <Link to={`/category/${article.category.toLowerCase()}`}>{article.category}</Link>
              </Badge>
              {article.tags.map(tag => (
                <Badge variant="outline" key={tag}>{tag}</Badge>
              ))}
            </div>
            
            <h1 className="mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <User size={16} />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {article.readTime}
              </div>
            </div>
          </header>
          
          {/* Featured image */}
          <div className="mb-10 rounded-lg overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto"
            />
          </div>
          
          {/* Article content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10" 
            dangerouslySetInnerHTML={{ __html: article.content }}>
          </div>
          
          {/* Share section */}
          <Separator className="my-10" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Share2 size={18} /> Share this article
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" aria-label="Share on Twitter">
                <Twitter size={18} />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share on Facebook">
                <Facebook size={18} />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                <Linkedin size={18} />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share via Email">
                <Mail size={18} />
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ArticlePage;
