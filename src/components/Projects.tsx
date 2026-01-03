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
    name: "Vehicle Wrap",
    projects: [
      { image: projectWrap1, alt: "Red pickup truck with commercial wrap" },
      { image: projectWrap2, alt: "Black truck with business graphics" },
      { image: projectWrap3, alt: "Commercial trailer wrap" },
    ],
  },
  {
    name: "Window Tint",
    projects: [
      { image: projectTint1, alt: "Ford Raptor with window tint" },
      { image: projectTint2, alt: "White Honda with tinted windows" },
      { image: projectTint3, alt: "Nissan with blue reflective tint" },
    ],
  },
  {
    name: "Custom Decals",
    projects: [
      { image: projectDecal1, alt: "Chrysler with camo wrap" },
      { image: projectDecal2, alt: "Yellow WRX rally car" },
      { image: projectDecal3, alt: "Subaru with racing livery" },
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
    <section id="projects" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Our Projects
          </h2>
          <p className="text-foreground/70 text-lg italic max-w-2xl">
            A showcase of transformations that push the boundaries of automotive design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {currentCategory.projects.map((project, index) => (
            <motion.div
              key={`${currentSlide}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="relative group rounded-xl overflow-hidden aspect-square"
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="btn-gradient px-4 py-1.5 rounded-full text-sm font-medium text-primary-foreground">
                  {currentCategory.name}
                </span>
              </div>

              {/* Image */}
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    ? "w-8 bg-primary"
                    : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
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
