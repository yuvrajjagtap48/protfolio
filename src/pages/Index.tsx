
import { useState } from 'react';
import UserAuth from '@/components/UserAuth';
import RoomList from '@/components/RoomList';
import ChatRoom from '@/components/ChatRoom';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<{id: string, name: string} | null>(null);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRoom(null);
  };

  const handleJoinRoom = (roomId: string, roomName: string) => {
    setCurrentRoom({ id: roomId, name: roomName });
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
  };

  // If user is not logged in, show authentication
  if (!currentUser) {
    return <UserAuth onLogin={handleLogin} />;
  }

  // If user is logged in but no room selected, show room list
  if (!currentRoom) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <RoomList onJoinRoom={handleJoinRoom} currentUser={currentUser} onLogout={handleLogout} />
        </div>
      </div>
    );
  }

  // If user is in a room, show chat interface
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full max-w-6xl mx-auto bg-white shadow-lg">
        <ChatRoom
          roomId={currentRoom.id}
          roomName={currentRoom.name}
          username={currentUser}
          onLeaveRoom={handleLeaveRoom}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Index;
