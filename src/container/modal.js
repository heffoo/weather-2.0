import React from "react";

import "./modal.scss";

export function Modal({ isOpen, setIsOpen, error }) {
  if (isOpen) {
    return (
      <div className="modal">
        <div className="modal-container">
          {error === 404 ? "Ошибка 404: Город не найден" : "Неизвестная ошибка"}
          <button className="exit-modal-button" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>
      </div>
    );
  }
  return "";
}
