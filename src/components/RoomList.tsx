import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Plus, LogOut, User } from 'lucide-react';
import ChatRoom3D from './ChatRoom3D';

interface Room {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isPrivate: boolean;
}

interface RoomListProps {
  onJoinRoom: (roomId: string, roomName: string) => void;
  currentUser: string;
  onLogout: () => void;
}

const RoomList = ({ onJoinRoom, currentUser, onLogout }: RoomListProps) => {
  const [rooms] = useState<Room[]>([
    {
      id: 'general',
      name: 'General Discussion',
      description: 'Open chat for everyone',
      userCount: 12,
      isPrivate: false
    },
    {
      id: 'tech-talk',
      name: 'Tech Talk',
      description: 'Discussions about technology and programming',
      userCount: 8,
      isPrivate: false
    },
    {
      id: 'random',
      name: 'Random',
      description: 'Random conversations and fun topics',
      userCount: 15,
      isPrivate: false
    },
    {
      id: 'gaming',
      name: 'Gaming',
      description: 'Chat about games and gaming culture',
      userCount: 6,
      isPrivate: false
    }
  ]);

  const [newRoomName, setNewRoomName] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      // In real implementation, this would create a room via API
      console.log('Creating room:', newRoomName);
      onJoinRoom(newRoomName.toLowerCase().replace(/\s+/g, '-'), newRoomName);
      setNewRoomName('');
      setShowCreateRoom(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Header with Logout */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          <span className="text-lg font-semibold text-gray-700">Welcome, {currentUser}!</span>
        </div>
        <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose a Chat Room
        </h1>
        <p className="text-gray-600">
          Select a room to join or create your own
        </p>
      </div>

      {/* Create Room Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plus size={20} />
              Create New Room
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCreateRoom(!showCreateRoom)}
            >
              {showCreateRoom ? 'Cancel' : 'New Room'}
            </Button>
          </div>
        </CardHeader>
        {showCreateRoom && (
          <CardContent className="space-y-3">
            <Input
              placeholder="Enter room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
            />
            <Button onClick={handleCreateRoom} className="w-full">
              Create Room
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Available Rooms with 3D Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map(room => (
          <Card key={room.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle size={18} />
                    {room.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {room.description}
                  </p>
                </div>
                {room.isPrivate && (
                  <Badge variant="secondary">Private</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* 3D Room Preview */}
              <div className="h-24">
                <ChatRoom3D roomName={room.name} messageCount={room.userCount} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users size={14} />
                  <span>{room.userCount} users</span>
                </div>
                <Button 
                  onClick={() => onJoinRoom(room.id, room.name)}
                  size="sm"
                >
                  Join Room
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
