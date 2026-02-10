import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Shuffle, Upload, Zap, Play, Users } from "lucide-react";

const previews = [
  { id: 1, emoji: "😂", thumb: "Comedy clips", players: "2.1M" },
  { id: 2, emoji: "🤣", thumb: "Dad jokes", players: "890k" },
  { id: 3, emoji: "💀", thumb: "Unexpected", players: "1.4M" },
];

const VariantB3 = () => {
  const [activeTab, setActiveTab] = useState<"try" | "create">("try");

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Logo + intro */}
      <div className="pt-8 pb-3 px-5 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-foreground">
          No<span className="text-primary">LOL</span>
        </h1>
        <p className="text-muted-foreground text-[13px] mt-2 leading-relaxed max-w-[260px] mx-auto">
          Watch something hilarious. Keep a straight face. If you laugh, you lose.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex justify-center gap-6 pb-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5 text-primary" />
          <span><span className="text-foreground font-semibold">4.9M</span> players</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="text-foreground font-semibold">23%</span> survive
        </div>
      </div>

      {/* Toggle */}
      <div className="px-5 mb-5">
        <div className="bg-secondary/60 backdrop-blur rounded-full p-1 flex">
          <button
            onClick={() => setActiveTab("try")}
            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "try"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Try a Challenge
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "create"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Create Your Own
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5">
        {activeTab === "try" ? (
          <div className="space-y-5">
            {/* Quick play CTA */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl h-14 text-base font-semibold gap-2.5 shadow-lg shadow-primary/20">
              <Shuffle className="w-5 h-5" />
              Quick Play — Random Challenge
            </Button>

            {/* Preview grid */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                Popular right now
              </p>
              <div className="space-y-2.5">
                {previews.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 bg-card border border-border rounded-2xl p-2.5 cursor-pointer hover:border-primary/40 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center relative shrink-0">
                      <span className="text-2xl">{p.emoji}</span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-colors flex items-center justify-center">
                        <Play className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{p.thumb}</p>
                      <p className="text-xs text-muted-foreground">{p.players} players</p>
                    </div>
                    <div className="text-primary text-xs font-semibold">Play →</div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">How it works</p>
              <div className="flex gap-2">
                {[
                  { emoji: "🎬", label: "Watch" },
                  { emoji: "→", label: "" },
                  { emoji: "😐", label: "Hold it" },
                  { emoji: "→", label: "" },
                  { emoji: "🏆", label: "Win" },
                ].map((s, i) =>
                  s.label ? (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xl">{s.emoji}</span>
                      <span className="text-[11px] font-semibold text-foreground">{s.label}</span>
                    </div>
                  ) : (
                    <span key={i} className="text-muted-foreground self-center text-xs">→</span>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Create hero card */}
            <div className="bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto relative">
                <Sparkles className="w-7 h-7 text-primary" />
                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Zap className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-foreground">Make something unforgettable</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Got a meme, a photo, or a clip that always gets you? Upload it and AI will craft a challenge around it. Then dare your friends to watch without laughing.
                </p>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold gap-2">
                <Upload className="w-5 h-5" />
                Create with AI
              </Button>
            </div>

            {/* Steps */}
            <div className="flex gap-3">
              {[
                { emoji: "📸", title: "Upload", desc: "Any photo, meme, or clip" },
                { emoji: "🤖", title: "AI Magic", desc: "We make it funnier" },
                { emoji: "🔗", title: "Share", desc: "Challenge anyone" },
              ].map((step, i) => (
                <div key={i} className="flex-1 bg-card border border-border rounded-xl p-3 text-center">
                  <span className="text-lg">{step.emoji}</span>
                  <p className="text-xs font-semibold text-foreground mt-1">{step.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{step.desc}</p>
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

export default VariantB3;
