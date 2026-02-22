import { ErrorModalData } from 'components/modal/useModal';
import { ToastType } from 'components/toast';
import { TradeStatus } from 'types/Product';
import DeletePurchasedProductMenu from './DeletePurchasedProductMenu';

interface Props {
  purchaseHistoryId: number;
  closePopup: () => void;
  openModal: (data: ErrorModalData) => void;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const PurchasedProductMoreMenus = ({
  purchaseHistoryId,
  closePopup,
  openModal,
  showToast,
}: Props) => {
  return (
    <div className="flex w-[128px] flex-col rounded-[10px] bg-white py-[8px] text-[14px] leading-[14px] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <DeletePurchasedProductMenu
        purchaseHistoryId={purchaseHistoryId}
        closePopup={closePopup}
        openModal={openModal}
        showToast={showToast}
      />
    </div>
  );
};

export default PurchasedProductMoreMenus;
