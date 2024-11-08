import React from 'react';
import DropDown from './DropDown';
import { useState, useEffect } from 'react';
import Button from './Button'

function CourseSearchPage({role = 'admin'}) {

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState([]);
    const [width, setWidth] = useState(window.innerWidth)
  
    useEffect(() =>{
      window.addEventListener("resize", () => setWidth(window.innerWidth))
      
      return () =>{
        window.removeEventListener("resize", () => setWidth(window.innerWidth))
      }
    },[])

    const isAdmin = role === "admin" ? true : false

    const data = {
        departments: [
          {
            name: "Mathematics",
            courses: [
              { courseID: 1, courseCode: "MATH-101", courseName: "Calculus I" },
              { courseID: 2, courseCode: "MATH-102", courseName: "Calculus II" },
              { courseID: 3, courseCode: "MATH-201", courseName: "Calculus III" }
            ]
          },
          {
            name: "Information & Computer Science",
            courses: [
              { courseID: 4, courseCode: "ICS-104", courseName: "Introduction to Programming in Python and C" },
              { courseID: 5, courseCode: "ICS-108", courseName: "Object-Oriented Programming" },
              { courseID: 6, courseCode: "ICS-202", courseName: "Data Structures and Algorithms" },
            ]
          },
          {
            name: "Islamic studies",
            courses: []
          }
        ]
      };

      function handleDepartmentChange(e){
        const departmentName = e.target.value;
        setSelectedDepartment(departmentName);
        setSelectedCourse('');
        const department = data.departments.find(dep => dep.name === departmentName);
        setCourses(department ? department.courses : []);
      }

      function handleCourseChange(e){
        const courseCode = e.target.value;
        setSelectedCourse(courseCode);
      }

      const filteredCourses = selectedCourse
      ? courses.filter(course => course.courseID === parseInt(selectedCourse))
      : courses;

  return (
    <section className="mt-8">
      <div>
        <h2 className="text-gray-100 font-bold text-3xl mb-2 lg:text-4xl">Courses</h2>
        <hr className="w-[60%]" />
      </div>
      <div className="mt-4 flex min-h-[70vh]">
        <div className="course-grade border-solid border-2 border-white w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 rounded-lg flex-grow flex flex-col" id='E'>
            <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between '>
            <DropDown
             label={"Department"}
             options={data.departments.map(department =>({
                label:department.name,
                value:department.name
                }))}
             selectedValue={selectedDepartment}
             onChange={handleDepartmentChange}
             disabled={false}>
             </DropDown>
             <DropDown
             label={"Course"}
             options={courses.map(course =>({
                label:course.courseCode,
                value:course.courseID
                }))}
             selectedValue={selectedCourse}
             onChange={handleCourseChange}
             disabled={!selectedDepartment}>
             </DropDown>
            </div>
            <div className={`border-solid border-2 border-white mt-4 flex flex-col ${filteredCourses.length === 0 || !selectedDepartment ? 'justify-center flex-grow mb-5' : 'h-auto'}`} id='C'>
                {!selectedDepartment ? <p className='text-center text-gray-100 font-bold text-3xl sm:text-4xl'>Please Select a Department</p> : filteredCourses.length >0 ? (
                  <div className="overflow-auto max-h-[800px]">
                  <table className="w-full table-auto text-gray-100">
                    <thead>
                      <tr className="bg-[#1D1E42]">
                        <th className="px-4 py-2 text-left whitespace-nowrap lg:text-lg">Course Code</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap lg:text-lg">Course Name</th>
                        <th className="px-4 py-2 text-left whitespace-nowrap"></th>
                        <th className="px-4 py-2 text-left whitespace-nowrap"></th>
                        <th className={`px-4 py-2 text-left whitespace-nowrap ${isAdmin ? "block" : "hidden"}`}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course) => (
                        <tr key={course.courseID} className="border-b odd:bg-[#26264F] even:bg-[#1D1E42]">
                          <td className="px-4 py-2 whitespace-nowrap lg:text-lg">{course.courseCode}</td>
                          <td className="px-4 py-2  whitespace-nowrap w-full lg:text-lg">{course.courseName}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <Button title='Info' px='8'></Button>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <Button title='Add' px='8' ></Button>
                          </td>
                          <td className={`px-4 py-2 whitespace-nowrap  ${isAdmin ? "block" : "hidden"}`}>
                            <Button title='Remove' px='8' ></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                ) : <p className='text-center text-gray-100 font-bold text-3xl sm:text-4xl'>There are no courses <br /> Please select another <br /> department</p>}
            </div>
        </div>
      </div>
    </section>
  );
}



export default CourseSearchPage;