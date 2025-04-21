export interface ImyPage {
  email: string;
  name: string;
  gender: string;
  ageGroup: string;
  proIntroduce: string;
  userSocialTF: boolean;
  preferredTags: string[];
  userRegDate: string;
  travelDistance: number;
  visitedCountryCount: number;
  travelBadgeCount: number;
}

export interface IProfileImg {
  imageNumber: number;
  relatedType: string;
  relatedNumber: number;
  key: string;
  uploadDate: string;
  url: string;
}
export interface NewPasswordProps {
  newPassword: string;
  newPasswordConfirm: string;
}
