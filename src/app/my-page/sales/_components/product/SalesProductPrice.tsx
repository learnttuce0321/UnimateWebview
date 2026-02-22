import PriceCurrency from 'components/price/PriceCurrency';
import { CurrencyType, TradeStatus } from 'types/Product';
import { formatNumber } from 'utils/formatNumber';
import SalesProductTradeStatusTag from './SalesProductTradeStatusTag';

interface Props {
  price: number;
  currencyType: CurrencyType;
  tradeStatus: TradeStatus;
}

const SalesProductPrice = ({ price, currencyType, tradeStatus }: Props) => {
  return (
    <div className="flex gap-[4px]">
      <SalesProductTradeStatusTag tradeStatus={tradeStatus} />
      <p className="height-[18px] text-[18px] font-bold leading-[18px]">
        <span>{formatNumber(price)}</span>
        <PriceCurrency currencyType={currencyType} />
      </p>
    </div>
  );
};

export default SalesProductPrice;
