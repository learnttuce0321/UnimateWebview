export type categoryDataType = {
  category: string;
  totalCount: number;
  categoryEN: string;
};

export const categoryData: categoryDataType[] = [
  { category: '전자기기', totalCount: 100, categoryEN: 'ELECTRONICS' },
  { category: '가전제품', totalCount: 100, categoryEN: 'HOME_APPLIANCES' },
  {
    category: '가구/인테리어',
    totalCount: 100,
    categoryEN: 'FURNITURE_INTERIOR',
  },
  { category: '생활/주방', totalCount: 100, categoryEN: 'HOUSEHOLD_KITCHEN' },
  { category: '여성의류', totalCount: 100, categoryEN: 'WOMENS_CLOTHING' },
  { category: '여성잡화', totalCount: 100, categoryEN: 'WOMENS_ACCESSORIES' },
  { category: '남성의류/잡화', totalCount: 100, categoryEN: 'MENS_FASHION' },
  { category: '뷰티/미용', totalCount: 100, categoryEN: 'BEAUTY_COSMETICS' },
  { category: '스포츠/레저', totalCount: 100, categoryEN: 'SPORTS_LEISURE' },
  { category: '취미/게임', totalCount: 100, categoryEN: 'HOBBY_GAME' },
  { category: '도서/음반', totalCount: 100, categoryEN: 'BOOKS_RECORDS' },
  { category: '티켓/교환권', totalCount: 100, categoryEN: 'TICKETS_VOUCHERS' },
  { category: '식품', totalCount: 100, categoryEN: 'FOOD' },
  { category: '기타 중고물품', totalCount: 100, categoryEN: 'OTHER_GOODS' },
  { category: '삽니다', totalCount: 100, categoryEN: 'BUYING' },
];
