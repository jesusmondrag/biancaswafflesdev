
import React, { useState } from 'react';
import { AppSettings, FAQItem } from '../types';

interface FAQManagerProps {
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
}

const FAQManager: React.FC<FAQManagerProps> = ({ settings, onSave }) => {
  const [items, setItems] = useState<FAQItem[]>(settings.faq);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleEdit = (item: FAQItem) => {
    setEditingItem({ ...item });
    setIsAdding(false);
  };
  
  const handleAddNew = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setEditingItem({ id: newId, question: '', answer: '' });
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
      onSave({ ...settings, faq: newItems });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleSave = () => {
    if (!editingItem) return;
    let newItems;
    if (isAdding) {
      newItems = [...items, editingItem];
    } else {
      newItems = items.map(item => (item.id === editingItem.id ? editingItem : item));
    }
    setItems(newItems);
    onSave({ ...settings, faq: newItems });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEditingItem(null);
    setIsAdding(false);
  };
  
  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingItem) return;
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };
  
  const renderForm = () => (
    <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-300">
        <h4 className="text-xl font-bold mb-4 text-gray-700">{isAdding ? 'Añadir Nueva' : 'Editar'} Pregunta Frecuente</h4>
        <div className="space-y-4">
            <input name="question" value={editingItem!.question} onChange={handleChange} placeholder="Pregunta" className="w-full px-3 py-2 text-gray-800 border-2 border-gray-200 rounded-lg" />
            <textarea name="answer" value={editingItem!.answer} onChange={handleChange} placeholder="Respuesta (usa [EMAIL] para el email de contacto)" rows={3} className="w-full px-3 py-2 text-gray-800 border-2 border-gray-200 rounded-lg" />
        </div>
        <div className="mt-4 space-x-2">
            <button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
            <button onClick={handleCancel} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">Cancelar</button>
        </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-700">Gestionar Preguntas Frecuentes</h3>
        <div>
          {saved && <span className="mr-4 text-green-600 font-semibold">¡Cambios guardados!</span>}
          <button onClick={handleAddNew} className="bg-brand-fuchsia text-white font-bold py-2 px-4 rounded-lg">+ Añadir</button>
        </div>
      </div>
      
      { (isAdding || editingItem) && renderForm() }
      
      <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border-b pb-3">
              <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{item.question}</p>
                    <p className="text-gray-600 text-sm mt-1">{item.answer}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4 space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 font-semibold">Editar</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 font-semibold">Eliminar</button>
                  </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAQManager;
