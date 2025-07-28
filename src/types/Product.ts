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
