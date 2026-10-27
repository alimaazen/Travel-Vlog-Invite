import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import waxSeal from "@/assets/beigeseal.png";
import whiteLace from "@/assets/whitelace.png";

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

const Envelope = ({ isOpen, onOpen }: EnvelopeProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 430, height: 800 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial size of the element
    setContainerSize({
      width: containerRef.current.clientWidth || 430,
      height: containerRef.current.clientHeight || 800
    });

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: Math.floor(entry.contentRect.width),
          height: Math.floor(entry.contentRect.height)
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onOpen();
    }, 3000); // Wait for seal fade + 1s wait + 1.5s flap open
  };

  // Envelope colors (Darker beige variations for depth)
  const topColor = "#C7BDA9"; 
  const bottomColor = "#E3DAC9"; 
  const sideColor = "#C0C9BC";

  // Set the tip points (as percentages of height)
  // Making the tip much lower (60%).
  const topTipPercent = 60; 
  // Bottom flap tip goes even further up (35%), ensuring a deep tuck under the top flap.
  const botTipPercent = 35; 

  // Calculations for the diagonal lace borders
  const w = containerSize.width;
  const h = containerSize.height;

  // We expand the base of the top and bottom flaps to -50% and 150% to make the angles MUCH wider.
  // This means the horizontal distance for the diagonal is w (instead of w/2).
  const topH = h * (topTipPercent / 100);
  const diagonalTop = Math.sqrt((w) ** 2 + topH ** 2);
  const angleTop = Math.atan2(topH, w) * (180 / Math.PI);

  const botH = h * (1 - botTipPercent / 100); 
  const diagonalBot = Math.sqrt((w) ** 2 + botH ** 2);
  const angleBot = Math.atan2(botH, w) * (180 / Math.PI);

  // Reusable lace style
  const laceHeight = 32; // Thickness of the lace border
  const getLaceStyle = (diag: number) => ({
    backgroundImage: `url(${whiteLace})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: `auto ${laceHeight}px`,
    backgroundPosition: 'center',
    height: `${laceHeight}px`,
    width: `${diag}px`,
    position: 'absolute' as const,
    filter: "sepia(1) hue-rotate(65deg) saturate(0.9) brightness(0.6)",
  });

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          ref={containerRef}
          className="fixed inset-y-0 z-50 overflow-hidden max-w-[430px] w-full left-1/2 -translate-x-1/2"
          initial={{ opacity: 1 }}
          animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
          exit={{ pointerEvents: "none" }}
          transition={{ duration: 0.5, delay: 3.0 }}
        >
          {/* Main background block to prevent see-through before opening */}
          <motion.div 
            className="absolute inset-0 z-0" 
            style={{ backgroundColor: topColor }}
            animate={isAnimating ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          />

          <div className="absolute inset-0 overflow-hidden">
            
            {/* LEFT FLAP */}
            <motion.div
              className="absolute inset-0 z-10 origin-left"
              animate={isAnimating ? { x: "-100%" } : { x: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: sideColor,
                  clipPath: "polygon(0 0, 0 100%, 50% 50%)"
                }}
              />
              <div 
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  clipPath: "polygon(0 0, 0 100%, 50% 50%)"
                }}
              />
            </motion.div>

            {/* RIGHT FLAP */}
            <motion.div
              className="absolute inset-0 z-10 origin-right"
              animate={isAnimating ? { x: "100%" } : { x: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: sideColor,
                  clipPath: "polygon(100% 0, 100% 100%, 50% 50%)"
                }}
              />
              <div 
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  clipPath: "polygon(100% 0, 100% 100%, 50% 50%)"
                }}
              />
            </motion.div>

            {/* BOTTOM FLAP */}
            <motion.div
              className="absolute inset-0 z-20 origin-bottom"
              animate={isAnimating ? { y: "100%" } : { y: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: bottomColor,
                  clipPath: `polygon(-50% 100%, 150% 100%, 50% ${botTipPercent}%)`
                }}
              />
              <div 
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  clipPath: `polygon(-50% 100%, 150% 100%, 50% ${botTipPercent}%)`
                }}
              />
              {/* Left edge lace */}
              <div 
                className="origin-bottom-left"
                style={{
                  ...getLaceStyle(diagonalBot),
                  bottom: 0,
                  left: '-50%',
                  transform: `rotate(-${angleBot}deg) translateY(50%)`,
                }}
              />
              {/* Right edge lace */}
              <div 
                className="origin-bottom-right"
                style={{
                  ...getLaceStyle(diagonalBot),
                  bottom: 0,
                  right: '-50%',
                  transform: `rotate(${angleBot}deg) translateY(50%)`,
                }}
              />
            </motion.div>

            {/* TOP FLAP */}
            <motion.div
              className="absolute inset-0 z-30 origin-top"
              animate={isAnimating ? { y: "-100%" } : { y: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: topColor,
                  clipPath: `polygon(-50% 0, 150% 0, 50% ${topTipPercent}%)`,
                }}
              />
              <div 
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  clipPath: `polygon(-50% 0, 150% 0, 50% ${topTipPercent}%)`,
                }}
              />
              {/* Left edge lace */}
              <div 
                className="origin-top-left"
                style={{
                  ...getLaceStyle(diagonalTop),
                  top: 0,
                  left: '-50%',
                  transform: `rotate(${angleTop}deg) translateY(-50%)`,
                }}
              />
              {/* Right edge lace */}
              <div 
                className="origin-top-right"
                style={{
                  ...getLaceStyle(diagonalTop),
                  top: 0,
                  right: '-50%',
                  transform: `rotate(-${angleTop}deg) translateY(-50%)`,
                }}
              />
            </motion.div>
          </div>

          {/* WAX SEAL - Centered exactly on the tip of the top flap */}
          <motion.div
            className="absolute z-40 cursor-pointer flex flex-col items-center justify-center"
            style={{
              top: `calc(${topTipPercent}% - 2rem)`,
              left: '50%',
              x: '-50%',
              y: '-50%'
            }}
            animate={isAnimating ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={waxSeal} 
              alt="Wax Seal" 
              className="w-32 h-32 md:w-48 md:h-48 object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Envelope;