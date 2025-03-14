
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { CategorySection } from "@/components/CategorySection";
import { RecentPosts } from "@/components/RecentPosts";
import { AboutSection } from "@/components/AboutSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { CallToActionSection } from "@/components/CallToActionSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Thoughts & Analysis | A Personal Website</title>
        <meta name="description" content="A personal website sharing thoughtful analysis on philosophy, technology, and more." />
        <meta property="og:title" content="Thoughts & Analysis | A Personal Website" />
        <meta property="og:description" content="A personal website sharing thoughtful analysis on philosophy, technology, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:image" content="https://example.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thoughts & Analysis | A Personal Website" />
        <meta name="twitter:description" content="A personal website sharing thoughtful analysis on philosophy, technology, and more." />
        <meta name="twitter:image" content="https://example.com/og-image.png" />
        <link rel="canonical" href="https://example.com" />
      </Helmet>

      <HeroSection />
      <FeaturedPosts />
      <CategorySection />
      <RecentPosts />
      <AboutSection />
      <NewsletterSection />
      <CallToActionSection />
    </>
  );
};

export default Index;
