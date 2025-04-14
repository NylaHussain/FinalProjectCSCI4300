// components/Item.js
export default function Item({ name, image }) {
    return (
      <div className="border rounded p-4 text-center">
        <img src={image} alt={name} className="mx-auto mb-2 w-24 h-24 object-contain" />
        <h2 className="text-lg font-bold">{name}</h2>
      </div>
    );
  }
  