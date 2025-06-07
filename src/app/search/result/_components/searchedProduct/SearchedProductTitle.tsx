interface Props {
  title: string;
}

const SearchedProductTitle = ({ title }: Props) => {
  return (
    <h2 className="text-[16px] font-medium h-[19px] leading-[19.2px]">
      Rice Cooker for Sale
    </h2>
  );
};

export default SearchedProductTitle;
