import React, {useState} from 'react';
import {NotificationContextType, Message} from '../types/contextTypes';

export const NotificationContext = React.createContext<NotificationContextType>(
  {
    messages: [],
    setMessages: () => {},
  },
);

export const NotificationProvider = ({children}: any) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <NotificationContext.Provider
      value={{
        messages,
        setMessages,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
