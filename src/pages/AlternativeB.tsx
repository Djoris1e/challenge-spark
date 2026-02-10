import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Film, Sparkles, Shuffle, Upload, Zap } from "lucide-react";

const challenges = [
  { id: 1, title: "Try Not to Laugh", emoji: "😂", players: "12k" },
  { id: 2, title: "Straight Face", emoji: "😐", players: "8k" },
  { id: 3, title: "Don't Smile", emoji: "😬", players: "6k" },
  { id: 4, title: "Keep Cool", emoji: "🧊", players: "4k" },
];

const steps = [
  { icon: Film, label: "Watch", desc: "A funny video plays" },
  { icon: "😐", label: "Hold", desc: "Keep a straight face" },
  { icon: "🏆", label: "Win", desc: "Beat the challenge" },
];

const AlternativeB = () => {
  const [activeTab, setActiveTab] = useState<"try" | "create">("try");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center max-w-md mx-auto">
      {/* Logo */}
      <div className="pt-8 pb-6">
        <h1 className="text-4xl font-black tracking-tighter text-foreground">
          No<span className="text-primary">LOL</span>
        </h1>
      </div>

      {/* Pill toggle */}
      <div className="bg-secondary rounded-full p-1 flex mb-8 w-[280px]">
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
            {/* Challenge thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/40 transition-colors"
                >
                  <span className="text-4xl">{c.emoji}</span>
                  <span className="text-sm font-semibold text-foreground">{c.title}</span>
                  <span className="text-xs text-muted-foreground">{c.players} players</span>
                </div>
              ))}
            </div>

            {/* Random challenge button */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold gap-2">
              <Shuffle className="w-5 h-5" />
              Start Random Challenge
            </Button>

            {/* How it works */}
            <div className="flex justify-between gap-2 pt-2">
              {steps.map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    {typeof step.icon === "string" ? (
                      <span className="text-xl">{step.icon}</span>
                    ) : (
                      <step.icon className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{step.label}</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-6 pt-4">
            {/* AI sparkle hero */}
            <div className="w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center relative">
              <Sparkles className="w-10 h-10 text-primary" />
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Create with AI</h2>
              <p className="text-muted-foreground leading-relaxed">
                Upload a photo and let AI turn it into a hilarious challenge your friends can't beat
              </p>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold gap-2">
              <Upload className="w-5 h-5" />
              Create with AI
            </Button>

            <div className="grid grid-cols-3 gap-4 pt-4 w-full">
              {["📸 Upload Photo", "🤖 AI Magic", "🎉 Share"].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-sm">{step.split(" ")[0]}</span>
                  <span className="text-[11px] text-muted-foreground">{step.split(" ").slice(1).join(" ")}</span>
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

export default AlternativeB;
