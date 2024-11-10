import React from 'react';

const GroupCard = ({ title, onRemove, onJoin, isAdmin }) => {
  return (
    <div className="bg-gradient-to-br from-purple-700 to-blue-900 rounded-lg p-6 flex flex-col items-center text-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-purple-600">
      <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
      {isAdmin ? (
        <button
          onClick={() => onRemove(title)}
          className="bg-red-600 hover:bg-red-500 transition-colors duration-150 rounded-full px-5 py-2 text-sm font-bold">
          Remove
        </button>
      ) : (
        <button
          onClick={() => onJoin(title)}
          className="bg-green-600 hover:bg-green-500 transition-colors duration-150 rounded-full px-5 py-2 text-sm font-bold">
          Join
        </button>
      )}
    </div>
  );
};

export default GroupCard;
