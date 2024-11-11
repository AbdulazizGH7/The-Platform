import React, { createContext, useState, useContext } from 'react';

import departmentsData from '../data/departments.json';
import groupsData from '../data/groups.json';
import coursesData from '../data/courses.json';
import usersData from '../data/users.json';
import instructorData from '../data/instructors.json';
import experiencesData from '../data/experiences.json';

const DataContext = createContext();

function DataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(usersData.users); // Initialize users state
  const [departments, setDepartments] = useState(departmentsData.departments);
  const [groups, setGroups] = useState(groupsData.groups);
  const [courses, setCourses] = useState(coursesData.courses);
  const [instructors, setInstructors] = useState(instructorData.instructors);
  const [experiences, setExperiences] = useState(experiencesData.experiences);

  function loadUserData(email, password) {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  }

  function addUser({ username, email, password }) {
    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser = {
      id: newId,
      email,
      password,
      username,
      role: 'student',
      courses: [],
      groups: [], 
    };

    setUsers([...users, newUser]);
    setUser(newUser);
  }

  return (
    <DataContext.Provider
      value={{
        user,
        users,
        setUser,
        loadUserData,
        addUser,
        departments,
        setDepartments,
        groups,
        setGroups,
        courses,
        setCourses,
        instructors,
        setInstructors,
        experiences,
        setExperiences,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };
