import React from 'react';
import ResourcesTableHeader from './ResourcesTableHeader';
import ResourcesTableRow from './ResourcesTableRow';

function ResourcesTable({ files, isAdmin, onDelete }) {
  return (
    <table className="min-w-full w-full text-white">
      <ResourcesTableHeader isAdmin={isAdmin} />
      <tbody>
        {files.map((file, index) => (
          <ResourcesTableRow
            key={index}
            file={file}
            index={index}
            isAdmin={isAdmin}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ResourcesTable;