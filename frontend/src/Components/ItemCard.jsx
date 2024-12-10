import React from 'react';

function ItemCard({ text }) {
  return (
    <div className="relative group border-white border-solid border-2 bg-gradient-to-t from-purple-900 to-blue-1000 hover:bg-gradient-to-t hover:bg-purple-600 transition duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition duration-300 text-gray-100 text-2xl sm:text-3xl font-semibold rounded-lg w-[85%] py-5 mx-auto">
      {text}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 ease-in-out">
        {/* Additional content can go here */}
      </div>
    </div>
  );
}

export default ItemCard;
