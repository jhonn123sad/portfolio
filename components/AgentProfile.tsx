import React from 'react';

interface AgentProfileProps {
  onContactClick: () => void;
}

export const AgentProfile: React.FC<AgentProfileProps> = ({ onContactClick }) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 text-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop" 
              alt="Corretora Cláudia Oliveira"
              className="rounded-full w-64 h-64 mx-auto object-cover border-4 border-blue-600 shadow-xl"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Seu Próximo Lar Está Aqui.
            </h1>
            <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-6">
              Encontre o Imóvel dos Seus Sonhos em Florianópolis.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Com anos de experiência no mercado imobiliário de Florianópolis, meu objetivo é ajudar você a encontrar não apenas uma casa, mas um verdadeiro lar. Conte com um atendimento personalizado e focado nas suas necessidades para uma jornada de compra tranquila e segura.
            </p>
            <button
              onClick={onContactClick}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              Quero Encontrar Meu Imóvel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};