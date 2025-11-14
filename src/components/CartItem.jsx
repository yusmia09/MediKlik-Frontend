import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const product = item.product || {};
  const BASE_URL = "http://localhost:5000";

  // Cek apakah image sudah lengkap (udah ada http) atau cuma path lokal
  const imagePath = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image.startsWith("/") ? "" : "/"}${product.image}`
    : "https://via.placeholder.com/150x100?text=No+Image";

  const subtotal = (product.price || 0) * (item.quantity || 1);

  return (
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg transition">
      {/* Gambar Produk */}
      <img
        src={imagePath}
        alt={product.name || "Produk"}
        className="w-28 h-28 object-cover rounded-xl border bg-gray-50"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150x100?text=No+Image";
        }}
      />

      {/* Info Produk */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-cyan-600 font-semibold mt-1">
          Rp{product.price?.toLocaleString("id-ID")}
        </p>

        {/* Tombol Jumlah */}
        <div className="flex items-center justify-center sm:justify-start mt-3 gap-2">
          <button
            onClick={() => onUpdateQuantity(product._id, item.quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 p-1.5 rounded-full"
          >
            <Minus size={14} />
          </button>
          <span className="px-3 font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product._id, item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 p-1.5 rounded-full"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Subtotal + Hapus */}
      <div className="flex flex-col items-center sm:items-end">
        <p className="font-semibold text-gray-700 mb-2">
          Subtotal:{" "}
          <span className="text-cyan-600">
            Rp{subtotal.toLocaleString("id-ID")}
          </span>
        </p>
        <button
          onClick={() => onRemove(product._id)}
          className="text-red-500 hover:text-red-600 flex items-center gap-1"
        >
          <Trash2 size={18} /> Hapus
        </button>
      </div>
    </div>
  );
};

export default CartItem;
