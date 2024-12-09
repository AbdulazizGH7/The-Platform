import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";
import axios from 'axios';
import { useData } from '../utilities/DataContext';
import DropDown from '../Components/DropDown';
import Button from '../Components/Button';

function CourseSearchPage() {

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [depCourses, setDepCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddCourseForm, setShowAddCourseForm] = useState(false);
    const [courseToRemove, setCourseToRemove] = useState(null);
    const [newCourse, setNewCourse] = useState({
        courseCode: '',
        courseName: '',
        courseDescription: '',
    });
    const [selectedAddDepartment, setSelectedAddDepartment] = useState('');
    const [departments, setDepartments] = useState([])
    const [options, setOptions] = useState({})
    const [selectedInstructors, setSelectedInstructors] = useState([])
    const { user, setUser} = useData()
    const isAdmin = user.role === "admin";

    useEffect(() => {    
        axios.get('http://localhost:8080/api/departments')  
            .then(response => {  
                setDepartments(response.data);  
        })  
        .catch(error => {  
            console.error('Error fetching data:', error);  
        });

        {isAdmin && axios.get('http://localhost:8080/api/instructors')  
            .then(response => {  
                setOptions(response.data.map(instructor => ({
                    label: instructor.name,
                    value: instructor._id,
                  })));  
        })  
        .catch(error => {  
            console.error('Error fetching data:', error);  
        });}
    }, []);

    // This function handles the selection of the department
    function handleDepartmentChange(e) {
        const departmentName = e.target.value;
        setSelectedDepartment(departmentName);
        setSelectedCourse('');
        const department = departments.find(dep => dep.departmentName === departmentName);
        setDepCourses(department ? department.courses : []);
    }

    // This function handles the selection of the Course
    function handleCourseChange(e) {
        const courseCode = e.target.value;
        setSelectedCourse(courseCode);
    }

    // Needs work...
    function handleAddCourse(courseID){
        setUser({...user, courses: [...user.courses, courseID]})
    }

    // Opens the remove course modal
    function openRemoveModal(course) {
        setCourseToRemove(course);
        setShowModal(true);
    }

    // This function removes a course
    async function handleConfirmRemove() {
        try{
            await axios.delete(`http://localhost:8080/api/courses/${courseToRemove._id}`)
            const response = await axios.get('http://localhost:8080/api/departments')
            setDepartments(response.data) 
        } catch(err){
            console.log(err) 
        } finally{
            setShowModal(false);
            setCourseToRemove(null);
            setSelectedDepartment('')
            setDepCourses([])
            setSelectedCourse('')
        }
    }

    // Closes the remove course modal.
    function handleCancelRemove() {
        setShowModal(false);
        setCourseToRemove(null);
    }

    // Shows the add course modal
    function openAddCourseForm() {
        setShowAddCourseForm(true);
    }

    // This function creates a new course
    async function handleAddCourseSubmit() {  
        try {  
            const instIDs = selectedInstructors.map(inst => inst.value) 
            // First API call to create course
            const courseResponse = await axios.post("http://localhost:8080/api/courses", {  
                courseCode: newCourse.courseCode,  
                courseName: newCourse.courseName,  
                description: newCourse.courseDescription,  
                instructors: instIDs 
            }); 
    
            // The success check should be on courseResponse.data.success 
            if (!courseResponse.data.success) {  
                alert(courseResponse.data.message);  
                return; // Add return to prevent executing the rest of the code  
            }  
    
            // Get the new course ID from the response data  
            const newCourseId = courseResponse.data.data._id; 
    
            // Update department if selectedAddDepartment exists  
            if (selectedAddDepartment) {  
                await axios.put("http://localhost:8080/api/departments/addCourse", { 
                    departmentName: selectedAddDepartment,  
                    courseId: newCourseId  
                });
                const response = await axios.get('http://localhost:8080/api/departments')
                setDepartments(response.data)  
            }  
    
            // Update instructors if there are any  
            if (selectedInstructors.length > 0) {  
                await axios.put("http://localhost:8080/api/instructors/addCourse", {
                    instructorsId: instIDs,  
                    courseId: newCourseId  
                });  
            }  
    
            // If everything succeeded, reset the form  
            setSelectedAddDepartment("");  
            setNewCourse({ courseCode: '', courseName: '', courseDescription: '' });  
            setShowAddCourseForm(false);  
    
        } catch (err) {  
            console.error('Error:', err.response?.data || err.message);  
            alert('An error occurred: ' + (err.response?.data?.message || err.message));  
        }  
    }  


    const filteredCourses = selectedCourse
        ? depCourses.filter(course => course._id === selectedCourse)
        : depCourses;

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
                            options={departments.map(department => ({
                                label: department.departmentName,
                                value: department.departmentName
                            }))}
                            selectedValue={selectedDepartment}
                            onChange={handleDepartmentChange}
                            disabled={false}>
                        </DropDown>
                        <DropDown
                            label={"Course"}
                            options={depCourses.map(course => ({
                                label: course.courseCode,
                                value: course._id
                            }))}
                            selectedValue={selectedCourse}
                            onChange={handleCourseChange}
                            disabled={!selectedDepartment}>
                        </DropDown>
                    </div>
                    <div className={`border-solid border-2 border-white mt-4 flex flex-col ${filteredCourses.length === 0 || !selectedDepartment ? 'justify-center flex-grow mb-5' : 'h-auto'}`} >
                        {!selectedDepartment ? <p className='text-center text-gray-100 font-bold text-3xl sm:text-4xl'>Please Select a Department</p> : filteredCourses.length > 0 ? (
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
                                            <tr key={course._id} className="border-b odd:bg-[#26264F] even:bg-[#1D1E42]">
                                                <td className="px-4 py-2 whitespace-nowrap lg:text-lg">{course.courseCode}</td>
                                                <td className="px-4 py-2 whitespace-nowrap w-full lg:text-lg">{course.courseName}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <Link to={`/course/${course._id}`}>
                                                        <Button 
                                                            title='Info'
                                                            px='8'>
                                                        </Button>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <Button 
                                                        title={user.courses.includes(course._id) ? "Added" : "Add"} 
                                                        px='8' 
                                                        isDisabled={user.courses.includes(course._id)} 
                                                        behavior={() => handleAddCourse(course._id)}>
                                                    </Button>
                                                </td>
                                                <td className={`px-4 py-2 whitespace-nowrap ${isAdmin ? "block" : "hidden"}`}>
                                                    <Button 
                                                        title='Remove' 
                                                        px='8' 
                                                        behavior={() => openRemoveModal(course)}
                                                    ></Button>
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

            {isAdmin && <div className='flex justify-center my-4'>
                <Button 
                    px='16' 
                    title='Add Course' 
                    textSize='xl' 
                    behavior={openAddCourseForm}>
                </Button>
            </div>}


            {showAddCourseForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="card-grade border-solid border-2 border-white p-8 rounded-lg text-center w-10/12 sm:w-1/2 md:w-2/3 lg:w-1/2 max-w-[800px]">
                        <h3 className="text-xl text-gray-100 mb-4 lg:text-2xl xl:text-3xl">Add New Course</h3>
                        <select className='mb-4 w-full px-2 py-1 rounded-md max-w-[750px] lg:text-xl' 
                        value={selectedAddDepartment} 
                        onChange={(e) => setSelectedAddDepartment(e.target.value)} 
                        required>
                            <option 
                                value="">
                                -- Select a Department --
                            </option>
                                {departments.map((department) => (
                                <option key={department._id} value={null}>
                                    {department.departmentName}
                                </option>
                            ))}
                        </select>
                        <input
                        type="text"
                        placeholder="Course Code"
                        value={newCourse.courseCode}
                        onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
                        className="mb-4 w-full px-2 py-1 rounded-md max-w-[750px] lg:text-xl"
                        required
                        />
                        <input
                        type="text"
                        placeholder="Course Name"
                        value={newCourse.courseName}
                        onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                        className="mb-4 w-full px-2 py-1 rounded-md max-w-[750px] lg:text-xl"
                        required
                        />
                        <textarea
                        placeholder="Course Description"
                        value={newCourse.courseDescription}
                        onChange={(e) => setNewCourse({ ...newCourse, courseDescription: e.target.value })}
                        className="mb-4 w-full px-2 py-1 rounded-md max-w-[750px] lg:text-xl"
                        required
                        />
                        <div className='mb-4 w-full'>
                        <MultiSelect
                        options={options}
                        value={selectedInstructors}
                        onChange={setSelectedInstructors}
                        labelledBy="Assign Instructor/s"
                        hasSelectAll={false}
                        overrideStrings={{search: "Search", selectSomeItems: "Assign Instructor/s"}}
                        />
                        </div>
                        <div className="flex justify-center gap-4">
                            <button
                            className='text-gray-100 rounded-3xl text-center font-bold bg-[#8D8DDA] hover:btn-hover px-4 py-2 lg:px-12 xl:text-xl'
                            onClick={() => setShowAddCourseForm(false)}>
                            Cancel</button>
                            <button
                            className='text-gray-100 rounded-3xl text-center font-bold bg-[#8D8DDA] hover:btn-hover px-4 py-2 lg:px-12 xl:text-xl '
                            onClick={handleAddCourseSubmit}>
                            Add Course</button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="card-grade border-solid border-2 border-white p-8 rounded-lg text-center w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <h3 className="text-xl text-gray-100 mb-4">Remove Course</h3>
                        <p className="text-gray-200 mb-4">Are you sure you want to remove {courseToRemove.courseCode}?</p>
                        <div className="flex justify-center gap-4">
                            <Button title='No, cancel' px='8' behavior={handleCancelRemove}></Button>
                            <Button title='Yes, Confirm' px='8' behavior={handleConfirmRemove}></Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CourseSearchPage;