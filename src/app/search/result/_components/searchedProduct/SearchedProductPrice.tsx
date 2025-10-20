import PriceCurrency from 'components/price/PriceCurrency';
import { CurrencyType, TradeStatus } from 'types/Product';
import { formatNumber } from 'utils/formatNumber';
import SearchedProductTradeStatusTag from './SearchedProductTradeStatusTag';

interface Props {
  price: number;
  currencyType: CurrencyType;
  tradeStatus: TradeStatus;
}

const SearchedProductPrice = ({ price, currencyType, tradeStatus }: Props) => {
  return (
    <p className="height-[18px] text-[18px] font-bold leading-[18px]">
      <SearchedProductTradeStatusTag tradeStatus={tradeStatus} />
      <span>{formatNumber(price)}</span>
      <PriceCurrency currencyType={currencyType} />
    </p>
  );
};

export default SearchedProductPrice;
