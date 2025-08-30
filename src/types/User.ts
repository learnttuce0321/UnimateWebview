import { Region } from './Region';

export interface University {
  id?: number;
  name?: string;
  domain?: string;
  country?: string;
}

export interface User {
  nickname?: string;
  profileImageKey?: string;
  university: University;
  interestRegions: {
    interestRegions: Region[];
  };
}
