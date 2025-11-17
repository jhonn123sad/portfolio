
import React, { useState, useEffect, forwardRef } from 'react';
import { Property } from '../types';

interface ContactFormProps {
  properties: Property[];
  selectedProperty: string;
  setSelectedProperty: (value: string) => void;
}

export const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(({ properties, selectedProperty, setSelectedProperty }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: selectedProperty,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  
  // When the selectedProperty prop changes (e.g., from a property card click), update the form data
  useEffect(() => {
    setFormData(prev => ({ ...prev, property: selectedProperty }));
  }, [selectedProperty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'property') {
      setSelectedProperty(value);
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    // !!! IMPORTANT: Replace this with your own Google Apps Script Web App URL !!!
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
    
    if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
      setStatus('error');
      setStatusMessage('Erro: A URL do Google Apps Script não foi configurada. Siga as instruções no código.');
      return;
    }

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.result === 'success') {
        setStatus('success');
        setStatusMessage('Obrigado! Sua mensagem foi enviada. Entrarei em contato em breve.');
        setFormData({ name: '', email: '', phone: '', property: '', message: '' });
      } else {
        throw new Error(result.error || 'Ocorreu um erro desconhecido.');
      }
    } catch (error) {
      console.error('Error!', error);
      setStatus('error');
      setStatusMessage('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    }
  };

  return (
    <section ref={ref} className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">Vamos Conversar?</h2>
            <p className="text-lg text-gray-600 mt-4">
              Ficou interessado? Preencha o formulário abaixo para agendar uma visita ou receber mais informações. Estou à sua disposição!
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
            {/* INSTRUCTIONS FOR GOOGLE SHEETS INTEGRATION */}
            <div className="mb-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md">
              <h4 className="font-bold">Instruções para o Desenvolvedor:</h4>
              <ol className="list-decimal list-inside text-sm mt-2">
                <li>Crie uma nova Planilha Google (Google Sheet).</li>
                <li>No menu, vá em "Extensões" {'>'} "Apps Script".</li>
                <li>Apague o código padrão e cole o código que está nos comentários deste arquivo.</li>
                <li>Clique em "Implantar" {'>'} "Nova implantação".</li>
                <li>Selecione o tipo como "App da Web".</li>
                <li>Em "Quem pode acessar", selecione "Qualquer pessoa".</li>
                <li>Clique em "Implantar". Autorize as permissões necessárias.</li>
                <li>Copie a URL do app da Web e cole na constante `scriptURL` neste arquivo.</li>
              </ol>
            </div>
            {/*
              // GOOGLE APPS SCRIPT CODE TO PASTE
              function doPost(e) {
                try {
                  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads") || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
                  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
                  if (headers.length === 0 || headers[0] === "") {
                    sheet.getRange(1, 1, 1, 6).setValues([['Timestamp', 'Nome', 'Email', 'Telefone', 'Imóvel de Interesse', 'Mensagem']]);
                  }
                  
                  var data = JSON.parse(e.postData.contents);
                  var timestamp = new Date();

                  sheet.appendRow([
                    timestamp,
                    data.name,
                    data.email,
                    data.phone,
                    data.property,
                    data.message
                  ]);

                  return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
                } catch (error) {
                  return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() })).setMimeType(ContentService.MimeType.JSON);
                }
              }
            */}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                </div>
              </div>
              <div>
                <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">Imóvel de Interesse</label>
                <select id="property" name="property" value={formData.property} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="" disabled>Selecione um imóvel</option>
                  {properties.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem (Opcional)</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed">
                  {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </div>
            </form>
            {status !== 'idle' && (
              <div className={`mt-6 p-4 rounded-lg text-center ${
                status === 'success' ? 'bg-green-100 text-green-800' :
                status === 'error' ? 'bg-red-100 text-red-800' : ''
              }`}>
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
