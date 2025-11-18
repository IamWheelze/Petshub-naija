import { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video } from 'lucide-react';

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        online: true,
      },
      lastMessage: 'Is the puppy still available?',
      timestamp: '2m ago',
      unread: 2,
    },
    {
      id: '2',
      user: {
        name: 'Mike Chen',
        avatar: 'https://i.pravatar.cc/150?img=12',
        online: false,
      },
      lastMessage: 'Thank you for the recommendation!',
      timestamp: '1h ago',
      unread: 0,
    },
    {
      id: '3',
      user: {
        name: 'Emily Brown',
        avatar: 'https://i.pravatar.cc/150?img=5',
        online: true,
      },
      lastMessage: 'Can we schedule a visit?',
      timestamp: '3h ago',
      unread: 1,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      text: 'Hi! I saw your Golden Retriever listing.',
      timestamp: '10:30 AM',
      isMine: false,
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Hello! Yes, the puppy is still available.',
      timestamp: '10:32 AM',
      isMine: true,
    },
    {
      id: '3',
      senderId: '1',
      text: 'Great! Can you tell me more about the vaccination status?',
      timestamp: '10:33 AM',
      isMine: false,
    },
    {
      id: '4',
      senderId: 'me',
      text: 'The puppy has received all age-appropriate vaccinations. I can share the vet records.',
      timestamp: '10:35 AM',
      isMine: true,
    },
    {
      id: '5',
      senderId: '1',
      text: 'Is the puppy still available?',
      timestamp: '10:36 AM',
      isMine: false,
    },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    // In real app, send message via API
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full bg-white shadow-lg">
          {/* Conversations List */}
          <div className="lg:col-span-4 border-r h-full overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition ${
                    selectedConversation === conv.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conv.user.avatar}
                      alt={conv.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{conv.user.name}</h3>
                      <span className="text-xs text-gray-500">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-8 h-full flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedConv.user.avatar}
                      alt={selectedConv.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConv.user.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConv.user.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                      <Phone size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                      <Video size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.isMine
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isMine ? 'text-primary-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 input-field"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="btn-primary px-6 flex items-center gap-2"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
