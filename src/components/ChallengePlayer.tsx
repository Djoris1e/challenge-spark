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
      return null; // handled separately with split positioning
    }
    if (phase === "active") {
      return null; // handled separately with split positioning
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
      {/* Top nav — clean TikTok style, no pill backgrounds */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-3 pb-2">
        <button onClick={onHome} className="active:scale-90 transition-transform">
          <Home className="w-6 h-6 text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,.5)]" />
        </button>
        <button onClick={onCreate} className="active:scale-90 transition-transform">
          <Plus className="w-7 h-7 text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,.5)]" />
        </button>
      </div>

      {/* Result overlay — persists into review */}
      {(phase === "result" || phase === "review") && result && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${overlayClass}`}
        />
      )}

      {/* Countdown: label at bottom of top photo, number at top of bottom photo */}
      {phase === "countdown" && (
        <>
           <div className="absolute top-0 left-0 right-0 bottom-1/2 z-20 flex items-end justify-center pb-2 pointer-events-none">
            <span className="bg-black/70 backdrop-blur-md text-foreground text-base font-bold tracking-widest uppercase px-5 py-2 rounded-full animate-fade-in shadow-lg" style={{ textShadow: "0 2px 8px rgba(0,0,0,.6)" }}>
              Get ready…
            </span>
          </div>
          <div className="absolute top-1/2 left-0 right-0 bottom-0 z-20 flex items-start justify-center pt-2 pointer-events-none">
            <span className="text-7xl font-black text-foreground tabular-nums drop-shadow-[0_4px_24px_rgba(0,0,0,.8)] animate-fade-in">
              {countdown}
            </span>
          </div>
        </>
      )}

      {/* Active: label at bottom of top photo, timer at top of bottom photo */}
      {phase === "active" && (
        <>
          <div className="absolute top-0 left-0 right-0 bottom-1/2 z-20 flex items-end justify-center pb-2 pointer-events-none">
            <span className="bg-black/70 backdrop-blur-md text-primary text-base font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg" style={{ textShadow: "0 2px 8px rgba(0,0,0,.6)" }}>
              Try not to laugh
            </span>
          </div>
          <div className="absolute top-1/2 left-0 right-0 bottom-0 z-20 flex items-start justify-center pt-2 pointer-events-none">
            <span className="text-6xl font-black text-foreground tabular-nums drop-shadow-[0_4px_24px_rgba(0,0,0,.8)]">
              0:{timer.toString().padStart(2, "0")}
            </span>
          </div>
        </>
      )}

      {/* Result overlay text — centered */}
      {phase === "result" && (
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

        {/* Invisible tap zone during active phase — tapping anywhere triggers "caught" */}
        {phase === "active" && (
          <button
            onClick={handleLaughed}
            className="absolute inset-0 z-20"
          />
        )}
      </div>

      {/* Right-side action column — Next always at bottom, review buttons stacked above */}
      <div className="absolute right-3 bottom-6 z-20 flex flex-col items-center gap-5">
        {phase === "review" && (
          <>
            {[
              { icon: RotateCcw, label: "Again", action: handleRestart },
              { icon: Share2, label: "Share", action: handleShare },
              { icon: Download, label: "Save", action: handleSave },
            ].map(({ icon: Icon, label, action }) => (
              <button key={label} onClick={action} className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
                <Icon className="w-7 h-7 text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,.4)]" />
                <span className="text-[10px] text-foreground font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,.5)]">{label}</span>
              </button>
            ))}
          </>
        )}
        <button
          onClick={onNext}
          className="bg-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <ChevronDown className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ChallengePlayer;
