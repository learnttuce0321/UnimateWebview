interface Props {
  imageUrl: string;
}

const ProductImage = ({ imageUrl }: Props) => {
  return (
    <img
      src="/images/test_images/product_example.png"
      width={108}
      height={108}
      alt="상품 이미지"
      className="rounded-[8px]"
    />
  );
};

export default ProductImage;
