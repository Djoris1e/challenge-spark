import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 gap-6">
      <h1 className="text-4xl font-black tracking-tighter text-foreground">
        No<span className="text-primary">LOL</span>
      </h1>
      <p className="text-muted-foreground text-center">Choose a layout alternative:</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link to="/a">
          <Button variant="outline" className="w-full h-12 text-base border-border hover:border-primary/40">
            Alternative A — Side-by-Side Cards
          </Button>
        </Link>
        <Link to="/b">
          <Button variant="outline" className="w-full h-12 text-base border-border hover:border-primary/40">
            Alternative B — Tab Toggle
          </Button>
        </Link>
        <Link to="/c">
          <Button variant="outline" className="w-full h-12 text-base border-border hover:border-primary/40">
            Alternative C — Split Screen
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
