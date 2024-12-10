import React, { useState, useEffect } from 'react';
import GroupCard from '../Components/GroupCard.jsx';
import Popup from '../Components/Popup.jsx';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Button from '../Components/Button';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import ToastNotification from '../Components/Resources/ToastNotification';

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
      .get(`https://the-platform-backend.onrender.com/api/groups/${courseID.courseId}`)
      .then((response) => {
        setGroups(response.data.groups || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        toast.error('Failed to load groups. Please try again.');
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

      await axios.put('https://the-platform-backend.onrender.com/api/users/addGroup', {
        groupId: selectedGroup._id,
        userId: user.id,
      });

      setShowJoinPopup(false);
      setSelectedGroup(null);
      toast.success(`Successfully joined group ${selectedGroup.groupName}!`);
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
      await axios.delete(`https://the-platform-backend.onrender.com/api/groups/${selectedGroup._id}`, {
        data: { id: selectedGroup._id }
      });

      // Remove the deleted group from the groups list
      setGroups(groups.filter(group => group._id !== selectedGroup._id));
      
      setShowDeleteGroupPopup(false);
      setSelectedGroup(null);
      toast.success(`Group ${selectedGroup.groupName} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting group:', error);
      toast.error('Failed to delete group. Please try again.');
      
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
      const response = await axios.post('https://the-platform-backend.onrender.com/api/groups/create1', {
        groupName: newGroup,
        courseId: courseID.courseId,
      });

      setGroups([...groups, response.data.group]);
      setNewGroup('');
      setShowCreateGroupPopup(false);
      toast.success(`Group ${newGroup} created successfully!`);
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Failed to create group. Please try again.');
    }
  };

  const handleNewGroupInput = (e) => {
    setNewGroup(e.target.value);
  };

  return (
    <>
    <ToastNotification />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
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
                        <Link 
                          to={`/group/${group._id}`}
                          className="text-green-500 font-semibold hover:underline"
                        >
                          View Group
                        </Link>
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