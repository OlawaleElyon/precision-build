import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium vehicle customization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-secondary/80 border border-border rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-foreground/80">Laurel, MD's Premier Auto Customs</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-3"
          >
            TRANSFORM YOUR
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
          >
            <span className="text-foreground">RIDE </span>
            <span className="text-gradient">WITH STYLE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
          >
            Premium vehicle wraps, window tinting, and custom graphics that make your car stand out from the crowd.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#booking"
              className="btn-neon px-8 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 text-center"
            >
              Book Appointment
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center gap-3 border-2 border-primary/50 text-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Play className="w-5 h-5 text-primary" />
              View Our Work
            </a>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
