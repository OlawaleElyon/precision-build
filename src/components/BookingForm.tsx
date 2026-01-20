import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, CheckCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  { icon: Mail, label: "Email", value: "optimusxcustoms@gmail.com", href: "mailto:optimusxcustoms@gmail.com" },
  { icon: Phone, label: "Phone", value: "(443) 477-1124", href: "tel:+14434771124" },
  { icon: Instagram, label: "Instagram", value: "@optimus.customs", href: "https://instagram.com/optimus.customs" },
  { icon: MapPin, label: "Address", value: "Cherry Lane, Laurel MD, 20707", href: "#" },
];

const serviceOptions = [
  "Vehicle Wrap",
  "Window Tint",
  "Custom Decals",
  "Full Color Change",
  "Commercial Graphics",
];

const BookingForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-booking-email', {
        body: formData,
      });

      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "Booking Request Sent!",
        description: "We'll get back to you within 24 hours to confirm your appointment.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        preferredDate: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error sending booking email:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section id="booking" className="py-24 bg-card/50 relative" ref={ref}>
      {/* Section Divider */}
      <div className="section-divider absolute top-0 left-0 right-0"></div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Get Started
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Book Your Appointment
          </h2>
          <p className="text-foreground/80 text-lg max-w-xl mx-auto leading-relaxed font-display italic">
            Ready to transform your vehicle? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-6 border border-border h-full">
              <h3 className="text-xl font-bold text-foreground mb-2">Contact Info</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Reach out to us directly or fill out the form.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs block">{item.label}</span>
                      <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-foreground font-semibold mb-3 text-sm">Business Hours</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Monday</span>
                    <span className="text-foreground">8:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tuesday</span>
                    <span className="text-foreground">8:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Wednesday</span>
                    <span className="text-foreground">8:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Thursday</span>
                    <span className="text-foreground">8:30 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Friday</span>
                    <span className="text-foreground">8:30 AM – 5:30 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Saturday</span>
                    <span className="text-foreground">8:30 AM – 5:30 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-2 bg-card rounded-2xl p-8 border border-border card-elevated"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Your booking request has been submitted successfully. We'll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-foreground text-sm font-medium block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-foreground text-sm font-medium block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="text-foreground text-sm font-medium block mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(555) 123-4567"
                      className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceType" className="text-foreground text-sm font-medium block mb-2">
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-muted-foreground">
                        Select a service
                      </option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service} className="bg-card">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredDate" className="text-foreground text-sm font-medium block mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-foreground text-sm font-medium block mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your vehicle and what you'd like done..."
                    className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon py-4 rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
