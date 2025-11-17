import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8 text-center">
        <p className="font-bold text-lg">Cláudia Oliveira Imóveis</p>
        <p className="text-gray-400 mt-2">Corretora Responsável: Cláudia Oliveira | CRECI-SC 12345F</p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-white mx-3"><i className="fab fa-instagram fa-lg"></i></a>
          <a href="#" className="text-gray-400 hover:text-white mx-3"><i className="fab fa-facebook fa-lg"></i></a>
          <a href="#" className="text-gray-400 hover:text-white mx-3"><i className="fab fa-whatsapp fa-lg"></i></a>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} Cláudia Oliveira Imóveis. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};