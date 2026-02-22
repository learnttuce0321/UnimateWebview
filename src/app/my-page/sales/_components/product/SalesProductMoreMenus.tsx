import { TradeStatus } from 'types/Product';
import DeleteSalesProductMenu from './DeleteSalesProductMenu';
import EditSalesProductMenu from './EditSalesProductMenu';
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
      <EditSalesProductMenu productId={productId} />
      <DeleteSalesProductMenu
        productId={productId}
        tradeStatus={tradeStatus}
        handlePopupClose={handlePopupClose}
      />
    </div>
  );
};

export default SalesProductMoreMenus;
