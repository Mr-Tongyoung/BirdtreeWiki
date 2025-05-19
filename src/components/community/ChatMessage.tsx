import React from 'react';
import { Message } from '../../data/mockMessages';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%]`}>
        {/* Username and level for other users */}
        {!isOwnMessage && (
          <div className="flex items-center mb-1">
            <div className="h-6 w-6 bg-primary-light rounded-full text-white flex items-center justify-center text-xs">
              {message.nickname.charAt(0)}
            </div>
            <span className="text-sm font-medium ml-1">{message.nickname}</span>
            <span className="text-xs px-1.5 py-0.5 bg-primary-light text-white rounded-full ml-1">
              Lv.{message.level}
            </span>
          </div>
        )}

        {/* Message body */}
        <div className={`message-bubble ${isOwnMessage ? 'message-mine' : 'message-other'}`}>
          {message.isImage && (
            <div className="mb-2">
              <img
                src={message.imageUrl}
                alt="공유 이미지"
                className="rounded-lg max-h-60 w-auto"
              />
            </div>
          )}
          <p className="text-sm">{message.content}</p>
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {format(message.timestamp, 'a h:mm')}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;