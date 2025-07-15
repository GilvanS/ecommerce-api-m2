import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showModal = useCallback(({ title, message, onConfirm }) => {
    setModalState({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setModalState({
          isOpen: false,
          title: "",
          message: "",
          onConfirm: () => {},
        });
      },
    });
  }, []);

  const hideModal = useCallback(() => {
    setModalState({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  }, []);

  const value = useMemo(
    () => ({
      modalState,
      showModal,
      hideModal,
    }),
    [modalState, showModal, hideModal]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
