
import React from 'react';
import { AppSettings, FAQItem } from './types';

// Simple SVG icons for social media
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.148-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
);

interface ContactProps {
  settings: AppSettings;
  faq: FAQItem[];
}

const Contact: React.FC<ContactProps> = ({ settings, faq }) => {
    
  const processAnswer = (answer: string) => {
    return answer.replace('[EMAIL]', `<a href="mailto:${settings.contactEmail}" class="text-brand-fuchsia font-bold">${settings.contactEmail}</a>`);
  }
    
  return (
    <section id="contacto" className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-brand-fuchsia mb-6">
          Ponte en Contacto
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed mb-12">
          ¿Antojo de un waffle? ¿Tienes alguna pregunta o simplemente quieres saludarnos? ¡Nos encantaría saber de ti!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <div className="bg-brand-pink rounded-2xl p-8 shadow-md text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Nuestra Info</h3>
                <div className="space-y-6">
                     <div className="flex items-center">
                        <PhoneIcon />
                        <a href={`tel:${settings.contactPhone}`} className="ml-4 font-bold text-xl text-gray-700 hover:text-brand-fuchsia transition-colors">{settings.contactPhone}</a>
                    </div>
                     <div className="flex items-center">
                        <MailIcon />
                        <a href={`mailto:${settings.contactEmail}`} className="ml-4 font-bold text-xl text-gray-700 hover:text-brand-fuchsia transition-colors">{settings.contactEmail}</a>
                    </div>
                     <div className="flex items-center">
                        <InstagramIcon />
                        <a href={`https://instagram.com/${settings.instagramHandle.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="ml-4 font-bold text-xl text-gray-700 hover:text-brand-fuchsia transition-colors">{settings.instagramHandle}</a>
                    </div>
                </div>
            </div>
             <div className="bg-gray-50 rounded-2xl p-8 shadow-md text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Horario de Atención</h3>
                <p className="text-gray-600 text-lg text-center">
                    <span className="font-bold">Jueves a Domingo:</span><br/> 4:00 PM - 10:00 PM
                </p>
                <p className="text-sm text-gray-500 mt-4 text-center">(¡Búscanos en nuestra ubicación habitual! Puedes ver el mapa en la sección de Menú al elegir la opción de "Pickup".)</p>
            </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
            <h3 className="text-3xl font-extrabold text-gray-700 mb-8">Preguntas Frecuentes</h3>
            <div className="space-y-4 text-left">
               {faq.map(item => (
                    <details key={item.id} className="p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer">
                        <summary className="font-bold text-lg text-gray-800">{item.question}</summary>
                        <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: processAnswer(item.answer) }} />
                    </details>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
