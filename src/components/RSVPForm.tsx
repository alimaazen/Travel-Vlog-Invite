import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Heart } from "lucide-react";

const RSVPForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#3D2A3A]/15 shadow-2xl text-[#2C2A29]">
      {!submitted ? (
        <>
          <div className="flex items-center space-x-3 mb-5">
            <Checkbox
              id="confirm"
              checked={isConfirmed}
              onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
              className="border-[#5A3322] data-[state=checked]:bg-[#3D2A3A] data-[state=checked]:text-white h-5 w-5 rounded-md"
            />
            <Label
              htmlFor="confirm"
              className="text-sm sm:text-base font-medium text-[#2C2A29] cursor-pointer tracking-wide select-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
            >
              Yes, I'll be there, In Sha Allah
            </Label>
          </div>

          <AnimatePresence>
            {isConfirmed && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onSubmit={handleSubmit}
                className="space-y-4 pt-3 border-t border-[#3D2A3A]/10"
              >
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest text-[#5A3322] font-semibold mb-1.5 block">
                    Your full name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="bg-[#FAF7F2] border-[#3D2A3A]/20 text-[#2C2A29] placeholder:text-[#2C2A29]/40 focus-visible:ring-[#3D2A3A] text-sm h-11 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="text-xs uppercase tracking-widest text-[#5A3322] font-semibold mb-1.5 block">
                    Family members joining with you
                  </Label>
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setGuestCount((prev) => Math.max(0, prev - 1))}
                      className="border-[#3D2A3A]/20 bg-[#FAF7F2] text-[#2C2A29] hover:bg-[#3D2A3A]/10 h-10 w-10 rounded-xl"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <div className="flex-1 text-center font-heading font-semibold text-lg border border-[#3D2A3A]/20 bg-[#FAF7F2] rounded-xl py-1.5 text-[#2C2A29]">
                      {guestCount}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setGuestCount((prev) => prev + 1)}
                      className="border-[#3D2A3A]/20 bg-[#FAF7F2] text-[#2C2A29] hover:bg-[#3D2A3A]/10 h-10 w-10 rounded-xl"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="note" className="text-xs uppercase tracking-widest text-[#5A3322] font-semibold mb-1.5 block">
                    A personal note or duas (optional)
                  </Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Share your warm wishes, prayers, or blessings..."
                    className="bg-[#FAF7F2] border-[#3D2A3A]/20 text-[#2C2A29] placeholder:text-[#2C2A29]/40 focus-visible:ring-[#3D2A3A] text-sm resize-none h-24 rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#3D2A3A] hover:bg-[#2B1B28] text-white font-heading font-semibold uppercase tracking-widest h-12 rounded-xl shadow-lg transition-all"
                >
                  Confirm Attendance
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 space-y-3"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-[#3D2A3A]/10 flex items-center justify-center text-[#3D2A3A]">
            <Heart className="w-6 h-6 fill-[#3D2A3A]" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-[#3D2A3A]">JazakAllahu Khayran!</h3>
          <p className="text-sm text-[#5A3322] italic">
            Thank you, {name}. Your RSVP has been graciously noted.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default RSVPForm;
