// src/Components/Resources/ResourcesTableRow.jsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';

function ResourcesTableRow({ file, index, isAdmin, onDelete }) {
  const downloadFile = () => {
    console.log("Downloading file:", file.name); // Placeholder logic for file download
  };

  return (
    <tr
      key={index}
      className={`${
        index % 2 === 0 ? 'bg-[#1a1a2e]' : 'bg-[#0f3460]'
      } hover:bg-[#16213E] transition-colors duration-300`}
    >
      <td className="py-2 px-4 text-sm text-left md:text-base sm:text-xs border-b border-[#0F3460]">
        <button
          onClick={downloadFile}
          className="text-blue-400 hover:underline focus:outline-none focus:ring"
          aria-label={`Download ${file.name}`}
        >
          {file.name}
        </button>
      </td>
      <td className="py-2 px-4 text-sm text-center md:text-base sm:text-xs border-b border-[#0F3460] hidden md:table-cell">
        {file.type}
      </td>
      <td className="py-2 px-4 text-sm text-center md:text-base sm:text-xs border-b border-[#0F3460]">
        {file.size}
      </td>
      <td className="py-2 px-4 text-sm text-center md:text-base sm:text-xs border-b border-[#0F3460]">
        {file.dateUploaded}
      </td>

      {isAdmin && (
        <td className="py-2 px-4 text-sm text-center border-b border-[#0F3460]">
          <button
            onClick={() => onDelete(file.name)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
            aria-label="Delete file"
          >
            <FaTrash />
          </button>
        </td>
      )}
    </tr>
  );
}

export default ResourcesTableRow;
