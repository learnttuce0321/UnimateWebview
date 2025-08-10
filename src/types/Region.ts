/**
 * @description 유저가 선택한 지역정보 타입
 */
export interface Region {
  regionId: string;
  regionName: string;
  isPrimary: boolean;
}

/**
 * @description 관심도시 검색 시, 나오는 지역 정보
 */
export interface SearchedRegion {
  id: string;
  name: string;
  countryCode: string;
  admin1Code: string;
  latitude: number;
  longitude: number;
}

export interface SearchedRegionResponse {
  contents: SearchedRegion;
  hasNext: boolean;
}
