import React, { useState, useEffect } from 'react';
import GroupCard from '../Components/GroupCard.jsx';
import Popup from '../Components/Popup.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '../Components/Button';
import { useUser } from '../contexts/UserContext';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(true);
  const [newGroup, setNewGroup] = useState('');
  const { courseId } = useParams();
  const { user, setUser } = useUser();

  useEffect(() => {
    console.log('Course ID:', courseId);

    axios
      .get(`http://localhost:8080/api/groups/${courseId}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setGroups(response.data.groups || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, [courseId]);

  const handleRemoveGroup = (group) => {
    setSelectedGroup(group);
    setShowCreateGroupPopup(true);
  };

  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setShowJoinPopup(true);
  };

  const confirmRemoveGroup = () => {
    setGroups(groups.filter((group) => group !== selectedGroup));
    setShowCreateGroupPopup(false);
    setSelectedGroup(null);
  };

  const confirmJoinGroup = async () => {
    if (selectedGroup) {
      try {
        const updatedUser = { ...user, groups: [...user.groups, selectedGroup._id] };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        await axios.put('http://localhost:8080/api/users/addGroup', {
          groupId: selectedGroup._id,
          userId: user.id,
        });

        setGroups(groups.filter((g) => g._id !== selectedGroup._id));
        setShowJoinPopup(false);
        setSelectedGroup(null);
      } catch (error) {
        console.error('Error joining group:', error);
      }
    }
  };

  const cancelPopup = () => {
    setShowCreateGroupPopup(false);
    setShowJoinPopup(false);
    setSelectedGroup(null);
  };

  const handleCreateGroup = async () => {
    if (newGroup.trim()) {
      try {
        const response = await axios.post('http://localhost:8080/api/groups/create1', {
          groupName: newGroup.trim(),
          members: [],
        });
        setGroups([...groups, response.data]);
        setNewGroup('');
        setShowCreateGroupPopup(false);
      } catch (error) {
        console.error('Error creating group:', error);
      }
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
              {groups.map((group) => (
                <GroupCard
                  key={group._id}
                  title={group.groupName}
                  onRemove={() => handleRemoveGroup(group)}
                  onJoin={() => handleJoinGroup(group)}
                  isAdmin={isAdmin}
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
            message={`Are you sure you want to join the group ${selectedGroup?.groupName}?`}
            onConfirm={confirmJoinGroup}
            onCancel={cancelPopup}
            confirmText="Yes"
            cancelText="No"
          />
        </div>
      )}
    </>
  );
};

export default GroupsPage;