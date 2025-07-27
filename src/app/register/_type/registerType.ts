export interface PriceType {
  price: number; // 가격
  isDollar: boolean; // 달러 표기 여부
  isForGiveaway: boolean; // 나눔 여부
}

export interface TradeInfo {
  isRemote: boolean; // 직거래(false) vs 비대면(true)
  tradeLocation: string; // 거래 희망 장소
}

export interface FormDataType {
  images: string[]; // 이미지 경로 배열(수정 예정)
  title: string; // 글 제목
  category: string; // 카테고리명
  priceInfo: PriceType;
  desc: string; // 상세 설명
  tradeInfo: TradeInfo;
}

export interface ProductPost {
  id: number;
  title: string;
  createdAt: string;
  universityName: string;
  thumbnailUrl: string;
  price: number;
  currencyType: 'KRW' | 'USD' | string;
  likeCount: number;
  chatRoomCount: number;
  regionId: string;
  regionName: string;
  tradeStatus: 'FOR_SALE' | 'RESERVED' | 'SOLD_OUT' | string;
}

export interface ProductPostsResponse {
  contents: ProductPost[];
  hasNext: boolean;
}
