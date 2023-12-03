import { createContext, useState } from 'react';
import Toast from '../components/toast/Toast';
import ToastContainer from '../components/toast/toast-container/ToastContainer';

interface Notification {
  type: 'error' | 'info' | 'success' | 'warning';
  message: string;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (notif: Notification) => void;
  removeNotification: (notifIndex: number) => void;
}

const emptyNotifications: NotificationContextProps = {
  notifications: [],
  addNotification: (_notif: Notification) => undefined,
  removeNotification: (_notifIndex: number) => undefined,
};

const NotificationContext: React.Context<NotificationContextProps> =
  createContext(emptyNotifications);

interface NotificationContextProviderProps {
  children: any;
}

function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(
    emptyNotifications.notifications
  );

  const addNotification = (notif: Notification) => {
    setNotifications((notifications) => [...notifications, notif]);
  };

  const removeNotification = (notifIndex: number) => {
    setNotifications((notifications) =>
      notifications.filter((_notif, index) => index !== notifIndex)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      <ToastContainer>
        {notifications.map((notif, index) => (
          <Toast
            key={index}
            index={index}
            message={notif.message}
            type={notif.type}
            onRemove={removeNotification}
          />
        ))}
      </ToastContainer>
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContext, emptyNotifications };
export default NotificationContextProvider;
