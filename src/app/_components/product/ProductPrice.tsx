import { formatNumber } from '../../../utils/formatNumber';

interface Props {
  price: number;
}

const ProductPrice = ({ price }: Props) => {
  return (
    <p className="height-[18px] text-[18px] font-bold leading-[18px]">
      {formatNumber(price)}원
    </p>
  );
};

export default ProductPrice;
