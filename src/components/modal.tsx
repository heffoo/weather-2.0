import React from "react";

import "./modal.scss";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  error: number;
};

export function Modal({ isOpen, setIsOpen, error }: ModalProps) {
  if (isOpen) {
    return (
      <div className="modal">
        <p className="errorMessage">
          {error === 404 ? "Ошибка 404: Город не найден" : "Неизвестная ошибка"}
        </p>
        <button className="exit-modal-button" onClick={() => setIsOpen(false)}>
          ×
        </button>
        {/* <div className="modal-container">
          {error === 404 ? "Ошибка 404: Город не найден" : "Неизвестная ошибка"}
          <button className="exit-modal-button" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div> */}
      </div>
    );
  }
  return "";
}
