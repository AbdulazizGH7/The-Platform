import React, { createContext, useState, useEffect } from 'react';

export const CourseEvaluationContext = createContext();

const CourseEvaluationProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Fetch experiences dynamically from the data folder
    import('../../data/experiences.json')
      .then((data) => setExperiences(data.experiences || []))
      .catch((err) => console.error('Error loading experiences:', err));
  }, []);

  const addExperience = (newExperience) => {
    setExperiences((prev) => [...prev, newExperience]);
  };

  return (
    <CourseEvaluationContext.Provider value={{ experiences, addExperience }}>
      {children}
    </CourseEvaluationContext.Provider>
  );
};

export default CourseEvaluationProvider;
