// components/AddItem.js
import { useState } from 'react';

export default function AddItem() {
  const [newItem, setNewItem] = useState({ id: '', name: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Item:', newItem);
    // Clear form
    setNewItem({ id: '', name: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={newItem.id}
        onChange={handleChange}
        className="border p-2 m-1"
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newItem.name}
        onChange={handleChange}
        className="border p-2 m-1"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newItem.image}
        onChange={handleChange}
        className="border p-2 m-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 m-1 rounded">Add Item</button>
    </form>
  );
}
