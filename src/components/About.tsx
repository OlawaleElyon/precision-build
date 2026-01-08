import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";
import garageImage from "@/assets/garage.jpg";


const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background relative" ref={ref}>
      {/* Section Divider */}
      <div className="section-divider absolute top-0 left-0 right-0"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={garageImage}
                alt="Optimus Design & Customs garage"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute -bottom-8 -right-8 bg-card border border-border rounded-2xl p-6 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <span className="text-3xl font-bold text-foreground">5.0</span>
                  <p className="text-muted-foreground text-sm">Google Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Crafting Automotive Excellence
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Optimus Design & Customs is a top automotive customization shop that transforms vehicles into works of art. Our skilled team brings experience and passion to every project. From full vehicle wraps to window tinting and custom graphics, we deliver results that exceed our clients' expectations.
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
