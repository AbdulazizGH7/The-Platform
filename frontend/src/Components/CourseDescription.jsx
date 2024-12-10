import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';


function CourseDescription() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://the-platform-backend.onrender.com/api/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [courseId]);

  return (
    <>
      {!loading && course && (
        <section className="p-6 md:p-12">
          <h2 className="text-xl md:text-3xl font-bold mb-2">
            {course.courseCode} - {course.courseName}
          </h2>
          <p className="text-gray-300 mb-4 text-sm md:text-base">
            {course.description}
          </p>
          {course.prerequisites.length > 0 ? (
            <ul className="list-disc ml-6">
              <h4>Prerequisites:</h4>
              {course.prerequisites.map((preCourse) => (
                <li key={preCourse._id}>
                <Link to={`/course/${preCourse._id}`} className="text-blue-500 hover:underline">
                  {preCourse.courseCode}
                </Link>
              </li>
              
              ))}
            </ul>
          ) : (
            <p>No prerequisite courses</p>
          )}
        </section>
      )}
    </>
  );
}

export default CourseDescription;
