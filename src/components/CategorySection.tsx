
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryCounts } from "@/utils/articleUtils";

const categoryData = [
  {
    name: "Philosophy",
    description: "Explorations of meaning, ethics, and the human condition",
    slug: "philosophy",
    count: 0,
    icon: "🧠"
  },
  {
    name: "Technology",
    description: "Analysis of emerging tech trends and their societal impact",
    slug: "technology",
    count: 0,
    icon: "💻"
  },
  {
    name: "Psychology",
    description: "Understanding the mind and human behavior patterns",
    slug: "psychology",
    count: 0,
    icon: "🧪"
  },
  {
    name: "Culture",
    description: "Reflections on art, media, and cultural movements",
    slug: "culture",
    count: 0,
    icon: "🎭"
  },
  {
    name: "Politics",
    description: "Thoughtful perspectives on governance and policy",
    slug: "politics",
    count: 0,
    icon: "🏛️"
  },
  {
    name: "Economics",
    description: "Insights on markets, incentives, and financial systems",
    slug: "economics",
    count: 0,
    icon: "📊"
  }
];

export function CategorySection() {
  const [categories, setCategories] = useState(categoryData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateCategoryCounts = async () => {
      try {
        const counts = await getCategoryCounts();
        const updatedCategories = categories.map(category => ({
          ...category,
          count: counts[category.slug.toLowerCase()] || 0
        }));
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    updateCategoryCounts();
  }, []);

  return (
    <section className="py-16 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="mb-3">Explore Topics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive into my collection of thoughts and analysis across various subjects
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
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                  <div className="mt-4 text-sm font-medium text-muted-foreground">
                    {category.count} {category.count === 1 ? 'article' : 'articles'}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
