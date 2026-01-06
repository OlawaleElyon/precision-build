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
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <img 
              src={logo} 
              alt="Optimus Design & Customs" 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground text-sm font-medium tracking-wide transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+14434771124"
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">(443) 477-1124</span>
            </a>
            <a
              href="#booking"
              className="btn-red px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-6 pb-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground/80 hover:text-foreground text-base font-medium transition-colors duration-300 py-2 border-b border-border/50"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:+14434771124"
                className="flex items-center gap-2 text-primary py-2"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">(443) 477-1124</span>
              </a>
              <a
                href="#booking"
                onClick={() => setIsMenuOpen(false)}
                className="btn-red px-6 py-3.5 rounded-lg text-base font-semibold text-white transition-all duration-300 text-center mt-2"
              >
                Book Now
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
