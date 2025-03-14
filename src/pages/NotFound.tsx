
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NotFoundProps {
  language?: string;
  title?: string;
  message?: string;
}

const NotFound = ({ 
  language = "en", 
  title = "Page Not Found", 
  message = "The page you're looking for doesn't exist or has been moved." 
}: NotFoundProps) => {
  const isBangla = language === 'bn';
  
  return (
    <div className={`flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center ${isBangla ? 'font-bangla' : ''}`}>
      <h1 className="text-8xl font-bold mb-6 text-gradient">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
      
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        {message}
      </p>
      
      <Button asChild size="lg">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
