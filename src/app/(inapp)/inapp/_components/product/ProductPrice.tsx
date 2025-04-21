interface Props {
  price: number;
}

const ProductPrice = ({ price }: Props) => {
  return (
    <p className="height-[18px] text-[18px] leading-[18px] font-bold">
      15,000원
    </p>
  );
};

export default ProductPrice;
