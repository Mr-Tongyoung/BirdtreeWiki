import React from 'react';
import { User, Circle } from 'lucide-react';

interface UserProps {
  id: string;
  nickname: string;
  level: number;
  status: 'online' | 'away' | 'offline';
}

interface UserListProps {
  users: UserProps[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  // Sort users by status (online first, then away, then offline)
  const sortedUsers = [...users].sort((a, b) => {
    const statusOrder = { online: 0, away: 1, offline: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="px-4 py-3 bg-primary text-white">
        <h2 className="font-semibold">접속자 목록</h2>
      </div>
      <div className="p-3 overflow-y-auto h-[calc(100%-3rem)]">
        <div className="space-y-2">
          {sortedUsers.map((user) => (
            <div key={user.id} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
              <div className="relative">
                <div className="h-8 w-8 bg-primary-light rounded-full text-white flex items-center justify-center">
                  {user.nickname.charAt(0)}
                </div>
                <span 
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white ${
                    user.status === 'online' 
                      ? 'bg-green-500' 
                      : user.status === 'away' 
                      ? 'bg-yellow-500' 
                      : 'bg-gray-500'
                  }`}
                />
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium">{user.nickname}</div>
                <div className="flex items-center">
                  <span className="text-xs px-1.5 py-0.5 bg-primary-light text-white rounded-full">
                    Lv.{user.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;