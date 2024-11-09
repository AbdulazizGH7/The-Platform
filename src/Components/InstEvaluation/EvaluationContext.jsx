import React, { createContext, useState } from 'react';

export const EvaluationContext = createContext();

const EvaluationProvider = ({ children }) => {
  const [experiences, setFeedbacks] = useState([
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

  const addFeedback = (newFeedback) => {
    setFeedbacks((prev) => [...prev, newFeedback]);
  };

  return (
    <EvaluationContext.Provider value={{ experiences, addFeedback }}>
      {children}
    </EvaluationContext.Provider>
  );
};

export default EvaluationProvider;



