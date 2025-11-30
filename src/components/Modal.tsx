import React from "react";
import "../App.css";
import { ModalProps } from "./types";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center">
      <div className="bg-blue-300 p-4 rounded-md shadow-md relative">
        <button
          className="close-button absolute top-2 right-2 cursor-pointer" 
          onClick={onClose}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
