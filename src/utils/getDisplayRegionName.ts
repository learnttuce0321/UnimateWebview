import { Region, SearchedRegion } from 'types/Region';

const isRegion = (region: Region | SearchedRegion): region is Region => {
  return 'regionName' in region;
};

export const getDisplayRegionName = (
  primaryRegion: Region | SearchedRegion | undefined
) => {
  if (!primaryRegion) return '';

  const regionName = isRegion(primaryRegion)
    ? primaryRegion.regionName
    : primaryRegion.name;

  const parts = [regionName];
  if (primaryRegion.admin1Code) {
    parts.push(primaryRegion.admin1Code);
  }
  return parts.join(', ');
};
