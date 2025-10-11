'use client';

import { useAppStore } from 'providers/ZustandProvider';

interface Props {
  children: React.ReactNode;
}

const LoginWrapper = ({ children }: Props) => {
  const isLogin = useAppStore((state) => state.isLogin);

  if (!isLogin) {
    return '잘못된 접근입니다.';
  }

  return <>{children}</>;
};

export default LoginWrapper;
