import { Region } from './Region';

export interface UserUniversity {
  id?: number;
  name?: string;
  domain?: string;
  country?: string;
}

export interface User {
  nickname?: string;
  profileImageKey?: string;
  university: UserUniversity;
  interestRegions: {
    interestRegions: Region[];
  };
}
