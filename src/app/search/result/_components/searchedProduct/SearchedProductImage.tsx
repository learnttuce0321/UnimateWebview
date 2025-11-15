interface Props {
  thumbnailUrl: string;
}

const SearchedProductImage = ({ thumbnailUrl }: Props) => {
  return (
    <img
      src={thumbnailUrl}
      width={108}
      height={108}
      alt="상품 이미지"
      className="h-[108px] w-[108px] rounded-[8px] object-cover"
    />
  );
};

export default SearchedProductImage;
