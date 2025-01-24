export interface IRegisterEmail {
  email: string;
  password: string;
  name: string;
  gender: string;
  sessionToken: string;

  agegroup: string;
  // DB에서 현재 제외된 상태.
  // introduce: 'string'
  preferredTags: string[];
}

export interface IRegisterGoogle {
  userNumber: number;
  gender: string;

  agegroup: string;
  social: "google" | "kakao";
  preferredTags: string[];
}

export interface IRegisterKakao {
  userNumber: number;
  gender: string;
  email: string;
  agegroup: string;
  social: "google" | "kakao";
  preferredTags: string[];
}
