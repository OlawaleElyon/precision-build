import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onLoadingComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px hsla(355, 91%, 38%, 0.3)",
                      "0 0 40px hsla(355, 91%, 38%, 0.5)",
                      "0 0 20px hsla(355, 91%, 38%, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-primary-foreground font-display font-bold text-3xl">O</span>
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-display font-bold text-3xl tracking-wider">OPTIMUS</span>
                <span className="text-primary text-sm tracking-[0.3em] font-medium">DESIGN & CUSTOMS</span>
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 relative">
            <div className="h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-brand rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Progress text */}
            <motion.div 
              className="absolute -bottom-8 left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-muted-foreground text-sm font-medium tracking-wider">
                {progress}%
              </span>
            </motion.div>
          </div>

          {/* Decorative lines */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-[1px] bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
