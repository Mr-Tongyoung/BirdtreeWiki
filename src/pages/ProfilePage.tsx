import React, { useState } from 'react';
import { User, MapPin, BookOpen, Settings, LogOut, Camera } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useBirds } from '../contexts/BirdsContext';

const ProfilePage: React.FC = () => {
  const { user, updateNickname } = useUser();
  const { myBirds } = useBirds();
  const [tempNickname, setTempNickname] = useState(user?.nickname || '');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [locationRange, setLocationRange] = useState(1000); // meters
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  
  const handleSaveNickname = () => {
    if (tempNickname.trim()) {
      updateNickname(tempNickname.trim());
      setIsEditingNickname(false);
    }
  };
  
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - User Profile */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary h-24 relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="h-24 w-24 rounded-full bg-white p-1">
                    <div className="h-full w-full rounded-full bg-primary-light flex items-center justify-center text-white text-3xl font-bold">
                      {user?.nickname.charAt(0) || '게'}
                    </div>
                    <button className="absolute right-0 bottom-0 bg-white p-1 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-6 px-6">
                <div className="text-center mb-6">
                  {isEditingNickname ? (
                    <div className="flex items-center justify-center space-x-2">
                      <input 
                        type="text" 
                        value={tempNickname}
                        onChange={(e) => setTempNickname(e.target.value)}
                        className="input-field text-center"
                      />
                      <button 
                        className="btn btn-primary text-sm py-1"
                        onClick={handleSaveNickname}
                      >
                        저장
                      </button>
                    </div>
                  ) : (
                    <h2 className="text-xl font-bold flex items-center justify-center">
                      {user?.nickname || '게스트'}
                      <button 
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setIsEditingNickname(true)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </h2>
                  )}
                  <div className="text-sm text-gray-500 mt-1">가입일: {user?.joinedDate.toLocaleDateString('ko-KR')}</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-light bg-opacity-20 rounded-md mr-3">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <span>레벨</span>
                    </div>
                    <span className="font-semibold">{user?.level || 1}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-light bg-opacity-20 rounded-md mr-3">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span>방문 장소</span>
                    </div>
                    <span className="font-semibold">{user?.spotsVisited || 0}곳</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-light bg-opacity-20 rounded-md mr-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <span>관찰한 새</span>
                    </div>
                    <span className="font-semibold">{myBirds.length}종</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Settings */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">설정</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">위치 설정</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">위치 공유 범위</label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="100"
                          max="5000"
                          step="100"
                          value={locationRange}
                          onChange={(e) => setLocationRange(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-3 text-sm font-medium w-16">{locationRange}m</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        이 범위 내의 사용자들과 위치를 공유합니다.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">GPS 정확도</div>
                        <p className="text-xs text-gray-500">위치 정보의 정확도를 설정합니다.</p>
                      </div>
                      <select className="input-field w-32">
                        <option>높음</option>
                        <option>중간</option>
                        <option>낮음</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-5">
                  <h3 className="text-lg font-medium mb-3">도감 설정</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">오늘 기록 자동 저장</div>
                        <p className="text-xs text-gray-500">
                          하루 활동이 끝날 때 자동으로 기록을 저장합니다.
                        </p>
                      </div>
                      <button 
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${autoSaveEnabled ? 'bg-primary' : 'bg-gray-300'}`}
                        onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                      >
                        <span className="sr-only">자동 저장 설정</span>
                        <span 
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">기본 언어</div>
                        <p className="text-xs text-gray-500">
                          새 이름과 설명의 기본 언어를 설정합니다.
                        </p>
                      </div>
                      <select className="input-field w-32">
                        <option>한국어</option>
                        <option>영어</option>
                        <option>일본어</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-5">
                  <h3 className="text-lg font-medium mb-3">계정</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">알림 설정</div>
                        <p className="text-xs text-gray-500">
                          새로운 발견과 메시지에 대한 알림을 설정합니다.
                        </p>
                      </div>
                      <select className="input-field w-32">
                        <option>모두</option>
                        <option>중요한 것만</option>
                        <option>없음</option>
                      </select>
                    </div>
                    
                    <div className="pt-4">
                      <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm font-medium">
                        <LogOut className="h-4 w-4" />
                        <span>로그아웃</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;