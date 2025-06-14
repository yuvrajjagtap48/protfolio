
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserAuthProps {
  onLogin: (username: string) => void;
}

const UserAuth = ({ onLogin }: UserAuthProps) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate taken usernames for demo
  const takenUsernames = ['admin', 'moderator', 'alice', 'bob'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive"
      });
      return;
    }

    if (username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters long",
        variant: "destructive"
      });
      return;
    }

    if (takenUsernames.includes(username.toLowerCase())) {
      toast({
        title: "Error",
        description: "This username is already taken. Please choose another one.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin(username);
      toast({
        title: "Welcome!",
        description: `Logged in as ${username}`
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Join ChatRoom</CardTitle>
          <p className="text-gray-600">
            Enter your username to start chatting
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Username must be 3-20 characters long
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join Chat'}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Chat Features:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Real-time messaging</li>
              <li>• Multiple chat rooms</li>
              <li>• Message formatting (**bold**, *italic*)</li>
              <li>• User presence indicators</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAuth;
