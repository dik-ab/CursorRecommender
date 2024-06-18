import { useState } from 'react';
import { Message } from '../types/message';
import { searchVideos } from '../services/searchVideos';

const useSearchVideos = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (messageText: string) => {
    const newMessage: Message = { text: messageText, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      const response = await searchVideos(messageText);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const botMessage: Message = { text: data.message, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return {
    messages,
    sendMessage,
  };
};

export default useSearchVideos;
