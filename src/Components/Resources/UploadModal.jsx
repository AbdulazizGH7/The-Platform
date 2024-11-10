import React, { useState, useEffect } from 'react';

function UploadModal({ closeModal, addFileToCategory, categoryTitles, currentCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || Object.keys(categoryTitles)[0]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (currentCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [currentCategory]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const fileURL = URL.createObjectURL(selectedFile);

    const newFile = {
      fileName: selectedFile.name,
      type: selectedFile.name.split('.').pop().toUpperCase(),
      size: selectedFile.size >= 1024 * 1024
        ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
        : `${(selectedFile.size / 1024).toFixed(2)} KB`,
      dateUploaded: new Date().toISOString().split('T')[0],
      url: fileURL,  
    };

    addFileToCategory(selectedCategory, newFile);
    setSelectedFile(null);
    closeModal();
  };

  return (
    // Modal
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20"
      aria-modal="true"
      role="dialog"
      aria-labelledby="upload-modal-title"
    >
      <div className="bg-gradient-to-br from-[#171352] to-[#7A4FBF] rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="upload-modal-title" className="text-2xl font-semibold text-white">
            Upload New File
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
            aria-label="Close Upload Modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
          {/* Form-Category Selection */}
            <label htmlFor="category" className="block text-white font-medium mb-2">
              Select Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#1a1a2e] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              {Object.keys(categoryTitles).map((categoryKey) => (
                <option key={categoryKey} value={categoryKey} className="text-white">
                  {categoryTitles[categoryKey]}
                </option>
              ))}
            </select>
          </div>
          {/* Form-File Selection */}
          <div>
            <label htmlFor="file" className="block text-white font-medium mb-2">
              Select File
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full bg-[#1a1a2e] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Cancel and Upload Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
