import { TradeStatus } from 'types/Product';
import { TradeStatusRadioConfig } from './SellListFilterBottomSheetButton';

interface Props {
  filterKey: TradeStatus;
  tradeFilterStatus: TradeStatus;
  filterLabel: (typeof TradeStatusRadioConfig)[keyof typeof TradeStatusRadioConfig];
  onClick: (filterKey: TradeStatus) => void;
}

const SellListFilterItem = ({
  filterKey,
  filterLabel,
  tradeFilterStatus,
  onClick,
}: Props) => {
  return (
    <li>
      <button
        className="flex items-center gap-[8px]"
        onClick={() => {
          onClick(filterKey);
        }}
      >
        <img
          src={
            tradeFilterStatus === filterKey
              ? '/images/svg/my-page/icon-toggle-radio.svg'
              : '/images/svg/my-page/icon-toggle-radio-none.svg'
          }
          className="h-[20px] w-[20px] rounded-full"
          width={20}
          height={20}
          alt="label"
        />
        <span>{filterLabel}</span>
      </button>
    </li>
  );
};

export default SellListFilterItem;
