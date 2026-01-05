import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import garageImage from "@/assets/garage.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={garageImage}
                alt="Optimus Design & Customs garage"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              CRAFT
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed italic">
              Optimus Design & Customs is a premier car wrap company dedicated to providing top-notch custom designs and products for our valued customers. Our team is passionate about transforming vehicles with our expertise in vehicle wraps, window tints, and decals/graphics. We take pride in delivering exceptional results that exceed expectations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
