import PriceCurrency from 'components/price/PriceCurrency';
import { CurrencyType } from 'types/Product';
import { formatNumber } from 'utils/formatNumber';

interface Props {
  price: number;
  currencyType: CurrencyType;
}

const WishlistProductPrice = ({ price, currencyType }: Props) => {
  return (
    <p className="text-[18px] font-bold leading-[18px] text-blue_gray-900">
      <span>{formatNumber(price)}</span>
      <PriceCurrency currencyType={currencyType} />
    </p>
  );
};

export default WishlistProductPrice;
