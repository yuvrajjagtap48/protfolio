import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Users, Clock, LogOut, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Avatar3D from './Avatar3D';
import ChatRoom3D from './ChatRoom3D';

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  roomId: string;
}

interface ChatRoomProps {
  roomId: string;
  roomName: string;
  username: string;
  onLeaveRoom: () => void;
  onLogout: () => void;
}

const ChatRoom = ({ roomId, roomName, username, onLeaveRoom, onLogout }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [connectedUsers, setConnectedUsers] = useState<string[]>([username]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulate WebSocket connection with demo messages
  useEffect(() => {
    // Add some demo messages
    const demoMessages: Message[] = [
      {
        id: '1',
        username: 'Alice',
        content: 'Welcome to the chat room!',
        timestamp: new Date(Date.now() - 300000),
        roomId
      },
      {
        id: '2',
        username: 'Bob',
        content: 'Hey everyone! How is everyone doing today?',
        timestamp: new Date(Date.now() - 180000),
        roomId
      }
    ];
    setMessages(demoMessages);

    // Simulate other users joining
    setConnectedUsers([username, 'Alice', 'Bob']);

    // Show welcome toast
    toast({
      title: "Joined Room",
      description: `Welcome to ${roomName}!`
    });

    return () => {
      // Cleanup WebSocket connection
    };
  }, [roomId, roomName, username, toast]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Error",
        description: "Message cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      username,
      content: newMessage,
      timestamp: new Date(),
      roomId
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // In real implementation, send via WebSocket
    console.log('Sending message:', message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Basic text formatting
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>');
    
    return { __html: formatted };
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* 3D Room Header */}
      <div className="p-4 border-b bg-white">
        <ChatRoom3D roomName={roomName} messageCount={messages.length} />
      </div>

      {/* Chat Header */}
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onLeaveRoom} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Rooms
          </Button>
          <div>
            <h2 className="text-xl font-bold">{roomName}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              <span>{connectedUsers.length} users online</span>
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>

      {/* Connected Users with 3D Avatars */}
      <div className="p-3 border-b bg-gray-50">
        <div className="flex items-center gap-3 overflow-x-auto">
          {connectedUsers.map(user => (
            <div key={user} className="flex flex-col items-center gap-1 min-w-fit">
              <Avatar3D 
                username={user} 
                isCurrentUser={user === username}
                size={32}
              />
              <Badge variant={user === username ? "default" : "secondary"} className="text-xs">
                {user === username ? "You" : user}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar3D 
                username={message.username} 
                isCurrentUser={message.username === username}
                size={40}
              />
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${
                    message.username === username ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {message.username}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                <div 
                  className="text-gray-800 break-words bg-gray-100 p-3 rounded-lg"
                  dangerouslySetInnerHTML={formatMessage(message.content)}
                />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Use **bold** or *italic*)"
            className="flex-1"
            maxLength={500}
          />
          <Button onClick={sendMessage} size="icon">
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatRoom;
