import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ResourcesTable from './ResourcesTable';
import Popup from '../Popup';

const categoryTitles = {
  "old-exams": "Old Exams",
  "notes": "Notes",
  "quizzes": "Quizzes",
  "extra": "Extra"
};

function ResourcesList({ courseName = "Course Resources", resources, updateResources, isAdmin = true }) {
  const { category } = useParams();
  const displayTitle = categoryTitles[category] || "Resources";
  const [fileList, setFileList] = useState(resources[category] || []);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  useEffect(() => {
    setFileList(resources[category] || []);
  }, [resources, category]);

  const confirmDelete = () => {
    const updatedFiles = fileList.filter(file => file.fileName !== fileToDelete);
    setFileList(updatedFiles);

    const updatedResources = {
      ...resources,
      [category]: updatedFiles
    };
    updateResources(updatedResources);
    setShowDeleteConfirmation(false);
  };

  const deleteFile = (fileName) => {
    setFileToDelete(fileName);
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-b from-[#171352] to-[#7A4FBF] mt-8">
      <div className="mb-4">
        <Link to="/" className="text-blue-200 hover:underline">
          &larr; Back to Resources
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
        {courseName} - {displayTitle}
      </h1>

      <div className="max-w-screen-2xl mx-auto bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden">
        {fileList.length > 0 ? (
          <div className="overflow-x-auto">
            <ResourcesTable files={fileList} isAdmin={isAdmin} onDelete={deleteFile} />
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-xl text-gray-400">No resources available.</p>
          </div>
        )}
      </div>
      <Popup
        show={showDeleteConfirmation}
        title="Confirm Deletion"
        message="Are you sure you want to delete this file?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default ResourcesList;
