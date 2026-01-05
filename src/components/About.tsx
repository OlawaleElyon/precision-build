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
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-xl -z-10"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              CRAFT
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Optimus Design & Customs is a premier car wrap company dedicated to providing top-notch custom designs and products for our valued customers. Our team is passionate about transforming vehicles with our expertise in vehicle wraps, window tints, and decals/graphics. We take pride in delivering exceptional results that exceed expectations.
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <span className="text-4xl font-black text-primary">500+</span>
                <p className="text-foreground/60 text-sm mt-1">Projects Completed</p>
              </div>
              <div>
                <span className="text-4xl font-black text-accent">100%</span>
                <p className="text-foreground/60 text-sm mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
