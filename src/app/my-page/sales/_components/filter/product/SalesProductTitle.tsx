interface Props {
  title: string;
}

const SalesProductTitle = ({ title }: Props) => {
  return (
    <h2 className="mb-[6px] line-clamp-1 text-[16px] font-medium leading-[19.2px] text-blue_gray-900">
      {title}
    </h2>
  );
};

export default SalesProductTitle;
