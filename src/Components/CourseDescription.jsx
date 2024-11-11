import React from 'react'
import { useData } from '../utilities/DataContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

function CourseDescription() {

    const { courseId } = useParams()
    const { courses } = useData()
  
    const course = courses.find((c) => c.courseId === Number(courseId))

  return (
    <section className="p-6 md:p-12">
    <h2 className="text-xl md:text-3xl font-bold mb-2">
      {course.courseCode} - {course.courseName}
    </h2>
    <p className="text-gray-300 mb-4 text-sm md:text-base">
      {course.description}
    </p>
    {course.prerequisites.length > 0 ? (
                    <ul className="list-disc ml-6">
                      <h4>Prerequisites: </h4>
                        {course.prerequisites.map((prereqId) => {
                            const prereqCourse = courses.find((c) => c.courseId === prereqId);
                            
                            return  prereqCourse ? (
                                <li key={prereqId}>
                                     <Link
                                        to={`/course/${prereqId}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {prereqCourse.courseCode}
                                    </Link>
                                </li>
                            ) : null;
                        })}
                    </ul>
                ) : (
                    <p>No prerequisite courses</p>)}
    </section>
  )
}

export default CourseDescription