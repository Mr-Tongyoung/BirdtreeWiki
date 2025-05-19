import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import { useBirds } from '../contexts/BirdsContext';
import { useUser } from '../contexts/UserContext';

const EncyclopediaPage: React.FC = () => {
  const { myBirds, allBirds, identifyBirdFromImage, addBirdToMyCollection } = useBirds();
  const { user, addExperience } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedBird, setSelectedBird] = useState<null | string>(null);
  
  const filteredBirds = searchTerm
    ? allBirds.filter(bird => 
        bird.koreanName.includes(searchTerm) || 
        bird.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : myBirds.length > 0 ? myBirds : allBirds.slice(0, 4);
  
  const handleUploadImage = async () => {
    setIsUploading(true);
    // In a real app, this would open a file picker and upload an image
    // For our demo, we'll simulate the AI identifying a random bird
    setTimeout(async () => {
      const identified = await identifyBirdFromImage('mock-image-data');
      if (identified) {
        addBirdToMyCollection(identified);
        addExperience(50); // Add XP for finding a new bird
      }
      setIsUploading(false);
    }, 2000);
  };
  
  const experiencePercent = user ? (user.experience / user.nextLevelExp) * 100 : 0;
  
  return (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Level and Experience */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">내 도감</h1>
              <p className="text-gray-600">지금까지 {myBirds.length}종의 새를 관찰했습니다</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Lucide.Award className="h-6 w-6 text-primary mr-2" />
                <div>
                  <div className="text-sm text-gray-600">레벨</div>
                  <div className="font-bold text-xl">{user?.level || 1}</div>
                </div>
              </div>
              
              <div className="w-32">
                <div className="flex justify-between text-xs mb-1">
                  <span>{user?.experience || 0} XP</span>
                  <span>{user?.nextLevelExp || 100} XP</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${experiencePercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Upload Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <Lucide.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="새 이름으로 검색..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className="btn btn-primary flex items-center justify-center"
            onClick={handleUploadImage}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                분석중...
              </>
            ) : (
              <>
                <Lucide.Plus className="h-5 w-5 mr-1" />
                AI로 새 분류하기
              </>
            )}
          </button>
        </div>
        
        {/* Bird Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBirds.map((bird) => (
            <div 
              key={bird.id} 
              className="bird-card cursor-pointer"
              onClick={() => setSelectedBird(bird.id)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={bird.imageUrl} 
                  alt={bird.koreanName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{bird.koreanName}</h3>
                <p className="text-sm text-gray-500 italic">{bird.scientificName}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    {bird.locations.join(', ')}
                  </div>
                  {bird.seenDate && (
                    <div className="text-xs text-gray-500">
                      {new Date(bird.seenDate).toLocaleDateString('ko-KR')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty state if no birds found */}
          {filteredBirds.length === 0 && (
            <div className="col-span-3 py-12 text-center">
              <Lucide.HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">새를 찾을 수 없습니다</h3>
              <p className="text-gray-500">검색어를 변경하거나 AI 분류 기능을 사용해보세요.</p>
            </div>
          )}
        </div>
        
        {/* Bird Details Modal */}
        {selectedBird && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
              {(() => {
                const bird = allBirds.find(b => b.id === selectedBird);
                if (!bird) return null;
                
                return (
                  <>
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={bird.imageUrl} 
                        alt={bird.koreanName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold">{bird.koreanName}</h2>
                          <p className="text-gray-500 italic">{bird.scientificName}</p>
                        </div>
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => setSelectedBird(null)}
                        >
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{bird.description}</p>
                      
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">관찰 장소</h3>
                        <div className="flex flex-wrap gap-2">
                          {bird.locations.map((location, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-primary-light bg-opacity-20 text-primary-dark rounded-full text-sm"
                            >
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {bird.seenDate && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <Lucide.Info className="h-4 w-4 mr-1" />
                          {new Date(bird.seenDate).toLocaleDateString('ko-KR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}에 처음 관찰
                        </div>
                      )}
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            addBirdToMyCollection(bird);
                            setSelectedBird(null);
                          }}
                        >
                          내 도감에 추가
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncyclopediaPage;