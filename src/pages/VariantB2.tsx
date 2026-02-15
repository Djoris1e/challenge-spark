import { useState } from "react";
import { Play } from "lucide-react";
import CreateFlow from "@/components/CreateFlow";
import ChallengePlayer from "@/components/ChallengePlayer";
import challengeFeatured from "@/assets/challenge-featured.jpg";
import challengeCats from "@/assets/challenge-cats.jpg";
import challengeFails from "@/assets/challenge-fails.jpg";
import challengeDadjokes from "@/assets/challenge-dadjokes.jpg";
import challengeAnimals from "@/assets/challenge-animals.jpg";
import challengeMemes from "@/assets/challenge-memes.jpg";

const featuredChallenges = [
  { id: 1, img: challengeFeatured, players: "3.1M", survival: "9%" },
  { id: 2, img: challengeCats, players: "1.2M", survival: "31%" },
  { id: 3, img: challengeFails, players: "890K", survival: "18%" },
  { id: 4, img: challengeDadjokes, players: "670K", survival: "42%" },
  { id: 5, img: challengeAnimals, players: "2.3M", survival: "27%" },
  { id: 6, img: challengeMemes, players: "540K", survival: "12%" },
  { id: 7, img: challengeFeatured, players: "1.8M", survival: "15%" },
  { id: 8, img: challengeMemes, players: "960K", survival: "22%" },
  { id: 9, img: challengeCats, players: "2.5M", survival: "35%" },
  { id: 10, img: challengeAnimals, players: "1.1M", survival: "29%" },
  { id: 11, img: challengeFails, players: "780K", survival: "11%" },
  { id: 12, img: challengeDadjokes, players: "430K", survival: "48%" },
];

const recentChallenges = [
  { id: 13, img: challengeMemes, players: "12K", survival: "38%" },
  { id: 14, img: challengeAnimals, players: "45K", survival: "26%" },
  { id: 15, img: challengeFails, players: "8.2K", survival: "14%" },
  { id: 16, img: challengeCats, players: "67K", survival: "33%" },
  { id: 17, img: challengeDadjokes, players: "3.4K", survival: "51%" },
  { id: 18, img: challengeFeatured, players: "91K", survival: "19%" },
  { id: 19, img: challengeAnimals, players: "22K", survival: "41%" },
  { id: 20, img: challengeFails, players: "55K", survival: "8%" },
  { id: 21, img: challengeMemes, players: "18K", survival: "30%" },
  { id: 22, img: challengeCats, players: "7.1K", survival: "44%" },
  { id: 23, img: challengeDadjokes, players: "29K", survival: "25%" },
  { id: 24, img: challengeFeatured, players: "41K", survival: "17%" },
];

const allChallengesList = [...featuredChallenges, ...recentChallenges];
const allChallenges = allChallengesList.map((c, i) => ({
  img: c.img,
  funnyImg: allChallengesList[(i + 3) % allChallengesList.length].img,
}));

const VariantB2 = () => {
  const [activeTab, setActiveTab] = useState<"try" | "create">("try");
  const [challengeTab, setChallengeTab] = useState<"featured" | "recent">("featured");
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

  if (activeChallenge !== null) {
    const ch = allChallenges[activeChallenge % allChallenges.length];
    // First card forces "caught", second forces "survived" for testing
    const forceResult =
      activeChallenge === 0 ? "caught" as const :
      activeChallenge === 1 ? "survived" as const : undefined;
    return (
      <ChallengePlayer
        challengeImage={ch.img}
        funnyImage={ch.funnyImg}
        onHome={() => setActiveChallenge(null)}
        onCreate={() => {
          setActiveChallenge(null);
          setActiveTab("create");
        }}
        onNext={() => setActiveChallenge((i) => (i ?? 0) + 1)}
        forceResult={forceResult}
      />
    );
  }

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
          <div className="space-y-4">
            {/* Featured / Recent tabs */}
            <div className="flex gap-3">
              <button
                onClick={() => setChallengeTab("featured")}
                className={`text-sm font-bold pb-1 border-b-2 transition-colors ${
                  challengeTab === "featured"
                    ? "text-foreground border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setChallengeTab("recent")}
                className={`text-sm font-bold pb-1 border-b-2 transition-colors ${
                  challengeTab === "recent"
                    ? "text-foreground border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Recent
              </button>
            </div>

            {/* Challenge grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {(challengeTab === "featured" ? featuredChallenges : recentChallenges).map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => setActiveChallenge(challengeTab === "featured" ? i : featuredChallenges.length + i)}
                  className="aspect-square rounded-xl overflow-hidden relative cursor-pointer group"
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
