import { useEffect, useRef } from 'react';
import { Check, Award, Users, Clock, Target, Eye, Gem, Shield, Heart, Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Clock, value: '10+', label: 'Years Experience', color: 'bg-brand-blue' },
  { icon: Users, value: '500+', label: 'Projects Completed', color: 'bg-brand-orange' },
  { icon: Award, value: '100%', label: 'Satisfaction Rate', color: 'bg-green-500' },
  { icon: Check, value: '50+', label: '5-Star Reviews', color: 'bg-purple-500' },
];

const values = [
  { icon: Gem, title: 'Calidad', description: 'Nos esforzamos por ofrecer acabados perfectos y duraderos.' },
  { icon: Shield, title: 'Integridad', description: 'Actuamos con honestidad y transparencia en cada proyecto.' },
  { icon: Heart, title: 'Compromiso', description: 'Cumplimos con nuestros tiempos y garantizamos resultados.' },
  { icon: Users, title: 'Trabajo en Equipo', description: 'Valoramos la comunicación y la cooperación.' },
  { icon: Lightbulb, title: 'Innovación', description: 'Incorporamos nuevas técnicas y materiales para mejorar constantemente.' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax para imagen 1 (rápido)
      gsap.to(image1Ref.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Parallax para imagen 2 (lento)
      gsap.to(image2Ref.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Animación del contenido
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de stats
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
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
      id="about"
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Company Description */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Columna izquierda - Imágenes */}
            <div className="relative h-[600px] hidden lg:block">
              {/* Imagen 1 */}
              <div
                ref={image1Ref}
                className="absolute top-0 left-0 w-[70%] h-[350px] rounded-2xl overflow-hidden shadow-2xl z-10"
                style={{ willChange: 'transform' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80"
                  alt="Professional painters at work"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Imagen 2 */}
              <div
                ref={image2Ref}
                className="absolute bottom-0 right-0 w-[60%] h-[300px] rounded-2xl overflow-hidden shadow-2xl z-20"
                style={{ willChange: 'transform' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80"
                  alt="Painter applying paint"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge flotante */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white rounded-2xl p-6 shadow-glow-orange z-30">
                <div className="font-display text-5xl">10+</div>
                <div className="text-sm">Years of<br />Excellence</div>
              </div>
            </div>

            {/* Columna derecha - Contenido */}
            <div ref={contentRef} className="space-y-6">
              <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium">
                About Us
              </span>

              <h2 className="font-display text-5xl sm:text-6xl text-brand-text leading-tight">
                About C&Y Quality Paint LLC
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                C&Y Quality Paint LLC es una empresa establecida en Florida, especializada 
                principalmente en servicios de pintura residencial y comercial. Nuestro 
                propósito es ofrecer acabados excepcionales, resultados duraderos y una 
                atención detallada que refleje calidad en cada proyecto.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Además de la pintura, contamos con servicios complementarios de drywall y 
                remodelación, lo que nos permite ofrecer soluciones completas para proyectos 
                de renovación y mantenimiento. Desde un simple repinte hasta una transformación 
                total de interiores, aportamos color, precisión y compromiso en cada trabajo.
              </p>

              {/* CTA */}
              <div className="pt-6">
                <a
                  href="#contact"
                  className="btn-primary inline-flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Your Free Quote
                </a>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="bg-brand-gray rounded-3xl p-8 lg:p-12 mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-4xl text-brand-text mb-6">
                  Our History & Trajectory
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  C&Y Quality Paint LLC nació con la visión de ofrecer servicios de pintura 
                  profesionales, honestos y de alta calidad en el área de Hillsborough y sus 
                  alrededores. Comenzamos como un equipo pequeño enfocado en el detalle y la 
                  satisfacción del cliente.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Gracias a la confianza de nuestros clientes y a la excelencia en cada proyecto, 
                  la empresa ha crecido y hoy trabaja en colaboración con constructores, 
                  contratistas generales y propietarios en los condados de Hillsborough y sus 
                  alrededores, ofreciendo un servicio confiable y de calidad comprobada.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="font-display text-5xl text-brand-blue mb-2">2014</div>
                  <div className="text-gray-600 text-sm">Year Founded</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="font-display text-5xl text-brand-orange mb-2">Hillsborough</div>
                  <div className="text-gray-600 text-sm">Primary Service Area</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="font-display text-5xl text-green-500 mb-2">500+</div>
                  <div className="text-gray-600 text-sm">Happy Clients</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="font-display text-5xl text-purple-500 mb-2">50+</div>
                  <div className="text-gray-600 text-sm">Contractor Partners</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {/* Mission */}
            <div className="bg-brand-blue rounded-3xl p-8 lg:p-10 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-3xl mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                Brindar servicios de pintura y remodelación de alta calidad que mejoren la 
                belleza, el valor y el confort de cada propiedad, ofreciendo siempre 
                profesionalismo, responsabilidad y resultados que superen las expectativas 
                de nuestros clientes.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-brand-orange rounded-3xl p-8 lg:p-10 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-3xl mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                Convertirnos en una de las empresas de pintura y remodelación más reconocidas 
                y confiables de Florida, destacándonos por nuestro compromiso, innovación y 
                excelencia en el trabajo.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="font-display text-4xl text-brand-text mb-4">Our Values</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Los principios que guían cada proyecto que emprendemos
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-brand-gray rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-blue group-hover:scale-110 transition-all">
                      <Icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-display text-xl text-brand-text mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="stat-item bg-brand-gray rounded-2xl p-6 text-center group hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-display text-4xl text-brand-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
