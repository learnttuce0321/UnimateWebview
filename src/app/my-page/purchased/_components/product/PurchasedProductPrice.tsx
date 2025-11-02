import PriceCurrency from 'components/price/PriceCurrency';
import { CurrencyType } from 'types/Product';
import { formatNumber } from 'utils/formatNumber';
import PurchasedProductTradeStatusTag from './PurchasedProductTradeStatusTag';

interface Props {
  price: number;
  currencyType: CurrencyType;
}

const PurchasedProductPrice = ({ price, currencyType }: Props) => {
  return (
    <div className="flex gap-[4px]">
      <p className="text-[18px] font-bold leading-[18px] text-blue_gray-900">
        <PurchasedProductTradeStatusTag />
        <span>{formatNumber(price)}</span>
        <PriceCurrency currencyType={currencyType} />
      </p>
    </div>
  );
};

export default PurchasedProductPrice;
