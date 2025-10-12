import { ProductPost } from 'types/Product';
import navigationScheme from 'utils/navigationScheme';
import MateSalesProduct from './MateSalesProduct';

interface Props {
  mateSalesProductList: ProductPost[];
}

const MateSalesProductList = ({ mateSalesProductList }: Props) => {
  const { openWeb } = navigationScheme();

  const handleProductClick = (productId: number) => {
    openWeb(`/product/${productId}`);
  };

  return (
    <>
      <h2 className="mb-[16px] text-[16px] font-bold leading-[16px] text-blue_gray-900">
        판매 내역
      </h2>
      <ul className="flex flex-col gap-[8px]">
        {mateSalesProductList.map((product) => {
          return (
            <MateSalesProduct
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          );
        })}
      </ul>
    </>
  );
};

export default MateSalesProductList;
