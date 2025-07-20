import HomeHeader from 'app/_components/layout/HomeHeader';
import ProductList from 'app/_components/product/ProductList';
import { normalizeString } from 'modules/normalize';

interface Props {
  searchParams: {
    cityId: string | string[] | undefined;
  };
}
const Page = ({ searchParams: { cityId } }: Props) => {
  console.log('here');
  return (
    <>
    <span>테스트 푸시입니다. 롤벡 예정 - 민재 </span>
      <HomeHeader />
      <ProductList cityId={normalizeString(cityId)} />
    </>
  );
};

export default Page;
