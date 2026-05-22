import React from 'react';
import { formatTime } from '../utils/dateUtils';

const ChatMessage = ({ message }) => {
  const { author, text, timestamp, isSystem } = message;

  if (isSystem) {
    return (
      <div className="chat-message chat-message-system">
        <p className="chat-message-text">{text}</p>
        <span className="chat-message-time">{formatTime(timestamp)}</span>
      </div>
    );
  }

  return (
    <div className="chat-message">
      <div className="chat-message-header">
        <span className="chat-message-author">{author}</span>
        <span className="chat-message-time">{formatTime(timestamp)}</span>
      </div>
      <p className="chat-message-text">{text}</p>
    </div>
  );
};

export default ChatMessage;
