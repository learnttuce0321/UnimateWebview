interface Props {
  title: string;
}

const ProductTitle = ({ title }: Props) => {
  return (
    <h2 className="h-[19px] text-[16px] font-medium leading-[19.2px]">
      Rice Cooker for Sale
    </h2>
  );
};

export default ProductTitle;
