import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Paintbrush, Building2, Hammer, Square, Grid3X3 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Interior & Exterior Painting',
    subtitle: 'Pintura Interior y Exterior',
    description: 'Servicios profesionales de pintura para interiores y exteriores con acabados de alta calidad.',
    features: [
      'Interior painting (walls, ceilings & trim)',
      'Exterior painting',
      'Doors (interior & exterior)',
      'Kitchen & bathroom cabinets',
      'New construction painting',
      'Repaints & touch-ups',
      'Soffit, fascia & exterior trim',
      'Pressure washing',
      'Surface protection & prep work',
    ],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    icon: Paintbrush,
  },
  {
    id: 2,
    title: 'Drywall Installation & Finishes',
    subtitle: 'Instalación y Acabados de Drywall',
    description: 'Instalación completa de drywall con acabados profesionales de nivel 3, 4 y 5.',
    features: [
      'Full drywall installation',
      'Drywall repairs (small, medium & large)',
      'Level 3, 4 & 5 finishes',
      'Knockdown texture',
      'Orange peel texture',
      'Smooth finish',
      'Popcorn ceiling removal',
      'Crack & water damage repair',
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    icon: Square,
  },
  {
    id: 3,
    title: 'Remodeling Services',
    subtitle: 'Servicios de Remodelación',
    description: 'Servicios completos de remodelación para baños, cocinas y más.',
    features: [
      'Bathroom remodeling',
      'Kitchen remodeling',
      'Cabinet installation',
      'Vanity installation',
      'Backsplash installation',
      'Trim & molding installation',
      'Final painting & finish work',
      'Light demolition & debris removal',
    ],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    icon: Hammer,
  },
  {
    id: 4,
    title: 'Flooring & Surface Coatings',
    subtitle: 'Pisos y Recubrimientos',
    description: 'Instalación de pisos y recubrimientos epóxicos para residencias y comercios.',
    features: [
      'Luxury Vinyl Plank (LVP) flooring',
      'Tile & porcelain installation',
      'Subfloor leveling & preparation',
      'Epoxy floor coatings',
      'Garage floor coatings',
      'Commercial area coatings',
      'Paver & concrete sealing',
    ],
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    icon: Grid3X3,
  },
  {
    id: 5,
    title: 'Residential & Commercial',
    subtitle: 'Residencial y Comercial',
    description: 'Servicios especializados para propiedades residenciales y comerciales.',
    features: [
      'Residential properties',
      'Commercial buildings',
      'Rental turnovers & make-ready',
      'Investor & property management',
      'Subcontractor services',
      'General contractor partnerships',
      'HOA projects',
      'After-hours service available',
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    icon: Building2,
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de las tarjetas
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-brand-gray"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-brand-text"
          >
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones completas de pintura, drywall y remodelación para 
            proyectos residenciales y comerciales en Florida.
          </p>
        </div>

        {/* Services Grid - Desktop Accordion */}
        <div
          ref={cardsRef}
          className="hidden lg:flex h-[650px] gap-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={service.id}
                className={`service-card relative rounded-2xl overflow-hidden transition-all duration-500 custom-expo ${
                  isActive ? 'flex-[2.5]' : 'flex-1'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    transform: isActive ? 'scale(1)' : 'scale(1.2)',
                  }}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive ? 'bg-black/40' : 'bg-black/70'
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-brand-blue flex items-center justify-center mb-4 transition-all duration-500 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-70'
                    }`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-display text-2xl text-white mb-1 transition-all duration-500 ${
                      isActive ? 'text-4xl' : 'text-xl'
                    }`}
                  >
                    {service.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className={`text-white/60 text-sm mb-2 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {service.subtitle}
                  </p>

                  {/* Description - Only visible when active */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-white/80 mb-4">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                          <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-brand-blue font-medium hover:gap-3 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Services Grid - Mobile */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card relative rounded-2xl overflow-hidden h-[450px]"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{service.subtitle}</p>
                  <p className="text-white/70 text-sm mb-4">{service.description}</p>
                  
                  {/* Features - Mobile */}
                  <ul className="space-y-1 mb-4">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/60 text-xs">
                        <div className="w-1 h-1 bg-brand-orange rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-brand-blue font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            ¿Necesita un servicio específico? Contáctenos para discutir su proyecto.
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Request a Free Estimate
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
