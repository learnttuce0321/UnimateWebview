import { TradeStatus } from 'types/Product';
import DeleteSalesProductMenu from './DeleteSalesProductMenu';
import HideSalesProductMenu from './HideSalesProductMenu';

interface Props {
  productId: number;
  isHidden: boolean;
  tradeStatus: TradeStatus;
  handlePopupClose: () => void;
}

const SalesProductMoreMenus = ({
  productId,
  isHidden,
  tradeStatus,
  handlePopupClose,
}: Props) => {
  return (
    <div className="flex w-[128px] flex-col rounded-[10px] bg-white py-[8px] text-[14px] leading-[14px] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <HideSalesProductMenu
        productId={productId}
        isHidden={isHidden}
        tradeStatus={tradeStatus}
        handlePopupClose={handlePopupClose}
      />
      <p className="flex h-[30px] w-full items-center px-[16px] text-blue_gray-600">
        수정하기
      </p>
      <DeleteSalesProductMenu productId={productId} tradeStatus={tradeStatus} />
    </div>
  );
};

export default SalesProductMoreMenus;
