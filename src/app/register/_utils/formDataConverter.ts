import {
  FormDataType,
  ProductPostCreateRequest,
  CategoryType,
} from 'types/Product';

export const convertFormDataToApiRequest = (
  formData: FormDataType,
  imageKeys: string[]
): ProductPostCreateRequest => {
  console.log('Converting form data:', formData);

  const { priceInfo, tradeInfo } = formData;

  // 기본값 설정
  const category = (formData.category || 'OTHER_GOODS') as CategoryType;
  const price = priceInfo?.isForGiveaway ? 0 : priceInfo?.price || 0;
  const currencyType = (priceInfo?.isDollar ? 'USD' : 'KRW') as 'USD' | 'KRW';
  const tradeType = (tradeInfo?.isRemote ? 'ONLINE' : 'DIRECT') as
    | 'DIRECT'
    | 'ONLINE';
  const tradeTypeDescription = tradeInfo?.tradeLocation || '직거래 가능';

  const result = {
    title: formData.title || '제목 없음',
    imageKeys,
    category,
    price: Number(price), // 명시적으로 숫자 변환
    currencyType,
    description: formData.desc || '설명 없음',
    tradeType,
    tradeTypeDescription,
    regionId: '3651000',
  };

  return result;
};

export const extractFileNamesFromImages = (images: string[]): string[] => {
  return images.map((imagePath) => {
    const fileName = imagePath.split('/').pop() || imagePath;
    return fileName;
  });
};
