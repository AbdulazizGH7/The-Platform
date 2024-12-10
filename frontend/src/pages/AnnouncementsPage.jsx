
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ToastNotification from '../Components/Resources/ToastNotification';


const AnnouncementForm = ({ onSubmit, onClose, initialData = null }) => {
  const [message, setMessage] = useState(initialData ? initialData.message : '');
  const [error, setError] = useState('');
  const { user } = useUser();
  const groupId = useParams(); // Ensure `groupId` matches your route parameter

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please enter an announcement message');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/groups/announcement', {
        groupId: groupId.groupId, // Ensure this matches the backend field
        announcement: message.trim(), // Match backend field for the announcement message
        senderId: user.id, // Assuming `user.id` contains the ID of the user
      });

      toast.success('Announcement posted successfully!');
      onSubmit(response.data.announcement); // Notify parent of the successful submission
      setMessage(''); // Reset the form
      onClose(); // Close the form
    } catch (err) {
      console.error('Failed to post announcement:', err);
      setError('Failed to post announcement. Please try again.');
      toast.error('Failed to post the announcement.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-indigo-600 p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-lg bg-purple-900 text-white placeholder-gray-400 mb-4 border border-gray-500"
          placeholder="Enter your announcement..."
          rows="4"
        />
        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            {initialData ? 'Save Changes' : 'Post Announcement'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


const AnnouncementCard = ({ instructor, date, message, onEdit, onDelete, isInstructor }) => (
  <div className="bg-gradient-to-br from-purple-800 to-indigo-700 p-4 rounded-lg shadow-md mb-6 relative">
    {isInstructor && (
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={onEdit} className="text-white hover:text-gray-300" title="Edit announcement">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
        <button onClick={onDelete} className="text-white hover:text-red-300" title="Delete announcement">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    )}
    <h3 className="text-lg font-bold text-white mb-1">{instructor}</h3>
    <p className="text-sm text-gray-300 mb-2">{date}</p>
    <hr className="border-gray-600 mb-3" />
    <p className="text-white text-sm">{message}</p>
  </div>
);


const AnnouncementsPage = () => {
  const groupId = useParams(); // Ensure groupId matches your route params
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [localAnnouncements, setLocalAnnouncements] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/api/groups/masseges/${groupId.groupId}`)
        .then((response) => {
          setLocalAnnouncements(response.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error('Failed to fetch group messages:', err.response?.data || err.message);
    }
  }, []);

  const handleNewAnnouncement = (announcement) => {
    setLocalAnnouncements([...localAnnouncements, announcement]);
  };

  const handleDelete = async (announcementId) => {
    try {
      await axios.delete(`http://localhost:8080/api/announcements/${announcementId}`);
      setLocalAnnouncements(localAnnouncements.filter((ann) => ann.id !== announcementId));
      toast.success('Announcement deleted successfully!');
    } catch (err) {
      console.error('Failed to delete announcement:', err.response?.data || err.message);
      setError('Failed to delete announcement. Please try again.');
      toast.error('Failed to delete the announcement.');
    }
  };

  return (
    <>
      <ToastNotification />
      {!loading && (
        <div className="min-h-screen flex flex-col items-center text-white py-12">
          <header className="w-full max-w-3xl mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Group Announcements</h1>
            <hr className="border-t-2 border-white w-auto mx-auto mb-8" />
          </header>

          {error && <p className="bg-red-500 text-white p-3 rounded-lg">{error}</p>}

          {showForm ? (
            <AnnouncementForm
              onSubmit={handleNewAnnouncement}
              onClose={() => setShowForm(false)}
              initialData={editingAnnouncement}
            />
          ) : (
            user.role === 'instructor' && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg mb-4"
              >
                Add Announcement
              </button>
            )
          )}

          <div className="w-full max-w-3xl flex-grow bg-gradient-to-b from-purple-900 to-indigo-900 p-6 rounded-xl shadow-lg overflow-y-auto">
            {localAnnouncements.length > 0 ? (
              localAnnouncements.map((announcement) => (
                <AnnouncementCard
                  key={announcement._id}
                  date={new Date(announcement.timestamp).toLocaleString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                  message={announcement.message}
                  instructor={announcement.senderId.username}
                  onEdit={() => setEditingAnnouncement(announcement)}
                  onDelete={() => handleDelete(announcement.id)}
                />
              ))
            ) : (
              <p className="text-white text-center">No announcements available for this group.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementsPage;


