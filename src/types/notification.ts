export type productStatus = 'CHAT' | 'LIKE';

export type NotificationType = 'SALE_ENDED' | 'PRICE_CHANGED';

export interface Notification {
  id: number;
  userId: number;
  productId: number;
  productStatus: productStatus;
  notificationType: NotificationType;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationSetting {
  priceChangedNotificationEnabled: boolean;
  saleEndedNotificationEnabled: boolean;
}
