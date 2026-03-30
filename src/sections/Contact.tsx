import { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Calendar,
  MessageSquare,
  CheckCircle,
  Loader2,
  ExternalLink,
  Facebook,
  Instagram
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Interior Painting',
  'Exterior Painting',
  'Drywall Installation',
  'Drywall Repair',
  'Bathroom Remodeling',
  'Kitchen Remodeling',
  'Flooring Installation',
  'Epoxy Coatings',
  'Commercial Services',
  'Other',
];

// Social media links
const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/CyStore.Calzado?rdid=9gh15ZpioKMJVQ2a&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Aza2vRr3c%2F#',
    icon: Facebook,
    color: 'bg-blue-600'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/cyqualitypaint?igsh=MW96YWpxZnRzaHNsYQ==',
    icon: Instagram,
    color: 'bg-pink-600'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@cyqualitypaint',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    color: 'bg-black'
  }
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredDate: '',
  });

  // Calculate minimum date (48 hours from now)
  const getMinDate = () => {
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + 48);
    return minDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send to backend API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          to: 'info@cyqualitypaint.com'
        }),
      });
      
      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          preferredDate: '',
        });
      }
    } catch (error) {
      console.error('Error sending form:', error);
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(813) 952-0911',
      href: 'tel:+18139520911',
      color: 'bg-brand-blue',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@cyqualitypaint.com',
      href: 'mailto:info@cyqualitypaint.com',
      color: 'bg-brand-orange',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Hillsborough, FL',
      href: 'https://maps.google.com',
      color: 'bg-green-500',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Sat: 8AM-6PM',
      href: null,
      color: 'bg-purple-500',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-white"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 contact-content">
            <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-brand-text mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your free estimate today. Our team is ready to help bring your vision to life.
              <br />
              <span className="text-sm text-brand-orange font-medium">
                * Estimates scheduled minimum 48 hours in advance
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6 contact-content">
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-4 bg-brand-gray rounded-xl hover:shadow-lg transition-all duration-300 group">
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{item.label}</div>
                        <div className="font-medium text-brand-text">{item.value}</div>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={index} href={item.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Social Media Links */}
              <div className="bg-white border-2 border-brand-gray rounded-2xl p-6">
                <h4 className="font-display text-lg mb-4 text-brand-text">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-transform`}
                        aria-label={social.name}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-brand-black rounded-2xl p-6 text-white">
                <h3 className="font-display text-2xl mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/18139520911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 text-green-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a
                    href="tel:+18139520911"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-brand-blue" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-purple-400" />
                    <span>Digital Business Card</span>
                  </a>
                  <button
                    onClick={() => {
                      const minDate = getMinDate();
                      setFormData(prev => ({ ...prev, preferredDate: minDate }));
                      document.getElementById('booking-date')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-brand-orange/20 rounded-xl hover:bg-brand-orange/30 transition-colors text-left"
                  >
                    <Calendar className="w-5 h-5 text-brand-orange" />
                    <span>Book an Estimate (48h+)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 contact-content">
              <div className="bg-brand-gray rounded-3xl p-8 lg:p-10">
                <h3 className="font-display text-3xl text-brand-text mb-2">
                  Request a Free Quote
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll contact you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12 bg-white border-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12 bg-white border-0"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(813) 952-0911"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-12 bg-white border-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Needed *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger className="h-12 bg-white border-0">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">
                      Preferred Date 
                      <span className="text-brand-orange text-sm ml-2">(Minimum 48 hours from today)</span>
                    </Label>
                    <Input
                      id="booking-date"
                      type="date"
                      min={getMinDate()}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="h-12 bg-white border-0"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      We require at least 48 hours notice to schedule estimates.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="bg-white border-0 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-lg rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Get My Free Quote
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    By submitting, you agree to our privacy policy. We'll never spam you.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Quote Request Sent!
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for reaching out. Our team will contact you within 24 hours to schedule your free estimate at info@cyqualitypaint.com.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-brand-blue hover:bg-brand-blue/90"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
