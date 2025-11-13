import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={`http://localhost:5000/${product.image}`}
          alt={product.name}
          className="rounded-xl shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 mb-4">
            Rp {product.price.toLocaleString()}
          </p>
          <button className="bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700">
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
