import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, X, ArrowLeft, Copy, Check, MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Step = "create" | "preview" | "published";

const suggestions = ["Bromance Kiss", "Triple Threat", "Bar Buddies Wedding", "Putin Crash", "Fart Cloud"];

const CreateFlow = () => {
  const [step, setStep] = useState<Step>("create");
  const [photo, setPhoto] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [transformedPhoto, setTransformedPhoto] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTransform = () => {
    // Simulate AI transformation — in real app this calls the AI
    setTransformedPhoto(photo);
    setStep("preview");
  };

  const handlePublish = () => {
    setStep("published");
  };

  const handleTryDifferentEdit = () => {
    setStep("create");
  };

  const handleCreateAnother = () => {
    setPhoto(null);
    setPrompt("");
    setHasPermission(false);
    setTransformedPhoto(null);
    setCopied(false);
    setStep("create");
  };

  const shareUrl = "https://nolol.app/c/" + Math.random().toString(36).slice(2, 14);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = "Try not to laugh at this 🤣";
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "x":
        url = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({ title: "NoLOL Challenge", text, url: shareUrl });
          return;
        }
        handleCopy();
        return;
    }
    window.open(url, "_blank");
  };

  // ── Preview Step ──
  if (step === "preview") {
    return (
      <div className="space-y-6">
        <button onClick={handleTryDifferentEdit} className="flex items-center gap-1.5 text-primary text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-bold text-foreground">Your Challenge</h2>
          <p className="text-sm text-muted-foreground">Here's what your friends will see</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold text-center">
              First: The Setup
            </p>
            <div className="rounded-xl overflow-hidden aspect-[3/4]">
              <img src={photo!} alt="Original" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold text-center">
              Then: The Punchline
            </p>
            <div className="rounded-xl overflow-hidden aspect-[3/4]">
              <img src={transformedPhoto!} alt="Transformed" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            onClick={handlePublish}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold"
          >
            Publish & Share
          </Button>
          <Button
            onClick={handleTryDifferentEdit}
            variant="secondary"
            className="w-full rounded-full h-12 text-base font-semibold"
          >
            Try Different Edit
          </Button>
        </div>
      </div>
    );
  }

  // ── Published Step ──
  if (step === "published") {
    return (
      <div className="space-y-6 text-center pt-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Challenge Published 🤣</h2>
          <p className="text-sm text-muted-foreground">Send it to someone and watch them try not to laugh</p>
        </div>

        {/* Share buttons */}
        <div className="flex justify-center gap-5">
          {[
            { id: "whatsapp", label: "WhatsApp", icon: "💬", bg: "bg-green-500" },
            { id: "x", label: "X", icon: "𝕏", bg: "bg-secondary" },
            { id: "telegram", label: "Telegram", icon: "✈️", bg: "bg-blue-500" },
            { id: "more", label: "More", icon: <MoreHorizontal className="w-5 h-5" />, bg: "bg-secondary" },
          ].map((p) => (
            <button key={p.id} onClick={() => handleShare(p.id)} className="flex flex-col items-center gap-1.5">
              <div className={`w-12 h-12 ${p.bg} rounded-2xl flex items-center justify-center text-white text-lg`}>
                {typeof p.icon === "string" ? p.icon : p.icon}
              </div>
              <span className="text-[11px] text-muted-foreground">{p.label}</span>
            </button>
          ))}
        </div>

        {/* Copy link */}
        <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2.5 mx-auto max-w-xs">
          <span className="text-xs text-muted-foreground truncate flex-1">{shareUrl}</span>
          <button onClick={handleCopy} className="text-primary text-sm font-semibold shrink-0 flex items-center gap-1">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            onClick={() => window.open(shareUrl, "_blank")}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold"
          >
            Try It Yourself
          </Button>
          <button onClick={handleCreateAnother} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Create Another Challenge
          </button>
        </div>
      </div>
    );
  }

  // ── Create Step ──
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

      {/* Step 2 — Prompt */}
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
          onClick={handleTransform}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold disabled:opacity-40"
        >
          Transform with AI
        </Button>
      </div>
    </div>
  );
};

export default CreateFlow;
