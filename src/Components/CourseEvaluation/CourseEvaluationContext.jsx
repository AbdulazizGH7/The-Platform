import React, { createContext, useState } from 'react';

export const CourseEvaluationContext = createContext();

const CourseEvaluationProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([
    {
      difficulty: 3,
      workload: 4,
      resources: 5,
      content:
        "It was a moderately challenging course, covering key topics like software processes, requirements analysis, and design models.",
    },
    {
      difficulty: 2,
      workload: 5,
      resources: 4,
      content:
        "While the concepts could be difficult, especially for beginners, they were manageable with consistent effort.",
    },
  ]);

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
