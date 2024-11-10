// src/utils/localStorageUtils.js

export const getStoredResources = () => {
    const storedResources = localStorage.getItem('uploadedResources');
    return storedResources ? JSON.parse(storedResources) : {};
  };
  
  export const saveResources = (resources) => {
    localStorage.setItem('uploadedResources', JSON.stringify(resources));
  };
  