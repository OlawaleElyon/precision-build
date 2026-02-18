import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Reviews", href: "#testimonials" },
    { name: "About", href: "#about" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between bg-card/60 backdrop-blur-xl rounded-2xl px-6 py-4 border border-border/50 shadow-2xl">
          {/* Logo */}
          <a href="#home" className="flex items-center group flex-shrink-0">
            <img 
              src={logo} 
              alt="Optimus Design & Customs" 
              className="h-16 md:h-20 lg:h-24 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_20px_hsla(199,100%,50%,0.4)]" 
            />
          </a>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary/10 transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+443 477 1124"
              className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-primary/10"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">443 477 1124</span>
            </a>
            <a
              href="#booking"
              className="btn-neon px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-4 bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-border/50 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground/80 hover:text-primary text-base font-medium transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-primary/10"
                >
                  {link.name}
                </a>
              ))}
              <div className="border-t border-border/50 mt-4 pt-4">
                <a
                  href="tel:+443 477 1124"
                  className="flex items-center gap-2 text-primary py-3 px-4"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">57 318 6355875</span>
                </a>
                <a
                  href="#booking"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-neon px-6 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-300 text-center mt-2 block"
                >
                  Book Now
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
