import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/15035088066?text=Hi%20SWAIS%2C%20I%27d%20like%20to%20automate%20my%20business."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-40"
      aria-label="Chat with SWAIS on WhatsApp"
    >
      <span className="flex items-center gap-2 bg-gradient-cobalt text-ice rounded-full pl-3.5 pr-4 py-3 font-medium text-sm border border-cobalt-bright/25">
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
        <span className="hidden sm:inline">Chat with us</span>
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
