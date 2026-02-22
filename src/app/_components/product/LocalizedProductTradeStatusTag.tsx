import { TradeStatus } from 'types/Product';

interface Props {
  tradeStatus: TradeStatus;
}

interface TagConfig {
  tagTitle: string;
  tagBackgroundColor: string;
}

type ConfigTradeStatus = Extract<TradeStatus, 'RESERVED' | 'SOLD_OUT'>;

const TAG_CONFIG_BY_TRADE_STATUS: Record<ConfigTradeStatus, TagConfig> = {
  RESERVED: {
    tagTitle: '예약중',
    tagBackgroundColor: 'bg-orange-400',
  },
  SOLD_OUT: {
    tagTitle: '거래완료',
    tagBackgroundColor: 'bg-blue_gray-500',
  },
} as const;

const LocalizedProductTradeStatusTag = ({ tradeStatus }: Props) => {
  const tagConfig =
    TAG_CONFIG_BY_TRADE_STATUS[tradeStatus as ConfigTradeStatus];

  if (!tagConfig) {
    return null;
  }

  const { tagTitle, tagBackgroundColor } = tagConfig;

  return (
    <span
      className={`flex items-center justify-center rounded-sm px-[4px] text-[10px] font-semibold leading-[15px] text-white ${tagBackgroundColor}`}
    >
      {tagTitle}
    </span>
  );
};
export default LocalizedProductTradeStatusTag;
