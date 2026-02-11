import { useState } from "react";
import { Play } from "lucide-react";
import CreateFlow from "@/components/CreateFlow";
import challengeFeatured from "@/assets/challenge-featured.jpg";
import challengeCats from "@/assets/challenge-cats.jpg";
import challengeFails from "@/assets/challenge-fails.jpg";
import challengeDadjokes from "@/assets/challenge-dadjokes.jpg";
import challengeAnimals from "@/assets/challenge-animals.jpg";
import challengeMemes from "@/assets/challenge-memes.jpg";

const challenges = [
  { id: 1, img: challengeCats, players: "1.2M", survival: "31%" },
  { id: 2, img: challengeFails, players: "890K", survival: "18%" },
  { id: 3, img: challengeDadjokes, players: "670K", survival: "42%" },
  { id: 4, img: challengeAnimals, players: "2.3M", survival: "27%" },
  { id: 5, img: challengeMemes, players: "540K", survival: "12%" },
  { id: 6, img: challengeFeatured, players: "3.1M", survival: "9%" },
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
            <div className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/40 transition-colors">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src={challengeFeatured} alt="Try Not to Laugh" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">Try Not to Laugh</p>
                    <p className="text-white/70 text-xs">2.1M players · 23% survival rate</p>
                  </div>
                  <div className="bg-primary rounded-full p-2.5 shadow-lg">
                    <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* More challenges */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                More challenges
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {challenges.map((c) => (
                  <div
                    key={c.id}
                    className="aspect-[3/4] rounded-xl overflow-hidden relative cursor-pointer group"
                  >
                    <img src={c.img} alt="Challenge" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <div className="flex items-center gap-1.5 text-white/90">
                        <Play className="w-3 h-3 fill-white/90" />
                        <span className="text-xs font-semibold">{c.players}</span>
                      </div>
                      <p className="text-[10px] text-white/60 mt-0.5">{c.survival} survival</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <CreateFlow />
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
