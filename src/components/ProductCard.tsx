import React from "react";
import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  tag: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  description,
  tag,
  onAddToCart,
}) => (
  <div className="rounded-3xl shadow-xl bg-white flex flex-col max-w-xs min-w-[18rem] max-w-[18rem] h-96 min-h-[24rem] max-h-[24rem] transition-transform hover:scale-105 overflow-hidden">
    <div className="relative w-full h-56">
      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
      />
      <span className="absolute top-3 left-3 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs shadow-md">
        {tag}
      </span>
    </div>
    <div className="flex flex-col flex-1 p-6 gap-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl text-gray-900">{title}</h2>
        <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">
          {price}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-2 text-left w-full flex-1">{description}</p>
      {/* Removed show more/less button, always show full description */}
      <button
        onClick={onAddToCart}
        className="w-full bg-black text-white font-bold py-3 rounded-2xl text-lg mt-auto hover:bg-gray-900 transition-colors shadow-sm"
      >
        Add to cart
      </button>
    </div>
  </div>
);

export default ProductCard; 