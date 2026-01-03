import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Business Owner",
    content: "Optimus transformed my work truck completely. The commercial wrap is eye-catching and has brought in so many new customers. The attention to detail and professionalism exceeded all expectations.",
    rating: 5,
    vehicle: "Ford F-150",
  },
  {
    name: "Sarah Williams",
    role: "Car Enthusiast",
    content: "The window tint on my Honda looks absolutely perfect. They took their time to ensure there were no bubbles and the finish is flawless. I've recommended them to everyone I know.",
    rating: 5,
    vehicle: "Honda Civic Type R",
  },
  {
    name: "David Chen",
    role: "Rally Driver",
    content: "These guys know their stuff when it comes to custom decals. My Subaru WRX looks like it's ready for the track. The quality of materials and precision of installation is unmatched.",
    rating: 5,
    vehicle: "Subaru WRX STI",
  },
  {
    name: "Emily Rodriguez",
    role: "Executive",
    content: "I wanted a subtle but sophisticated look for my Mercedes. The team delivered exactly what I envisioned - a matte black finish that turns heads everywhere. Premium service all the way.",
    rating: 5,
    vehicle: "Mercedes-AMG GT",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-32 bg-card relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied customers.
          </p>
        </motion.div>

        {/* Main testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-card rounded-3xl p-8 md:p-12 border border-border shadow-card">
            {/* Large quote icon */}
            <div className="absolute -top-6 left-8 md:left-12">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            {/* Content */}
            <div className="pt-6">
              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-light"
              >
                "{testimonials[currentIndex].content}"
              </motion.p>

              {/* Divider */}
              <div className="h-px bg-border mb-8" />

              {/* Author info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                  key={`author-${currentIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h4 className="text-foreground font-display font-bold text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].vehicle}
                  </p>
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-sm font-medium">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom testimonial cards preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-4 gap-4 mt-12"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`p-4 rounded-xl text-left transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-secondary/30 border border-transparent hover:border-border"
              }`}
            >
              <div className="flex gap-1 mb-2">
                {[...Array(3)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                "{testimonial.content.slice(0, 60)}..."
              </p>
              <span className="text-xs font-medium text-foreground">{testimonial.name}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
