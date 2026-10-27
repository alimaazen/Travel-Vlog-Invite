import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollInvitation from "@/components/ScrollInvitation";
import CountdownTimer from "@/components/CountdownTimer";
import Envelope from "@/components/Envelope";
import ScrollSection from "@/components/ScrollSection";
import floralBg from "@/assets/violentbg.png";
import mountainsForeground from "@/assets/foreground_mountains.png";
import newPinkFlowers from "@/assets/newPinkFlowers.png";
import brandNewThanks from "@/assets/brandnewhthanks.png";
import FallingPetals from "@/components/FallingPetals";
import RSVPForm from "@/components/RSVPForm";

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [mountainOpacity, setMountainOpacity] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dissolveSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const isBottom = container.clientHeight + container.scrollTop >= container.scrollHeight - 150;
      setIsAtBottom(isBottom);

      // Smoothly dissolve foreground mountains as the white section enters view
      if (dissolveSectionRef.current) {
        const dissolveRect = dissolveSectionRef.current.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        // Distance from bottom of viewport to the dissolve section top
        const relativeTop = dissolveRect.top - containerRect.top;
        const viewportHeight = containerRect.height;

        // When dissolve top is below 90% of screen: full mountain opacity (1)
        // As it scrolls up to 25% of screen: mountain fades smoothly to 0
        const fadeStart = viewportHeight * 0.85;
        const fadeEnd = viewportHeight * 0.25;

        if (relativeTop >= fadeStart) {
          setMountainOpacity(1);
        } else if (relativeTop <= fadeEnd) {
          setMountainOpacity(0);
        } else {
          const progress = (relativeTop - fadeEnd) / (fadeStart - fadeEnd);
          setMountainOpacity(Math.max(0, Math.min(1, progress)));
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
    
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isEnvelopeOpen]);

  useEffect(() => {
    // Prevent the outer browser window/body from ever scrolling
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="h-[100svh] w-full overflow-hidden relative bg-black flex justify-center">
      {/* Exquisite Desktop view lock and blur overlay */}
      <div className="hidden min-[480px]:flex fixed inset-0 bg-[#0A0A0B]/95 backdrop-blur-3xl z-[100] flex-col items-center justify-center p-6 text-center text-[#F5F2EB]">
        <div className="max-w-[340px] w-full border border-[#C8B89A]/20 rounded-3xl p-8 bg-black/50 backdrop-blur-md shadow-[0_0_50px_rgba(200,184,154,0.15)] flex flex-col items-center gap-6">
          <div className="w-14 h-24 rounded-2xl border border-[#C8B89A]/30 relative flex items-center justify-center bg-black/40 shadow-inner">
            <div className="w-3 h-1 rounded bg-[#C8B89A]/40 absolute top-2"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C8B89A] absolute bottom-2.5 animate-pulse shadow-[0_0_8px_#C8B89A]"></div>
            <div className="w-8 h-12 rounded-lg border border-[#C8B89A]/15 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
              <span className="text-[10px] text-[#C8B89A]/50 font-sans tracking-wide">19:22</span>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg md:text-xl tracking-[0.2em] font-heading uppercase text-[#F5F2EB]" style={{ fontFamily: "'Cinzel', serif" }}>
              Mobile View Required
            </h2>
            <p className="text-xs font-body italic text-foreground/80 leading-relaxed max-w-xs px-2">
              This invitation has been precision-designed to be experienced on a mobile device.
            </p>
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#C8B89A]/90 font-heading font-semibold pt-1">
              Please view on your phone
            </p>
          </div>
        </div>
      </div>

      {/* Centered Mobile-Portrait Frame Container (430px) */}
      <div className="relative z-10 max-w-[430px] w-full h-[100svh] shadow-2xl overflow-hidden bg-black flex flex-col">
        {/* Fixed Background texture layer constrained within the 430px frame */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={floralBg}
            alt="Wedding background texture"
            className="w-full h-full object-cover"
          />
          {/* Subtle soft tint to let the beautiful watercolor landscape shine while preserving high contrast */}
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={`relative z-10 w-full h-full flex flex-col ${
            !isEnvelopeOpen ? "overflow-y-hidden" : "overflow-y-auto"
          } overflow-x-hidden`}
        >
          {/* Falling beige petals nested in the container */}
          {isEnvelopeOpen && <FallingPetals />}

          {/* Envelope overlay */}
          <Envelope isOpen={isEnvelopeOpen} onOpen={() => setIsEnvelopeOpen(true)} />

          {/* Main content */}
          {isEnvelopeOpen && (
            <div className="relative z-20 flex-1 flex flex-col">
              {/* Scroll-based invitation sections */}
              <ScrollInvitation />

              {/* Countdown timer */}
              <ScrollSection>
                <div className="flex flex-col items-center text-center">
                  <motion.h2
                    className="text-[#5A3322] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-7 uppercase"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    UNTIL THE DAY
                  </motion.h2>
                  <CountdownTimer />
                  <motion.p
                    className="mt-16 text-4xl md:text-5xl text-[#3D2A3A] drop-shadow-sm"
                    style={{ fontFamily: "'Aref Ruqaa', serif", fontWeight: 700 }}
                    dir="rtl"
                    lang="ar"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1 }}
                  >
                    إِنْ شَاءَ اللَّه
                  </motion.p>
                </div>
              </ScrollSection>

              {/* Closing Section: Bouquet & Thanks together in full view above the mountains */}
              <section className="min-h-[100svh] flex flex-col items-center justify-start pt-12 pb-16 px-4">
                <div className="flex flex-col items-center text-center">
                  <motion.img
                    src={newPinkFlowers}
                    alt="Pink Lilies Bouquet"
                    className="w-36 min-[360px]:w-40 md:w-48 max-w-full drop-shadow-lg"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <div className="flex flex-col items-center mt-3.5">
                    <motion.img
                      src={brandNewThanks}
                      alt="Presence brings us joy and happiness"
                      className="w-52 min-[360px]:w-56 md:w-64 max-w-full drop-shadow-sm"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    />
                    <motion.p
                      className="text-center text-[11px] min-[360px]:text-xs text-[#2C2A29] font-body italic max-w-xs px-2 mt-1 leading-snug font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.35 }}
                    >
                      Your presence gives us joy and happiness
                    </motion.p>
                  </div>
                </div>
              </section>

              {/* Seamless Dissolve into Pure White Background for RSVP */}
              <div ref={dissolveSectionRef} className="relative z-40">
                {/* Soft gradient transition dissolving from transparent into solid white */}
                <div className="h-48 w-full bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none" />

                {/* Pure White RSVP Section */}
                <div className="bg-white min-h-[90svh] w-full px-5 pt-4 pb-28 flex flex-col items-center text-center shadow-[0_-20px_40px_rgba(255,255,255,0.8)]">
                  <motion.p
                    className="text-[#5A3322] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-2 uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    KINDLY RESPOND
                  </motion.p>
                  <motion.h2
                    className="text-2xl min-[360px]:text-3xl text-[#3D2A3A] font-heading font-semibold mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                  >
                    RSVP
                  </motion.h2>

                  <div className="w-full max-w-sm">
                    <RSVPForm />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3D Foreground Mountains Layer: Sits in front of scrolling text and smoothly dissolves to 0 alongside the background */}
        <div
          className="absolute inset-0 z-30 pointer-events-none select-none transition-opacity duration-150"
          style={{ opacity: mountainOpacity }}
        >
          <img
            src={mountainsForeground}
            alt="Foreground Mountain Ridge"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none max-w-[430px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEnvelopeOpen && !isAtBottom ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="text-[#5A3322] text-[10px] md:text-xs font-heading font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-[#5A3322]/15">
          Please Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#5A3322]" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
