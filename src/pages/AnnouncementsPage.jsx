import React, { useState } from "react";

const AnnouncementCard = ({ instructor, date, message, onEdit, onDelete, isInstructor }) => (
  <div className="bg-gradient-to-br from-purple-800 to-indigo-700 p-6 rounded-lg shadow-md mb-6 relative">
    {isInstructor && (
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={onEdit}
          className="text-white hover:text-gray-300 transition-colors"
          title="Edit announcement"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
        <button 
          onClick={onDelete}
          className="text-white hover:text-red-300 transition-colors"
          title="Delete announcement"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

const AnnouncementForm = ({ onSubmit, onClose, initialData = null }) => {
  const [message, setMessage] = useState(initialData ? initialData.message : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please enter an announcement message');
      return;
    }
    
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()} ${now.getHours() >= 12 ? 'pm' : 'am'}`;
    
    onSubmit({
      instructor: "Dr. Ahmed Mohsen",
      date: initialData ? initialData.date : formattedDate,
      message: message.trim(),
      id: initialData ? initialData.id : Date.now()
    });
    setMessage('');
    onClose();
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-indigo-600 p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Announcement' : 'New Announcement'}
        </h3>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-lg bg-purple-900 text-white placeholder-gray-400 mb-4"
          placeholder="Enter your announcement..."
          rows="4"
        />
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
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

const AnnouncementsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [localAnnouncements, setLocalAnnouncements] = useState([
    {
      id: 1,
      instructor: "Dr. Ahmed Mohsen",
      date: "18/9/2024 - 12:00 pm",
      message: "We'll have a quiz on Wednesday, Sep 25th. The quiz will cover Chapters 1 to 5 (included).",
    },
    {
      id: 2,
      instructor: "Dr. Ahmed Mohsen",
      date: "7/9/2024 - 4:00 pm",
      message: "Assignment 1 is published and the due date is September 21st (Monday). The assignment includes only chapter 1 material.",
    },
  ]);

  const isInstructor = true; // Set this to false if the user is a student

  const handleNewAnnouncement = (announcement) => {
    if (editingAnnouncement) {
      setLocalAnnouncements(localAnnouncements.map(ann => 
        ann.id === editingAnnouncement.id ? { ...announcement, id: ann.id } : ann
      ));
      setEditingAnnouncement(null);
    } else {
      setLocalAnnouncements([announcement, ...localAnnouncements]);
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowForm(true);
  };

  const handleDelete = (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setLocalAnnouncements(localAnnouncements.filter(ann => ann.id !== announcementId));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAnnouncement(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white py-12">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Coe202 - Sec 7</h1>
        <hr className="border-t-2 border-white w-auto mx-auto mb-8" />
      </header>

      {isInstructor && !showForm && (
        <div className="w-full max-w-3xl mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Announcement
          </button>
        </div>
      )}

      <div className="w-full max-w-3xl flex-grow bg-gradient-to-b from-purple-900 to-indigo-900 p-6 rounded-xl shadow-lg overflow-y-auto">
        {showForm && (
          <AnnouncementForm
            onSubmit={handleNewAnnouncement}
            onClose={handleCloseForm}
            initialData={editingAnnouncement}
          />
        )}
        {localAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            {...announcement}
            isInstructor={isInstructor}
            onEdit={() => handleEdit(announcement)}
            onDelete={() => handleDelete(announcement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;