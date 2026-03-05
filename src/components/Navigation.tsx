import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 custom-expo ${
          isScrolled
            ? 'w-[95%] max-w-6xl glass-nav rounded-full py-3 px-6'
            : 'w-[95%] max-w-7xl bg-transparent py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-display text-lg">C&Y</span>
            </div>
            <span className={`font-display text-xl tracking-wide transition-colors ${
              isScrolled ? 'text-brand-text' : 'text-white'
            }`}>
              QUALITY PAINT
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative font-medium text-sm tracking-wide transition-colors group ${
                  isScrolled ? 'text-brand-text hover:text-brand-blue' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15863821603"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white rounded-full font-medium text-sm hover:bg-brand-orange/90 transition-all hover:shadow-glow-orange"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-brand-text' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-text' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 custom-expo ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-display text-xl">C&Y</span>
            </div>
            <span className="font-display text-2xl tracking-wide text-brand-text">
              QUALITY PAINT
            </span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-display text-3xl text-brand-text hover:text-brand-blue transition-colors"
            >
              {link.name}
            </button>
          ))}
          <a
            href="tel:+15863821603"
            className="flex items-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-full font-medium text-lg mt-4"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>

          {/* HiHello Card */}
          <a
            href="https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-brand-blue/10 text-brand-blue rounded-full font-medium mt-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 13H7v-2h4v2zm6-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            Digital Business Card
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
