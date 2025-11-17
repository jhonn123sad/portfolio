
import React from 'react';
import { Property } from '../types';

interface PropertyListProps {
  properties: Property[];
  onInterestClick: (propertyName: string) => void;
}

const PropertyCard: React.FC<{ property: Property, onInterestClick: (propertyName: string) => void }> = ({ property, onInterestClick }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
    <img src={property.image} alt={property.name} className="w-full h-56 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
      <p className="text-sm text-gray-500 mb-4 flex items-center">
        <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
        {property.address}
      </p>
      <p className="text-gray-600 mb-4 flex-grow">{property.description}</p>
      <div className="mt-auto">
        <p className="text-2xl font-black text-blue-600 mb-4">{property.price}</p>
        <button 
          onClick={() => onInterestClick(property.name)}
          className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center"
        >
          <i className="fas fa-heart mr-2"></i>
          Tenho Interesse
        </button>
      </div>
    </div>
  </div>
);

export const PropertyList: React.FC<PropertyListProps> = ({ properties, onInterestClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Oportunidades Incríveis</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Confira algumas das propriedades exclusivas que selecionei para você.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} onInterestClick={onInterestClick} />
          ))}
        </div>
      </div>
    </section>
  );
};
