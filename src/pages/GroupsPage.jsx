import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../utilities/DataContext';
import GroupCard from '../Components/GroupCard.jsx';
import Popup from '../Components/Popup.jsx';
import Button from '../Components/Button.jsx';

const GroupsPage = ({ userType }) => {
  const { courseId } = useParams(); // Get courseId from URL
  const { courses } = useData(); // Retrieve data using useData
  const [groups, setGroups] = useState([]);
  const [enrolledGroups, setEnrolledGroups] = useState([]);
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
  const [showRemoveGroupPopup, setShowRemoveGroupPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroup, setNewGroup] = useState('');

  // Determine if the user has permissions based on userType
  const isAdmin = userType === 'admin';
  const isInstructor = userType === 'instructor';

  useEffect(() => {
    // Find the selected course and set its groups
    const selectedCourse = courses.find((course) => course.courseId === Number(courseId));
    if (selectedCourse) {
      setGroups(selectedCourse.groups || []);
    }
  }, [courseId, courses]);

  const handleRemoveGroup = (group) => {
    setSelectedGroup(group);
    setShowRemoveGroupPopup(true);
  };

  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setShowJoinPopup(true);
  };

  const confirmRemoveGroup = () => {
    setGroups(groups.filter(group => group !== selectedGroup));
    setShowRemoveGroupPopup(false);
    setSelectedGroup(null);
  };

  const confirmJoinGroup = () => {
    setEnrolledGroups([...enrolledGroups, selectedGroup]);
    setGroups(groups.filter(g => g !== selectedGroup));
    setShowJoinPopup(false);
    setSelectedGroup(null);
  };

  const cancelPopup = () => {
    setShowCreateGroupPopup(false);
    setShowRemoveGroupPopup(false);
    setShowJoinPopup(false);
    setSelectedGroup(null);
  };

  const handleCreateGroup = () => {
    if (newGroup.trim()) {
      setGroups([...groups, newGroup.trim()]);
      setNewGroup('');
      setShowCreateGroupPopup(false);
    }
  };

  const handleNewGroupInput = (e) => {
    setNewGroup(e.target.value);
  };

  return (
    <>
      <header className="mt-8 text-center">
        <h2 className="text-white font-bold text-3xl mb-4 lg:text-4xl">Groups</h2>
        <hr className="w-1/2 mx-auto border-purple-500" />
      </header>

      <div className="min-h-screen text-white flex flex-col items-center p-8">
        <div className="w-full max-w-4xl overflow-y-auto h-96 p-6 bg-gradient-to-br from-purple-900 to-purple-700 bg-opacity-70 rounded-lg shadow-lg scrollbar-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groups.map((group, index) => (
              <GroupCard
                key={index}
                title={group}
                onRemove={handleRemoveGroup}
                onJoin={handleJoinGroup}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </div>

        {isInstructor && (
          <div className="mt-6">
            <Button
              title="Add Group"
              behavior={() => setShowCreateGroupPopup(true)}
              textSize="lg"
              px="6"
              py="3"
            />
          </div>
        )}

        <footer className="w-full max-w-4xl mt-8 text-center text-gray-200">
          <p className="text-lg font-medium">Enrolled Groups: <span className="text-gray-100">{enrolledGroups.join(', ')}</span></p>
        </footer>

        {/* Popup for Create Group */}
        <Popup
          show={showCreateGroupPopup}
          title="Create New Group"
          message="Enter new group name"
          onConfirm={handleCreateGroup}
          onCancel={cancelPopup}
          confirmText="Create"
          cancelText="Cancel"
          onInputChange={handleNewGroupInput}
          inputValue={newGroup}
        />

        {/* Popup for Remove Group Confirmation */}
        <Popup
          show={showRemoveGroupPopup}
          title="Confirm Remove"
          message={`Are you sure you want to remove the group ${selectedGroup}?`}
          onConfirm={confirmRemoveGroup}
          onCancel={cancelPopup}
          confirmText="Remove"
          cancelText="Cancel"
        />

        {/* Popup for Join Group Confirmation */}
        <Popup
          show={showJoinPopup}
          title="Confirm Join"
          message={`Are you sure you want to join the group ${selectedGroup}?`}
          onConfirm={confirmJoinGroup}
          onCancel={cancelPopup}
          confirmText="Yes"
          cancelText="No"
        />
      </div>
    </>
  );
};

export default GroupsPage;
