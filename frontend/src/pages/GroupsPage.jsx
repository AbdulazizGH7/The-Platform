import React, { useState, useEffect } from 'react';
import GroupCard from '../Components/GroupCard.jsx';
import Popup from '../Components/Popup.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '../Components/Button';
import { useUser } from '../contexts/UserContext';

const GroupsPage = () => {
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
  const [showDeleteGroupPopup, setShowDeleteGroupPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const courseID = useParams();
  const { user, setUser } = useUser();
  const [newGroup, setNewGroup] = useState('');
  const isInstructor = user.role === "instructor";
  const isAdmin = user.role === "admin";

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/groups/${courseID.courseId}`)
      .then((response) => {
        setGroups(response.data.groups || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, [courseID]);

  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setShowJoinPopup(true);
  };

  const confirmJoinGroup = async () => {
    try {
      const updatedUser = { ...user, groups: [...user.groups, selectedGroup._id] };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      await axios.put('http://localhost:8080/api/users/addGroup', {
        groupId: selectedGroup._id,
        userId: user.id,
      });

      setShowJoinPopup(false);
      setSelectedGroup(null);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const handleDeleteGroup = (group) => {
    setSelectedGroup(group);
    setShowDeleteGroupPopup(true);
  };

  const confirmDeleteGroup = async () => {
    if (!selectedGroup) return;

    try {
      await axios.delete(`http://localhost:8080/api/groups/${selectedGroup._id}`, {
        data: { id: selectedGroup._id }
      });

      // Remove the deleted group from the groups list
      setGroups(groups.filter(group => group._id !== selectedGroup._id));
      
      setShowDeleteGroupPopup(false);
      setSelectedGroup(null);
    } catch (error) {
      console.error('Error deleting group:', error);
      // Optionally, show an error message to the user
    }
  };

  const cancelPopup = () => {
    setShowJoinPopup(false);
    setShowDeleteGroupPopup(false);
    setSelectedGroup(null);
    setShowCreateGroupPopup(false);
  };
  
  const handleCreateGroup = async () => {
    if (!newGroup.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/groups/create1', {
        groupName: newGroup,
        courseId: courseID.courseId,
      });

      setGroups([...groups, response.data.group]);
      setNewGroup('');
      setShowCreateGroupPopup(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleNewGroupInput = (e) => {
    setNewGroup(e.target.value);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="min-h-screen text-white flex flex-col items-center p-8">
          <header className="w-full max-w-4xl mb-8">
            <h1 className="text-2xl font-bold">Groups</h1>
          </header>

          <div className="w-full max-w-4xl overflow-y-auto h-96 p-4 bg-purple-800 bg-opacity-60 rounded-lg shadow-lg scrollbar-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groups.map((group) => {
                const isMember = user.groups.includes(group._id);
                return (
                  <GroupCard
                    key={group._id}
                    title={group.groupName}
                    action={
                      isMember ? (
                        <span className="text-green-500 font-semibold">Joined</span>
                      ) : (
                        <Button
                          title="Join"
                          behavior={() => handleJoinGroup(group)}
                          textSize="base"
                          px="4"
                          py="2"
                        />
                      )
                    }
                    showDeleteButton={isAdmin}
                    onDelete={() => handleDeleteGroup(group)}
                  />
                );
              })}
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
            message={`Are you sure you want to join the group ${selectedGroup?.groupName}?`}
            onConfirm={confirmJoinGroup}
            onCancel={cancelPopup}
            confirmText="Yes"
            cancelText="No"
          />

          {/* Popup for Delete Group Confirmation */}
          <Popup
            show={showDeleteGroupPopup}
            title="Confirm Delete"
            message={`Are you sure you want to delete the group ${selectedGroup?.groupName}?`}
            onConfirm={confirmDeleteGroup}
            onCancel={cancelPopup}
            confirmText="Delete"
            cancelText="Cancel"
          />
        </div>
      )}
    </>
  );
};

export default GroupsPage;