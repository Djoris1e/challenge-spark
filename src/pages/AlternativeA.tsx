import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Sparkles, ChevronRight } from "lucide-react";

const challenges = [
  { id: 1, title: "Try Not to Laugh", emoji: "😂" },
  { id: 2, title: "Straight Face", emoji: "😐" },
  { id: 3, title: "Don't Smile", emoji: "😬" },
  { id: 4, title: "Keep Cool", emoji: "🧊" },
  { id: 5, title: "No Reaction", emoji: "🪨" },
];

const AlternativeA = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 py-8 max-w-md mx-auto">
      {/* Logo */}
      <div className="mb-2">
        <h1 className="text-4xl font-black tracking-tighter text-foreground">
          No<span className="text-primary">LOL</span>
        </h1>
      </div>
      <p className="text-muted-foreground text-sm mb-8">Can you keep a straight face?</p>

      {/* Two equal CTA cards */}
      <div className="w-full space-y-4 mb-8">
        <Card className="bg-card border-border hover:border-primary/40 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <Film className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground mb-1">Try a Challenge</h2>
              <p className="text-muted-foreground text-sm leading-snug">Keep a straight face while watching something hilarious</p>
            </div>
            <Button size="sm" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">
              Play
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/40 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground mb-1">Create Your Own</h2>
              <p className="text-muted-foreground text-sm leading-snug">Upload a photo and let AI make it hilariously funny</p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary/10 rounded-full px-5">
              Create
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Popular challenges scroll */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Popular</h3>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {challenges.map((c) => (
            <div
              key={c.id}
              className="shrink-0 w-20 h-20 rounded-xl bg-secondary flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="text-[10px] text-muted-foreground font-medium text-center leading-tight px-1">{c.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4">
        <p className="text-xs text-muted-foreground">
          Terms · Privacy
        </p>
      </div>
    </div>
  );
};

export default AlternativeA;
