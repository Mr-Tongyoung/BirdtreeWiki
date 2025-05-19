import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, User, MapPin } from 'lucide-react';
import { Message, mockMessages } from '../data/mockMessages';
import { useUser } from '../contexts/UserContext';
import { useLocation } from '../contexts/LocationContext';
import { mockUsers } from '../data/mockUsers';
import BirdMap from '../components/community/BirdMap';
import UserList from '../components/community/UserList';
import ChatMessage from '../components/community/ChatMessage';

const CommunityPage: React.FC = () => {
  const { user } = useUser();
  const { currentLocation } = useLocation();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [messageInput, setMessageInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '' && !selectedImage) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      userId: user?.id || 'guest',
      nickname: user?.nickname || '게스트',
      level: user?.level || 1,
      content: messageInput,
      timestamp: new Date(),
      ...(selectedImage && {
        isImage: true,
        imageUrl: selectedImage,
      }),
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    setSelectedImage(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload the file to a server
      // For now, we'll use a mock URL from our existing birds
      const localImageUrl = URL.createObjectURL(file); // ✅ 브라우저에서 이미지 URL 생성
      setSelectedImage(localImageUrl);
    }
  };

  const openFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] py-4">
      {/* Left Panel - User List */}
      <div className="hidden lg:block w-64 mr-4">
        <UserList users={mockUsers} />
      </div>

      {/* Center Panel - Chat */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-primary text-white flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <div>
              <h2 className="font-semibold">{currentLocation?.name || '한강 생태공원'}</h2>
              <p className="text-xs opacity-80">현재 {mockUsers.filter(u => u.status === 'online').length}명 접속중</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwnMessage={message.userId === user?.id} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="p-2 bg-gray-100 border-t border-gray-200">
            <div className="relative inline-block">
              <img 
                src={selectedImage} 
                alt="업로드 이미지" 
                className="h-20 rounded-md object-cover" 
              />
              <button 
                className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 text-xs"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="px-4 py-3 bg-white border-t border-gray-200 flex items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <button 
            className="p-2 text-gray-500 hover:text-primary"
            onClick={openFileSelect}
          >
            <Image className="h-5 w-5" />
          </button>
          <input
            type="text"
            className="flex-1 input-field mx-2"
            placeholder="메시지를 입력하세요..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            className="p-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-colors"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="hidden md:block w-80 ml-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="px-4 py-3 bg-primary text-white">
            <h2 className="font-semibold">관찰 지도</h2>
          </div>
          <div className="h-[calc(100%-3rem)]">
            <BirdMap messages={messages.filter(m => m.location)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;