import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const CourseEvaluationContext = createContext();

const CourseEvaluationProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    axios.get(`https://the-platform-backend.onrender.com/api/experiences/${courseId}/experiences`)
      .then((response) => {
        setExperiences(response.data);  // Assuming the backend returns experiences for a specific course
      })
      .catch((err) => {
        console.error('Error fetching experiences:', err);
        setError('Failed to fetch experiences');
      });
  }, [courseId]);
  

  const addExperience = async (courseId, metrics, description) => {
    try {
      console.log('Attempting to add experience:', { courseId, metrics, description });
  
      const response = await axios.put(
        `https://the-platform-backend.onrender.com/api/courses/addExperience/${courseId}`,
        { metrics, description },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.status === 200) {
        console.log('Updated experiences:', response.data.experiences);
  
        // Directly update the state with the returned experiences
        setExperiences(response.data.experiences);
      } else {
        console.error('Error adding experience:', response.data.message);
      }
    } catch (err) {
      console.error('Error adding experience:', err);
    }
  };
  
  

  return (
    <CourseEvaluationContext.Provider value={{ experiences, addExperience, setExperiences }}>
      {children}
    </CourseEvaluationContext.Provider>
  );
};

export default CourseEvaluationProvider;