export type categoryTestDataType = {
  category: string;
  serverCategory: string;
  totalCount: number;
};

export const categoryTestData: categoryTestDataType[] = [
  { category: '전자제품', serverCategory: 'ELECTRONICS', totalCount: 100 },
  { category: '가전제품', serverCategory: 'HOME_APPLIANCES', totalCount: 100 },
  {
    category: '가구/인테리어',
    serverCategory: 'FURNITURE_INTERIOR',
    totalCount: 100,
  },
  {
    category: '생활/주방',
    serverCategory: 'HOUSEHOLD_KITCHEN',
    totalCount: 100,
  },
  { category: '여성의류', serverCategory: 'WOMENS_CLOTHING', totalCount: 100 },
  {
    category: '여성잡화',
    serverCategory: 'WOMENS_ACCESSORIES',
    totalCount: 100,
  },
  { category: '남성패션', serverCategory: 'MENS_FASHION', totalCount: 100 },
  {
    category: '뷰티/미용',
    serverCategory: 'BEAUTY_COSMETICS',
    totalCount: 100,
  },
  {
    category: '스포츠/레저',
    serverCategory: 'SPORTS_LEISURE',
    totalCount: 100,
  },
  { category: '취미/게임', serverCategory: 'HOBBY_GAME', totalCount: 100 },
  { category: '도서/음반', serverCategory: 'BOOKS_RECORDS', totalCount: 100 },
  {
    category: '티켓/교환권',
    serverCategory: 'TICKETS_VOUCHERS',
    totalCount: 100,
  },
  { category: '식품', serverCategory: 'FOOD', totalCount: 100 },
  { category: '기타 중고물품', serverCategory: 'OTHER_GOODS', totalCount: 100 },
  { category: '삽니다', serverCategory: 'BUYING', totalCount: 100 },
];
