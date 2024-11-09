import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import ResourcesSection from './ResourcesSection';
import ResourcesList from './ResourcesList';
import ButtonGradient from '../ButtonGradient/ButtonGradient';
import UploadModal from './UploadModal';
import { toast } from 'react-toastify';
import { getStoredResources, saveResources } from '../../utils/localStorageUtils';
import 'react-toastify/dist/ReactToastify.css';
import ToastNotification from './ToastNotification';

const categoryTitles = {
  "old-exams": "Old Exams",
  "notes": "Notes",
  "quizzes": "Quizzes",
  "extra": "Extra"
};

function ResourcesPage({ courseName = "SWE206" }) {
  const [resources, setResources] = useState(getStoredResources());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateResources = (updatedResources) => {
    setResources(updatedResources);
    saveResources(updatedResources);
  };

  const handleUpload = (selectedCategory, newFile) => {
    const updatedResources = {
      ...resources,
      [selectedCategory]: [...(resources[selectedCategory] || []), newFile],
    };
    updateResources(updatedResources);
    toast.success('File uploaded successfully!');
  };

  return (
    <Router>

      <Navbar />

      <h1 className="text-white underline text-center font-outfit text-[clamp(1.5rem,6vw,4rem)] font-medium leading-tight tracking-normal m-6 mt-10">
        {courseName} Resources
      </h1>

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ResourcesSection
                resources={resources}
                categoryTitles={categoryTitles}
                courseName={courseName}
              />
            }
          />
          <Route
            path="/resources/:category"
            element={
              <ResourcesList
                resources={resources}
                updateResources={updateResources}
                categoryTitles={categoryTitles}
                courseName={courseName}
                isAdmin={true}
              />
            }
          />
        </Routes>

        <div className="flex justify-center mt-8">
          <ButtonGradient title="Upload" onClick={() => setIsModalOpen(true)} />
        </div>

        {isModalOpen && (
          <UploadModal
            closeModal={() => setIsModalOpen(false)}
            addFileToCategory={handleUpload}
            categoryTitles={categoryTitles}
          />
        )}
      </div>
      
        <ToastNotification />

    </Router>
  );
}

export default ResourcesPage;
