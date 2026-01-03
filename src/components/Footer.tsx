import { Instagram } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Book Now", href: "#booking" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <span className="text-primary-foreground font-black text-sm">O</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-1.5 bg-orange-500 rounded-full transform rotate-12"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-lg tracking-wider">OPTIMUS</span>
                <span className="text-primary text-[8px] tracking-widest -mt-1">DESIGN & CUSTOMS</span>
              </div>
            </div>

            <p className="text-foreground/60 italic leading-relaxed mb-6">
              Transforming vehicles into art. Premium wraps, tints, and custom designs that reflect your unique style.
            </p>

            {/* Social */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5 text-foreground/70" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold text-lg mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-foreground/60 hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-bold text-lg mb-6">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:optimusxcustoms@gmail.com"
                className="block text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                optimusxcustoms@gmail.com
              </a>
              <a
                href="tel:+14434771124"
                className="block text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                (443) 477-1124
              </a>
              <p className="text-foreground/60">Cherry Lane Laurel MD, 20707</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/50 text-sm">
              © {currentYear} Optimus Design & Customs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-foreground/50 hover:text-primary text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-foreground/50 hover:text-primary text-sm transition-colors duration-300"
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
