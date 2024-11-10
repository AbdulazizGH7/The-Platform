import React, { createContext, useState, useContext} from 'react';

import departmentsData from '../data/departments.json';
import groupsData from '../data/groups.json';
import coursesData from '../data/courses.json';
import usersData from '../data/users.json'

const DataContext = createContext();

function DataProvider({ children }) {

  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState(departmentsData.departments);
  const [groups, setGroups] = useState(groupsData.groups);
  const [courses, setCourses] = useState(coursesData.courses);

  function loadUserData(username) {
    
    const foundUser = usersData.users.find(function (u) {
      return u.username === username;
    });
    setUser(foundUser);
    
  }

  return (
    <DataContext.Provider value={{ user, setUser, loadUserData, departments, setDepartments, groups, setGroups, courses, setCourses }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };
