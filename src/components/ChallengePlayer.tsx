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
  forceResult?: "caught" | "survived" | null;
}

const ChallengePlayer = ({
  challengeImage,
  funnyImage,
  onHome,
  onCreate,
  onNext,
  forceResult,
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
      // If forceResult, skip active and go straight to result
      if (forceResult) {
        setResult(forceResult);
        setPhase("result");
      } else {
        setPhase("active");
      }
      return;
    }
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, countdown, forceResult]);

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

  // Overlay color — persist into review phase too
  const overlayClass =
    (phase === "result" || phase === "review") && result === "caught"
      ? "bg-destructive/30"
      : (phase === "result" || phase === "review") && result === "survived"
        ? "bg-green-500/30"
        : "";

  // Overlay text content (rendered centered over the seam)
  const renderOverlayText = () => {
    if (phase === "countdown") {
      return (
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <span className="bg-black/60 backdrop-blur-sm text-foreground text-sm font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
            Get ready…
          </span>
          <span className="text-7xl font-black text-foreground tabular-nums drop-shadow-[0_4px_24px_rgba(0,0,0,.8)]">
            {countdown}
          </span>
        </div>
      );
    }
    if (phase === "active") {
      return (
        <div className="flex flex-col items-center gap-2">
          <span className="bg-black/60 backdrop-blur-sm text-primary text-sm font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
            Try not to laugh
          </span>
          <span className="text-6xl font-black text-foreground tabular-nums drop-shadow-[0_4px_24px_rgba(0,0,0,.8)]">
            0:{timer.toString().padStart(2, "0")}
          </span>
        </div>
      );
    }
    if (phase === "result") {
      return (
        <span
          className={`text-5xl font-black uppercase tracking-wider animate-scale-in ${
            result === "caught" ? "text-destructive" : "text-green-400"
          }`}
          style={{ textShadow: "0 4px 30px rgba(0,0,0,.7)" }}
        >
          {result === "caught" ? "CAUGHT! 😂" : "YOU WON! 🏆"}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col h-screen overflow-hidden">
      {/* Top nav */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-[env(safe-area-inset-top,12px)] pb-2">
        <button onClick={onHome} className="p-2 rounded-full bg-black/40 backdrop-blur-md">
          <Home className="w-5 h-5 text-foreground" />
        </button>
        <button onClick={onCreate} className="p-2 rounded-full bg-black/40 backdrop-blur-md">
          <Plus className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Result overlay — persists into review */}
      {(phase === "result" || phase === "review") && result && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${overlayClass}`}
        />
      )}

      {/* Centered overlay text (countdown / timer / result) */}
      {(phase === "countdown" || phase === "active" || phase === "result") && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          {renderOverlayText()}
        </div>
      )}

      {/* Watch recording — centered on full screen during review */}
      {phase === "review" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <button className="pointer-events-auto flex flex-col items-center gap-2 group">
            <div className="bg-black/50 backdrop-blur-md rounded-full p-5 group-active:scale-90 transition-transform">
              <Play className="w-12 h-12 text-foreground fill-foreground" />
            </div>
            <span className="bg-black/50 backdrop-blur-sm text-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
              Watch your recording
            </span>
          </button>
        </div>
      )}

      {/* Top half — challenge image */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <img
          src={topImage}
          alt="Challenge"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thin seam line */}
      <div className="h-[2px] bg-foreground/10 shrink-0 relative z-10" />

      {/* Bottom half — webcam */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
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
            className="absolute inset-0 z-20 flex items-end justify-center pb-20"
          >
            <span className="bg-destructive/90 text-destructive-foreground px-8 py-3.5 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg">
              😂 I laughed!
            </span>
          </button>
        )}
      </div>

      {/* Right-side TikTok-style action buttons */}
      {phase === "review" && (
        <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-4">
          {[
            { icon: RotateCcw, label: "Again", action: handleRestart },
            { icon: Download, label: "Save", action: handleSave },
            { icon: Share2, label: "Share", action: handleShare },
          ].map(({ icon: Icon, label, action }) => (
            <button key={label} onClick={action} className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-foreground/10 backdrop-blur-md group-active:scale-90 transition-transform">
                <Icon className="w-[22px] h-[22px] text-foreground" />
              </div>
              <span className="text-[10px] text-foreground/70 font-semibold">{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Next button — always visible, bottom-right */}
      <button
        onClick={onNext}
        className="absolute bottom-6 right-3 z-20 bg-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
      >
        <ChevronDown className="w-5 h-5 text-primary-foreground" />
      </button>
    </div>
  );
};

export default ChallengePlayer;
