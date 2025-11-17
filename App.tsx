
import React, { useState, useRef } from 'react';
import { AgentProfile } from './components/AgentProfile';
import { PropertyList } from './components/PropertyList';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Property } from './types';

const properties: Property[] = [
  {
    id: 1,
    name: "Apartamento Moderno no Coração da Cidade",
    address: "Rua das Flores, 123, Centro, Florianópolis - SC",
    description: "Apartamento aconchegante e bem iluminado, com 2 quartos, sala de estar e jantar integradas e uma vista incrível. Perfeito para quem busca conforto e praticidade.",
    price: "R$ 750.000,00",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Casa Espaçosa com Varanda Gourmet",
    address: "Alameda dos Pássaros, 456, Jurerê Internacional, Florianópolis - SC",
    description: "Linda casa em condomínio fechado, com 3 suítes, ampla área de lazer com piscina e uma varanda perfeita para receber amigos e família. Viva com segurança e sofisticação.",
    price: "R$ 2.300.000,00",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Charme e Conforto em Casa Térrea",
    address: "Travessa da Harmonia, 789, Campeche, Florianópolis - SC",
    description: "Casa térrea encantadora com jardim privativo, 3 quartos e um ambiente acolhedor. Ideal para quem busca tranquilidade perto da praia.",
    price: "R$ 1.200.000,00",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Apartamento com Vista para o Mar",
    address: "Av. Beira Mar Norte, 1011, Agronômica, Florianópolis - SC",
    description: "Desfrute de um pôr do sol espetacular todos os dias da sua varanda. Apartamento de alto padrão com 3 suítes, área de lazer completa e localização privilegiada.",
    price: "R$ 1.850.000,00",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop"
  },
];

const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const contactFormRef = useRef<HTMLDivElement>(null);

  const handleInterestClick = (propertyName: string) => {
    setSelectedProperty(propertyName);
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">
            Cláudia Oliveira <span className="text-blue-600">Imóveis</span>
          </div>
          <button
            onClick={handleScrollToForm}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 hidden md:block"
          >
            Fale Comigo
          </button>
        </nav>
      </header>
      
      <main>
        <AgentProfile onContactClick={handleScrollToForm} />
        <PropertyList properties={properties} onInterestClick={handleInterestClick} />
        <ContactForm 
          properties={properties} 
          selectedProperty={selectedProperty} 
          setSelectedProperty={setSelectedProperty}
          ref={contactFormRef} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
