export type FilterType =
  | 'university'
  | 'price'
  | 'category'
  | 'latest'
  | 'excludeSold';

export const FilterTypeLabel: Record<FilterType, string> = {
  university: '대학교',
  price: '가격',
  category: '카테고리',
  latest: '최신순',
  excludeSold: '거래완료 제외',
};
