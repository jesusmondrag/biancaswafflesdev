
import React from 'react';
import { AboutUsContent } from './types';

interface AboutUsProps {
  content: AboutUsContent;
}

const AboutUs: React.FC<AboutUsProps> = ({ content }) => {
  return (
    <section id="quienes-somos" className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-brand-fuchsia mb-4">
              {content.title}
            </h2>
            <p className="text-xl text-gray-500 font-semibold mb-16">{content.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto text-center text-lg text-gray-600 leading-relaxed space-y-6">
            <p className="text-2xl font-bold text-gray-700 italic">"{content.quote}" - {content.founder}</p>
            <p>{content.paragraph1}</p>
            <p>{content.paragraph2}</p>
        </div>

        <div className="max-w-5xl mx-auto mt-20 text-center">
            <h3 className="text-3xl font-extrabold text-gray-700 mb-8">{content.pillarsTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {content.pillars.map((pillar, index) => (
                    <div key={index} className="p-8 bg-brand-pink rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl mb-4">{pillar.emoji}</div>
                        <h4 className="text-2xl font-bold text-brand-fuchsia mb-2">{pillar.title}</h4>
                        <p className="text-gray-600">{pillar.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
