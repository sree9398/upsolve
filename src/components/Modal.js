import React from 'react';

const Modal = ({ blog, onClose }) => {
  if (!blog) return null; // Do not render the modal if no blog is selected

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p>{blog.content}</p>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
