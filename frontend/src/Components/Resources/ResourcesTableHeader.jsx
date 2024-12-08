import React from 'react';

function ResourcesTableHeader({ isAdmin }) {
  return (
    <thead className="bg-[#16213E]">
      <tr>
        <th className="py-2 px-3 text-left font-semibold text-sm md:text-base sm:text-xs border-b border-[#0F3460]">
          File Name
        </th>
        <th className="py-2 px-3 text-left text-center font-semibold text-sm md:text-base sm:text-xs border-b border-[#0F3460] hidden md:table-cell">
          Type
        </th>
        <th className="py-2 px-3 text-left text-center font-semibold text-sm md:text-base sm:text-xs border-b border-[#0F3460]">
          Size
        </th>
        <th className="py-2 px-3 text-left text-center font-semibold text-sm md:text-base sm:text-xs border-b border-[#0F3460]">
          Date Uploaded
        </th>
        {isAdmin && (
          <th className="py-2 px-3 text-center font-semibold text-sm md:text-base sm:text-xs border-b border-[#0F3460]">
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
}

export default ResourcesTableHeader;
