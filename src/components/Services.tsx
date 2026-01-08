import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Shield, Sparkles } from "lucide-react";
import serviceWrap from "@/assets/service-wrap.jpg";
import serviceTint from "@/assets/service-tint.jpg";
import serviceDecals from "@/assets/service-decals.jpg";

const services = [
  {
    title: "Vehicle Wraps",
    description: "Full color change and custom design options for every style.",
    icon: Palette,
    image: serviceWrap,
    duration: "1 hr",
    price: "$500",
  },
  {
    title: "Window Tint",
    description: "Professional tinting that enhances privacy and comfort.",
    icon: Shield,
    image: serviceTint,
    duration: "45 mins",
    price: "$150",
  },
  {
    title: "Custom Decals",
    description: "Unique graphics that make your ride stand out from the crowd.",
    icon: Sparkles,
    image: serviceDecals,
    duration: "1 hr",
    price: "$100",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-background relative" ref={ref}>
      {/* Section Divider */}
      <div className="section-divider absolute top-0 left-0 right-0"></div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Professional automotive customization to enhance your vehicle's look and protection.
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
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Duration & Price */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-muted-foreground text-xs block">Duration</span>
                    <span className="text-foreground font-semibold">{service.duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground text-xs block">Starting at</span>
                    <span className="text-primary font-bold text-xl">{service.price}</span>
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
