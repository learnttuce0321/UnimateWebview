'use client';

import { useAppStore } from 'providers/ZustandProvider';
import deviceInfoStore from 'stores/vanillaStore.deviceInfo';

interface Props {
  children: React.ReactNode;
}

const LoginWrapper = ({ children }: Props) => {
  const isLogin = useAppStore((state) => state.isLogin);
  const accessToken = deviceInfoStore.getState().deviceInfo.accessToken;

  if (!isLogin) {
    return (
      <>
        <p className="h-[100px] w-full break-all">{accessToken}</p> {'잘못된 접근입니다.'}
      </>
    );
  }

  return <>{children}</>;
};

export default LoginWrapper;
