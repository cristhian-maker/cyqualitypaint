import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'CY Quality Paint transformed our home completely. The attention to detail was incredible, and the team was professional from start to finish. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    content: 'We hired them for our office renovation and they exceeded our expectations. Minimal disruption to our operations and the results are stunning.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Property Manager',
    content: 'As a property manager, I need reliable contractors. CY Quality Paint has become our go-to for all painting needs. Always on time and within budget.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Homeowner',
    content: 'The cabinet refinishing work was exceptional. Our kitchen looks brand new! The Italian 2K coating they used is incredibly durable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    role: 'Interior Designer',
    content: 'I recommend CY Quality Paint to all my clients. Their color matching is perfect and the finish quality is unmatched in the industry.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
  },
  {
    id: 6,
    name: 'Robert Wilson',
    role: 'Real Estate Agent',
    content: 'They helped prepare multiple properties for sale. The ROI on their work is incredible - properties sell faster and for more money.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
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

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const next = () => goTo((currentIndex + 1) % testimonials.length);
  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-brand-gray overflow-hidden"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="testimonials-title font-display text-5xl sm:text-6xl lg:text-7xl text-brand-text">
              What Our Clients Say
            </h2>
          </div>

          {/* Main Testimonial Display */}
          <div className="relative max-w-4xl mx-auto">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-0 lg:-left-16">
              <Quote className="w-20 h-20 text-brand-blue/20" />
            </div>

            {/* Testimonial Card */}
            <div
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-brand-blue/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center lg:text-left flex-1">
                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-brand-orange fill-brand-orange" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Author */}
                  <div>
                    <div className="font-display text-xl text-brand-text">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goTo(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-brand-blue'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-gray transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center hover:bg-brand-blue/80 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { value: '500+', label: 'Happy Clients' },
              { value: '4.9', label: 'Average Rating' },
              { value: '98%', label: 'Referral Rate' },
              { value: '2yr', label: 'Warranty' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl lg:text-5xl text-brand-blue mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
