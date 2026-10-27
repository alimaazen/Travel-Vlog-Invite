import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollSection = ({ children, className = "", delay = 0 }: ScrollSectionProps) => {
  return (
    <motion.section
      className={`min-h-[100svh] flex items-center justify-center px-5 py-12 ${className}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-12% 0px -15% 0px", amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: [0.25, 1, 0.5, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
};

export default ScrollSection;
