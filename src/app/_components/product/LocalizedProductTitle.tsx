interface Props {
  title: string;
}

const LocalizedProductTitle = ({ title }: Props) => {
  return (
    <h2 className="h-[19px] text-[16px] font-medium leading-[19.2px]">
      {title}
    </h2>
  );
};

export default LocalizedProductTitle;
