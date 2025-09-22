import { AppStore } from './createAppStore';

/**
 * @description 기본 관심 지역을 가져오는 selector
 */
export const selectPrimaryRegion = (state: AppStore) =>
  state.userProfile.interestRegions.interestRegions?.find(
    (region) => region.isPrimary
  );

/**
 * @description 관심 지역들을 가져오는 selector
 */
export const selectInterestRegions = (state: AppStore) =>
  state.userProfile.interestRegions.interestRegions;
