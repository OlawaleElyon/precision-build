import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Business Owner",
    content: "Optimus transformed my work truck completely. The commercial wrap is eye-catching and has brought in so many new customers. Professional work from start to finish!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Car Enthusiast",
    content: "The window tint on my Honda looks absolutely perfect. They took their time to ensure there were no bubbles and the finish is flawless. Highly recommend!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Rally Driver",
    content: "These guys know their stuff when it comes to custom decals. My Subaru WRX looks like it's ready for the track. Attention to detail is unmatched.",
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied customers.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-500 card-elevated"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-accent/40" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <h4 className="text-foreground font-semibold">{testimonial.name}</h4>
                <p className="text-primary text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
