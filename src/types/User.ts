import { Region } from './Region';

export interface UserUniversity {
  id?: number;
  name?: string;
  domain?: string;
  country?: string;
}

interface DefaultUserInfo {
  nickname: string;
  profileImageUrl: string;
  university: UserUniversity;
}
export interface MyProfile extends DefaultUserInfo {
  interestRegions: {
    interestRegions: Region[];
  };
}

export interface UserReviewStats {
  averageRating: number;
  reviewCount: number;
  isReviewReflected: boolean;
}

export interface MateUser extends DefaultUserInfo {
  reviewStats: UserReviewStats;
}
