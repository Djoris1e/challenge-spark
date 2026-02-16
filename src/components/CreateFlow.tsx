import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X, ArrowLeft, Copy, Check, MoreHorizontal, Send, ImageIcon, Youtube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import promptBromance from "@/assets/prompt-bromance.jpg";
import promptHorse from "@/assets/prompt-horse.jpg";
import promptSelflove from "@/assets/prompt-selflove.jpg";
import promptNiccage from "@/assets/prompt-niccage.jpg";
import promptFlavortown from "@/assets/prompt-flavortown.jpg";
import promptPostmalone from "@/assets/prompt-postmalone.jpg";
import promptTigerking from "@/assets/prompt-tigerking.jpg";
import promptGiantnose from "@/assets/prompt-giantnose.jpg";
import promptWonkyeye from "@/assets/prompt-wonkyeye.jpg";
import promptFivehead from "@/assets/prompt-fivehead.jpg";
import promptNoteeth from "@/assets/prompt-noteeth.jpg";
import promptNobrows from "@/assets/prompt-nobrows.jpg";

type Step = "create" | "preview" | "published";
type ChallengeType = "ai-photo" | "youtube";

const suggestionGroups = [
  {
    title: "Awkward Romance",
    items: [
      { id: "bromance", img: promptBromance, title: "Bromance Kiss" },
      { id: "horse", img: promptHorse, title: "Horse Love" },
      { id: "selflove", img: promptSelflove, title: "Self Love" },
      { id: "niccage", img: promptNiccage, title: "Nic Cage Crash" },
    ],
  },
  {
    title: "Celebrity Makeover",
    items: [
      { id: "flavortown", img: promptFlavortown, title: "Flavortown" },
      { id: "postmalone", img: promptPostmalone, title: "Post Malone'd" },
      { id: "tigerking", img: promptTigerking, title: "Tiger King" },
      { id: "nobrows", img: promptNobrows, title: "No Brows" },
    ],
  },
  {
    title: "Weird Face",
    items: [
      { id: "giantnose", img: promptGiantnose, title: "Giant Nose" },
      { id: "wonkyeye", img: promptWonkyeye, title: "Wonky Eye" },
      { id: "fivehead", img: promptFivehead, title: "Fivehead" },
      { id: "noteeth", img: promptNoteeth, title: "No Teeth" },
    ],
  },
];

const CreateFlow = () => {
  const [step, setStep] = useState<Step>("create");
  const [challengeType, setChallengeType] = useState<ChallengeType>("ai-photo");
  const [photo, setPhoto] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  
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

  const handlePublishYoutube = () => {
    setStep("published");
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
    setYoutubeUrl("");
    setTransformedPhoto(null);
    setCopied(false);
    setChallengeType("ai-photo");
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
            variant="outline"
            className="w-full rounded-full h-12 text-base font-semibold border-border"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
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
          Pick a challenge type and send it to your friends!
        </p>
      </div>

      {/* Challenge type selector */}
      <div className="flex gap-2">
        {([
          { id: "ai-photo" as ChallengeType, label: "AI Photo", icon: <ImageIcon className="w-3.5 h-3.5" /> },
          { id: "youtube" as ChallengeType, label: "YouTube", icon: <Youtube className="w-3.5 h-3.5" /> },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setChallengeType(t.id)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
              challengeType === t.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {challengeType === "ai-photo" ? (
        <>
          {/* Photo upload */}
          <div className="space-y-2">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            {!photo ? (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full h-32 rounded-2xl border-2 border-dashed border-primary/40 bg-card flex items-center justify-center gap-3 cursor-pointer hover:border-primary/70 transition-colors"
              >
                <Camera className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Take or upload a photo</span>
              </button>
            ) : (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={photo} alt="Uploaded" className="w-full rounded-2xl" />
                <button
                  onClick={() => { setPhoto(null); setPrompt(""); }}
                  className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <button onClick={() => fileRef.current?.click()} className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Prompt input with integrated send */}
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the punchline…"
              className="bg-secondary border-border rounded-xl resize-none min-h-[48px] max-h-[100px] text-sm pr-12 py-3"
              rows={1}
            />
            <button
              disabled={!photo || !prompt.trim()}
              onClick={handleTransform}
              className="absolute right-2 bottom-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Suggestion thumbnails grouped by category */}
          <div className="space-y-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pick a funny prompt</p>
            {suggestionGroups.map((group) => (
              <div key={group.title} className="space-y-2.5">
                <p className="text-sm font-bold text-foreground">{group.title}</p>
                <div className="grid grid-cols-4 gap-3">
                  {group.items.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setPrompt(s.title);
                        if (photo) handleTransform();
                      }}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
                        <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[11px] font-medium text-foreground leading-tight truncate w-full text-center">{s.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* YouTube link input */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste a YouTube link…"
                className="w-full bg-secondary border border-border rounded-xl text-sm px-4 py-3 pr-12 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Youtube className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {youtubeUrl && /(?:youtube\.com|youtu\.be)/.test(youtubeUrl) && (
              <div className="rounded-xl overflow-hidden bg-card border border-border aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] || ""}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}
          </div>

          <Button
            disabled={!youtubeUrl.trim() || !/(?:youtube\.com|youtu\.be)/.test(youtubeUrl)}
            onClick={handlePublishYoutube}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold disabled:opacity-30"
          >
            Publish & Share
          </Button>
        </>
      )}
    </div>
  );
};

export default CreateFlow;
