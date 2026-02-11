import { useState, useEffect, useRef, useCallback } from "react";
import { Home, Plus, RotateCcw, Download, Share2, ChevronDown, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Phase = "countdown" | "active" | "result" | "review";

interface ChallengePlayerProps {
  challengeImage: string;
  funnyImage: string;
  onHome: () => void;
  onCreate: () => void;
  onNext: () => void;
}

const ChallengePlayer = ({
  challengeImage,
  funnyImage,
  onHome,
  onCreate,
  onNext,
}: ChallengePlayerProps) => {
  const [phase, setPhase] = useState<Phase>("countdown");
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(10);
  const [result, setResult] = useState<"caught" | "survived" | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start webcam
  useEffect(() => {
    let cancelled = false;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        /* user denied camera */
      });
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Countdown phase
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      setPhase("active");
      return;
    }
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, countdown]);

  // Active phase
  useEffect(() => {
    if (phase !== "active") return;
    if (timer <= 0) {
      setResult("survived");
      setPhase("result");
      return;
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timer]);

  // Auto-transition from result to review
  useEffect(() => {
    if (phase !== "result") return;
    const id = setTimeout(() => setPhase("review"), 2500);
    return () => clearTimeout(id);
  }, [phase]);

  const handleLaughed = useCallback(() => {
    if (phase !== "active") return;
    setResult("caught");
    setPhase("result");
  }, [phase]);

  const handleRestart = useCallback(() => {
    setPhase("countdown");
    setCountdown(5);
    setTimer(10);
    setResult(null);
  }, []);

  const handleSave = () => {
    toast({ title: "Saved!", description: "Challenge saved to your library." });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "NoLOL Challenge", text: "Can you survive this? 😂", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!" });
    }
  };

  // Which image to show on top
  const topImage =
    phase === "countdown" || phase === "review" ? challengeImage : funnyImage;

  // Overlay color
  const overlayClass =
    phase === "result" && result === "caught"
      ? "bg-destructive/30"
      : phase === "result" && result === "survived"
        ? "bg-green-500/30"
        : "";

  // Divider content
  const renderDivider = () => {
    if (phase === "countdown") {
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Get ready…
          </span>
          <span className="text-5xl font-black text-foreground tabular-nums drop-shadow-lg">
            {countdown}
          </span>
        </div>
      );
    }
    if (phase === "active") {
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">
            Try not to laugh
          </span>
          <span className="text-4xl font-black text-foreground tabular-nums">
            0:{timer.toString().padStart(2, "0")}
          </span>
        </div>
      );
    }
    if (phase === "result") {
      return (
        <span
          className={`text-4xl font-black uppercase tracking-wider drop-shadow-lg ${
            result === "caught" ? "text-destructive" : "text-green-400"
          }`}
          style={{ textShadow: "0 2px 20px rgba(0,0,0,.6)" }}
        >
          {result === "caught" ? "CAUGHT! 😂" : "YOU WON! 🏆"}
        </span>
      );
    }
    if (phase === "review") {
      return (
        <span className="text-muted-foreground text-sm font-medium">
          Challenge complete
        </span>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col h-screen overflow-hidden">
      {/* Top nav */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-[env(safe-area-inset-top,12px)] pb-2">
        <button onClick={onHome} className="p-2 rounded-full bg-secondary/60 backdrop-blur-sm">
          <Home className="w-5 h-5 text-foreground" />
        </button>
        <button onClick={onCreate} className="p-2 rounded-full bg-secondary/60 backdrop-blur-sm">
          <Plus className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Result overlay */}
      {phase === "result" && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${overlayClass}`}
        />
      )}

      {/* Top half — challenge image */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <img
          src={topImage}
          alt="Challenge"
          className="w-full h-full object-cover"
        />
        {phase === "review" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <div className="bg-foreground/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-10 h-10 text-foreground fill-foreground" />
            </div>
            <span className="text-foreground text-xs mt-2 font-medium">
              Watch recording
            </span>
          </div>
        )}
      </div>

      {/* Divider strip */}
      <div className="relative z-10 flex items-center justify-center h-14 bg-card border-y border-border shrink-0">
        {renderDivider()}
      </div>

      {/* Bottom half — webcam */}
      <div className="relative flex-1 min-h-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover -scale-x-100"
        />

        {/* "I laughed" tap zone during active phase */}
        {phase === "active" && (
          <button
            onClick={handleLaughed}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="bg-destructive/80 text-destructive-foreground px-6 py-3 rounded-2xl text-sm font-bold backdrop-blur-sm animate-pulse">
              😂 I laughed!
            </span>
          </button>
        )}
      </div>

      {/* Right-side action buttons (review phase) */}
      {phase === "review" && (
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
          <button onClick={handleRestart} className="flex flex-col items-center gap-1">
            <div className="bg-secondary/80 backdrop-blur-sm rounded-full p-3">
              <RotateCcw className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Again</span>
          </button>
          <button onClick={handleSave} className="flex flex-col items-center gap-1">
            <div className="bg-secondary/80 backdrop-blur-sm rounded-full p-3">
              <Download className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Save</span>
          </button>
          <button onClick={handleShare} className="flex flex-col items-center gap-1">
            <div className="bg-secondary/80 backdrop-blur-sm rounded-full p-3">
              <Share2 className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Share</span>
          </button>
        </div>
      )}

      {/* Next button — always visible */}
      <button
        onClick={onNext}
        className="absolute bottom-6 right-3 z-20 bg-primary rounded-full p-3 shadow-lg"
      >
        <ChevronDown className="w-5 h-5 text-primary-foreground" />
      </button>
    </div>
  );
};

export default ChallengePlayer;
