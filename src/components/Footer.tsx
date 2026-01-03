import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Book Now", href: "#booking" },
];

const services = [
  "Vehicle Wraps",
  "Window Tint",
  "Custom Decals",
  "Color Change",
  "Commercial Graphics",
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-primary-foreground font-display font-bold text-xl">O</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-display font-bold text-lg tracking-wider">OPTIMUS</span>
                <span className="text-primary text-[9px] tracking-[0.2em] font-medium">DESIGN & CUSTOMS</span>
              </div>
            </a>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              Premium automotive customization. Transforming vehicles into works of art since 2014.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg border border-border group-hover:border-primary/50 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">@optimuscustoms</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-display font-bold mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-display font-bold mb-6">Services</h4>
            <nav className="space-y-3">
              {services.map((service) => (
                <span
                  key={service}
                  className="block text-muted-foreground text-sm"
                >
                  {service}
                </span>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-display font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <a
                href="mailto:optimusxcustoms@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group"
              >
                optimusxcustoms@gmail.com
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="tel:+14434771124"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group"
              >
                (443) 477-1124
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-muted-foreground text-sm">
                Cherry Lane<br />
                Laurel MD, 20707
              </p>
              <p className="text-muted-foreground text-sm">
                Mon-Fri: 9AM - 6PM<br />
                Sat: 10AM - 4PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Optimus Design & Customs. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
