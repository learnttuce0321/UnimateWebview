import Link from 'next/link';

export default function Page() {
  // 등록하기 개발후 테섭 배포하고 기획분들이 확인하기 편하게 Link로 우선 이동하도록 변경
  return <Link href={'/register'}>등록하기 페이지 이동</Link>;
}
