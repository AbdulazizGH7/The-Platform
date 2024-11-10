import React from 'react'
import { useData } from '../utilities/DataContext';
import { useParams } from 'react-router-dom';

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
    <p className="text-sm md:text-base">
      Pre-requisites: <a href="#ICS108" className="text-indigo-400 underline">ICS108</a>
    </p>
    </section>
  )
}

export default CourseDescription