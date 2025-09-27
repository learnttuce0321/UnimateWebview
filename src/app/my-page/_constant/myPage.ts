export interface MyPageListItem {
  title: string;
  targetUrl: string;
}

interface MyPageConfig {
  title: string;
  listItems: MyPageListItem[];
}

export type MyPageConfigId =
  | 'COMMUNITY'
  | 'TRADING'
  | 'SETTING'
  | 'PROFILE_SETTING';

type MyPageConfigList = Record<MyPageConfigId, MyPageConfig>;

const MY_COMMUNITY_LIST_ITEMS: MyPageListItem[] = [
  { title: '내가 쓴 글', targetUrl: '/my-page/post' },
  { title: '내가 쓴 댓글', targetUrl: '/my-page/comment' },
  { title: '좋아요 한 글', targetUrl: '/my-page/like' },
] as const;

const MY_TRADING_LIST_ITEMS: MyPageListItem[] = [
  { title: '찜한목록', targetUrl: '/my-page/wishlist' },
  { title: '판매내역', targetUrl: '/my-page/sell' },
  { title: '구매내역', targetUrl: '/my-page/buy' },
] as const;

const MY_CONFIG_LIST_ITEMS: MyPageListItem[] = [
  { title: '알림 설정', targetUrl: '/my-page/setting/alarm' },
  { title: '차단 목록', targetUrl: '/my-page/setting/block' },
] as const;

const MY_PROFILE_SETTING_LIST_ITEMS: MyPageListItem[] = [
  { title: '프로필 수정', targetUrl: '/my-page/setting/profile' },
  { title: '학교 인증하기', targetUrl: '/my-page/setting/verify' },
] as const;

export const MY_PAGE_LIST_CONFIG: MyPageConfigList = {
  COMMUNITY: {
    title: '커뮤니티 활동',
    listItems: MY_COMMUNITY_LIST_ITEMS,
  },
  TRADING: {
    title: '거래활동',
    listItems: MY_TRADING_LIST_ITEMS,
  },
  SETTING: {
    title: '설정',
    listItems: MY_CONFIG_LIST_ITEMS,
  },
  PROFILE_SETTING: {
    title: '내 정보 관리',
    listItems: MY_PROFILE_SETTING_LIST_ITEMS,
  },
};
