import { format } from 'date-fns';

export interface Message {
  id: string;
  userId: string;
  nickname: string;
  level: number;
  content: string;
  timestamp: Date;
  isImage?: boolean;
  imageUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
    birdId?: string;
  };
}

// Generate timestamps for the last hour
const getRandomTime = (minutesAgo: number) => {
  return new Date(Date.now() - minutesAgo * 60 * 1000);
};

export const mockMessages: Message[] = [
  {
    id: 'm1',
    userId: 'user1',
    nickname: '새덕후',
    level: 12,
    content: '안녕하세요! 오늘 한강 생태공원에 왔는데 청둥오리가 정말 많네요.',
    timestamp: getRandomTime(55)
  },
  {
    id: 'm2',
    userId: 'user3',
    nickname: '탐조전문가',
    level: 18,
    content: '어서오세요! 맞아요, 요즘 철새들이 많이 오는 시기예요.',
    timestamp: getRandomTime(52)
  },
  {
    id: 'm3',
    userId: 'user5',
    nickname: '야생조류',
    level: 8,
    content: '혹시 왜가리는 보셨나요? 저는 아직 못 봤어요',
    timestamp: getRandomTime(45)
  },
  {
    id: 'm4',
    userId: 'user1',
    nickname: '새덕후',
    level: 12,
    content: '방금 남쪽 호수 쪽에서 봤어요! 사진 올려볼게요',
    timestamp: getRandomTime(42)
  },
  {
    id: 'm5',
    userId: 'user1',
    nickname: '새덕후',
    level: 12,
    isImage: true,
    imageUrl: 'https://images.pexels.com/photos/127377/pexels-photo-127377.jpeg',
    content: '왜가리 사진',
    timestamp: getRandomTime(40),
    location: {
      latitude: 37.5326,
      longitude: 126.9212,
      birdId: '5'
    }
  },
  {
    id: 'm6',
    userId: 'user3',
    nickname: '탐조전문가',
    level: 18,
    content: '오 멋진 사진이네요! 위치 공유도 해주셔서 바로 가볼게요.',
    timestamp: getRandomTime(38)
  },
  {
    id: 'm7',
    userId: 'user2',
    nickname: '파랑새',
    level: 5,
    content: '저도 이제 막 도착했어요~ 반가워요 여러분',
    timestamp: getRandomTime(30)
  },
  {
    id: 'm8',
    userId: 'user7',
    nickname: '참새방앗간',
    level: 4,
    content: '오늘은 쌍안경을 가져왔는데, 망원경도 있었으면 좋았을 것 같아요. 누구 망원경 가지고 계신 분 있나요?',
    timestamp: getRandomTime(25)
  },
  {
    id: 'm9',
    userId: 'user5',
    nickname: '야생조류',
    level: 8,
    content: '저는 가져왔어요. 연못 근처 벤치에 있으니 필요하시면 오세요!',
    timestamp: getRandomTime(20)
  },
  {
    id: 'm10',
    userId: 'user2',
    nickname: '파랑새',
    level: 5,
    isImage: true,
    imageUrl: 'https://images.pexels.com/photos/132468/pexels-photo-132468.jpeg',
    content: '청둥오리 사진 찍었어요! AI가 자동으로 인식해주네요 진짜 편하다~',
    timestamp: getRandomTime(15),
    location: {
      latitude: 37.5330,
      longitude: 126.9220,
      birdId: '4'
    }
  },
  {
    id: 'm11',
    userId: 'user3',
    nickname: '탐조전문가',
    level: 18,
    content: '좋은 사진이네요! 청둥오리는 겨울철새인데 아직 많이 남아있어요.',
    timestamp: getRandomTime(12)
  },
  {
    id: 'm12',
    userId: 'guest',
    nickname: '탐조객',
    level: 1,
    content: '안녕하세요! 처음 가입했는데 어떻게 새를 등록하나요?',
    timestamp: getRandomTime(5)
  },
  {
    id: 'm13',
    userId: 'user3',
    nickname: '탐조전문가',
    level: 18,
    content: '환영합니다! 사진을 찍어서 업로드하면 AI가 자동으로 새 종류를 인식해서 도감에 등록해줍니다.',
    timestamp: getRandomTime(3)
  },
];