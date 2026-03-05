import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline de entrada
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animación de la imagen
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      // Animación de la línea azul
      tl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6 },
        '-=0.8'
      );

      // Animación del título (caracteres)
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.03 },
          '-=0.4'
        );
      }

      // Animación del contenido
      tl.fromTo(
        contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Efecto parallax al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        gsap.to(imageRef.current, {
          y: scrollY * 0.3,
          duration: 0.3,
          ease: 'none',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleText = 'Professional Painting & Remodeling';
  const titleChars = titleText.split('').map((char, i) => (
    <span key={i} className="char inline-block overflow-hidden">
      <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-brand-black"
    >
      {/* Imagen de fondo */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"
          alt="Modern living room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Línea divisoria azul */}
      <div
        ref={lineRef}
        className="absolute left-[45%] top-0 w-1 h-full bg-brand-blue origin-top hidden lg:block"
        style={{ transform: 'skewX(-15deg)' }}
      />

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex items-center section-padding">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center pt-24">
          {/* Columna izquierda - Contenido */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none tracking-wide"
              >
                {titleChars}
              </h1>
            </div>

            <div ref={contentRef} className="space-y-6">
              <p className="text-lg sm:text-xl text-white/80 max-w-lg font-light leading-relaxed">
                C&Y Quality Paint LLC ofrece servicios de pintura, drywall y remodelación 
                de alta calidad en Florida. Acabados excepcionales y atención detallada 
                en cada proyecto.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="btn-primary inline-flex items-center gap-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#services"
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Our Services
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-6">
                <div>
                  <div className="font-display text-4xl text-brand-blue">10+</div>
                  <div className="text-white/60 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="font-display text-4xl text-brand-orange">500+</div>
                  <div className="text-white/60 text-sm">Projects Done</div>
                </div>
                <div>
                  <div className="font-display text-4xl text-white">100%</div>
                  <div className="text-white/60 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Tarjetas flotantes */}
          <div className="hidden lg:block relative h-[500px]">
            {/* Tarjeta de chat */}
            <div className="absolute top-10 right-10 bg-white rounded-2xl p-5 shadow-2xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-brand-text">Chat with us</div>
                  <div className="text-sm text-gray-500">24/7 Support</div>
                </div>
              </div>
            </div>

            {/* Tarjeta de citas */}
            <div className="absolute bottom-20 left-10 bg-white rounded-2xl p-5 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-brand-text">Book Online</div>
                  <div className="text-sm text-gray-500">Free Estimates</div>
                </div>
              </div>
            </div>

            {/* Badge de garantía */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-glow">
              <span className="font-display text-3xl">2</span>
              <span className="text-xs text-center">Years<br/>Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
