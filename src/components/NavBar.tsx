
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-serif text-xl font-bold tracking-tight">
            <span className="text-gradient">Thoughts</span>
            <span className="hidden sm:inline">&nbsp;& Analysis</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/articles" className="text-sm font-medium hover:text-primary transition-colors">
            Articles
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <ThemeToggle />
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 flex flex-col bg-background p-6 lg:hidden animate-fade-in">
            <nav className="flex flex-col gap-6 text-center">
              <Link 
                to="/" 
                className="text-lg font-medium hover:text-primary"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/articles" 
                className="text-lg font-medium hover:text-primary"
                onClick={toggleMenu}
              >
                Articles
              </Link>
              <Link 
                to="/categories" 
                className="text-lg font-medium hover:text-primary"
                onClick={toggleMenu}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium hover:text-primary"
                onClick={toggleMenu}
              >
                About
              </Link>
              <div className="flex justify-center gap-4 pt-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
