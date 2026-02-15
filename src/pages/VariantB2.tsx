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

type SwitcherStyle = "pill" | "underline" | "chips" | "dropdown" | "text";

const VariantB2 = () => {
  const [activeTab, setActiveTab] = useState<"try" | "create">("try");
  const [challengeTab, setChallengeTab] = useState<"featured" | "recent">("featured");
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [switcherStyle, setSwitcherStyle] = useState<SwitcherStyle>("pill");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  // Render the category switcher based on selected style
  const renderSwitcher = () => {
    switch (switcherStyle) {
      case "pill":
        return (
          <div className="bg-muted rounded-full p-1 flex w-fit">
            <button
              onClick={() => setChallengeTab("featured")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                challengeTab === "featured"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setChallengeTab("recent")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                challengeTab === "recent"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Recent
            </button>
          </div>
        );
      case "underline":
        return (
          <div className="flex gap-4 border-b border-border">
            <button
              onClick={() => setChallengeTab("featured")}
              className={`text-sm font-bold pb-2 border-b-2 transition-colors -mb-px ${
                challengeTab === "featured"
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setChallengeTab("recent")}
              className={`text-sm font-bold pb-2 border-b-2 transition-colors -mb-px ${
                challengeTab === "recent"
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              Recent
            </button>
          </div>
        );
      case "chips":
        return (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["featured", "recent"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setChallengeTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                  challengeTab === tab
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <div className="relative w-fit">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {challengeTab === "featured" ? "Featured" : "Recent"}
              <svg className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-md z-50 min-w-[120px] py-1">
                <button
                  onClick={() => { setChallengeTab("featured"); setDropdownOpen(false); }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors ${challengeTab === "featured" ? "font-bold text-foreground" : "text-muted-foreground"}`}
                >
                  Featured
                </button>
                <button
                  onClick={() => { setChallengeTab("recent"); setDropdownOpen(false); }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors ${challengeTab === "recent" ? "font-bold text-foreground" : "text-muted-foreground"}`}
                >
                  Recent
                </button>
              </div>
            )}
          </div>
        );
      case "text":
        return (
          <div className="flex gap-4">
            <button
              onClick={() => setChallengeTab("featured")}
              className={`text-sm pb-1 border-b-2 transition-all ${
                challengeTab === "featured"
                  ? "text-foreground font-black border-foreground"
                  : "text-muted-foreground font-medium border-transparent hover:text-foreground"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setChallengeTab("recent")}
              className={`text-sm pb-1 border-b-2 transition-all ${
                challengeTab === "recent"
                  ? "text-foreground font-black border-foreground"
                  : "text-muted-foreground font-medium border-transparent hover:text-foreground"
              }`}
            >
              Recent
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* TEMP: Style selector */}
      <div className="px-5 pt-2 pb-1">
        <select
          value={switcherStyle}
          onChange={(e) => setSwitcherStyle(e.target.value as SwitcherStyle)}
          className="text-xs px-2 py-1 rounded border border-border bg-background text-foreground"
        >
          <option value="pill">Style: Pill Toggle</option>
          <option value="underline">Style: Underline Tabs</option>
          <option value="chips">Style: Chips</option>
          <option value="dropdown">Style: Dropdown</option>
          <option value="text">Style: Bold Text</option>
        </select>
      </div>

      {/* Header */}
      <div className="pt-4 pb-2 px-5">
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
            {/* Dynamic switcher */}
            {renderSwitcher()}

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
