import HomeHeader from 'app/_components/layout/HomeHeader';
import ProductList from 'app/_components/product/ProductList';
import { normalizeString } from 'modules/normalize';

interface Props {
  searchParams: {
    cityId: string | string[] | undefined;
  };
}
const Page = ({ searchParams: { cityId } }: Props) => {
  console.log('here')
  return (
    <>
      <HomeHeader />
      <ProductList cityId={normalizeString(cityId)} />
    </>
  );
};

export default Page;
