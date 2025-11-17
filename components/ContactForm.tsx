// ===================================================================================
// PASSO 1: CÓDIGO DA SUA NOVA API - GOOGLE APPS SCRIPT
// Copie e cole este código no seu projeto do Google Apps Script.
// 
// INSTRUÇÕES:
// 1. Abra sua Planilha Google.
// 2. Vá em `Extensões` > `Apps Script`.
// 3. Apague todo o código que estiver lá e cole o código abaixo.
// 4. Clique em `Implantar` (canto superior direito) > `Nova implantação`.
// 5. No pop-up, clique no ícone de engrenagem (`Selecione o tipo`) e escolha `App da Web`.
// 6. Em `Quem pode acessar`, mude para `Qualquer pessoa`.
// 7. Clique em `Implantar`. Autorize o acesso quando solicitado.
// 8. COPIE a `URL do app da Web` fornecida. Você vai colar essa URL no PASSO 2.
// ===================================================================================
/*
function doPost(e) {
  try {
    // Garanta que sua aba na planilha se chama "Leads"
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');

    // Pega os dados do formulário que vieram via FormData
    const data = e.parameter;

    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      new Date(),       // Coluna A: Timestamp
      data.name,        // Coluna B: Nome
      data.email,       // Coluna C: Email
      data.phone,       // Coluna D: Telefone
      data.property,    // Coluna E: Imóvel
      data.message      // Coluna F: Mensagem
    ]);

    // Prepara uma resposta de SUCESSO. Isso é crucial para o site saber que deu certo.
    const response = {
      status: "success",
      message: "Dados recebidos com sucesso!"
    };

    // Retorna a resposta no formato JSON. O Google cuida do CORS para nós aqui.
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Se algo der errado, retorna uma mensagem de ERRO.
    const errorResponse = {
      status: "error",
      message: "Ocorreu um erro no servidor: " + error.message
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

import React, { useState, forwardRef } from 'react';
import { Property } from '../types';

interface ContactFormProps {
  properties: Property[];
  selectedProperty: string;
  setSelectedProperty: (value: string) => void;
}

export const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(({ properties, selectedProperty, setSelectedProperty }, ref) => {
  // O estado do formulário agora gerencia apenas os campos que não são controlados pelo pai.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // O campo 'property' é controlado pelo componente pai através de props.
    if (name === 'property') {
      setSelectedProperty(value);
    } else {
      // Outros campos são gerenciados pelo estado local.
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    // ===================================================================================
    // PASSO 2: CONECTE SEU SITE À SUA API
    // Cole a URL que você copiou do Google Apps Script aqui.
    // ===================================================================================
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwOpxC0US-serZt8mEEjc5Md3WZY_K7dStJz4Z4OwjN81cBBwiwuPnO5yFb-ity3crj/exec';

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('property', selectedProperty); // Usa a prop 'selectedProperty' diretamente.
    form.append('message', formData.message);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: form,
      });
      
      const result = await response.json();

      if (result.status === 'success') {
        setStatus('success');
        setStatusMessage('Obrigado! Sua mensagem foi enviada. Entrarei em contato em breve.');
        // Limpa apenas os campos do estado local.
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Limpa a propriedade selecionada no componente pai.
        setSelectedProperty('');
      } else {
        throw new Error(result.message || 'Erro desconhecido retornado pela API.');
      }

    } catch (error) {
      console.error('Ocorreu um erro inesperado:', error);
      setStatus('error');
      setStatusMessage(`Falha ao enviar. Verifique sua conexão e a URL da API, e tente novamente.`);
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
                <select id="property" name="property" value={selectedProperty} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
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
            {status !== 'idle' && status !== 'loading' && (
              <div className={`mt-6 p-4 rounded-lg text-center ${
                status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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

ContactForm.displayName = 'ContactForm';
