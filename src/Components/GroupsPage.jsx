import React, { useState } from 'react';
import GroupCard from './GroupCard.jsx';
import Popup from './Popup.jsx';
import Button from './Button'; // Import the custom Button component

const GroupsPage = () => {
  const [groups, setGroups] = useState([
    'Sec 2 & 5',
    'Sec 7',
    'Prof. Ahmed Sec',
    'Sec 1',
  ]);
  const [enrolledGroups, setEnrolledGroups] = useState([]);
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(true);
  const [newGroup, setNewGroup] = useState('');

  const handleRemoveGroup = (group) => {
    setSelectedGroup(group);
    setShowCreateGroupPopup(true);
  };

  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setShowJoinPopup(true);
  };

  const confirmRemoveGroup = () => {
    setGroups(groups.filter(group => group !== selectedGroup));
    setShowCreateGroupPopup(false);
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
    <div className="min-h-screen text-white flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-2xl font-bold">Groups</h1>
      </header>

      <div className="w-full max-w-4xl overflow-y-auto h-96 p-4 bg-purple-800 bg-opacity-60 rounded-lg shadow-lg scrollbar-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groups.map((group, index) => (
            <GroupCard
              key={index}
              title={group}
              onRemove={handleRemoveGroup}
              onJoin={handleJoinGroup}
              isAdmin={isAdmin}
              enrolledGroups={enrolledGroups}
            />
          ))}
        </div>
      </div>

      {isInstructor && (
        <div className="mt-4">
          <Button
            title="Add Group"
            behavior={() => setShowCreateGroupPopup(true)}
            textSize="base"
            px="4"
            py="2"
          />
        </div>
      )}

      <footer className="w-full max-w-4xl mt-8 text-center">
        <p>Enrolled Groups: {enrolledGroups.join(', ')}</p>
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
  );
};

export default GroupsPage;
