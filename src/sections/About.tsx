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
  { icon: Gem, title: 'Quality', description: 'We strive to deliver perfect and lasting finishes on every project.' },
  { icon: Shield, title: 'Integrity', description: 'We act with honesty and transparency in every project.' },
  { icon: Heart, title: 'Commitment', description: 'We meet our deadlines and guarantee results.' },
  { icon: Users, title: 'Teamwork', description: 'We value communication and cooperation.' },
  { icon: Lightbulb, title: 'Innovation', description: 'We incorporate new techniques and materials to constantly improve.' },
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

              {/* Badge flotante - 10 YEARS EXPERIENCE */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white rounded-2xl p-6 shadow-glow-orange z-30">
                <div className="font-display text-5xl">10+</div>
                <div className="text-sm">Years of<br />Experience</div>
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
                C&Y Quality Paint LLC is a company established in Florida, specializing 
                primarily in residential and commercial painting services. Our purpose is 
                to offer exceptional finishes, lasting results, and detailed attention 
                that reflects quality in every project.
              </p>

              <p className="text-gray-600 leading-relaxed">
                In addition to painting, we offer complementary drywall and remodeling 
                services, allowing us to provide complete solutions for renovation and 
                maintenance projects. From a simple repaint to a total interior transformation, 
                we bring color, precision, and commitment to every job.
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

          {/* History Section - MODIFICADO: 10 años de experiencia */}
          <div className="bg-brand-gray rounded-3xl p-8 lg:p-12 mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-4xl text-brand-text mb-6">
                  Our History & Experience
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  C&Y Quality Paint LLC was born with the vision of offering professional, 
                  honest, and high-quality painting services in the Hillsborough area and 
                  surroundings. We started as a small team focused on detail and customer 
                  satisfaction, and over time we gained recognition for our punctuality, 
                  responsibility, and impeccable results.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Thanks to the trust of our clients and excellence in every project, the 
                  company has grown and today works in collaboration with builders, general 
                  contractors, and property owners in Hillsborough County and surrounding 
                  areas, offering reliable and proven quality service.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* CAMBIO: 10+ Years Experience en lugar de Year Founded */}
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="font-display text-5xl text-brand-blue mb-2">10+</div>
                  <div className="text-gray-600 text-sm">Years of<br/>Experience</div>
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
                To provide high-quality painting and remodeling services that enhance the 
                beauty, value, and comfort of every property, always offering professionalism, 
                responsibility, and results that exceed our clients' expectations.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-brand-orange rounded-3xl p-8 lg:p-10 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-3xl mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                To become one of the most recognized and reliable painting and remodeling 
                companies in Florida, standing out for our commitment, innovation, and 
                excellence in work.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="font-display text-4xl text-brand-text mb-4">Our Values</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide every project we undertake
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
