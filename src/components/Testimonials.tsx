import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
    <section id="testimonials" className="py-24 bg-background relative" ref={ref}>
      {/* Section Divider */}
      <div className="section-divider absolute top-0 left-0 right-0"></div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            Real reviews from satisfied customers who trusted us with their vehicles.
          </p>
          <a
            href="https://www.google.com/maps/place/Optimus+Design+%26+Customs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-5 py-2.5 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-foreground">View all reviews on Google</span>
          </a>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonialPages[currentPage].map((testimonial, index) => (
            <motion.div
              key={`${currentPage}-${testimonial.name}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-500 card-glow relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-xs">{testimonial.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-12">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {testimonialPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "w-10 bg-primary"
                    : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prevPage}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-4 bg-card border border-border rounded-2xl px-8 py-4 shadow-xl">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div>
              <span className="text-foreground font-bold text-2xl">5.0</span>
              <p className="text-muted-foreground text-xs">Based on 11 Google Reviews</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
