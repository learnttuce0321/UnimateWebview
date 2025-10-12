import PriceCurrency from 'components/price/PriceCurrency';
import { CurrencyType, TradeStatus } from 'types/Product';
import { formatNumber } from 'utils/formatNumber';
import MateSalesProductTradeStatusTag from './MateSalesProductTradeStatusTag';

interface Props {
  price: number;
  currencyType: CurrencyType;
  tradeStatus: TradeStatus;
}

const MateSalesProductPrice = ({ price, currencyType, tradeStatus }: Props) => {
  return (
    <div className="flex gap-[4px]">
      <MateSalesProductTradeStatusTag tradeStatus={tradeStatus} />
      <p className="height-[18px] text-[18px] font-bold leading-[18px]">
        <span>{formatNumber(price)}</span>
        <PriceCurrency currencyType={currencyType} />
      </p>
    </div>
  );
};

export default MateSalesProductPrice;
