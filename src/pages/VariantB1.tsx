import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Shuffle, Upload, Zap, Play } from "lucide-react";

const previews = [
  { id: 1, emoji: "😂", label: "Try not to laugh", views: "2.1M" },
  { id: 2, emoji: "🤣", label: "Dad jokes edition", views: "890k" },
  { id: 3, emoji: "😭", label: "Wholesome fails", views: "1.4M" },
];

const VariantB1 = () => {
  const [activeTab, setActiveTab] = useState<"try" | "create">("try");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center max-w-md mx-auto">
      {/* Logo */}
      <div className="pt-8 pb-4">
        <h1 className="text-4xl font-black tracking-tighter text-foreground">
          No<span className="text-primary">LOL</span>
        </h1>
        <p className="text-center text-muted-foreground text-sm mt-1">
          Can you keep a straight face?
        </p>
      </div>

      {/* Pill toggle */}
      <div className="bg-secondary rounded-full p-1 flex mb-6 w-[280px]">
        <button
          onClick={() => setActiveTab("try")}
          className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all ${
            activeTab === "try"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Try a Challenge
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all ${
            activeTab === "create"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Create Your Own
        </button>
      </div>

      {/* Tab content */}
      <div className="w-full px-5 flex-1">
        {activeTab === "try" ? (
          <div className="space-y-6">
            {/* Explainer */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">Watch. Don't laugh. Win.</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We'll play you a video designed to make you crack up. Your camera watches your face — if you laugh, you lose. Simple as that.
              </p>
            </div>

            {/* CTA */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold gap-2">
              <Shuffle className="w-5 h-5" />
              Start a Random Challenge
            </Button>

            {/* Preview carousel */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                Trending now
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {previews.map((p) => (
                  <div
                    key={p.id}
                    className="min-w-[140px] bg-card border border-border rounded-2xl p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <div className="w-full aspect-video bg-secondary rounded-xl flex items-center justify-center relative">
                      <span className="text-3xl">{p.emoji}</span>
                      <div className="absolute bottom-1.5 right-1.5 bg-black/60 rounded-full p-1">
                        <Play className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-foreground text-center leading-tight">{p.label}</span>
                    <span className="text-[10px] text-muted-foreground">{p.views} views</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="flex justify-between gap-2 pt-2">
              {[
                { emoji: "🎬", label: "Watch", desc: "A funny video plays" },
                { emoji: "😐", label: "Hold it", desc: "Keep a straight face" },
                { emoji: "🏆", label: "Survive", desc: "Don't crack up" },
              ].map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 text-center">
                  <span className="text-2xl">{step.emoji}</span>
                  <span className="text-xs font-semibold text-foreground">{step.label}</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-6 pt-2">
            {/* AI icon */}
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center relative">
              <Sparkles className="w-9 h-9 text-primary" />
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Make your friends lose it</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload any photo or video and our AI will turn it into a personalized challenge. Send it to friends and see who cracks first.
              </p>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold gap-2">
              <Upload className="w-5 h-5" />
              Create with AI
            </Button>

            <div className="grid grid-cols-3 gap-4 pt-2 w-full">
              {[
                { emoji: "📸", label: "Upload", desc: "Pick a photo or video" },
                { emoji: "🤖", label: "AI Magic", desc: "We make it hilarious" },
                { emoji: "🔗", label: "Share", desc: "Challenge your friends" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-xl">{step.emoji}</span>
                  <span className="text-xs font-semibold text-foreground">{step.label}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-6">
        <p className="text-xs text-muted-foreground">Terms · Privacy</p>
      </div>
    </div>
  );
};

export default VariantB1;
