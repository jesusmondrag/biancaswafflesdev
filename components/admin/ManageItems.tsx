
import React, { useState } from 'react';
import { WaffleBase, Ingredient, ExtraProduct, PaymentMethod } from '../types';

type Item = WaffleBase | Ingredient | ExtraProduct | PaymentMethod;

interface ManageItemsProps {
  title: string;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  itemType: 'base' | 'ingredient' | 'topping' | 'extra' | 'payment';
}

const ManageItems: React.FC<ManageItemsProps> = ({ title, items, setItems, itemType }) => {
  const getEmptyItem = (): Item => {
    const base = { id: 0, name: '', imageUrl: '', description: '' };
    if (itemType === 'payment') {
      return { ...base, key: '' };
    }
    return { ...base, price: 0 };
  }

  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (item: Item) => {
    setEditingItem({ ...item });
    setIsAdding(false);
  };
  
  const handleAddNew = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setEditingItem({ ...getEmptyItem(), id: newId });
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (!editingItem) return;

    if (isAdding) {
      setItems([...items, editingItem]);
    } else {
      setItems(items.map(item => (item.id === editingItem.id ? editingItem : item)));
    }
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
    setEditingItem({
      ...editingItem,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingItem) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({
          ...editingItem,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderForm = () => (
    <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-300">
        <h4 className="text-xl font-bold mb-4 text-gray-700">{isAdding ? 'Añadir Nuevo' : 'Editar'} Elemento</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input id="itemName" name="name" value={editingItem!.name} onChange={handleChange} placeholder="Ej: Classic Waffle" className="w-full px-3 py-2 text-gray-800 border-2 border-gray-200 rounded-lg" />
            </div>
            
            {itemType === 'payment' ? (
                <div>
                  <label htmlFor="itemKey" className="block text-sm font-medium text-gray-700 mb-1">Key (identificador único, sin espacios)</label>
                  <input id="itemKey" name="key" type="text" value={'key' in editingItem! ? editingItem.key : ''} onChange={handleChange} placeholder="Ej: pagoMovil" className="w-full px-3 py-2 text-gray-800 border-2 border-gray-200 rounded-lg" />
                </div>
            ) : (
                <div>
                  <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input id="itemPrice" name="price" type="number" step="0.01" value={'price' in editingItem! ? editingItem.price : ''} onChange={handleChange} placeholder="Ej: 5.00" className="w-full px-3 py-2 text-gray-800 border-2 border-gray-200 rounded-lg" />
                </div>
            )}
            
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
                <div className="flex items-center space-x-4">
                    {editingItem!.imageUrl && <img src={editingItem!.imageUrl} alt="Previsualización" className="h-16 w-16 object-cover rounded-md bg-gray-200" />}
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp, image/svg+xml"
                        onChange={handleImageUpload} 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-fuchsia file:text-white hover:file:bg-opacity-90 cursor-pointer"
                    />
                </div>
            </div>

            {itemType !== 'payment' && (
              <div className="md:col-span-2">
                  <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
                  <textarea id="itemDescription" name="description" value={'description' in editingItem! ? editingItem.description || '' : ''} onChange={handleChange} placeholder="Una breve descripción del producto" rows={2} className="w-full px-3 py-2 text-gray-800 border-2 border-gray-200 rounded-lg" />
              </div>
            )}
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
        <h3 className="text-2xl font-bold text-gray-700">{title}</h3>
        <button onClick={handleAddNew} className="bg-brand-fuchsia text-white font-bold py-2 px-4 rounded-lg">+ Añadir</button>
      </div>

      { (isAdding || editingItem) && renderForm() }
      
      <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 font-semibold">Nombre</th>
                <th className="p-3 font-semibold">{itemType === 'payment' ? 'Key' : 'Precio'}</th>
                <th className="p-3 font-semibold">Imagen</th>
                <th className="p-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">
                    {itemType === 'payment' 
                      ? (item as PaymentMethod).key 
                      : ('price' in item && typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : 'N/A')
                    }
                  </td>
                  <td className="p-3"><img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-contain rounded-md" /></td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 font-semibold">Editar</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 font-semibold">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default ManageItems;