import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

const testimonialPages = [
  [
    {
      name: "Oscar Martinez",
      time: "2 months ago",
      content: "Good quality work! If you're looking for a good tint or wrap, this place is the one! Good pricing, good customer service. I highly recommend in the DMV area!",
      rating: 5,
    },
    {
      name: "DMV Medical Trans",
      time: "2 months ago",
      content: "Reached out to get custom decals, came out exactly how I wanted it. Quick turnaround and very reasonable with the price.",
      rating: 5,
    },
    {
      name: "Marvin Santos",
      time: "2 months ago",
      content: "Optimus customs did the decals on my work truck and it came out perfect. The attention to detail is what really sets Optimus customs apart from anyone else. Highly recommend.",
      rating: 5,
    },
  ],
  [
    {
      name: "Donovan Braithwaite",
      time: "2 months ago",
      content: "This was a wonderful experience and Ivan does a great job",
      rating: 5,
    },
    {
      name: "Marbin Argueta",
      time: "4 days ago",
      content: "Ivan worked on many of our Company Trucks, he did an excellent Job on all of them, he communicated well with us on his schedule and Got the Job done Right, great person and great work!!",
      rating: 5,
    },
  ],
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % testimonialPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + testimonialPages.length) % testimonialPages.length);
  };

  return (
    <section id="testimonials" className="py-32 bg-card/30 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">Testimonials</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Client <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-subheading text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover why our clients trust us with their vehicles. Real stories from satisfied customers.
          </p>
          
          <a
            href="https://www.google.com/maps/place/Optimus+Design+%26+Customs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 glass-premium px-6 py-3 rounded-xl hover:border-primary/30 transition-all duration-300 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">View all reviews on Google</span>
          </a>
        </motion.div>

        {/* Testimonial Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {testimonialPages[currentPage].map((testimonial, index) => (
              <motion.div
                key={`${currentPage}-${testimonial.name}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="group relative card-premium rounded-3xl p-8 hover:border-primary/30"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Quote className="w-5 h-5 text-primary" />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1.5 mb-6 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-premium text-foreground/90 text-base leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-8 mb-16"
        >
          <button
            onClick={prevPage}
            className="w-14 h-14 rounded-2xl glass-premium flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:neon-glow"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3">
            {testimonialPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`rounded-full transition-all duration-500 ${
                  index === currentPage
                    ? "w-12 h-3 bg-primary neon-glow"
                    : "w-3 h-3 bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            className="w-14 h-14 rounded-2xl glass-premium flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:neon-glow"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-6 glass-premium rounded-3xl px-10 py-6 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="flex flex-col items-center">
              <span className="text-foreground font-display text-5xl font-bold">5.0</span>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-left">
              <p className="text-foreground font-semibold text-lg">Google Reviews</p>
              <p className="text-premium text-muted-foreground text-sm">Based on 11 verified reviews</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
