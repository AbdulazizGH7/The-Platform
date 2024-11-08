import React from 'react';
import Button from './Button'; // Import the custom Button component

const Popup = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  onInputChange,
  inputValue,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 text-black w-80">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        {onInputChange && (
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Enter group name"
            className="border p-2 mb-4 w-full rounded"
          />
        )}
        <div className="flex justify-end space-x-4">
          <Button
            title={confirmText || 'Yes'}
            behavior={onConfirm}
            textSize="base"
            px="4"
            py="2"
          />
          <Button
            title={cancelText || 'No'}
            behavior={onCancel}
            textSize="base"
            px="4"
            py="2"
            // Optionally, you can style the cancel button differently
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
