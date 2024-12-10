import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const EvaluationContext = createContext();

const EvaluationProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const { instructorId } = useParams();

    useEffect(() => {
        // Fetch instructor reviews dynamically from the backend API
        axios.get(`http://localhost:8080/api/instructors/${instructorId}`)
            .then((response) => {
                const instructorData = response.data; 
                if (instructorData.reviews) {
                    setFeedbacks(instructorData.reviews.map(review => ({
                        ...review,
                        instructorId: instructorData._id, 
                    })));
                }
            })
            .catch((error) => {
                console.error('Error fetching instructor data:', error);
            });
    }, [instructorId]);

    const addFeedback = (newFeedback) => {
        // Add new feedback to the list without replacing the old ones
        setFeedbacks(prevFeedbacks => [...prevFeedbacks, ...newFeedback]);
    };

    return (
        <EvaluationContext.Provider value={{ feedbacks, addFeedback, setFeedbacks }}>
            {children}
        </EvaluationContext.Provider>
    );
};

export default EvaluationProvider;
