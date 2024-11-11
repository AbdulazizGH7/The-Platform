import React, { createContext, useState, useEffect } from 'react';

export const EvaluationContext = createContext();

const EvaluationProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch instructor reviews dynamically from instructors.json
    import('../../data/instructors.json')
      .then((data) => {
        const instructorData = data.instructors[0]; // Assuming first instructor is the target
        setFeedbacks(instructorData.reviews || []);
      })
      .catch((err) => console.error('Error loading feedbacks:', err));
  }, []);

  const addFeedback = (newFeedback) => {
    setFeedbacks((prev) => [...prev, newFeedback]);
  };

  return (
    <EvaluationContext.Provider value={{ feedbacks, addFeedback }}>
      {children}
    </EvaluationContext.Provider>
  );
};

export default EvaluationProvider;
