
import React from "react";
import { Share2, Twitter, Facebook, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ShareSection: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default ShareSection;
