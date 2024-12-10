import React from 'react';

const GroupCard = ({ title, action, onDelete, showDeleteButton }) => {
  return (
    <div className="bg-purple-700 p-4 rounded-lg shadow-md text-center relative group">
      {showDeleteButton && (
        <button 
          onClick={onDelete}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-md px-2 py-1 text-xs font-bold transition-colors duration-200 z-10"
        >
          Delete
        </button>
      )}
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div>{action}</div>
    </div>
  );
};

export default GroupCard;