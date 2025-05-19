import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bird, MapPin, Calendar, BarChart2, CloudSun } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useBirds } from '../contexts/BirdsContext';
import { format } from 'date-fns';

type WeatherData = {
  temp: number;
  description: string;
  icon: string;
  locationName: string;
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { nearbyLocations, setCurrentLocation } = useLocation();
  const { recentBirds } = useBirds();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [userWeather, setUserWeather] = useState<WeatherData | null>(null);

  const API_KEY = 'f2cc96534516452ffe1383d7c6509783'; // OpenWeatherMap API 키

  // 핫스팟 기반 날씨
  useEffect(() => {
    const recommended = nearbyLocations[0];
    if (!recommended) return;

    const { latitude, longitude } = recommended;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          locationName: data.name
        });
      })
      .catch(console.error);
  }, [nearbyLocations]);

  // 사용자 위치 기반 날씨
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            setUserWeather({
              temp: data.main.temp,
              description: data.weather[0].description,
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              locationName: data.name
            });
          })
          .catch(console.error);
      },
      (err) => {
        console.warn('사용자 위치 권한 거부됨:', err);
      }
    );
  }, []);

  const handleEnterHotspot = (locationId: string) => {
    const location = nearbyLocations.find(loc => loc.id === locationId);
    if (location) {
      setCurrentLocation(location);
      navigate('/community');
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">새들과 함께하는 특별한 순간</h1>
          <p className="text-lg text-gray-600 mb-8">위치 기반 커뮤니티로 주변의 탐조객들과 소통하며 새로운 발견을 공유하세요</p>

          <button
            className="hotspot-btn animate-pulse"
            onClick={() => handleEnterHotspot(nearbyLocations[0]?.id)}
          >
            핫스팟 커뮤니티 입장하기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="panel animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">주변 핫스팟</h2>
            </div>
            <div className="space-y-4">
              {nearbyLocations.slice(0, 3).map((location) => (
                <div key={location.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => handleEnterHotspot(location.id)}>
                  <div>
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-primary">{location.birdsCount}종 관찰됨</div>
                    <div className="text-xs text-gray-500">현재 {location.usersCount}명 활동중</div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-primary text-sm font-medium hover:underline" onClick={() => navigate('/community')}>
                모든 핫스팟 보기
              </button>
            </div>
          </div>

          <div className="panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-2 mb-4">
              <Bird className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">최근 관찰된 새</h2>
            </div>
            <div className="space-y-4">
              {recentBirds.slice(0, 3).map((bird) => (
                <div key={bird.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => navigate('/encyclopedia')}>
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    <img src={bird.imageUrl} alt={bird.koreanName} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{bird.koreanName}</h3>
                    <p className="text-xs text-gray-500 italic">{bird.scientificName}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-primary text-sm font-medium hover:underline" onClick={() => navigate('/encyclopedia')}>
                모든 관찰 기록 보기
              </button>
            </div>
          </div>
        </div>

        {/* 오늘의 추천 핫스팟 위에 날씨 카드 추가 */}
        {userWeather && (
          <div className="panel mb-8 bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow-md flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img src={userWeather.icon} alt="날씨 아이콘" className="h-16 w-16" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-700 mb-1">
                {userWeather.locationName}의 현재 날씨
              </h2>
              <p className="text-gray-800 text-lg">
                {userWeather.description}, <span className="font-semibold">{userWeather.temp.toFixed(1)}°C</span>
              </p>
            </div>
          </div>
        )}

        {/* 오늘의 추천 핫스팟 */}
        <div className="panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">오늘의 추천 핫스팟</h2>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-primary">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary">{nearbyLocations[0]?.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{nearbyLocations[0]?.description}</p>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-sm flex items-center">
                    <Bird className="h-4 w-4 mr-1 text-primary" />
                    {nearbyLocations[0]?.birdsCount}종
                  </span>
                  <span className="text-sm flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1 text-primary" />
                    활동지수 높음
                  </span>
                </div>
                {weather && (
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <img src={weather.icon} alt="날씨 아이콘" className="h-8 w-8" />
                    <span>{weather.locationName} 날씨:</span>
                    <span>{weather.description}</span>
                    <span>{weather.temp.toFixed(1)}°C</span>
                  </div>
                )}
              </div>
              <button
                className="mt-4 md:mt-0 btn btn-primary"
                onClick={() => handleEnterHotspot(nearbyLocations[0]?.id)}
              >
                바로 입장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomePage;