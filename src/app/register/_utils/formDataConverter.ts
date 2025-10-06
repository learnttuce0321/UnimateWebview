import {
  FormDataType,
  ProductPostCreateRequest,
  CategoryType,
} from 'types/Product';

export const convertFormDataToApiRequest = (
  formData: FormDataType,
  imageKeys: string[]
): ProductPostCreateRequest => {
  const { priceInfo, tradeInfo } = formData;

  // 기본값 설정
  const category = (formData.category || 'OTHER_GOODS') as CategoryType;
  const rawPrice = priceInfo?.isForGiveaway ? 0 : (priceInfo?.price ?? 0);
  const price =
    typeof rawPrice === 'number'
      ? rawPrice
      : Number(String(rawPrice).replace(/[^0-9]/g, '')) || 0;

  const currencyType = (priceInfo?.isDollar ? 'USD' : 'KRW') as 'USD' | 'KRW';
  const tradeType = (tradeInfo?.isRemote ? 'ONLINE' : 'DIRECT') as
    | 'DIRECT'
    | 'ONLINE';
  const tradeTypeDescription = tradeInfo?.tradeLocation || '직거래 가능';

  const result = {
    title: formData.title || '제목 없음',
    imageKeys,
    category,
    price,
    currencyType,
    description: formData.desc || '설명 없음',
    tradeType,
    tradeTypeDescription,
  };

  return result;
};

export const extractFileNamesFromImages = (images: string[]): string[] => {
  return images.map((imagePath) => {
    const fileName = imagePath.split('/').pop() || imagePath;
    return fileName;
  });
};
