export interface Region {
  regionId: string;
  regionName: string;
  isPrimary: boolean;
}

export type UserInterestRegions = Region[];
