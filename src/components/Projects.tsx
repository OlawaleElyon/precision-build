import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import projectWrap1 from "@/assets/project-wrap-1.jpg";
import projectWrap2 from "@/assets/project-wrap-2.jpg";
import projectWrap3 from "@/assets/project-wrap-3.jpg";
import projectTint1 from "@/assets/project-tint-1.jpg";
import projectTint2 from "@/assets/project-tint-2.jpg";
import projectTint3 from "@/assets/project-tint-3.jpg";
import projectDecal1 from "@/assets/project-decal-1.jpg";
import projectDecal2 from "@/assets/project-decal-2.jpg";
import projectDecal3 from "@/assets/project-decal-3.jpg";

const projectCategories = [
  {
    name: "Vehicle Wraps",
    projects: [
      { image: projectWrap1, alt: "Custom vehicle wrap project" },
      { image: projectWrap2, alt: "Commercial truck wrap" },
      { image: projectWrap3, alt: "Full color change wrap" },
    ],
  },
  {
    name: "Window Tint",
    projects: [
      { image: projectTint1, alt: "Professional window tinting" },
      { image: projectTint2, alt: "SUV window tint" },
      { image: projectTint3, alt: "Luxury car tint" },
    ],
  },
  {
    name: "Custom Decals",
    projects: [
      { image: projectDecal1, alt: "Custom decal graphics" },
      { image: projectDecal2, alt: "Racing livery design" },
      { image: projectDecal3, alt: "Brand graphics" },
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
    <section id="projects" className="py-24 bg-card/50 relative" ref={ref}>
      {/* Section Divider */}
      <div className="section-divider absolute top-0 left-0 right-0"></div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Browse our gallery of transformations that showcase our craftsmanship and attention to detail.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2">
            {projectCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setCurrentSlide(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-accent text-white shadow-lg"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {currentCategory.projects.map((project, index) => (
            <motion.div
              key={`${currentSlide}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="relative group rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl card-glow"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-accent px-3 py-1 rounded text-sm font-medium text-white mb-2">
                    {currentCategory.name}
                  </span>
                  <p className="text-foreground text-sm">{project.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {projectCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-10 bg-primary"
                    : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
