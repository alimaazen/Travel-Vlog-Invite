import { motion } from "framer-motion";
import bismillahImg from "@/assets/brandnewbismillah.png";
import namesImg from "@/assets/names.png";
import ScrollSection from "./ScrollSection";

const ScrollInvitation = () => {
  return (
    <div className="relative">
      {/* 1. Bismillah & Cordial Invitation */}
      <ScrollSection>
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src={bismillahImg}
            alt="Bismillah - In the name of Allah"
            className="w-full max-w-[280px] sm:max-w-[320px] mx-auto h-auto drop-shadow-md"
          />
          <p className="mt-6 text-[#2C2A29] font-body text-[10px] min-[360px]:text-[11px] min-[400px]:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          <p className="mt-5 text-sm md:text-base text-[#2C2A29]/90 font-body italic leading-relaxed">
            We cordially invite your esteemed presence on the auspicious occasion of the wedding ceremony of
          </p>
        </motion.div>
      </ScrollSection>

      {/* 2. Bride & Groom Section */}
      <ScrollSection>
        <motion.div
          className="relative text-center px-4 w-full flex justify-center"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={namesImg}
            alt="Najla Nasser & Zuhair Umar Farookh"
            className="w-full max-w-[270px] sm:max-w-[300px] h-auto drop-shadow-sm select-none"
          />
        </motion.div>
      </ScrollSection>

      {/* 3. Save the Date (Nikkah - November 27, 2026) */}
      <ScrollSection>
        <div className="text-center max-w-lg w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-[#5A3322] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-7 uppercase">
              SAVE THE DATE
            </h2>
            <div>
              <h3 className="text-2xl md:text-3xl font-display text-[#3D2A3A] mb-4 font-semibold">
                Nikkah
              </h3>
              <div className="flex items-center justify-center gap-2.5 min-[360px]:gap-3.5 md:gap-6 w-full max-w-[370px] mx-auto px-1">
                <div className="text-right flex flex-col justify-center flex-1 min-w-0 pr-1">
                  <span className="text-[11px] min-[360px]:text-xs min-[390px]:text-sm sm:text-base font-heading tracking-[0.03em] uppercase text-[#3D2A3A] font-bold block whitespace-nowrap">
                    Friday
                  </span>
                  <span
                    className="text-[10px] min-[360px]:text-xs min-[390px]:text-sm md:text-base font-heading tracking-[0.05em] uppercase text-[#5A3322] font-semibold mt-0.5 block whitespace-nowrap"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Evening
                  </span>
                </div>
                <div className="h-10 md:h-14 w-[1.5px] shrink-0 bg-[#5A3322]/50 shadow-[0_0_6px_rgba(90,51,34,0.3)]"></div>
                <div className="flex flex-col items-center justify-center w-12 min-[360px]:w-14 md:w-16 shrink-0">
                  <span
                    className="text-4xl min-[360px]:text-5xl md:text-6xl text-[#3D2A3A] font-bold drop-shadow-sm"
                    style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
                  >
                    27
                  </span>
                </div>
                <div className="h-10 md:h-14 w-[1.5px] shrink-0 bg-[#5A3322]/50 shadow-[0_0_6px_rgba(90,51,34,0.3)]"></div>
                <div className="text-left flex flex-col justify-center flex-1 min-w-0 pl-1">
                  <span className="text-[11px] min-[360px]:text-xs min-[390px]:text-sm sm:text-base font-heading tracking-[0.03em] uppercase text-[#3D2A3A] font-bold block whitespace-nowrap">
                    November
                  </span>
                  <span
                    className="text-[10px] min-[360px]:text-xs min-[390px]:text-sm md:text-base font-heading tracking-[0.05em] uppercase text-[#5A3322] font-semibold mt-0.5 block whitespace-nowrap"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* 4. Venue Section */}
      <ScrollSection>
        <div className="text-center max-w-lg w-full px-4">
          <motion.p
            className="text-[#5A3322] font-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] mb-7 uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            VENUE
          </motion.p>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="text-2xl min-[360px]:text-3xl md:text-4xl text-[#3D2A3A] font-bold mb-2 leading-relaxed drop-shadow-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              dir="rtl"
              lang="ar"
            >
              استراحة الماسه للعطلات
            </h3>
            <p className="text-sm min-[360px]:text-base tracking-[0.18em] uppercase text-[#5A3322] font-heading font-semibold mb-1">
              Al Masa Holiday Resort
            </p>
            <p className="text-sm md:text-base font-heading text-[#2C2A29] mb-6">
              Umm Al Amad, Qatar
            </p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=25.4939697,51.3944551"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#3D2A3A]/20 shadow-xl bg-white/40 backdrop-blur-md">
                <div className="aspect-[16/10] w-full">
                  <iframe
                    src="https://www.google.com/maps?q=25.4939697,51.3944551&hl=ar&z=14&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-3 bg-[#3D2A3A]/90 border-t border-[#3D2A3A]/30 flex items-center justify-center gap-2 group-hover:bg-[#3D2A3A] transition-colors duration-300">
                  <span className="text-xs uppercase tracking-widest text-[#F5F2EB] font-heading font-semibold">
                    Open in Google Maps / عرض الاتجاهات
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
  );
};

export default ScrollInvitation;
