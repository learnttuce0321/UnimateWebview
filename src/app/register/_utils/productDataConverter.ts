import { ProductDetail } from 'types/Product';
import { FormDataType } from '../_type/registerType';

export const convertProductDetailToFormData = (
  productDetail: ProductDetail
): FormDataType => {
  return {
    images: productDetail.imageUrls,
    title: productDetail.title,
    category: productDetail.category,
    priceInfo: {
      price: productDetail.price,
      isDollar: productDetail.currencyType === 'USD',
      isForGiveaway: productDetail.price === 0,
    },
    desc: productDetail.description,
    tradeInfo: {
      isRemote: productDetail.tradeType === 'ONLINE',
      tradeLocation: productDetail.tradeTypeDescription,
    },
  };
};
