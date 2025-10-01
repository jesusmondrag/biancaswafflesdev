
import React, { useState, useEffect } from 'react';
import { AppSettings, AboutUsContent } from '../types';

interface AboutUsEditorProps {
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
}

const AboutUsEditor: React.FC<AboutUsEditorProps> = ({ settings, onSave }) => {
  const [content, setContent] = useState<AboutUsContent>(settings.aboutUsContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(settings.aboutUsContent);
  }, [settings.aboutUsContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handlePillarChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newPillars = [...content.pillars];
    newPillars[index] = { ...newPillars[index], [name]: value };
    setContent(prev => ({ ...prev, pillars: newPillars }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...settings, aboutUsContent: content });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  const commonInputClass = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-fuchsia focus:border-brand-fuchsia sm:text-sm";
  const commonLabelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Editar Página "Quiénes Somos"</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Section */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-bold text-lg mb-2">Sección Principal</h4>
          <div>
            <label htmlFor="title" className={commonLabelClass}>Título Principal</label>
            <input type="text" name="title" id="title" value={content.title} onChange={handleChange} className={commonInputClass} />
          </div>
          <div>
            <label htmlFor="subtitle" className={commonLabelClass}>Subtítulo</label>
            <input type="text" name="subtitle" id="subtitle" value={content.subtitle} onChange={handleChange} className={commonInputClass} />
          </div>
        </div>
        
        {/* Founder Section */}
        <div className="p-4 border rounded-lg">
          <h4 className="font-bold text-lg mb-2">Sección Fundadora</h4>
          <div>
            <label htmlFor="quote" className={commonLabelClass}>Cita</label>
            <textarea name="quote" id="quote" value={content.quote} onChange={handleChange} rows={2} className={commonInputClass} />
          </div>
          <div>
            <label htmlFor="founder" className={commonLabelClass}>Nombre del Fundador</label>
            <input type="text" name="founder" id="founder" value={content.founder} onChange={handleChange} className={commonInputClass} />
          </div>
          <div>
            <label htmlFor="paragraph1" className={commonLabelClass}>Párrafo 1</label>
            <textarea name="paragraph1" id="paragraph1" value={content.paragraph1} onChange={handleChange} rows={4} className={commonInputClass} />
          </div>
          <div>
            <label htmlFor="paragraph2" className={commonLabelClass}>Párrafo 2</label>
            <textarea name="paragraph2" id="paragraph2" value={content.paragraph2} onChange={handleChange} rows={4} className={commonInputClass} />
          </div>
        </div>

        {/* Pillars Section */}
        <div className="p-4 border rounded-lg">
            <h4 className="font-bold text-lg mb-2">Sección Pilares</h4>
            <div>
                <label htmlFor="pillarsTitle" className={commonLabelClass}>Título de la Sección de Pilares</label>
                <input type="text" name="pillarsTitle" id="pillarsTitle" value={content.pillarsTitle} onChange={handleChange} className={commonInputClass} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {content.pillars.map((pillar, index) => (
                    <div key={index} className="p-3 border rounded-md space-y-2">
                        <label className={commonLabelClass}>Pilar #{index + 1}</label>
                        <input type="text" name="emoji" value={pillar.emoji} onChange={(e) => handlePillarChange(index, e)} placeholder="Emoji (ej: 🍓)" className={commonInputClass} />
                        <input type="text" name="title" value={pillar.title} onChange={(e) => handlePillarChange(index, e)} placeholder="Título" className={commonInputClass} />
                        <textarea name="description" value={pillar.description} onChange={(e) => handlePillarChange(index, e)} placeholder="Descripción" rows={3} className={commonInputClass} />
                    </div>
                ))}
            </div>
        </div>

        <div className="flex items-center">
          <button type="submit" className="bg-brand-fuchsia text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition">
            Guardar Cambios
          </button>
          {saved && <span className="ml-4 text-green-600 font-semibold">¡Guardado!</span>}
        </div>
      </form>
    </div>
  );
};

export default AboutUsEditor;
