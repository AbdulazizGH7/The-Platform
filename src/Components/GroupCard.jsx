
import React from 'react';

const GroupCard = ({ title, onRemove, onJoin, isAdmin }) => {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-1000 rounded-lg p-4 flex flex-col items-center text-white shadow-lg border-white bordersi">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {isAdmin ? (
        <button
          onClick={() => onRemove(title)}
          className="bg-purple-900 hover:bg-purple-700 rounded-full px-4 py-1 text-sm">
          Remove
        </button>
      ) : (
        <button
          onClick={() => onJoin(title)}
          className="bg-purple-900 hover:bg-purple-700 rounded-full px-4 py-1 text-sm">
          Join
        </button>
      )}
    </div>
  );
};

export default GroupCard;
