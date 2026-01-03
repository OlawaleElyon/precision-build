import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, CheckCircle, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "(443) 477-1124" },
  { icon: Mail, label: "Email", value: "optimusxcustoms@gmail.com" },
  { icon: MapPin, label: "Location", value: "Cherry Lane, Laurel MD, 20707" },
  { icon: Clock, label: "Hours", value: "Mon-Fri: 9AM - 6PM" },
];

const serviceOptions = [
  "Vehicle Wrap - Full",
  "Vehicle Wrap - Partial",
  "Window Tint",
  "Custom Decals",
  "Commercial Graphics",
  "Color Change Wrap",
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      // TODO: Connect to Resend edge function for email delivery
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
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
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full bg-input border rounded-xl px-5 py-4 text-foreground 
    placeholder:text-muted-foreground/50 
    focus:outline-none transition-all duration-300
    ${focusedField === fieldName 
      ? "border-primary ring-2 ring-primary/20" 
      : "border-border hover:border-muted-foreground/30"
    }
  `;

  return (
    <section id="booking" className="py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-card to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Get Started
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Book Your Service
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to transform your vehicle? Fill out the form below and we'll get back to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-card rounded-3xl p-8 border border-border h-full">
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block">{item.label}</span>
                      <span className="text-foreground font-medium">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social link */}
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-muted-foreground text-sm mb-4">Follow our work</p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-border group-hover:border-primary/50 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="font-medium">@optimuscustoms</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-card rounded-3xl p-8 border border-border">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                    Your booking request has been submitted successfully. We'll contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="text-foreground text-sm font-medium block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        placeholder="John Doe"
                        className={inputClasses('name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-foreground text-sm font-medium block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        placeholder="john@example.com"
                        className={inputClasses('email')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="text-foreground text-sm font-medium block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        required
                        placeholder="(555) 123-4567"
                        className={inputClasses('phone')}
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredDate" className="text-foreground text-sm font-medium block mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('preferredDate')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={inputClasses('preferredDate')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="text-foreground text-sm font-medium block mb-2">
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('serviceType')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`${inputClasses('serviceType')} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select a service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service} className="bg-card">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-foreground text-sm font-medium block mb-2">
                      Project Details <span className="text-muted-foreground">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      placeholder="Tell us about your vehicle and what you're looking for..."
                      className={`${inputClasses('message')} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 rounded-xl text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
