import { 
  Facebook, 
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowUp
} from 'lucide-react';
import logo from '../img/logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'Interior Painting', href: '#services' },
      { name: 'Exterior Painting', href: '#services' },
      { name: 'Drywall Services', href: '#services' },
      { name: 'Remodeling', href: '#services' },
      { name: 'Flooring', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Projects', href: '#projects' },
      { name: 'Testimonials', href: '#' },
      { name: 'Contact', href: '#contact' },
    ],
    support: [
      { name: 'FAQs', href: '#' },
      { name: 'Get a Quote', href: '#contact' },
      { name: 'Book Online', href: '#contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  // Redes sociales actualizadas
  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/CyStore.Calzado?rdid=9gh15ZpioKMJVQ2a&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Aza2vRr3c%2F#', 
      label: 'Facebook' 
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/cyqualitypaint?igsh=MW96YWpxZnRzaHNsYQ==', 
      label: 'Instagram' 
    },
    { 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ), 
      href: 'https://www.tiktok.com/@cyqualitypaint', 
      label: 'TikTok' 
    },
  ];

  return (
    <footer className="bg-brand-black text-white">
     {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column - LOGO ACTUALIZADO */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={logo} 
                  alt="C&Y Quality Paint LLC" 
                  className="w-10 h-10 object-contain rounded-lg"
                />
                <span className="font-display text-2xl tracking-wide">
                  QUALITY PAINT
                </span>
              </div>
              <p className="text-white/60 text-sm mb-6 max-w-xs">
                Professional painting, drywall, and remodeling services for 
                residential and commercial properties in Florida.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a href="tel:+18139520911" className="flex items-center gap-3 text-white/60 hover:text-brand-blue transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  (813) 952-0911
                </a>
                <a href="mailto:info@cyqualitypaint.com" className="flex items-center gap-3 text-white/60 hover:text-brand-blue transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  info@cyqualitypaint.com
                </a>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4" />
                  Hillsborough, FL
                </div>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="font-display text-lg mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-brand-blue transition-colors text-sm"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-display text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-brand-blue transition-colors text-sm"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-display text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-brand-blue transition-colors text-sm"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-display text-lg mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-blue transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Business Hours */}
              <div className="mt-6">
                <h4 className="font-medium text-sm mb-2">Business Hours</h4>
                <div className="text-white/60 text-sm space-y-1">
                  <div>Mon - Fri: 8AM - 6PM</div>
                  <div>Saturday: 9AM - 4PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>

              {/* HiHello Card Link */}
              <div className="mt-6">
                <a 
                  href="https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-lg text-sm hover:bg-brand-blue/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 13H7v-2h4v2zm6-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  Digital Business Card
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="section-padding py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} C&Y Quality Paint LLC. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/40 hover:text-brand-blue transition-colors text-sm"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
