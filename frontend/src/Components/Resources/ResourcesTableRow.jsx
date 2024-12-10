// ResourcesTableRow.js

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

function ResourcesTableRow({ file, index, isAdmin, onDelete }) {
  const downloadFile = () => {
    if (!file.gridfsId) {
      console.error("GridFS ID is undefined:", file);
      return;
    }
    console.log("File object:", file);

    axios
      .get(`http://localhost:8080/upload/download/${file.gridfsId}`, {
        responseType: "blob", // Ensure the file is downloaded as binary data
      })
      .then((response) => {
        // Create a URL for the downloaded file and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        alert('Failed to download file. Please try again.');
      });
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
            onClick={() => onDelete(file._id)} // Pass file._id for deletion
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
