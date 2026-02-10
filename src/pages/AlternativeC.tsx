import { Button } from "@/components/ui/button";
import { Film, Sparkles } from "lucide-react";

const AlternativeC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Logo */}
      <div className="text-center pt-8 pb-4 px-5">
        <h1 className="text-4xl font-black tracking-tighter text-foreground">
          No<span className="text-primary">LOL</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Can you keep a straight face?</p>
      </div>

      {/* Split screen */}
      <div className="flex-1 flex flex-col px-5 pb-4 gap-0">
        {/* Top half - Try */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
            <Film className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Try a Challenge</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-[240px]">
            Keep a straight face while watching something hilarious
          </p>
          
          {/* Mini thumbnails */}
          <div className="flex gap-2 mb-5">
            {["😂", "😐", "😬", "🧊"].map((e, i) => (
              <div key={i} className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">
                {e}
              </div>
            ))}
          </div>

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11 px-8 text-sm font-semibold w-full max-w-[240px]">
            Start Playing
          </Button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent my-2" />

        {/* Bottom half - Create */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mb-4 relative">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Create Your Own</h2>
          <p className="text-muted-foreground text-sm mb-5 max-w-[240px]">
            Upload a photo and let AI turn it into a challenge
          </p>

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11 px-8 text-sm font-semibold w-full max-w-[240px]">
            Create with AI
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">Terms · Privacy</p>
      </div>
    </div>
  );
};

export default AlternativeC;
