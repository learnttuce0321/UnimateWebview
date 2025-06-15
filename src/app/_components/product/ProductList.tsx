import ProductCard from 'app/_components/product/ProductCard';

interface Props {
  cityId: string;
}

const ProductList = ({ cityId }: Props) => {
  return (
    <main className="min-h-full-without-navigation p-[16px] bg-gray-50">
      <ProductCard product={{}} />
      <ProductCard product={{}} />
      <ProductCard product={{}} />
      <ProductCard product={{}} />
      <ProductCard product={{}} />
      <ProductCard product={{}} />
    </main>
  );
};

export default ProductList;
