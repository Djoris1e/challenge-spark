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
        <div className="border-t border-border pt-3 mt-2">
          <p className="text-xs text-muted-foreground text-center mb-3">B Variants (with previews & more copy)</p>
          <div className="flex flex-col gap-3">
            <Link to="/b1">
              <Button variant="outline" className="w-full h-12 text-base border-border hover:border-primary/40">
                B1 — Horizontal Previews
              </Button>
            </Link>
            <Link to="/b2">
              <Button variant="outline" className="w-full h-12 text-base border-border hover:border-primary/40">
                B2 — Featured + List
              </Button>
            </Link>
            <Link to="/b3">
              <Button variant="outline" className="w-full h-12 text-base border-border hover:border-primary/40">
                B3 — Quick Play + Cards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
