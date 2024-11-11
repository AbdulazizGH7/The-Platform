import React, { createContext, useState, useContext} from 'react';

import departmentsData from '../data/departments.json';
import groupsData from '../data/groups.json';
import coursesData from '../data/courses.json';
import usersData from '../data/users.json'
import instructorData from '../data/instructors.json'
import experiencesData from '../data/experiences.json'

const DataContext = createContext();

function DataProvider({ children }) {

  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState(departmentsData.departments);
  const [groups, setGroups] = useState(groupsData.groups);
  const [courses, setCourses] = useState(coursesData.courses);
  const [instructors, setInstructors] = useState(instructorData.instructors);
  const [experiences, setExperiences] = useState(experiencesData.experiences);

  function loadUserData(email, password) {
    const foundUser = usersData.users.find((user) => user.email === email && user.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  }
  

  return (
    <DataContext.Provider value={{ user, setUser, loadUserData, departments, setDepartments, groups, setGroups, courses, setCourses, instructors, setInstructors, experiences, setExperiences }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };
