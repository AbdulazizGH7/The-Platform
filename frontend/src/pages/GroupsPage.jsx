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
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const courseID = useParams();
  const { user, setUser } = useUser();

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

  const cancelPopup = () => {
    setShowJoinPopup(false);
    setSelectedGroup(null);
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
                  />
                );
              })}
            </div>
          </div>

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
