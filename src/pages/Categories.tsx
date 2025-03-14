
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    name: "Philosophy",
    description: "Explorations of meaning, ethics, and the human condition",
    slug: "philosophy",
    count: 12,
    icon: "🧠",
    featured: "The Paradox of Choice: Why More Options Lead to Less Happiness"
  },
  {
    name: "Technology",
    description: "Analysis of emerging tech trends and their societal impact",
    slug: "technology",
    count: 8,
    icon: "💻",
    featured: "Digital Minimalism: Reclaiming Attention in the Age of Distraction"
  },
  {
    name: "Psychology",
    description: "Understanding the mind and human behavior patterns",
    slug: "psychology",
    count: 7,
    icon: "🧪",
    featured: "Cognitive Biases: The Hidden Forces That Shape Our Decisions"
  },
  {
    name: "Culture",
    description: "Reflections on art, media, and cultural movements",
    slug: "culture",
    count: 10,
    icon: "🎭",
    featured: "The Rise of Slow Media in a Fast-Paced Digital World"
  },
  {
    name: "Politics",
    description: "Thoughtful perspectives on governance and policy",
    slug: "politics",
    count: 6,
    icon: "🏛️",
    featured: "Beyond Polarization: Finding Common Ground in Divided Times"
  },
  {
    name: "Economics",
    description: "Insights on markets, incentives, and financial systems",
    slug: "economics",
    count: 5,
    icon: "📊",
    featured: "The True Cost of Convenience: Economic Externalities in Modern Life"
  },
  {
    name: "Mindfulness",
    description: "Practices for presence, focus, and mental clarity",
    slug: "mindfulness",
    count: 4,
    icon: "🧘",
    featured: "The Value of Boredom in a Hyperstimulated World"
  },
  {
    name: "Ethics",
    description: "Examining right and wrong in complex situations",
    slug: "ethics",
    count: 9,
    icon: "⚖️",
    featured: "The Ethics of Artificial Intelligence: Navigating the New Frontier"
  },
  {
    name: "Productivity",
    description: "Ideas for meaningful work and effective processes",
    slug: "productivity",
    count: 6,
    icon: "⚡",
    featured: "The Illusion of Productivity: Quality vs. Quantity in Work"
  },
  {
    name: "Knowledge",
    description: "Theories of learning and information management",
    slug: "knowledge",
    count: 5,
    icon: "📚",
    featured: "Digital Gardens: A New Framework for Personal Knowledge Management"
  }
];

const Categories = () => {
  return (
    <>
      <Helmet>
        <title>Categories | Thoughts & Analysis</title>
        <meta name="description" content="Explore topics including philosophy, technology, psychology, and more." />
        <meta property="og:title" content="Categories | Thoughts & Analysis" />
        <meta property="og:description" content="Explore topics including philosophy, technology, psychology, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/categories" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://example.com/categories" />
      </Helmet>

      <section className="py-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h1 className="mb-4">Categories</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse all topics and explore my collection of thoughts and analysis across various subjects
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link to={`/category/${category.slug}`} key={category.slug}>
                <Card className="h-full card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">{category.description}</CardDescription>
                    <div className="text-sm font-medium mb-2">
                      Featured: <span className="text-muted-foreground">{category.featured}</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {category.count} {category.count === 1 ? 'article' : 'articles'}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
