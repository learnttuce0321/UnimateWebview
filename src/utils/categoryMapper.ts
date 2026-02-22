import { categoryData } from 'constants/categoryData';

/**
 * 영어 카테고리 코드를 한글 카테고리명으로 변환
 * @param categoryEN - API에서 받은 영어 카테고리 코드
 * @returns 한글 카테고리명 (매칭되지 않으면 원래 값 반환)
 */
export const getCategoryKoreanName = (categoryEN: string): string => {
  const categoryDataMatch = categoryData.find(
    (data) => data.categoryEN === categoryEN
  );

  return categoryDataMatch?.category || categoryEN;
};
