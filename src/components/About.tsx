import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Clock, Shield } from "lucide-react";
import garageImage from "@/assets/garage.jpg";

const stats = [
  { icon: Award, label: "Years Experience", value: "5+" },
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Clock, label: "Projects Done", value: "1000+" },
  { icon: Shield, label: "Warranty", value: "5 Year" },
];

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
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Optimus Design & Customs is a premier automotive customization shop dedicated to transforming vehicles into works of art. Our team of skilled professionals brings years of experience and passion to every project.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From full vehicle wraps to precision window tinting and custom graphics, we take pride in delivering exceptional results that exceed our clients' expectations.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    <p className="text-muted-foreground text-xs">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
