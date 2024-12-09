import React from 'react';

const GroupCard = ({ title, action }) => {
  return (
    <div className="bg-purple-700 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div>{action}</div>
    </div>
  );
};

export default GroupCard;
