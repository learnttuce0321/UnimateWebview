import { Region } from './Region';

export interface UserUniversity {
  id: number;
  name: string;
  domain: string;
  country: string;
}

interface DefaultUserInfo {
  nickname: string;
  profileImageUrl: string;
  university?: UserUniversity;
  reviewStats: UserReviewStats;
}
export interface MyProfile extends DefaultUserInfo {
  interestRegions: {
    interestRegions: Region[];
  };
  universityEmail?: string;
}

export interface UserReviewStats {
  averageRating: number;
  reviewCount: number;
  isReviewReflected: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MateUser extends DefaultUserInfo {}

export interface BlockedUser {
  userBlockId: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isBlocked: boolean;
}
