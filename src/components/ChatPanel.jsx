import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';

const ChatPanel = ({ messages, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h3>Чат поездки</h3>
        <p className="chat-subtitle">Обсуждайте маршрут с участниками</p>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Написать сообщение..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button 
          type="submit" 
          className="chat-send-btn"
          disabled={!messageText.trim()}
          aria-label="Отправить сообщение"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
