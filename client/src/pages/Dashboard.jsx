import { useAuthStore } from '../store/authstore';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center py-12">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.avatar || ''} />
            <AvatarFallback>
              {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.username || user?.email}!</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <Button
            variant="outline"
            className="ml-auto"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Your Plan</h3>
              <p className="text-gray-700">{user?.plan || 'Free'}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Profile Title</h3>
              <p className="text-gray-700">{user?.title || 'Not set'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;