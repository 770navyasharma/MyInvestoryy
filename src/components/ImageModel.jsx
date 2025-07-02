// components/ImageModal.js
import React from 'react';

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-zinc-900 p-4 rounded-xs max-w-3xl w-full">
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imageUrl} alt="Preview" className="w-full h-auto rounded-md" />
      </div>
    </div>
  );
};

export default ImageModal;
