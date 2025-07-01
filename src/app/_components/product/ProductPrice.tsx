interface Props {
  price: number;
}

// @typescript-eslint/no-unused-vars
const ProductPrice = ({ price }: Props) => {
  return (
    <p className="height-[18px] text-[18px] font-bold leading-[18px]">
      15,000원
    </p>
  );
};

export default ProductPrice;
