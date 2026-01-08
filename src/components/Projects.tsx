import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";
import tint1 from "@/assets/tint-1.jpg";
import tint2 from "@/assets/tint-2.jpg";
import tint3 from "@/assets/tint-3.jpg";
import wrap1 from "@/assets/wrap-1.jpg";
import wrap2 from "@/assets/wrap-2.jpg";
import wrap3 from "@/assets/wrap-3.jpg";
import decal1 from "@/assets/decal-1.jpg";

const projectCategories = [
  {
    name: "Vehicle Wraps",
    description: "Custom full & partial wraps",
    projects: [
      { image: wrap1, title: "Commercial Truck Wrap", description: "Full vinyl wrap with custom branding" },
      { image: wrap2, title: "Full Vehicle Wrap", description: "Complete color change transformation" },
      { image: wrap3, title: "Trailer Wrap Design", description: "Eye-catching mobile advertising" },
    ],
  },
  {
    name: "Window Tint",
    description: "Premium ceramic tinting",
    projects: [
      { image: tint1, title: "Professional Window Tinting", description: "High-quality ceramic film installation" },
      { image: tint2, title: "Sedan Window Tint", description: "Privacy and UV protection" },
      { image: tint3, title: "Ceramic Window Tint", description: "Premium heat rejection film" },
    ],
  },
  {
    name: "Custom Decals",
    description: "Unique graphic designs",
    projects: [
      { image: decal1, title: "Custom Camo Wrap", description: "Personalized camouflage design" },
    ],
  },
];

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectCategories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectCategories.length) % projectCategories.length);
  };

  const currentCategory = projectCategories[currentSlide];

  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
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
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">Our Portfolio</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-subheading text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Explore our collection of premium vehicle transformations, each crafted with precision and passion.
          </p>
        </motion.div>

        {/* Category Navigation - Centered like reference image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex items-center gap-3 p-2 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50">
            {projectCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setCurrentSlide(index)}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span className="text-sm font-semibold">{category.name}</span>
                {index !== currentSlide && (
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {category.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-8 mb-16 ${
              currentCategory.projects.length === 1 
                ? 'md:grid-cols-1 max-w-3xl mx-auto' 
                : currentCategory.projects.length === 2
                  ? 'md:grid-cols-2 max-w-5xl mx-auto'
                  : 'md:grid-cols-3'
            }`}
          >
            {currentCategory.projects.map((project, index) => (
              <motion.div
                key={`${currentSlide}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="group relative rounded-3xl overflow-hidden card-premium"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold tracking-wider uppercase mb-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {currentCategory.name}
                  </span>
                  <h3 className="text-foreground text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-premium text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {project.description}
                  </p>
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
          className="flex items-center justify-center gap-8"
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-2xl glass-premium flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:neon-glow"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="flex gap-3">
            {projectCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-12 h-3 bg-primary neon-glow"
                    : "w-3 h-3 bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-2xl glass-premium flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:neon-glow"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
