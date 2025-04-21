export interface IUserProfileInfo {
  name: string;
  userRegDate: string; // "2024년 12월"
  preferredTags: string[];
  profileImageUrl: string;
  createdTravelCount: number; // 생성한 여행 수
  participatedTravelCount: number; // 참가한 여행 수
  travelDistance: number; // 여행 거리 (단위: 리)
  visitedCountryCount: number; // 방문한 국가 수
  travelBadgeCount: number; // 획득한 뱃지 수
  recentlyReported: boolean; // 최근(7일) 신고 여부
  totalReportCount: number; // 총 신고 횟수
  recentReportCount: number; // 최근(7일) 신고 횟수
  ageGroup: string;
}

export interface IUserRelatedTravel {
  // 상대방의 만든 여행과 참가한 여행 데이터 타입
  travelNumber: number;
  title: string;
  location: string;
  userNumber: number;
  userName: string;
  tags: string[];
  nowPerson: number;
  maxPerson: number;
  createdAt: string; // "2025-04-15 14:58" 형태, 필요하면 Date로 파싱
  bookmarked: boolean;
}

interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface IUserRelatedTravelList {
  content: IUserRelatedTravel[];
  page: Page;
}
