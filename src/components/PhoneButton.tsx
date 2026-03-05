import { useState } from 'react';
import { Phone, X, MessageSquare, Calendar, CreditCard } from 'lucide-react';

const PhoneButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      label: 'Call Now',
      description: 'Speak with us directly',
      icon: Phone,
      href: 'tel:+15863821603',
      color: 'bg-brand-blue',
    },
    {
      label: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      icon: MessageSquare,
      href: 'https://wa.me/15863821603',
      color: 'bg-green-500',
    },
    {
      label: 'Book Estimate',
      description: 'Schedule a free consultation',
      icon: Calendar,
      href: '#contact',
      color: 'bg-brand-orange',
    },
    {
      label: 'Digital Card',
      description: 'View our HiHello card',
      icon: CreditCard,
      href: 'https://hihello.com/card/2/es/p/7a19e9f0-9d68-4a8e-903c-c83436639edb',
      color: 'bg-purple-500',
    },
  ];

  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, href.startsWith('http') ? '_blank' : '_self');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Phone Button */}
      <div className="phone-button">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`phone-btn relative ${isOpen ? 'bg-red-500' : ''}`}
          aria-label="Contact options"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Phone className="w-6 h-6" />
          )}
          
          {/* Pulse rings */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-brand-orange animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full bg-brand-orange animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </button>
      </div>

      {/* Contact Options Menu */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-40 w-72">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-slide-up">
            {/* Header */}
            <div className="bg-brand-orange p-4">
              <div className="font-semibold text-white">Contact C&Y Quality Paint</div>
              <div className="text-white/70 text-sm">How would you like to reach us?</div>
            </div>

            {/* Options */}
            <div className="p-2">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleClick(option.href)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-brand-text">{option.label}</div>
                      <div className="text-gray-500 text-xs">{option.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 text-center">
              <p className="text-xs text-gray-500">
                Hillsborough, FL | Available Mon-Sat
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default PhoneButton;
