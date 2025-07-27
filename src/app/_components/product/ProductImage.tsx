interface Props {
  thumbnailUrl: string;
}

const ProductImage = ({ thumbnailUrl }: Props) => {
  return (
    <img
      src={thumbnailUrl}
      width={108}
      height={108}
      alt="상품 이미지"
      className="rounded-[8px]"
    />
  );
};

export default ProductImage;
