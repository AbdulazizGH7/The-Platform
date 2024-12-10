import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EvaluationContext = createContext();

const EvaluationProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState([]);


    // useEffect(() => {
    //     // Fetch instructor reviews dynamically from the backend API
    //     axios.get('http://localhost:8080/api/instructors')
    //         .then((response) => {
    //             const instructorData = response.data; // Assuming the API returns an array of instructors
    //             if (instructorData.length > 0) {
    //                 setFeedbacks(instructorData[0].reviews || []); // Set feedbacks for the first instructor
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching instructor data:', error);
    //         });
    // }, []);


    useEffect(() => {
        // Fetch instructor reviews dynamically from the backend API
        axios.get('http://localhost:8080/api/instructors')
          .then((response) => {
            const instructorData = response.data; // Assuming the API returns an array of instructors
            if (instructorData.length > 0) {
              // Add instructorId to the reviews
              setFeedbacks(instructorData[0].reviews.map(review => ({
                ...review,
                instructorId: instructorData[0]._id, // Assuming each instructor has an _id field
              })));
            }
          })
          .catch((error) => {
            console.error('Error fetching instructor data:', error);
          });
      }, []);
      


    const addFeedback = (newFeedback) => {
      // Ideally, you want to update the state with the new feedback.
      setFeedbacks(newFeedback); // or setFeedbacks(prev => [...prev, newFeedback]);
  };
  
  

    return (
        <EvaluationContext.Provider value={{ feedbacks, addFeedback, setFeedbacks }}>
            {children}
        </EvaluationContext.Provider>
    );
};

export default EvaluationProvider;
