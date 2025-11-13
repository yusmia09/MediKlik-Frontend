import React from "react";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const imagePath = item.image
    ? `http://localhost:5000/${item.image.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/150x100?text=No+Image";

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <img src={imagePath} alt={item.name} className="w-24 h-24 object-contain rounded" />
      <div className="flex-1">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-cyan-600 font-bold">
          Rp{item.price?.toLocaleString("id-ID")}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="bg-gray-200 px-2 rounded hover:bg-gray-300"
            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="bg-gray-200 px-2 rounded hover:bg-gray-300"
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-gray-600">
          Subtotal: Rp{(item.price * item.quantity).toLocaleString("id-ID")}
        </p>
        <button
          className="text-red-500 hover:underline"
          onClick={() => onRemove(item._id)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default CartItem;
