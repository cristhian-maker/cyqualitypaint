import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Calendar, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: { label: string; action: string }[];
}

const quickActions = [
  { label: 'Get a Quote', icon: Send, action: 'quote' },
  { label: 'Book Estimate', icon: Calendar, action: 'book' },
  { label: 'Call Us', icon: Phone, action: 'call' },
];

const faqResponses: Record<string, string> = {
  // English
  'price': 'We offer free estimates! The price depends on your project size and scope. Would you like to schedule a free consultation?',
  'quote': 'I\'d be happy to help you get a free quote! Please fill out the form on our contact page or provide your details here.',
  'book': 'You can book a free estimate by filling out the form on our contact page. What date works best for you?',
  'service': 'We offer Interior & Exterior Painting, Drywall Installation, Remodeling Services, Flooring, and Commercial services. Which one interests you?',
  'services': 'We offer Interior & Exterior Painting, Drywall Installation, Remodeling Services, Flooring, and Commercial services. Which one interests you?',
  'warranty': 'We offer a 2-year warranty against blistering and peeling on all our work!',
  'hours': 'Our business hours are Monday-Friday 8AM-6PM and Saturday 9AM-4PM.',
  'location': 'We\'re based in Hillsborough, FL and serve the surrounding areas including Tampa and surrounding counties.',
  'call': 'You can reach us at (586) 382-1603. Would you like us to call you?',
  'phone': 'You can reach us at (586) 382-1603.',
  'drywall': 'We offer full drywall installation, repairs, and finishes including Level 3, 4 & 5, knockdown texture, orange peel, and smooth finish.',
  'remodeling': 'We provide bathroom and kitchen remodeling, cabinet installation, backsplash, trim & molding, and finish work.',
  'flooring': 'We install Luxury Vinyl Plank (LVP), tile, porcelain, and epoxy floor coatings for garages and commercial areas.',
  'commercial': 'Yes! We work with commercial buildings, rental properties, investor projects, and as subcontractors for general contractors.',
  'residential': 'Absolutely! We specialize in residential painting, drywall, and remodeling for homeowners throughout Hillsborough County.',
  'cabinet': 'Yes, we paint kitchen and bathroom cabinets with professional finishes that last.',
  'exterior': 'We do exterior painting including siding, doors, soffit, fascia, trim, and pressure washing for surface preparation.',
  'interior': 'We paint walls, ceilings, trim, doors, and cabinets with meticulous attention to detail.',
  'area': 'We serve Hillsborough County and surrounding areas in Florida, including Tampa and nearby communities.',
  'hillsborough': 'Yes, we\'re based in Hillsborough County and this is our primary service area!',
  
  // Spanish
  'hola': '¡Hola! Gracias por contactar a C&Y Quality Paint LLC. ¿En qué podemos ayudarte hoy?',
  'hello': 'Hi! Thanks for contacting C&Y Quality Paint LLC. How can we help you today?',
  'hi': 'Hi there! Welcome to C&Y Quality Paint LLC. What service are you interested in?',
  'precio': '¡Ofrecemos estimados gratuitos! El precio depende del tamaño y alcance de tu proyecto. ¿Te gustaría agendar una consulta gratuita?',
  'cotizacion': '¡Con gusto te ayudo con una cotización gratuita! Visita nuestra página de contacto o comparte los detalles de tu proyecto aquí.',
  'cita': 'Puedes agendar una cita gratuita en nuestra página de contacto. ¿Qué fecha te funciona mejor?',
  'servicio': 'Ofrecemos Pintura Interior y Exterior, Instalación de Drywall, Servicios de Remodelación, Pisos y servicios Comerciales. ¿Cuál te interesa?',
  'servicios': 'Ofrecemos Pintura Interior y Exterior, Instalación de Drywall, Servicios de Remodelación, Pisos y servicios Comerciales. ¿Cuál te interesa?',
  'garantia': '¡Ofrecemos una garantía de 2 años contra ampollas y descascarado en todo nuestro trabajo!',
  'horario': 'Nuestro horario es Lunes a Viernes 8AM-6PM y Sábados 9AM-4PM.',
  'ubicacion': 'Estamos ubicados en Hillsborough, FL y servimos áreas cercanas incluyendo Tampa y condados vecinos.',
  'llamar': 'Puedes llamarnos al (586) 382-1603. ¿Te gustaría que te llamemos?',
  'telefono': 'Puedes llamarnos al (586) 382-1603.',
  'drywall-es': 'Ofrecemos instalación completa de drywall, reparaciones y acabados incluyendo Nivel 3, 4 y 5, textura knockdown, orange peel y acabado liso.',
  'remodelacion': 'Ofrecemos remodelación de baños y cocinas, instalación de gabinetes, backsplash, molduras y trabajo de acabado.',
  'pisos': 'Instalamos pisos de LVP, tile, porcelana y recubrimientos epóxicos para garajes y áreas comerciales.',
  'comercial': '¡Sí! Trabajamos con edificios comerciales, propiedades de alquiler, proyectos de inversionistas y como subcontratistas.',
  'residencial': '¡Por supuesto! Nos especializamos en pintura, drywall y remodelación residencial en el Condado de Hillsborough.',
  'gabinetes': 'Sí, pintamos gabinetes de cocina y baño con acabados profesionales que duran.',
  'exterior-es': 'Hacemos pintura exterior incluyendo siding, puertas, soffit, fascia, molduras y lavado a presión para preparación de superficies.',
  'interior-es': 'Pintamos paredes, techos, molduras, puertas y gabinetes con atención meticulosa al detalle.',
  'area-es': 'Servimos el Condado de Hillsborough y áreas cercanas en Florida, incluyendo Tampa y comunidades vecinas.',
  'hillsborough-es': '¡Sí, estamos ubicados en el Condado de Hillsborough y esta es nuestra área de servicio principal!',
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi! Welcome to C&Y Quality Paint LLC. How can I help you today?\n\n¡Hola! Bienvenido a C&Y Quality Paint LLC. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
      actions: quickActions.map(a => ({ label: a.label, action: a.action })),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase().trim();
    
    // Buscar coincidencias en palabras clave
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowerMsg.includes(keyword)) {
        return response;
      }
    }

    // Si no hay coincidencia, enviar respuesta genérica bilingüe
    return `Thank you for your message! Our team will review it and get back to you soon. For immediate assistance, please call us at (586) 382-1603 or visit our contact page.\n\n¡Gracias por tu mensaje! Nuestro equipo lo revisará y te contactará pronto. Para asistencia inmediata, llámanos al (586) 382-1603 o visita nuestra página de contacto.`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
        actions: quickActions.map(a => ({ label: a.label, action: a.action })),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'quote':
        window.location.href = '#contact';
        setIsOpen(false);
        break;
      case 'book':
        window.location.href = '#contact';
        setIsOpen(false);
        break;
      case 'call':
        window.location.href = 'tel:+15863821603';
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="chat-widget">
          <button
            onClick={() => setIsOpen(true)}
            className="chat-button"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-brand-blue p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">C&Y Assistant</div>
                  <div className="text-white/70 text-xs">Typically replies instantly</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[350px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        {message.sender === 'bot' ? (
                          <>
                            <AvatarImage src="/bot-avatar.png" />
                            <AvatarFallback className="bg-brand-blue text-white text-xs">C&Y</AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/user-avatar.png" />
                            <AvatarFallback className="bg-gray-200 text-xs">You</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div>
                        <div
                          className={`p-3 rounded-2xl text-sm whitespace-pre-line ${
                            message.sender === 'user'
                              ? 'bg-brand-blue text-white rounded-br-md'
                              : 'bg-gray-100 text-gray-800 rounded-bl-md'
                          }`}
                        >
                          {message.text}
                        </div>
                        
                        {/* Quick Actions */}
                        {message.actions && message.sender === 'bot' && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.actions.map((action, idx) => {
                              const ActionIcon = quickActions.find(a => a.action === action.action)?.icon || Send;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleAction(action.action)}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-xs hover:bg-brand-orange/20 transition-colors"
                                >
                                  <ActionIcon className="w-3 h-3" />
                                  {action.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-brand-blue text-white text-xs">C&Y</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                Powered by C&Y Quality Paint Assistant
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
