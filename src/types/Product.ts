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
  regionId: string;
  regionName: string;
  universityId: string;
  universityName: string;
}
