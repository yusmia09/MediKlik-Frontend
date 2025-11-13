import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const BASE_URL = "http://localhost:5000";
  const imagePath = product.image
    ? `${BASE_URL}/${product.image.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col">
      <div className="overflow-hidden rounded-t-xl h-48 flex items-center justify-center bg-gray-100">
        <img
          src={imagePath}
          alt={product.name}
          className="object-contain h-full"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/300x200?text=No+Image")
          }
        />
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h4 className="text-lg font-semibold truncate">{product.name}</h4>
          <p className="text-cyan-600 font-bold mt-1">
            Rp{product.price?.toLocaleString("id-ID")}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="mt-3 bg-cyan-600 text-white px-3 py-2 rounded-lg hover:bg-cyan-700 transition"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
