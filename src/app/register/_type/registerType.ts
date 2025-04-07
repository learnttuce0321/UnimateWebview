export interface PriceType {
  price: number; // 가격
  isDollar: boolean; // 달러 표기 여부
  isForGiveaway: boolean; // 나눔 여부
}

export interface FormDataType {
  images: string[]; // 이미지 경로 배열(수정 예정)
  title: string; // 글 제목
  category: string; // 카테고리명
  priceInfo: PriceType;
  desc: string; // 상세 설명
  isRemote: boolean; // 직거래(false) vs 비대면(true)
  tradeLocation: string; // 거래 희망 장소
}
