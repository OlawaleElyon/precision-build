import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
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
    tag: "WRAP",
    projects: [
      { image: projectWrap1, title: "Commercial Fleet", desc: "Full vehicle transformation" },
      { image: projectWrap2, title: "Matte Finish", desc: "Premium color change" },
      { image: projectWrap3, title: "Custom Design", desc: "Branded graphics" },
    ],
  },
  {
    name: "Window Tint",
    tag: "TINT",
    projects: [
      { image: projectTint1, title: "Performance Tint", desc: "Heat rejection" },
      { image: projectTint2, title: "Privacy Glass", desc: "Premium ceramic" },
      { image: projectTint3, title: "UV Protection", desc: "Crystal clear view" },
    ],
  },
  {
    name: "Custom Decals",
    tag: "DECALS",
    projects: [
      { image: projectDecal1, title: "Racing Livery", desc: "Motorsport inspired" },
      { image: projectDecal2, title: "Rally Graphics", desc: "Competition ready" },
      { image: projectDecal3, title: "Custom Art", desc: "One of a kind" },
    ],
  },
];

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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
    <section id="projects" className="py-32 bg-gradient-subtle relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              Our Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-xl">
              A showcase of transformations that push the boundaries of automotive design.
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-2"
          >
            {projectCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setCurrentSlide(index)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentCategory.projects.map((project, index) => (
              <motion.div
                key={`${currentSlide}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredProject === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Category tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wider">
                    {currentCategory.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    initial={false}
                    animate={{
                      y: hoveredProject === index ? 0 : 10,
                      opacity: hoveredProject === index ? 1 : 0.9
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.desc}
                    </p>
                  </motion.div>

                  {/* Arrow icon on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredProject === index ? 1 : 0,
                      y: hoveredProject === index ? 0 : 10
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute bottom-6 right-6"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mt-12"
        >
          {/* Pagination */}
          <div className="flex items-center gap-3">
            {projectCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-12 h-1.5 bg-primary rounded-full"
                    : "w-6 h-1.5 bg-border rounded-full hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
