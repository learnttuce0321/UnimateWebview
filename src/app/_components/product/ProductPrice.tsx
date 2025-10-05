import PriceCurrency from 'components/price/PriceCurrency';
import { CurrencyType } from 'types/Product';
import { formatNumber } from '../../../utils/formatNumber';

interface Props {
  price: number;
  currencyType: CurrencyType;
}

const ProductPrice = ({ price, currencyType }: Props) => {
  return (
    <p className="height-[18px] text-[18px] font-bold leading-[18px]">
      <span>{formatNumber(price)}</span>
      <PriceCurrency currencyType={currencyType} />
    </p>
  );
};

export default ProductPrice;
