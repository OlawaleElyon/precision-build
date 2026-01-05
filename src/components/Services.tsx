import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Droplets, Shield, Sparkles } from "lucide-react";
import serviceWrap from "@/assets/service-wrap.jpg";
import serviceTint from "@/assets/service-tint.jpg";
import serviceDecals from "@/assets/service-decals.jpg";

const services = [
  {
    title: "Vehicle Wraps",
    description: "Full color change and custom design options for every style.",
    duration: "1 hr",
    price: "$500",
    icon: Droplets,
    image: serviceWrap,
  },
  {
    title: "Window Tint",
    description: "Professional tinting that enhances privacy and comfort.",
    duration: "45 mins",
    price: "$150",
    icon: Shield,
    image: serviceTint,
  },
  {
    title: "Custom Decals",
    description: "Unique graphics that make your ride stand out from the crowd.",
    duration: "1 hr",
    price: "$100",
    icon: Sparkles,
    image: serviceDecals,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto italic">
            We offer precision services that elevate your vehicle's aesthetic and performance.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 card-glow card-elevated"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Divider */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-foreground/50 text-xs block">Duration</span>
                      <span className="text-foreground font-semibold">{service.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-foreground/50 text-xs block">Starting at</span>
                      <span className="text-primary font-bold text-xl">{service.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
