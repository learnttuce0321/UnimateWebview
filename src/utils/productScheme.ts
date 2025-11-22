import deviceInfoStore from 'stores/vanillaStore.deviceInfo';

export type TradeStatus = 'FOR_SALE' | 'RESERVED' | 'COMPLETED';

interface ChangeTradeStatusParams {
  productId: number;
  currentStatus: TradeStatus;
  buyerId?: number; // RESERVED 상태일 때 필요
  conversationId?: number; // RESERVED 상태일 때 필요
}

const productScheme = () => {
  const isWebview = deviceInfoStore.getState().deviceInfo.isWebView;

  return {
    changeTradeStatus: (params: ChangeTradeStatusParams) => {
      if (!isWebview) return;

      const { productId, currentStatus, buyerId, conversationId } = params;

      // 기본 URL 파라미터
      let schemeUrl = `unimate://changeTradeStatus?productId=${productId}`;

      switch (currentStatus) {
        case 'FOR_SALE':
          schemeUrl += '&currentStatus=FOR_SALE';
          break;
        case 'RESERVED':
          schemeUrl += '&currentStatus=RESERVED';
          if (buyerId && conversationId) {
            schemeUrl += `&buyerId=${buyerId}&conversationId=${conversationId}`;
          }
          break;
        case 'COMPLETED':
          // 스킴에서는 COMPLETED 사용
          // TODO: 네이티브한테 수정해달라고 말한 상태
          schemeUrl += '&currentStatus=COMPLETED';
          break;
        default:
          console.error('Invalid trade status:', currentStatus);
          return;
      }

      window.location.href = schemeUrl;
    },
    connectChatroom: (productId: number) => {
      return (location.href = `unimate://openOrCreateChat?productId=${productId}`);
    },
    openChatList: () => {
      return (location.href = 'unimate://chatList');
    },
  };
};

export default productScheme;
