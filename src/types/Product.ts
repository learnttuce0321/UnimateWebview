export type CurrencyType = 'KRW' | 'USD' | string;

export type TradeStatus = 'FOR_SALE' | 'RESERVED' | 'SOLD_OUT';

interface DefaultProductPost {
  title: string;
  thumbnailUrl: string;
  tradeStatus: TradeStatus;
  universityName: string | null;
  price: number;
  currencyType: CurrencyType;
  likeCount: number;
  chatRoomCount: number;
  isLiked: boolean;
}

export interface ProductPost extends DefaultProductPost {
  id: number;
  createdAt: string;
  regionId: number;
  regionName: string;
}

export interface LikeProduct extends DefaultProductPost {
  id: number;
  createdAt: string;
  regionId: number;
  regionName: string;
}

export interface SalesProduct extends DefaultProductPost {
  id: number;
  createdAt: string;
  regionId: number;
  regionName: string;
  isHidden: boolean;
}

export interface PurchasedProduct extends DefaultProductPost {
  purchaseHistoryId: number;
  productPostId: number;
  hasReview: boolean;
  purchasedAt: string;
}

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

export interface PresignedUrlRequest {
  fileNames: string[];
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  key: string;
}

export interface PresignedUrlListResponse {
  urlList: PresignedUrlResponse[];
}

export type CategoryType =
  | 'ELECTRONICS'
  | 'HOME_APPLIANCES'
  | 'FURNITURE_INTERIOR'
  | 'HOUSEHOLD_KITCHEN'
  | 'WOMENS_CLOTHING'
  | 'WOMENS_ACCESSORIES'
  | 'MENS_FASHION'
  | 'BEAUTY_COSMETICS'
  | 'SPORTS_LEISURE'
  | 'HOBBY_GAME'
  | 'BOOKS_RECORDS'
  | 'TICKETS_VOUCHERS'
  | 'FOOD'
  | 'OTHER_GOODS'
  | 'BUYING';

export interface ProductPostCreateRequest {
  title: string;
  imageKeys: string[];
  category: CategoryType;
  price: number;
  currencyType: 'KRW' | 'USD';
  description: string;
  tradeType: 'DIRECT' | 'ONLINE';
  tradeTypeDescription: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  currencyType: 'KRW' | 'USD';
  category: string;
  tradeStatus: 'FOR_SALE' | 'RESERVED' | 'SOLD_OUT';
  tradeType: string;
  tradeTypeDescription: string;
  createdAt: string;
  imageUrls: string[];
  isLiked: boolean;
  likeCount: number;
  chatRoomCount: number;
  isOwner: boolean;
  sellerId: number;
  sellerNickname: string;
  sellerProfileImageUrl: string;
  regionId: number;
  regionName: string;
  universityId: string;
  universityName: string;
  isHidden?: boolean;
}

export interface TradeProgressResponse {
  buyerId: number;
  buyerNickname: string;
  conversationId: number;
  status: 'RESERVED';
}
