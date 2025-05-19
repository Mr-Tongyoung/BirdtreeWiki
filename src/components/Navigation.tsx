import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bird, User, Map, BookOpen } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Navigation: React.FC = () => {
  const { user } = useUser();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Bird className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">새들닷컴</span>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-item-active' : 'nav-item'}
            >
              홈
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => isActive ? 'nav-item-active' : 'nav-item'}
            >
              커뮤니티
            </NavLink>
            <NavLink 
              to="/encyclopedia" 
              className={({ isActive }) => isActive ? 'nav-item-active' : 'nav-item'}
            >
              도감
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? 'nav-item-active' : 'nav-item'}
            >
              프로필
            </NavLink>
          </nav>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary-light rounded-full text-white flex items-center justify-center">
                {user?.nickname.charAt(0) || '게'}
              </div>
              <span className="text-sm font-medium">{user?.nickname || '게스트'}</span>
              <span className="text-xs px-2 py-1 bg-primary-light text-white rounded-full">
                Lv.{user?.level || 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;