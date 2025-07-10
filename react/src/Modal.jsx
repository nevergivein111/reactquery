import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const ModalContext = createContext();

export const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// 2. Toggle Button
Modal.OpenButton = ({ children }) => {
  const { setIsOpen } = useContext(ModalContext);
  return <button onClick={() => setIsOpen(true)}>{children}</button>;
};

// 3. Modal Container
Modal.Container = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
};

// 4. Subcomponents
Modal.Header = ({ children }) => <h2>{children}</h2>;
Modal.Body = ({ children }) => <p>{children}</p>;
Modal.Footer = ({ children }) => <div>{children}</div>;
