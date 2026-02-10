import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Upload, Zap, ChevronRight } from "lucide-react";

const previews = [
  { id: 1, emoji: "😂", label: "Classic comedy clips", difficulty: "Easy" },
  { id: 2, emoji: "🤣", label: "Stand-up one-liners", difficulty: "Medium" },
  { id: 3, emoji: "💀", label: "Unexpected moments", difficulty: "Hard" },
  { id: 4, emoji: "😈", label: "Impossible tier", difficulty: "Expert" },
];

const VariantB2 = () => {
  const [activeTab, setActiveTab] = useState<"try" | "create">("try");

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8 pb-2 px-5">
        <h1 className="text-3xl font-black tracking-tighter text-foreground">
          No<span className="text-primary">LOL</span>
        </h1>
      </div>

      {/* Tagline banner */}
      <div className="px-5 pb-5">
        <p className="text-foreground text-lg font-semibold leading-snug">
          The game where laughing means losing.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Watch something funny. Keep a straight face. See how long you last.
        </p>
      </div>

      {/* Segmented control */}
      <div className="px-5 mb-5">
        <div className="bg-secondary rounded-2xl p-1 flex w-full">
          <button
            onClick={() => setActiveTab("try")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "try"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🎬 Play
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "create"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ✨ Create
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5">
        {activeTab === "try" ? (
          <div className="space-y-5">
            {/* Featured challenge */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] bg-secondary flex items-center justify-center relative">
                <span className="text-5xl">😂</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">Try Not to Laugh</p>
                    <p className="text-white/70 text-xs">2.1M players · 23% survival rate</p>
                  </div>
                  <div className="bg-primary rounded-full p-2.5">
                    <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* More challenges list */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                More challenges
              </p>
              <div className="space-y-2">
                {previews.slice(1).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <span className="text-xl">{p.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{p.label}</p>
                      <p className="text-xs text-muted-foreground">{p.difficulty}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Hero */}
            <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto relative">
                <Sparkles className="w-7 h-7 text-primary" />
                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Zap className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1.5">Turn anything into a challenge</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload a photo, meme, or video. AI creates a personalized "try not to laugh" challenge from it. Share with friends and watch them fail.
                </p>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold gap-2">
                <Upload className="w-5 h-5" />
                Create a Challenge
              </Button>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {[
                { num: "1", title: "Upload anything", desc: "A photo, video, or meme that you think is funny" },
                { num: "2", title: "AI does its thing", desc: "We enhance it, add timing, and make it harder to resist" },
                { num: "3", title: "Share & compete", desc: "Send to friends and see who survives without laughing" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-xs text-muted-foreground">Terms · Privacy</p>
      </div>
    </div>
  );
};

export default VariantB2;
