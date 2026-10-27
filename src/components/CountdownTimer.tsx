import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ScratchTileProps {
  label: string;
  value: number;
  onScratchedOnce: () => void;
  index: number;
}

const ScratchTile: React.FC<ScratchTileProps> = ({
  label,
  value,
  onScratchedOnce,
  index,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasTriggeredTouchRef = useRef(false);

  // Initialize Canvas with matte silver-grey scratch coating
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 76;
    const height = rect.height || 82;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Elegant deep purple-plum scratch coating matching typography palette (#3D2A3A)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#4A3347");
    gradient.addColorStop(0.3, "#3D2A3A");
    gradient.addColorStop(0.7, "#352433");
    gradient.addColorStop(1, "#261A24");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle luxury shimmer texture lines
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    for (let i = 0; i < width; i += 4) {
      ctx.fillRect(i, 0, 1.2, height);
    }
    for (let j = 0; j < height; j += 4) {
      ctx.fillRect(0, j, width, 1);
    }

    // Border bevel
    ctx.strokeStyle = "rgba(200, 184, 154, 0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(1, 1, width - 2, height - 2);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 26;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    if (lastPosRef.current) {
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, 13, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPosRef.current = { x, y };

    // Register that this tile was touched/scratched at least once
    if (!hasTriggeredTouchRef.current) {
      hasTriggeredTouchRef.current = true;
      onScratchedOnce();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawingRef.current = true;
    const touch = e.touches[0];
    lastPosRef.current = null;
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    lastPosRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <motion.div
      className="text-center flex flex-col items-center select-none"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
    >
      <div
        ref={containerRef}
        className="relative w-[70px] min-[360px]:w-[74px] md:w-[84px] h-[78px] min-[360px]:h-[82px] md:h-[92px] rounded-xl overflow-hidden shadow-2xl border border-[#C8B89A]/30 flex items-center justify-center cursor-pointer group touch-none select-none"
        title="Scratch to reveal"
      >
        {/* Underneath: Revealed Live Counting Value */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#181513] to-[#0A0908] flex flex-col items-center justify-center p-2 z-0">
          <motion.span
            key={value}
            className="text-2xl min-[360px]:text-3xl md:text-4xl text-[#F5F2EB] drop-shadow-[0_2px_10px_rgba(200,184,154,0.4)]"
            style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
          <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-[#C8B89A]/60 to-transparent mt-1" />
        </div>

        {/* Scratch Canvas Overlay: Never auto-fades, fully scratchable */}
        <div className="absolute inset-0 z-10">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-pointer touch-none block"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      {/* Block Label */}
      <p
        className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#5A3322] font-bold mt-2.5 transition-colors"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {label}
      </p>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [touchedTiles, setTouchedTiles] = useState<Record<string, boolean>>({
    Days: false,
    Hours: false,
    Minutes: false,
    Seconds: false,
  });

  const confettiTriggeredRef = useRef(false);

  useEffect(() => {
    const weddingDate = new Date("2026-11-27T18:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerCelebrationConfetti = () => {
    // Elegant luxury gold, rose, cream, and champagne confetti bursts
    const colors = ["#D4AF37", "#F5F2EB", "#C8B89A", "#AA771C", "#E8D8B8", "#FFFFFF"];

    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.65 },
      colors,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0.15, y: 0.6 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 0.85, y: 0.6 },
        colors,
        disableForReducedMotion: true,
      });
    }, 250);
  };

  const handleTileTouched = (label: string) => {
    setTouchedTiles((prev) => {
      const updated = {
        ...prev,
        [label]: true,
      };

      // Check if all four tiles have now been scratched at least once
      const allTouched = Object.values(updated).every(Boolean);
      if (allTouched && !confettiTriggeredRef.current) {
        confettiTriggeredRef.current = true;
        triggerCelebrationConfetti();
      }

      return updated;
    });
  };

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const allTouched = Object.values(touchedTiles).every(Boolean);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Scratch Hint Banner - stays visible forever */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-4 text-[#5A3322] text-xs tracking-wider uppercase font-heading font-semibold"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#5A3322] animate-pulse" />
        <span>Scratch each tile to reveal</span>
        <Sparkles className="w-3.5 h-3.5 text-[#5A3322] animate-pulse" />
      </motion.div>

      {/* Scratch Tiles Grid */}
      <motion.div
        className="flex justify-center gap-2 min-[360px]:gap-2.5 md:gap-3.5 px-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {timeBlocks.map((block, index) => (
          <ScratchTile
            key={block.label}
            label={block.label}
            value={block.value}
            onScratchedOnce={() => handleTileTouched(block.label)}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
