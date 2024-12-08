import React, { useState, useEffect } from 'react';
import GroupCard from '../Components/GroupCard.jsx';
import Popup from '../Components/Popup.jsx';
import Button from '../Components/Button.jsx';
import { useData } from '../utilities/DataContext';
import { useParams } from 'react-router-dom';

const GroupsPage = () => {
  const { user, groups, setGroups, setUser } = useData();
  const { courseId } = useParams();

  const [filteredGroups, setFilteredGroups] = useState([]);
  const [enrolledGroups, setEnrolledGroups] = useState([]);
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
  const [showRemoveGroupPopup, setShowRemoveGroupPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroup, setNewGroup] = useState('');

  useEffect(() => {
    const userGroupIds = user.groups;
    const availableGroups = groups.filter(g => g.courseId === Number(courseId) && !userGroupIds.includes(g.groupId));
    setFilteredGroups(availableGroups);
  }, [groups, courseId, user.groups]);

  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor';

  const handleRemoveGroup = (group) => {
    setSelectedGroup(group);
    setShowRemoveGroupPopup(true);
  };

  const confirmRemoveGroup = () => {
    const updatedGroups = groups.filter(g => g.groupId !== selectedGroup.groupId);
    setGroups(updatedGroups);
    setFilteredGroups(updatedGroups.filter(g => g.courseId === Number(courseId) && !user.groups.includes(g.groupId)));
    setShowRemoveGroupPopup(false);
    setSelectedGroup(null);
  };

  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setShowJoinPopup(true);
  };

  const confirmJoinGroup = () => {

    setUser({ ...user, groups:[...user.groups, selectedGroup.groupId] });

    const updatedGroups = groups.filter(g => g.groupId !== selectedGroup.groupId);
  
    setFilteredGroups(updatedGroups.filter(g => g.courseId === Number(courseId) && !user.groups.includes(g.groupId)));
    
    setShowJoinPopup(false);
    setSelectedGroup(null);
  };

  const confirmLeaveGroup = (group) => {
    const updatedUserGroups = user.groups.filter(gId => gId !== group.groupId);
    
    setUser({ ...user, groups: updatedUserGroups });

    const updatedGroups = [...groups, group];
    
    setFilteredGroups(updatedGroups.filter(g => g.courseId === Number(courseId) && !updatedUserGroups.includes(g.groupId)));
    
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
      const newGroupObj = { groupId: groups.length + 1, groupName: newGroup.trim(), courseId: Number(courseId) };
      const updatedGroups = [...groups, newGroupObj];
  
      setFilteredGroups(updatedGroups.filter(g => g.courseId === Number(courseId) && !user.groups.includes(g.groupId)));
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
            {filteredGroups.map((group, index) => (
              <GroupCard
                key={index}
                title={group.groupName}
                onRemove={isAdmin ? () => handleRemoveGroup(group) : null} // Show remove option only if user is Admin
                onJoin={() => handleJoinGroup(group)}
                isAdmin={isAdmin}
                onLeave={isInstructor ? () => confirmLeaveGroup(group) : null} // Show leave option only if user is Instructor
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
  <p className="text-lg font-medium">Enrolled Groups: 
    <span className="text-gray-100">
      {user.groups.length > 0 ? 
        user.groups.map(groupId => {
          const group = groups.find(group => group.groupId === groupId);
          return group ? group.groupName : null;
        }).filter(Boolean).join(', ') :
        "No enrolled groups"
      }
    </span>
  </p>
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
          message={`Are you sure you want to remove the group ${selectedGroup?.groupName}?`}
          onConfirm={confirmRemoveGroup}
          onCancel={cancelPopup}
          confirmText="Remove"
          cancelText="Cancel"
        />

        {/* Popup for Join Group Confirmation */}
        <Popup
          show={showJoinPopup}
          title="Confirm Join"
          message={`Are you sure you want to join the group ${selectedGroup?.groupName}?`}
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
