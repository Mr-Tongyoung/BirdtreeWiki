export const mockLocations = [
  {
    id: '1',
    name: '한강 생태공원',
    latitude: 37.5326,
    longitude: 126.9212,
    description: '한강 주변 생태계를 관찰할 수 있는 공원',
    birdsCount: 24,
    usersCount: 12,
    lastActivity: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  {
    id: '2',
    name: '남산 생태원',
    latitude: 37.5511,
    longitude: 126.9882,
    description: '도심 속 새들의 서식지',
    birdsCount: 18,
    usersCount: 8,
    lastActivity: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  },
  {
    id: '3',
    name: '선유도 공원',
    latitude: 37.5377,
    longitude: 126.9032,
    description: '한강 위 섬에 위치한 생태공원',
    birdsCount: 15,
    usersCount: 5,
    lastActivity: new Date(Date.now() - 120 * 60 * 1000) // 2 hours ago
  },
  {
    id: '4',
    name: '월드컵 공원',
    latitude: 37.5712,
    longitude: 126.8974,
    description: '다양한 조류를 관찰할 수 있는 곳',
    birdsCount: 30,
    usersCount: 15,
    lastActivity: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: '5',
    name: '북한산 국립공원',
    latitude: 37.6592,
    longitude: 126.9822,
    description: '산새와 맹금류를 관찰할 수 있는 산림지역',
    birdsCount: 40,
    usersCount: 20,
    lastActivity: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
  }
];