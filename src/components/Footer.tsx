import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Reviews", href: "#testimonials" },
  { name: "About", href: "#about" },
  { name: "Book Now", href: "#booking" },
];

const services = [
  "Vehicle Wraps",
  "Window Tinting",
  "Custom Decals",
  "Commercial Graphics",
  "Color Change Wraps",
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <img src={logo} alt="Optimus Design & Customs" className="h-20 md:h-24 w-auto drop-shadow-[0_0_20px_hsla(199,100%,50%,0.3)]" />
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              Transforming vehicles into masterpieces. Premium wraps, tints, and custom designs that reflect your unique style.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/optimus.customs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold text-lg mb-6">Quick Links</h4>
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
            <h4 className="text-foreground font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-muted-foreground text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-bold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="mailto:optimusxcustoms@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                optimusxcustoms@gmail.com
              </a>
              <a
                href="tel:+14434771124"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                (443) 477-1124
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                Cherry Lane, Laurel MD, 20707
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Optimus Design & Customs. All rights reserved.
            </p>
            <div className="flex gap-6">
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
