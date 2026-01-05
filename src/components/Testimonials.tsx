import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
    <section id="testimonials" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Testimonials
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto italic mb-6">
            Real reviews from our valued customers who trusted us with their vehicles.
          </p>
          <a
            href="https://www.google.com/maps/place/Optimus+Design+%26+Customs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="text-lg font-bold text-red-500">G</span>
            <span className="font-medium">View all reviews on Google</span>
          </a>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonialPages[currentPage].map((testimonial, index) => (
            <motion.div
              key={`${currentPage}-${testimonial.name}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-500 card-elevated"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <h4 className="text-foreground font-semibold">{testimonial.name}</h4>
                <p className="text-foreground/50 text-sm">{testimonial.time}</p>
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
                    ? "w-8 bg-primary"
                    : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
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
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-foreground font-bold text-lg">5.0</span>
            <span className="text-foreground/60">•</span>
            <span className="text-foreground/70">Based on 11 Google Reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
