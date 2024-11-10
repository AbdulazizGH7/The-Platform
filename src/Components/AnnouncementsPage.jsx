import React, { useState } from "react";
import { PlusCircle as PlusCircleIcon, X as XIcon, Pencil as PencilIcon, Trash as TrashIcon } from "lucide-react";

const AnnouncementCard = ({ instructor, date, message, onEdit, onDelete, isInstructor }) => (
  <div className="bg-gradient-to-br from-purple-800 to-indigo-700 p-6 rounded-lg shadow-md mb-6 relative">
    {isInstructor && (
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={onEdit}
          className="text-white hover:text-gray-300 transition-colors"
          title="Edit announcement"
        >
          <PencilIcon size={18} />
        </button>
        <button 
          onClick={onDelete}
          className="text-white hover:text-red-300 transition-colors"
          title="Delete announcement"
        >
          <TrashIcon size={18} />
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
      instructor: "Dr. Ahmed Mohsen", // This would normally come from user context
      date: initialData ? initialData.date : formattedDate,
      message: message.trim(),
      id: initialData ? initialData.id : Date.now() // Use existing ID if editing
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
          <XIcon size={20} />
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

  // Assuming we have a way to determine if the user is an instructor
  const isInstructor = true; // This would normally come from authentication/user context

  const handleNewAnnouncement = (announcement) => {
    if (editingAnnouncement) {
      // If editing, update the existing announcement
      setLocalAnnouncements(localAnnouncements.map(ann => 
        ann.id === editingAnnouncement.id ? { ...announcement, id: ann.id } : ann
      ));
      setEditingAnnouncement(null);
    } else {
      // If new announcement, add to the beginning of the list
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
      {/* Header */}
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Coe202 - Sec 7</h1>
        <hr className="border-t-2 border-white w-auto mx-auto mb-8" />
      </header>

      {/* Add Announcement Button for Instructors */}
      {isInstructor && !showForm && (
        <div className="w-full max-w-3xl mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition duration-200"
          >
            <PlusCircleIcon size={20} />
            Add Announcement
          </button>
        </div>
      )}

      {/* Announcements Container */}
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