import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Camera, X } from "lucide-react";
import challengeFeatured from "@/assets/challenge-featured.jpg";
import challengeCats from "@/assets/challenge-cats.jpg";
import challengeFails from "@/assets/challenge-fails.jpg";
import challengeDadjokes from "@/assets/challenge-dadjokes.jpg";
import challengeAnimals from "@/assets/challenge-animals.jpg";
import challengeMemes from "@/assets/challenge-memes.jpg";

const challenges = [
  { id: 1, img: challengeCats },
  { id: 2, img: challengeFails },
  { id: 3, img: challengeDadjokes },
  { id: 4, img: challengeAnimals },
  { id: 5, img: challengeMemes },
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
              <div className="grid grid-cols-3 gap-2">
                {challenges.map((c) => (
                  <div
                    key={c.id}
                    className="aspect-square rounded-xl overflow-hidden relative cursor-pointer group"
                  >
                    <img src={c.img} alt="Challenge" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white drop-shadow-lg" />
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

const suggestions = ["Bromance Kiss", "Triple Threat", "Bar Buddies Wedding", "Putin Crash", "Fart Cloud"];

const CreateFlow = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1.5">
        <h2 className="text-xl font-bold text-foreground">Create Challenge</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your friends see the normal photo first, then the AI version. Try not to laugh!
        </p>
      </div>

      {/* Step 1 — Photo upload */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">1</span>
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">Take or upload a photo</span>
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

        {!photo ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full aspect-square rounded-2xl border-2 border-dashed border-primary/40 bg-card flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/70 transition-colors"
          >
            <Camera className="w-10 h-10 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Tap to take or upload photo</span>
          </button>
        ) : (
          <div className="space-y-2">
            <div className="relative rounded-2xl overflow-hidden">
              <img src={photo} alt="Uploaded" className="w-full object-cover rounded-2xl" />
              <button
                onClick={() => { setPhoto(null); setPrompt(""); }}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <button onClick={() => fileRef.current?.click()} className="text-sm text-primary font-medium w-full text-center">
              Change photo
            </button>
          </div>
        )}
      </div>

      {/* Step 2 — Prompt (visible after photo) */}
      {photo && (
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">2</span>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Describe the punchline</span>
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. add Vladimir Putin standing behind them with his arms around all three men"
            className="bg-secondary border-border rounded-xl resize-none min-h-[80px] text-sm"
          />

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setPrompt(s)}
                  className="px-3 py-1.5 rounded-full bg-secondary text-xs text-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Permission + CTA */}
      <div className="space-y-4 pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Checkbox checked={hasPermission} onCheckedChange={(v) => setHasPermission(v === true)} />
          <span className="text-sm text-muted-foreground">I have permission to use this photo</span>
        </label>

        <Button
          disabled={!photo || !hasPermission}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold disabled:opacity-40"
        >
          Transform with AI
        </Button>
      </div>
    </div>
  );
};

export default VariantB2;
