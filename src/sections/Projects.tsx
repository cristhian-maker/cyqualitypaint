import { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Living Room',
    category: 'Interior',
    beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    description: 'Complete interior transformation with premium paints',
  },
  {
    id: 2,
    title: 'Kitchen Cabinets',
    category: 'Cabinetry',
    beforeImage: 'https://images.unsplash.com/photo-1556909114-44e57101c60e?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    description: 'Cabinet refinishing with Italian 2K coating',
  },
  {
    id: 3,
    title: 'Exterior Home',
    category: 'Exterior',
    beforeImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'Full exterior repaint with weather protection',
  },
  {
    id: 4,
    title: 'Office Space',
    category: 'Commercial',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    description: 'Commercial office painting project',
  },
  {
    id: 5,
    title: 'Bedroom Suite',
    category: 'Interior',
    beforeImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    description: 'Luxury bedroom painting with accent walls',
  },
  {
    id: 6,
    title: 'Deck Restoration',
    category: 'Exterior',
    beforeImage: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80',
    description: 'Deck staining and wood protection',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const cardWidth = 400;
    const newScrollLeft = direction === 'left' 
      ? sliderRef.current.scrollLeft - cardWidth 
      : sliderRef.current.scrollLeft + cardWidth;
    
    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setCurrentIndex(prev => 
      direction === 'left' 
        ? Math.max(0, prev - 1) 
        : Math.min(projects.length - 1, prev + 1)
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 bg-brand-black overflow-hidden"
    >
      {/* Header */}
      <div className="section-padding mb-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="inline-block px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-full text-sm font-medium mb-4">
              Our Portfolio
            </span>
            <h2 className="projects-title font-display text-5xl sm:text-6xl lg:text-7xl text-white">
              Recent Projects
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl">
              See the transformations we have created for our satisfied clients.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo('left')}
              className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-black transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollTo('right')}
              className="w-14 h-14 rounded-full bg-brand-blue flex items-center justify-center text-white hover:bg-brand-blue/80 transition-all"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-4 sm:px-6 lg:px-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[350px] sm:w-[400px] group"
            style={{
              transform: `perspective(1000px) rotateY(${index < currentIndex ? '5deg' : index > currentIndex ? '-5deg' : '0deg'})`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            <div className="relative h-[450px] rounded-2xl overflow-hidden">
              {/* After Image (Default) */}
              <div className="absolute inset-0">
                <img
                  src={project.afterImage}
                  alt={`${project.title} after`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Before Image (On Hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <img
                  src={project.beforeImage}
                  alt={`${project.title} before`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  Before
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-brand-blue text-white text-xs rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {project.description}
                </p>
                <button className="inline-flex items-center gap-2 text-brand-blue font-medium hover:gap-3 transition-all">
                  <Eye className="w-4 h-4" />
                  View Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="section-padding mt-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-brand-blue' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
